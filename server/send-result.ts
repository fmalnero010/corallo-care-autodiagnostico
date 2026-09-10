import { Resend } from 'resend';
import { sendResultRequestSchema } from '../src/schemas';
import { getQuestions } from '../src/data/questions';
import { diagnose } from '../src/logic/diagnose';
import { parseResult, biotipoInfo, sensibilidadInfo, hidratacionInfo } from '../src/data/results';
import type { AnswerMap, Gender, Letter } from '../src/types';

// Tipos mínimos del runtime Node de Vercel, para no depender de @vercel/node.
interface VercelRequest {
  method?: string;
  body?: unknown;
}

interface VercelResponse {
  status(code: number): VercelResponse;
  json(body: unknown): void;
}

function buildAnswersSummary(gender: Gender, answers: AnswerMap): string {
  const questions = getQuestions(gender);
  return questions
    .map((q) => {
      const letter = answers[q.id] as Letter | undefined;
      const option = q.options.find((o) => o.letter === letter);
      return `- ${q.prompt}\n  ${option?.text ?? '(sin responder)'}`;
    })
    .join('\n');
}

/**
 * El detalle interpretativo (qué significa cada rasgo) ya no se muestra
 * en la app — la persona que completa el formulario no ve ningún
 * resultado, solo Corallo Care por este mail. Por eso el desglose que
 * antes vivía en la pantalla de resultado ahora se arma acá.
 */
function buildResultBreakdown(gender: Gender, result: string): string {
  if (gender === 'hombre') return result;

  const { biotipo, sensibilidad, hidratacion } = parseResult(result);
  return [
    `Biotipo: ${biotipoInfo[biotipo].label} — ${biotipoInfo[biotipo].blurb}`,
    `Sensibilidad: ${sensibilidadInfo[sensibilidad].label} — ${sensibilidadInfo[sensibilidad].blurb}`,
    `Hidratación: ${hidratacionInfo[hidratacion].label} — ${hidratacionInfo[hidratacion].blurb}`,
  ].join('\n');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'Method not allowed' });
    return;
  }

  const parsed = sendResultRequestSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ ok: false, error: 'Datos inválidos', details: parsed.error.flatten() });
    return;
  }

  const { gender, answers, contact } = parsed.data;

  // El resultado se recalcula en el servidor a partir de las respuestas:
  // nunca se confía en el string de diagnóstico que manda el cliente.
  let result: string;
  try {
    result = diagnose(gender, answers as AnswerMap);
  } catch {
    res.status(400).json({ ok: false, error: 'Respuestas incompletas' });
    return;
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  const internalTo = process.env.EMAIL_TO_INTERNAL;

  if (!apiKey || !from || !internalTo) {
    res.status(500).json({ ok: false, error: 'Servicio de email no configurado' });
    return;
  }

  const resend = new Resend(apiKey);
  const summary = buildAnswersSummary(gender, answers as AnswerMap);
  const breakdown = buildResultBreakdown(gender, result);
  const genderLabel = gender === 'mujer' ? 'Mujer' : 'Hombre';

  // Único destinatario: la casilla interna de Corallo Care. Quien completa
  // el formulario no ve ningún resultado ni recibe ninguna confirmación —
  // esto es un lead interno para Anto, no una respuesta al usuario.
  //
  // El SDK de Resend NO tira excepción ante un error de la API (dominio no
  // verificado, key inválida, etc.): devuelve `{ data: null, error }`. Si no
  // se chequea `error` a mano, un envío fallido se reporta como éxito.
  // https://github.com/resend/resend-node/issues/429
  try {
    const send = await resend.emails.send({
      from,
      to: internalTo,
      subject: `Nuevo formulario (${genderLabel}): ${result}`,
      text: [
        `Nombre: ${contact.name}`,
        `Género: ${genderLabel}`,
        '',
        'Resultado:',
        breakdown,
        '',
        'Respuestas:',
        summary,
      ].join('\n'),
    });

    if (send.error) {
      throw new Error(`Resend rechazó el email: ${send.error.message}`);
    }

    res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Error enviando email con Resend', error);
    res.status(502).json({ ok: false, error: 'No se pudo enviar el email' });
  }
}

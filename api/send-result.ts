import { Resend } from 'resend';
import { sendResultRequestSchema } from '../src/schemas';
import { getQuestions } from '../src/data/questions';
import { diagnose } from '../src/logic/diagnose';
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

  if (!apiKey || !from) {
    res.status(500).json({ ok: false, error: 'Servicio de email no configurado' });
    return;
  }

  const resend = new Resend(apiKey);
  const summary = buildAnswersSummary(gender, answers as AnswerMap);
  const genderLabel = gender === 'mujer' ? 'Mujer' : 'Hombre';

  try {
    await resend.emails.send({
      from,
      to: contact.email,
      subject: `Tu diagnóstico de piel: ${result}`,
      text: [
        `Hola ${contact.name},`,
        '',
        `Tu tipo de piel es: ${result}`,
        '',
        'Respuestas del autodiagnóstico:',
        summary,
        '',
        'LACA Cosmética Profesional',
      ].join('\n'),
    });

    if (internalTo) {
      await resend.emails.send({
        from,
        to: internalTo,
        replyTo: contact.email,
        subject: `Nuevo autodiagnóstico (${genderLabel}): ${result}`,
        text: [
          `Nombre: ${contact.name}`,
          `Email: ${contact.email}`,
          `Género: ${genderLabel}`,
          `Resultado: ${result}`,
          '',
          'Respuestas:',
          summary,
        ].join('\n'),
      });
    }

    res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Error enviando email con Resend', error);
    res.status(502).json({ ok: false, error: 'No se pudo enviar el email' });
  }
}

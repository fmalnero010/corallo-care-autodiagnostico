import { useEffect, useRef } from 'react';
import { useQuizStore } from '../store/useQuizStore';
import { sendResultEmail } from '../api/sendResult';

export function ResultStep() {
  const gender = useQuizStore((s) => s.gender);
  const result = useQuizStore((s) => s.result);
  const answers = useQuizStore((s) => s.answers);
  const contact = useQuizStore((s) => s.contact);
  const reset = useQuizStore((s) => s.reset);

  const sentRef = useRef(false);

  // El envío es un lead interno (a LACA), no una confirmación para la
  // persona que responde el cuestionario: no se le muestra ningún estado
  // de "enviando"/"enviado"/"error" relacionado al mail.
  useEffect(() => {
    if (sentRef.current) return;
    if (!gender || !result || !contact) return;
    sentRef.current = true;

    sendResultEmail({ gender, result, answers, contact }).catch(() => {
      // Silencioso a propósito: un fallo de envío no debe afectar la
      // experiencia de quien completó el cuestionario.
    });
  }, [gender, result, contact, answers]);

  if (!result || !contact) return null;

  return (
    <div className="card">
      <h2>Tu diagnóstico</h2>
      <p className="result-label">{result}</p>
      <p className="subtitle">Gracias, {contact.name}.</p>

      <button type="button" className="link-button" onClick={reset}>
        Hacer el autodiagnóstico de nuevo
      </button>
    </div>
  );
}

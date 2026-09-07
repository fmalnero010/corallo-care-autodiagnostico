import { useEffect, useRef } from 'react';
import { useQuizStore } from '../store/useQuizStore';
import { sendResultEmail } from '../api/sendResult';

export function ResultStep() {
  const gender = useQuizStore((s) => s.gender);
  const result = useQuizStore((s) => s.result);
  const answers = useQuizStore((s) => s.answers);
  const contact = useQuizStore((s) => s.contact);
  const emailStatus = useQuizStore((s) => s.emailStatus);
  const setEmailStatus = useQuizStore((s) => s.setEmailStatus);
  const reset = useQuizStore((s) => s.reset);

  const sentRef = useRef(false);

  useEffect(() => {
    if (sentRef.current) return;
    if (!gender || !result || !contact) return;
    sentRef.current = true;

    setEmailStatus('sending');
    sendResultEmail({ gender, result, answers, contact })
      .then((res) => setEmailStatus(res.ok ? 'sent' : 'error'))
      .catch(() => setEmailStatus('error'));
  }, [gender, result, contact, answers, setEmailStatus]);

  if (!result || !contact) return null;

  return (
    <div className="card">
      <h2>Tu diagnóstico</h2>
      <p className="result-label">{result}</p>
      <p className="subtitle">Gracias, {contact.name}. Enviamos el detalle a {contact.email}.</p>

      {emailStatus === 'sending' && <p className="status status-pending">Enviando el resultado por mail...</p>}
      {emailStatus === 'sent' && <p className="status status-ok">¡Listo! Revisá tu casilla de email.</p>}
      {emailStatus === 'error' && (
        <p className="status status-error">
          No pudimos enviar el mail, pero tu resultado es el de arriba. Podés volver a intentarlo más tarde.
        </p>
      )}

      <button type="button" className="link-button" onClick={reset}>
        Hacer el autodiagnóstico de nuevo
      </button>
    </div>
  );
}

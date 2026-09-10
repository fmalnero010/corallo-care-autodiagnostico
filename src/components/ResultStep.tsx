import { useEffect, useRef } from 'react';
import { useQuizStore } from '../store/useQuizStore';
import { sendResultEmail } from '../api/sendResult';
import { enqueuePendingLead, flushPendingLeads } from '../api/pendingLeads';
import { useAutoFocus } from '../hooks/useAutoFocus';
import { EmptyState } from './EmptyState';

/**
 * A propósito, esta pantalla no muestra ningún diagnóstico: la persona que
 * completa el formulario nunca ve el resultado. El desglose completo
 * (biotipo/sensibilidad/hidratación con su interpretación) va solo por
 * mail a Corallo Care — ver server/send-result.ts.
 */
export function ResultStep() {
  const gender = useQuizStore((s) => s.gender);
  const result = useQuizStore((s) => s.result);
  const answers = useQuizStore((s) => s.answers);
  const contact = useQuizStore((s) => s.contact);
  const reset = useQuizStore((s) => s.reset);
  const headingRef = useAutoFocus<HTMLHeadingElement>([]);

  const sentRef = useRef(false);

  useEffect(() => {
    if (sentRef.current) return;
    if (!gender || !result || !contact) return;
    sentRef.current = true;

    const payload = { gender, result, answers, contact };

    flushPendingLeads()
      .catch(() => {})
      .finally(() => {
        sendResultEmail(payload)
          .then((res) => {
            if (!res.ok) enqueuePendingLead(payload);
          })
          .catch(() => enqueuePendingLead(payload));
      });
  }, [gender, result, contact, answers]);

  if (!result || !contact) {
    return <EmptyState message="No encontramos tu información. Volvé a completar el formulario." />;
  }

  return (
    <div className="card">
      <h1 ref={headingRef} tabIndex={-1}>
        ¡Listo, {contact.name}!
      </h1>
      <p className="subtitle">Ya recibimos tu información. Corallo Care se va a poner en contacto con vos pronto.</p>
      <button type="button" className="link-button" onClick={reset}>
        Volver a empezar
      </button>
    </div>
  );
}

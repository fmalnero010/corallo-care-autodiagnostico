import { useEffect, useRef } from 'react';
import { useQuizStore } from '../store/useQuizStore';
import { sendResultEmail } from '../api/sendResult';
import { enqueuePendingLead, flushPendingLeads } from '../api/pendingLeads';
import { parseResult, biotipoInfo, sensibilidadInfo, hidratacionInfo, type TraitInfo } from '../data/results';
import { IconDroplet, IconShield, IconLeaf, IconRefresh } from './Icons';
import { useAutoFocus } from '../hooks/useAutoFocus';
import { EmptyState } from './EmptyState';

function TraitRow({ icon, info, index }: { icon: React.ReactNode; info: TraitInfo; index: number }) {
  return (
    <div className="trait-row" style={{ '--trait-color': info.color, '--trait-delay': `${index * 90}ms` } as React.CSSProperties}>
      <div className="trait-icon">{icon}</div>
      <div>
        <p className="trait-label">{info.label}</p>
        <p className="trait-blurb">{info.blurb}</p>
      </div>
    </div>
  );
}

export function ResultStep() {
  const gender = useQuizStore((s) => s.gender);
  const result = useQuizStore((s) => s.result);
  const answers = useQuizStore((s) => s.answers);
  const contact = useQuizStore((s) => s.contact);
  const reset = useQuizStore((s) => s.reset);
  const headingRef = useAutoFocus<HTMLHeadingElement>([]);

  const sentRef = useRef(false);

  // El envío es un lead interno (a Corallo Care), no una confirmación para
  // la persona que responde el cuestionario: no se le muestra ningún estado
  // de "enviando"/"enviado"/"error" relacionado al mail.
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
    return <EmptyState message="No encontramos tu resultado. Volvé a hacer el cuestionario." />;
  }

  const { biotipo, sensibilidad, hidratacion } = parseResult(result);
  const bio = biotipoInfo[biotipo];

  return (
    <div className="card card-result">
      <p className="result-greeting">Gracias, {contact.name}.</p>

      <div className="result-answer" style={{ '--result-color': bio.color, '--result-tint': bio.tint } as React.CSSProperties}>
        <span className="result-eyebrow">Tu diagnóstico</span>
        <h1 ref={headingRef} tabIndex={-1} className="result-headline">
          {result}
        </h1>
      </div>

      <div className="trait-section">
        <p className="trait-section-label">Qué significa</p>
        <div className="trait-list">
          <TraitRow icon={<IconDroplet className="trait-icon-svg" />} info={bio} index={0} />
          <TraitRow icon={<IconShield className="trait-icon-svg" />} info={sensibilidadInfo[sensibilidad]} index={1} />
          <TraitRow icon={<IconLeaf className="trait-icon-svg" />} info={hidratacionInfo[hidratacion]} index={2} />
        </div>
      </div>

      <button type="button" className="link-button" onClick={reset}>
        <IconRefresh className="link-button-icon" />
        Hacer el autodiagnóstico de nuevo
      </button>
    </div>
  );
}

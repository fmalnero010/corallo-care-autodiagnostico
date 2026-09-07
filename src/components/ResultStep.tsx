import { useEffect, useRef } from 'react';
import { useQuizStore } from '../store/useQuizStore';
import { sendResultEmail } from '../api/sendResult';
import { enqueuePendingLead, flushPendingLeads } from '../api/pendingLeads';
import { parseResult, biotipoInfo, sensibilidadInfo, hidratacionInfo, type TraitInfo } from '../data/results';
import { IconDroplet, IconShield, IconLeaf, IconArrowRight, IconRefresh } from './Icons';
import { useAutoFocus } from '../hooks/useAutoFocus';
import { EmptyState } from './EmptyState';

const CATALOG_URL = 'https://catalogo.laboratoriolaca.com/';

function TraitCard({ icon, info, index }: { icon: React.ReactNode; info: TraitInfo; index: number }) {
  return (
    <div
      className="trait-card"
      style={{ '--trait-color': info.color, '--trait-tint': info.tint, '--trait-delay': `${index * 110}ms` } as React.CSSProperties}
    >
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
  const headingRef = useAutoFocus<HTMLParagraphElement>([]);

  const sentRef = useRef(false);

  // El envío es un lead interno (a LACA), no una confirmación para la
  // persona que responde el cuestionario: no se le muestra ningún estado
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
      <div className="result-head" style={{ '--result-color': bio.color, '--result-tint': bio.tint } as React.CSSProperties}>
        <p ref={headingRef} tabIndex={-1} className="result-greeting">
          Gracias, {contact.name}. Tu piel es
        </p>
        <h1 className="result-headline">{result}</h1>
      </div>

      <div className="trait-list">
        <TraitCard icon={<IconDroplet className="trait-icon-svg" />} info={bio} index={0} />
        <TraitCard icon={<IconShield className="trait-icon-svg" />} info={sensibilidadInfo[sensibilidad]} index={1} />
        <TraitCard icon={<IconLeaf className="trait-icon-svg" />} info={hidratacionInfo[hidratacion]} index={2} />
      </div>

      <a className="primary-button primary-link" href={CATALOG_URL} target="_blank" rel="noreferrer">
        Ver productos para tu piel
        <IconArrowRight className="button-icon" />
      </a>
      <button type="button" className="link-button" onClick={reset}>
        <IconRefresh className="link-button-icon" />
        Hacer el autodiagnóstico de nuevo
      </button>
    </div>
  );
}

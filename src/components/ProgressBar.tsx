interface ProgressBarProps {
  current: number;
  total: number;
  stepLabel: string;
}

export function ProgressBar({ current, total, stepLabel }: ProgressBarProps) {
  const pct = total > 0 ? Math.round(((current + 1) / total) * 100) : 0;
  return (
    <div className="progress" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>
      <span className="progress-label">
        {stepLabel} · Pregunta {current + 1} de {total}
      </span>
    </div>
  );
}

import type { Question } from '../types';

interface ProgressBarProps {
  questions: Question[];
  current: number;
}

/** Un segmento por pregunta real, espaciado uniforme. Un segmento se
 * marca como respondido solo si ya se avanzó más allá de él — la
 * pregunta que se está mostrando ahora (`current`) todavía no tiene
 * respuesta, así que no se pinta como completada. */
export function ProgressBar({ questions, current }: ProgressBarProps) {
  const total = questions.length;
  const stepLabel = questions[current]?.stepLabel ?? '';

  return (
    <div
      className="progress"
      role="progressbar"
      aria-valuenow={current + 1}
      aria-valuemin={1}
      aria-valuemax={total}
      aria-valuetext={`Pregunta ${current + 1} de ${total}: ${stepLabel}`}
    >
      <div className="progress-track">
        {questions.map((q, i) => (
          <div key={q.id} className={`progress-segment${i < current ? ' progress-segment-done' : ''}`} />
        ))}
      </div>
      <span className="progress-label" aria-hidden="true">
        {stepLabel} · Pregunta {current + 1} de {total}
      </span>
    </div>
  );
}

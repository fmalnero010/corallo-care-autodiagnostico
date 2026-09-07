import type { Question } from '../types';

interface ProgressBarProps {
  questions: Question[];
  current: number;
}

/**
 * Un segmento por pregunta real (no un segmento por tramo): con 8
 * preguntas se ven 8 segmentos, nunca menos — mostrar solo 3 (uno por
 * tramo) hacía parecer que había 3 pasos cuando hay 8. El único gesto
 * hacia los 3 tramos (biotipo/sensibilidad/hidratación) es un espacio más
 * grande entre preguntas de tramos distintos.
 */
export function ProgressBar({ questions, current }: ProgressBarProps) {
  const total = questions.length;
  const isLast = current === total - 1;
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
      <div className={`progress-track${isLast ? ' progress-track-near' : ''}`}>
        {questions.map((q, i) => {
          const stageBreak = i > 0 && questions[i - 1].stage !== q.stage;
          const state = i < current ? 'done' : i === current ? 'current' : 'pending';
          return (
            <div
              key={q.id}
              className={`progress-segment progress-segment-${state}${stageBreak ? ' progress-segment-break' : ''}`}
            />
          );
        })}
      </div>
      <span className="progress-label" aria-hidden="true">
        {stepLabel} · Pregunta {current + 1} de {total}
      </span>
    </div>
  );
}

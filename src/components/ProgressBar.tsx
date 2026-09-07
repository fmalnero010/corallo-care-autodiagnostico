import type { Question } from '../types';

interface ProgressBarProps {
  questions: Question[];
  current: number;
}

interface StageGroup {
  stage: string;
  start: number;
  count: number;
}

function groupByStage(questions: Question[]): StageGroup[] {
  const groups: StageGroup[] = [];
  for (let i = 0; i < questions.length; i++) {
    const stage = questions[i].stage;
    const last = groups[groups.length - 1];
    if (last && last.stage === stage) {
      last.count += 1;
    } else {
      groups.push({ stage, start: i, count: 1 });
    }
  }
  return groups;
}

export function ProgressBar({ questions, current }: ProgressBarProps) {
  const total = questions.length;
  const groups = groupByStage(questions);
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
        {groups.map((group) => {
          const groupEnd = group.start + group.count;
          let fillPct = 0;
          if (current >= groupEnd) fillPct = 100;
          else if (current >= group.start) fillPct = ((current - group.start + 1) / group.count) * 100;
          return (
            <div className="progress-segment" key={group.start} style={{ flexGrow: group.count }}>
              <div className="progress-segment-fill" style={{ width: `${fillPct}%` }} />
            </div>
          );
        })}
      </div>
      <span className="progress-label" aria-hidden="true">
        {stepLabel} · Pregunta {current + 1} de {total}
      </span>
    </div>
  );
}

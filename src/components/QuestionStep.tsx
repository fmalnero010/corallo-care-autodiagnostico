import { useQuizStore } from '../store/useQuizStore';
import { getQuestions } from '../data/questions';
import type { Letter } from '../types';
import { ProgressBar } from './ProgressBar';

export function QuestionStep() {
  const gender = useQuizStore((s) => s.gender);
  const stepIndex = useQuizStore((s) => s.stepIndex);
  const answerCurrent = useQuizStore((s) => s.answerCurrent);
  const goBack = useQuizStore((s) => s.goBack);

  if (!gender) return null;
  const questions = getQuestions(gender);
  const question = questions[stepIndex];
  if (!question) return null;

  return (
    <div className="card">
      <ProgressBar current={stepIndex} total={questions.length} stepLabel={question.stepLabel} />
      <h2>{question.prompt}</h2>
      <div className="option-list">
        {question.options.map((opt) => (
          <button
            key={opt.letter}
            type="button"
            className="option-card"
            onClick={() => answerCurrent(opt.letter as Letter)}
          >
            {opt.text}
          </button>
        ))}
      </div>
      <button type="button" className="link-button" onClick={goBack}>
        Volver
      </button>
    </div>
  );
}

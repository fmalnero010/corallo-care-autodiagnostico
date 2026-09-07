import { useState } from 'react';
import { useQuizStore } from '../store/useQuizStore';
import { getQuestions } from '../data/questions';
import type { Letter } from '../types';
import { ProgressBar } from './ProgressBar';
import { IconCheck, IconChevronLeft } from './Icons';
import { useAutoFocus } from '../hooks/useAutoFocus';

const TRANSITION_LOCK_MS = 220;

export function QuestionStep() {
  const gender = useQuizStore((s) => s.gender);
  const stepIndex = useQuizStore((s) => s.stepIndex);
  const answers = useQuizStore((s) => s.answers);
  const answerCurrent = useQuizStore((s) => s.answerCurrent);
  const goBack = useQuizStore((s) => s.goBack);

  // Bloqueo breve tras responder: evita que un doble-tap en mobile
  // "sangre" sobre la primera opción de la pregunta siguiente. QuestionStep
  // es un único component instance durante todo el cuestionario (App.tsx
  // no lo remonta entre preguntas), así que el desbloqueo se ajusta durante
  // el render mismo (patrón "adjusting state when a prop changes" de React)
  // en vez de un efecto post-commit.
  const [locked, setLocked] = useState(false);
  const [lockedForStep, setLockedForStep] = useState(stepIndex);
  if (stepIndex !== lockedForStep) {
    setLockedForStep(stepIndex);
    setLocked(false);
  }

  const headingRef = useAutoFocus<HTMLHeadingElement>([stepIndex, gender]);

  if (!gender) return null;
  const questions = getQuestions(gender);
  const question = questions[stepIndex];
  if (!question) return null;

  const selected = answers[question.id];

  function handleSelect(letter: Letter) {
    if (locked) return;
    setLocked(true);
    window.setTimeout(() => answerCurrent(letter), TRANSITION_LOCK_MS);
  }

  return (
    <div className="card" key={question.id}>
      <ProgressBar questions={questions} current={stepIndex} />
      <div>
        <h1 ref={headingRef} tabIndex={-1}>
          {question.prompt}
        </h1>
        <p className="helper-text">{question.helper}</p>
      </div>
      <div className="option-list" role="radiogroup" aria-label={question.prompt}>
        {question.options.map((opt) => {
          const isSelected = selected === opt.letter;
          return (
            <button
              key={opt.letter}
              type="button"
              role="radio"
              aria-checked={isSelected}
              className={`option-card${isSelected ? ' option-card-selected' : ''}`}
              onClick={() => handleSelect(opt.letter)}
              disabled={locked}
            >
              <span>{opt.text}</span>
              {isSelected && <IconCheck className="option-check" />}
            </button>
          );
        })}
      </div>
      <button type="button" className="link-button" onClick={goBack} disabled={locked}>
        <IconChevronLeft className="link-button-icon" />
        Volver
      </button>
    </div>
  );
}

import { create } from 'zustand';
import type { AnswerMap, ContactInfo, Gender, Letter } from '../types';
import { getQuestions } from '../data/questions';
import { diagnose } from '../logic/diagnose';

export type QuizStage = 'gender' | 'questions' | 'contact' | 'result';

interface QuizState {
  stage: QuizStage;
  gender: Gender | null;
  stepIndex: number;
  answers: AnswerMap;
  contact: ContactInfo | null;
  result: string | null;

  selectGender: (gender: Gender) => void;
  answerCurrent: (letter: Letter) => void;
  goBack: () => void;
  setContact: (contact: ContactInfo) => void;
  reset: () => void;
}

const initialState = {
  stage: 'gender' as QuizStage,
  gender: null,
  stepIndex: 0,
  answers: {},
  contact: null,
  result: null,
};

export const useQuizStore = create<QuizState>((set, get) => ({
  ...initialState,

  selectGender: (gender) => {
    set({ gender, stage: 'questions', stepIndex: 0, answers: {} });
  },

  answerCurrent: (letter) => {
    const { gender, stepIndex, answers } = get();
    if (!gender) return;
    const questions = getQuestions(gender);
    const question = questions[stepIndex];
    if (!question) return;

    const nextAnswers = { ...answers, [question.id]: letter };
    const isLastQuestion = stepIndex === questions.length - 1;

    if (isLastQuestion) {
      const result = diagnose(gender, nextAnswers);
      set({ answers: nextAnswers, result, stage: 'contact' });
    } else {
      set({ answers: nextAnswers, stepIndex: stepIndex + 1 });
    }
  },

  goBack: () => {
    const { stage, stepIndex } = get();
    if (stage === 'questions' && stepIndex > 0) {
      set({ stepIndex: stepIndex - 1 });
    } else if (stage === 'questions' && stepIndex === 0) {
      set({ stage: 'gender', gender: null, answers: {} });
    } else if (stage === 'contact') {
      set({ stage: 'questions' });
    }
  },

  setContact: (contact) => set({ contact, stage: 'result' }),

  reset: () => set({ ...initialState }),
}));

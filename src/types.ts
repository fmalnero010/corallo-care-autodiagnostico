export type Gender = 'mujer' | 'hombre';

export type Letter = 'A' | 'B' | 'C' | 'D' | 'E' | 'F';

export interface QuestionOption {
  letter: Letter;
  text: string;
}

export interface Question {
  id: string;
  prompt: string;
  options: QuestionOption[];
}

export type AnswerMap = Record<string, Letter>;

export interface ContactInfo {
  name: string;
  email: string;
}

export interface DiagnosisResult {
  gender: Gender;
  result: string;
}

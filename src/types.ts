export type Gender = 'mujer' | 'hombre';

export type Letter = 'A' | 'B' | 'C' | 'D' | 'E' | 'F';

export interface QuestionOption {
  letter: Letter;
  text: string;
}

export type QuestionStage = 'biotipo' | 'sensibilidad' | 'hidratacion' | 'edad' | 'afeitado';

export interface Question {
  id: string;
  /** Etiqueta corta de la barra de progreso original del sitio (ej. "BRILLO", "POROS"). */
  stepLabel: string;
  /** Tramo del cuestionario al que pertenece, para agrupar la barra de progreso. */
  stage: QuestionStage;
  prompt: string;
  /** Una línea breve que explica para qué sirve la pregunta. */
  helper: string;
  options: QuestionOption[];
}

export type AnswerMap = Record<string, Letter>;

export interface ContactInfo {
  name: string;
}

export interface DiagnosisResult {
  gender: Gender;
  result: string;
}

import type { Question } from '../types';

/**
 * Preguntas y opciones extraídas literalmente del JavaScript de
 * https://laboratoriolaca.com/autodiagnostico (arrays `questions` y
 * `manQuestions`, y `_textList` / `_menTextList` para el stepLabel).
 * Se preserva el texto tal cual está en el sitio (incluye alguna
 * inconsistencia de puntuación del original, p. ej. "Nunca" sin punto
 * en la versión hombre).
 */
export const womenQuestions: Question[] = [
  {
    id: 'P1',
    stepLabel: 'BRILLO',
    prompt: 'Durante el día, ¿te brilla la piel del rostro?',
    options: [
      { letter: 'A', text: 'Si, pero solo en la nariz y la frente' },
      { letter: 'B', text: 'Sí, por todo el rostro.' },
      { letter: 'C', text: 'Sí, por todo el rostro y en exceso.' },
      { letter: 'D', text: 'No, se muestra seca y a veces se escama.' },
    ],
  },
  {
    id: 'P2',
    stepLabel: 'POROS',
    prompt: 'Los poros de tu rostro son:',
    options: [
      { letter: 'A', text: 'Se pueden ver claramente en nariz y/o pómulos' },
      { letter: 'B', text: 'Están dilatados en varias partes del rostro.' },
      { letter: 'C', text: 'Están muy dilatados en la mayor parte del rostro.' },
      { letter: 'D', text: 'Son imperceptibles.' },
    ],
  },
  {
    id: 'P3',
    stepLabel: 'TACTO',
    prompt: 'La piel al tacto, tomada entre los dedos pulgar e índice:',
    options: [
      { letter: 'A', text: 'Fina y seca.' },
      { letter: 'B', text: 'Gruesa y oleosa.' },
      { letter: 'C', text: 'Rugosa y muy oleosa.' },
      { letter: 'D', text: 'Muy fina, fláccida y seca.' },
    ],
  },
  {
    id: 'P4',
    stepLabel: 'COMEDONES O ACNÉ',
    prompt: '¿Tenés comedones y/o acné?',
    options: [
      { letter: 'A', text: 'A veces.' },
      { letter: 'B', text: 'Con frecuencia.' },
      { letter: 'C', text: 'Con mucha frecuencia, incluso en pecho y espalda.' },
      { letter: 'D', text: 'Nunca.' },
    ],
  },
  {
    id: 'P5',
    stepLabel: 'MAQUILLAJE',
    prompt: 'Cuando usás maquillajes',
    options: [
      {
        letter: 'A',
        text: 'Tenés que retocarlo durante el transcurso del día en frente, nariz y mentón, pero el resto está bien.',
      },
      { letter: 'B', text: 'Tenés que retocarlo antes del mediodia.' },
      {
        letter: 'C',
        text: 'Te dura poco, aunque lo fijes bien con polvo volátil. Tenés que limpiar el exceso de oleosidad, antes de retocarlo.',
      },
      { letter: 'D', text: 'Las bases y correctores me quedan desparejos y durante el día en algunas zonas se absorbe.' },
    ],
  },
  {
    id: 'P6',
    stepLabel: 'SENSIBILIDAD',
    prompt: 'Tenés enrojecimiento y/o alteraciones vasculares en nariz y pómulos?',
    options: [
      { letter: 'A', text: 'Si' },
      { letter: 'B', text: 'No' },
    ],
  },
  {
    id: 'P7',
    stepLabel: 'HIDRATACIÓN',
    prompt: '¿Cómo sentís la piel al tacto?',
    options: [
      { letter: 'A', text: 'Áspera' },
      { letter: 'B', text: 'Suave' },
    ],
  },
  {
    id: 'P8',
    stepLabel: 'TACTO',
    prompt: 'La piel al tacto, tomada entre los dedos pulgar e índice',
    options: [
      { letter: 'A', text: 'No es turgente y le cuesta volver a su posición natural' },
      { letter: 'B', text: 'Es elástica' },
    ],
  },
];

export const menQuestions: Question[] = [
  {
    id: 'P1',
    stepLabel: 'EDAD',
    prompt: 'Selecciona tu rango de edad',
    options: [
      { letter: 'A', text: '15 a 25 años' },
      { letter: 'B', text: '25 a 35 años' },
      { letter: 'C', text: '35 a 45 años' },
      { letter: 'D', text: '45 a 55 años' },
      { letter: 'E', text: '55 a 65 años' },
      { letter: 'F', text: 'Mayor a 65 años' },
    ],
  },
  {
    id: 'P2',
    stepLabel: 'BRILLO',
    prompt: 'Durante el día, ¿te brilla la piel del rostro?',
    options: [
      { letter: 'A', text: 'Si, pero solo en la nariz y la frente' },
      { letter: 'B', text: 'Sí, por todo el rostro.' },
      { letter: 'C', text: 'Sí, por todo el rostro y en exceso.' },
    ],
  },
  {
    id: 'P3',
    stepLabel: 'POROS',
    prompt: 'Los poros de tu rostro son:',
    options: [
      { letter: 'A', text: 'Se pueden ver claramente en nariz y/o pómulos' },
      { letter: 'B', text: 'Están dilatados en varias partes del rostro.' },
      { letter: 'C', text: 'Están muy dilatados en la mayor parte del rostro.' },
      { letter: 'D', text: 'Son poco perceptibles en todo el rostro.' },
    ],
  },
  {
    id: 'P4',
    stepLabel: 'COMEDONES O ACNÉ',
    prompt: '¿Tenés comedones y/o acné?',
    options: [
      { letter: 'A', text: 'A veces.' },
      { letter: 'B', text: 'Con frecuencia.' },
      { letter: 'C', text: 'Con mucha frecuencia, incluso en pecho y espalda.' },
      { letter: 'D', text: 'Nunca' },
    ],
  },
  {
    id: 'P5',
    stepLabel: 'AFEITADO',
    prompt: 'Después de afeitarte',
    options: [
      { letter: 'A', text: 'Se te irrita la piel.' },
      { letter: 'B', text: 'No se te irrita la piel' },
      { letter: 'C', text: 'Te aparecen pústulas.' },
      { letter: 'D', text: 'No te afeitas.' },
    ],
  },
];

export function getQuestions(gender: 'mujer' | 'hombre'): Question[] {
  return gender === 'mujer' ? womenQuestions : menQuestions;
}

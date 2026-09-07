import type { Question } from '../types';

/**
 * Preguntas y opciones extraídas literalmente del JavaScript del sitio de
 * referencia (arrays `questions` y `manQuestions`, y `_textList` /
 * `_menTextList` para el stepLabel).
 * Se corrigieron dos inconsistencias de tipeo del original ("Si" → "Sí"
 * cuando el resto de las opciones de la misma pregunta sí llevan tilde, y
 * puntuación final pareja entre la versión mujer/hombre) — no afectan la
 * lógica de diagnóstico, que opera sobre `letter`, nunca sobre el texto.
 * `helper` es copy propio: una línea que explica para qué sirve cada
 * pregunta, ausente en el sitio original.
 */
export const womenQuestions: Question[] = [
  {
    id: 'P1',
    stepLabel: 'BRILLO',
    stage: 'biotipo',
    prompt: 'Durante el día, ¿te brilla la piel del rostro?',
    helper: 'Nos ayuda a identificar si tu piel tiende a producir más o menos oleosidad.',
    options: [
      { letter: 'A', text: 'Sí, pero solo en la nariz y la frente' },
      { letter: 'B', text: 'Sí, por todo el rostro.' },
      { letter: 'C', text: 'Sí, por todo el rostro y en exceso.' },
      { letter: 'D', text: 'No, se muestra seca y a veces se escama.' },
    ],
  },
  {
    id: 'P2',
    stepLabel: 'POROS',
    stage: 'biotipo',
    prompt: 'Los poros de tu rostro son:',
    helper: 'El tamaño de los poros es una de las señales más claras del biotipo de tu piel.',
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
    stage: 'biotipo',
    prompt: 'La piel al tacto, tomada entre los dedos pulgar e índice:',
    helper: 'La textura al tacto distingue una piel seca de una grasa incluso antes de mirarla.',
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
    stage: 'biotipo',
    prompt: '¿Tenés comedones y/o acné?',
    helper: 'La frecuencia de imperfecciones indica cuánto tiende a obstruirse tu piel.',
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
    stage: 'biotipo',
    prompt: 'Cuando usás maquillajes',
    helper: 'Cómo se comporta el maquillaje durante el día revela el nivel real de oleosidad.',
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
    stage: 'sensibilidad',
    prompt: 'Tenés enrojecimiento y/o alteraciones vasculares en nariz y pómulos?',
    helper: 'El enrojecimiento y las alteraciones vasculares son la principal señal de piel sensible.',
    options: [
      { letter: 'A', text: 'Sí' },
      { letter: 'B', text: 'No' },
    ],
  },
  {
    id: 'P7',
    stepLabel: 'HIDRATACIÓN',
    stage: 'hidratacion',
    prompt: '¿Cómo sentís la piel al tacto?',
    helper: 'La sensación al tacto ayuda a distinguir una piel deshidratada de una bien hidratada.',
    options: [
      { letter: 'A', text: 'Áspera' },
      { letter: 'B', text: 'Suave' },
    ],
  },
  {
    id: 'P8',
    stepLabel: 'TACTO',
    stage: 'hidratacion',
    prompt: 'La piel al tacto, tomada entre los dedos pulgar e índice',
    helper: 'La elasticidad es el segundo indicador clave del nivel de hidratación.',
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
    stage: 'edad',
    prompt: 'Selecciona tu rango de edad',
    helper: 'La edad orienta si tu piel está en una etapa joven o madura, clave para el diagnóstico.',
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
    stage: 'biotipo',
    prompt: 'Durante el día, ¿te brilla la piel del rostro?',
    helper: 'Nos ayuda a identificar si tu piel tiende a producir más o menos oleosidad.',
    options: [
      { letter: 'A', text: 'Sí, pero solo en la nariz y la frente' },
      { letter: 'B', text: 'Sí, por todo el rostro.' },
      { letter: 'C', text: 'Sí, por todo el rostro y en exceso.' },
    ],
  },
  {
    id: 'P3',
    stepLabel: 'POROS',
    stage: 'biotipo',
    prompt: 'Los poros de tu rostro son:',
    helper: 'El tamaño de los poros es una de las señales más claras del biotipo de tu piel.',
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
    stage: 'biotipo',
    prompt: '¿Tenés comedones y/o acné?',
    helper: 'La frecuencia de imperfecciones indica cuánto tiende a obstruirse tu piel.',
    options: [
      { letter: 'A', text: 'A veces.' },
      { letter: 'B', text: 'Con frecuencia.' },
      { letter: 'C', text: 'Con mucha frecuencia, incluso en pecho y espalda.' },
      { letter: 'D', text: 'Nunca.' },
    ],
  },
  {
    id: 'P5',
    stepLabel: 'AFEITADO',
    stage: 'afeitado',
    prompt: 'Después de afeitarte',
    helper: 'Cómo reacciona tu piel al afeitado es una señal clave de sensibilidad y tendencia acneica.',
    options: [
      { letter: 'A', text: 'Se te irrita la piel.' },
      { letter: 'B', text: 'No se te irrita la piel.' },
      { letter: 'C', text: 'Te aparecen pústulas.' },
      { letter: 'D', text: 'No te afeitas.' },
    ],
  },
];

export function getQuestions(gender: 'mujer' | 'hombre'): Question[] {
  return gender === 'mujer' ? womenQuestions : menQuestions;
}

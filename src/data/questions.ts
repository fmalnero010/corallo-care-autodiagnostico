import type { Question } from '../types';

/**
 * Texto de opciones extraído 1:1 de las 8.192 (mujer) y 1.152 (hombre)
 * combinaciones exhaustivas provistas por LACA. El enunciado de cada
 * pregunta ("prompt") es una redacción propia inferida a partir de las
 * opciones, ya que el árbol original solo documentaba letras + resultado.
 * Ajustar el copy de "prompt" no afecta la lógica de diagnóstico.
 */
export const womenQuestions: Question[] = [
  {
    id: 'P1',
    prompt: '¿Tu rostro presenta brillo (grasitud) a lo largo del día?',
    options: [
      { letter: 'A', text: 'Sí, pero solo en nariz y frente' },
      { letter: 'B', text: 'Sí, por todo el rostro' },
      { letter: 'C', text: 'Sí, por todo el rostro y en exceso' },
      { letter: 'D', text: 'No, se muestra seca y a veces se escama' },
    ],
  },
  {
    id: 'P2',
    prompt: '¿Cómo ves tus poros?',
    options: [
      { letter: 'A', text: 'Poros visibles en nariz y/o pómulos' },
      { letter: 'B', text: 'Poros dilatados en varias partes' },
      { letter: 'C', text: 'Muy dilatados en la mayor parte' },
      { letter: 'D', text: 'Imperceptibles' },
    ],
  },
  {
    id: 'P3',
    prompt: '¿Cómo describirías la textura de tu piel?',
    options: [
      { letter: 'A', text: 'Fina y seca' },
      { letter: 'B', text: 'Gruesa y oleosa' },
      { letter: 'C', text: 'Rugosa y muy oleosa' },
      { letter: 'D', text: 'Muy fina, flácida y seca' },
    ],
  },
  {
    id: 'P4',
    prompt: '¿Con qué frecuencia te salen granitos o imperfecciones?',
    options: [
      { letter: 'A', text: 'A veces' },
      { letter: 'B', text: 'Con frecuencia' },
      { letter: 'C', text: 'Con mucha frecuencia, incluso pecho y espalda' },
      { letter: 'D', text: 'Nunca' },
    ],
  },
  {
    id: 'P5',
    prompt: '¿Qué te pasa con el maquillaje o el exceso de oleosidad durante el día?',
    options: [
      { letter: 'A', text: 'Retoca frente/nariz/mentón durante el día' },
      { letter: 'B', text: 'Retoca antes del mediodía' },
      { letter: 'C', text: 'Dura poco y debe limpiar exceso de oleosidad' },
      { letter: 'D', text: 'Bases/correctores quedan desparejos y algunas zonas absorben' },
    ],
  },
  {
    id: 'P6',
    prompt: '¿Tu piel se irrita o reacciona fácilmente (enrojecimiento, picazón, ardor)?',
    options: [
      { letter: 'A', text: 'Sí' },
      { letter: 'B', text: 'No' },
    ],
  },
  {
    id: 'P7',
    prompt: 'Al tacto, ¿cómo sentís tu piel?',
    options: [
      { letter: 'A', text: 'Áspera' },
      { letter: 'B', text: 'Suave' },
    ],
  },
  {
    id: 'P8',
    prompt: 'Si pellizcás suavemente tu piel y la soltás, ¿cómo reacciona?',
    options: [
      { letter: 'A', text: 'No turgente; tarda en volver a su posición' },
      { letter: 'B', text: 'Elástica' },
    ],
  },
];

export const menQuestions: Question[] = [
  {
    id: 'P1',
    prompt: '¿Qué edad tenés?',
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
    prompt: '¿Tu rostro presenta brillo (grasitud) a lo largo del día?',
    options: [
      { letter: 'A', text: 'Solo nariz y frente' },
      { letter: 'B', text: 'Por todo el rostro' },
      { letter: 'C', text: 'Por todo el rostro y en exceso' },
    ],
  },
  {
    id: 'P3',
    prompt: '¿Cómo ves tus poros?',
    options: [
      { letter: 'A', text: 'Visibles en nariz/pómulos' },
      { letter: 'B', text: 'Dilatados en varias partes' },
      { letter: 'C', text: 'Muy dilatados en la mayor parte' },
      { letter: 'D', text: 'Poco perceptibles en todo el rostro' },
    ],
  },
  {
    id: 'P4',
    prompt: '¿Con qué frecuencia te salen granitos o imperfecciones?',
    options: [
      { letter: 'A', text: 'A veces' },
      { letter: 'B', text: 'Con frecuencia' },
      { letter: 'C', text: 'Con mucha frecuencia, incluso pecho y espalda' },
      { letter: 'D', text: 'Nunca' },
    ],
  },
  {
    id: 'P5',
    prompt: '¿Qué te pasa con la piel al afeitarte?',
    options: [
      { letter: 'A', text: 'Se irrita' },
      { letter: 'B', text: 'No se irrita' },
      { letter: 'C', text: 'Aparecen pústulas' },
      { letter: 'D', text: 'No te afeitas' },
    ],
  },
];

export function getQuestions(gender: 'mujer' | 'hombre'): Question[] {
  return gender === 'mujer' ? womenQuestions : menQuestions;
}

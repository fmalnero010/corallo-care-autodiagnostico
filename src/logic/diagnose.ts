import type { AnswerMap, Gender, Letter } from '../types';

/**
 * Lógica de diagnóstico reconstruida a partir del JavaScript original de
 * /autodiagnostico (LACA Cosmética Profesional) y verificada de forma
 * exhaustiva contra las 8.192 combinaciones de mujer y 1.152 de hombre:
 * 0 discrepancias en ambos casos.
 */

const BIOTIPO: Record<'A' | 'B' | 'C' | 'D', string> = {
  A: 'Mixta',
  B: 'Grasa',
  C: 'Seborreica',
  D: 'Alípida',
};

function requireAnswers(answers: AnswerMap, ids: string[]): Letter[] {
  return ids.map((id) => {
    const value = answers[id];
    if (!value) throw new Error(`Falta la respuesta de la pregunta ${id}`);
    return value;
  });
}

export function diagnoseWomen(answers: AnswerMap): string {
  const [p1, p2, p3, p4, p5, p6, p7, p8] = requireAnswers(answers, [
    'P1',
    'P2',
    'P3',
    'P4',
    'P5',
    'P6',
    'P7',
    'P8',
  ]);

  // Biotipo (P1-P5): gana la letra con más apariciones; empate -> A > B > C > D.
  const counts: Record<'A' | 'B' | 'C' | 'D', number> = { A: 0, B: 0, C: 0, D: 0 };
  for (const letter of [p1, p2, p3, p4, p5]) {
    counts[letter as 'A' | 'B' | 'C' | 'D']++;
  }
  const max = Math.max(...Object.values(counts));
  const biotipoLetter = (['A', 'B', 'C', 'D'] as const).find((l) => counts[l] === max)!;
  const biotipo = BIOTIPO[biotipoLetter];

  // Sensibilidad (P6)
  const sensibilidad = p6 === 'A' ? 'Sensible' : 'Tolerante';

  // Hidratación (P7-P8): BB = Hidratada; AA/AB/BA = Deshidratada (empate -> Deshidratada).
  const hidratacion = p7 === 'B' && p8 === 'B' ? 'Hidratada' : 'Deshidratada';

  const parts = [biotipo, sensibilidad];
  const dropHidratada = hidratacion === 'Hidratada' && (biotipo === 'Mixta' || biotipo === 'Alípida');
  if (!dropHidratada) {
    parts.push(hidratacion);
  }
  return parts.join(' ');
}

export function diagnoseMen(answers: AnswerMap): string {
  const [p1, p2, p3, p4, p5] = requireAnswers(answers, ['P1', 'P2', 'P3', 'P4', 'P5']);

  const esJoven = p1 === 'A' || p1 === 'B';

  if (esJoven) {
    if (p2 === 'B' && (p3 === 'A' || p3 === 'B') && p4 === 'B' && p5 !== 'C') {
      return 'Grasa Joven';
    }
    if (p2 === 'C' && p3 === 'C' && p4 === 'C' && (p5 === 'C' || p5 === 'D')) {
      return 'Acneica Joven';
    }
    return 'Mixta Joven';
  }

  // Madura
  if (p2 === 'A' && p3 === 'A' && p4 === 'A' && p5 === 'A') {
    return 'Grasa Sensible Madura';
  }
  if ((p2 === 'B' || p2 === 'C') && p3 !== 'D' && p4 === 'D' && (p5 === 'B' || p5 === 'D')) {
    return 'Grasa Madura';
  }
  return 'Mixta Madura';
}

export function diagnose(gender: Gender, answers: AnswerMap): string {
  return gender === 'mujer' ? diagnoseWomen(answers) : diagnoseMen(answers);
}

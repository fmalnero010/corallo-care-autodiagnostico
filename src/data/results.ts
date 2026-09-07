export type Biotipo = 'Mixta' | 'Grasa' | 'Seborreica' | 'Alípida';
export type Sensibilidad = 'Sensible' | 'Tolerante';
export type Hidratacion = 'Hidratada' | 'Deshidratada';

export interface TraitInfo {
  label: string;
  blurb: string;
  color: string;
  tint: string;
}

/**
 * Contenido interpretativo por rasgo: es lo que el resultado nunca
 * explicaba antes (un string plano tipo "Mixta Sensible Deshidratada").
 * Cada biotipo tiene, además, su propio color — antes todo resultado se
 * mostraba en el mismo violeta sin distinción.
 */
export const biotipoInfo: Record<Biotipo, TraitInfo> = {
  Mixta: {
    label: 'Mixta',
    blurb:
      'Combina zonas más grasas —frente, nariz y mentón— con otras normales o secas en las mejillas. Se beneficia de productos que equilibren sin resecar ni sobrecargar.',
    color: 'var(--bio-mixta)',
    tint: 'var(--bio-mixta-tint)',
  },
  Grasa: {
    label: 'Grasa',
    blurb:
      'Produce oleosidad en exceso en todo el rostro, con poros dilatados y tendencia a brillar durante el día. Le sientan mejor las fórmulas livianas que regulan la producción de sebo.',
    color: 'var(--bio-grasa)',
    tint: 'var(--bio-grasa-tint)',
  },
  Seborreica: {
    label: 'Seborreica',
    blurb:
      'Piel grasa marcada, con poros muy dilatados y mayor predisposición a comedones e imperfecciones. Se beneficia de una limpieza profunda y control constante del brillo.',
    color: 'var(--bio-seborreica)',
    tint: 'var(--bio-seborreica-tint)',
  },
  Alípida: {
    label: 'Alípida',
    blurb:
      'Produce muy poca grasa natural, por lo que suele verse fina y tener tendencia a la sequedad. Necesita un aporte extra de lípidos y protección constante.',
    color: 'var(--bio-alipida)',
    tint: 'var(--bio-alipida-tint)',
  },
};

export const sensibilidadInfo: Record<Sensibilidad, TraitInfo> = {
  Sensible: {
    label: 'Sensible',
    blurb:
      'Reacciona con enrojecimiento o alteraciones vasculares ante estímulos externos. Conviene priorizar fórmulas suaves, sin fragancia, con activos calmantes.',
    color: 'var(--danger)',
    tint: 'var(--danger-tint)',
  },
  Tolerante: {
    label: 'Tolerante',
    blurb:
      'No presenta enrojecimiento ni reactividad vascular frecuente, lo que da más margen para incorporar activos y tratamientos específicos.',
    color: 'var(--clinical)',
    tint: 'var(--clinical-tint)',
  },
};

export const hidratacionInfo: Record<Hidratacion, TraitInfo> = {
  Hidratada: {
    label: 'Hidratada',
    blurb: 'Mantiene un buen nivel de agua en las capas superiores: se siente suave y elástica al tacto.',
    color: 'var(--clinical)',
    tint: 'var(--clinical-tint)',
  },
  Deshidratada: {
    label: 'Deshidratada',
    blurb:
      'Le falta agua en las capas superiores —no necesariamente grasa—: se siente áspera o tarda en recuperar su posición al pellizcarla. Se corrige con hidratantes a base de agua, no solo con más grasa.',
    color: 'var(--bio-grasa)',
    tint: 'var(--bio-grasa-tint)',
  },
};

export interface ParsedResult {
  biotipo: Biotipo;
  sensibilidad: Sensibilidad;
  hidratacion: Hidratacion;
}

const BIOTIPOS: Biotipo[] = ['Mixta', 'Grasa', 'Seborreica', 'Alípida'];
const SENSIBILIDADES: Sensibilidad[] = ['Sensible', 'Tolerante'];

/**
 * El motor de diagnóstico (`diagnose.ts`) omite la palabra "Hidratada"
 * cuando el biotipo es Mixta o Alípida (no existen "Mixta Hidratada" ni
 * "Alípida Hidratada"). Si el resultado no trae un tercer término, la
 * hidratación real es "Hidratada" — nunca "Deshidratada" sin decirlo.
 */
export function parseResult(result: string): ParsedResult {
  const [first, second, third] = result.split(' ');
  const biotipo = (BIOTIPOS.find((b) => b === first) ?? 'Mixta') as Biotipo;
  const sensibilidad = (SENSIBILIDADES.find((s) => s === second) ?? 'Tolerante') as Sensibilidad;
  const hidratacion: Hidratacion = third === 'Deshidratada' ? 'Deshidratada' : 'Hidratada';
  return { biotipo, sensibilidad, hidratacion };
}

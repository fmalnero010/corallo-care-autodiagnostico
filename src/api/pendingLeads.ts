import type { SendResultRequest } from '../schemas';
import { sendResultEmail } from './sendResult';

const STORAGE_KEY = 'corallo-care-pending-leads';

/**
 * Si el envío del mail falla (API caída, red inestable), antes se perdía
 * el lead sin que nadie se enterara. Esto guarda el payload en localStorage
 * y reintenta en la próxima carga de la app — mejor un reintento simple
 * que ninguno.
 */
function readQueue(): SendResultRequest[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as SendResultRequest[]) : [];
  } catch {
    return [];
  }
}

function writeQueue(queue: SendResultRequest[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(queue));
  } catch {
    // Si localStorage no está disponible, no hay mucho más para hacer acá.
  }
}

export function enqueuePendingLead(payload: SendResultRequest): void {
  const queue = readQueue();
  queue.push(payload);
  writeQueue(queue);
}

/** Reintenta todos los leads pendientes de envíos anteriores fallidos. */
export async function flushPendingLeads(): Promise<void> {
  const queue = readQueue();
  if (queue.length === 0) return;

  const stillPending: SendResultRequest[] = [];
  for (const payload of queue) {
    const res = await sendResultEmail(payload).catch(() => ({ ok: false as const }));
    if (!res.ok) stillPending.push(payload);
  }
  writeQueue(stillPending);
}

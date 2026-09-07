import type { SendResultRequest } from '../schemas';

export interface SendResultResponse {
  ok: boolean;
  error?: string;
}

export async function sendResultEmail(payload: SendResultRequest): Promise<SendResultResponse> {
  const res = await fetch('/api/send-result', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    return { ok: false, error: body?.error ?? `Error ${res.status}` };
  }

  return res.json();
}

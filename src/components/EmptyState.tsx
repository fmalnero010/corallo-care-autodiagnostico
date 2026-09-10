import { useQuizStore } from '../store/useQuizStore';

interface EmptyStateProps {
  message?: string;
}

/**
 * Fallback visible para cualquier etapa que se quede sin el estado que
 * necesita (respuesta faltante, resultado no calculado, etc.). Antes cada
 * paso hacía `return null` ahí, dejando una página en blanco sin salida.
 */
export function EmptyState({ message = 'Algo salió mal.' }: EmptyStateProps) {
  const reset = useQuizStore((s) => s.reset);

  return (
    <div className="card">
      <h1>Ups</h1>
      <p className="subtitle">{message}</p>
      <button type="button" className="primary-button" onClick={reset}>
        Volver a empezar
      </button>
    </div>
  );
}

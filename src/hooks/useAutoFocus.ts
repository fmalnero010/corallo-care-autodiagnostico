import { useEffect, useRef } from 'react';

/**
 * Mueve el foco al encabezado de cada paso cuando se monta. Antes, cambiar
 * de etapa no anunciaba nada a lectores de pantalla: el foco quedaba en un
 * botón que ya no existía. `tabIndex={-1}` permite enfocar el elemento por
 * programa sin sumarlo al orden normal de tabulación.
 */
export function useAutoFocus<T extends HTMLElement>(deps: unknown[] = []) {
  const ref = useRef<T>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    ref.current?.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}

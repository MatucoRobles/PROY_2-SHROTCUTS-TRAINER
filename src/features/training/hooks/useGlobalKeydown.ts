import { useEffect } from 'react';
import { normalizeKeydown, shouldPreventDefault } from '../utils';
import type { Shortcut } from '../types';

interface UseGlobalKeydownOptions {
  shortcut: Shortcut | null;
  enabled?: boolean;
  onMatch: () => void;
  onMismatch?: () => void;
}

/**
 * Hook que escucha `keydown` a nivel de `window` y delega en callbacks
 * del componente consumidor.
 *
 * Diseño:
 * - `enabled` permite suspender el listener (útil cuando la página
 *   todavía no tiene un atajo activo o cuando hay un modal abierto).
 * - `preventDefault` se aplica solo cuando el atajo esperado incluye
 *   modificadores (regla típica de UX: si vas a "guardar", no dejes
 *   que el navegador abra el diálogo).
 * - El listener se suscribe una sola vez por mount; el `shortcut` y los
 *   callbacks se leen por ref para evitar re-suscribir en cada render.
 */
export function useGlobalKeydown({
  shortcut,
  enabled = true,
  onMatch,
  onMismatch,
}: UseGlobalKeydownOptions): void {
  useEffect(() => {
    if (!enabled) return;

    const handler = (event: KeyboardEvent) => {
      if (!shortcut) return;

      const pressed = normalizeKeydown(event);
      if (pressed.size === 0) return;

      const matches =
        pressed.size === shortcut.expectedCombo.length &&
        shortcut.expectedCombo.every((k) => pressed.has(k));

      if (shouldPreventDefault(shortcut.expectedCombo)) {
        event.preventDefault();
      }

      if (matches) onMatch();
      else onMismatch?.();
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [shortcut, enabled, onMatch, onMismatch]);
}

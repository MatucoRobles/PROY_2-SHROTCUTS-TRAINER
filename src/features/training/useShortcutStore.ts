import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Shortcut } from './types';
import { INITIAL_SHORTCUTS } from './constants';
import { filterByTool, pickRandomShortcut } from './utils';

interface ShortcutState {
  shortcuts: Shortcut[];
  currentShortcut: Shortcut | null;

  setCurrentShortcut: (shortcut: Shortcut | null) => void;
  nextShortcut: (tool?: string) => void;
}

/**
 * Store global de entrenamiento.
 *
 * Decisiones arquitectónicas:
 * - Persistencia en `localStorage` delegada al middleware `persist`
 *   (regla 3 de AGENT.md: prohibido `localStorage.setItem` esparcido).
 * - Las acciones de dominio (rotación, filtrado) se exponen aquí solo
 *   cuando son transversales; el filtrado fino por herramienta
 *   se hace desde la feature con utilidades puras.
 *
 * Las métricas de aciertos/errores/racha (D3) son responsabilidad de
 * otro integrante y no viven en este store todavía.
 */
export const useShortcutStore = create<ShortcutState>()(
  persist(
    (set, get) => ({
      shortcuts: INITIAL_SHORTCUTS,
      currentShortcut: INITIAL_SHORTCUTS[0] ?? null,

      setCurrentShortcut: (shortcut) => set({ currentShortcut: shortcut }),

      nextShortcut: (tool) => {
        const { shortcuts, currentShortcut } = get();
        const pool = tool ? filterByTool(shortcuts, tool) : shortcuts;
        const next = pickRandomShortcut(pool, currentShortcut?.id ?? null);
        set({ currentShortcut: next });
      },
    }),
    {
      name: 'shortcuts-trainer-storage',
      version: 1,
    },
  ),
);

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Shortcut } from './types';
import { INITIAL_SHORTCUTS } from './constants';

export interface ShortcutStats {
  correctAttempts: number;
  wrongAttempts: number;
  streak: number;
}

interface ShortcutState {
  stats: ShortcutStats;
  shortcuts: Shortcut[];
  currentShortcut: Shortcut | null;
  recordAttempt: (isCorrect: boolean) => void;
  resetStats: () => void;
  nextShortcut: () => void;
}

export const useShortcutStore = create<ShortcutState>()(
  persist(
    (set, get) => ({
      stats: { correctAttempts: 0, wrongAttempts: 0, streak: 0 },
      shortcuts: INITIAL_SHORTCUTS,
      currentShortcut: INITIAL_SHORTCUTS[0] || null,

      recordAttempt: (isCorrect) =>
        set((state) => ({
          stats: {
            correctAttempts: state.stats.correctAttempts + (isCorrect ? 1 : 0),
            wrongAttempts: state.stats.wrongAttempts + (!isCorrect ? 1 : 0),
            streak: isCorrect ? state.stats.streak + 1 : 0,
          },
        })),

      resetStats: () =>
        set({ stats: { correctAttempts: 0, wrongAttempts: 0, streak: 0 } }),

      nextShortcut: () => {
        const { shortcuts, currentShortcut } = get();
        // Filtramos para no repetir el atajo que acabamos de practicar
        const available = shortcuts.filter(s => s.id !== currentShortcut?.id);
        const next = available.length > 0 ? available[Math.floor(Math.random() * available.length)] : currentShortcut;
        set({ currentShortcut: next });
      }
    }),
    { name: 'shortcuts-trainer-storage' }
  )
);
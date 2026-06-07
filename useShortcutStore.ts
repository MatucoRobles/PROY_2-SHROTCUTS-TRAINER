import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ShortcutStats {
  correctAttempts: number;
  wrongAttempts: number;
  streak: number;
}

interface ShortcutState {
  stats: ShortcutStats;
  recordAttempt: (isCorrect: boolean) => void;
  resetStats: () => void;
}

export const useShortcutStore = create<ShortcutState>()(
  persist(
    (set) => ({
      stats: { correctAttempts: 0, wrongAttempts: 0, streak: 0 },
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
    }),
    { name: 'shortcuts-trainer-storage' }
  )
);
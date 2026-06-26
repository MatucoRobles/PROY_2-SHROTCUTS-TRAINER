import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ThemeMode = 'light' | 'dark';

interface ThemeState {
  mode: ThemeMode;
  toggle: () => void;
}

const STORAGE_KEY = 'shortcuts-trainer-theme-storage';

/**
 * Store global del tema. Default en `'dark'` para mantener el aspecto
 * actual del proyecto; la preferencia del usuario se persiste en
 * `localStorage` y se aplica como clase `.dark` en `<html>` para que
 * la variante `dark:` de Tailwind v4 (configurada en `index.css`)
 * entre en acción.
 */
export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      mode: 'dark',
      toggle: () => {
        const next: ThemeMode = get().mode === 'dark' ? 'light' : 'dark';
        document.documentElement.classList.toggle('dark', next === 'dark');
        set({ mode: next });
      },
    }),
    {
      name: STORAGE_KEY,
      version: 1,
    },
  ),
);

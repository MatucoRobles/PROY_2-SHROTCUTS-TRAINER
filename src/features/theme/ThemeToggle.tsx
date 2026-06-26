import { Moon, Sun } from 'lucide-react';
import { useThemeStore } from './useThemeStore';

/**
 * Botón flotante con 2 estados (light / dark). El ícono indica la
 * acción al hacer click: en dark muestra Sun (porque iría a light),
 * y viceversa.
 */
export function ThemeToggle() {
  const mode = useThemeStore((s) => s.mode);
  const toggle = useThemeStore((s) => s.toggle);
  const isDark = mode === 'dark';

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Tema actual: ${isDark ? 'oscuro' : 'claro'}. Click para cambiar.`}
      title={isDark ? 'Modo oscuro' : 'Modo claro'}
      className="fixed top-4 right-4 z-50 inline-flex items-center justify-center w-10 h-10 rounded-full bg-slate-800/80 border border-slate-700 text-slate-200 hover:bg-slate-700 transition-colors backdrop-blur-sm"
    >
      {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  );
}

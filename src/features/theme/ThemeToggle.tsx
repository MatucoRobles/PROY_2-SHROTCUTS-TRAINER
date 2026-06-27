import { Moon, Sun } from 'lucide-react';
import { useThemeStore } from './useThemeStore';
import { useTranslation } from '@/features/translation/useTranslation';

/**
 * Botón flotante con 2 estados (light / dark). El ícono indica la
 * acción al hacer click: en dark muestra Sun (porque iría a light),
 * y viceversa.
 *
 * Se adapta al tema actual: en dark mode se ve como un botón oscuro
 * glassmorphic; en light mode se ve como un botón claro con sombra
 * sutil. El contraste se mantiene en ambos casos.
 */
export function ThemeToggle() {
  const { t } = useTranslation();
  const mode = useThemeStore((s) => s.mode);
  const toggle = useThemeStore((s) => s.toggle);
  const isDark = mode === 'dark';

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={
        isDark
          ? t('Tema actual: oscuro. Click para cambiar.')
          : t('Tema actual: claro. Click para cambiar.')
      }
      title={isDark ? t('Modo oscuro') : t('Modo claro')}
      className="fixed top-4 right-4 z-50 inline-flex items-center justify-center w-10 h-10 rounded-full bg-slate-800/80 light:bg-white/80 border border-slate-700 light:border-slate-300 text-slate-200 light:text-slate-700 hover:bg-slate-700 light:hover:bg-slate-100 transition-colors backdrop-blur-sm shadow-[0_2px_8px_rgba(0,0,0,0.3)] light:shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
    >
      {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  );
}

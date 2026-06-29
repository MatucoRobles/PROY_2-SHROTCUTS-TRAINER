import { KeyCap } from '@/shared/components/KeyCap';
import type { Shortcut } from '../types';
import { useThemeStore } from '@/features/theme/useThemeStore';
import { useTranslation } from '@/features/translation/useTranslation';

interface ShortcutCardProps {
  shortcut: Shortcut;
}

const KEY_LABELS: Readonly<Record<string, string>> = {
  Control: 'Ctrl',
  Meta: 'Win',
  ArrowUp: '↑',
  ArrowDown: '↓',
  ArrowLeft: '←',
  ArrowRight: '→',
  ' ': 'Space',
};

/**
 * Formatea una tecla técnica (`Control`, `ArrowUp`, ` `) a la
 * convención humana que el usuario espera ver: `Ctrl`, `↑`, `Space`.
 */
function formatKey(key: string): string {
  return KEY_LABELS[key] ?? key;
}

/**
 * Tarjeta central que muestra la descripción del atajo a ejecutar
 * y la combinación esperada, renderizada con `KeyCap` por cada tecla.
 *
 * Sin estado propio: deriva 100% de la prop `shortcut`. Esto facilita
 * reusarlo en modo "preview" (atajo siguiente) o "resultado".
 */
export function ShortcutCard({ shortcut }: ShortcutCardProps) {
  const { t } = useTranslation();
  const isDark = useThemeStore((s) => s.mode === 'dark');

  return (
    <section
      aria-live="polite"
      className="w-full max-w-4xl mx-auto flex flex-col items-center gap-8 bg-slate-900/70 light:bg-white/80 p-10 rounded-2xl border border-slate-800 light:border-slate-200 shadow-2xl backdrop-blur-sm"
    >
      <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
        {t('Atajo a ejecutar')}
      </p>

      <h2 className="text-2xl md:text-3xl font-semibold text-slate-100 light:text-slate-900 text-center">
        {t(shortcut.description)}
      </h2>

      <div className="flex flex-wrap items-center justify-center gap-3">
        {shortcut.expectedCombo.map((key, index) => (
          <KeyCap
            key={`${key}-${index}`}
            char={formatKey(key)}
            variant={isDark ? 'dark' : 'light'}
          />
        ))}
      </div>
    </section>
  );
}

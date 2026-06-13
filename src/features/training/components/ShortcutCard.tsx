import { KeyCap } from '@/shared/components/KeyCap';
import type { Shortcut } from '../types';

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
  return (
    <section
      aria-live="polite"
      className="w-full max-w-2xl mx-auto flex flex-col items-center gap-8 bg-slate-900/70 p-10 rounded-2xl border border-slate-800 shadow-2xl backdrop-blur-sm"
    >
      <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
        Atajo a ejecutar
      </p>

      <h2 className="text-2xl md:text-3xl font-semibold text-slate-100 text-center">
        {shortcut.description}
      </h2>

      <div className="flex flex-wrap items-center justify-center gap-3">
        {shortcut.expectedCombo.map((key, index) => (
          <KeyCap key={`${key}-${index}`} char={formatKey(key)} variant="dark" />
        ))}
      </div>
    </section>
  );
}

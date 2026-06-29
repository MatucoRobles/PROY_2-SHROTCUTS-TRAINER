import { useState } from 'react';
import { ChevronLeft, ChevronRight, AlertTriangle } from 'lucide-react';
import { ShortcutCard } from './ShortcutCard';
import type { Shortcut } from '../types';
import { useTranslation } from '@/features/translation/useTranslation';

interface ShortcutPracticeVisualProps {
  shortcuts: Shortcut[];
  title: string;
  description?: string;
}

/**
 * Vista de práctica visual para atajos peligrosos.
 *
 * No captura teclas reales — usa botones para navegar entre atajos.
 * Úselo para tools cuyos atajos son interceptados por el sistema
 * operativo (tecla `Win`, `Alt+Tab` en algunos entornos) o por el
 * navegador, donde `event.preventDefault()` no alcanza.
 *
 * Hoy se usa para la tool "Windows" (ver `pages/WindowsTraining.tsx`).
 */
export function ShortcutPracticeVisual({
  shortcuts,
  title,
  description,
}: ShortcutPracticeVisualProps) {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % shortcuts.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? shortcuts.length - 1 : prev - 1,
    );
  };

  if (shortcuts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 light:bg-slate-50 text-slate-400 light:text-slate-600 p-6">
        <p>{t('No hay atajos para mostrar.')}</p>
      </div>
    );
  }

  const shortcut = shortcuts[currentIndex];

  return (
    <main className="min-h-screen bg-slate-950 light:bg-slate-50 text-slate-100 light:text-slate-900 flex flex-col items-center justify-center p-6 gap-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">{t(title)}</h1>
        {description && (
          <p className="text-slate-400 light:text-slate-600 text-base">{t(description)}</p>
        )}
      </div>

      {/* Warning */}
      <div className="flex items-start gap-3 bg-amber-900/20 light:bg-amber-50 border border-amber-600/40 light:border-amber-500/40 rounded-xl px-5 py-4 max-w-xl">
        <AlertTriangle className="w-5 h-5 text-amber-400 light:text-amber-600 shrink-0 mt-0.5" aria-hidden />
        <div className="text-sm text-amber-200 light:text-amber-900 leading-relaxed">
          <p className="font-semibold">{t('⚠️ Estos atajos son peligrosos')}</p>
          <p className="mt-1">
            {t(
              'Al presionarlos se ejecutan en tu PC (por ejemplo, Win+L bloquea la computadora). Usá los botones para navegar y aprender las combinaciones visualmente.',
            )}
          </p>
        </div>
      </div>

      {/* Shortcut card */}
      <ShortcutCard shortcut={shortcut} />

      {/* Navigation */}
      <div className="flex items-center gap-6">
        <button
          type="button"
          onClick={handlePrev}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 light:bg-white border border-slate-700 light:border-slate-300 text-slate-200 light:text-slate-700 text-sm font-medium hover:bg-slate-700 light:hover:bg-slate-100 hover:border-slate-600 light:hover:border-slate-400 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" aria-hidden />
          {t('Anterior')}
        </button>

        <span className="text-slate-400 light:text-slate-600 text-sm tabular-nums">
          {currentIndex + 1} / {shortcuts.length}
        </span>

        <button
          type="button"
          onClick={handleNext}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 light:bg-white border border-slate-700 light:border-slate-300 text-slate-200 light:text-slate-700 text-sm font-medium hover:bg-slate-700 light:hover:bg-slate-100 hover:border-slate-600 light:hover:border-slate-400 transition-colors"
        >
          {t('Siguiente')}
          <ChevronRight className="w-4 h-4" aria-hidden />
        </button>
      </div>

      {/* Keyboard hint */}
      <p className="text-xs text-slate-600 light:text-slate-500">
        {t('Podés usar las teclas ← → para navegar')}
      </p>
    </main>
  );
}

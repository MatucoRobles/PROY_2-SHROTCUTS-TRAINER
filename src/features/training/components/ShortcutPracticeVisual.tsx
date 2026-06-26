import { useState } from 'react';
import { ChevronLeft, ChevronRight, AlertTriangle } from 'lucide-react';
import { ShortcutCard } from './ShortcutCard';
import type { Shortcut } from '../types';

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
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-slate-400 p-6">
        <p>No hay atajos para mostrar.</p>
      </div>
    );
  }

  const shortcut = shortcuts[currentIndex];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 gap-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">{title}</h1>
        {description && (
          <p className="text-slate-400 text-base">{description}</p>
        )}
      </div>

      {/* Warning */}
      <div className="flex items-start gap-3 bg-amber-900/20 border border-amber-600/40 rounded-xl px-5 py-4 max-w-xl">
        <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" aria-hidden />
        <div className="text-sm text-amber-200 leading-relaxed">
          <p className="font-semibold">⚠️ Estos atajos son peligrosos</p>
          <p className="mt-1">
            Al presionarlos se ejecutan en tu PC (por ejemplo, Win+L bloquea
            la computadora). Usá los botones para navegar y aprender las
            combinaciones visualmente.
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
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 text-sm font-medium hover:bg-slate-700 hover:border-slate-600 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" aria-hidden />
          Anterior
        </button>

        <span className="text-slate-400 text-sm tabular-nums">
          {currentIndex + 1} / {shortcuts.length}
        </span>

        <button
          type="button"
          onClick={handleNext}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 text-sm font-medium hover:bg-slate-700 hover:border-slate-600 transition-colors"
        >
          Siguiente
          <ChevronRight className="w-4 h-4" aria-hidden />
        </button>
      </div>

      {/* Keyboard hint */}
      <p className="text-xs text-slate-600">
        Podés usar las teclas ← → para navegar
      </p>
    </main>
  );
}

import { useEffect, useRef } from 'react';
import { RotateCcw } from 'lucide-react';
import { useShortcutStore } from '../useShortcutStore';
import { useGlobalKeydown } from '../hooks/useGlobalKeydown';
import { useFeedback } from '../hooks/useFeedback';  // ← nuevo para d5
import { ShortcutCard } from './ShortcutCard';
import { ToolHeader } from './ToolHeader';
import { SessionStats } from './SessionStats';  // ← nuevo para d5
import { cn } from '@/shared/utils/cn';  // ← nuevo para d5
import { useProgressStore } from "../../progress/progressStore"; // ← nuevo para d5
import { getAverageResponseTime, filterByTool } from "../utils"; // ← nuevo para d5
import { LevelFilter } from './LevelFilter';  // ← para D4

interface TrainingSessionProps {
  tool: string;
  description?: string;
}

/**
 * Orquestador de una sesión de entrenamiento acotada a una herramienta.
 *
 * Responsabilidades (D1 - base):
 * 1. Inicializar `currentShortcut` filtrando por `tool` la primera vez
 *    que se monta con ese filtro.
 * 2. Exponer un botón "Siguiente" como fallback (accesibilidad +
 *    entornos donde `keydown` esté capturado por el navegador).
 *
 * Fuera de scope (pertenece a otros D):
 * - D2: detección del atajo. El hook `useGlobalKeydown` ya provee la
 *   infraestructura; el Integrante 2 conectará los handlers de
 *   match/mismatch para reaccionar a las pulsaciones.
 * - D3: registro de métricas (aciertos/errores/racha/tiempo).
 * - D5: feedback visual inmediato y récords personales.
 */
export function TrainingSession({ tool, description }: TrainingSessionProps) {
  const currentShortcut = useShortcutStore((s) => s.currentShortcut);
  const shortcuts = useShortcutStore((s) => s.shortcuts);
  const nextShortcut = useShortcutStore((s) => s.nextShortcut);
  const recordAttempt = useShortcutStore((s) => s.recordAttempt);
  const resetStats = useShortcutStore((s) => s.resetStats);
  const { status, triggerCorrect, triggerWrong } = useFeedback(); // ← nuevo
  const updateRecord = useProgressStore((s) => s.updateRecord); // ← nuevo para D5

  // D3 — cada sesión arranca en cero: reinicia al entrar (mount) y al
  // salir (unmount). Cubre todos los sentidos: index → herramienta,
  // herramienta → index y herramienta → otra herramienta.

  useEffect(() => {
    resetStats();
    return () => {
      // Al salir, guarda el récord de la sesión. 
      const state = useShortcutStore.getState();
      updateRecord(tool, {
        correct: state.correctAttempts,
        wrong: state.wrongAttempts,
        streak: state.currentStreak,
        avgResponseTime: getAverageResponseTime(state.responseTimes),
        masteredIds:
          state.currentStreak >= 2
            ? [state.currentShortcut?.id ?? ""].filter(Boolean)
            : [],
      });
      resetStats();
    };
  }, [tool, resetStats, updateRecord, nextShortcut]);

  // D3 — cronómetro: marca cuándo se mostró el atajo actual.
  // Se reinicia cada vez que cambia currentShortcut.
  const shownAtRef = useRef<number>(performance.now());
  useEffect(() => {
    shownAtRef.current = performance.now();
  }, [currentShortcut]);

  // D3 — registra el resultado que D2 detecta.
  useGlobalKeydown({
    shortcut: currentShortcut,
    enabled: currentShortcut !== null,
    onMatch: () => {
      const elapsed = performance.now() - shownAtRef.current;
      recordAttempt(true, elapsed);
      triggerCorrect(); // ← agregado para D5
      nextShortcut(tool); // acierto → siguiente atajo
    },
    onMismatch: () => {
      const elapsed = performance.now() - shownAtRef.current;
      recordAttempt(false, elapsed);
      // fallo → se queda el mismo atajo (reintentar). No rota.
      triggerWrong(); // ← agregado para D5
    },
  });

  // Inicializa / reinicia el atajo cuando cambia la herramienta o el nivel
useEffect(() => {
  nextShortcut(tool);
}, [tool, nextShortcut]);

  const handleSkip = () => nextShortcut(tool);

  if (!currentShortcut) {
    return (
      <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 gap-6">
        <ToolHeader tool={tool} description={description} />
        <p className="text-slate-400">
          No hay atajos registrados para esta herramienta todavía.
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 gap-8">
      <ToolHeader tool={tool} description={description} />

      <LevelFilter /> {/* D4: Selector de nivel */}

      <div // ← agregado para D5: contenedor del ShortcutCard que cambia su estilo según el feedback
        className={cn(
          "w-full max-w-2xl rounded-2xl transition-all duration-300",
          status === "correct" &&
            "ring-2 ring-emerald-500 shadow-[0_0_24px_2px_rgba(16,185,129,0.25)]",
          status === "wrong" &&
            "ring-2 ring-red-500 shadow-[0_0_24px_2px_rgba(239,68,68,0.25)]",
        )}
      >
        <ShortcutCard shortcut={currentShortcut} />
      </div>
      <SessionStats
        tool={tool}
        totalShortcuts={filterByTool(shortcuts, tool).length}
      />
      <button
        type="button"
        onClick={handleSkip}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-700 text-slate-300 text-sm font-medium hover:border-sky-500 hover:text-sky-400 transition-colors"
      >
        <RotateCcw className="w-4 h-4" aria-hidden />
        Saltar atajo
      </button>
      <p className="text-xs text-slate-500 max-w-md text-center">
        Tip: si tu navegador intercepta la combinación (por ejemplo, Ctrl+S),
        presiona{" "}
        <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700">
          Esc
        </kbd>{" "}
        después de intentar para liberar la captura.
      </p>
    </main>
  );
}

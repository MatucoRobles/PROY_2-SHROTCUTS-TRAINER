import { useEffect, useRef } from 'react';
import { RotateCcw } from 'lucide-react';
import { useShortcutStore } from '../useShortcutStore';
import { useGlobalKeydown } from '../hooks/useGlobalKeydown';
import { filterByTool, pickRandomShortcut } from '../utils';
import { ShortcutCard } from './ShortcutCard';
import { ToolHeader } from './ToolHeader';

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
  const setCurrentShortcut = useShortcutStore((s) => s.setCurrentShortcut);
  const nextShortcut = useShortcutStore((s) => s.nextShortcut);
  const recordAttempt = useShortcutStore((s) => s.recordAttempt);
  const resetStats = useShortcutStore((s) => s.resetStats);

  // D3 — cada sesión arranca en cero: reinicia al entrar (mount) y al
  // salir (unmount). Cubre todos los sentidos: index → herramienta,
  // herramienta → index y herramienta → otra herramienta.
  useEffect(() => {
    resetStats();
    return () => resetStats();
  }, [resetStats]);

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
      nextShortcut(tool); // acierto → siguiente atajo
    },
    onMismatch: () => {
      const elapsed = performance.now() - shownAtRef.current;
      recordAttempt(false, elapsed);
      // fallo → se queda el mismo atajo (reintentar). No rota.
    },
  });

  // Inicializa / reinicia el atajo cuando cambia la herramienta.
  const lastToolRef = useRef<string | null>(null);
  useEffect(() => {
    if (lastToolRef.current === tool) return;
    lastToolRef.current = tool;

    const pool = filterByTool(shortcuts, tool);
    const next = pickRandomShortcut(pool, null);
    setCurrentShortcut(next);
  }, [tool, shortcuts, setCurrentShortcut]);

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

      <ShortcutCard shortcut={currentShortcut} />

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
        presiona <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700">Esc</kbd>
        {' '}después de intentar para liberar la captura.
      </p>
    </main>
  );
}

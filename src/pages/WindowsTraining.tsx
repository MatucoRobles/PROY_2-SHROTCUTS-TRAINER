import { Link } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { useShortcutStore } from '@/features/training/useShortcutStore';
import { ShortcutPracticeVisual } from '@/features/training/components/ShortcutPracticeVisual';
import { filterByTool } from '@/features/training/utils';

/**
 * Training de Windows en modo visual.
 *
 * El sistema operativo intercepta a nivel kernel las combinaciones
 * que incluyen la tecla `Win` (Win+L bloquea la PC, Win+Shift+S abre
 * la herramienta de captura, etc.). `event.preventDefault()` no puede
 * frenar esa acción porque ocurre por debajo del navegador.
 *
 * Por eso esta tool no usa `TrainingSession` (modo activo): en su
 * lugar renderiza `ShortcutPracticeVisual`, que permite navegar
 * atajo por atajo con botones, sin riesgo de ejecutarlos.
 */
export default function WindowsTraining() {
  const shortcuts = useShortcutStore((s) => s.shortcuts);
  const windowsShortcuts = filterByTool(shortcuts, 'Windows');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <header className="w-full px-6 py-3 flex items-center gap-2">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-sky-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden />
          Inicio
        </Link>
        <span className="text-slate-600 text-xs ml-2">
          Modo visual — el SO intercepta las combinaciones con la tecla Windows
        </span>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center p-6 gap-8">
        <ShortcutPracticeVisual
          shortcuts={windowsShortcuts}
          title="Atajos de Windows"
          description="Practicá las combinaciones visualmente. En modo activo no es posible: el sistema operativo las ejecuta antes de que el navegador pueda registrarlas."
        />
      </main>
    </div>
  );
}

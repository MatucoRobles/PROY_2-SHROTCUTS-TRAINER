import { useShortcutStore } from '@/features/training/useShortcutStore';
import { ShortcutPracticeVisual } from '@/features/training/components/ShortcutPracticeVisual';
import { ToolHeader } from '@/features/training/components/ToolHeader';
import { FilterBar } from '@/features/training/components/FilterBar';
import { ToolGlow } from '@/features/training/components/ToolGlow';
import { filterByTool } from '@/features/training/utils';

/**
 * Training de Windows en modo visual.
 *
 * El sistema operativo intercepta a nivel kernel las combinaciones con la
 * tecla `Win` (Win+L bloquea la PC, etc.); `event.preventDefault()` no las
 * frena. Por eso no usa captura de teclas: navega con botones/flechas.
 *
 * Comparte el mismo shell que el resto (ToolHeader + FilterBar + glow de
 * acento) para que se pueda volver, cambiar de herramienta y de nivel.
 */
export default function WindowsTraining() {
  const shortcuts = useShortcutStore((s) => s.shortcuts);
  const selectedLevel = useShortcutStore((s) => s.selectedLevel);

  let pool = filterByTool(shortcuts, 'Windows');
  if (selectedLevel !== null) pool = pool.filter((s) => s.level === selectedLevel);

  return (
    <main className="min-h-screen w-full bg-transparent text-slate-100 light:text-slate-900 flex flex-col items-center p-6 gap-8">
      <ToolGlow tool="Windows" />
      <ToolHeader tool="Windows" />
      <FilterBar activeCategory="Windows" />
      <ShortcutPracticeVisual
        shortcuts={pool}
        description="Practicá las combinaciones visualmente. En modo activo no es posible: el sistema operativo las ejecuta antes de que el navegador pueda registrarlas."
      />
    </main>
  );
}

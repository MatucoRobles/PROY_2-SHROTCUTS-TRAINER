import { useState } from 'react';
import { useShortcutStore } from '@/features/training/useShortcutStore';
import { ShortcutPracticeVisual } from '@/features/training/components/ShortcutPracticeVisual';
import { ChoiceBoard } from '@/features/training/components/ChoiceBoard';
import { ToolHeader } from '@/features/training/components/ToolHeader';
import { FilterBar } from '@/features/training/components/FilterBar';
import { ToolGlow } from '@/features/training/components/ToolGlow';
import { filterByTool } from '@/features/training/utils';
import { cn } from '@/shared/utils/cn';
import { useTranslation } from '@/features/translation/useTranslation';

type WinMode = 'visual' | 'choice';

const WIN_MODES: ReadonlyArray<{ value: WinMode; label: string }> = [
  { value: 'visual', label: 'Visual' },
  { value: 'choice', label: 'Opción múltiple' },
];

/**
 * Training de Windows. Los atajos con la tecla `Win` los intercepta el SO,
 * así que no hay captura de teclado. Pero sí admite dos modos sin teclas:
 * - Visual: navegar atajo por atajo con botones/flechas.
 * - Opción múltiple: elegir qué hace cada combinación (clic).
 */
export default function WindowsTraining() {
  const { t } = useTranslation();
  const shortcuts = useShortcutStore((s) => s.shortcuts);
  const selectedLevel = useShortcutStore((s) => s.selectedLevel);
  const [mode, setMode] = useState<WinMode>('visual');

  let pool = filterByTool(shortcuts, 'Windows');
  if (selectedLevel !== null) pool = pool.filter((s) => s.level === selectedLevel);

  return (
    <main className="min-h-screen w-full bg-transparent text-slate-100 light:text-slate-900 flex flex-col items-center p-6 gap-8">
      <ToolGlow tool="Windows" />
      <ToolHeader tool="Windows" />
      <FilterBar activeCategory="Windows" />

      <div className="flex items-center gap-2 flex-wrap justify-center">
        {WIN_MODES.map((m) => (
          <button
            key={m.value}
            type="button"
            onClick={() => setMode(m.value)}
            className={cn(
              'px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200',
              mode === m.value
                ? 'bg-sky-500/15 light:bg-sky-50 border border-sky-500 text-sky-400 light:text-sky-700 shadow-[0_0_12px_rgba(56,189,248,0.3)]'
                : 'bg-transparent border border-slate-700/50 light:border-slate-300 text-slate-400 light:text-slate-500 hover:border-slate-500 light:hover:border-slate-400 hover:text-slate-200 light:hover:text-slate-700',
            )}
          >
            {t(m.label)}
          </button>
        ))}
      </div>

      {mode === 'visual' ? (
        <ShortcutPracticeVisual
          shortcuts={pool}
          description="Practicá las combinaciones visualmente. En modo activo no es posible: el sistema operativo las ejecuta antes de que el navegador pueda registrarlas."
        />
      ) : (
        <ChoiceBoard key="win-choice" tool="Windows" />
      )}
    </main>
  );
}

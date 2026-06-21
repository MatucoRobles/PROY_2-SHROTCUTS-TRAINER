import { cn } from '@/shared/utils/cn';
import { useShortcutStore } from '../useShortcutStore';

const LEVELS = [
  { value: null, label: 'Todos' },
  { value: 1, label: 'Nivel 1' },
  { value: 2, label: 'Nivel 2' },
  { value: 3, label: 'Nivel 3' },
  { value: 4, label: 'Nivel 4' },
];

export function LevelFilter() {
  const selectedLevel = useShortcutStore((s) => s.selectedLevel);
  const setSelectedLevel = useShortcutStore((s) => s.setSelectedLevel);

  return (
    <div className="flex gap-2 justify-center flex-wrap">
      {LEVELS.map((level) => (
        <button
          key={level.label}
          onClick={() => setSelectedLevel(level.value)}
          className={cn(
            'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
            selectedLevel === level.value
              ? 'bg-sky-500 text-white'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          )}
        >
          {level.label}
        </button>
      ))}
    </div>
  );
}
import { cn } from '@/shared/utils/cn';
import { useTranslation } from '@/features/translation/useTranslation';
import { useModeStore, type TrainingMode } from '../modeStore';

const MODES: ReadonlyArray<{ value: TrainingMode; label: string }> = [
  { value: 'learn', label: 'Aprender' },
  { value: 'guess', label: 'Adivinar' },
  { value: 'choice', label: 'Opción múltiple' },
  { value: 'timeattack', label: 'Contrarreloj' },
];

export function ModeSelector() {
  const { t } = useTranslation();
  const mode = useModeStore((s) => s.mode);
  const setMode = useModeStore((s) => s.setMode);

  return (
    <div
      role="group"
      aria-label={t('Modo de entrenamiento')}
      className="flex items-center gap-2 flex-wrap justify-center"
    >
      {MODES.map((m) => (
        <button
          key={m.value}
          type="button"
          aria-pressed={mode === m.value}
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
  );
}

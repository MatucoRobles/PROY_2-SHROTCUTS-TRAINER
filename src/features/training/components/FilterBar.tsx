import { Link } from 'react-router';
import { cn } from '@/shared/utils/cn';
import { useShortcutStore } from '../useShortcutStore';
import { useTranslation } from '@/features/translation/useTranslation';

/**
 * Barra de filtros unificada para categorías y niveles.
 * Diseño compacto con:
 * - Contenedor con bordes superior e inferior
 * - Botones de categorías (estilo píldora activa con glow)
 * - Separador vertical
 * - Botones de niveles (estilo píldora)
 * - Todo en una sola fila horizontal hacia la izquierda
 */

const CATEGORIES = [
  { value: 'General', label: 'General' },
  { value: 'VS Code', label: 'VS Code' },
  { value: 'Chrome', label: 'Chrome' },
  { value: 'Windows', label: 'Windows' },
];

const LEVELS = [
  { value: null, label: 'Todos' },
  { value: 1, label: 'Nivel 1' },
  { value: 2, label: 'Nivel 2' },
  { value: 3, label: 'Nivel 3' },
  { value: 4, label: 'Nivel 4' },
];

// Mapeo de categorías a rutas
const CATEGORY_ROUTES: Record<string, string> = {
  'General': '/general',
  'VS Code': '/vscode',
  'Chrome': '/chrome',
  'Windows': '/windows',
};

interface FilterBarProps {
  activeCategory: string;
}

export function FilterBar({ activeCategory }: FilterBarProps) {
  const { t } = useTranslation();
  const selectedLevel = useShortcutStore((s) => s.selectedLevel);
  const setSelectedLevel = useShortcutStore((s) => s.setSelectedLevel);

  return (
    <div className="w-full px-4 sm:px-6">
      {/* Contenedor con bordes superior e inferior */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 py-2.5
                      border-y border-slate-800/80 light:border-slate-200
                      bg-slate-900/30 light:bg-white/40 backdrop-blur-sm">

        {/* Bloque de Categorías */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.value}
              to={CATEGORY_ROUTES[cat.value]}
              className={cn(
                'px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200',
                activeCategory === cat.value
                  ? 'bg-slate-800 light:bg-sky-50 border border-sky-500 text-sky-400 light:text-sky-700 shadow-[0_0_12px_rgba(56,189,248,0.3)]'
                  : 'bg-transparent border border-slate-700/50 light:border-slate-300 text-slate-400 light:text-slate-500 hover:border-slate-500 light:hover:border-slate-400 hover:text-slate-200 light:hover:text-slate-700'
              )}
            >
              {t(cat.label)}
            </Link>
          ))}
        </div>

        {/* Separador vertical (solo desktop) */}
        <span className="hidden sm:block w-px h-6 bg-slate-700/60 light:bg-slate-300 flex-shrink-0" aria-hidden />

        {/* Bloque de Niveles */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
          {LEVELS.map((level) => (
            <button
              key={level.label}
              onClick={() => setSelectedLevel(level.value)}
              className={cn(
                'px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200',
                selectedLevel === level.value
                  ? 'bg-slate-700/80 light:bg-slate-200 border border-slate-500/70 light:border-slate-400 text-slate-100 light:text-slate-900'
                  : 'bg-transparent border border-slate-700/50 light:border-slate-300 text-slate-400 light:text-slate-500 hover:border-slate-500 light:hover:border-slate-400 hover:text-slate-200 light:hover:text-slate-700'
              )}
            >
              {t(level.label)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

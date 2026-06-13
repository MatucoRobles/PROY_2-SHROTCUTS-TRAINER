import { Link } from 'react-router';
import { Code, Globe, Keyboard, MonitorSmartphone, Layers, ArrowRight } from 'lucide-react';
import { useShortcutStore } from '../useShortcutStore';
import { cn } from '@/shared/utils/cn';

interface ToolCard {
  tool: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
  accent: string;
}

const TOOLS: ReadonlyArray<ToolCard> = [
  {
    tool: 'General',
    title: 'Atajos generales',
    description: 'Copia, pega, deshacer y guardar. La base de cualquier editor.',
    icon: Keyboard,
    path: '/general',
    accent: 'text-sky-400',
  },
  {
    tool: 'VS Code',
    title: 'Visual Studio Code',
    description: 'Paleta de comandos, formateo, multi-cursor y navegación.',
    icon: Code,
    path: '/vscode',
    accent: 'text-indigo-400',
  },
  {
    tool: 'Chrome',
    title: 'Google Chrome',
    description: 'Pestañas, historial, descargas y modo incógnito.',
    icon: Globe,
    path: '/chrome',
    accent: 'text-emerald-400',
  },
  {
    tool: 'Windows',
    title: 'Windows',
    description: 'Escritorio virtual, bloqueo, captura y administrador de tareas.',
    icon: MonitorSmartphone,
    path: '/windows',
    accent: 'text-amber-400',
  },
];

interface ToolTileProps {
  card: ToolCard;
  count: number;
}

function ToolTile({ card, count }: ToolTileProps) {
  const Icon = card.icon;
  return (
    <Link
      to={card.path}
      className="group flex flex-col gap-3 p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-sky-500/60 hover:bg-slate-900 transition-colors"
    >
      <div className="flex items-center justify-between">
        <span
          className={cn(
            'inline-flex items-center justify-center w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700',
            card.accent,
          )}
        >
          <Icon className="w-5 h-5" aria-hidden />
        </span>
        <ArrowRight
          className="w-4 h-4 text-slate-600 group-hover:text-sky-400 group-hover:translate-x-1 transition-transform"
          aria-hidden
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold text-slate-100">{card.title}</h3>
        <p className="text-sm text-slate-400 mt-1">{card.description}</p>
      </div>

      <span className="text-xs uppercase tracking-widest text-slate-500">
        {count} {count === 1 ? 'atajo' : 'atajos'}
      </span>
    </Link>
  );
}

/**
 * Landing del entrenador. No contiene lógica de teclado:
 * su único rol es enrutar al usuario a la sesión de su herramienta.
 *
 * Lee los conteos desde el store para mostrar cuántos atajos hay
 * disponibles por herramienta. Esto se recalcula solo si la colección
 * de atajos cambia (selector granular de Zustand).
 */
export function TrainerHome() {
  const shortcuts = useShortcutStore((s) => s.shortcuts);

  const counts = shortcuts.reduce<Record<string, number>>((acc, s) => {
    acc[s.tool] = (acc[s.tool] ?? 0) + 1;
    return acc;
  }, {});

  const total = shortcuts.length;

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-4xl flex flex-col gap-10">
        <header className="text-center space-y-3">
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.4em] text-sky-400">
            <Layers className="w-3.5 h-3.5" aria-hidden />
            Shortcuts Trainer
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Memoriza atajos, no menus
          </h1>
          <p className="text-slate-400 text-base max-w-xl mx-auto">
            Practica combinaciones reales de tu editor, navegador y sistema
            operativo. Tu progreso se guarda automáticamente.
          </p>
        </header>

        <section
          aria-label="Entrenamientos disponibles"
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {TOOLS.map((card) => (
            <ToolTile key={card.tool} card={card} count={counts[card.tool] ?? 0} />
          ))}
        </section>

        <footer className="text-center text-xs text-slate-500">
          {total} atajos cargados · persistencia local activa
        </footer>
      </div>
    </main>
  );
}

import { Link } from 'react-router';
import { ChevronLeft, Keyboard } from 'lucide-react';

interface ToolHeaderProps {
  tool: string;
  description?: string;
}

/**
 * Encabezado de página de entrenamiento.
 * Mantiene la marca "Tec" en una paleta sobria: fondo casi negro,
 * acentos en azul institucional (`sky-400`) y tipografía en `slate-100`.
 */
export function ToolHeader({ tool, description }: ToolHeaderProps) {
  return (
    <header className="w-full max-w-2xl mx-auto flex flex-col gap-3">
      <Link
        to="/"
        className="self-start inline-flex items-center gap-1 text-xs uppercase tracking-widest text-slate-500 hover:text-sky-400 transition-colors"
      >
        <ChevronLeft className="w-4 h-4" aria-hidden />
        Inicio
      </Link>

      <div className="flex items-center gap-3">
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-400">
          <Keyboard className="w-5 h-5" aria-hidden />
        </span>
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Entrenamiento · {tool}</h1>
          {description && (
            <p className="text-sm text-slate-400">{description}</p>
          )}
        </div>
      </div>
    </header>
  );
}

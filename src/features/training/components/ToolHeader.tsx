import { Link } from 'react-router';
import { ArrowLeft, Keyboard, BarChart2 } from "lucide-react";

interface ToolHeaderProps {
  tool: string;
  description?: string;
}

/**
 * Encabezado compacto de página de entrenamiento.
 * Diseño refactorizado con:
 * - Fila única con distribución space-between
 * - Flecha "← Inicio" con separador e ícono integrado
 * - Título compacto dinámico "Entrenamiento · [Categoría]"
 * - Botón "Progreso" estilo píldora con efecto glass
 */
export function ToolHeader({ tool, description }: ToolHeaderProps) {
  return (
    <header className="w-full flex items-center justify-between gap-4 px-6 py-3">
      {/* Sección izquierda: Back + Separador + Icon + Título */}
      <div className="flex items-center gap-3">
        {/* Botón "← Inicio" */}
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-sky-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden />
          <span className="hidden sm:inline">Inicio</span>
        </Link>

        {/* Separador sutil */}
        <span className="w-px h-5 bg-slate-700" aria-hidden />

        {/* Ícono del teclado */}
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-sky-500/15 border border-sky-500/25 text-sky-400">
          <Keyboard className="w-4 h-4" aria-hidden />
        </span>

        {/* Título dinámico */}
        <h1 className="text-lg font-semibold text-slate-100">
          Entrenamiento · <span className="text-sky-400">{tool}</span>
        </h1>
      </div>

      {/* Botón "Progreso" - Estilo píldora con glass effect */}
      <Link
        to="/progress"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full 
                   bg-slate-800/60 backdrop-blur-sm border border-slate-600/50
                   text-sm font-medium text-slate-300 
                   hover:border-sky-500/70 hover:text-sky-400 
                   transition-all duration-200
                   shadow-[0_2px_8px_rgba(0,0,0,0.3)]"
      >
        <BarChart2 className="w-4 h-4" aria-hidden />
        Progreso
      </Link>
    </header>
  );
}

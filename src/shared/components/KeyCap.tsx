import { cn } from '@/shared/utils/cn';

type KeyCapVariant = 'light' | 'dark';

interface KeyCapProps {
  char: string;
  variant?: KeyCapVariant;
  className?: string;
}

const VARIANT_STYLES: Record<KeyCapVariant, string> = {
  light:
    'bg-gray-100 text-gray-800 border-gray-300 shadow-[0_4px_0_rgb(209,213,219)]',
  dark: 'bg-slate-800 text-slate-100 border-slate-600 shadow-[0_4px_0_rgb(15,23,42)]',
};

/**
 * Etiqueta visual minimalista que representa una tecla.
 *
 * - Soporta tema claro y oscuro para no chocar con el resto del UI.
 * - `cn` resuelve conflictos de Tailwind cuando el consumidor pasa
 *   clases adicionales (regla 6 de las buenas prácticas implícitas).
 * - Renderiza como `<kbd>` por semántica de accesibilidad: un lector
 *   de pantalla lo anuncia como "tecla" en lugar de texto genérico.
 */
export function KeyCap({ char, variant = 'light', className }: KeyCapProps) {
  return (
    <kbd
      className={cn(
        'min-w-[3rem] h-12 px-4 inline-flex items-center justify-center text-xl font-bold rounded-lg border uppercase transition-transform',
        VARIANT_STYLES[variant],
        className,
      )}
    >
      {char}
    </kbd>
  );
}

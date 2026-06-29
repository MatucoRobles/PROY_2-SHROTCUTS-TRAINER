import { Outlet, useLocation } from 'react-router';
import { ThemeToggle } from '@/features/theme/ThemeToggle';
import { LanguageToggle } from '@/features/translation/LanguageToggle';

// En las pantallas de training los toggles viven dentro del ToolHeader
// (al lado de "Progreso"), así que ahí no mostramos el top bar.
const TRAINING_PATHS = new Set(['/general', '/vscode', '/chrome', '/windows']);

export function RootLayout() {
  const { pathname } = useLocation();
  const showBar = !TRAINING_PATHS.has(pathname);

  return (
    <>
      {showBar && (
        <div className="flex items-center justify-end gap-2 px-4 py-2 bg-transparent">
          <LanguageToggle />
          <ThemeToggle />
        </div>
      )}
      <Outlet />
    </>
  );
}

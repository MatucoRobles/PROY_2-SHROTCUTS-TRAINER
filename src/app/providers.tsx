import type { PropsWithChildren } from 'react';
import { Toaster } from 'sonner';
import { ThemeToggle } from '@/features/theme/ThemeToggle';
import { LanguageToggle } from '@/features/translation/LanguageToggle';
import { useThemeStore } from '@/features/theme/useThemeStore';

export function AppProviders({ children }: PropsWithChildren) {
  const mode = useThemeStore((s) => s.mode);

  return (
    <>
      <div className="flex items-center justify-end gap-2 px-4 py-2 bg-transparent">
        <LanguageToggle />
        <ThemeToggle />
      </div>
      {children}
      <Toaster theme={mode} position="top-center" richColors />
    </>
  );
}
import type { PropsWithChildren } from 'react';
import { ThemeToggle } from '@/features/theme/ThemeToggle';
import { LanguageToggle } from '@/features/translation/LanguageToggle';

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <>
      <div className="flex items-center justify-end gap-2 px-4 py-2 bg-slate-950 light:bg-slate-50">
        <LanguageToggle />
        <ThemeToggle />
      </div>
      {children}
    </>
  );
}
import type { PropsWithChildren } from 'react';
import { ThemeToggle } from '@/features/theme/ThemeToggle';
import { LanguageToggle } from '@/features/translation/LanguageToggle';

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <>
      {children}
      <LanguageToggle />
      <ThemeToggle />
    </>
  );
}
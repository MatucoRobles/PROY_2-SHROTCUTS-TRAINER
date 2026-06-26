import type { PropsWithChildren } from 'react';
import { ThemeToggle } from '@/features/theme/ThemeToggle';

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <>
      {children}
      <ThemeToggle />
    </>
  );
}
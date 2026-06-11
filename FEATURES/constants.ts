import type { Shortcut } from '../types';

// Usamos una IIFE (Immediately Invoked Function Expression) o simplemente 
// mapeamos el array si necesitamos ejecutar crypto.randomUUID() en runtime.
export const INITIAL_SHORTCUTS: Shortcut[] = [
  {
    id: crypto.randomUUID(),
    description: 'Copiar selección',
    expectedCombo: ['Control', 'c'],
    tool: 'General',
    level: 1,
  },
  {
    id: crypto.randomUUID(),
    description: 'Pegar selección',
    expectedCombo: ['Control', 'v'],
    tool: 'General',
    level: 1,
  },
  {
    id: crypto.randomUUID(),
    description: 'Guardar archivo',
    expectedCombo: ['Control', 's'],
    tool: 'VS Code',
    level: 1,
  },
  {
    id: crypto.randomUUID(),
    description: 'Deshacer acción',
    expectedCombo: ['Control', 'z'],
    tool: 'General',
    level: 2,
  }
];
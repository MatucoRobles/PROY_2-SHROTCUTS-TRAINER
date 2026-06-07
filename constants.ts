import type { Shortcut } from '../types';

// Usamos una IIFE (Immediately Invoked Function Expression) o simplemente 
// mapeamos el array si necesitamos ejecutar crypto.randomUUID() en runtime.
export const INITIAL_SHORTCUTS: Shortcut[] = [
  {
    id: crypto.randomUUID(),
    description: 'Copiar selección',
    keys: ['Control', 'c'],
    category: 'editing',
  },
  {
    id: crypto.randomUUID(),
    description: 'Pegar selección',
    keys: ['Control', 'v'],
    category: 'editing',
  },
  {
    id: crypto.randomUUID(),
    description: 'Guardar archivo',
    keys: ['Control', 's'],
    category: 'general',
  },
  {
    id: crypto.randomUUID(),
    description: 'Deshacer acción',
    keys: ['Control', 'z'],
    category: 'editing',
  }
];
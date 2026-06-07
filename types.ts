export type ShortcutCategory = 'general' | 'navigation' | 'editing' | 'formatting';

export interface Shortcut {
  id: string;
  description: string;
  /**
   * Arreglo con las teclas exactas que componen el atajo.
   * Usaremos los valores estándar del evento KeyboardEvent.key
   * Ejemplos: ['Control', 'c'], ['Shift', 'ArrowUp'], ['Meta', 'k']
   */
  keys: string[];
  category: ShortcutCategory;
  // Podríamos agregar 'platform?: "mac" | "windows"' si después quieren 
  // hacer el D5 (Soporte Multi-plataforma).
}
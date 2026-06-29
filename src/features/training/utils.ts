import type { Shortcut } from './types';

/**
 * Mapa de sinónimos entre `KeyboardEvent.key` (que el navegador reporta
 * con capitalización irregular y locale-dependiente) y la forma canónica
 * que usaremos dentro de la aplicación.
 *
 * Mantener este mapa en una constante evita recrear el objeto en cada
 * `keydown`, lo que importa porque el handler se ejecuta en el hot path
 * del navegador.
 */
const KEY_ALIASES: Readonly<Record<string, string>> = {
  ' ': 'Space',
  Spacebar: 'Space',
  Esc: 'Escape',
  Escape: 'Escape',
  Del: 'Delete',
  Ins: 'Insert',
  PageUp: 'PageUp',
  PageDown: 'PageDown',
  ArrowUp: 'ArrowUp',
  ArrowDown: 'ArrowDown',
  ArrowLeft: 'ArrowLeft',
  ArrowRight: 'ArrowRight',
  Control: 'Control',
  Ctrl: 'Control',
  Shift: 'Shift',
  Alt: 'Alt',
  Meta: 'Meta',
  OS: 'Meta',
  Cmd: 'Meta',
  Command: 'Meta',
  Win: 'Meta',
};

const MODIFIER_KEYS: ReadonlySet<string> = new Set([
  'Control',
  'Shift',
  'Alt',
  'Meta',
]);

/**
 * Normaliza un `KeyboardEvent` a un Set<string> canónico de teclas activas.
 *
 * - Normaliza capitalización (e.g. `'c'` → `'c'`, `'C'` → `'c'` cuando hay
 *   modificadores, para no distinguir entre la letra sola y la combinación).
 * - Resuelve alias (`' '` → `'Space'`, `'Cmd'` → `'Meta'`, etc).
 * - Ignora modificadores solos: si el usuario presiona solo `Ctrl`, eso no
 *   es un atajo. Consideramos que hay un atajo solo cuando hay al menos
 *   una tecla no-modificadora.
 */
export function normalizeKeydown(event: KeyboardEvent): Set<string> {
  const keys = new Set<string>();
  if (event.ctrlKey) keys.add('Control');
  if (event.shiftKey) keys.add('Shift');
  if (event.altKey) keys.add('Alt');
  if (event.metaKey) keys.add('Meta');

  const raw = event.key;
  const resolved = KEY_ALIASES[raw] ?? raw;

  if (typeof resolved === 'string' && resolved.length > 0) {
    if (MODIFIER_KEYS.has(resolved)) {
      return new Set();
    }
    keys.add(resolved.length === 1 ? resolved.toLowerCase() : resolved);
  }

  return keys;
}

/**
 * Compara un set de teclas presionadas (normalizadas) con el
 * `expectedCombo` de un `Shortcut`. Devuelve `true` si los dos sets son
 * estructuralmente iguales (mismo tamaño, mismas teclas, sin importar orden).
 *
 * Aplica el mismo `KEY_ALIASES` que `normalizeKeydown` a cada tecla del
 * `expected`, de modo que `"Win"` matchee con `"Meta"` (que es como
 * llega desde `event.metaKey`) y `"Cmd"` también, etc.
 */
export function isMatchingCombo(
  pressed: ReadonlySet<string>,
  expected: ReadonlyArray<string>,
): boolean {
  if (pressed.size !== expected.length) return false;
  for (const key of expected) {
    const normalized = KEY_ALIASES[key] ?? key;
    if (!pressed.has(normalized)) return false;
  }
  return true;
}

const KEY_LABELS: Readonly<Record<string, string>> = {
  Control: 'Ctrl',
  Meta: 'Win',
  ArrowUp: '↑',
  ArrowDown: '↓',
  ArrowLeft: '←',
  ArrowRight: '→',
  ' ': 'Space',
};

/** Tecla técnica → etiqueta humana (`Control` → `Ctrl`, `ArrowUp` → `↑`). */
export function formatKeyLabel(key: string): string {
  return KEY_LABELS[key] ?? key;
}

/**
 * Forma canónica de una tecla (alias resueltos + minúscula si es de un
 * solo carácter). Sirve tanto para `event.key` como para las teclas del
 * `expectedCombo`, de modo que comparar membresía sea trivial.
 */
export function canonicalKey(rawKey: string): string {
  const resolved = KEY_ALIASES[rawKey] ?? rawKey;
  return resolved.length === 1 ? resolved.toLowerCase() : resolved;
}

/**
 * Decide si el atajo debe prevenir el comportamiento nativo del navegador
 * (guardar, abrir diálogo, etc). Útil para evitar que `Ctrl+S` abra el
 * diálogo de "Guardar como" mientras se entrena.
 */
export function shouldPreventDefault(combo: ReadonlyArray<string>): boolean {
  return combo.some((key) => MODIFIER_KEYS.has(key));
}

/**
 * Selecciona un atajo aleatorio del array recibido, evitando repetir el
 * `previousId` cuando hay al menos dos candidatos.
 *
 * Función pura: no toca estado ni DOM, lo que la hace trivial de testear.
 */
export function pickRandomShortcut(
  pool: ReadonlyArray<Shortcut>,
  previousId: string | null,
): Shortcut | null {
  if (pool.length === 0) return null;
  if (pool.length === 1) return pool[0] ?? null;

  const candidates = pool.filter((s) => s.id !== previousId);
  const source = candidates.length > 0 ? candidates : pool;
  const index = Math.floor(Math.random() * source.length);
  return source[index] ?? null;
}

/**
 * Filtra atajos por herramienta (tool) — usado por las páginas de
 * entrenamiento para acotar el universo a un solo contexto (Chrome, VS Code…).
 */
export function filterByTool(
  shortcuts: ReadonlyArray<Shortcut>,
  tool: string,
): Shortcut[] {
  return shortcuts.filter((s) => s.tool === tool);
}

export function getAccuracy(correct: number, wrong: number): number {
  const total = correct + wrong;
  if (total === 0) return 0;
  return Math.round((correct / total) * 100);
}

export function getAverageResponseTime(times: ReadonlyArray<number>):
number {
  if (times.length === 0) return 0;
  const sum = times.reduce((acc, time) => acc + time, 0);
  return Math.round(sum / times.length);
}


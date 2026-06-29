import type { Shortcut } from './types';

export const TOOL_GLOW: Readonly<Record<string, string>> = {
  General: 'bg-sky-500',
  'VS Code': 'bg-indigo-500',
  Chrome: 'bg-emerald-500',
  Windows: 'bg-amber-500',
};

export const INITIAL_SHORTCUTS: Shortcut[] = [
  {
    id: crypto.randomUUID(),
    description: "Copiar texto seleccionado",
    expectedCombo: ["Control", "c"],
    tool: "General",
    level: 1,
  },
  {
    id: crypto.randomUUID(),
    description: "Pegar contenido",
    expectedCombo: ["Control", "v"],
    tool: "General",
    level: 1,
  },

  {
    id: crypto.randomUUID(),
    description: "Deshacer última acción",
    expectedCombo: ["Control", "z"],
    tool: "General",
    level: 2,
  },
  {
    id: crypto.randomUUID(),
    description: "Buscar texto",
    expectedCombo: ["Control", "f"],
    tool: "General",
    level: 2,
  },

  {
    id: crypto.randomUUID(),
    description: "Reemplazar texto",
    expectedCombo: ["Control", "h"],
    tool: "General",
    level: 3,
  },
  {
    id: crypto.randomUUID(),
    description: "Ir al principio del documento",
    expectedCombo: ["Control", "Home"],
    tool: "General",
    level: 3,
  },

  {
    id: crypto.randomUUID(),
    description: "Seleccionar desde cursor hasta inicio",
    expectedCombo: ["Control", "Shift", "Home"],
    tool: "General",
    level: 4,
  },
  {
    id: crypto.randomUUID(),
    description: "Ir al final del documento",
    expectedCombo: ["Control", "End"],
    tool: "General",
    level: 3,
  },

  // ── Chrome ──
  {
    id: crypto.randomUUID(),
    description: "Abrir nueva pestaña",
    expectedCombo: ["Control", "t"],
    tool: "Chrome",
    level: 1,
  },
  {
    id: crypto.randomUUID(),
    description: "Cerrar pestaña actual",
    expectedCombo: ["Control", "w"],
    tool: "Chrome",
    level: 1,
  },

  {
    id: crypto.randomUUID(),
    description: "Reabrir última pestaña cerrada",
    expectedCombo: ["Control", "Shift", "t"],
    tool: "Chrome",
    level: 2,
  },
  {
    id: crypto.randomUUID(),
    description: "Ir a la barra de direcciones",
    expectedCombo: ["Control", "l"],
    tool: "Chrome",
    level: 2,
  },

  {
    id: crypto.randomUUID(),
    description: "Abrir modo incógnito",
    expectedCombo: ["Control", "Shift", "n"],
    tool: "Chrome",
    level: 3,
  },
  {
    id: crypto.randomUUID(),
    description: "Abrir historial",
    expectedCombo: ["Control", "h"],
    tool: "Chrome",
    level: 3,
  },

  {
    id: crypto.randomUUID(),
    description: "Ir a la pestaña 5",
    expectedCombo: ["Control", "5"],
    tool: "Chrome",
    level: 4,
  },
  {
    id: crypto.randomUUID(),
    description: "Cerrar todas las pestañas",
    expectedCombo: ["Control", "Shift", "w"],
    tool: "Chrome",
    level: 4,
  },

  // ── VS Code ──
  {
    id: crypto.randomUUID(),
    description: "Guardar archivo",
    expectedCombo: ["Control", "s"],
    tool: "VS Code",
    level: 1,
  },
  {
    id: crypto.randomUUID(),
    description: "Copiar línea",
    expectedCombo: ["Control", "c"],
    tool: "VS Code",
    level: 1,
  },

  {
    id: crypto.randomUUID(),
    description: "Abrir archivo rápidamente",
    expectedCombo: ["Control", "p"],
    tool: "VS Code",
    level: 2,
  },
  {
    id: crypto.randomUUID(),
    description: "Comentar línea",
    expectedCombo: ["Control", "/"],
    tool: "VS Code",
    level: 2,
  },

  {
    id: crypto.randomUUID(),
    description: "Abrir la paleta de comandos",
    expectedCombo: ["Control", "Shift", "p"],
    tool: "VS Code",
    level: 3,
  },
  {
    id: crypto.randomUUID(),
    description: "Buscar en todo el proyecto",
    expectedCombo: ["Control", "Shift", "f"],
    tool: "VS Code",
    level: 3,
  },

  {
    id: crypto.randomUUID(),
    description: "Duplicar línea",
    expectedCombo: ["Shift", "Alt", "ArrowDown"],
    tool: "VS Code",
    level: 4,
  },
  {
    id: crypto.randomUUID(),
    description: "Mover línea hacia arriba",
    expectedCombo: ["Alt", "ArrowUp"],
    tool: "VS Code",
    level: 4,
  },

  // ── Windows ──
  {
    id: crypto.randomUUID(),
    description: "Bloquear la computadora",
    expectedCombo: ["Win", "l"],
    tool: "Windows",
    level: 1,
  },
  {
    id: crypto.randomUUID(),
    description: "Mostrar escritorio",
    expectedCombo: ["Win", "d"],
    tool: "Windows",
    level: 1,
  },

  {
    id: crypto.randomUUID(),
    description: "Abrir explorador de archivos",
    expectedCombo: ["Win", "e"],
    tool: "Windows",
    level: 2,
  },
  {
    id: crypto.randomUUID(),
    description: "Cambiar entre aplicaciones",
    expectedCombo: ["Alt", "Tab"],
    tool: "Windows",
    level: 2,
  },
 
  {
    id: crypto.randomUUID(),
    description: "Abrir administrador de tareas",
    expectedCombo: ["Control", "Shift", "Escape"],
    tool: "Windows",
    level: 3,
  },
  {
    id: crypto.randomUUID(),
    description: "Captura de pantalla",
    expectedCombo: ["Win", "Shift", "s"],
    tool: "Windows",
    level: 3,
  },

  {
    id: crypto.randomUUID(),
    description: "Crear escritorio virtual",
    expectedCombo: ["Win", "Control", "d"],
    tool: "Windows",
    level: 4,
  },
  {
    id: crypto.randomUUID(),
    description: "Cambiar al escritorio virtual anterior",
    expectedCombo: ["Win", "Control", "ArrowLeft"],
    tool: "Windows",
    level: 4,
  },
];
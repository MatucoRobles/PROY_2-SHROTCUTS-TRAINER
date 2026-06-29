import confetti from 'canvas-confetti';

/** Doble disparo desde las esquinas inferiores, estilo celebración. */
export function fireStreakConfetti() {
  const base = { particleCount: 90, startVelocity: 45, spread: 70, ticks: 220 };
  confetti({ ...base, angle: 60, origin: { x: 0, y: 0.75 } });
  confetti({ ...base, angle: 120, origin: { x: 1, y: 0.75 } });
}

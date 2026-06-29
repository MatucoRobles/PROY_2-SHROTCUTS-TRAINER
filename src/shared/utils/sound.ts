let audioCtx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const Ctor =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return null;
    audioCtx = new Ctor();
  }
  // Browsers suspend the context until a user gesture; keydown is one.
  if (audioCtx.state === 'suspended') void audioCtx.resume();
  return audioCtx;
}

function note(ctx: AudioContext, freq: number, start: number, dur: number, gain: number, lp: number) {
  const osc = ctx.createOscillator();
  osc.type = 'triangle';
  osc.frequency.value = freq;

  const env = ctx.createGain();
  env.gain.setValueAtTime(0, start);
  env.gain.linearRampToValueAtTime(gain, start + 0.012);
  env.gain.exponentialRampToValueAtTime(0.0001, start + dur);

  const filt = ctx.createBiquadFilter();
  filt.type = 'lowpass';
  filt.frequency.value = lp;

  osc.connect(env).connect(filt).connect(ctx.destination);
  osc.start(start);
  osc.stop(start + dur + 0.02);
}

/** "Item RE brillante": dos notas cálidas ascendentes, sintetizadas. */
export function playKeycapSound() {
  const ctx = getCtx();
  if (!ctx) return;
  const t = ctx.currentTime;
  note(ctx, 659.25, t, 0.14, 0.055, 3200);
  note(ctx, 987.77, t + 0.1, 0.28, 0.05, 3400);
}

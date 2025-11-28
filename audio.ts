
// A lightweight procedural audio engine for premium UI sounds
// Uses Web Audio API to synthesize sounds without external assets

let audioContext: AudioContext | null = null;

// Global state
export const audioState = {
  isMuted: false, // Start unmuted by default (controlled by Preloader unlock)
};

// Helper for random variation to avoid robotic repetition
const randomRange = (min: number, max: number) => Math.random() * (max - min) + min;

export const initAudio = () => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }
};

const ensureContext = () => {
    if (!audioContext) initAudio();
    if (audioContext?.state === 'suspended') audioContext.resume();
    return audioContext;
};

export const playHover = () => {
  const ctx = ensureContext();
  if (!ctx || audioState.isMuted) return;

  const t = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  // Subtle pitch variation for organic feel (+/- 100Hz)
  const freq = randomRange(2000, 2200);

  osc.type = 'sine'; // Pure tone for glassy feel
  osc.frequency.setValueAtTime(freq, t);

  // Ultra-fast envelope for a "tick" texture
  gain.gain.setValueAtTime(0, t);
  gain.gain.linearRampToValueAtTime(0.04, t + 0.005); 
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(t + 0.05);
};

export const playClick = () => {
  const ctx = ensureContext();
  if (!ctx || audioState.isMuted) return;
  const t = ctx.currentTime;

  // Layer 1: Body (The "Thock" - Low weight)
  const osc1 = ctx.createOscillator();
  const gain1 = ctx.createGain();
  
  const baseFreq = randomRange(80, 90);
  osc1.type = 'triangle'; // Triangle has warmth
  osc1.frequency.setValueAtTime(baseFreq, t);
  osc1.frequency.exponentialRampToValueAtTime(30, t + 0.15); // Pitch drop
  
  gain1.gain.setValueAtTime(0, t);
  gain1.gain.linearRampToValueAtTime(0.4, t + 0.002); // Instant attack
  gain1.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
  
  osc1.connect(gain1);
  gain1.connect(ctx.destination);
  osc1.start();
  osc1.stop(t + 0.15);

  // Layer 2: Transient (The "Click" - High snap)
  const osc2 = ctx.createOscillator();
  const gain2 = ctx.createGain();
  const filter = ctx.createBiquadFilter();
  
  osc2.type = 'square'; // Square has harmonics for "bite"
  osc2.frequency.setValueAtTime(2500, t);
  osc2.frequency.exponentialRampToValueAtTime(1000, t + 0.02);
  
  // Filter out low mud from the click
  filter.type = 'highpass';
  filter.frequency.value = 1500;

  gain2.gain.setValueAtTime(0, t);
  gain2.gain.linearRampToValueAtTime(0.08, t + 0.001);
  gain2.gain.exponentialRampToValueAtTime(0.001, t + 0.03);

  osc2.connect(filter);
  filter.connect(gain2);
  gain2.connect(ctx.destination);

  osc2.start();
  osc2.stop(t + 0.04);
};

export const playSuccess = () => {
  const ctx = ensureContext();
  if (!ctx || audioState.isMuted) return;
  const now = ctx.currentTime;
  
  // Dark Cinematic Swell (Cm9 voicing dispersed)
  // C2, G2, Eb3, G3, D4
  const freqs = [65.41, 98.00, 155.56, 196.00, 293.66]; 
  
  freqs.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    // Add slight detune for analog thickness
    const detune = randomRange(-2, 2);
    
    osc.type = i === 0 ? 'triangle' : 'sine'; // Bass is triangle, rest sine
    osc.frequency.value = freq + detune;
    
    // Staggered entrance
    const startOffset = i * 0.08;

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.15 / (i + 1), now + startOffset + 0.5); // Slow attack
    gain.gain.exponentialRampToValueAtTime(0.001, now + startOffset + 3.5); // Long tail
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(now + startOffset + 4.0);
  });
};

export const playSwitch = () => {
  const ctx = ensureContext();
  if (!ctx || audioState.isMuted) return;
  
  const t = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  // Mechanical Switch
  osc.type = 'square';
  osc.frequency.setValueAtTime(600, t);
  
  gain.gain.setValueAtTime(0, t);
  gain.gain.linearRampToValueAtTime(0.1, t + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(t + 0.1);
};

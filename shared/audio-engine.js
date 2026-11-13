// ============================================================================
// SHARED AUDIO ENGINE — STATIC .WAV VOICE + WEB AUDIO CHIME FALLBACK
// Zero external APIs or network calls; respects soundEnabled flag cleanly.
// ============================================================================

const SharedAudioEngine = {
  audioCtx: null,
  currentAudio: null,
  audioBufferCache: {},
  soundEnabled: true,

  setSoundEnabled(enabled) {
    this.soundEnabled = !!enabled;
    if (!this.soundEnabled) this.stopAll();
  },

  stopAll() {
    if (this.currentAudio) {
      try {
        this.currentAudio.pause();
        this.currentAudio.currentTime = 0;
      } catch (e) {}
      this.currentAudio = null;
    }
  },

  getContext() {
    if (typeof window === "undefined") return null;
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return null;
    if (!this.audioCtx) this.audioCtx = new Ctx();
    if (this.audioCtx.state === "suspended") {
      this.audioCtx.resume().catch(() => {});
    }
    return this.audioCtx;
  },

  playChime(kind) {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const notes =
        kind === "victory"
          ? [523.25, 659.25, 783.99, 1046.5]
          : kind === "success"
          ? [523.25, 659.25, 783.99]
          : kind === "tap"
          ? [587.33]
          : [329.63, 277.18]; // gentle encourage

      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = kind === "encourage" ? "sine" : "triangle";
        osc.frequency.setValueAtTime(freq, now + idx * 0.085);
        const dur = kind === "tap" ? 0.11 : kind === "victory" ? 0.36 : 0.24;
        gain.gain.setValueAtTime(0.001, now + idx * 0.085);
        gain.gain.exponentialRampToValueAtTime(kind === "tap" ? 0.06 : 0.09, now + idx * 0.085 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.085 + dur);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.085);
        osc.stop(now + idx * 0.085 + dur + 0.02);
      });
    } catch (e) {}
  },

  playClip(basePath, clipKey, onStart, onEnd) {
    if (!this.soundEnabled || !clipKey) return;
    this.stopAll();
    try {
      const src = `${basePath}/${clipKey}.wav`;
      const audio = new Audio(src);
      audio.volume = 0.92;
      if (onStart) onStart();
      audio.addEventListener("ended", () => { if (onEnd) onEnd(); }, { once: true });
      audio.addEventListener("error", () => { if (onEnd) onEnd(); }, { once: true });
      this.currentAudio = audio;
      audio.play().catch(() => { if (onEnd) onEnd(); });
    } catch (e) {
      if (onEnd) onEnd();
    }
  }
};

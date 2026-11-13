// ============================================================================
// SHARED AUDIO ENGINE — STATIC .WAV VOICE + WEB AUDIO CHIME SYNTHESIZER
// Zero external APIs or network calls; respects soundEnabled flag cleanly.
// ============================================================================

const SharedAudioEngine = {
  audioCtx: null,
  currentAudio: null,
  currentBufferSource: null,
  audioBufferCache: {},
  soundEnabled: true,

  setSoundEnabled(enabled) {
    this.soundEnabled = !!enabled;
    if (!this.soundEnabled) this.stopAll();
  },

  stopAll() {
    if (this.currentBufferSource) {
      try {
        this.currentBufferSource.onended = null;
        this.currentBufferSource.stop();
        this.currentBufferSource.disconnect();
      } catch (e) {}
      this.currentBufferSource = null;
    }
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

  playTone(freqs, type = "triangle", duration = 0.22, stagger = 0.08, peakGain = 0.11) {
    if (!this.soundEnabled || !Array.isArray(freqs)) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const start = now + idx * stagger;
        osc.type = type;
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.001, start);
        gain.gain.linearRampToValueAtTime(peakGain, start + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0008, start + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(start);
        osc.stop(start + duration + 0.02);
      });
    } catch (e) {}
  },

  playChime(kind) {
    if (!this.soundEnabled) return;
    if (kind === "victory") {
      this.playTone([523.25, 659.25, 783.99, 1046.5], "triangle", 0.36, 0.085, 0.09);
    } else if (kind === "success") {
      this.playTone([523.25, 659.25, 783.99], "triangle", 0.24, 0.085, 0.09);
    } else if (kind === "tap") {
      this.playTone([587.33], "triangle", 0.11, 0.085, 0.06);
    } else {
      this.playTone([329.63, 277.18], "sine", 0.24, 0.085, 0.09);
    }
  },

  playClip(basePath, clipKey, optOrOnStart, maybeOnEnd) {
    if (!this.soundEnabled || !clipKey) return;
    const opts = typeof optOrOnStart === "function"
      ? { onStart: optOrOnStart, onEnd: maybeOnEnd }
      : (optOrOnStart || {});
    const onStart = opts.onStart;
    const onEnd = opts.onEnd;
    const fallbackKey = opts.fallbackKey || null;
    const volume = typeof opts.volume === "number" ? opts.volume : 0.92;

    this.stopAll();
    if (onStart) onStart();

    const playElement = (keyToPlay, fbKey) => {
      try {
        const audio = new Audio(`${basePath}/${keyToPlay}.wav`);
        audio.volume = volume;
        audio.addEventListener("ended", () => { if (onEnd) onEnd(); }, { once: true });
        audio.addEventListener("error", () => {
          if (fbKey && fbKey !== keyToPlay) {
            playElement(fbKey, null);
          } else if (onEnd) {
            onEnd();
          }
        }, { once: true });
        this.currentAudio = audio;
        audio.play().catch(() => { if (onEnd) onEnd(); });
      } catch (e) {
        if (onEnd) onEnd();
      }
    };

    try {
      const ctx = this.getContext();
      const canFetch = typeof fetch === "function" &&
        typeof window !== "undefined" &&
        window.location &&
        window.location.protocol &&
        window.location.protocol.startsWith("http");

      if (!ctx || !canFetch) {
        playElement(clipKey, fallbackKey);
        return;
      }

      const playDecodedBuffer = (buf) => {
        if (!this.soundEnabled) return;
        this.stopAll();
        if (onStart) onStart();
        const source = ctx.createBufferSource();
        const gainNode = ctx.createGain();
        gainNode.gain.value = volume;
        source.buffer = buf;
        source.connect(gainNode);
        gainNode.connect(ctx.destination);
        source.onended = () => { if (onEnd) onEnd(); };
        this.currentBufferSource = source;
        source.start(0);
      };

      const cacheKey = `${basePath}/${clipKey}`;
      if (this.audioBufferCache[cacheKey]) {
        playDecodedBuffer(this.audioBufferCache[cacheKey]);
        return;
      }

      fetch(`${basePath}/${clipKey}.wav`)
        .then((res) => {
          if (!res.ok) throw new Error("Missing audio clip");
          return res.arrayBuffer();
        })
        .then((arr) => ctx.decodeAudioData(arr))
        .then((decoded) => {
          this.audioBufferCache[cacheKey] = decoded;
          playDecodedBuffer(decoded);
        })
        .catch(() => {
          if (fallbackKey && fallbackKey !== clipKey) {
            playElement(fallbackKey, null);
          } else {
            playElement(clipKey, fallbackKey);
          }
        });
    } catch (e) {
      playElement(clipKey, fallbackKey);
    }
  }
};

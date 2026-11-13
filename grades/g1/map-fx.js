// ============================================================================
// THE YOUNG KNIGHT'S QUEST — 60FPS ATMOSPHERIC DIORAMA ENGINE (CANVAS 2D)
// Renders volumetric morning sunbeams, drifting clouds + synchronized ground
// shadows, flowing river/waterfall spray, smoke/embers, woodland fireflies,
// soaring highland birds, and Squire march dust puffs.
// Strictly self-contained (zero external requests) and honors reduced motion.
// ============================================================================

const KingdomAtmosphere = {
  canvas: null,
  ctx: null,
  rafId: null,
  active: false,
  reducedMotion: false,
  beaconsLit: false,
  lastTs: 0,
  elapsed: 0,

  clouds: [],
  motes: [],
  smoke: [],
  sparks: [],
  waterStreaks: [],
  birds: [],
  transients: [],

  LOGICAL_W: 1200,
  LOGICAL_H: 650,

  init(canvasEl, options = {}) {
    if (typeof document === "undefined" || !canvasEl || typeof canvasEl.getContext !== "function") {
      return false;
    }
    const ctx = canvasEl.getContext("2d");
    if (!ctx) return false;

    this.canvas = canvasEl;
    this.ctx = ctx;
    this.beaconsLit = !!options.beaconsLit;
    this.reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!this.clouds.length) {
      this._seedParticles();
    }
    this.resize();
    if (!this._resizeBound && typeof window !== "undefined") {
      this._resizeBound = true;
      window.addEventListener("resize", () => this.resize());
    }
    this.setActive(options.active !== false);
    return true;
  },

  setBeaconsLit(lit) {
    this.beaconsLit = !!lit;
  },

  resize() {
    if (!this.canvas || !this.ctx) return;
    const rect = this.canvas.getBoundingClientRect ? this.canvas.getBoundingClientRect() : null;
    const w = Math.max(320, Math.round((rect && rect.width) || this.canvas.clientWidth || this.LOGICAL_W));
    const h = Math.max(180, Math.round((rect && rect.height) || this.canvas.clientHeight || this.LOGICAL_H));
    const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 2) : 1;
    const targetW = Math.round(w * dpr);
    const targetH = Math.round(h * dpr);
    if (this.canvas.width !== targetW || this.canvas.height !== targetH) {
      this.canvas.width = targetW;
      this.canvas.height = targetH;
    }
  },

  setActive(isActive) {
    this.active = !!isActive;
    if (this.rafId !== null && typeof cancelAnimationFrame === "function") {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    if (!this.active || !this.ctx) return;

    this.resize();
    if (this.reducedMotion || typeof requestAnimationFrame !== "function") {
      this.drawFrame(0);
      return;
    }
    this.lastTs = typeof performance !== "undefined" ? performance.now() : 0;
    const tick = (now) => {
      if (!this.active) return;
      const dt = this.lastTs ? Math.min(0.05, Math.max(0.001, (now - this.lastTs) / 1000)) : 0.016;
      this.lastTs = now;
      this.elapsed += dt;
      this.update(dt);
      this.drawFrame(dt);
      this.rafId = requestAnimationFrame(tick);
    };
    this.rafId = requestAnimationFrame(tick);
  },

  _seedParticles() {
    const hash = (n) => {
      const s = Math.sin(n * 127.1 + 311.7) * 43758.5453123;
      return s - Math.floor(s);
    };

    this.clouds = [
      { x: 140, y: 120, scale: 1.05, speed: 6.2, alpha: 0.34 },
      { x: 480, y: 82,  scale: 0.85, speed: 4.8, alpha: 0.28 },
      { x: 810, y: 168, scale: 1.15, speed: 5.5, alpha: 0.32 },
      { x: 1080, y: 92, scale: 0.78, speed: 7.1, alpha: 0.26 }
    ];

    this.motes = [];
    for (let i = 0; i < 16; i++) {
      this.motes.push({
        baseX: 70 + hash(i * 4 + 1) * 315,
        baseY: 145 + hash(i * 4 + 2) * 350,
        phase: hash(i * 4 + 3) * Math.PI * 2,
        speed: 0.7 + hash(i * 4 + 4) * 0.8,
        r: 1.5 + hash(i * 4 + 5) * 1.9
      });
    }

    this.waterStreaks = [];
    for (let i = 0; i < 20; i++) {
      this.waterStreaks.push({
        t: i / 20,
        offset: (hash(i * 3 + 11) - 0.5) * 14,
        len: 0.026 + hash(i * 3 + 12) * 0.022,
        speed: 0.065 + hash(i * 3 + 13) * 0.025
      });
    }

    this.smoke = [];
    // Dragon's Peak caldera smoke + Forge chimney smoke
    for (let i = 0; i < 10; i++) {
      const isDragon = i < 6;
      this.smoke.push({
        originX: isDragon ? 994 : 867,
        originY: isDragon ? 46 : 446,
        age: (i % 6) / 6,
        life: isDragon ? 4.4 : 3.2,
        drift: isDragon ? 20 : 12,
        rise: isDragon ? 54 : 34,
        baseR: isDragon ? 4.5 : 2.8,
        warm: isDragon
      });
    }

    this.birds = [
      { cx: 810, cy: 96, rx: 38, ry: 12, phase: 0.2, speed: 0.52 },
      { cx: 830, cy: 108, rx: 32, ry: 10, phase: 1.9, speed: 0.56 },
      { cx: 795, cy: 86, rx: 42, ry: 14, phase: 3.4, speed: 0.48 }
    ];
  },

  sampleRiverPoint(t) {
    const clamped = Math.max(0, Math.min(1, t));
    // Two-segment cubic curve matching Visuals.renderKingdomMapSVG meandering River of Twenty
    const cubic = (p0, p1, p2, p3, u) => {
      const mu = 1 - u;
      return {
        x: mu * mu * mu * p0.x + 3 * mu * mu * u * p1.x + 3 * mu * u * u * p2.x + u * u * u * p3.x,
        y: mu * mu * mu * p0.y + 3 * mu * mu * u * p1.y + 3 * mu * u * u * p2.y + u * u * u * p3.y
      };
    };
    if (clamped < 0.41) {
      return cubic(
        { x: 668, y: 136 },
        { x: 618, y: 190 },
        { x: 634, y: 248 },
        { x: 688, y: 305 },
        clamped / 0.41
      );
    }
    return cubic(
      { x: 688, y: 305 },
      { x: 660, y: 358 },
      { x: 626, y: 432 },
      { x: 666, y: 558 },
      (clamped - 0.41) / 0.59
    );
  },

  spawnDustPuff(xPx, yPx) {
    if (this.reducedMotion) return;
    for (let i = 0; i < 3; i++) {
      this.transients.push({
        kind: "dust",
        x: xPx + (Math.random() - 0.5) * 10,
        y: yPx + 6 + (Math.random() - 0.5) * 4,
        vx: (Math.random() - 0.5) * 16,
        vy: -6 - Math.random() * 10,
        r: 2.5 + Math.random() * 2.5,
        age: 0,
        maxAge: 0.55
      });
    }
  },

  spawnRipple(xPx, yPx, color = "#D8F6FF") {
    this.transients.push({
      kind: "ripple",
      x: xPx,
      y: yPx,
      r: 8,
      maxR: 42,
      color,
      age: 0,
      maxAge: 0.85
    });
    if (!this.reducedMotion && this.ctx) {
      this.drawFrame(0);
    }
  },

  spawnSparkBurst(xPx, yPx, color = "#F8D158") {
    if (this.reducedMotion) return;
    for (let i = 0; i < 12; i++) {
      const ang = (i / 12) * Math.PI * 2 + Math.random() * 0.3;
      const spd = 28 + Math.random() * 34;
      this.transients.push({
        kind: "spark",
        x: xPx,
        y: yPx,
        vx: Math.cos(ang) * spd,
        vy: Math.sin(ang) * spd - 10,
        r: 2 + Math.random() * 2,
        color,
        age: 0,
        maxAge: 0.72
      });
    }
  },

  update(dt) {
    this.clouds.forEach((c) => {
      c.x += c.speed * dt;
      if (c.x > this.LOGICAL_W + 130) c.x = -130;
    });

    this.waterStreaks.forEach((s) => {
      s.t += s.speed * dt;
      if (s.t > 1) s.t -= 1;
    });

    this.smoke.forEach((p) => {
      p.age += dt / p.life;
      if (p.age >= 1) p.age -= 1;
    });

    for (let i = this.transients.length - 1; i >= 0; i--) {
      const tr = this.transients[i];
      tr.age += dt;
      if (tr.kind === "dust" || tr.kind === "spark") {
        tr.x += tr.vx * dt;
        tr.y += tr.vy * dt;
        if (tr.kind === "spark") tr.vy += 28 * dt;
      }
      if (tr.age >= tr.maxAge) {
        this.transients.splice(i, 1);
      }
    }
  },

  _drawCloudShape(ctx, cx, cy, scale) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(scale, scale);
    ctx.beginPath();
    ctx.arc(-28, 6, 17, 0, Math.PI * 2);
    ctx.arc(-6, -4, 24, 0, Math.PI * 2);
    ctx.arc(20, 2, 19, 0, Math.PI * 2);
    ctx.arc(38, 9, 13, 0, Math.PI * 2);
    ctx.arc(4, 10, 18, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  },

  drawFrame() {
    if (!this.ctx || !this.canvas) return;
    const ctx = this.ctx;
    const cw = this.canvas.width;
    const ch = this.canvas.height;
    ctx.clearRect(0, 0, cw, ch);

    ctx.save();
    ctx.scale(cw / this.LOGICAL_W, ch / this.LOGICAL_H);

    // 1. River Currents, Cascade Spring Pool & Subtle Outflow Dispersal
    ctx.save();
    ctx.lineCap = "round";
    this.waterStreaks.forEach((s) => {
      const p1 = this.sampleRiverPoint(s.t);
      const p2 = this.sampleRiverPoint(Math.min(1, s.t + s.len));
      // Fade cleanly underneath Serpent Crossing Bridge deck (t around 0.37..0.45) and fade out into open sea (t > 0.78)
      const bridgeDist = Math.abs(s.t - 0.40);
      const bridgeMask = Math.min(1, bridgeDist / 0.045);
      const seaFade = s.t > 0.78 ? Math.max(0, (1 - s.t) / 0.22) : 1;
      const widthScale = 0.45 + 0.85 * s.t;
      ctx.strokeStyle = `rgba(225, 250, 255, ${(0.48 * bridgeMask * seaFade).toFixed(2)})`;
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(p1.x + s.offset * widthScale, p1.y);
      ctx.lineTo(p2.x + s.offset * widthScale, p2.y);
      ctx.stroke();
    });

    // Subtle Northern Cascade Spring Tarn Ripple Only (Boat & Cove ripples live strictly beneath the Skiff in SVG)
    const pulse = 0.5 + 0.5 * Math.sin(this.elapsed * 3.1);
    ctx.strokeStyle = `rgba(232, 252, 255, ${(0.28 + pulse * 0.22).toFixed(2)})`;
    ctx.lineWidth = 1.3;
    ctx.beginPath();
    ctx.ellipse(668, 134, 9 + pulse * 4.5, 4 + pulse * 1.6, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    // 2. Cloud Ground Shadows (Projected onto Terrain at +30, +38 Sun Offset)
    ctx.save();
    this.clouds.forEach((c) => {
      ctx.fillStyle = "rgba(34, 24, 12, 0.10)";
      this._drawCloudShape(ctx, c.x + 30, c.y + 38, c.scale * 0.96);
    });
    ctx.restore();

    // 3. Woodland Sunbeams & Fireflies (Act I)
    ctx.save();
    const beamPulse = 0.78 + 0.22 * Math.sin(this.elapsed * 0.85);
    const beams = [
      { x: 170, w: 72, a: 0.075 * beamPulse },
      { x: 320, w: 56, a: 0.055 * beamPulse },
      { x: 1050, w: 84, a: 0.07 * beamPulse }
    ];
    beams.forEach((b) => {
      const grad = ctx.createLinearGradient(b.x - 50, 0, b.x + 120, 460);
      grad.addColorStop(0, `rgba(255, 244, 196, ${b.a.toFixed(3)})`);
      grad.addColorStop(1, "rgba(255, 244, 196, 0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.moveTo(b.x, 0);
      ctx.lineTo(b.x + b.w, 0);
      ctx.lineTo(b.x + b.w + 150, 480);
      ctx.lineTo(b.x + 150, 480);
      ctx.closePath();
      ctx.fill();
    });

    this.motes.forEach((m) => {
      const mx = m.baseX + Math.sin(this.elapsed * m.speed + m.phase) * 11;
      const my = m.baseY + Math.cos(this.elapsed * m.speed * 0.85 + m.phase) * 8;
      const glow = 0.35 + 0.55 * (0.5 + 0.5 * Math.sin(this.elapsed * 2.1 + m.phase));
      ctx.fillStyle = `rgba(255, 236, 138, ${glow.toFixed(2)})`;
      ctx.beginPath();
      ctx.arc(mx, my, m.r, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.restore();

    // 4. Volcanic Smoke, Forge Chimney & Lit Signal Beacon Glows
    ctx.save();
    this.smoke.forEach((p) => {
      const x = p.originX + p.age * p.drift + Math.sin(this.elapsed * 1.8 + p.age * 5) * 4;
      const y = p.originY - p.age * p.rise;
      const r = p.baseR + p.age * 9;
      const alpha = (1 - p.age) * (p.warm ? 0.38 : 0.28);
      ctx.fillStyle = p.warm && p.age < 0.28
        ? `rgba(235, 138, 72, ${alpha.toFixed(2)})`
        : `rgba(116, 108, 102, ${alpha.toFixed(2)})`;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    });

    if (this.beaconsLit) {
      const flicker = 0.8 + 0.2 * Math.sin(this.elapsed * 8.5);
      [[1068, 286], [1084, 336]].forEach(([bx, by]) => {
        const rg = ctx.createRadialGradient(bx, by, 2, bx, by, 24 * flicker);
        rg.addColorStop(0, "rgba(255, 242, 165, 0.85)");
        rg.addColorStop(0.45, "rgba(255, 146, 48, 0.45)");
        rg.addColorStop(1, "rgba(255, 110, 20, 0)");
        ctx.fillStyle = rg;
        ctx.beginPath();
        ctx.arc(bx, by, 26, 0, Math.PI * 2);
        ctx.fill();
      });
    }
    ctx.restore();

    // 5. Soaring Highland Birds
    ctx.save();
    ctx.strokeStyle = "rgba(42, 36, 30, 0.72)";
    ctx.lineWidth = 1.6;
    ctx.lineCap = "round";
    this.birds.forEach((b) => {
      const ang = this.elapsed * b.speed + b.phase;
      const bx = b.cx + Math.cos(ang) * b.rx;
      const by = b.cy + Math.sin(ang) * b.ry;
      const flap = Math.sin(this.elapsed * 6.5 + b.phase) * 2.2;
      ctx.beginPath();
      ctx.moveTo(bx - 5.5, by - flap);
      ctx.quadraticCurveTo(bx - 2, by - 3, bx, by);
      ctx.quadraticCurveTo(bx + 2, by - 3, bx + 5.5, by - flap);
      ctx.stroke();
    });
    ctx.restore();

    // 6. Elevated Drifting Clouds (High Above Terrain)
    ctx.save();
    this.clouds.forEach((c) => {
      ctx.fillStyle = `rgba(255, 252, 243, ${c.alpha.toFixed(2)})`;
      this._drawCloudShape(ctx, c.x, c.y, c.scale);
    });
    ctx.restore();

    // 7. Interactive Transients (Dust Puffs, Water Ripples, Sparks)
    ctx.save();
    this.transients.forEach((tr) => {
      const p = tr.age / tr.maxAge;
      const alpha = Math.max(0, 1 - p);
      if (tr.kind === "dust") {
        ctx.fillStyle = `rgba(244, 232, 205, ${(alpha * 0.72).toFixed(2)})`;
        ctx.beginPath();
        ctx.arc(tr.x, tr.y, tr.r + p * 5, 0, Math.PI * 2);
        ctx.fill();
      } else if (tr.kind === "ripple") {
        const rad = tr.r + (tr.maxR - tr.r) * p;
        ctx.strokeStyle = tr.color;
        ctx.globalAlpha = alpha * 0.85;
        ctx.lineWidth = 2.4 * (1 - p * 0.5);
        ctx.beginPath();
        ctx.arc(tr.x, tr.y, rad, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 1;
      } else if (tr.kind === "spark") {
        ctx.fillStyle = tr.color;
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(tr.x, tr.y, tr.r * (1 - p * 0.4), 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    });
    ctx.restore();

    ctx.restore();
  }
};

if (typeof window !== "undefined") {
  window.KingdomAtmosphere = KingdomAtmosphere;
}

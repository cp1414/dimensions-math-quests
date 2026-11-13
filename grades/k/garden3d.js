// ============================================================================
// PIP'S MEADOW & THE FOUR SEASONS GARDEN — HIGH-CRAFT 3D GUIDED WORLD ENGINE
// Powered by locally vendored Three.js r147 (zero external requests, offline PWA)
// Parent clicks a Season, Lantern, or Step button -> Pip & Camera glide smoothly
// Uses Three.js CanvasTexture, ShaderMaterial Sky Dome, InstancedMesh Flora,
// TubeGeometry Shepherd Lanterns, sRGBEncoding & 3D Perspective Level Medallions.
// ============================================================================

const Garden3D = {
  container: null,
  renderer: null,
  scene: null,
  camera: null,
  curve: null,
  skyDome: null,
  skyUniforms: null,
  clouds: [],
  textures: {},

  pipGroup: null,
  pipFeet: [],
  lanterns: [],
  butterflies: [],
  smokePuffs: [],
  particles: null,
  particleVelocities: [],
  waterMesh: null,
  sunLight: null,
  fillLight: null,
  hemiLight: null,
  activeGlowLight: null,
  haloRing: null,
  raycaster: null,
  pointer: null,

  currentT: 0,
  targetT: 0,
  selectedNodeId: 1,
  hoveredNodeId: null,
  onSelectNode: null,
  onEnterNode: null,

  dragOrbitYaw: 0,
  dragOrbitPitch: 0,
  isDragging: false,
  dragMoved: false,
  lastPointerX: 0,
  lastPointerY: 0,

  rafId: null,
  clock: null,
  initialized: false,
  webglAvailable: false,
  reducedMotion: false,
  nodesRef: [],
  progressGetter: null,

  // Seasonal Sky Horizon / Zenith / Fog / Sun Palettes along curve t = 0..1
  SEASONS: [
    { t: 0.00, skyTop: 0x7BAAD0, skyHorizon: 0xEFE1C4, fog: 0xE7DBBF, sun: 0xFFE6BA, hemiSky: 0xFFF3DE, hemiGround: 0x4E6135 },
    { t: 0.30, skyTop: 0x79A6C8, skyHorizon: 0xDFECF5, fog: 0xD8E7F2, sun: 0xFFF6EB, hemiSky: 0xEAF4FC, hemiGround: 0x5E6F80 },
    { t: 0.62, skyTop: 0x6BB7D8, skyHorizon: 0xDFF4EA, fog: 0xD8F0E5, sun: 0xFFFBE6, hemiSky: 0xECFAFF, hemiGround: 0x45733D },
    { t: 1.00, skyTop: 0x62ACDA, skyHorizon: 0xF7E8C2, fog: 0xEDE3C2, sun: 0xFFF2C6, hemiSky: 0xFFF7DC, hemiGround: 0x5A6E33 }
  ],

  init(containerEl, nodes, options = {}) {
    this.container = containerEl;
    this.nodesRef = nodes || [];
    this.onSelectNode = options.onSelectNode || null;
    this.onEnterNode = options.onEnterNode || null;
    this.progressGetter = options.getProgress || (() => ({ mastered: false }));
    this.reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (typeof THREE === "undefined" || !containerEl) {
      this.webglAvailable = false;
      return false;
    }

    if (this.initialized) {
      this.resize();
      this.syncLanternStates();
      return true;
    }

    try {
      this.renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      if (THREE.sRGBEncoding) {
        this.renderer.outputEncoding = THREE.sRGBEncoding;
      }
      if (THREE.ACESFilmicToneMapping) {
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 0.90;
      }

      this.renderer.domElement.style.width = "100%";
      this.renderer.domElement.style.height = "100%";
      this.renderer.domElement.style.display = "block";
      this.renderer.domElement.setAttribute("aria-label", "Interactive 3D Four Seasons Garden");
      containerEl.innerHTML = "";
      containerEl.appendChild(this.renderer.domElement);

      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0xE7DBBF);
      this.scene.fog = new THREE.FogExp2(0xE7DBBF, 0.0044);

      const w = Math.max(containerEl.clientWidth || 960, 320);
      const h = Math.max(containerEl.clientHeight || 540, 240);
      this.camera = new THREE.PerspectiveCamera(45, w / h, 0.25, 280);
      this.renderer.setSize(w, h, false);

      this.clock = new THREE.Clock();
      this.raycaster = new THREE.Raycaster();
      this.pointer = new THREE.Vector2();

      this.createTextures();
      this.buildPathCurve();
      this.buildLighting();
      this.buildSkyDomeAndHorizon();
      this.buildTerrain();
      this.buildBrookAndBridge();
      this.buildCobblestonePath();
      this.buildSeasonalSettings();
      this.buildInstancedMeadowFlora();
      this.buildLanterns();
      this.buildPip();
      this.buildParticles();
      this.attachEvents();

      this.initialized = true;
      this.webglAvailable = true;
      this.jumpToNode(options.initialNodeId || 1);
      this.startLoop();
      return true;
    } catch (err) {
      this.webglAvailable = false;
      return false;
    }
  },

  // --------------------------------------------------------------------------
  // PROCEDURAL STORYBOOK CANVAS TEXTURES (100% LOCAL, ZERO EXTERNAL BITMAPS)
  // --------------------------------------------------------------------------
  createTextures() {
    const makeCanvasTex = (size, drawFn, repeatX = 1, repeatY = 1, isColor = true) => {
      const c = document.createElement("canvas");
      c.width = size;
      c.height = size;
      const ctx = c.getContext("2d");
      drawFn(ctx, size);
      const tex = new THREE.CanvasTexture(c);
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(repeatX, repeatY);
      if (isColor && THREE.sRGBEncoding) tex.encoding = THREE.sRGBEncoding;
      return tex;
    };

    const hash01 = (n) => {
      const x = Math.sin(n * 127.1 + 311.7) * 43758.5453123;
      return x - Math.floor(x);
    };

    // Organic painterly meadow mottling (zero grid periodicity)
    this.textures.meadow = makeCanvasTex(512, (ctx, s) => {
      ctx.fillStyle = "#E7E3D7";
      ctx.fillRect(0, 0, s, s);
      for (let p = 0; p < 110; p++) {
        const px = hash01(p * 3 + 1) * s;
        const py = hash01(p * 3 + 2) * s;
        const rad = 18 + hash01(p * 3 + 3) * 42;
        const warm = p % 2 === 0;
        const grad = ctx.createRadialGradient(px, py, 2, px, py, rad);
        grad.addColorStop(0, warm ? "rgba(255,250,228,0.20)" : "rgba(74,68,42,0.18)");
        grad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = grad;
        ctx.fillRect(px - rad, py - rad, rad * 2, rad * 2);
      }
      for (let i = 0; i < 2400; i++) {
        const x = hash01(i * 5 + 11) * s;
        const y = hash01(i * 5 + 12) * s;
        const ang = (hash01(i * 5 + 13) - 0.5) * 0.7;
        const len = 5 + hash01(i * 5 + 14) * 8;
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(ang);
        ctx.fillStyle = i % 3 === 0 ? "rgba(255,252,240,0.15)" : "rgba(62,56,36,0.14)";
        ctx.fillRect(-0.8, -len * 0.5, 1.6, len);
        ctx.restore();
      }
    }, 10, 10, true);

    this.textures.meadowBump = makeCanvasTex(512, (ctx, s) => {
      ctx.fillStyle = "#808080";
      ctx.fillRect(0, 0, s, s);
      for (let i = 0; i < 2200; i++) {
        const x = hash01(i * 7 + 1) * s;
        const y = hash01(i * 7 + 2) * s;
        const rad = 2 + hash01(i * 7 + 3) * 5;
        ctx.beginPath();
        ctx.arc(x, y, rad, 0, Math.PI * 2);
        ctx.fillStyle = i % 2 === 0 ? "rgba(175,175,175,0.28)" : "rgba(75,75,75,0.28)";
        ctx.fill();
      }
    }, 10, 10, false);

    // Vertical oak bark & timber plank grain
    this.textures.wood = makeCanvasTex(256, (ctx, s) => {
      ctx.fillStyle = "#DDD0BC";
      ctx.fillRect(0, 0, s, s);
      for (let k = 0; k < 160; k++) {
        const x = hash01(k * 4 + 1) * s;
        const w = 1.5 + hash01(k * 4 + 2) * 3.5;
        ctx.fillStyle = k % 2 === 0 ? "rgba(58,32,12,0.18)" : "rgba(255,248,235,0.12)";
        ctx.fillRect(x, 0, w, s);
      }
    }, 2, 1, true);

    this.textures.woodBump = makeCanvasTex(256, (ctx, s) => {
      ctx.fillStyle = "#808080";
      ctx.fillRect(0, 0, s, s);
      for (let k = 0; k < 160; k++) {
        const x = hash01(k * 4 + 1) * s;
        const w = 1.5 + hash01(k * 4 + 2) * 3.5;
        ctx.fillStyle = k % 2 === 0 ? "#585858" : "#A6A6A6";
        ctx.fillRect(x, 0, w, s);
      }
    }, 2, 1, false);

    // Organic Carved Flagstone & Masonry (speckled granite/limestone, zero straight lattice lines)
    this.textures.stone = makeCanvasTex(256, (ctx, s) => {
      ctx.fillStyle = "#D5CCB8";
      ctx.fillRect(0, 0, s, s);
      for (let p = 0; p < 80; p++) {
        const px = hash01(p * 3 + 21) * s;
        const py = hash01(p * 3 + 22) * s;
        const r = 10 + hash01(p * 3 + 23) * 22;
        const grad = ctx.createRadialGradient(px, py, 1, px, py, r);
        grad.addColorStop(0, p % 2 === 0 ? "rgba(85,78,62,0.16)" : "rgba(255,252,240,0.18)");
        grad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = grad;
        ctx.fillRect(px - r, py - r, r * 2, r * 2);
      }
      for (let i = 0; i < 900; i++) {
        const x = hash01(i * 3 + 50) * s;
        const y = hash01(i * 3 + 51) * s;
        ctx.fillStyle = i % 2 === 0 ? "rgba(52,46,36,0.16)" : "rgba(255,252,244,0.18)";
        ctx.fillRect(x, y, 2.5, 2.5);
      }
    }, 2, 2, true);

    this.textures.stoneBump = makeCanvasTex(256, (ctx, s) => {
      ctx.fillStyle = "#848484";
      ctx.fillRect(0, 0, s, s);
      for (let i = 0; i < 700; i++) {
        const x = hash01(i * 3 + 70) * s;
        const y = hash01(i * 3 + 71) * s;
        ctx.fillStyle = i % 2 === 0 ? "rgba(170,170,170,0.35)" : "rgba(95,95,95,0.35)";
        ctx.fillRect(x, y, 3, 3);
      }
    }, 2, 2, false);

    // Soft overlapping botanical leaf-dapple texture (no regular grid!)
    this.textures.foliage = makeCanvasTex(256, (ctx, s) => {
      ctx.fillStyle = "#EFECE4";
      ctx.fillRect(0, 0, s, s);
      for (let i = 0; i < 420; i++) {
        const x = hash01(i * 5 + 31) * s;
        const y = hash01(i * 5 + 32) * s;
        const rx = 10 + hash01(i * 5 + 33) * 14;
        const ry = 7 + hash01(i * 5 + 34) * 10;
        const rot = hash01(i * 5 + 35) * Math.PI;
        ctx.beginPath();
        ctx.ellipse(x, y, rx, ry, rot, 0, Math.PI * 2);
        ctx.fillStyle = i % 3 === 0 ? "rgba(255,255,248,0.18)" : "rgba(50,42,24,0.10)";
        ctx.fill();
      }
    }, 2, 2, true);

    // Fine directional plush fur grain (warm, matte, zero blotches)
    this.textures.fur = makeCanvasTex(256, (ctx, s) => {
      ctx.fillStyle = "#F5ECE0";
      ctx.fillRect(0, 0, s, s);
      for (let i = 0; i < 3200; i++) {
        const x = hash01(i * 4 + 101) * s;
        const y = hash01(i * 4 + 102) * s;
        const len = 4 + hash01(i * 4 + 103) * 7;
        const ang = (hash01(i * 4 + 104) - 0.5) * 0.25;
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(ang);
        ctx.fillStyle = i % 2 === 0 ? "rgba(255,252,245,0.22)" : "rgba(115,82,48,0.12)";
        ctx.fillRect(-0.6, -len * 0.5, 1.2, len);
        ctx.restore();
      }
    }, 3, 3, true);

    // Woven wool & felt texture for Pip's woodsman beret, vest & kerchief
    this.textures.felt = makeCanvasTex(256, (ctx, s) => {
      ctx.fillStyle = "#E6E3DA";
      ctx.fillRect(0, 0, s, s);
      for (let i = 0; i < 1800; i++) {
        const x = hash01(i * 3 + 211) * s;
        const y = hash01(i * 3 + 212) * s;
        ctx.fillStyle = i % 2 === 0 ? "rgba(255,255,255,0.14)" : "rgba(35,32,26,0.10)";
        ctx.fillRect(x, y, 2.2, 1.2);
      }
    }, 3, 3, true);

    // Supple stitched saddle-leather grain for satchel & cap band
    this.textures.leather = makeCanvasTex(256, (ctx, s) => {
      ctx.fillStyle = "#DFD3C3";
      ctx.fillRect(0, 0, s, s);
      for (let i = 0; i < 1400; i++) {
        const x = hash01(i * 3 + 311) * s;
        const y = hash01(i * 3 + 312) * s;
        const r = 1 + hash01(i * 3 + 313) * 2.5;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = i % 2 === 0 ? "rgba(55,28,10,0.11)" : "rgba(255,248,235,0.10)";
        ctx.fill();
      }
    }, 2, 2, true);

    // Radiant amber/emerald glow halo texture for lantern flames, distant beacons & ground light pools
    const glowCanvas = document.createElement("canvas");
    glowCanvas.width = 256;
    glowCanvas.height = 256;
    const gCtx = glowCanvas.getContext("2d");
    const radGrad = gCtx.createRadialGradient(128, 128, 6, 128, 128, 124);
    radGrad.addColorStop(0.0, "rgba(255, 250, 220, 1.0)");
    radGrad.addColorStop(0.28, "rgba(255, 212, 102, 0.85)");
    radGrad.addColorStop(0.62, "rgba(242, 168, 46, 0.30)");
    radGrad.addColorStop(1.0, "rgba(242, 168, 46, 0.0)");
    gCtx.fillStyle = radGrad;
    gCtx.fillRect(0, 0, 256, 256);
    const glowTex = new THREE.CanvasTexture(glowCanvas);
    if (THREE.sRGBEncoding) glowTex.encoding = THREE.sRGBEncoding;
    this.textures.glowHalo = glowTex;

    // Shimmering brook ripple texture
    this.textures.water = makeCanvasTex(256, (ctx, s) => {
      ctx.fillStyle = "#5FB0D4";
      ctx.fillRect(0, 0, s, s);
      ctx.strokeStyle = "rgba(255,255,255,0.36)";
      ctx.lineWidth = 2.5;
      for (let row = 10; row < s; row += 20) {
        ctx.beginPath();
        for (let x = 0; x <= s; x += 16) {
          const y = row + Math.sin((x / s) * Math.PI * 4 + row) * 4;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
    }, 12, 2, true);
  },

  makeBadgeTexture(num, status, isMilestone) {
    const c = document.createElement("canvas");
    c.width = 192;
    c.height = 192;
    const ctx = c.getContext("2d");
    const cx = 96;
    const cy = 96;

    // Soft outer halo
    ctx.beginPath();
    ctx.arc(cx, cy, 82, 0, Math.PI * 2);
    ctx.fillStyle = status === "selected"
      ? "rgba(244, 198, 72, 0.35)"
      : status === "mastered"
      ? "rgba(64, 168, 96, 0.25)"
      : "rgba(32, 24, 14, 0.18)";
    ctx.fill();

    // Brass rim
    ctx.beginPath();
    ctx.arc(cx, cy, 68, 0, Math.PI * 2);
    ctx.fillStyle = status === "selected" ? "#D69A24" : status === "mastered" ? "#2E7A44" : "#8F6E34";
    ctx.fill();

    // Inner parchment face
    ctx.beginPath();
    ctx.arc(cx, cy, 56, 0, Math.PI * 2);
    ctx.fillStyle = status === "selected" ? "#FFF9E6" : status === "mastered" ? "#EEFAEF" : "#FAF3E2";
    ctx.fill();

    // Thin inner ring for seasonal celebrations
    if (isMilestone) {
      ctx.beginPath();
      ctx.arc(cx, cy, 48, 0, Math.PI * 2);
      ctx.strokeStyle = "#D69A24";
      ctx.lineWidth = 3;
      ctx.stroke();
    }

    // Crisp Number
    ctx.fillStyle = status === "mastered" ? "#1E5B31" : "#221A12";
    ctx.font = "800 58px Georgia, serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(String(num), cx, cy + 3);

    const tex = new THREE.CanvasTexture(c);
    if (THREE.sRGBEncoding) tex.encoding = THREE.sRGBEncoding;
    tex.needsUpdate = true;
    return tex;
  },

  // --------------------------------------------------------------------------
  // PATH CURVE & TERRAIN TOPOLOGY
  // --------------------------------------------------------------------------
  buildPathCurve() {
    const pts = [
      new THREE.Vector3(-6, 0, 50),
      new THREE.Vector3(3, 0, 40),
      new THREE.Vector3(-4, 0, 29),
      new THREE.Vector3(0, 0, 18),   // Crosses Winter Stone Bridge over the brook
      new THREE.Vector3(7, 0, 8),
      new THREE.Vector3(2, 0, -4),
      new THREE.Vector3(-6, 0, -16),
      new THREE.Vector3(3, 0, -28),
      new THREE.Vector3(6, 0, -40),
      new THREE.Vector3(0, 0, -52.2)   // Summer Gazebo Summit Deck
    ];
    pts.forEach((p) => {
      p.y = this.getPathSurfaceY(p.z);
    });
    this.curve = new THREE.CatmullRomCurve3(pts, false, "catmullrom", 0.45);
  },

  getPathSurfaceY(z) {
    const bridgeBump = Math.exp(-Math.pow((z - 18) / 4.2, 2)) * 1.45;
    const summerClimb = z < -25 ? Math.min(2.6, (-25 - z) * 0.11) : 0;
    const gazeboDeck = z < -50.0 ? Math.min(0.36, (-50.0 - z) * 0.24) : 0;
    return bridgeBump + summerClimb + gazeboDeck;
  },

  getPathCenterX(z) {
    return Math.sin(z * 0.11) * 4.5;
  },

  terrainHeight(x, z) {
    const pathX = this.getPathCenterX(z);
    const distFromPath = Math.abs(x - pathX);
    const valleyBlend = Math.min(1, Math.max(0, (distFromPath - 4.2) / 14));
    const hills =
      (Math.sin(x * 0.09 + 0.5) * Math.cos(z * 0.08) * 3.8 +
        Math.sin(x * 0.18 - z * 0.12) * 1.4 +
        1.6) *
      valleyBlend;
    const brookZ = 18 + Math.sin(x * 0.14) * 2.5;
    const distBrook = Math.abs(z - brookZ);
    const brookDip = distBrook < 5.5 ? -Math.cos((distBrook / 5.5) * (Math.PI / 2)) * 1.55 : 0;
    const summerRise = z < -25 ? Math.min(2.6, (-25 - z) * 0.11) : 0;
    return hills + brookDip + summerRise;
  },

  // --------------------------------------------------------------------------
  // LIGHTING & ATMOSPHERIC SHADER SKY DOME
  // --------------------------------------------------------------------------
  buildLighting() {
    this.hemiLight = new THREE.HemisphereLight(0xFFF3DE, 0x4E6135, 0.72);
    this.scene.add(this.hemiLight);

    this.sunLight = new THREE.DirectionalLight(0xFFE6BA, 1.18);
    this.sunLight.position.set(26, 38, 22);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.mapSize.width = 2048;
    this.sunLight.shadow.mapSize.height = 2048;
    this.sunLight.shadow.camera.near = 4;
    this.sunLight.shadow.camera.far = 140;
    const d = 52;
    this.sunLight.shadow.camera.left = -d;
    this.sunLight.shadow.camera.right = d;
    this.sunLight.shadow.camera.top = d;
    this.sunLight.shadow.camera.bottom = -d;
    this.sunLight.shadow.bias = -0.0004;
    this.scene.add(this.sunLight);
    this.scene.add(this.sunLight.target);

    // Subtle cool sky rim fill from opposite side for richer 3D shading
    this.fillLight = new THREE.DirectionalLight(0xBFE0FF, 0.35);
    this.fillLight.position.set(-28, 18, -24);
    this.scene.add(this.fillLight);

    this.activeGlowLight = new THREE.PointLight(0xFFD06B, 2.1, 13, 1.6);
    this.scene.add(this.activeGlowLight);
  },

  buildSkyDomeAndHorizon() {
    this.skyUniforms = {
      topColor: { value: new THREE.Color(0x7BAAD0) },
      horizonColor: { value: new THREE.Color(0xEFE1C4) }
    };

    const skyMat = new THREE.ShaderMaterial({
      uniforms: this.skyUniforms,
      side: THREE.BackSide,
      depthWrite: false,
      vertexShader: [
        "varying vec3 vWorldPos;",
        "void main() {",
        "  vec4 wp = modelMatrix * vec4(position, 1.0);",
        "  vWorldPos = wp.xyz;",
        "  gl_Position = projectionMatrix * viewMatrix * wp;",
        "}"
      ].join("\n"),
      fragmentShader: [
        "uniform vec3 topColor;",
        "uniform vec3 horizonColor;",
        "varying vec3 vWorldPos;",
        "void main() {",
        "  float h = normalize(vWorldPos).y;",
        "  float t = pow(clamp(h * 1.35 + 0.05, 0.0, 1.0), 0.72);",
        "  gl_FragColor = vec4(mix(horizonColor, topColor, t), 1.0);",
        "}"
      ].join("\n")
    });
    this.skyDome = new THREE.Mesh(new THREE.SphereGeometry(180, 24, 16), skyMat);
    this.scene.add(this.skyDome);

    // Soft sculpted sky clouds drifting high over the valley
    const cloudMat = new THREE.MeshStandardMaterial({
      color: 0xFFFFFF,
      roughness: 1,
      metalness: 0,
      transparent: true,
      opacity: 0.88
    });
    const cloudCoords = [
      [-36, 26, -30, 1.4],
      [28, 28, -48, 1.6],
      [-22, 24, 12, 1.2],
      [34, 25, 22, 1.3],
      [4, 30, -78, 1.9]
    ];
    cloudCoords.forEach(([cx, cy, cz, scale], idx) => {
      const cg = new THREE.Group();
      cg.position.set(cx, cy, cz);
      cg.scale.setScalar(scale);
      [
        [0, 0, 0, 2.8],
        [-2.3, -0.4, 0.4, 2.0],
        [2.4, -0.3, -0.3, 2.1],
        [0.9, 0.7, 0.3, 1.8]
      ].forEach(([px, py, pz, r]) => {
        const puff = new THREE.Mesh(new THREE.DodecahedronGeometry(r, 1), cloudMat);
        puff.position.set(px, py, pz);
        puff.scale.set(1.25, 0.72, 1.0);
        cg.add(puff);
      });
      cg.userData = { baseX: cx, phase: idx * 1.4 };
      this.scene.add(cg);
      this.clouds.push(cg);
    });

    // Distant Layered Horizon Ridge Silhouettes
    const ridgeMat = new THREE.MeshStandardMaterial({
      color: 0x7E9682,
      roughness: 0.96,
      flatShading: true
    });
    for (let i = 0; i < 14; i++) {
      const angle = (i / 14) * Math.PI * 2;
      const dist = 94 + (i % 3) * 14;
      const peak = new THREE.Mesh(new THREE.ConeGeometry(18 + (i % 4) * 5, 16 + (i % 3) * 6, 5), ridgeMat);
      peak.position.set(Math.cos(angle) * dist, 5.5, Math.sin(angle) * dist);
      peak.rotation.y = i * 0.7;
      this.scene.add(peak);
    }
  },

  // --------------------------------------------------------------------------
  // PAINTERLY TEXTURED TERRAIN, BROOK, ARCHED BRIDGE & FLAGSTONE TRAIL
  // --------------------------------------------------------------------------
  buildTerrain() {
    const geo = new THREE.PlaneGeometry(150, 155, 110, 126);
    geo.rotateX(-Math.PI / 2);
    const pos = geo.attributes.position;
    const colors = [];

    const cAutumn = new THREE.Color(0x5E7A3C).convertSRGBToLinear();
    const cAutumnGold = new THREE.Color(0xA87C36).convertSRGBToLinear();
    const cAutumnRusset = new THREE.Color(0x9E5526).convertSRGBToLinear();
    const cTrailEarth = new THREE.Color(0x886E4A).convertSRGBToLinear();
    const cWinter = new THREE.Color(0xEFF5FA).convertSRGBToLinear();
    const cWinterShadow = new THREE.Color(0xCFE0EE).convertSRGBToLinear();
    const cSpring = new THREE.Color(0x4E9448).convertSRGBToLinear();
    const cSpringMoss = new THREE.Color(0x70AD54).convertSRGBToLinear();
    const cSummer = new THREE.Color(0x6D9C3C).convertSRGBToLinear();
    const cSummerGold = new THREE.Color(0x98AA42).convertSRGBToLinear();
    const cSand = new THREE.Color(0x95815F).convertSRGBToLinear();
    const tmp = new THREE.Color();

    for (let i = 0; i < pos.count; i++) {
      const vx = pos.getX(i);
      const vz = pos.getZ(i);
      const vy = this.terrainHeight(vx, vz);
      pos.setY(i, vy);

      const dapple = (Math.sin(vx * 0.34 + vz * 0.27) + Math.cos(vx * 0.19 - vz * 0.31) + 2) * 0.25;
      const distPath = Math.abs(vx - this.getPathCenterX(vz));

      if (vz > 25) {
        tmp.copy(cAutumn).lerp(cAutumnGold, Math.min(1, dapple * 0.9));
        if (dapple > 0.62) tmp.lerp(cAutumnRusset, (dapple - 0.62) * 1.4);
      } else if (vz > 20) {
        tmp.copy(cAutumn).lerp(cWinter, (25 - vz) / 5);
      } else if (vz > 5) {
        tmp.copy(cWinter).lerp(cWinterShadow, dapple * 0.45);
      } else if (vz > -2) {
        tmp.copy(cWinter).lerp(cSpring, (5 - vz) / 7);
      } else if (vz > -24) {
        tmp.copy(cSpring).lerp(cSpringMoss, dapple * 0.75);
      } else if (vz > -32) {
        tmp.copy(cSpring).lerp(cSummer, (-24 - vz) / 8);
      } else {
        tmp.copy(cSummer).lerp(cSummerGold, dapple * 0.65);
      }

      if (distPath < 2.3 && (vz > 21 || vz < 14)) {
        tmp.lerp(cTrailEarth, (1 - distPath / 2.3) * 0.74);
      }
      if (vy < -0.35) tmp.lerp(cSand, 0.78);
      colors.push(tmp.r, tmp.g, tmp.b);
    }

    geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    geo.computeVertexNormals();

    const mat = new THREE.MeshStandardMaterial({
      vertexColors: true,
      map: this.textures.meadow,
      bumpMap: this.textures.meadowBump,
      bumpScale: 0.38,
      roughness: 0.92,
      metalness: 0.02
    });
    const terrain = new THREE.Mesh(geo, mat);
    terrain.receiveShadow = true;
    this.scene.add(terrain);
  },

  buildBrookAndBridge() {
    const brookGeo = new THREE.PlaneGeometry(135, 8.6, 54, 4);
    brookGeo.rotateX(-Math.PI / 2);
    const bPos = brookGeo.attributes.position;
    for (let i = 0; i < bPos.count; i++) {
      const bx = bPos.getX(i);
      const bz = bPos.getZ(i);
      bPos.setZ(i, 18 + bz + Math.sin(bx * 0.14) * 2.5);
      bPos.setY(i, -0.44);
    }
    brookGeo.computeVertexNormals();
    const brookMat = new THREE.MeshStandardMaterial({
      map: this.textures.water,
      color: 0x8CD0EB,
      roughness: 0.14,
      metalness: 0.28,
      transparent: true,
      opacity: 0.9
    });
    this.waterMesh = new THREE.Mesh(brookGeo, brookMat);
    this.waterMesh.receiveShadow = true;
    this.scene.add(this.waterMesh);

    // Sculpted Arched Stone Bridge with rails & snow caps
    const bridgeGroup = new THREE.Group();
    const stoneMat = new THREE.MeshStandardMaterial({
      map: this.textures.stone,
      color: 0xADA494,
      roughness: 0.85
    });
    const trimMat = new THREE.MeshStandardMaterial({
      map: this.textures.stone,
      color: 0x7A7264,
      roughness: 0.82
    });
    const snowCapMat = new THREE.MeshStandardMaterial({ color: 0xF5F8FC, roughness: 0.85 });

    for (let i = -5; i <= 5; i++) {
      const bz = 18 + i * 0.96;
      const by = this.getPathSurfaceY(bz);
      const nextBy = this.getPathSurfaceY(bz + 0.96);
      const slopeAngle = Math.atan2(nextBy - by, 0.96);

      const plank = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.36, 1.02), stoneMat);
      plank.position.set(0, by - 0.12, bz);
      plank.rotation.x = -slopeAngle;
      plank.castShadow = true;
      plank.receiveShadow = true;
      bridgeGroup.add(plank);

      if (i % 2 === 0) {
        [-1.72, 1.72].forEach((sideX) => {
          const post = new THREE.Mesh(new THREE.BoxGeometry(0.34, 1.0, 0.34), trimMat);
          post.position.set(sideX, by + 0.44, bz);
          post.castShadow = true;
          bridgeGroup.add(post);

          const cap = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.12, 0.42), snowCapMat);
          cap.position.set(sideX, by + 0.98, bz);
          bridgeGroup.add(cap);
        });
      }
    }

    // Continuous wooden side handrails on bridge
    const railMat = new THREE.MeshStandardMaterial({ map: this.textures.wood, color: 0x6F4B2C, roughness: 0.88 });
    [-1.72, 1.72].forEach((sideX) => {
      const railCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(sideX, this.getPathSurfaceY(13.2) + 0.72, 13.2),
        new THREE.Vector3(sideX, this.getPathSurfaceY(18) + 0.72, 18),
        new THREE.Vector3(sideX, this.getPathSurfaceY(22.8) + 0.72, 22.8)
      ]);
      const rail = new THREE.Mesh(new THREE.TubeGeometry(railCurve, 16, 0.075, 6, false), railMat);
      rail.castShadow = true;
      bridgeGroup.add(rail);
    });

    this.scene.add(bridgeGroup);
  },

  buildCobblestonePath() {
    const stoneColors = [0xCBBFA1, 0xB8AA8B, 0xD6CAB0, 0xAA9B7E];
    const stoneMats = stoneColors.map((c) =>
      new THREE.MeshStandardMaterial({
        map: this.textures.stone,
        bumpMap: this.textures.stoneBump,
        bumpScale: 0.28,
        color: c,
        roughness: 0.88
      })
    );
    const steps = 124;

    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const pt = this.curve.getPointAt(t);
      const tan = this.curve.getTangentAt(t);
      const angle = Math.atan2(tan.x, tan.z);

      const paver = new THREE.Mesh(
        new THREE.CylinderGeometry(1.12, 1.24, 0.14, 7),
        stoneMats[i % stoneMats.length]
      );
      const jitterX = Math.sin(i * 7.3) * 0.16;
      const baseTerrain = Math.max(this.terrainHeight(pt.x, pt.z), this.getPathSurfaceY(pt.z));
      paver.position.set(pt.x + jitterX, baseTerrain + 0.04, pt.z);
      paver.rotation.y = angle + i * 0.4;
      paver.scale.set(1.08, 1, 0.72);
      paver.receiveShadow = true;
      this.scene.add(paver);
    }
  },

  // --------------------------------------------------------------------------
  // SCULPTED STORYBOOK TREES, TUDOR COTTAGE, GAZEBO & HARVEST PROPS
  // --------------------------------------------------------------------------
  createStorybookTree(x, z, style, scale = 1.0) {
    const g = new THREE.Group();
    const y = this.terrainHeight(x, z);
    g.position.set(x, y, z);
    g.scale.setScalar(scale);

    const trunkMat = new THREE.MeshStandardMaterial({
      map: this.textures.wood,
      bumpMap: this.textures.woodBump,
      bumpScale: 0.25,
      color: 0x6D472B,
      roughness: 0.92
    });
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.44, 2.7, 8), trunkMat);
    trunk.position.y = 1.3;
    trunk.castShadow = true;
    trunk.receiveShadow = true;
    g.add(trunk);

    // Flared root base + angled side branch
    const branch = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.17, 1.3, 6), trunkMat);
    branch.position.set(0.42, 2.0, 0.1);
    branch.rotation.z = -0.68;
    branch.castShadow = true;
    g.add(branch);

    if (style === "pine") {
      const pineMat = new THREE.MeshStandardMaterial({ color: 0x29523B, roughness: 0.88, flatShading: true });
      const snowMat = new THREE.MeshStandardMaterial({ color: 0xF5F8FC, roughness: 0.85 });
      [
        { r: 2.0, h: 2.4, y: 2.6 },
        { r: 1.5, h: 2.1, y: 3.95 },
        { r: 1.0, h: 1.7, y: 5.1 }
      ].forEach((tier) => {
        const cone = new THREE.Mesh(new THREE.ConeGeometry(tier.r, tier.h, 9), pineMat);
        cone.position.y = tier.y;
        cone.castShadow = true;
        cone.receiveShadow = true;
        g.add(cone);

        const cap = new THREE.Mesh(new THREE.ConeGeometry(tier.r * 0.72, tier.h * 0.46, 9), snowMat);
        cap.position.y = tier.y + tier.h * 0.28;
        g.add(cap);
      });
    } else {
      const palettes = {
        autumn: [0xDA7624, 0xC04622, 0xE7A933, 0xD25F23],
        spring: [0xF6B3C8, 0xFDE2EC, 0xF097B4, 0xF9CADB],
        summer: [0x42823B, 0x5BA04B, 0x356D31, 0x6AAD4F]
      };
      const cols = palettes[style] || palettes.autumn;
      const offsets = [
        [0, 3.25, 0, 1.48],
        [-0.92, 2.65, 0.55, 1.08],
        [0.92, 2.75, -0.45, 1.12],
        [0.2, 2.55, 0.9, 0.96],
        [-0.3, 3.85, -0.25, 0.92]
      ];
      offsets.forEach(([ox, oy, oz, rad], idx) => {
        const puff = new THREE.Mesh(
          new THREE.DodecahedronGeometry(rad, 2),
          new THREE.MeshStandardMaterial({
            map: this.textures.foliage,
            color: cols[idx % cols.length],
            roughness: 0.85
          })
        );
        puff.position.set(ox, oy, oz);
        puff.rotation.set(idx * 0.4, idx * 0.7, 0);
        puff.castShadow = true;
        puff.receiveShadow = true;
        g.add(puff);
      });
    }

    this.scene.add(g);
  },

  buildCottage(x, z) {
    const y = this.terrainHeight(x, z);
    const g = new THREE.Group();
    g.position.set(x, y, z);
    g.rotation.y = -0.42;

    const wallMat = new THREE.MeshStandardMaterial({ map: this.textures.stone, color: 0xF3E6CC, roughness: 0.88 });
    const timberMat = new THREE.MeshStandardMaterial({ map: this.textures.wood, color: 0x5E3A1F, roughness: 0.9 });
    const roofMat = new THREE.MeshStandardMaterial({ map: this.textures.wood, color: 0x7A4131, roughness: 0.85 });
    const snowMat = new THREE.MeshStandardMaterial({ color: 0xF5F8FC, roughness: 0.82 });
    const glowMat = new THREE.MeshStandardMaterial({
      color: 0xFFDF8C,
      emissive: 0xFFB038,
      emissiveIntensity: 1.35
    });

    const body = new THREE.Mesh(new THREE.BoxGeometry(4.6, 2.9, 3.8), wallMat);
    body.position.y = 1.45;
    body.castShadow = true;
    body.receiveShadow = true;
    g.add(body);

    // Tudor Corner & Horizontal Timber Beams
    [-2.28, 2.28].forEach((bx) => {
      [-1.88, 1.88].forEach((bz) => {
        const beam = new THREE.Mesh(new THREE.BoxGeometry(0.18, 2.92, 0.18), timberMat);
        beam.position.set(bx, 1.46, bz);
        g.add(beam);
      });
    });

    const roof = new THREE.Mesh(new THREE.ConeGeometry(3.6, 2.3, 4), roofMat);
    roof.position.y = 4.0;
    roof.rotation.y = Math.PI / 4;
    roof.castShadow = true;
    g.add(roof);

    const snowRoof = new THREE.Mesh(new THREE.ConeGeometry(3.25, 1.55, 4), snowMat);
    snowRoof.position.y = 4.4;
    snowRoof.rotation.y = Math.PI / 4;
    g.add(snowRoof);

    const door = new THREE.Mesh(new THREE.BoxGeometry(0.95, 1.6, 0.2), timberMat);
    door.position.set(0, 0.8, 1.92);
    g.add(door);

    [-1.3, 1.3].forEach((wx) => {
      const frame = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.9, 0.14), timberMat);
      frame.position.set(wx, 1.6, 1.9);
      const win = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.72, 0.18), glowMat);
      win.position.set(wx, 1.6, 1.92);
      g.add(frame, win);
    });

    const chimney = new THREE.Mesh(
      new THREE.BoxGeometry(0.7, 2.3, 0.7),
      new THREE.MeshStandardMaterial({ map: this.textures.stone, color: 0x7E766A, roughness: 0.9 })
    );
    chimney.position.set(-1.35, 4.0, -0.85);
    chimney.castShadow = true;
    g.add(chimney);

    const cottageLight = new THREE.PointLight(0xFFB44C, 1.35, 12);
    cottageLight.position.set(0, 1.7, 2.8);
    g.add(cottageLight);

    for (let s = 0; s < 5; s++) {
      const puff = new THREE.Mesh(
        new THREE.SphereGeometry(0.28 + s * 0.06, 8, 8),
        new THREE.MeshStandardMaterial({ color: 0xF5F5F7, transparent: true, opacity: 0.52, roughness: 1 })
      );
      puff.userData = { baseX: x - 1.35, baseY: y + 5.2, baseZ: z - 0.85, phase: s * 0.2 };
      this.scene.add(puff);
      this.smokePuffs.push(puff);
    }

    this.scene.add(g);
  },

  buildSummerGazebo(x, z) {
    const summitY = 2.6;
    const g = new THREE.Group();
    g.position.set(x, summitY, z);

    const stoneMat = new THREE.MeshStandardMaterial({
      map: this.textures.stone,
      bumpMap: this.textures.stoneBump,
      bumpScale: 0.25,
      color: 0xA89F8F,
      roughness: 0.9
    });
    const woodMat = new THREE.MeshStandardMaterial({ map: this.textures.wood, color: 0x8F5E34, roughness: 0.82 });
    const creamMat = new THREE.MeshStandardMaterial({ color: 0xFFF7E4, roughness: 0.8 });
    const brassMat = new THREE.MeshStandardMaterial({ color: 0xE6B33D, roughness: 0.32, metalness: 0.65 });

    // Deep stone plinth grounded firmly into the hillside (never overhangs/floats)
    const plinth = new THREE.Mesh(new THREE.CylinderGeometry(4.2, 4.7, 1.35, 8), stoneMat);
    plinth.position.y = -0.42;
    plinth.receiveShadow = true;
    plinth.castShadow = true;
    g.add(plinth);

    // Timber deck with top flush at summitY + 0.36
    const deck = new THREE.Mesh(new THREE.CylinderGeometry(4.0, 4.18, 0.28, 8), woodMat);
    deck.position.y = 0.22;
    deck.receiveShadow = true;
    deck.castShadow = true;
    g.add(deck);

    // Two wide wooden entry steps on the +Z approach facing the trail
    const step1 = new THREE.Mesh(new THREE.BoxGeometry(2.5, 0.22, 0.85), woodMat);
    step1.position.set(0, 0.08, 4.55);
    step1.receiveShadow = true;
    step1.castShadow = true;
    const step2 = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.24, 0.85), woodMat);
    step2.position.set(0, 0.2, 4.0);
    step2.receiveShadow = true;
    step2.castShadow = true;
    g.add(step1, step2);

    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 3.3, 7), creamMat);
      post.position.set(Math.cos(a) * 3.2, 1.98, Math.sin(a) * 3.2);
      post.castShadow = true;
      g.add(post);
    }

    const roof = new THREE.Mesh(
      new THREE.ConeGeometry(4.5, 2.4, 8),
      new THREE.MeshStandardMaterial({ map: this.textures.wood, color: 0x336C42, roughness: 0.8 })
    );
    roof.position.y = 4.74;
    roof.castShadow = true;
    g.add(roof);

    const spire = new THREE.Mesh(new THREE.ConeGeometry(0.26, 1.2, 6), brassMat);
    spire.position.y = 6.29;
    g.add(spire);

    this.scene.add(g);
  },

  createSplitRailFence(pts) {
    const postMat = new THREE.MeshStandardMaterial({ map: this.textures.wood, color: 0x6D4A2B, roughness: 0.92 });
    const railMat = new THREE.MeshStandardMaterial({ map: this.textures.wood, color: 0x845B37, roughness: 0.9 });
    for (let i = 0; i < pts.length; i++) {
      const [px, pz] = pts[i];
      const py = this.terrainHeight(px, pz);
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.11, 0.88, 6), postMat);
      post.position.set(px, py + 0.44, pz);
      post.castShadow = true;
      this.scene.add(post);

      if (i < pts.length - 1) {
        const [nx, nz] = pts[i + 1];
        const ny = this.terrainHeight(nx, nz);
        const dx = nx - px;
        const dz = nz - pz;
        const len = Math.hypot(dx, dz);
        const yaw = Math.atan2(dx, dz);
        [0.34, 0.64].forEach((rh) => {
          const rail = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.08, len), railMat);
          rail.position.set((px + nx) / 2, (py + ny) / 2 + rh, (pz + nz) / 2);
          rail.rotation.y = yaw;
          rail.castShadow = true;
          this.scene.add(rail);
        });
      }
    }
  },

  createPumpkinAndBasketCluster(cx, cz) {
    const cy = this.terrainHeight(cx, cz);
    const g = new THREE.Group();
    g.position.set(cx, cy, cz);

    const pumpMat = new THREE.MeshStandardMaterial({ color: 0xD96A22, roughness: 0.66 });
    const stemMat = new THREE.MeshStandardMaterial({ color: 0x456B2E, roughness: 0.85 });
    const pump = new THREE.Mesh(new THREE.SphereGeometry(0.42, 12, 9), pumpMat);
    pump.scale.set(1.15, 0.78, 1.15);
    pump.position.set(-0.35, 0.3, 0.1);
    pump.castShadow = true;
    const pStem = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.06, 0.2, 5), stemMat);
    pStem.position.set(-0.35, 0.64, 0.1);
    pStem.rotation.z = 0.22;

    const gourd = new THREE.Mesh(
      new THREE.SphereGeometry(0.26, 8, 7),
      new THREE.MeshStandardMaterial({ color: 0xE69A28, roughness: 0.7 })
    );
    gourd.scale.set(1.1, 0.82, 1.1);
    gourd.position.set(0.25, 0.21, 0.25);
    gourd.castShadow = true;

    const basket = new THREE.Mesh(
      new THREE.CylinderGeometry(0.42, 0.32, 0.44, 10),
      new THREE.MeshStandardMaterial({ map: this.textures.wood, color: 0xAA7840, roughness: 0.9 })
    );
    basket.position.set(0.32, 0.22, -0.32);
    basket.castShadow = true;
    g.add(pump, pStem, gourd, basket);

    const appleMat = new THREE.MeshStandardMaterial({ color: 0xC83430, roughness: 0.45 });
    [[-0.1, 0.46, 0.05], [0.1, 0.46, -0.04], [0, 0.52, 0.04]].forEach(([ax, ay, az]) => {
      const ap = new THREE.Mesh(new THREE.SphereGeometry(0.13, 8, 8), appleMat);
      ap.position.set(0.32 + ax, ay, -0.32 + az);
      g.add(ap);
    });

    this.scene.add(g);
  },

  buildSeasonalSettings() {
    // 1. Autumn Orchard Trees, Fences & Harvest Baskets (z: 25..55)
    const autumnCoords = [
      [-14.5, 50, 1.05], [9.5, 48, 0.95], [-12.5, 41, 1.12], [11.5, 39, 1.0], [-10.5, 33, 0.92],
      [10.5, 31, 1.08], [-9.5, 25, 0.9], [14.5, 45, 1.15], [-17.5, 45, 1.2], [-18, 34, 1.1],
      [17, 34, 1.18], [-16, 26, 1.0], [16, 26, 1.05]
    ];
    autumnCoords.forEach(([x, z, s]) => this.createStorybookTree(x, z, "autumn", s));

    this.createSplitRailFence([[-8.6, 51], [-7.2, 46.5], [-5.2, 42.5]]);
    this.createSplitRailFence([[6.2, 44], [6.8, 39.5], [5.4, 35]]);
    this.createPumpkinAndBasketCluster(-6.4, 46.2);
    this.createPumpkinAndBasketCluster(5.8, 37.5);
    this.createPumpkinAndBasketCluster(-6.8, 30.8);

    // 2. Winter Pines + Tudor Hearth Cottage (z: 4..23)
    const winterCoords = [
      [-11, 21, 1.05], [11, 21, 1.0], [-14, 14, 1.15], [13, 12, 1.08], [-10, 6, 0.95],
      [10, 5, 1.0], [-18, 17, 1.2], [17, 17, 1.15], [-17, 7, 1.12], [16, 7, 1.08]
    ];
    winterCoords.forEach(([x, z, s]) => this.createStorybookTree(x, z, "pine", s));
    this.buildCottage(-8.8, 12.5);

    // 3. Spring Blossom Trees, Wildflowers & Butterflies (z: -24..1)
    const springCoords = [
      [-11, -2, 1.0], [11, -5, 1.08], [-12, -13, 1.1], [11, -17, 0.95], [-10, -23, 1.05],
      [14, -11, 1.15], [-17, -7, 1.12], [17, -15, 1.1], [-16, -21, 1.05], [16, -23, 1.0]
    ];
    springCoords.forEach(([x, z, s]) => this.createStorybookTree(x, z, "spring", s));

    const wingMat = new THREE.MeshStandardMaterial({ color: 0xF5B841, side: THREE.DoubleSide, roughness: 0.5 });
    for (let b = 0; b < 6; b++) {
      const bf = new THREE.Group();
      const leftWing = new THREE.Mesh(new THREE.CircleGeometry(0.22, 6), wingMat);
      leftWing.position.x = -0.14;
      const rightWing = new THREE.Mesh(new THREE.CircleGeometry(0.22, 6), wingMat);
      rightWing.position.x = 0.14;
      bf.add(leftWing, rightWing);
      bf.userData = {
        cx: (b % 2 === 0 ? -4 : 4) + Math.sin(b) * 2,
        cz: -6 - b * 2.8,
        phase: b * 1.3,
        leftWing,
        rightWing
      };
      this.scene.add(bf);
      this.butterflies.push(bf);
    }

    // 4. Summer Sunlit Orchard Trees, Sunflowers & Gazebo (z: -56..-26)
    const summerCoords = [
      [-12, -31, 1.05], [12, -34, 1.08], [-11, -43, 1.0], [12, -45, 1.12], [-9, -54, 1.0],
      [9, -54, 1.05], [-17, -36, 1.15], [17, -39, 1.18], [-16, -49, 1.1], [16, -50, 1.12]
    ];
    summerCoords.forEach(([x, z, s]) => this.createStorybookTree(x, z, "summer", s));
    this.buildSummerGazebo(0, -55);

    // Rocks, Toadstools, Spring Flowers & Summer Sunflowers
    const grassMatA = new THREE.MeshStandardMaterial({ color: 0x4E7334, roughness: 0.92 });
    const rockMat = new THREE.MeshStandardMaterial({ map: this.textures.stone, color: 0x827E74, roughness: 0.94, flatShading: true });
    const stemMat = new THREE.MeshStandardMaterial({ color: 0xF5EBD8, roughness: 0.85 });
    const capMat = new THREE.MeshStandardMaterial({ color: 0xC64234, roughness: 0.72 });

    const pathPts = this.curve.getPoints(48);
    const tooCloseToPath = (px, pz, minDist) =>
      pathPts.some((p) => (p.x - px) * (p.x - px) + (p.z - pz) * (p.z - pz) < minDist * minDist);

    for (let i = 0; i < 36; i++) {
      const z = 53 - i * 2.9;
      const side = i % 2 === 0 ? -1 : 1;
      const x = this.getPathCenterX(z) + side * (4.0 + ((i * 37) % 100) / 100 * 11);
      if (tooCloseToPath(x, z, 3.2)) continue;
      const y = this.terrainHeight(x, z);
      if (y < -0.2) continue;

      if (i % 3 === 0) {
        const rock = new THREE.Mesh(new THREE.DodecahedronGeometry(0.46 + (i % 3) * 0.16, 0), rockMat);
        rock.position.set(x, y + 0.16, z);
        rock.scale.set(1.25, 0.72, 1.0);
        rock.rotation.y = i * 0.7;
        rock.castShadow = true;
        rock.receiveShadow = true;
        this.scene.add(rock);
      } else if (z > 22 || z < 2) {
        const mush = new THREE.Group();
        mush.position.set(x, y, z);
        [0, 0.24].forEach((mx, k) => {
          const s = k === 0 ? 1 : 0.7;
          const st = new THREE.Mesh(new THREE.CylinderGeometry(0.05 * s, 0.07 * s, 0.24 * s, 6), stemMat);
          st.position.set(mx, 0.12 * s, k * 0.15);
          const cp = new THREE.Mesh(new THREE.ConeGeometry(0.18 * s, 0.14 * s, 7), capMat);
          cp.position.set(mx, 0.25 * s, k * 0.15);
          mush.add(st, cp);
        });
        this.scene.add(mush);
      }
    }

    const petalCols = [0xFFF8E1, 0xF490A4, 0xA8C8F5, 0xF7CC4F];
    for (let f = 0; f < 26; f++) {
      const z = 0.5 - f * 0.95;
      const side = f % 2 === 0 ? 1 : -1;
      const x = this.getPathCenterX(z) + side * (2.6 + (f % 5) * 1.8);
      const y = this.terrainHeight(x, z);
      const flower = new THREE.Group();
      flower.position.set(x, y, z);
      const stalk = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.38, 5), grassMatA);
      stalk.position.y = 0.18;
      const bloom = new THREE.Mesh(
        new THREE.DodecahedronGeometry(0.16, 0),
        new THREE.MeshStandardMaterial({ color: petalCols[f % petalCols.length], roughness: 0.6 })
      );
      bloom.position.y = 0.4;
      flower.add(stalk, bloom);
      this.scene.add(flower);
    }

    const sunHeadMat = new THREE.MeshStandardMaterial({ color: 0xF2B930, roughness: 0.65 });
    const sunCenterMat = new THREE.MeshStandardMaterial({ color: 0x4E331A, roughness: 0.9 });
    for (let s = 0; s < 16; s++) {
      const z = -28 - s * 1.75;
      const side = s % 2 === 0 ? -1 : 1;
      const x = this.getPathCenterX(z) + side * (2.9 + (s % 3) * 1.9);
      const y = this.terrainHeight(x, z);
      const sf = new THREE.Group();
      sf.position.set(x, y, z);
      const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.05, 1.05, 5), grassMatA);
      stem.position.y = 0.52;
      const disk = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.08, 8), sunHeadMat);
      disk.rotation.x = Math.PI / 2.4;
      disk.position.y = 1.06;
      const core = new THREE.Mesh(new THREE.SphereGeometry(0.14, 6, 6), sunCenterMat);
      core.position.set(0, 1.07, 0.03);
      sf.add(stem, disk, core);
      this.scene.add(sf);
    }
  },

  // --------------------------------------------------------------------------
  // INSTANCED LIVING MEADOW FLORA (900+ GRASS & FALLEN LEAF TUFTS IN 2 DRAW CALLS)
  // --------------------------------------------------------------------------
  buildInstancedMeadowFlora() {
    // Sculpted 3-blade grass clump BufferGeometry (soft natural blades instead of single cones)
    const verts = [];
    const blades = [
      { ox: 0.0, oz: 0.0, dx: 0.02, dz: 0.03, w: 0.048, h: 0.34 },
      { ox: -0.05, oz: 0.03, dx: -0.14, dz: 0.06, w: 0.042, h: 0.27 },
      { ox: 0.05, oz: -0.02, dx: 0.13, dz: -0.07, w: 0.042, h: 0.29 }
    ];
    blades.forEach((b) => {
      verts.push(
        b.ox - b.w, 0, b.oz,
        b.ox + b.w, 0, b.oz,
        b.ox + b.dx, b.h, b.oz + b.dz
      );
    });
    const bladeGeo = new THREE.BufferGeometry();
    bladeGeo.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
    bladeGeo.computeVertexNormals();
    const bladeMat = new THREE.MeshStandardMaterial({
      color: 0xFFFFFF,
      roughness: 0.88,
      side: THREE.DoubleSide
    });

    const grassCount = 860;
    const grassMesh = new THREE.InstancedMesh(bladeGeo, bladeMat, grassCount);
    grassMesh.receiveShadow = true;

    const pathPts = this.curve.getPoints(48);
    const nearTrail = (px, pz, minD) =>
      pathPts.some((p) => (p.x - px) * (p.x - px) + (p.z - pz) * (p.z - pz) < minD * minD);

    const dummy = new THREE.Object3D();
    const color = new THREE.Color();
    let placed = 0;
    for (let i = 0; i < grassCount * 2 && placed < grassCount; i++) {
      const h1 = Math.abs(Math.sin(i * 12.9898) * 43758.5453) % 1;
      const h2 = Math.abs(Math.sin(i * 78.233) * 19341.123) % 1;
      const z = 54 - h1 * 110;
      if (z > 4 && z < 23) continue;
      const x = (h2 - 0.5) * 46;
      if (nearTrail(x, z, 2.7)) continue;
      const y = this.terrainHeight(x, z);
      if (y < -0.15) continue;

      dummy.position.set(x, y, z);
      dummy.rotation.set(0, h2 * Math.PI * 2, 0);
      dummy.scale.setScalar(0.85 + h1 * 0.75);
      dummy.updateMatrix();
      grassMesh.setMatrixAt(placed, dummy.matrix);

      if (z > 24) {
        color.setHex(i % 3 === 0 ? 0x8C6B2D : i % 3 === 1 ? 0x526C33 : 0x9C5020).convertSRGBToLinear();
      } else if (z > -25) {
        color.setHex(i % 2 === 0 ? 0x3D8238 : 0x5C9844).convertSRGBToLinear();
      } else {
        color.setHex(i % 2 === 0 ? 0x5A8832 : 0x829938).convertSRGBToLinear();
      }
      grassMesh.setColorAt(placed, color);
      placed++;
    }
    grassMesh.count = placed;
    grassMesh.instanceMatrix.needsUpdate = true;
    if (grassMesh.instanceColor) grassMesh.instanceColor.needsUpdate = true;
    this.scene.add(grassMesh);

    // Scattered Fallen Autumn Leaves on Autumn ground (off trail)
    const leafCount = 200;
    const leafGeo = new THREE.CircleGeometry(0.17, 5);
    leafGeo.rotateX(-Math.PI / 2);
    const leafMat = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, roughness: 0.85, side: THREE.DoubleSide });
    const leafMesh = new THREE.InstancedMesh(leafGeo, leafMat, leafCount);
    let lPlaced = 0;
    for (let i = 0; i < leafCount * 2 && lPlaced < leafCount; i++) {
      const h1 = Math.abs(Math.sin(i * 41.12) * 14521.7) % 1;
      const h2 = Math.abs(Math.sin(i * 93.77) * 27183.3) % 1;
      const z = 54 - h1 * 30;
      const x = (h2 - 0.5) * 32;
      if (nearTrail(x, z, 2.2)) continue;
      const y = this.terrainHeight(x, z);
      dummy.position.set(x, y + 0.03, z);
      dummy.rotation.set(0, h1 * Math.PI * 2, 0);
      dummy.scale.set(1.2, 1, 0.8);
      dummy.updateMatrix();
      leafMesh.setMatrixAt(lPlaced, dummy.matrix);
      color.setHex(i % 3 === 0 ? 0xC8541E : i % 3 === 1 ? 0xD88B24 : 0xA6381A).convertSRGBToLinear();
      leafMesh.setColorAt(lPlaced, color);
      lPlaced++;
    }
    leafMesh.count = lPlaced;
    leafMesh.instanceMatrix.needsUpdate = true;
    if (leafMesh.instanceColor) leafMesh.instanceColor.needsUpdate = true;
    this.scene.add(leafMesh);
  },

  // --------------------------------------------------------------------------
  // SCULPTED SHEPHERD-HOOK LANTERNS + 3D PERSPECTIVE NUMBERED LEVEL MEDALLIONS
  // --------------------------------------------------------------------------
  buildLanterns() {
    const postMat = new THREE.MeshStandardMaterial({ map: this.textures.wood, color: 0x52361F, roughness: 0.85 });
    const ironMat = new THREE.MeshStandardMaterial({ color: 0x2F2B26, roughness: 0.45, metalness: 0.65 });
    const brassMat = new THREE.MeshStandardMaterial({ color: 0xC8962E, roughness: 0.32, metalness: 0.68 });

    this.lanterns = [];
    const total = this.nodesRef.length;
    for (let i = 0; i < total; i++) {
      const node = this.nodesRef[i];
      const t = total > 1 ? i / (total - 1) : 0;
      const pt = this.curve.getPointAt(t);
      const tan = this.curve.getTangentAt(t);
      const side = i % 2 === 0 ? -1 : 1;
      const lx = pt.x + (-tan.z) * 1.65 * side;
      const lz = pt.z + (tan.x) * 1.65 * side;
      const ly = Math.max(this.terrainHeight(lx, lz), pt.y);

      const group = new THREE.Group();
      group.position.set(lx, ly, lz);
      group.userData = { nodeId: node.id, t };

      const postH = node.isMilestone ? 2.45 : 2.0;
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.085, 0.13, postH, 8), postMat);
      post.position.y = postH / 2;
      post.castShadow = true;
      group.add(post);

      // Curved wrought-iron shepherd's arm
      const hookCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, postH - 0.15, 0),
        new THREE.Vector3(-side * 0.15, postH + 0.35, 0),
        new THREE.Vector3(-side * 0.45, postH + 0.42, 0),
        new THREE.Vector3(-side * 0.48, postH + 0.25, 0)
      ]);
      const hook = new THREE.Mesh(new THREE.TubeGeometry(hookCurve, 10, 0.04, 6, false), ironMat);
      hook.castShadow = true;
      group.add(hook);

      // Lantern housing hanging from shepherd hook
      const lanX = -side * 0.48;
      const lanY = postH + 0.02;
      const cap = new THREE.Mesh(new THREE.ConeGeometry(0.28, 0.24, 6), brassMat);
      cap.position.set(lanX, lanY + 0.2, 0);
      group.add(cap);

      const orbMat = new THREE.MeshStandardMaterial({
        color: 0xFFE6A3,
        emissive: 0xF2B830,
        emissiveIntensity: 0.85,
        roughness: 0.22
      });
      const orb = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.13, 0.28, 6), orbMat);
      orb.position.set(lanX, lanY - 0.02, 0);
      orb.userData = { nodeId: node.id };
      group.add(orb);

      const base = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.12, 0.08, 6), ironMat);
      base.position.set(lanX, lanY - 0.18, 0);
      group.add(base);

      // Warm radial ground light pool beneath each lantern
      const poolMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(3.2, 3.2),
        new THREE.MeshBasicMaterial({
          map: this.textures.glowHalo,
          color: 0xFFB838,
          transparent: true,
          opacity: 0.34,
          depthWrite: false
        })
      );
      poolMesh.rotation.x = -Math.PI / 2;
      poolMesh.position.set(lanX, 0.09, 0);
      group.add(poolMesh);

      // Radiant Beacon Flare visible EVEN at far distance across Winter/Spring/Summer hills
      // so parents always see where clickable levels lie ahead to hover & inspect!
      const beaconMat = new THREE.SpriteMaterial({
        map: this.textures.glowHalo,
        color: 0xFFD25A,
        transparent: true,
        opacity: 0.92,
        depthWrite: false,
        sizeAttenuation: true
      });
      const beaconSprite = new THREE.Sprite(beaconMat);
      beaconSprite.position.set(lanX, lanY + 0.04, 0);
      beaconSprite.scale.set(1.45, 1.45, 1);
      beaconSprite.userData = { nodeId: node.id };
      group.add(beaconSprite);

      // True 3D Perspective-Scaled Numbered Medallion Sprite mounted atop each post!
      // Size scales automatically by camera distance so near/mid Levels 1..5 read clearly.
      const badgeTex = this.makeBadgeTexture(node.id, "upcoming", node.isMilestone);
      const badgeMat = new THREE.SpriteMaterial({
        map: badgeTex,
        transparent: true,
        depthTest: true,
        sizeAttenuation: true
      });
      const badgeSprite = new THREE.Sprite(badgeMat);
      badgeSprite.position.set(0, postH + 0.85, 0);
      badgeSprite.scale.set(0.95, 0.95, 1);
      badgeSprite.userData = { nodeId: node.id };
      group.add(badgeSprite);

      // Generous invisible click target encompassing post + hanging lantern + medallion
      const hitMesh = new THREE.Mesh(
        new THREE.CylinderGeometry(0.92, 0.92, postH + 1.4, 8),
        new THREE.MeshBasicMaterial({ visible: false })
      );
      hitMesh.position.y = (postH + 0.8) / 2;
      hitMesh.userData = { nodeId: node.id };
      group.add(hitMesh);

      this.scene.add(group);
      this.lanterns.push({
        node,
        t,
        group,
        orb,
        orbMat,
        poolMesh,
        beaconSprite,
        beaconMat,
        badgeSprite,
        badgeMat,
        badgeStatus: "upcoming",
        hitMesh,
        worldPos: new THREE.Vector3(lx, ly + postH + 1.32, lz)
      });
    }

    this.haloRing = new THREE.Mesh(
      new THREE.RingGeometry(0.76, 1.06, 24),
      new THREE.MeshBasicMaterial({ color: 0xF4C852, side: THREE.DoubleSide, transparent: true, opacity: 0.85 })
    );
    this.haloRing.rotation.x = -Math.PI / 2;
    this.scene.add(this.haloRing);

    this.syncLanternStates();
  },

  syncLanternStates() {
    this.lanterns.forEach((l) => {
      const prog = this.progressGetter(l.node.id);
      const isSelected = l.node.id === this.selectedNodeId;
      const nextStatus = isSelected ? "selected" : prog.mastered ? "mastered" : "upcoming";

      if (isSelected) {
        l.orbMat.color.setHex(0xFFF3B8);
        l.orbMat.emissive.setHex(0xFFB82E);
        l.orbMat.emissiveIntensity = 1.7;
        if (l.beaconMat) l.beaconMat.color.setHex(0xFFE066);
        if (l.poolMesh) l.poolMesh.material.opacity = 0.55;
        if (this.activeGlowLight) {
          this.activeGlowLight.position.copy(l.group.position).add(new THREE.Vector3(0, 2.2, 0));
        }
        if (this.haloRing) {
          const pt = this.curve.getPointAt(l.t);
          this.haloRing.position.set(pt.x, Math.max(this.terrainHeight(pt.x, pt.z), pt.y) + 0.14, pt.z);
        }
      } else if (prog.mastered) {
        l.orbMat.color.setHex(0xC5F7C8);
        l.orbMat.emissive.setHex(0x3DA65A);
        l.orbMat.emissiveIntensity = 1.1;
        if (l.beaconMat) l.beaconMat.color.setHex(0x6EE08A);
        if (l.poolMesh) l.poolMesh.material.opacity = 0.36;
      } else {
        l.orbMat.color.setHex(0xE8DEC6);
        l.orbMat.emissive.setHex(0xD99B26);
        l.orbMat.emissiveIntensity = 0.55;
        if (l.beaconMat) l.beaconMat.color.setHex(0xFFC84D);
        if (l.poolMesh) l.poolMesh.material.opacity = 0.28;
      }

      if (l.badgeMat && l.badgeStatus !== nextStatus) {
        l.badgeStatus = nextStatus;
        if (l.badgeMat.map) l.badgeMat.map.dispose();
        l.badgeMat.map = this.makeBadgeTexture(l.node.id, nextStatus, l.node.isMilestone);
        l.badgeMat.needsUpdate = true;
      }
      if (l.badgeSprite) {
        const s = isSelected ? 1.12 : l.node.isMilestone ? 1.02 : 0.9;
        l.badgeSprite.scale.set(s, s, 1);
      }
    });
  },

  // --------------------------------------------------------------------------
  // SCULPTED 3D PIP THE HEDGEHOG (Banded Quills, Expressive Face & Explorer Kit)
  // --------------------------------------------------------------------------
  buildPip() {
    this.pipGroup = new THREE.Group();

    const hashQ = (n) => {
      const x = Math.sin(n * 91.345 + 17.13) * 47453.5453;
      return x - Math.floor(x);
    };

    const furMat = new THREE.MeshStandardMaterial({
      map: this.textures.fur,
      color: 0xECD6B8,
      roughness: 0.90
    });
    const cheekFurMat = new THREE.MeshStandardMaterial({
      map: this.textures.fur,
      color: 0xF3E2CA,
      roughness: 0.90
    });
    const blushMat = new THREE.MeshStandardMaterial({
      color: 0xDFA088,
      roughness: 0.92
    });
    const earOuterMat = new THREE.MeshStandardMaterial({
      map: this.textures.fur,
      color: 0xC69F73,
      roughness: 0.88
    });
    const earInnerMat = new THREE.MeshStandardMaterial({
      color: 0xDCA093,
      roughness: 0.92
    });
    const undercoatMat = new THREE.MeshStandardMaterial({
      map: this.textures.fur,
      color: 0x3A2212,
      roughness: 0.95
    });
    const vestMat = new THREE.MeshStandardMaterial({
      map: this.textures.felt,
      color: 0x1E492B,
      roughness: 0.90
    });
    const beretMat = new THREE.MeshStandardMaterial({
      map: this.textures.felt,
      color: 0x1D482A,
      roughness: 0.90
    });
    const scarfMat = new THREE.MeshStandardMaterial({
      map: this.textures.felt,
      color: 0xC05A24,
      roughness: 0.86
    });
    const leatherMat = new THREE.MeshStandardMaterial({
      map: this.textures.leather,
      color: 0x7A4620,
      roughness: 0.65
    });
    const brassMat = new THREE.MeshStandardMaterial({
      color: 0xD9A22E,
      roughness: 0.32,
      metalness: 0.68
    });
    const noseEyeMat = new THREE.MeshStandardMaterial({
      color: 0x1A120D,
      roughness: 0.14,
      metalness: 0.05
    });
    const catchlightMat = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
    const pawMat = new THREE.MeshStandardMaterial({
      map: this.textures.leather,
      color: 0x80512D,
      roughness: 0.78
    });
    const scrollMat = new THREE.MeshStandardMaterial({
      color: 0xF6EDD4,
      roughness: 0.85
    });
    const staffMat = new THREE.MeshStandardMaterial({
      map: this.textures.wood,
      color: 0x6B401E,
      roughness: 0.78
    });

    // 1. Plump Hedgehog Torso & Soft Cream Belly
    const torso = new THREE.Mesh(new THREE.SphereGeometry(0.42, 24, 18), furMat);
    torso.scale.set(0.88, 1.02, 0.98);
    torso.position.set(0, 0.47, 0.08);
    torso.castShadow = true;
    this.pipGroup.add(torso);

    // Tailored open woodsman waistcoat hugging ONLY the chest & front flanks (tucked inside spine mantle)
    const vestBack = new THREE.Mesh(
      new THREE.SphereGeometry(0.425, 22, 16, Math.PI * 0.25, Math.PI * 1.5, 0.55, 1.35),
      vestMat
    );
    vestBack.scale.set(0.87, 0.98, 0.95);
    vestBack.position.set(0, 0.47, 0.11);
    vestBack.rotation.y = Math.PI * 0.5;
    vestBack.castShadow = true;
    this.pipGroup.add(vestBack);

    [-0.11, 0.11].forEach((bx) => {
      const lapel = new THREE.Mesh(new THREE.BoxGeometry(0.085, 0.32, 0.055), vestMat);
      lapel.position.set(bx, 0.47, 0.46);
      lapel.rotation.y = bx > 0 ? -0.25 : 0.25;
      lapel.rotation.z = bx > 0 ? -0.14 : 0.14;
      this.pipGroup.add(lapel);
    });
    [0.37, 0.50].forEach((by) => {
      const btn = new THREE.Mesh(new THREE.SphereGeometry(0.022, 8, 8), brassMat);
      btn.position.set(0.055, by, 0.50);
      this.pipGroup.add(btn);
    });

    // 2. Hedgehog Spine Mantle Undercoat + 310+ Banded Sculpted 3D Quills
    const mantleCenter = new THREE.Vector3(0, 0.63, -0.08);
    const mantleRadii = new THREE.Vector3(0.43, 0.44, 0.54);

    const mantleCore = new THREE.Mesh(new THREE.SphereGeometry(1, 24, 18), undercoatMat);
    mantleCore.scale.copy(mantleRadii);
    mantleCore.position.copy(mantleCenter);
    mantleCore.castShadow = true;
    this.pipGroup.add(mantleCore);

    const quillGeo = new THREE.ConeGeometry(0.036, 0.26, 6, 3);
    quillGeo.translate(0, 0.105, 0);
    const qPos = quillGeo.attributes.position;
    const qColors = new Float32Array(qPos.count * 3);
    const cRoot = new THREE.Color(0x2B170B).convertSRGBToLinear();
    const cShaft = new THREE.Color(0x7B4A25).convertSRGBToLinear();
    const cBand = new THREE.Color(0x362011).convertSRGBToLinear();
    const cTip = new THREE.Color(0xF3E7D2).convertSRGBToLinear();
    const tmpCol = new THREE.Color();

    for (let i = 0; i < qPos.count; i++) {
      const y = qPos.getY(i);
      const frac = Math.max(0, Math.min(1, (y + 0.025) / 0.26));
      if (frac < 0.36) {
        tmpCol.copy(cRoot).lerp(cShaft, frac / 0.36);
      } else if (frac < 0.72) {
        tmpCol.copy(cShaft).lerp(cBand, (frac - 0.36) / 0.36);
      } else if (frac < 0.86) {
        tmpCol.copy(cBand).lerp(cTip, (frac - 0.72) / 0.14);
      } else {
        tmpCol.copy(cTip);
      }
      qColors[i * 3] = tmpCol.r;
      qColors[i * 3 + 1] = tmpCol.g;
      qColors[i * 3 + 2] = tmpCol.b;
    }
    quillGeo.setAttribute("color", new THREE.BufferAttribute(qColors, 3));

    const quillMat = new THREE.MeshStandardMaterial({
      color: 0xFFFFFF,
      vertexColors: true,
      roughness: 0.76
    });

    // Golden-angle ellipsoid distribution across back, shoulders, crown & flanks
    const sampleN = 430;
    const placements = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < sampleN; i++) {
      const yNorm = 1 - (i / (sampleN - 1)) * 1.44; // 1 down to -0.44
      const rSlice = Math.sqrt(Math.max(0, 1 - yNorm * yNorm));
      const theta = golden * i + (hashQ(i * 3 + 1) - 0.5) * 0.16;
      const nx = Math.cos(theta) * rSlice;
      const nz = Math.sin(theta) * rSlice;
      if (nz > 0.54) continue;
      if (nz > 0.24 && yNorm < 0.34) continue;
      placements.push({ nx, ny: yNorm, nz, idx: i });
    }

    const quillsMesh = new THREE.InstancedMesh(quillGeo, quillMat, placements.length);
    quillsMesh.castShadow = true;
    const dummy = new THREE.Object3D();
    const upVec = new THREE.Vector3(0, 1, 0);
    const dirVec = new THREE.Vector3();
    const qTint = new THREE.Color();

    placements.forEach((p, idx) => {
      const px = mantleCenter.x + p.nx * mantleRadii.x * 0.96;
      const py = mantleCenter.y + p.ny * mantleRadii.y * 0.96;
      const pz = mantleCenter.z + p.nz * mantleRadii.z * 0.96;
      dummy.position.set(px, py, pz);

      const jx = (hashQ(idx * 5 + 2) - 0.5) * 0.18;
      const jy = (hashQ(idx * 5 + 3) - 0.5) * 0.16;
      const jz = (hashQ(idx * 5 + 4) - 0.5) * 0.14;
      dirVec
        .set(p.nx * 0.54 + jx, p.ny * 0.44 + 0.18 + jy, p.nz * 0.45 - 0.88 + jz)
        .normalize();

      dummy.quaternion.setFromUnitVectors(upVec, dirVec);
      const qLen = p.nz > 0.18 ? 0.68 + hashQ(idx * 7 + 5) * 0.18 : 0.92 + hashQ(idx * 7 + 5) * 0.26;
      const qThick = 0.88 + hashQ(idx * 7 + 6) * 0.24;
      dummy.scale.set(qThick, qLen, qThick);
      dummy.updateMatrix();
      quillsMesh.setMatrixAt(idx, dummy.matrix);

      const shade = 0.86 + hashQ(idx * 11 + 7) * 0.22;
      qTint.setRGB(shade, shade * 0.98, shade * 0.95).convertSRGBToLinear();
      quillsMesh.setColorAt(idx, qTint);
    });
    quillsMesh.instanceMatrix.needsUpdate = true;
    if (quillsMesh.instanceColor) quillsMesh.instanceColor.needsUpdate = true;
    this.pipGroup.add(quillsMesh);

    // Cute soft hedgehog tail tuft peeking cleanly beneath the lower rump quills
    const tail = new THREE.Mesh(new THREE.SphereGeometry(0.08, 10, 8), undercoatMat);
    tail.scale.set(0.9, 0.85, 1.3);
    tail.position.set(0, 0.28, -0.60);
    this.pipGroup.add(tail);

    // 3. Sculpted Expressive Hedgehog Head, Tapered Snout & Cupped Ears
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 0.84, 0.23);

    const cranium = new THREE.Mesh(new THREE.SphereGeometry(0.32, 22, 18), furMat);
    cranium.scale.set(1.04, 0.90, 0.98);
    cranium.castShadow = true;
    headGroup.add(cranium);

    // Soft puffy cheeks + warm rosy cheek blush
    [-0.19, 0.19].forEach((cx) => {
      const cheek = new THREE.Mesh(new THREE.SphereGeometry(0.145, 14, 12), cheekFurMat);
      cheek.scale.set(1.0, 0.88, 0.92);
      cheek.position.set(cx, -0.055, 0.14);
      headGroup.add(cheek);

      const blush = new THREE.Mesh(new THREE.SphereGeometry(0.068, 10, 8), blushMat);
      blush.scale.set(1.0, 0.65, 0.5);
      blush.position.set(cx * 1.12, -0.08, 0.235);
      headGroup.add(blush);
    });

    // Organic tapered hedgehog snout via LatheGeometry
    const snoutProfile = [
      new THREE.Vector2(0.22, 0.00),
      new THREE.Vector2(0.20, 0.08),
      new THREE.Vector2(0.15, 0.17),
      new THREE.Vector2(0.105, 0.25),
      new THREE.Vector2(0.065, 0.31),
      new THREE.Vector2(0.025, 0.35),
      new THREE.Vector2(0.00, 0.36)
    ];
    const snoutGeo = new THREE.LatheGeometry(snoutProfile, 18);
    const snout = new THREE.Mesh(snoutGeo, cheekFurMat);
    snout.rotation.x = Math.PI / 2 - 0.08;
    snout.position.set(0, -0.04, 0.15);
    snout.castShadow = true;
    headGroup.add(snout);

    // Glossy espresso button nose
    const nose = new THREE.Mesh(new THREE.SphereGeometry(0.058, 14, 12), noseEyeMat);
    nose.scale.set(1.15, 0.9, 1.0);
    nose.position.set(0, -0.015, 0.51);
    headGroup.add(nose);

    const noseGlint = new THREE.Mesh(new THREE.SphereGeometry(0.014, 6, 6), catchlightMat);
    noseGlint.position.set(0.016, 0.004, 0.555);
    headGroup.add(noseGlint);

    // Fine delicate cheek whiskers
    const whiskerMat = new THREE.MeshBasicMaterial({ color: 0x4A3321 });
    [-1, 1].forEach((side) => {
      [-0.04, 0.0, 0.04].forEach((wy, wi) => {
        const w = new THREE.Mesh(new THREE.CylinderGeometry(0.003, 0.0015, 0.15, 4), whiskerMat);
        w.rotation.z = side * (Math.PI / 2 - 0.18 + (wi - 1) * 0.16);
        w.rotation.y = side * -0.25;
        w.position.set(side * 0.135, -0.055 + wy * 0.6, 0.37);
        headGroup.add(w);
      });
    });

    // Earnest glossy eyes with crisp white catchlights & soft brow ridges
    [-1, 1].forEach((side) => {
      const eye = new THREE.Mesh(new THREE.SphereGeometry(0.058, 14, 12), noseEyeMat);
      eye.scale.set(0.95, 1.08, 0.85);
      eye.position.set(side * 0.145, 0.06, 0.275);
      headGroup.add(eye);

      const glint = new THREE.Mesh(new THREE.SphereGeometry(0.017, 8, 8), catchlightMat);
      glint.position.set(side * 0.155, 0.082, 0.322);
      headGroup.add(glint);

      const brow = new THREE.Mesh(new THREE.SphereGeometry(0.055, 10, 8), earOuterMat);
      brow.scale.set(1.3, 0.42, 0.6);
      brow.position.set(side * 0.145, 0.125, 0.265);
      brow.rotation.z = side * -0.14;
      headGroup.add(brow);
    });

    // Rounded cupped furry ears visible cleanly from behind AND in front
    [-1, 1].forEach((side) => {
      const earGroup = new THREE.Group();
      earGroup.position.set(side * 0.295, 0.135, 0.04);
      earGroup.rotation.z = side * -0.46;
      earGroup.rotation.y = side * 0.16;

      const earOuter = new THREE.Mesh(new THREE.SphereGeometry(0.118, 14, 12), earOuterMat);
      earOuter.scale.set(0.94, 1.12, 0.46);
      earOuter.castShadow = true;
      earGroup.add(earOuter);

      const earInner = new THREE.Mesh(new THREE.SphereGeometry(0.08, 12, 10), earInnerMat);
      earInner.scale.set(0.86, 1.0, 0.35);
      earInner.position.set(0, -0.005, 0.028);
      earGroup.add(earInner);

      headGroup.add(earGroup);
    });

    // 4. Tailored Storybook Woodland Beret (Sleek Crown + Leather Band + Brass Acorn Pin)
    const beretGroup = new THREE.Group();
    beretGroup.position.set(0, 0.25, -0.01);
    beretGroup.rotation.x = -0.12;
    beretGroup.rotation.z = -0.08;

    const beretProfile = [
      new THREE.Vector2(0.215, 0.00),
      new THREE.Vector2(0.240, 0.025),
      new THREE.Vector2(0.298, 0.078),
      new THREE.Vector2(0.285, 0.132),
      new THREE.Vector2(0.195, 0.172),
      new THREE.Vector2(0.080, 0.195),
      new THREE.Vector2(0.000, 0.200)
    ];
    const beretDome = new THREE.Mesh(new THREE.LatheGeometry(beretProfile, 22), beretMat);
    beretDome.castShadow = true;
    beretGroup.add(beretDome);

    const beretBand = new THREE.Mesh(new THREE.CylinderGeometry(0.232, 0.226, 0.042, 22), leatherMat);
    beretBand.position.y = 0.018;
    beretGroup.add(beretBand);

    // Soft curved front cap peak/visor
    const capPeak = new THREE.Mesh(
      new THREE.CylinderGeometry(0.23, 0.268, 0.022, 14, 1, false, -0.95, 1.9),
      beretMat
    );
    capPeak.position.set(0, 0.015, 0.045);
    capPeak.rotation.x = 0.22;
    beretGroup.add(capPeak);

    // Crown felt button stem + side brass acorn emblem
    const beretStem = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.022, 0.052, 8), beretMat);
    beretStem.position.y = 0.212;
    beretGroup.add(beretStem);

    const acornPin = new THREE.Mesh(new THREE.SphereGeometry(0.04, 10, 8), brassMat);
    acornPin.scale.set(0.85, 1.15, 0.65);
    acornPin.position.set(-0.245, 0.072, 0.055);
    beretGroup.add(acornPin);

    headGroup.add(beretGroup);
    this.pipGroup.add(headGroup);

    // 5. Rust-Ochre Knotted Neck Kerchief + Back Trailing Tails
    const neckWrap = new THREE.Mesh(new THREE.TorusGeometry(0.27, 0.052, 8, 18), scarfMat);
    neckWrap.rotation.x = Math.PI / 2 - 0.1;
    neckWrap.position.set(0, 0.67, 0.14);
    this.pipGroup.add(neckWrap);

    const scarfKnot = new THREE.Mesh(new THREE.SphereGeometry(0.068, 10, 8), scarfMat);
    scarfKnot.position.set(-0.13, 0.63, -0.09);
    this.pipGroup.add(scarfKnot);

    [-0.03, 0.04].forEach((offset, idx) => {
      const tailRibbon = new THREE.Mesh(new THREE.BoxGeometry(0.085, 0.25, 0.028), scarfMat);
      tailRibbon.position.set(-0.16 + offset, 0.52 - idx * 0.03, -0.17 - idx * 0.02);
      tailRibbon.rotation.x = 0.36 + idx * 0.12;
      tailRibbon.rotation.z = 0.18 - idx * 0.28;
      this.pipGroup.add(tailRibbon);
    });

    // 6. Stitched Leather Explorer Satchel & Rolled Parchment Scroll (Visible from Behind!)
    const strap = new THREE.Mesh(new THREE.TorusGeometry(0.46, 0.022, 6, 20), leatherMat);
    strap.scale.set(0.95, 1.02, 0.92);
    strap.rotation.y = Math.PI / 2;
    strap.rotation.x = 0.62;
    strap.position.set(-0.04, 0.56, 0.04);
    this.pipGroup.add(strap);

    const satchelGroup = new THREE.Group();
    satchelGroup.position.set(-0.46, 0.36, -0.12);
    satchelGroup.rotation.y = -1.25;
    satchelGroup.rotation.z = 0.14;

    const pouch = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.19, 0.095), leatherMat);
    pouch.castShadow = true;
    satchelGroup.add(pouch);

    const flap = new THREE.Mesh(new THREE.BoxGeometry(0.23, 0.095, 0.105), leatherMat);
    flap.position.set(0, 0.052, 0.005);
    satchelGroup.add(flap);

    const buckle = new THREE.Mesh(new THREE.BoxGeometry(0.042, 0.048, 0.02), brassMat);
    buckle.position.set(0, 0.012, 0.056);
    satchelGroup.add(buckle);

    const scrollRoll = new THREE.Mesh(new THREE.CylinderGeometry(0.032, 0.032, 0.25, 10), scrollMat);
    scrollRoll.rotation.z = 1.28;
    scrollRoll.position.set(0.03, 0.10, -0.02);
    satchelGroup.add(scrollRoll);

    const scrollTie = new THREE.Mesh(new THREE.CylinderGeometry(0.036, 0.036, 0.024, 10), scarfMat);
    scrollTie.rotation.z = 1.28;
    scrollTie.position.set(0.03, 0.10, -0.02);
    satchelGroup.add(scrollTie);

    this.pipGroup.add(satchelGroup);

    // 7. Sturdy Explorer Boots / Hind Paws (Grounded flush at y = 0.0)
    this.pipFeet = [-0.19, 0.19].map((fx) => {
      const footGroup = new THREE.Group();
      footGroup.position.set(fx, 0.075, 0.08);

      const footSole = new THREE.Mesh(new THREE.SphereGeometry(0.115, 12, 10), pawMat);
      footSole.scale.set(0.95, 0.65, 1.38);
      footSole.castShadow = true;
      footGroup.add(footSole);

      [-0.045, 0, 0.045].forEach((tx) => {
        const toe = new THREE.Mesh(new THREE.SphereGeometry(0.038, 8, 8), furMat);
        toe.position.set(tx, -0.015, 0.13);
        footGroup.add(toe);
      });

      this.pipGroup.add(footGroup);
      return footGroup;
    });

    // 8. Front Forearms & Carved Oak Walking Staff
    this.pipLeftArm = new THREE.Group();
    this.pipLeftArm.position.set(-0.37, 0.56, 0.16);
    const leftArmMesh = new THREE.Mesh(new THREE.SphereGeometry(0.095, 10, 8), furMat);
    leftArmMesh.scale.set(0.85, 1.35, 0.92);
    leftArmMesh.position.set(0, -0.10, 0.04);
    this.pipLeftArm.add(leftArmMesh);
    const leftPaw = new THREE.Mesh(new THREE.SphereGeometry(0.068, 10, 8), pawMat);
    leftPaw.position.set(0.02, -0.21, 0.07);
    this.pipLeftArm.add(leftPaw);
    this.pipGroup.add(this.pipLeftArm);

    this.pipRightArm = new THREE.Group();
    this.pipRightArm.position.set(0.39, 0.56, 0.16);
    const rightArmMesh = new THREE.Mesh(new THREE.SphereGeometry(0.095, 10, 8), furMat);
    rightArmMesh.scale.set(0.85, 1.35, 0.92);
    rightArmMesh.position.set(0, -0.10, 0.04);
    this.pipRightArm.add(rightArmMesh);
    const rightPaw = new THREE.Mesh(new THREE.SphereGeometry(0.068, 10, 8), pawMat);
    rightPaw.position.set(0.03, -0.19, 0.10);
    this.pipRightArm.add(rightPaw);

    const staffStick = new THREE.Mesh(new THREE.CylinderGeometry(0.024, 0.018, 1.12, 8), staffMat);
    staffStick.position.set(0.11, 0.03, 0.12);
    staffStick.rotation.x = 0.12;
    staffStick.rotation.z = -0.13;
    staffStick.castShadow = true;
    this.pipRightArm.add(staffStick);

    const staffKnob = new THREE.Mesh(new THREE.SphereGeometry(0.044, 10, 8), brassMat);
    staffKnob.scale.set(1.0, 1.25, 1.0);
    staffKnob.position.set(0.18, 0.58, 0.185);
    this.pipRightArm.add(staffKnob);

    this.pipGroup.add(this.pipRightArm);
    this.scene.add(this.pipGroup);
  },

  buildParticles() {
    const count = 160;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    this.particleVelocities = [];

    const cAutumn = new THREE.Color(0xE8822A);
    const cWinter = new THREE.Color(0xFFFFFF);
    const cSpring = new THREE.Color(0xF9C6D7);
    const cSummer = new THREE.Color(0xFFE566);

    for (let i = 0; i < count; i++) {
      const px = (Math.random() - 0.5) * 44;
      const pz = 54 - Math.random() * 112;
      const py = 1.2 + Math.random() * 9;
      positions[i * 3] = px;
      positions[i * 3 + 1] = py;
      positions[i * 3 + 2] = pz;

      const col = pz > 24 ? cAutumn : pz > 3 ? cWinter : pz > -25 ? cSpring : cSummer;
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;

      this.particleVelocities.push({
        vx: (Math.random() - 0.5) * 0.45,
        vy: -0.45 - Math.random() * 0.65,
        vz: (Math.random() - 0.5) * 0.35
      });
    }

    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    pGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    const pMat = new THREE.PointsMaterial({
      size: 0.28,
      vertexColors: true,
      transparent: true,
      opacity: 0.84
    });
    this.particles = new THREE.Points(pGeo, pMat);
    this.scene.add(this.particles);
  },

  // --------------------------------------------------------------------------
  // NAVIGATION & INTERACTION (PARENT CLICKS; PIP & CAMERA MOVE AUTOMATICALLY)
  // --------------------------------------------------------------------------
  walkToNode(nodeId, instant = false) {
    const idx = Math.max(0, this.nodesRef.findIndex((n) => n.id === nodeId));
    this.selectedNodeId = nodeId;
    this.targetT = this.nodesRef.length > 1 ? idx / (this.nodesRef.length - 1) : 0;
    if (instant || this.reducedMotion) {
      this.currentT = this.targetT;
    }
    this.syncLanternStates();
  },

  jumpToNode(nodeId) {
    this.dragOrbitYaw = 0;
    this.dragOrbitPitch = 0;
    this.walkToNode(nodeId, true);
    this.updateSceneFrame(1.0, 0);
  },

  attachEvents() {
    const dom = this.renderer.domElement;

    dom.addEventListener("pointerdown", (e) => {
      this.isDragging = true;
      this.dragMoved = false;
      this.lastPointerX = e.clientX;
      this.lastPointerY = e.clientY;
    });

    window.addEventListener("pointermove", (e) => {
      if (this.isDragging) {
        const dx = e.clientX - this.lastPointerX;
        const dy = e.clientY - this.lastPointerY;
        if (Math.hypot(dx, dy) > 4) this.dragMoved = true;
        this.dragOrbitYaw -= dx * 0.0065;
        this.dragOrbitPitch = Math.max(-0.14, Math.min(0.45, this.dragOrbitPitch + dy * 0.0035));
        this.lastPointerX = e.clientX;
        this.lastPointerY = e.clientY;
      } else if (this.container) {
        const rect = dom.getBoundingClientRect();
        if (e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom) {
          this.pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
          this.pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
          this.raycaster.setFromCamera(this.pointer, this.camera);
          const hits = this.raycaster.intersectObjects(this.lanterns.map((l) => l.hitMesh));
          this.hoveredNodeId = hits.length > 0 ? hits[0].object.userData.nodeId : null;
          dom.style.cursor = this.hoveredNodeId ? "pointer" : "grab";
        }
      }
    });

    window.addEventListener("pointerup", (e) => {
      if (!this.isDragging) return;
      this.isDragging = false;
      if (!this.dragMoved) {
        const rect = dom.getBoundingClientRect();
        this.pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        this.pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        this.raycaster.setFromCamera(this.pointer, this.camera);
        const hits = this.raycaster.intersectObjects(this.lanterns.map((l) => l.hitMesh));
        if (hits.length > 0) {
          const hitId = hits[0].object.userData.nodeId;
          if (hitId === this.selectedNodeId && this.onEnterNode) {
            this.onEnterNode(hitId);
          } else if (this.onSelectNode) {
            this.onSelectNode(hitId);
          }
        }
      }
    });

    window.addEventListener("resize", () => this.resize());
  },

  resize() {
    if (!this.renderer || !this.camera || !this.container) return;
    const w = Math.max(this.container.clientWidth || 960, 320);
    const h = Math.max(this.container.clientHeight || 540, 240);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h, false);
  },

  updateSeasonalAtmosphere(t) {
    let s0 = this.SEASONS[0];
    let s1 = this.SEASONS[this.SEASONS.length - 1];
    for (let i = 0; i < this.SEASONS.length - 1; i++) {
      if (t >= this.SEASONS[i].t && t <= this.SEASONS[i + 1].t) {
        s0 = this.SEASONS[i];
        s1 = this.SEASONS[i + 1];
        break;
      }
    }
    const span = Math.max(0.0001, s1.t - s0.t);
    const f = Math.max(0, Math.min(1, (t - s0.t) / span));

    if (this.skyUniforms) {
      this.skyUniforms.topColor.value.setHex(s0.skyTop).lerp(new THREE.Color(s1.skyTop), f);
      this.skyUniforms.horizonColor.value.setHex(s0.skyHorizon).lerp(new THREE.Color(s1.skyHorizon), f);
    }
    this.scene.fog.color.setHex(s0.fog).lerp(new THREE.Color(s1.fog), f);
    this.sunLight.color.setHex(s0.sun).lerp(new THREE.Color(s1.sun), f);
    this.hemiLight.color.setHex(s0.hemiSky).lerp(new THREE.Color(s1.hemiSky), f);
    this.hemiLight.groundColor.setHex(s0.hemiGround).lerp(new THREE.Color(s1.hemiGround), f);
  },

  updateSceneFrame(dt, elapsed) {
    if (!this.curve || !this.pipGroup || !this.camera) return;

    const diff = this.targetT - this.currentT;
    const walking = Math.abs(diff) > 0.0012;
    if (walking) {
      const step = Math.sign(diff) * Math.min(Math.abs(diff), dt * 0.14);
      this.currentT += step;
    } else {
      this.currentT = this.targetT;
    }

    const pt = this.curve.getPointAt(this.currentT);
    const tan = this.curve.getTangentAt(this.currentT);
    const groundY = Math.max(this.terrainHeight(pt.x, pt.z), this.getPathSurfaceY(pt.z), pt.y);
    const bob = walking ? Math.abs(Math.sin(elapsed * 12)) * 0.14 : Math.sin(elapsed * 2.2) * 0.03;

    this.pipGroup.position.set(pt.x, groundY + 0.05 + bob, pt.z);
    const dirSign = diff < -0.001 ? -1 : 1;
    const targetYaw = Math.atan2(tan.x * dirSign, tan.z * dirSign);
    this.pipGroup.rotation.y += (targetYaw - this.pipGroup.rotation.y) * Math.min(1, dt * 8);

    if (this.pipFeet.length === 2) {
      const swing = walking ? Math.sin(elapsed * 14) * 0.16 : 0;
      this.pipFeet[0].position.z = 0.08 + swing;
      this.pipFeet[1].position.z = 0.08 - swing;
    }
    if (this.pipRightArm) {
      this.pipRightArm.rotation.x = walking ? Math.sin(elapsed * 14) * 0.18 : 0;
    }
    if (this.pipLeftArm) {
      this.pipLeftArm.rotation.x = walking ? -Math.sin(elapsed * 14) * 0.14 : 0;
    }

    // Full 360° camera orbit around Pip so parents can turn completely around and click behind
    const camAngle = Math.atan2(-tan.x, -tan.z) + 0.45 + this.dragOrbitYaw;
    const dist = 8.4;
    const camHeight = 3.85 + this.dragOrbitPitch * 4.5;
    const camDirX = Math.sin(camAngle);
    const camDirZ = Math.cos(camAngle);
    const desiredCamPos = new THREE.Vector3(
      pt.x + camDirX * dist,
      groundY + camHeight,
      pt.z + camDirZ * dist
    );
    this.camera.position.lerp(desiredCamPos, Math.min(1, dt * 7.5));

    const lookTarget = new THREE.Vector3(
      pt.x - camDirX * 4.2,
      groundY + 1.25 - this.dragOrbitPitch * 1.4,
      pt.z - camDirZ * 4.2
    );
    this.camera.lookAt(lookTarget);

    if (this.skyDome) {
      this.skyDome.position.copy(this.camera.position);
    }

    this.sunLight.position.set(pt.x + 28, groundY + 22, pt.z + 16);
    this.sunLight.target.position.copy(pt);
    this.sunLight.target.updateMatrixWorld();

    this.updateSeasonalAtmosphere(this.currentT);

    // Near/mid lanterns display crisp numbered medallions; far lanterns keep glowing beacon halos
    // so every interactive stop all the way down the valley stands out cleanly to hover or click!
    this.lanterns.forEach((l) => {
      const d = this.camera.position.distanceTo(l.group.position);
      const isSelected = l.node.id === this.selectedNodeId;
      const isHovered = l.node.id === this.hoveredNodeId;
      if (l.badgeMat) {
        const alpha = isSelected || isHovered ? 1.0 : d < 46 ? 0.96 : Math.max(0, 1 - (d - 46) / 18);
        l.badgeMat.opacity = alpha;
        l.badgeSprite.visible = alpha > 0.05;
      }
      if (l.beaconSprite && l.beaconMat) {
        const beaconScale = d > 40 ? Math.min(2.8, 1.45 + (d - 40) * 0.025) : 1.45;
        const pulse = isSelected ? 1.18 + Math.sin(elapsed * 3.5) * 0.12 : 1.0;
        l.beaconSprite.scale.set(beaconScale * pulse, beaconScale * pulse, 1);
        l.beaconMat.opacity = isSelected ? 0.98 : d > 40 ? 0.92 : 0.72;
      }
    });

    if (!this.reducedMotion) {
      if (this.textures.water) {
        this.textures.water.offset.x = elapsed * 0.05;
      }

      this.clouds.forEach((cg) => {
        cg.position.x = cg.userData.baseX + Math.sin(elapsed * 0.04 + cg.userData.phase) * 4.5;
      });

      if (this.particles) {
        const pArr = this.particles.geometry.attributes.position.array;
        for (let i = 0; i < this.particleVelocities.length; i++) {
          const v = this.particleVelocities[i];
          pArr[i * 3] += v.vx * dt;
          pArr[i * 3 + 1] += v.vy * dt;
          pArr[i * 3 + 2] += v.vz * dt;
          if (pArr[i * 3 + 1] < 0.2) pArr[i * 3 + 1] = 8.5 + Math.random() * 2;
        }
        this.particles.geometry.attributes.position.needsUpdate = true;
      }

      this.butterflies.forEach((bf) => {
        const u = bf.userData;
        const a = elapsed * 1.1 + u.phase;
        bf.position.set(
          u.cx + Math.cos(a) * 1.4,
          1.4 + Math.sin(a * 2.1) * 0.45,
          u.cz + Math.sin(a) * 1.4
        );
        bf.rotation.y = -a;
        const flap = Math.sin(elapsed * 14 + u.phase) * 0.65;
        u.leftWing.rotation.y = flap;
        u.rightWing.rotation.y = -flap;
      });

      this.smokePuffs.forEach((p) => {
        const u = p.userData;
        const cycle = (elapsed * 0.25 + u.phase) % 1;
        p.position.set(
          u.baseX + Math.sin(cycle * 5) * 0.25,
          u.baseY + cycle * 3.8,
          u.baseZ + cycle * 0.6
        );
        p.scale.setScalar(0.7 + cycle * 1.4);
        p.material.opacity = (1 - cycle) * 0.5;
      });

      if (this.haloRing) {
        const s = 1 + Math.sin(elapsed * 3.2) * 0.08;
        this.haloRing.scale.set(s, s, 1);
      }
    }

    this.renderer.render(this.scene, this.camera);
    this.camera.updateMatrixWorld();
    this.updateProjectedMarker();
  },

  updateProjectedMarker() {
    const marker = document.getElementById("garden-3d-marker");
    if (!marker || !this.camera || !this.container) return;
    const focusId = this.hoveredNodeId || this.selectedNodeId;
    const lantern = this.lanterns.find((l) => l.node.id === focusId);
    if (!lantern) {
      marker.classList.add("hidden");
      return;
    }

    const v = lantern.worldPos.clone().project(this.camera);
    if (v.z > 1 || v.z < -1 || Math.abs(v.x) > 1.05 || Math.abs(v.y) > 1.15) {
      marker.classList.add("hidden");
      return;
    }

    const x = (v.x * 0.5 + 0.5) * this.container.clientWidth;
    const y = (-v.y * 0.5 + 0.5) * this.container.clientHeight;
    marker.classList.remove("hidden");
    marker.style.left = `${x.toFixed(1)}px`;
    marker.style.top = `${y.toFixed(1)}px`;
    const prog = this.progressGetter(lantern.node.id);
    marker.querySelector(".marker-unit").textContent = lantern.node.unitTag + (prog.mastered ? " · Complete" : "");
    marker.querySelector(".marker-title").textContent = lantern.node.title;
  },

  startLoop() {
    if (this.rafId) return;
    const tick = () => {
      this.rafId = requestAnimationFrame(tick);
      if (!this.container || !this.container.offsetParent) return;
      const dt = Math.min(0.05, this.clock.getDelta());
      const elapsed = this.clock.elapsedTime;
      this.updateSceneFrame(dt, elapsed);
    };
    this.rafId = requestAnimationFrame(tick);
  }
};

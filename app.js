// ============================================================================
// THE YOUNG KNIGHT'S QUEST — SINGLE-PAGE GAME CONTROLLER & MERLIN VOICE ENGINE
// ============================================================================

const STORAGE_KEY = "young_knights_quest_v2";

const App = {
  state: {
    selectedNodeId: 1,
    squireNodeId: 1,
    currentView: "map",      // "map" | "studio" | "tabletop"
    studioMode: "learn",     // "learn" | "trial"
    learnStepIndex: 0,
    soundEnabled: true,
    nodeProgress: {}         // { [id]: { shields: 0, tier: 1, mastered: false } }
  },

  currentProblem: null,
  visualHintVisible: true,
  recentProblemKeys: [],
  lastProblemAnswer: null,
  recentVoiceKeys: [],
  recentVoiceTexts: [],
  tabletopTool: "bonds10",
  tabletopMode: "explore",   // "explore" | "quiz"
  tabletopQuizStreak: 0,
  tabletopQuizProblem: null,
  tabletopState: {
    // Station 1: Bonds & Frames to 10 (Units 1–4)
    b10Sub: "bond",          // "bond" | "path" | "crossout"
    nbPartA: 6,
    nbPartB: 4,
    nbMissing: "none",       // "none" | "whole" | "partB"
    pathStart: 6,
    pathJump: 3,
    subWhole: 9,
    subTake: 4,
    // Station 2: Make-10 & Subtract-from-10 Bridge (Units 5–7)
    m10Sub: "maketen",       // "maketen" | "subten" | "teen"
    tfA: 8,
    tfB: 5,
    subTeen: 14,
    subNineEight: 8,
    teenOnes: 6,
    // Station 3: Shapes, Ordinals & Length (Units 8–10)
    shSub: "shapes",         // "shapes" | "ordinals" | "length"
    shapeKey: "hexagon",
    ordTotal: 6,
    ordDir: "left",
    ordTarget: 3,
    lenA: 8,
    lenB: 5,
    // Station 4: Bar Models & Comparison (Units 11, 13, 17)
    bmSub: "part-whole",     // "part-whole" | "comparison" | "rows"
    bmA: 18,
    bmB: 12,
    bmMissing: "none",       // "none" | "whole" | "partB"
    rowTop: 9,
    rowBot: 5,
    // Station 5: Tens, Ones & Regrouping to 100 (Units 12, 13, 16, 17)
    pvSub: "tensones",       // "tensones" | "regroup" | "add2digit"
    pvTens: 3,
    pvOnes: 6,
    regA: 28,
    regB: 6,
    add2TensA: 4,
    add2OnesA: 2,
    add2TensB: 2,
    add2OnesB: 5,
    // Station 6: Equal Groups, Sharing & Fractions (Units 14–15)
    gfSub: "groups",         // "groups" | "fractions"
    grpCount: 3,
    grpPer: 4,
    fracParts: 4,
    fracShaded: 3,
    fracShape: "circle",
    // Station 7: Watchtower Clock & Royal Coin Purse (Units 18–19)
    ccSub: "clock",          // "clock" | "coins"
    clkHour: 3,
    clkMin: 30,
    coinQ: 1,
    coinD: 2,
    coinN: 1,
    coinP: 2,
    hideAnswer: false
  },

  init() {
    this.loadState();
    this.mountStaticIcons();
    this.initDOMListeners();
    this.switchView("map", false);
    this.updateHeaderStatus();
    this.registerServiceWorker();
  },

  registerServiceWorker() {
    try {
      if (typeof navigator !== "undefined" && "serviceWorker" in navigator && window.location && window.location.protocol.startsWith("http")) {
        navigator.serviceWorker.register("./sw.js").catch(() => {});
      }
    } catch (e) {}
  },

  openModal(modalId) {
    const el = document.getElementById(modalId);
    if (!el) return;
    el.classList.remove("hidden");
    if (typeof el.showModal === "function") {
      try {
        if (!el.open) el.showModal();
      } catch (e) {}
    }
  },

  closeModal(modalId) {
    const el = document.getElementById(modalId);
    if (!el) return;
    el.classList.add("hidden");
    if (typeof el.close === "function") {
      try {
        if (el.open) el.close();
      } catch (e) {}
    }
  },

  loadState() {
    CURRICULUM_NODES.forEach(node => {
      this.state.nodeProgress[node.id] = { shields: 0, tier: 1, mastered: false, stars: 0 };
    });

    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        this.state = { ...this.state, ...parsed };
        CURRICULUM_NODES.forEach(node => {
          if (!this.state.nodeProgress[node.id]) {
            this.state.nodeProgress[node.id] = { shields: 0, tier: 1, mastered: false, stars: 0 };
          } else if (typeof this.state.nodeProgress[node.id].stars !== "number") {
            this.state.nodeProgress[node.id].stars = this.state.nodeProgress[node.id].mastered ? 1 : 0;
          }
        });
      }
    } catch (e) {
      console.warn("Could not read saved state:", e);
    }
  },

  saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.warn("Could not save state:", e);
    }
    this.updateHeaderStatus();
  },

  getNode(id) {
    return CURRICULUM_NODES.find(n => n.id === Number(id)) || CURRICULUM_NODES[0];
  },

  getProgress(id) {
    return this.state.nodeProgress[id] || { shields: 0, tier: 1, mastered: false };
  },

  // --------------------------------------------------------------------------
  // MOUNT ALL STATIC CUSTOM SVG ICONS (Zero Emojis)
  // --------------------------------------------------------------------------
  mountStaticIcons() {
    const setIcon = (id, key, size) => {
      const el = document.getElementById(id);
      if (el) el.innerHTML = Visuals.getIconSVG(key, size);
    };
    setIcon("header-crest-icon", "crest", 32);
    setIcon("icon-map", "map", 20);
    setIcon("icon-abacus", "abacus", 20);
    setIcon("icon-crown", "crown", 20);
    setIcon("icon-reset", "reset", 20);
    setIcon("icon-reset-level", "reset", 16);
    setIcon("icon-scroll", "scroll", 20);
    setIcon("icon-replay-voice", "speakerOn", 18);
    const merlinEl = document.getElementById("merlin-portrait-holder");
    if (merlinEl) merlinEl.innerHTML = Visuals.getMerlinPortraitSVG();
    const squireEl = document.getElementById("squire-svg-holder");
    if (squireEl) squireEl.innerHTML = Visuals.getSquireSVG();
    const sealEl = document.getElementById("victory-seal-svg");
    if (sealEl) sealEl.innerHTML = Visuals.getIconSVG("seal", 76);
  },

  // --------------------------------------------------------------------------
  // MASTER ALDOUS STATIC AUDIO VOICE PLAYER (Plays ./audio/*.wav)
  // Uses Web Audio API AudioBuffer cache when available, with HTMLAudio fallback
  // --------------------------------------------------------------------------
  audioBufferCache: {},
  currentBufferSource: null,
  lastProblemVoiceKey: null,
  lastProblemVoiceFallback: null,
  voiceSpeakingTimer: null,

  setAldousSpeaking(isSpeaking) {
    if (this.voiceSpeakingTimer) {
      clearTimeout(this.voiceSpeakingTimer);
      this.voiceSpeakingTimer = null;
    }
    const banner = document.getElementById("merlin-banner");
    if (banner) banner.classList.toggle("speaking", !!isSpeaking);
    if (isSpeaking) {
      this.voiceSpeakingTimer = setTimeout(() => {
        const b = document.getElementById("merlin-banner");
        if (b) b.classList.remove("speaking");
        this.voiceSpeakingTimer = null;
      }, 4200);
    }
  },

  stopCurrentAudio() {
    this.setAldousSpeaking(false);
    try {
      if (this.currentBufferSource) {
        this.currentBufferSource.stop();
        this.currentBufferSource.disconnect();
        this.currentBufferSource = null;
      }
    } catch (e) {}
    try {
      if (this.currentAudio) {
        this.currentAudio.pause();
        this.currentAudio.currentTime = 0;
      }
    } catch (e) {}
  },

  playVoiceClip(clipKey, fallbackKey = null) {
    if (this.state.studioMode === "trial") {
      this.lastProblemVoiceKey = clipKey;
      this.lastProblemVoiceFallback = fallbackKey;
    }
    if (!this.state.soundEnabled) return;
    this.stopCurrentAudio();
    this.setAldousSpeaking(true);

    const playWithAudioElement = (keyToPlay, fbKey) => {
      try {
        const audio = new Audio(`audio/${keyToPlay}.wav`);
        audio.volume = 0.95;
        audio.addEventListener("ended", () => this.setAldousSpeaking(false), { once: true });
        if (fbKey) {
          audio.addEventListener("error", () => {
            const fb = new Audio(`audio/${fbKey}.wav`);
            fb.volume = 0.95;
            fb.addEventListener("ended", () => this.setAldousSpeaking(false), { once: true });
            this.currentAudio = fb;
            fb.play().catch(() => this.setAldousSpeaking(false));
          }, { once: true });
        }
        this.currentAudio = audio;
        audio.play().catch(() => this.setAldousSpeaking(false));
      } catch (e) {
        this.setAldousSpeaking(false);
      }
    };

    try {
      const Ctx = (typeof window !== "undefined") && (window.AudioContext || window.webkitAudioContext);
      const canFetch = (typeof fetch === "function") && (typeof window !== "undefined") && window.location && window.location.protocol.startsWith("http");
      if (!Ctx || !canFetch) {
        playWithAudioElement(clipKey, fallbackKey);
        return;
      }
      if (!this.audioCtx) this.audioCtx = new Ctx();
      const ctx = this.audioCtx;
      if (ctx.state === "suspended") ctx.resume().catch(() => {});

      const playDecodedBuffer = (buf) => {
        if (!this.state.soundEnabled) return;
        this.stopCurrentAudio();
        this.setAldousSpeaking(true);
        const source = ctx.createBufferSource();
        const gainNode = ctx.createGain();
        gainNode.gain.value = 0.95;
        source.buffer = buf;
        source.connect(gainNode);
        gainNode.connect(ctx.destination);
        source.onended = () => this.setAldousSpeaking(false);
        this.currentBufferSource = source;
        source.start(0);
      };

      if (this.audioBufferCache[clipKey]) {
        playDecodedBuffer(this.audioBufferCache[clipKey]);
        return;
      }

      fetch(`audio/${clipKey}.wav`)
        .then(res => {
          if (!res.ok) throw new Error("Missing audio clip");
          return res.arrayBuffer();
        })
        .then(arr => ctx.decodeAudioData(arr))
        .then(decoded => {
          this.audioBufferCache[clipKey] = decoded;
          playDecodedBuffer(decoded);
        })
        .catch(() => {
          if (fallbackKey && fallbackKey !== clipKey) {
            playWithAudioElement(fallbackKey, null);
          } else {
            playWithAudioElement(clipKey, fallbackKey);
          }
        });
    } catch (e) {
      playWithAudioElement(clipKey, fallbackKey);
    }
  },

  replayCurrentVoice() {
    if (!this.state.soundEnabled) {
      this.state.soundEnabled = true;
      this.saveState();
      this.updateHeaderStatus();
    }

    if (this.state.studioMode === "trial" && this.lastProblemVoiceKey) {
      this.playVoiceClip(this.lastProblemVoiceKey, this.lastProblemVoiceFallback);
      return;
    }

    const node = this.getNode(this.state.selectedNodeId);
    let specType = null;
    if (this.state.studioMode === "learn" && node && node.learnSteps) {
      const step = node.learnSteps[Math.max(0, Math.min(node.learnSteps.length - 1, this.state.learnStepIndex))];
      specType = step && step.visualSpec && step.visualSpec.type;
    } else if (this.currentProblem && this.currentProblem.visualSpec) {
      specType = this.currentProblem.visualSpec.type;
    }

    const topicCoach = specType && MASTER_ALDOUS_VOICES && MASTER_ALDOUS_VOICES.topicCoach && MASTER_ALDOUS_VOICES.topicCoach[specType];
    if (topicCoach) {
      this.playVoiceClip(topicCoach.key, topicCoach.fallback);
    } else {
      this.playVoiceClip("encourage_0");
    }
  },

  playTone(freqs, type = "triangle", duration = 0.22, stagger = 0.08) {
    if (!this.state.soundEnabled) return;
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!this.audioCtx) this.audioCtx = new Ctx();
      const ctx = this.audioCtx;
      if (ctx.state === "suspended") ctx.resume();

      freqs.forEach((f, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = type;
        osc.frequency.value = f;

        const start = ctx.currentTime + idx * stagger;
        gain.gain.setValueAtTime(0.001, start);
        gain.gain.linearRampToValueAtTime(0.11, start + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0008, start + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(start);
        osc.stop(start + duration + 0.02);
      });
    } catch (e) {}
  },

  playSuccessChime() {
    this.playTone([523.25, 659.25, 783.99], "triangle", 0.28, 0.07);
  },

  playLevelUpFanfare() {
    this.playTone([392.0, 523.25, 659.25, 783.99, 1046.5], "triangle", 0.42, 0.09);
  },

  playGentlePrompt() {
    this.playTone([349.23, 329.63], "sine", 0.25, 0.1);
  },

  // --------------------------------------------------------------------------
  // HEADER & RANK STATUS
  // --------------------------------------------------------------------------
  updateHeaderStatus() {
    const masteredCount = Object.values(this.state.nodeProgress).filter(p => p.mastered).length;
    document.getElementById("mastered-count").textContent = masteredCount;

    let currentRank = SQUIRE_RANKS[0];
    for (const r of SQUIRE_RANKS) {
      if (masteredCount >= r.minSeals) currentRank = r;
    }
    document.getElementById("squire-rank-title").textContent = currentRank.title;
    document.getElementById("squire-rank-icon").innerHTML = Visuals.getIconSVG(currentRank.iconKey, 24);
    document.getElementById("icon-speaker").innerHTML = Visuals.getIconSVG(
      this.state.soundEnabled ? "speakerOn" : "speakerOff",
      20
    );
  },

  // --------------------------------------------------------------------------
  // VIEW 1: KINGDOM OVERWORLD MAP
  // --------------------------------------------------------------------------
  getNodeIconSVG(node, size = 30) {
    if (!node) return "";
    const prog = this.getProgress(node.id);
    if (node.isBoss && node.missionType && node.missionType.startsWith("boss-")) {
      const bossKey = node.missionType.replace("boss-", "");
      return Visuals.getBossSVG(bossKey, prog.mastered, size);
    }
    return Visuals.getIconSVG(node.iconKey, size);
  },

  renderMapAll() {
    const svgContainer = document.getElementById("svg-map-container");
    svgContainer.innerHTML = Visuals.renderKingdomMapSVG(CURRICULUM_NODES);

    const overlay = document.getElementById("map-nodes-overlay");
    overlay.innerHTML = "";

    const nextQuestNode = CURRICULUM_NODES.find(n => !this.getProgress(n.id).mastered);
    const nextQuestId = nextQuestNode ? nextQuestNode.id : null;

    CURRICULUM_NODES.forEach(node => {
      const prog = this.getProgress(node.id);
      const pin = document.createElement("div");
      pin.className = `map-node-pin act-${node.act || 1}`;
      pin.setAttribute("role", "button");
      pin.setAttribute("tabindex", "0");
      pin.setAttribute("aria-label", `Mission ${node.id}: ${node.title}${prog.mastered ? " (Mastered)" : node.id === nextQuestId ? " (Next Quest)" : ""}`);
      if (node.isBoss) pin.classList.add("boss-node");
      if (node.id === this.state.selectedNodeId) pin.classList.add("selected");
      if (prog.mastered) {
        pin.classList.add("mastered");
      } else if (node.id === nextQuestId) {
        pin.classList.add("next-quest");
      } else {
        pin.classList.add("upcoming");
      }
      if (node.mapPos.y >= 65) pin.classList.add("label-above");

      pin.style.left = `${node.mapPos.x}%`;
      pin.style.top = `${node.mapPos.y}%`;

      const pinGraphic = this.getNodeIconSVG(node, node.isBoss ? 30 : 26);

      pin.innerHTML = `
        <div class="node-medallion">
          <span class="node-num-badge">${node.id}</span>
          <div style="width:32px;height:32px;display:flex;align-items:center;justify-content:center;">${pinGraphic}</div>
          ${prog.mastered ? `<span class="node-seal-crown">${Visuals.getIconSVG("seal", 22)}</span>` : ""}
        </div>
        <div class="node-label-plate">${node.id}. ${node.title}</div>
      `;

      const activatePin = () => {
        if (this.state.selectedNodeId === node.id) {
          this.zoomIntoStronghold(node.id);
        } else {
          this.selectMapNode(node.id);
        }
      };

      pin.addEventListener("click", activatePin);
      pin.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          activatePin();
        }
      });

      overlay.appendChild(pin);
    });

    this.positionSquireToken(this.state.squireNodeId, false);
    this.updateMapBottomDock();
  },

  selectMapNode(nodeId) {
    this.state.selectedNodeId = nodeId;
    this.playTone([440, 554.37], "sine", 0.14, 0.04);
    this.positionSquireToken(nodeId, true);
    this.state.squireNodeId = nodeId;
    this.saveState();
    this.renderMapAll();
  },

  positionSquireToken(nodeId, animate = true) {
    const node = this.getNode(nodeId);
    const token = document.getElementById("squire-map-token");
    if (!token || !node) return;

    if (animate) {
      token.classList.add("marching");
      setTimeout(() => token.classList.remove("marching"), 1300);
    }
    token.style.left = `${node.mapPos.x}%`;
    token.style.top = `${node.mapPos.y}%`;
  },

  updateMapBottomDock() {
    const node = this.getNode(this.state.selectedNodeId);
    const prog = this.getProgress(node.id);
    const actLabels = {
      1: "Act I · Forest of Ten",
      2: "Act II · River of Twenty",
      3: "Act III · Highland Strongholds",
      4: "Act IV · Citadel to 100"
    };
    const actTagEl = document.getElementById("dock-act-tag");
    if (actTagEl) {
      const actNum = node.act || 1;
      const gradeSuffix = node.gradeTag ? ` · ${node.gradeTag}` : "";
      actTagEl.textContent = `${actLabels[actNum] || actLabels[1]}${gradeSuffix}`;
      actTagEl.className = `dock-act-tag act-${actNum}`;
    }
    document.getElementById("dock-node-icon").innerHTML = this.getNodeIconSVG(node, 36);
    document.getElementById("dock-node-title").textContent = `${node.id}. ${node.title}`;
    document.getElementById("dock-node-desc").textContent = node.shortDesc;
    const enterBtnSpan = document.getElementById("btn-enter-node-label");
    if (enterBtnSpan) {
      enterBtnSpan.textContent = prog.mastered ? "Replay Level →" : (node.isBoss ? "Enter Boss Trial →" : "Start Level →");
    }
  },

  zoomIntoStronghold(nodeId) {
    this.state.selectedNodeId = nodeId;
    this.state.squireNodeId = nodeId;
    const node = this.getNode(nodeId);
    const zoomLayer = document.getElementById("map-zoom-layer");

    this.playTone([392, 523.25, 659.25], "triangle", 0.25, 0.06);

    const tx = (50 - node.mapPos.x) * 1.4;
    const ty = (50 - node.mapPos.y) * 1.4;
    zoomLayer.style.transform = `scale(2.35) translate(${tx}%, ${ty}%)`;
    zoomLayer.classList.add("zooming-into-node");

    setTimeout(() => {
      this.switchView("studio");
      this.openNodeInStudio(nodeId);
      zoomLayer.style.transition = "none";
      zoomLayer.style.transform = "scale(1) translate(0, 0)";
      zoomLayer.classList.remove("zooming-into-node");
      setTimeout(() => {
        zoomLayer.style.transition = "";
      }, 50);
    }, 550);
  },

  zoomOutAndMarchToNext() {
    const completedId = this.state.selectedNodeId;
    const nextId = Math.min(CURRICULUM_NODES.length, completedId + 1);
    const completedNode = this.getNode(completedId);

    this.closeModal("victory-modal");

    const zoomLayer = document.getElementById("map-zoom-layer");
    const tx = (50 - completedNode.mapPos.x) * 1.3;
    const ty = (50 - completedNode.mapPos.y) * 1.3;

    zoomLayer.style.transition = "none";
    zoomLayer.style.transform = `scale(2.2) translate(${tx}%, ${ty}%)`;
    this.switchView("map", false);
    this.renderMapAll();
    this.positionSquireToken(completedId, false);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        zoomLayer.style.transition = "transform 0.85s cubic-bezier(0.22, 1, 0.36, 1)";
        zoomLayer.style.transform = "scale(1) translate(0, 0)";

        setTimeout(() => {
          this.state.selectedNodeId = nextId;
          this.state.squireNodeId = nextId;
          this.saveState();
          this.renderMapAll();
          this.positionSquireToken(completedId, false);

          requestAnimationFrame(() => {
            this.playLevelUpFanfare();
            this.positionSquireToken(nextId, true);
          });
        }, 700);
      });
    });
  },

  switchView(viewName, useTransition = true) {
    const applySwitch = () => {
      this.state.currentView = viewName;
      document.getElementById("map-screen").classList.toggle("active", viewName === "map");
      document.getElementById("studio-screen").classList.toggle("active", viewName === "studio");
      document.getElementById("tabletop-screen").classList.toggle("active", viewName === "tabletop");

      // Context-aware top bar buttons:
      // - On Home Map ("map"): show Math Blocks & Mission Control; hide "← Kingdom Map"
      // - In Level ("studio") / Math Blocks ("tabletop"): show "← Kingdom Map"; hide Math Blocks & Mission Control
      const mapBtn = document.getElementById("btn-map-view");
      const tabletopBtn = document.getElementById("btn-tabletop");
      const placementBtn = document.getElementById("btn-placement");

      if (mapBtn) mapBtn.classList.toggle("hidden", viewName === "map");
      if (tabletopBtn) tabletopBtn.classList.toggle("hidden", viewName !== "map");
      if (placementBtn) placementBtn.classList.toggle("hidden", viewName !== "map");

      if (viewName === "map") {
        this.renderMapAll();
      } else if (viewName === "tabletop") {
        this.renderTabletop();
      }
    };

    if (useTransition && typeof document !== "undefined" && typeof document.startViewTransition === "function") {
      try {
        document.startViewTransition(() => applySwitch());
        return;
      } catch (e) {}
    }
    applySwitch();
  },

  // --------------------------------------------------------------------------
  // VIEW 2: SINGLE-PAGE LEVEL WORKSPACE
  // --------------------------------------------------------------------------
  openNodeInStudio(nodeId) {
    const node = this.getNode(nodeId);
    const prog = this.getProgress(nodeId);
    prog.stars = prog.stars || (prog.mastered ? 1 : 0);

    const studioScreen = document.getElementById("studio-screen");
    if (studioScreen) studioScreen.classList.toggle("boss-encounter", !!node.isBoss);

    document.getElementById("studio-node-name").textContent = `${node.id}. ${node.title}`;
    const chTagEl = document.getElementById("studio-chapter-tag");
    if (chTagEl) {
      chTagEl.textContent = node.isBoss
        ? `Royal Boss Trial · ${node.gradeTag || ""}`
        : (node.gradeTag || "");
    }

    // Populate Right-Hand Parent Sidebar
    document.getElementById("pg-level-title").textContent = `${node.id}. ${node.title} (${node.gradeTag})`;
    document.getElementById("teacher-wonder-text").textContent = node.teacherGuide.wonder;
    document.getElementById("teacher-script-text").textContent = node.teacherGuide.script;
    document.getElementById("teacher-heuristic-text").textContent = node.teacherGuide.heuristic;
    document.getElementById("teacher-hands-on-text").textContent = node.teacherGuide.handsOn;

    this.state.learnStepIndex = 0;
    this.completedLearnSteps = {};
    this.renderShieldsProgress();
    this.updateTierPips();

    // Open Lesson if brand new, or Play if already started
    this.setStudioMode(prog.shields > 0 ? "trial" : "learn");
  },

  toggleParentSidebar(forceOpen = null) {
    const sidebar = document.getElementById("parent-guide-modal");
    const studioScreen = document.getElementById("studio-screen");
    const openBtn = document.getElementById("btn-open-parent-guide");
    if (!sidebar || !studioScreen) return;

    const currentlyCollapsed = sidebar.classList.contains("collapsed") || sidebar.classList.contains("hidden");
    const shouldOpen = forceOpen !== null ? forceOpen : currentlyCollapsed;

    sidebar.classList.toggle("collapsed", !shouldOpen);
    sidebar.classList.toggle("hidden", !shouldOpen);
    studioScreen.classList.toggle("parent-sidebar-open", shouldOpen);
    if (openBtn) {
      openBtn.classList.toggle("active-sidebar", shouldOpen);
    }
    this.updateLiveParentCoach();
  },

  updateLiveParentCoach() {
    const badgeEl = document.getElementById("pg-live-badge");
    const textEl = document.getElementById("pg-live-coach-text");
    if (!badgeEl || !textEl) return;

    const node = this.getNode(this.state.selectedNodeId);
    const prog = this.getProgress(node.id);

    if (this.state.studioMode === "learn") {
      const steps = node.learnSteps;
      const idx = Math.max(0, Math.min(steps.length - 1, this.state.learnStepIndex));
      const step = steps[idx];
      badgeEl.textContent = step.stepTag || `Lesson Step ${idx + 1} of ${steps.length}`;
      if (step.checkQuestion) {
        textEl.textContent = `Interactive Check: Ask your child "${step.checkQuestion.prompt}" (Answer: ${step.checkQuestion.answer}). ${step.checkQuestion.coachText}`;
      } else {
        textEl.textContent = `Read aloud with your child: "${step.narrative}" Point to the diagram together before clicking Next.`;
      }
    } else if (this.currentProblem) {
      const tierLabels = { 1: "Tier 1 · Concrete/Pictorial", 2: "Tier 2 · Stepping Up", 3: "Tier 3 · Mental Math" };
      badgeEl.textContent = `${tierLabels[prog.tier] || "Play Mode"} · Strike ${prog.shields + 1} of 5`;
      textEl.textContent = `Current Problem Coaching: ${this.currentProblem.whyText} (Answer: ${this.currentProblem.answer})`;
    }
  },

  renderShieldsProgress() {
    const node = this.getNode(this.state.selectedNodeId);
    const prog = this.getProgress(node.id);
    const row = document.getElementById("shields-row");
    const starsCount = Math.min(3, prog.stars || (prog.mastered ? 1 : 0));
    let starsHTML = `<div class="stars-crest-strip" title="Unit Mastery Stars (${starsCount}/3 Quests Completed)">`;
    for (let s = 1; s <= 3; s++) {
      starsHTML += `<span style="display:inline-flex;width:18px;height:18px;">${Visuals.getIconSVG(s <= starsCount ? "star" : "starEmpty", 18)}</span>`;
    }
    starsHTML += `</div>`;

    row.innerHTML = `
      <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
        ${Visuals.renderMissionEncounter(node.missionType || "bandits", prog.shields)}
        ${starsHTML}
      </div>
    `;
  },

  setStudioMode(mode, preserveTier = false) {
    this.state.studioMode = mode;
    document.getElementById("tab-learn").classList.toggle("active", mode === "learn");
    document.getElementById("tab-trial").classList.toggle("active", mode === "trial");

    document.getElementById("lesson-nav-bar").classList.toggle("hidden", mode !== "learn");
    document.getElementById("play-interaction-bar").classList.toggle("hidden", mode === "learn");

    const banner = document.getElementById("merlin-banner");
    banner.className = "merlin-banner";

    if (mode === "learn") {
      this.renderLearnStep();
    } else {
      const checkBar = document.getElementById("learn-check-bar");
      if (checkBar) checkBar.classList.add("hidden");
      this.loadNextProblem(preserveTier);
    }
  },

  updateTierPips() {
    const prog = this.getProgress(this.state.selectedNodeId);
    document.querySelectorAll(".tier-pip").forEach(pip => {
      pip.classList.toggle("active", Number(pip.dataset.tier) === prog.tier);
    });
  },

  // ---------- LESSON MODE ----------
  renderLearnStep() {
    const node = this.getNode(this.state.selectedNodeId);
    const steps = node.learnSteps;
    const idx = Math.max(0, Math.min(steps.length - 1, this.state.learnStepIndex));
    const step = steps[idx];

    const stepTagEl = document.getElementById("merlin-step-tag");
    if (stepTagEl) {
      stepTagEl.textContent = step.stepTag || `Lesson Step ${idx + 1} of ${steps.length} · Guided Example`;
    }

    document.getElementById("merlin-prompt-text").textContent = step.narrative;
    document.getElementById("main-equation-banner").innerHTML = step.equationHTML;
    Visuals.renderMathVisual(document.getElementById("main-visual-stage"), step.visualSpec);

    // Interactive Check-for-Understanding inside Lesson Mode
    const checkBar = document.getElementById("learn-check-bar");
    const checkLabel = document.getElementById("learn-check-label");
    const checkChoices = document.getElementById("learn-check-choices");
    if (checkBar && checkLabel && checkChoices) {
      if (step.checkQuestion) {
        checkBar.classList.remove("hidden");
        checkLabel.textContent = step.checkQuestion.prompt;
        checkChoices.innerHTML = "";
        step.checkQuestion.choices.forEach(choiceVal => {
          const btn = document.createElement("button");
          btn.className = "btn-learn-check-choice";
          btn.textContent = choiceVal;
          btn.addEventListener("click", () => {
            if (Number(choiceVal) === Number(step.checkQuestion.answer)) {
              btn.classList.add("correct");
              this.playSuccessChime();
              this.completedLearnSteps = this.completedLearnSteps || {};
              this.completedLearnSteps[idx] = true;
              if (step.checkQuestion.solvedEquationHTML) {
                document.getElementById("main-equation-banner").innerHTML = step.checkQuestion.solvedEquationHTML;
              }
              if (step.checkQuestion.coachText) {
                document.getElementById("merlin-prompt-text").textContent = step.checkQuestion.coachText;
              }
              document.getElementById("merlin-banner").className = "merlin-banner praise-glow";
            } else {
              btn.classList.add("incorrect");
              this.playGentlePrompt();
              document.getElementById("merlin-banner").className = "merlin-banner help-glow";
              if (step.checkQuestion.coachText) {
                document.getElementById("merlin-prompt-text").textContent = `Look closely at the picture: ${step.checkQuestion.coachText}`;
              }
            }
          });
          checkChoices.appendChild(btn);
        });
      } else {
        checkBar.classList.add("hidden");
      }
    }

    const dotsContainer = document.getElementById("learn-step-dots");
    dotsContainer.innerHTML = "";
    steps.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.type = "button";
      const isCompleted = this.completedLearnSteps && this.completedLearnSteps[i];
      dot.className = `step-dot ${i === idx ? "active" : ""} ${isCompleted ? "completed" : ""}`;
      dot.textContent = String(i + 1);
      dot.setAttribute("aria-label", `Lesson Step ${i + 1} of ${steps.length}`);
      dot.addEventListener("click", () => {
        this.state.learnStepIndex = i;
        this.renderLearnStep();
      });
      dotsContainer.appendChild(dot);
    });

    const prevBtn = document.getElementById("btn-learn-prev");
    const nextBtn = document.getElementById("btn-learn-next");
    prevBtn.disabled = idx === 0;
    prevBtn.style.opacity = idx === 0 ? "0.35" : "1";
    nextBtn.textContent = idx === steps.length - 1 ? "Start Playing →" : "Next Step →";
    this.updateLiveParentCoach();
  },

  // ---------- ANTI-REPEAT PROBLEM & VOICE SELECTORS ----------
  generateUniqueProblem(node, tier) {
    if (!this.recentProblemKeys) this.recentProblemKeys = [];
    const lastEq = this.recentProblemKeys.length > 0
      ? this.recentProblemKeys[this.recentProblemKeys.length - 1]
      : null;

    let chosen = null;
    for (let attempt = 0; attempt < 45; attempt++) {
      const cand = node.generateProblem(tier);
      const eqKey = `${node.id}|${cand.equationHTML}|${cand.answer}`;
      // Strictly forbid back-to-back identical equation
      if (eqKey === lastEq && attempt < 40) continue;
      // Avoid any equation seen in the last 7 problems if possible
      if (this.recentProblemKeys.includes(eqKey) && attempt < 28) continue;
      // Also prefer varying the numeric answer from the immediately preceding problem when possible
      if (this.lastProblemAnswer !== null && cand.answer === this.lastProblemAnswer && attempt < 14) continue;
      chosen = cand;
      break;
    }
    if (!chosen) {
      chosen = node.generateProblem(tier);
    }

    const finalKey = `${node.id}|${chosen.equationHTML}|${chosen.answer}`;
    this.recentProblemKeys.push(finalKey);
    if (this.recentProblemKeys.length > 8) {
      this.recentProblemKeys.shift();
    }
    this.lastProblemAnswer = chosen.answer;
    return chosen;
  },

  pickNonRepeatingVoice(pool) {
    if (!pool || pool.length === 0) return null;
    if (!this.recentVoiceKeys) this.recentVoiceKeys = [];
    if (!this.recentVoiceTexts) this.recentVoiceTexts = [];

    const lastKey = this.recentVoiceKeys.length > 0
      ? this.recentVoiceKeys[this.recentVoiceKeys.length - 1]
      : null;
    const lastText = this.recentVoiceTexts.length > 0
      ? this.recentVoiceTexts[this.recentVoiceTexts.length - 1]
      : null;

    // Filter out recently used texts and keys so we never repeat back-to-back
    let candidates = pool.filter(
      item => !this.recentVoiceTexts.includes(item.text) && !this.recentVoiceKeys.includes(item.key)
    );
    if (candidates.length === 0) {
      candidates = pool.filter(
        item => item.text !== lastText && item.key !== lastKey
      );
    }
    if (candidates.length === 0) {
      candidates = pool.filter(item => item.text !== lastText);
    }
    if (candidates.length === 0) {
      candidates = pool;
    }

    const chosen = candidates[Math.floor(Math.random() * candidates.length)];
    const maxHistory = Math.max(1, Math.min(4, pool.length - 1));
    this.recentVoiceKeys.push(chosen.key);
    if (this.recentVoiceKeys.length > maxHistory) {
      this.recentVoiceKeys.shift();
    }
    this.recentVoiceTexts.push(chosen.text);
    if (this.recentVoiceTexts.length > maxHistory) {
      this.recentVoiceTexts.shift();
    }
    return chosen;
  },

  // ---------- PLAY & PRACTICE MODE ----------
  loadNextProblem(preserveTier = false) {
    const node = this.getNode(this.state.selectedNodeId);
    const prog = this.getProgress(node.id);

    // Automatically scale difficulty tier with clean hits unless preserved/stepped down:
    // Hits 1–2 (0–1 shields) = Tier 1 (Picture Support)
    // Hits 3–4 (2–3 shields) = Tier 2 (Stepping Up)
    // Hit 5 (4 shields)      = Tier 3 (Mental Math Final Strike!)
    if (!preserveTier) {
      if (prog.shields >= 4) prog.tier = 3;
      else if (prog.shields >= 2) prog.tier = 2;
      else prog.tier = 1;
    }

    this.currentProblem = this.generateUniqueProblem(node, prog.tier);
    this.missedCurrentProblem = false;
    this.lastProblemVoiceKey = null;
    this.lastProblemVoiceFallback = null;

    // In Tier 3 (Mental Math), automatically hide the visual diagram first unless the question
    // requires reading a clock/coins/shape directly!
    this.visualHintVisible = !(prog.tier === 3 && !this.currentProblem.keepVisualInTier3);

    const banner = document.getElementById("merlin-banner");
    banner.className = "merlin-banner";

    this.renderCurrentProblem();
    this.renderShieldsProgress();
    this.updateTierPips();
    this.updateLiveParentCoach();

    if (prog.tier === 3 && !this.visualHintVisible && MASTER_ALDOUS_VOICES && MASTER_ALDOUS_VOICES.mentalMathIntro) {
      const clip = this.pickNonRepeatingVoice(MASTER_ALDOUS_VOICES.mentalMathIntro);
      if (clip) this.playVoiceClip(clip.key, clip.fallback);
    }
  },

  renderCurrentProblem() {
    const prob = this.currentProblem;
    if (!prob) return;

    const node = this.getNode(this.state.selectedNodeId);
    const prog = this.getProgress(node.id);
    const stepTagEl = document.getElementById("merlin-step-tag");
    if (stepTagEl) {
      const strikeLabel = prog.tier === 3 && !this.visualHintVisible
        ? "Mental Math Challenge"
        : node.isBoss ? "Boss Battle" : "Quest Challenge";
      stepTagEl.textContent = `${strikeLabel} · Strike ${Math.min(5, prog.shields + 1)} of 5`;
    }

    document.getElementById("merlin-prompt-text").textContent = prob.story;
    document.getElementById("main-equation-banner").innerHTML = prob.equationHTML;

    const stage = document.getElementById("main-visual-stage");
    const toggleText = document.getElementById("visual-toggle-text");
    if (this.visualHintVisible) {
      Visuals.renderMathVisual(stage, prob.visualSpec);
      toggleText.textContent = "Hide Picture";
    } else {
      stage.innerHTML = `
        <div style="display:flex;flex-direction:column;align-items:center;gap:10px;background:#FBF4DE;border:3px dashed #C59B27;border-radius:16px;padding:22px 36px;max-width:560px;text-align:center;">
          <div style="display:flex;align-items:center;gap:10px;">
            ${Visuals.getIconSVG("crown", 32)}
            <span style="font-family:var(--font-display);font-size:20px;font-weight:800;color:#982B2B;">MENTAL MATH STRIKE!</span>
          </div>
          <div style="font-family:var(--font-serif);font-size:22px;font-weight:700;color:#1F1A14;">
            Picture the parts in your mind to land the blow—or tap <strong>Show Picture</strong> below if you want a peek!
          </div>
        </div>
      `;
      toggleText.textContent = "Show Picture";
    }

    const grid = document.getElementById("answer-choices-grid");
    grid.innerHTML = "";
    prob.choices.forEach(val => {
      const btn = document.createElement("button");
      btn.className = "btn-answer-tile";
      btn.textContent = val;
      btn.addEventListener("click", () => this.handleAnswerAttempt(val, btn));
      grid.appendChild(btn);
    });
    this.updateLiveParentCoach();
  },

  handleAnswerAttempt(selectedVal, btnEl) {
    const prob = this.currentProblem;
    if (!prob) return;

    if (Number(selectedVal) === Number(prob.answer)) {
      if (btnEl) btnEl.classList.add("correct");
      document.getElementById("main-equation-banner").innerHTML = prob.solvedEquationHTML;
      this.onCorrectAnswer();
    } else {
      if (btnEl) btnEl.classList.add("incorrect");
      this.onNeedsHelp();
    }
  },

  onCorrectAnswer() {
    this.playSuccessChime();
    const node = this.getNode(this.state.selectedNodeId);
    const prog = this.getProgress(node.id);
    const banner = document.getElementById("merlin-banner");
    banner.className = "merlin-banner praise-glow";

    // If he needed help on this problem first, celebrate the recovery and give a fresh problem
    // at the current (or stepped-down) tier so he only earns strikes on clean first-try mastery!
    if (this.missedCurrentProblem) {
      document.getElementById("merlin-prompt-text").textContent =
        "“Good recovery, young Squire! Now solve this next one on your first try to land the strike!”";
      this.saveState();
      setTimeout(() => this.loadNextProblem(true), 1700);
      return;
    }

    prog.consecutiveMisses = 0;
    prog.shields = Math.min(5, prog.shields + 1);
    this.renderShieldsProgress();

    // Pick activity-matched or Mental-Math-specific voice line without back-to-back repeats!
    let chosenVoice = null;
    if (prog.tier === 3 && !this.visualHintVisible && MASTER_ALDOUS_VOICES && MASTER_ALDOUS_VOICES.mentalMathWin) {
      chosenVoice = this.pickNonRepeatingVoice(MASTER_ALDOUS_VOICES.mentalMathWin);
    } else if (MASTER_ALDOUS_VOICES && MASTER_ALDOUS_VOICES.actionPraise[node.missionType]) {
      chosenVoice = this.pickNonRepeatingVoice(MASTER_ALDOUS_VOICES.actionPraise[node.missionType]);
    } else if (MASTER_ALDOUS_VOICES && MASTER_ALDOUS_VOICES.generalPraise) {
      chosenVoice = this.pickNonRepeatingVoice(MASTER_ALDOUS_VOICES.generalPraise);
    }

    if (chosenVoice) {
      document.getElementById("merlin-prompt-text").textContent = `“${chosenVoice.text}”`;
    } else {
      const praiseIdx = Math.floor(Math.random() * MERLIN_PRAISE.length);
      document.getElementById("merlin-prompt-text").textContent = `“${MERLIN_PRAISE[praiseIdx]}”`;
    }

    if (prog.shields >= 5) {
      prog.mastered = true;
      prog.stars = Math.min(3, (prog.stars || 0) + 1);
      this.renderShieldsProgress();
      this.saveState();
      setTimeout(() => this.openVictoryModal(), 900);
      return;
    }

    if (chosenVoice) {
      this.playVoiceClip(chosenVoice.key, chosenVoice.fallback);
    } else {
      this.playVoiceClip("praise_0");
    }
    this.saveState();
    setTimeout(() => this.loadNextProblem(false), 1850);
  },

  onNeedsHelp() {
    this.playGentlePrompt();
    const prob = this.currentProblem;
    if (!prob) return;

    const node = this.getNode(this.state.selectedNodeId);
    const prog = this.getProgress(node.id);

    if (!this.missedCurrentProblem) {
      this.missedCurrentProblem = true;
      prog.consecutiveMisses = (prog.consecutiveMisses || 0) + 1;
      // Step down a tier if struggling on 2 problems in a row so we practice until it clicks
      if (prog.consecutiveMisses >= 2 && prog.tier > 1) {
        prog.tier = Math.max(1, prog.tier - 1);
        this.updateTierPips();
        this.renderShieldsProgress();
      }
    }

    this.visualHintVisible = true;
    Visuals.renderMathVisual(document.getElementById("main-visual-stage"), prob.visualSpec);
    document.getElementById("visual-toggle-text").textContent = "Hide Picture";

    const banner = document.getElementById("merlin-banner");
    banner.className = "merlin-banner help-glow";

    const specType = prob.visualSpec && prob.visualSpec.type;
    const topicCoach = MASTER_ALDOUS_VOICES && MASTER_ALDOUS_VOICES.topicCoach && MASTER_ALDOUS_VOICES.topicCoach[specType];
    if (topicCoach) {
      document.getElementById("merlin-prompt-text").textContent = `${topicCoach.text} (${prob.whyText})`;
      this.playVoiceClip(topicCoach.key, topicCoach.fallback);
    } else {
      const encIdx = Math.floor(Math.random() * MERLIN_ENCOURAGE.length);
      document.getElementById("merlin-prompt-text").textContent = `${MERLIN_ENCOURAGE[encIdx]} ${prob.whyText}`;
      this.playVoiceClip(`encourage_${encIdx}`);
    }
    this.updateLiveParentCoach();
  },

  openVictoryModal() {
    this.playLevelUpFanfare();
    const node = this.getNode(this.state.selectedNodeId);
    const prog = this.getProgress(node.id);
    const starsCount = Math.min(3, prog.stars || 1);

    document.getElementById("victory-node-title").textContent = `${node.title} — Star ${starsCount} of 3 Won!`;
    const starsRow = document.getElementById("victory-stars-row");
    if (starsRow) {
      let sh = "";
      for (let s = 1; s <= 3; s++) {
        sh += `<span style="display:inline-flex;width:32px;height:32px;">${Visuals.getIconSVG(s <= starsCount ? "star" : "starEmpty", 32)}</span>`;
      }
      starsRow.innerHTML = sh;
    }

    // Match the exact words spoken by Master Aldous in victory_boss.wav and victory_standard.wav
    const msg = node.isBoss
      ? "Glorious victory, young Squire! The Boss has fallen before your wisdom and courage!"
      : "Well done, young Squire! You have won the mission. Let us march onward along the King's Highway!";
    document.getElementById("victory-message").textContent = `“${msg}”`;
    const stayBtn = document.getElementById("btn-stay-practice");
    if (stayBtn) {
      stayBtn.textContent = starsCount < 3 ? `Play Again (Win Star ${starsCount + 1}!)` : "Play Again";
    }
    this.playVoiceClip(node.isBoss ? "victory_boss" : "victory_standard");
    this.openModal("victory-modal");
  },

  // --------------------------------------------------------------------------
  // VIEW 3: INTERACTIVE MATH BLOCKS WORKSHOP & PRACTICE MAT (All 19 Units)
  // --------------------------------------------------------------------------
  openNodeInTabletop(nodeId) {
    const st = this.tabletopState;
    const id = Number(nodeId) || this.state.selectedNodeId;
    if (id <= 5) {
      this.tabletopTool = "bonds10";
      st.b10Sub = id === 3 ? "path" : id === 4 ? "crossout" : "bond";
    } else if (id >= 6 && id <= 8 || id === 11) {
      this.tabletopTool = "maketen";
      st.m10Sub = id === 6 ? "teen" : id === 7 ? "maketen" : "subten";
    } else if (id === 9 || id === 10 || id === 12) {
      this.tabletopTool = "shapeslen";
      st.shSub = id === 9 ? "shapes" : id === 10 ? "ordinals" : "length";
    } else if (id === 13) {
      this.tabletopTool = "barmodel";
      st.bmSub = "rows";
    } else if (id === 14 || id === 15 || id === 19 || id === 20) {
      this.tabletopTool = "placevalue";
      st.pvSub = id === 15 ? "regroup" : id === 20 ? "add2digit" : "tensones";
    } else if (id === 16 || id === 17 || id === 18) {
      this.tabletopTool = "groupsfrac";
      st.gfSub = id === 17 ? "fractions" : "groups";
    } else {
      this.tabletopTool = "clockcoins";
      st.ccSub = id === 21 ? "clock" : "coins";
    }
    this.tabletopMode = "explore";
    this.switchView("tabletop");
  },

  setTabletopMode(mode) {
    this.tabletopMode = mode;
    const expBtn = document.getElementById("tt-mode-explore");
    const qzBtn = document.getElementById("tt-mode-quiz");
    if (expBtn) expBtn.classList.toggle("active", mode === "explore");
    if (qzBtn) qzBtn.classList.toggle("active", mode === "quiz");
    if (mode === "quiz") {
      this.tabletopQuizProblem = this.generateTabletopQuizProblem();
    }
    this.renderTabletop();
  },

  getStationMeta(tool) {
    const meta = {
      bonds10: {
        chapterTag: "Act I · Units 1–4",
        purpose: "5-Group Subitizing, Number Bonds & Subtraction Within 10",
        nodeIds: [1, 2, 3, 4],
        jumpNodeId: 2
      },
      maketen: {
        chapterTag: "Act II · Units 5–7",
        purpose: "Teen Numbers, Make-10 Bridge & Subtract-from-10",
        nodeIds: [6, 7, 8],
        jumpNodeId: 7
      },
      shapeslen: {
        chapterTag: "Acts II–III · Units 8–10",
        purpose: "Geometry (Sides/Corners), Ordinal Ranks & Block Measurement",
        nodeIds: [9, 10, 12],
        jumpNodeId: 9
      },
      barmodel: {
        chapterTag: "Acts III–IV · Units 11, 13 & 17",
        purpose: "Part-Whole Bar Models & One-to-One Comparison ('How Many More/Fewer?')",
        nodeIds: [13, 15, 20],
        jumpNodeId: 13
      },
      placevalue: {
        chapterTag: "Acts III–IV · Units 12, 13, 16 & 17",
        purpose: "Tens Towers, Loose Ones & Bridging to the Next Ten to 100",
        nodeIds: [14, 15, 19, 20],
        jumpNodeId: 15
      },
      groupsfrac: {
        chapterTag: "Act III · Units 14–15",
        purpose: "Repeated Addition Equal Groups, Fair Sharing & Halves/Fourths",
        nodeIds: [16, 17],
        jumpNodeId: 16
      },
      clockcoins: {
        chapterTag: "Act IV · Units 18–19",
        purpose: "Watchtower Analog/Digital Clock (:00 & :30) & Royal Coin Purse (1¢–25¢)",
        nodeIds: [21, 22],
        jumpNodeId: 22
      }
    };
    return meta[tool] || meta.bonds10;
  },

  generateTabletopQuizProblem() {
    const meta = this.getStationMeta(this.tabletopTool);
    const chosenNodeId = meta.nodeIds[Math.floor(Math.random() * meta.nodeIds.length)];
    const node = this.getNode(chosenNodeId);
    const tier = Math.random() < 0.5 ? 1 : 2;
    const prob = this.generateUniqueProblem(node, tier);
    prob.sourceTitle = `${node.id}. ${node.title} (${node.gradeTag})`;
    return prob;
  },

  renderTabletop() {
    const ws = document.getElementById("tabletop-workspace");
    if (!ws) return;
    const st = this.tabletopState;
    const meta = this.getStationMeta(this.tabletopTool);

    document.querySelectorAll(".tool-tab").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.tool === this.tabletopTool);
    });
    const expBtn = document.getElementById("tt-mode-explore");
    const qzBtn = document.getElementById("tt-mode-quiz");
    if (expBtn) expBtn.classList.toggle("active", this.tabletopMode === "explore");
    if (qzBtn) qzBtn.classList.toggle("active", this.tabletopMode === "quiz");

    // ==================== MODE B: PRACTICE & QUIZ ME ====================
    if (this.tabletopMode === "quiz") {
      if (!this.tabletopQuizProblem) {
        this.tabletopQuizProblem = this.generateTabletopQuizProblem();
      }
      const prob = this.tabletopQuizProblem;
      ws.innerHTML = `
        <div class="tt-parent-context-banner">
          <div class="tt-context-left">
            <div class="tt-context-header">
              <span class="tt-chapter-pill">${meta.chapterTag} · Interactive Quiz</span>
              <span class="tt-purpose-label">${prob.sourceTitle || meta.purpose}</span>
            </div>
            <div class="tt-say-script" id="tt-quiz-prompt">
              <strong>PRACTICE PROMPT:</strong> ${prob.story}
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <span class="tt-streak-badge" style="white-space:nowrap;">Streak: <strong>${this.tabletopQuizStreak}</strong></span>
            <button class="btn-vellum btn-sm" id="tt-btn-switch-whiteboard">← Back to Whiteboard</button>
          </div>
        </div>
        <div class="tabletop-controls-row" style="justify-content:space-between;">
          <span style="font-family:var(--font-sans);font-size:13px;font-weight:700;color:var(--ink-mid);">
            Parent Tip: ${prob.whyText}
          </span>
          <button class="btn-vellum btn-sm" id="tt-quiz-skip">New Practice Problem ↻</button>
        </div>
        <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;width:100%;min-height:0;">
          <div id="tt-visual-mount" style="width:100%;display:flex;justify-content:center;"></div>
          <div class="equation-banner" id="tt-quiz-eq">${prob.equationHTML}</div>
        </div>
        <div class="tt-quiz-bar">
          <div class="answer-choices-grid" id="tt-quiz-choices" style="flex:1;"></div>
        </div>
      `;

      Visuals.renderMathVisual(document.getElementById("tt-visual-mount"), prob.visualSpec);

      const choicesEl = document.getElementById("tt-quiz-choices");
      prob.choices.forEach(val => {
        const btn = document.createElement("button");
        btn.className = "btn-answer-tile";
        btn.textContent = val;
        btn.onclick = () => {
          if (Number(val) === Number(prob.answer)) {
            btn.classList.add("correct");
            this.playSuccessChime();
            this.tabletopQuizStreak++;
            document.getElementById("tt-quiz-eq").innerHTML = prob.solvedEquationHTML;
            document.getElementById("tt-quiz-prompt").innerHTML = `<strong>WELL DONE!</strong> ${prob.whyText}`;
            setTimeout(() => {
              this.tabletopQuizProblem = this.generateTabletopQuizProblem();
              this.renderTabletop();
            }, 1350);
          } else {
            btn.classList.add("incorrect");
            this.playGentlePrompt();
            this.tabletopQuizStreak = 0;
            document.getElementById("tt-quiz-prompt").innerHTML = `<strong>COACH TOGETHER:</strong> Look closely at the diagram—${prob.whyText}`;
          }
        };
        choicesEl.appendChild(btn);
      });

      document.getElementById("tt-quiz-skip").onclick = () => {
        this.tabletopQuizProblem = this.generateTabletopQuizProblem();
        this.renderTabletop();
      };
      document.getElementById("tt-btn-switch-whiteboard").onclick = () => {
        this.setTabletopMode("explore");
      };
      return;
    }

    // ==================== MODE A: EXPLORE & TEACH (PARENT WHITEBOARD) ====================
    let sayScript = "";
    let controlsHTML = "";
    let eqHTML = "";
    let visualSpec = null;

    if (this.tabletopTool === "bonds10") {
      if (st.b10Sub === "bond") {
        const whole = st.nbPartA + st.nbPartB;
        const ansPart = st.nbMissing === "partB" ? `<span class="eq-mystery-box">?</span>` : st.nbPartB;
        const ansWhole = st.nbMissing === "whole" ? `<span class="eq-mystery-box">?</span>` : whole;
        eqHTML = `${st.nbPartA} + ${ansPart} = ${ansWhole} &nbsp;·&nbsp; ${whole} − ${st.nbPartA} = ${ansPart}`;
        sayScript = st.nbMissing === "partB"
          ? `“The Whole is ${whole} and one Part is ${st.nbPartA}. How many are hiding in the other Part? (${whole} − ${st.nbPartA} = ${st.nbPartB})”`
          : `“Point to the two Parts (${st.nbPartA} and ${st.nbPartB}). When we join them into the Whole, we get ${whole}!”`;
        visualSpec = {
          type: "number-bond-concrete",
          whole,
          partA: st.nbPartA,
          partB: st.nbPartB,
          missing: st.nbMissing,
          itemType: "apple"
        };
        controlsHTML = `
          <div class="tt-submode-group">
            <button class="tt-submode-btn active" data-sub="bond">Number Bond</button>
            <button class="tt-submode-btn" data-sub="path">Count-On Path</button>
            <button class="tt-submode-btn" data-sub="crossout">Cross-Out Subtraction</button>
          </div>
          <div class="ctrl-group">
            <span>Part 1:</span>
            <button class="ctrl-stepper" id="nb-a-dec">−</button>
            <strong>${st.nbPartA}</strong>
            <button class="ctrl-stepper" id="nb-a-inc">+</button>
          </div>
          <div class="ctrl-group">
            <span>Part 2:</span>
            <button class="ctrl-stepper" id="nb-b-dec">−</button>
            <strong>${st.nbPartB}</strong>
            <button class="ctrl-stepper" id="nb-b-inc">+</button>
          </div>
          <button class="btn-vellum btn-sm" id="nb-cycle-missing">
            ${st.nbMissing === "none" ? "Hide a Part (?)" : st.nbMissing === "partB" ? "Hide Whole (?)" : "Show All Numbers"}
          </button>
        `;
      } else if (st.b10Sub === "path") {
        const total = Math.min(10, st.pathStart + st.pathJump);
        const jump = total - st.pathStart;
        eqHTML = `${st.pathStart} + ${jump} = ${st.hideAnswer ? '<span class="eq-mystery-box">?</span>' : total}`;
        sayScript = `“Put your finger on ${st.pathStart} and hop forward ${jump} steps along the stones: where do we land?”`;
        visualSpec = { type: "count-on-path", start: st.pathStart, jump, total };
        controlsHTML = `
          <div class="tt-submode-group">
            <button class="tt-submode-btn" data-sub="bond">Number Bond</button>
            <button class="tt-submode-btn active" data-sub="path">Count-On Path</button>
            <button class="tt-submode-btn" data-sub="crossout">Cross-Out Subtraction</button>
          </div>
          <div class="ctrl-group">
            <span>Start Stone:</span>
            <button class="ctrl-stepper" id="p-s-dec">−</button>
            <strong>${st.pathStart}</strong>
            <button class="ctrl-stepper" id="p-s-inc">+</button>
          </div>
          <div class="ctrl-group">
            <span>Hops (+):</span>
            <button class="ctrl-stepper" id="p-j-dec">−</button>
            <strong>+${jump}</strong>
            <button class="ctrl-stepper" id="p-j-inc">+</button>
          </div>
          <button class="btn-vellum btn-sm" id="tt-toggle-hide">${st.hideAnswer ? "Reveal Answer" : "Hide Answer (?)"}</button>
        `;
      } else {
        const rem = Math.max(0, st.subWhole - st.subTake);
        eqHTML = `${st.subWhole} − ${st.subTake} = ${st.hideAnswer ? '<span class="eq-mystery-box">?</span>' : rem}`;
        sayScript = `“We start with ${st.subWhole} shields in the Ten-Frame and cross out ${st.subTake}. How many uncrossed shields remain?”`;
        visualSpec = { type: "subtraction-crossout", whole: st.subWhole, takeAway: st.subTake, remaining: rem, itemType: "shield" };
        controlsHTML = `
          <div class="tt-submode-group">
            <button class="tt-submode-btn" data-sub="bond">Number Bond</button>
            <button class="tt-submode-btn" data-sub="path">Count-On Path</button>
            <button class="tt-submode-btn active" data-sub="crossout">Cross-Out Subtraction</button>
          </div>
          <div class="ctrl-group">
            <span>Start Whole:</span>
            <button class="ctrl-stepper" id="sc-w-dec">−</button>
            <strong>${st.subWhole}</strong>
            <button class="ctrl-stepper" id="sc-w-inc">+</button>
          </div>
          <div class="ctrl-group">
            <span>Cross Out (−):</span>
            <button class="ctrl-stepper" id="sc-t-dec">−</button>
            <strong>−${st.subTake}</strong>
            <button class="ctrl-stepper" id="sc-t-inc">+</button>
          </div>
          <button class="btn-vellum btn-sm" id="tt-toggle-hide">${st.hideAnswer ? "Reveal Answer" : "Hide Answer (?)"}</button>
        `;
      }
    } else if (this.tabletopTool === "maketen") {
      if (st.m10Sub === "maketen") {
        const need = Math.max(0, 10 - st.tfA);
        const b = Math.max(need + 1, st.tfB);
        const left = b - need;
        const total = 10 + left;
        eqHTML = `${st.tfA} + ${b} = 10 + ${left} = ${st.hideAnswer ? '<span class="eq-mystery-box">?</span>' : total}`;
        sayScript = `“${st.tfA} needs ${need} more to fill the top Ten-Frame! Split ${b} into ${need} and ${left}: 10 + ${left} = ${total}!”`;
        visualSpec = { type: "make-ten", a: st.tfA, b, needForTen: need, leftover: left, total, revealSplit: !st.hideAnswer };
        controlsHTML = `
          <div class="tt-submode-group">
            <button class="tt-submode-btn active" data-sub="maketen">Make-10 Addition</button>
            <button class="tt-submode-btn" data-sub="subten">Subtract-from-10</button>
            <button class="tt-submode-btn" data-sub="teen">Teen Ten-Frames</button>
          </div>
          <div class="ctrl-group">
            <span>First Number:</span>
            <button class="ctrl-stepper" id="m10-a-dec">−</button>
            <strong>${st.tfA}</strong>
            <button class="ctrl-stepper" id="m10-a-inc">+</button>
          </div>
          <div class="ctrl-group">
            <span>Add (+):</span>
            <button class="ctrl-stepper" id="m10-b-dec">−</button>
            <strong>+${b}</strong>
            <button class="ctrl-stepper" id="m10-b-inc">+</button>
          </div>
          <button class="btn-vellum btn-sm" id="tt-toggle-hide">${st.hideAnswer ? "Reveal Answer" : "Hide Answer (?)"}</button>
        `;
      } else if (st.m10Sub === "subten") {
        const ones = st.subTeen - 10;
        const sub = Math.max(ones + 1, st.subNineEight);
        const leftInTen = 10 - sub;
        const ans = leftInTen + ones;
        eqHTML = `${st.subTeen} − ${sub} = ${leftInTen} + ${ones} = ${st.hideAnswer ? '<span class="eq-mystery-box">?</span>' : ans}`;
        sayScript = `“We can't take ${sub} from ${ones}, so take ${sub} right out of the full 10-frame! ${leftInTen} left in the 10-frame plus ${ones} ones = ${ans}!”`;
        visualSpec = { type: "subtract-from-ten", teen: st.subTeen, ones, sub, leftInTen, answer: ans, revealSplit: !st.hideAnswer };
        controlsHTML = `
          <div class="tt-submode-group">
            <button class="tt-submode-btn" data-sub="maketen">Make-10 Addition</button>
            <button class="tt-submode-btn active" data-sub="subten">Subtract-from-10</button>
            <button class="tt-submode-btn" data-sub="teen">Teen Ten-Frames</button>
          </div>
          <div class="ctrl-group">
            <span>Teen Number:</span>
            <button class="ctrl-stepper" id="s10-t-dec">−</button>
            <strong>${st.subTeen}</strong>
            <button class="ctrl-stepper" id="s10-t-inc">+</button>
          </div>
          <div class="ctrl-group">
            <span>Subtract (−):</span>
            <button class="ctrl-stepper" id="s10-s-dec">−</button>
            <strong>−${sub}</strong>
            <button class="ctrl-stepper" id="s10-s-inc">+</button>
          </div>
          <button class="btn-vellum btn-sm" id="tt-toggle-hide">${st.hideAnswer ? "Reveal Answer" : "Hide Answer (?)"}</button>
        `;
      } else {
        const teen = 10 + st.teenOnes;
        eqHTML = `10 + ${st.teenOnes} = ${st.hideAnswer ? '<span class="eq-mystery-box">?</span>' : teen}`;
        sayScript = `“Every teen number is 1 full Ten-Frame (10) and some loose Ones! 10 and ${st.teenOnes} make ${teen}.”`;
        visualSpec = { type: "double-ten-frame", first: 10, second: st.teenOnes, revealTotal: !st.hideAnswer };
        controlsHTML = `
          <div class="tt-submode-group">
            <button class="tt-submode-btn" data-sub="maketen">Make-10 Addition</button>
            <button class="tt-submode-btn" data-sub="subten">Subtract-from-10</button>
            <button class="tt-submode-btn active" data-sub="teen">Teen Ten-Frames</button>
          </div>
          <div class="ctrl-group">
            <span>10 + Loose Ones:</span>
            <button class="ctrl-stepper" id="tn-o-dec">−</button>
            <strong>+${st.teenOnes} Ones</strong>
            <button class="ctrl-stepper" id="tn-o-inc">+</button>
          </div>
          <button class="btn-vellum btn-sm" id="tt-toggle-hide">${st.hideAnswer ? "Reveal Answer" : "Hide Answer (?)"}</button>
        `;
      }
    } else if (this.tabletopTool === "shapeslen") {
      if (st.shSub === "shapes") {
        const shapeMap = {
          triangle: { label: "Triangle", corners: 3 },
          square: { label: "Square (4 Equal Sides)", corners: 4 },
          rectangle: { label: "Rectangle", corners: 4 },
          trapezoid: { label: "Trapezoid", corners: 4 },
          pentagon: { label: "Pentagon", corners: 5 },
          hexagon: { label: "Hexagon", corners: 6 },
          circle: { label: "Circle (Curved)", corners: 0 }
        };
        const info = shapeMap[st.shapeKey] || shapeMap.hexagon;
        eqHTML = `${info.label}: ${st.hideAnswer ? '<span class="eq-mystery-box">?</span>' : info.corners} corners &amp; straight sides`;
        sayScript = `“Touch each gold corner dot with your finger! A ${info.label} has ${info.corners} corners and ${info.corners} straight sides.”`;
        visualSpec = { type: "shapes", mode: "single", shape: st.shapeKey };
        controlsHTML = `
          <div class="tt-submode-group">
            <button class="tt-submode-btn active" data-sub="shapes">Shapes &amp; Corners</button>
            <button class="tt-submode-btn" data-sub="ordinals">Ordinal Ranks</button>
            <button class="tt-submode-btn" data-sub="length">Block Length</button>
          </div>
          <div class="ctrl-group">
            <button class="btn-vellum btn-sm sh-pick" data-sh="triangle">Triangle (3)</button>
            <button class="btn-vellum btn-sm sh-pick" data-sh="square">Square (4)</button>
            <button class="btn-vellum btn-sm sh-pick" data-sh="pentagon">Pentagon (5)</button>
            <button class="btn-vellum btn-sm sh-pick" data-sh="hexagon">Hexagon (6)</button>
            <button class="btn-vellum btn-sm sh-pick" data-sh="circle">Circle (0)</button>
          </div>
        `;
      } else if (st.shSub === "ordinals") {
        const ordWords = ["", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"];
        const target = Math.min(st.ordTotal, st.ordTarget);
        const posFromLeft = st.ordDir === "left" ? target - 1 : st.ordTotal - target;
        eqHTML = `${ordWords[target]} from the ${st.ordDir.toUpperCase()} = Position #${posFromLeft + 1} from Left`;
        sayScript = `“Start at the ${st.ordDir.toUpperCase()} arrow and count 1st, 2nd, 3rd... up to the ${ordWords[target]} shield!”`;
        visualSpec = {
          type: "ordinals",
          total: st.ordTotal,
          targetPos: target,
          fromDirection: st.ordDir,
          revealOrdinals: !st.hideAnswer
        };
        controlsHTML = `
          <div class="tt-submode-group">
            <button class="tt-submode-btn" data-sub="shapes">Shapes &amp; Corners</button>
            <button class="tt-submode-btn active" data-sub="ordinals">Ordinal Ranks</button>
            <button class="tt-submode-btn" data-sub="length">Block Length</button>
          </div>
          <div class="ctrl-group">
            <span>Rank:</span>
            <button class="ctrl-stepper" id="ord-t-dec">−</button>
            <strong>${ordWords[target]}</strong>
            <button class="ctrl-stepper" id="ord-t-inc">+</button>
          </div>
          <button class="btn-vellum btn-sm" id="ord-flip-dir">
            Counting from: ${st.ordDir.toUpperCase()} ⇄
          </button>
        `;
      } else {
        const diff = Math.abs(st.lenA - st.lenB);
        eqHTML = `${st.lenA} blocks − ${st.lenB} blocks = ${st.hideAnswer ? '<span class="eq-mystery-box">?</span>' : diff} blocks longer`;
        sayScript = `“Both swords start at the same baseline with zero gaps. Sword A (${st.lenA}) is ${diff} blocks longer than Sword B (${st.lenB})!”`;
        visualSpec = { type: "length-units", lengthA: st.lenA, lengthB: st.lenB, revealNumbers: !st.hideAnswer };
        controlsHTML = `
          <div class="tt-submode-group">
            <button class="tt-submode-btn" data-sub="shapes">Shapes &amp; Corners</button>
            <button class="tt-submode-btn" data-sub="ordinals">Ordinal Ranks</button>
            <button class="tt-submode-btn active" data-sub="length">Block Length</button>
          </div>
          <div class="ctrl-group">
            <span>Sword A:</span>
            <button class="ctrl-stepper" id="ln-a-dec">−</button>
            <strong>${st.lenA} blocks</strong>
            <button class="ctrl-stepper" id="ln-a-inc">+</button>
          </div>
          <div class="ctrl-group">
            <span>Sword B:</span>
            <button class="ctrl-stepper" id="ln-b-dec">−</button>
            <strong>${st.lenB} blocks</strong>
            <button class="ctrl-stepper" id="ln-b-inc">+</button>
          </div>
          <button class="btn-vellum btn-sm" id="tt-toggle-hide">${st.hideAnswer ? "Reveal Answer" : "Hide Answer (?)"}</button>
        `;
      }
    } else if (this.tabletopTool === "barmodel") {
      if (st.bmSub === "rows") {
        const top = Math.max(st.rowTop, st.rowBot + 1);
        const bot = st.rowBot;
        const diff = top - bot;
        eqHTML = `${top} − ${bot} = ${st.hideAnswer ? '<span class="eq-mystery-box">?</span>' : diff} (Difference)`;
        sayScript = `“Up to the dotted line, ${bot} match with ${bot}. Subtract ${top} − ${bot} = ${diff} to see how many MORE (or FEWER)!”`;
        visualSpec = { type: "comparison-rows", topCount: top, bottomCount: bot, topLabel: `Row A (${top})`, bottomLabel: `Row B (${bot})` };
        controlsHTML = `
          <div class="tt-submode-group">
            <button class="tt-submode-btn active" data-sub="rows">1-to-1 Comparison Rows</button>
            <button class="tt-submode-btn" data-sub="part-whole">Part-Whole Bar Model</button>
            <button class="tt-submode-btn" data-sub="comparison">Comparison Bar Model</button>
          </div>
          <div class="ctrl-group">
            <span>Top Row:</span>
            <button class="ctrl-stepper" id="rw-t-dec">−</button>
            <strong>${top}</strong>
            <button class="ctrl-stepper" id="rw-t-inc">+</button>
          </div>
          <div class="ctrl-group">
            <span>Bottom Row:</span>
            <button class="ctrl-stepper" id="rw-b-dec">−</button>
            <strong>${bot}</strong>
            <button class="ctrl-stepper" id="rw-b-inc">+</button>
          </div>
          <button class="btn-vellum btn-sm" id="tt-toggle-hide">${st.hideAnswer ? "Reveal Answer" : "Hide Answer (?)"}</button>
        `;
      } else {
        const hi = Math.max(st.bmA, st.bmB);
        const lo = Math.min(st.bmA, st.bmB);
        const whole = st.bmA + st.bmB;
        const diff = hi - lo;
        const isPW = st.bmSub === "part-whole";
        eqHTML = isPW
          ? `${st.bmA} + ${st.hideAnswer ? '<span class="eq-mystery-box">?</span>' : st.bmB} = ${whole} &nbsp;·&nbsp; ${whole} − ${st.bmA} = ${st.hideAnswer ? '<span class="eq-mystery-box">?</span>' : st.bmB}`
          : `${hi} − ${lo} = ${st.hideAnswer ? '<span class="eq-mystery-box">?</span>' : diff} (Difference)`;
        sayScript = isPW
          ? `“In a Part-Whole Bar Model, the two parts (${st.bmA} and ${st.bmB}) join to equal the Whole brace (${whole}). If one part is unknown, subtract from the Whole!”`
          : `“In a Comparison Bar Model, subtract the shorter bar (${lo}) from the longer bar (${hi}) to find the difference (${diff})!”`;
        visualSpec = {
          type: "bar-model",
          modelType: st.bmSub,
          partA: isPW ? st.bmA : hi,
          partB: isPW ? st.bmB : lo,
          whole,
          diff,
          missing: st.hideAnswer ? (isPW ? "partB" : "diff") : "none",
          labelA: isPW ? `${st.bmA}` : `Bar A (${hi})`,
          labelB: isPW ? (st.hideAnswer ? "?" : `${st.bmB}`) : `Bar B (${lo})`
        };
        controlsHTML = `
          <div class="tt-submode-group">
            <button class="tt-submode-btn" data-sub="rows">1-to-1 Comparison Rows</button>
            <button class="tt-submode-btn ${isPW ? "active" : ""}" data-sub="part-whole">Part-Whole Bar Model</button>
            <button class="tt-submode-btn ${!isPW ? "active" : ""}" data-sub="comparison">Comparison Bar Model</button>
          </div>
          <div class="ctrl-group">
            <span>Bar 1:</span>
            <button class="ctrl-stepper" id="bm-a-dec">−</button>
            <strong>${st.bmA}</strong>
            <button class="ctrl-stepper" id="bm-a-inc">+</button>
          </div>
          <div class="ctrl-group">
            <span>Bar 2:</span>
            <button class="ctrl-stepper" id="bm-b-dec">−</button>
            <strong>${st.bmB}</strong>
            <button class="ctrl-stepper" id="bm-b-inc">+</button>
          </div>
          <button class="btn-vellum btn-sm" id="tt-toggle-hide">${st.hideAnswer ? "Reveal Unknown" : "Hide Unknown (?)"}</button>
        `;
      }
    } else if (this.tabletopTool === "placevalue") {
      if (st.pvSub === "tensones") {
        const total = st.pvTens * 10 + st.pvOnes;
        eqHTML = `${st.pvTens} Tens (${st.pvTens * 10}) + ${st.pvOnes} Ones = ${st.hideAnswer ? '<span class="eq-mystery-box">?</span>' : total}`;
        sayScript = `“Count the blue Tens towers by 10s (${st.pvTens * 10}), then count on the ${st.pvOnes} loose Ones to get ${total}!”`;
        visualSpec = { type: "place-value", tens: st.pvTens, ones: st.pvOnes, addTens: 0, addOnes: 0, revealChart: !st.hideAnswer };
        controlsHTML = `
          <div class="tt-submode-group">
            <button class="tt-submode-btn active" data-sub="tensones">Tens &amp; Ones</button>
            <button class="tt-submode-btn" data-sub="regroup">Make Next Ten (Regroup)</button>
            <button class="tt-submode-btn" data-sub="add2digit">2-Digit Addition</button>
          </div>
          <div class="ctrl-group">
            <span>Tens Towers:</span>
            <button class="ctrl-stepper" id="pv-t-dec">−</button>
            <strong>${st.pvTens} Tens</strong>
            <button class="ctrl-stepper" id="pv-t-inc">+</button>
          </div>
          <div class="ctrl-group">
            <span>Loose Ones:</span>
            <button class="ctrl-stepper" id="pv-o-dec">−</button>
            <strong>${st.pvOnes} Ones</strong>
            <button class="ctrl-stepper" id="pv-o-inc">+</button>
          </div>
          <button class="btn-vellum btn-sm" id="tt-toggle-hide">${st.hideAnswer ? "Reveal Answer" : "Hide Answer (?)"}</button>
        `;
      } else if (st.pvSub === "regroup") {
        const need = 10 - (st.regA % 10);
        const b = Math.max(need + 1, st.regB);
        const nextTen = st.regA + need;
        const left = b - need;
        const total = st.regA + b;
        eqHTML = `${st.regA} + ${b} = ${nextTen} + ${left} = ${st.hideAnswer ? '<span class="eq-mystery-box">?</span>' : total}`;
        sayScript = `“${st.regA} needs ${need} more to complete the next Ten (${nextTen})! Split ${b} into ${need} and ${left}: ${nextTen} + ${left} = ${total}!”`;
        visualSpec = { type: "regrouping", a: st.regA, b, total, revealSplit: !st.hideAnswer };
        controlsHTML = `
          <div class="tt-submode-group">
            <button class="tt-submode-btn" data-sub="tensones">Tens &amp; Ones</button>
            <button class="tt-submode-btn active" data-sub="regroup">Make Next Ten (Regroup)</button>
            <button class="tt-submode-btn" data-sub="add2digit">2-Digit Addition</button>
          </div>
          <div class="ctrl-group">
            <span>Start Number:</span>
            <button class="ctrl-stepper" id="rg-a-dec">−</button>
            <strong>${st.regA}</strong>
            <button class="ctrl-stepper" id="rg-a-inc">+</button>
          </div>
          <div class="ctrl-group">
            <span>Add (+):</span>
            <button class="ctrl-stepper" id="rg-b-dec">−</button>
            <strong>+${b}</strong>
            <button class="ctrl-stepper" id="rg-b-inc">+</button>
          </div>
          <button class="btn-vellum btn-sm" id="tt-toggle-hide">${st.hideAnswer ? "Reveal Answer" : "Hide Answer (?)"}</button>
        `;
      } else {
        const a = st.add2TensA * 10 + st.add2OnesA;
        const b = st.add2TensB * 10 + st.add2OnesB;
        const total = a + b;
        eqHTML = `${a} + ${b} = (${st.add2TensA * 10}+${st.add2TensB * 10}) + (${st.add2OnesA}+${st.add2OnesB}) = ${st.hideAnswer ? '<span class="eq-mystery-box">?</span>' : total}`;
        sayScript = `“To add ${a} + ${b}, combine the Tens with Tens (${st.add2TensA * 10} + ${st.add2TensB * 10} = ${(st.add2TensA + st.add2TensB) * 10}) and Ones with Ones (${st.add2OnesA} + ${st.add2OnesB} = ${st.add2OnesA + st.add2OnesB})!”`;
        visualSpec = { type: "place-value", tens: st.add2TensA, ones: st.add2OnesA, addTens: st.add2TensB, addOnes: st.add2OnesB, revealChart: !st.hideAnswer };
        controlsHTML = `
          <div class="tt-submode-group">
            <button class="tt-submode-btn" data-sub="tensones">Tens &amp; Ones</button>
            <button class="tt-submode-btn" data-sub="regroup">Make Next Ten (Regroup)</button>
            <button class="tt-submode-btn active" data-sub="add2digit">2-Digit Addition</button>
          </div>
          <div class="ctrl-group">
            <span>First (${a}):</span>
            <button class="ctrl-stepper" id="a2-a-dec">−10</button>
            <button class="ctrl-stepper" id="a2-a-inc">+10</button>
          </div>
          <div class="ctrl-group">
            <span>Add (${b}):</span>
            <button class="ctrl-stepper" id="a2-b-dec">−1</button>
            <button class="ctrl-stepper" id="a2-b-inc">+1</button>
          </div>
          <button class="btn-vellum btn-sm" id="tt-toggle-hide">${st.hideAnswer ? "Reveal Answer" : "Hide Answer (?)"}</button>
        `;
      }
    } else if (this.tabletopTool === "groupsfrac") {
      if (st.gfSub === "groups") {
        const total = st.grpCount * st.grpPer;
        const chain = Array.from({ length: st.grpCount }, () => st.grpPer).join(" + ");
        eqHTML = `${st.grpCount} equal groups of ${st.grpPer}: &nbsp; ${chain} = ${st.hideAnswer ? '<span class="eq-mystery-box">?</span>' : total}`;
        sayScript = `“There are ${st.grpCount} trays with ${st.grpPer} shields on each tray. Count by equal groups (${chain} = ${total})—or share ${total} equally among ${st.grpCount} trays!”`;
        visualSpec = { type: "equal-groups", groups: st.grpCount, perGroup: st.grpPer, total, itemType: "shield", revealSkipCount: !st.hideAnswer };
        controlsHTML = `
          <div class="tt-submode-group">
            <button class="tt-submode-btn active" data-sub="groups">Equal Groups &amp; Fair Sharing</button>
            <button class="tt-submode-btn" data-sub="fractions">Halves &amp; Fourths (Quarters)</button>
          </div>
          <div class="ctrl-group">
            <span>Trays (Groups):</span>
            <button class="ctrl-stepper" id="gf-g-dec">−</button>
            <strong>${st.grpCount} trays</strong>
            <button class="ctrl-stepper" id="gf-g-inc">+</button>
          </div>
          <div class="ctrl-group">
            <span>Per Tray:</span>
            <button class="ctrl-stepper" id="gf-p-dec">−</button>
            <strong>${st.grpPer} each</strong>
            <button class="ctrl-stepper" id="gf-p-inc">+</button>
          </div>
          <button class="btn-vellum btn-sm" id="tt-toggle-hide">${st.hideAnswer ? "Reveal Total" : "Hide Total (?)"}</button>
        `;
      } else {
        const shaded = Math.min(st.fracParts, st.fracShaded);
        const unitWord = st.fracParts === 2 ? "Halves" : "Fourths (Quarters)";
        eqHTML = `${st.hideAnswer ? '<span class="eq-mystery-box">?</span>' : shaded} out of ${st.fracParts} Equal ${unitWord} Painted Gold`;
        sayScript = `“This whole ${st.fracShape} is cut into ${st.fracParts} EQUAL parts called ${unitWord}. ${shaded} of the ${st.fracParts} equal parts are painted gold!”`;
        visualSpec = { type: "fractions", parts: st.fracParts, shaded, shape: st.fracShape };
        controlsHTML = `
          <div class="tt-submode-group">
            <button class="tt-submode-btn" data-sub="groups">Equal Groups &amp; Fair Sharing</button>
            <button class="tt-submode-btn active" data-sub="fractions">Halves &amp; Fourths (Quarters)</button>
          </div>
          <button class="btn-vellum btn-sm" id="fr-toggle-parts">
            Cut Into: ${st.fracParts === 2 ? "2 Halves" : "4 Fourths (Quarters)"} ⇄
          </button>
          <div class="ctrl-group">
            <span>Gold Parts:</span>
            <button class="ctrl-stepper" id="fr-s-dec">−</button>
            <strong>${shaded}</strong>
            <button class="ctrl-stepper" id="fr-s-inc">+</button>
          </div>
          <button class="btn-vellum btn-sm" id="fr-toggle-shape">
            Shape: ${st.fracShape === "circle" ? "Round Shield" : "Square Banner"} ⇄
          </button>
        `;
      }
    } else if (this.tabletopTool === "clockcoins") {
      if (st.ccSub === "clock") {
        const padMin = st.clkMin === 0 ? "00" : "30";
        const phrase = st.clkMin === 0 ? `${st.clkHour} o'clock` : `Half-past ${st.clkHour}`;
        eqHTML = `Time: ${st.hideAnswer ? '<span class="eq-mystery-box">?</span>' : st.clkHour}:${padMin} (${phrase})`;
        sayScript = st.clkMin === 0
          ? `“The long red Minute Hand points straight up to 12 (:00 O'Clock), and the short blue Hour Hand points to ${st.clkHour}!”`
          : `“The long red Minute Hand points down to 6 (:30 Half-Past), so the short blue Hour Hand sits halfway past ${st.clkHour}!”`;
        visualSpec = { type: "clock", hour: st.clkHour, minutes: st.clkMin };
        controlsHTML = `
          <div class="tt-submode-group">
            <button class="tt-submode-btn active" data-sub="clock">Watchtower Clock</button>
            <button class="tt-submode-btn" data-sub="coins">Royal Coin Purse</button>
          </div>
          <div class="ctrl-group">
            <span>Hour:</span>
            <button class="ctrl-stepper" id="ck-h-dec">−</button>
            <strong>${st.clkHour}</strong>
            <button class="ctrl-stepper" id="ck-h-inc">+</button>
          </div>
          <button class="btn-vellum btn-sm" id="ck-toggle-min">
            Minute Hand: ${st.clkMin === 0 ? ":00 (O'Clock)" : ":30 (Half-Past)"} ⇄
          </button>
          <button class="btn-vellum btn-sm" id="tt-toggle-hide">${st.hideAnswer ? "Reveal Hour" : "Hide Hour (?)"}</button>
        `;
      } else {
        const coins = [];
        for (let i = 0; i < st.coinQ; i++) coins.push(25);
        for (let i = 0; i < st.coinD; i++) coins.push(10);
        for (let i = 0; i < st.coinN; i++) coins.push(5);
        for (let i = 0; i < st.coinP; i++) coins.push(1);
        if (coins.length === 0) coins.push(10);
        const total = coins.reduce((s, c) => s + c, 0);
        const chain = coins.map(c => `${c}¢`).join(" + ");
        eqHTML = `${chain} = ${st.hideAnswer ? '<span class="eq-mystery-box">?</span>' : total}¢`;
        sayScript = `“Count from largest value to smallest: Quarters (25¢), then Dimes by 10s, Nickels by 5s, and Pennies by 1s = ${total}¢!”`;
        visualSpec = { type: "coins", coins };
        controlsHTML = `
          <div class="tt-submode-group">
            <button class="tt-submode-btn" data-sub="clock">Watchtower Clock</button>
            <button class="tt-submode-btn active" data-sub="coins">Royal Coin Purse</button>
          </div>
          <div class="ctrl-group">
            <span>25¢:</span>
            <button class="ctrl-stepper" id="cn-q-dec">−</button>
            <strong>${st.coinQ}</strong>
            <button class="ctrl-stepper" id="cn-q-inc">+</button>
          </div>
          <div class="ctrl-group">
            <span>10¢:</span>
            <button class="ctrl-stepper" id="cn-d-dec">−</button>
            <strong>${st.coinD}</strong>
            <button class="ctrl-stepper" id="cn-d-inc">+</button>
          </div>
          <div class="ctrl-group">
            <span>5¢:</span>
            <button class="ctrl-stepper" id="cn-n-dec">−</button>
            <strong>${st.coinN}</strong>
            <button class="ctrl-stepper" id="cn-n-inc">+</button>
          </div>
          <div class="ctrl-group">
            <span>1¢:</span>
            <button class="ctrl-stepper" id="cn-p-dec">−</button>
            <strong>${st.coinP}</strong>
            <button class="ctrl-stepper" id="cn-p-inc">+</button>
          </div>
          <button class="btn-vellum btn-sm" id="tt-toggle-hide">${st.hideAnswer ? "Reveal Total" : "Hide Total (?)"}</button>
        `;
      }
    }

    ws.innerHTML = `
      <div class="tt-parent-context-banner">
        <div class="tt-context-left">
          <div class="tt-context-header">
            <span class="tt-chapter-pill">${meta.chapterTag}</span>
            <span class="tt-purpose-label">${meta.purpose}</span>
          </div>
          <div class="tt-say-script">
            <strong>TEACHING PROMPT:</strong> ${sayScript}
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:8px;flex-shrink:0;">
          <button class="btn-royal-primary btn-sm" id="tt-launch-quiz" style="padding:8px 14px;font-size:13px;">
            Practice &amp; Quiz This →
          </button>
          <button class="btn-vellum btn-sm" id="tt-jump-mission" title="Jump straight to this Unit's Quest">
            Play Unit Quest
          </button>
        </div>
      </div>
      <div class="tabletop-controls-row">
        ${controlsHTML}
      </div>
      <div id="tt-visual-mount" style="width:100%;display:flex;justify-content:center;align-items:center;min-height:0;"></div>
      <div class="equation-banner${(this.tabletopTool === "bonds10" && st.b10Sub === "bond") || controlsHTML.includes("tt-toggle-hide") ? " eq-clickable" : ""}" id="tt-explore-eq">${eqHTML}</div>
    `;

    Visuals.renderMathVisual(document.getElementById("tt-visual-mount"), visualSpec);

    const canToggleEq = (this.tabletopTool === "bonds10" && st.b10Sub === "bond") || controlsHTML.includes("tt-toggle-hide");
    const exploreEq = document.getElementById("tt-explore-eq");
    if (exploreEq && canToggleEq) {
      exploreEq.setAttribute("title", "Tap to hide or reveal the missing number");
      exploreEq.onclick = () => {
        if (this.tabletopTool === "bonds10" && st.b10Sub === "bond") {
          st.nbMissing = st.nbMissing === "none" ? "partB" : st.nbMissing === "partB" ? "whole" : "none";
          this.playTone([659.25], "sine", 0.06, 0.02);
          this.renderTabletop();
        } else {
          st.hideAnswer = !st.hideAnswer;
          this.playTone([st.hideAnswer ? 440 : 659.25], "sine", 0.06, 0.02);
          this.renderTabletop();
        }
      };
    }

    // Wire common buttons
    const quizLaunchBtn = document.getElementById("tt-launch-quiz");
    if (quizLaunchBtn) quizLaunchBtn.onclick = () => this.setTabletopMode("quiz");

    const jumpMissionBtn = document.getElementById("tt-jump-mission");
    if (jumpMissionBtn) {
      jumpMissionBtn.onclick = () => {
        this.state.selectedNodeId = meta.jumpNodeId;
        this.state.squireNodeId = meta.jumpNodeId;
        this.saveState();
        this.switchView("studio");
        this.openNodeInStudio(meta.jumpNodeId);
      };
    }

    const hideBtn = document.getElementById("tt-toggle-hide");
    if (hideBtn) {
      hideBtn.onclick = () => {
        st.hideAnswer = !st.hideAnswer;
        this.renderTabletop();
      };
    }

    // Wire submode switches
    ws.querySelectorAll(".tt-submode-btn").forEach(btn => {
      btn.onclick = () => {
        const sub = btn.dataset.sub;
        if (this.tabletopTool === "bonds10") st.b10Sub = sub;
        else if (this.tabletopTool === "maketen") st.m10Sub = sub;
        else if (this.tabletopTool === "shapeslen") st.shSub = sub;
        else if (this.tabletopTool === "barmodel") st.bmSub = sub;
        else if (this.tabletopTool === "placevalue") st.pvSub = sub;
        else if (this.tabletopTool === "groupsfrac") st.gfSub = sub;
        else if (this.tabletopTool === "clockcoins") st.ccSub = sub;
        this.renderTabletop();
      };
    });

    // Wire Station 1 controls
    const bind = (id, fn) => {
      const el = document.getElementById(id);
      if (el) {
        el.onclick = () => {
          if (id.endsWith("-inc")) this.playTone([587.33], "sine", 0.06, 0.02);
          else if (id.endsWith("-dec")) this.playTone([440], "sine", 0.06, 0.02);
          fn();
          this.renderTabletop();
        };
      }
    };
    bind("nb-a-dec", () => { st.nbPartA = Math.max(1, st.nbPartA - 1); });
    bind("nb-a-inc", () => { st.nbPartA = Math.min(9, st.nbPartA + 1); if (st.nbPartA + st.nbPartB > 10) st.nbPartB = 10 - st.nbPartA; });
    bind("nb-b-dec", () => { st.nbPartB = Math.max(1, st.nbPartB - 1); });
    bind("nb-b-inc", () => { st.nbPartB = Math.min(10 - st.nbPartA, st.nbPartB + 1); });
    bind("nb-cycle-missing", () => {
      st.nbMissing = st.nbMissing === "none" ? "partB" : st.nbMissing === "partB" ? "whole" : "none";
    });
    bind("p-s-dec", () => { st.pathStart = Math.max(1, st.pathStart - 1); });
    bind("p-s-inc", () => { st.pathStart = Math.min(8, st.pathStart + 1); });
    bind("p-j-dec", () => { st.pathJump = Math.max(1, st.pathJump - 1); });
    bind("p-j-inc", () => { st.pathJump = Math.min(10 - st.pathStart, st.pathJump + 1); });
    bind("sc-w-dec", () => { st.subWhole = Math.max(3, st.subWhole - 1); if (st.subTake >= st.subWhole) st.subTake = st.subWhole - 1; });
    bind("sc-w-inc", () => { st.subWhole = Math.min(10, st.subWhole + 1); });
    bind("sc-t-dec", () => { st.subTake = Math.max(1, st.subTake - 1); });
    bind("sc-t-inc", () => { st.subTake = Math.min(st.subWhole - 1, st.subTake + 1); });

    // Wire Station 2 controls
    bind("m10-a-dec", () => { st.tfA = Math.max(6, st.tfA - 1); });
    bind("m10-a-inc", () => { st.tfA = Math.min(9, st.tfA + 1); });
    bind("m10-b-dec", () => { st.tfB = Math.max((10 - st.tfA) + 1, st.tfB - 1); });
    bind("m10-b-inc", () => { st.tfB = Math.min(9, st.tfB + 1); });
    bind("s10-t-dec", () => { st.subTeen = Math.max(11, st.subTeen - 1); });
    bind("s10-t-inc", () => { st.subTeen = Math.min(17, st.subTeen + 1); });
    bind("s10-s-dec", () => { st.subNineEight = Math.max((st.subTeen - 10) + 1, st.subNineEight - 1); });
    bind("s10-s-inc", () => { st.subNineEight = Math.min(9, st.subNineEight + 1); });
    bind("tn-o-dec", () => { st.teenOnes = Math.max(1, st.teenOnes - 1); });
    bind("tn-o-inc", () => { st.teenOnes = Math.min(9, st.teenOnes + 1); });

    // Wire Station 3 controls
    ws.querySelectorAll(".sh-pick").forEach(btn => {
      btn.onclick = () => { st.shapeKey = btn.dataset.sh; this.renderTabletop(); };
    });
    bind("ord-t-dec", () => { st.ordTarget = Math.max(1, st.ordTarget - 1); });
    bind("ord-t-inc", () => { st.ordTarget = Math.min(st.ordTotal, st.ordTarget + 1); });
    bind("ord-flip-dir", () => { st.ordDir = st.ordDir === "left" ? "right" : "left"; });
    bind("ln-a-dec", () => { st.lenA = Math.max(3, st.lenA - 1); });
    bind("ln-a-inc", () => { st.lenA = Math.min(9, st.lenA + 1); });
    bind("ln-b-dec", () => { st.lenB = Math.max(2, st.lenB - 1); });
    bind("ln-b-inc", () => { st.lenB = Math.min(8, st.lenB + 1); });

    // Wire Station 4 controls
    bind("rw-t-dec", () => { st.rowTop = Math.max(st.rowBot + 1, st.rowTop - 1); });
    bind("rw-t-inc", () => { st.rowTop = Math.min(10, st.rowTop + 1); });
    bind("rw-b-dec", () => { st.rowBot = Math.max(2, st.rowBot - 1); });
    bind("rw-b-inc", () => { st.rowBot = Math.min(st.rowTop - 1, st.rowBot + 1); });
    bind("bm-a-dec", () => { st.bmA = Math.max(4, st.bmA - 2); });
    bind("bm-a-inc", () => { st.bmA = Math.min(60, st.bmA + 2); });
    bind("bm-b-dec", () => { st.bmB = Math.max(2, st.bmB - 2); });
    bind("bm-b-inc", () => { st.bmB = Math.min(40, st.bmB + 2); });

    // Wire Station 5 controls
    bind("pv-t-dec", () => { st.pvTens = Math.max(1, st.pvTens - 1); });
    bind("pv-t-inc", () => { st.pvTens = Math.min(9, st.pvTens + 1); });
    bind("pv-o-dec", () => { st.pvOnes = Math.max(0, st.pvOnes - 1); });
    bind("pv-o-inc", () => { st.pvOnes = Math.min(9, st.pvOnes + 1); });
    bind("rg-a-dec", () => { st.regA = Math.max(16, st.regA - 1); if (st.regA % 10 < 6) st.regA = Math.floor(st.regA / 10) * 10 - 1; });
    bind("rg-a-inc", () => { st.regA = Math.min(29, st.regA + 1); if (st.regA % 10 === 0) st.regA += 7; });
    bind("rg-b-dec", () => { st.regB = Math.max((10 - (st.regA % 10)) + 1, st.regB - 1); });
    bind("rg-b-inc", () => { st.regB = Math.min(8, st.regB + 1); });
    bind("a2-a-dec", () => { st.add2TensA = Math.max(1, st.add2TensA - 1); });
    bind("a2-a-inc", () => { st.add2TensA = Math.min(6, st.add2TensA + 1); });
    bind("a2-b-dec", () => { st.add2OnesB = Math.max(1, st.add2OnesB - 1); });
    bind("a2-b-inc", () => { st.add2OnesB = Math.min(9 - st.add2OnesA, st.add2OnesB + 1); });

    // Wire Station 6 controls
    bind("gf-g-dec", () => { st.grpCount = Math.max(2, st.grpCount - 1); });
    bind("gf-g-inc", () => { st.grpCount = Math.min(4, st.grpCount + 1); });
    bind("gf-p-dec", () => { st.grpPer = Math.max(2, st.grpPer - 1); });
    bind("gf-p-inc", () => { st.grpPer = Math.min(5, st.grpPer + 1); });
    bind("fr-toggle-parts", () => { st.fracParts = st.fracParts === 2 ? 4 : 2; st.fracShaded = Math.min(st.fracParts, st.fracShaded); });
    bind("fr-s-dec", () => { st.fracShaded = Math.max(1, st.fracShaded - 1); });
    bind("fr-s-inc", () => { st.fracShaded = Math.min(st.fracParts, st.fracShaded + 1); });
    bind("fr-toggle-shape", () => { st.fracShape = st.fracShape === "circle" ? "square" : "circle"; });

    // Wire Station 7 controls
    bind("ck-h-dec", () => { st.clkHour = st.clkHour <= 1 ? 12 : st.clkHour - 1; });
    bind("ck-h-inc", () => { st.clkHour = st.clkHour >= 12 ? 1 : st.clkHour + 1; });
    bind("ck-toggle-min", () => { st.clkMin = st.clkMin === 0 ? 30 : 0; });
    bind("cn-q-dec", () => { st.coinQ = Math.max(0, st.coinQ - 1); });
    bind("cn-q-inc", () => { st.coinQ = Math.min(2, st.coinQ + 1); });
    bind("cn-d-dec", () => { st.coinD = Math.max(0, st.coinD - 1); });
    bind("cn-d-inc", () => { st.coinD = Math.min(4, st.coinD + 1); });
    bind("cn-n-dec", () => { st.coinN = Math.max(0, st.coinN - 1); });
    bind("cn-n-inc", () => { st.coinN = Math.min(3, st.coinN + 1); });
    bind("cn-p-dec", () => { st.coinP = Math.max(0, st.coinP - 1); });
    bind("cn-p-inc", () => { st.coinP = Math.min(5, st.coinP + 1); });
  },

  // --------------------------------------------------------------------------
  // PLACEMENT & QA MODAL
  // --------------------------------------------------------------------------
  renderPlacementModal() {
    const grid = document.getElementById("placement-grid");
    grid.innerHTML = "";

    CURRICULUM_NODES.forEach(node => {
      const prog = this.getProgress(node.id);
      const starsCount = Math.min(3, prog.stars || (prog.mastered ? 1 : 0));
      const card = document.createElement("div");
      card.className = `placement-node-card ${prog.mastered ? "mastered" : ""}`;
      card.innerHTML = `
        <div>
          <div class="p-card-title">${node.id}. ${node.title}</div>
          <div class="p-card-desc">${node.subtitle} (${prog.shields}/5 Shields · ${starsCount}/3 Stars)</div>
        </div>
        <div class="p-card-actions">
          <button class="btn-vellum btn-sm btn-jump-node" data-id="${node.id}">Play Level →</button>
          <button class="btn-vellum btn-sm btn-toggle-seal" data-id="${node.id}">
            ${prog.mastered ? "Clear Seal" : "Grant Seal"}
          </button>
        </div>
      `;
      grid.appendChild(card);
    });

    grid.querySelectorAll(".btn-jump-node").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = Number(btn.dataset.id);
        this.closeModal("placement-modal");
        this.state.selectedNodeId = id;
        this.state.squireNodeId = id;
        this.saveState();
        this.switchView("studio");
        this.openNodeInStudio(id);
      });
    });

    grid.querySelectorAll(".btn-toggle-seal").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = Number(btn.dataset.id);
        const prog = this.getProgress(id);
        prog.mastered = !prog.mastered;
        prog.shields = prog.mastered ? 5 : 0;
        prog.stars = prog.mastered ? 3 : 0;
        this.saveState();
        this.renderPlacementModal();
        this.renderMapAll();
      });
    });
  },

  resetCurrentLevel() {
    const nodeId = this.state.selectedNodeId;
    const node = this.getNode(nodeId);
    this.state.nodeProgress[nodeId] = { shields: 0, tier: 1, mastered: false, stars: 0, consecutiveMisses: 0 };
    this.completedLearnSteps = {};
    this.state.learnStepIndex = 0;
    this.saveState();
    this.openNodeInStudio(nodeId);
    this.showToast(`Level reset! Restarted ${node.id}. ${node.title} from Step 1.`);
  },

  resetAllToBrandNew() {
    CURRICULUM_NODES.forEach(n => {
      this.state.nodeProgress[n.id] = { shields: 0, tier: 1, mastered: false, stars: 0 };
    });
    this.state.selectedNodeId = 1;
    this.state.squireNodeId = 1;
    localStorage.removeItem(STORAGE_KEY);
    this.saveState();
    this.switchView("map");
    this.renderMapAll();
    this.showToast("Game reset! The Squire is back at Mission 1 with 0 Seals.");
  },

  showToast(msg) {
    const existing = document.getElementById("qa-toast");
    if (existing) existing.remove();
    const toast = document.createElement("div");
    toast.id = "qa-toast";
    toast.className = "qa-toast";
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3200);
  },

  bindTwoTapConfirm(btnEl, labelEl, defaultLabel, armedLabel, onConfirm) {
    if (!btnEl) return;
    let armTimer = null;
    const disarm = () => {
      btnEl.dataset.armed = "0";
      btnEl.classList.remove("confirm-armed");
      if (labelEl) labelEl.textContent = defaultLabel;
      if (armTimer) {
        clearTimeout(armTimer);
        armTimer = null;
      }
    };
    btnEl.addEventListener("click", () => {
      if (btnEl.dataset.armed === "1") {
        disarm();
        onConfirm();
        return;
      }
      btnEl.dataset.armed = "1";
      btnEl.classList.add("confirm-armed");
      if (labelEl) labelEl.textContent = armedLabel;
      armTimer = setTimeout(disarm, 3500);
    });
  },

  // --------------------------------------------------------------------------
  // EVENT LISTENERS
  // --------------------------------------------------------------------------
  initDOMListeners() {
    document.getElementById("btn-home-logo").addEventListener("click", () => this.switchView("map"));
    document.getElementById("btn-map-view").addEventListener("click", () => this.switchView("map"));
    document.getElementById("btn-tabletop").addEventListener("click", () => this.switchView("tabletop"));
    document.getElementById("btn-close-tabletop").addEventListener("click", () => this.switchView("map"));

    document.getElementById("btn-sound-toggle").addEventListener("click", () => {
      this.state.soundEnabled = !this.state.soundEnabled;
      if (!this.state.soundEnabled) {
        this.stopCurrentAudio();
      }
      this.saveState();
      this.updateHeaderStatus();
    });

    const resetLevelBtn = document.getElementById("btn-reset-level");
    const resetLevelLabel = document.getElementById("reset-level-label");
    this.bindTwoTapConfirm(
      resetLevelBtn,
      resetLevelLabel,
      "Restart This Mission",
      "Tap Again to Restart Mission",
      () => this.resetCurrentLevel()
    );

    document.getElementById("btn-enter-node").addEventListener("click", () => {
      this.zoomIntoStronghold(this.state.selectedNodeId);
    });

    // Mode Switch (Lesson vs Play)
    document.getElementById("tab-learn").addEventListener("click", () => this.setStudioMode("learn"));
    document.getElementById("tab-trial").addEventListener("click", () => this.setStudioMode("trial"));

    // Dynamic Right-Hand Parent Sidebar Toggle (Shrinks left sheet, opens right drawer)
    document.getElementById("btn-open-parent-guide").addEventListener("click", () => {
      this.toggleParentSidebar();
    });
    document.getElementById("btn-close-parent-guide").addEventListener("click", () => {
      this.toggleParentSidebar(false);
    });

    // Difficulty Tier Pips inside Parent Sidebar: switch to Play mode and load a problem of that Tier while keeping sidebar open!
    document.querySelectorAll(".tier-pip").forEach(pip => {
      pip.addEventListener("click", () => {
        const tier = Number(pip.dataset.tier);
        const prog = this.getProgress(this.state.selectedNodeId);
        prog.tier = tier;
        this.updateTierPips();
        this.saveState();
        this.setStudioMode("trial", true);
        const tierNames = { 1: "Tier 1 (Concrete/Pictorial)", 2: "Tier 2 (Guided Mastery)", 3: "Tier 3 (Mental Math)" };
        this.showToast(`Loaded ${tierNames[tier] || "Tier " + tier} problem!`);
      });
    });

    // Lesson Prev / Next
    document.getElementById("btn-learn-prev").addEventListener("click", () => {
      if (this.state.learnStepIndex > 0) {
        this.state.learnStepIndex--;
        this.renderLearnStep();
      }
    });

    document.getElementById("btn-learn-next").addEventListener("click", () => {
      const node = this.getNode(this.state.selectedNodeId);
      if (this.state.learnStepIndex < node.learnSteps.length - 1) {
        this.state.learnStepIndex++;
        this.renderLearnStep();
      } else {
        this.setStudioMode("trial");
      }
    });

    // Quiet Parent Corner Controls in Play Mode
    const replayBtn = document.getElementById("btn-replay-voice");
    if (replayBtn) {
      replayBtn.addEventListener("click", () => this.replayCurrentVoice());
    }

    document.getElementById("btn-toggle-visual-hint").addEventListener("click", () => {
      this.visualHintVisible = !this.visualHintVisible;
      this.renderCurrentProblem();
    });

    document.getElementById("btn-grade-fluent").addEventListener("click", () => {
      if (this.currentProblem) {
        document.getElementById("main-equation-banner").innerHTML = this.currentProblem.solvedEquationHTML;
      }
      this.onCorrectAnswer();
    });

    document.getElementById("btn-new-problem").addEventListener("click", () => {
      this.loadNextProblem();
    });

    const openNodeTabletopBtn = document.getElementById("btn-open-node-tabletop");
    if (openNodeTabletopBtn) {
      openNodeTabletopBtn.addEventListener("click", () => {
        this.openNodeInTabletop(this.state.selectedNodeId);
      });
    }

    document.getElementById("btn-force-mastery").addEventListener("click", () => {
      const prog = this.getProgress(this.state.selectedNodeId);
      prog.shields = 5;
      prog.mastered = true;
      prog.stars = Math.min(3, (prog.stars || 0) + 1);
      this.renderShieldsProgress();
      this.saveState();
      this.openVictoryModal();
    });

    // Victory Modal: "Play Next Quest Here" resets shields to 0 for the next Star round!
    document.getElementById("btn-stay-practice").addEventListener("click", () => {
      this.closeModal("victory-modal");
      const prog = this.getProgress(this.state.selectedNodeId);
      prog.shields = 0;
      this.saveState();
      this.loadNextProblem(false);
    });

    document.getElementById("btn-march-onward").addEventListener("click", () => {
      this.zoomOutAndMarchToNext();
    });

    // Tabletop Tabs & Mode Toggle
    document.querySelectorAll(".tool-tab").forEach(tab => {
      tab.addEventListener("click", () => {
        this.tabletopTool = tab.dataset.tool;
        this.tabletopQuizProblem = null;
        this.renderTabletop();
      });
    });

    const expModeBtn = document.getElementById("tt-mode-explore");
    if (expModeBtn) expModeBtn.addEventListener("click", () => this.setTabletopMode("explore"));
    const qzModeBtn = document.getElementById("tt-mode-quiz");
    if (qzModeBtn) qzModeBtn.addEventListener("click", () => this.setTabletopMode("quiz"));

    // Placement / Levels Modal
    document.getElementById("btn-placement").addEventListener("click", () => {
      this.renderPlacementModal();
      this.openModal("placement-modal");
    });

    document.getElementById("btn-close-placement").addEventListener("click", () => {
      this.closeModal("placement-modal");
    });

    ["victory-modal", "placement-modal"].forEach(modalId => {
      const modalEl = document.getElementById(modalId);
      if (modalEl) {
        modalEl.addEventListener("close", () => modalEl.classList.add("hidden"));
        modalEl.addEventListener("click", (e) => {
          if (e.target === modalEl) this.closeModal(modalId);
        });
      }
    });

    document.getElementById("btn-unlock-all").addEventListener("click", () => {
      CURRICULUM_NODES.forEach(n => {
        this.state.nodeProgress[n.id] = { shields: 5, tier: 3, mastered: true, stars: 3 };
      });
      this.saveState();
      this.renderPlacementModal();
      this.renderMapAll();
    });

    const fullResetBtn = document.getElementById("btn-reset-progress");
    this.bindTwoTapConfirm(
      fullResetBtn,
      fullResetBtn,
      "Full Reset (Mission 1)",
      "Tap Again to Reset All Progress",
      () => {
        this.closeModal("placement-modal");
        this.resetAllToBrandNew();
        this.renderPlacementModal();
      }
    );
  }
};

if (typeof window !== "undefined") {
  window.App = App;
}

window.addEventListener("DOMContentLoaded", () => App.init());

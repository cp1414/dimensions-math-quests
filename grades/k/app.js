// ============================================================================
// PIP'S MEADOW & THE FOUR SEASONS GARDEN — KINDERGARTEN CONTROLLER
// ============================================================================

const K_STORAGE_KEY = "four_seasons_garden_v1";
const ACORNS_PER_WALK = 4;

const App = {
  state: {
    selectedNodeId: 1,
    pipNodeId: 1,
    currentView: "map",      // "map" | "studio" | "tabletop"
    studioMode: "learn",     // "learn" | "trial"
    learnStepIndex: 0,
    soundEnabled: true,
    nodeProgress: {}         // { [id]: { acorns: 0, tier: 1, mastered: false, stars: 0 } }
  },

  currentProblem: null,
  visualHintVisible: true,
  missedCurrentProblem: false,
  consecutiveMisses: 0,
  recentProblemKeys: [],
  recentPraiseIdx: -1,
  tabletopTool: "frames",
  tabletopMode: "explore",
  tabletopQuizProblem: null,
  tabletopState: {
    frameCount: 4,
    frameMax: 10,
    bondWhole: 6,
    bondPartA: 2,
    bondMissing: "none",
    addA: 4,
    addB: 3,
    subTake: 2,
    shapeKey: "triangle",
    patKind: "AB",
    balLeft: 5,
    balRight: 3,
    lenA: 6,
    lenB: 4,
    clkHour: 3,
    coinCounts: { 25: 0, 10: 1, 5: 1, 1: 2 }
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
        const hadController = !!navigator.serviceWorker.controller;
        let reloaded = false;
        navigator.serviceWorker.addEventListener("controllerchange", () => {
          if (hadController && !reloaded) {
            reloaded = true;
            window.location.reload();
          }
        });
        navigator.serviceWorker.register("../../sw.js", { scope: "../../", updateViaCache: "none" })
          .then((reg) => reg && reg.update && reg.update().catch(() => {}))
          .catch(() => {});
      }
    } catch (e) {}
  },

  loadState() {
    try {
      const raw = localStorage.getItem(K_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === "object") {
          this.state = Object.assign({}, this.state, parsed);
          this.state.nodeProgress = parsed.nodeProgress || {};
        }
      }
    } catch (e) {}
    SharedAudioEngine.setSoundEnabled(this.state.soundEnabled);
  },

  saveState() {
    try {
      localStorage.setItem(K_STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {}
  },

  getProgress(nodeId) {
    if (!this.state.nodeProgress[nodeId]) {
      this.state.nodeProgress[nodeId] = { acorns: 0, tier: 1, mastered: false, stars: 0 };
    }
    return this.state.nodeProgress[nodeId];
  },

  getNode(nodeId) {
    return GARDEN_NODES.find((n) => n.id === nodeId) || GARDEN_NODES[0];
  },

  isNodeUnlocked(nodeId) {
    if (nodeId === 1) return true;
    const prev = this.getProgress(nodeId - 1);
    if (prev.mastered) return true;
    const curr = this.getProgress(nodeId);
    return curr.acorns > 0 || curr.mastered;
  },

  mountStaticIcons() {
    const mapIcons = [
      ["header-crest-icon", "crest", 34],
      ["icon-map", "map", 20],
      ["icon-blocks", "blocks", 20],
      ["icon-compass", "compass", 20],
      ["icon-scroll", "scroll", 20],
      ["icon-chime", "speakerOn", 18]
    ];
    mapIcons.forEach(([id, key, size]) => {
      const el = document.getElementById(id);
      if (el) el.innerHTML = GardenVisuals.getIconSVG(key, size);
    });
    const owlEl = document.getElementById("owl-portrait-holder");
    if (owlEl) owlEl.innerHTML = GardenVisuals.getOwlPortraitSVG(48);
    const pipEl = document.getElementById("pip-svg-holder");
    if (pipEl) pipEl.innerHTML = GardenVisuals.getPipTokenSVG(42);
    const sealEl = document.getElementById("victory-seal-svg");
    if (sealEl) sealEl.innerHTML = GardenVisuals.getIconSVG("seal", 72);
  },

  openModal(modalId) {
    const el = document.getElementById(modalId);
    if (!el) return;
    el.classList.remove("hidden");
    if (typeof el.showModal === "function") {
      try { if (!el.open) el.showModal(); } catch (e) {}
    }
  },

  closeModal(modalId) {
    const el = document.getElementById(modalId);
    if (!el) return;
    el.classList.add("hidden");
    if (typeof el.close === "function") {
      try { if (el.open) el.close(); } catch (e) {}
    }
  },

  initDOMListeners() {
    const on = (id, ev, fn) => {
      const el = document.getElementById(id);
      if (el) el.addEventListener(ev, fn);
    };

    on("btn-home-logo", "click", () => this.switchView("map"));
    on("btn-map-view", "click", () => this.switchView("map"));
    on("btn-tabletop", "click", () => this.openTabletopView());
    on("btn-close-tabletop", "click", () => this.switchView("map"));
    on("btn-enter-node", "click", () => this.openNodeInStudio(this.state.selectedNodeId));
    on("btn-prev-walk", "click", () => this.stepSelectedWalk(-1));
    on("btn-next-walk", "click", () => this.stepSelectedWalk(1));

    document.querySelectorAll(".season-tab").forEach((tab) => {
      tab.addEventListener("click", () => {
        const targetId = parseInt(tab.dataset.seasonNode, 10);
        this.selectWalkAnimated(targetId);
      });
    });

    on("btn-sound-toggle", "click", () => {
      this.state.soundEnabled = !this.state.soundEnabled;
      SharedAudioEngine.setSoundEnabled(this.state.soundEnabled);
      this.saveState();
      this.updateHeaderStatus();
      if (this.state.soundEnabled) SharedAudioEngine.playChime("tap");
    });

    on("btn-replay-chime", "click", () => SharedAudioEngine.playChime("tap"));

    on("tab-learn", "click", () => this.setStudioMode("learn"));
    on("tab-trial", "click", () => this.setStudioMode("trial"));
    on("btn-learn-prev", "click", () => this.stepLearn(-1));
    on("btn-learn-next", "click", () => this.stepLearn(1));

    on("btn-toggle-visual-hint", "click", () => {
      this.visualHintVisible = !this.visualHintVisible;
      this.refreshVisualStageVisibility();
    });
    on("btn-grade-fluent", "click", () => {
      if (this.currentProblem) this.handleAnswerAttempt(this.currentProblem.answer, null, true);
    });
    on("btn-new-problem", "click", () => this.loadNextProblem(false));

    on("btn-open-parent-guide", "click", () => this.toggleParentSidebar());
    on("btn-close-parent-guide", "click", () => this.toggleParentSidebar(false));
    on("btn-open-node-tabletop", "click", () => this.openNodeInTabletop(this.state.selectedNodeId));
    on("btn-force-mastery", "click", () => this.completeWalkManually());
    on("btn-reset-level", "click", () => this.resetCurrentLevel());

    document.querySelectorAll(".tier-pip").forEach((btn) => {
      btn.addEventListener("click", () => {
        const tier = parseInt(btn.dataset.tier, 10);
        const prog = this.getProgress(this.state.selectedNodeId);
        prog.tier = tier;
        this.saveState();
        this.updateTierButtons();
        if (this.state.studioMode === "trial") this.loadNextProblem(false);
      });
    });

    on("btn-placement", "click", () => this.openWalkControl());
    on("btn-close-placement", "click", () => this.closeModal("placement-modal"));
    on("btn-unlock-all", "click", () => {
      GARDEN_NODES.forEach((n) => {
        const p = this.getProgress(n.id);
        p.acorns = ACORNS_PER_WALK;
        p.mastered = true;
        if (!p.stars) p.stars = 1;
      });
      this.saveState();
      this.renderWalkControlGrid();
      this.renderMap();
      this.updateHeaderStatus();
    });
    on("btn-reset-progress", "click", () => {
      this.state.nodeProgress = {};
      this.state.selectedNodeId = 1;
      this.state.pipNodeId = 1;
      this.saveState();
      this.closeModal("placement-modal");
      this.switchView("map");
      this.updateHeaderStatus();
    });

    on("btn-stay-practice", "click", () => {
      this.closeModal("victory-modal");
      const prog = this.getProgress(this.state.selectedNodeId);
      prog.acorns = 0;
      this.saveState();
      this.setStudioMode("trial");
    });
    on("btn-march-onward", "click", () => {
      this.closeModal("victory-modal");
      const nextId = Math.min(GARDEN_NODES.length, this.state.selectedNodeId + 1);
      this.state.selectedNodeId = nextId;
      this.state.pipNodeId = nextId;
      this.saveState();
      this.switchView("map");
    });

    document.querySelectorAll("#tabletop-tool-tabs .tool-tab").forEach((tab) => {
      tab.addEventListener("click", () => {
        this.tabletopTool = tab.dataset.tool;
        this.renderTabletop();
      });
    });
    on("tt-mode-explore", "click", () => this.setTabletopMode("explore"));
    on("tt-mode-quiz", "click", () => this.setTabletopMode("quiz"));
  },

  updateHeaderStatus() {
    let mastered = 0;
    GARDEN_NODES.forEach((n) => {
      if (this.getProgress(n.id).mastered) mastered++;
    });
    let rank = GARDEN_RANKS[0];
    for (let i = 0; i < GARDEN_RANKS.length; i++) {
      if (mastered >= GARDEN_RANKS[i].minWalks) rank = GARDEN_RANKS[i];
    }
    const rankIconEl = document.getElementById("pip-rank-icon");
    if (rankIconEl) rankIconEl.innerHTML = GardenVisuals.getIconSVG(rank.iconKey, 22);
    const rankTitleEl = document.getElementById("pip-rank-title");
    if (rankTitleEl) rankTitleEl.textContent = rank.title;
    const countEl = document.getElementById("mastered-count");
    if (countEl) countEl.textContent = String(mastered);

    const spkEl = document.getElementById("icon-speaker");
    if (spkEl) spkEl.innerHTML = GardenVisuals.getIconSVG(this.state.soundEnabled ? "speakerOn" : "speakerOff", 20);
  },

  switchView(viewName, save = true) {
    this.state.currentView = viewName;
    if (save) this.saveState();

    document.getElementById("map-screen").classList.toggle("active", viewName === "map");
    document.getElementById("studio-screen").classList.toggle("active", viewName === "studio");
    document.getElementById("tabletop-screen").classList.toggle("active", viewName === "tabletop");

    const mapBtn = document.getElementById("btn-map-view");
    if (mapBtn) mapBtn.classList.toggle("hidden", viewName === "map");

    if (viewName === "map") {
      this.renderMap();
    } else if (viewName === "tabletop") {
      this.renderTabletop();
    }
  },

  // ==================== 3D GARDEN RENDERING & GUIDED MOVEMENT ====================
  stepSelectedWalk(delta) {
    const nextId = Math.max(1, Math.min(GARDEN_NODES.length, this.state.selectedNodeId + delta));
    this.selectWalkAnimated(nextId);
  },

  selectWalkAnimated(nodeId) {
    this.state.selectedNodeId = nodeId;
    this.state.pipNodeId = nodeId;
    this.saveState();
    if (typeof Garden3D !== "undefined" && Garden3D.webglAvailable) {
      Garden3D.walkToNode(nodeId, false);
    }
    this.updateDockAndSeasonTabs();
  },

  updateDockAndSeasonTabs() {
    const sel = this.getNode(this.state.selectedNodeId);
    const dockIcon = document.getElementById("dock-node-icon");
    if (dockIcon) dockIcon.innerHTML = GardenVisuals.getIconSVG(sel.iconKey, 30);
    document.getElementById("dock-season-tag").textContent = `${sel.season} · ${sel.unitTag}`;
    document.getElementById("dock-node-title").textContent = sel.title;
    document.getElementById("dock-node-desc").textContent = sel.desc;
    const unlocked = this.isNodeUnlocked(sel.id);
    document.getElementById("btn-enter-node-label").textContent = unlocked ? "Start Walk →" : "Preview Walk →";

    const activeSeasonStart = sel.id <= 3 ? 1 : sel.id <= 6 ? 4 : sel.id <= 12 ? 7 : 13;
    document.querySelectorAll(".season-tab").forEach((tab) => {
      tab.classList.toggle("active", parseInt(tab.dataset.seasonNode, 10) === activeSeasonStart);
    });
  },

  renderMap() {
    const canvasHost = document.getElementById("garden-3d-canvas");
    const fallbackEl = document.getElementById("svg-map-fallback");
    let has3D = false;

    if (typeof Garden3D !== "undefined" && canvasHost) {
      has3D = Garden3D.init(canvasHost, GARDEN_NODES, {
        initialNodeId: this.state.selectedNodeId,
        getProgress: (id) => this.getProgress(id),
        onSelectNode: (id) => this.selectWalkAnimated(id),
        onEnterNode: (id) => this.openNodeInStudio(id)
      });
      if (has3D) {
        Garden3D.walkToNode(this.state.selectedNodeId, false);
      }
    }

    if (fallbackEl) {
      fallbackEl.classList.toggle("hidden", has3D);
      if (!has3D) {
        fallbackEl.innerHTML = GardenVisuals.renderGardenMapSVG(GARDEN_NODES);
      }
    }

    this.updateDockAndSeasonTabs();
  },

  // ==================== STUDIO MODE (LESSON + PLAY) ====================
  openNodeInStudio(nodeId) {
    this.state.selectedNodeId = nodeId;
    this.state.learnStepIndex = 0;
    this.visualHintVisible = true;
    this.consecutiveMisses = 0;
    this.missedCurrentProblem = false;
    this.saveState();

    const node = this.getNode(nodeId);
    document.getElementById("studio-unit-tag").textContent = `${node.season} · ${node.unitTag}`;
    document.getElementById("studio-node-name").textContent = node.title;
    document.getElementById("pg-level-title").textContent = node.title;

    document.getElementById("teacher-script-text").textContent = node.teacherGuide.script;
    document.getElementById("teacher-wonder-text").textContent = node.teacherGuide.wonder;
    document.getElementById("teacher-heuristic-text").textContent = node.teacherGuide.heuristic;
    document.getElementById("teacher-hands-on-text").textContent = node.teacherGuide.handsOn;

    this.switchView("studio");
    this.setStudioMode("learn");
  },

  setStudioMode(mode) {
    this.state.studioMode = mode;
    document.getElementById("tab-learn").classList.toggle("active", mode === "learn");
    document.getElementById("tab-trial").classList.toggle("active", mode === "trial");

    document.getElementById("lesson-nav-bar").classList.toggle("hidden", mode !== "learn");
    document.getElementById("play-interaction-bar").classList.toggle("hidden", mode !== "trial");

    this.renderAcornBar();
    this.updateTierButtons();

    if (mode === "learn") {
      this.visualHintVisible = true;
      this.renderLearnStep();
    } else {
      this.loadNextProblem(false);
    }
  },

  renderAcornBar() {
    const row = document.getElementById("acorns-row");
    if (!row) return;
    const prog = this.getProgress(this.state.selectedNodeId);
    let html = "";
    for (let i = 0; i < ACORNS_PER_WALK; i++) {
      const earned = i < prog.acorns;
      html += `<div class="acorn-slot${earned ? " earned" : ""}">
        ${GardenVisuals.getIconSVG(earned ? "acorn" : "starEmpty", 20)}
      </div>`;
    }
    row.innerHTML = html;
  },

  updateTierButtons() {
    const prog = this.getProgress(this.state.selectedNodeId);
    document.querySelectorAll(".tier-pip").forEach((btn) => {
      btn.classList.toggle("active", parseInt(btn.dataset.tier, 10) === prog.tier);
    });
  },

  stepLearn(delta) {
    const node = this.getNode(this.state.selectedNodeId);
    const nextIdx = this.state.learnStepIndex + delta;
    if (nextIdx >= node.learnSteps.length) {
      this.setStudioMode("trial");
      return;
    }
    this.state.learnStepIndex = Math.max(0, nextIdx);
    this.renderLearnStep();
  },

  renderLearnStep() {
    const node = this.getNode(this.state.selectedNodeId);
    const steps = node.learnSteps;
    const idx = Math.max(0, Math.min(steps.length - 1, this.state.learnStepIndex));
    this.state.learnStepIndex = idx;
    const step = steps[idx];

    document.getElementById("owl-step-tag").textContent = step.stageLabel;
    document.getElementById("owl-prompt-text").textContent = step.narrative;
    document.getElementById("main-equation-banner").innerHTML = step.equationHTML;
    GardenVisuals.renderMathVisual(document.getElementById("main-visual-stage"), step.visualSpec);
    document.getElementById("main-visual-stage").classList.remove("hidden");

    const dotsEl = document.getElementById("learn-step-dots");
    dotsEl.innerHTML = steps.map((_, i) => `<span class="step-dot${i === idx ? " active" : ""}"></span>`).join("");

    document.getElementById("btn-learn-prev").disabled = idx === 0;
    document.getElementById("btn-learn-next").textContent = idx === steps.length - 1 ? "Play & Practice →" : "Next →";

    const checkBar = document.getElementById("learn-check-bar");
    const checkChoices = document.getElementById("learn-check-choices");
    if (step.checkQuestion) {
      checkBar.classList.remove("hidden");
      document.getElementById("learn-check-label").textContent = step.checkQuestion.prompt;
      checkChoices.innerHTML = "";
      step.checkQuestion.choices.forEach((choice) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "learn-check-btn";
        btn.textContent = String(choice);
        btn.addEventListener("click", () => {
          if (choice === step.checkQuestion.answer) {
            btn.classList.add("correct");
            SharedAudioEngine.playChime("success");
          } else {
            btn.classList.add("wrong");
            SharedAudioEngine.playChime("encourage");
          }
        });
        checkChoices.appendChild(btn);
      });
    } else {
      checkBar.classList.add("hidden");
    }

    document.getElementById("pg-live-badge").textContent = "LESSON STAGE";
    document.getElementById("pg-live-coach-text").textContent = step.narrative;
  },

  generateUniqueProblem(node, tier) {
    let chosen = null;
    for (let attempt = 0; attempt < 15; attempt++) {
      const cand = node.generateProblem(tier);
      const sig = `${node.id}|${cand.equationHTML}|${cand.answer}|${cand.story}`;
      if (!this.recentProblemKeys.includes(sig)) {
        chosen = cand;
        this.recentProblemKeys.push(sig);
        if (this.recentProblemKeys.length > 10) this.recentProblemKeys.shift();
        break;
      }
      chosen = cand;
    }
    return chosen;
  },

  loadNextProblem(keepTier = false) {
    const node = this.getNode(this.state.selectedNodeId);
    const prog = this.getProgress(node.id);

    if (!keepTier) {
      if (prog.acorns >= 3) prog.tier = Math.max(prog.tier, 3);
      else if (prog.acorns >= 2) prog.tier = Math.max(prog.tier, 2);
    }
    this.updateTierButtons();

    this.missedCurrentProblem = false;
    this.visualHintVisible = true;
    const prob = this.generateUniqueProblem(node, prog.tier);
    this.currentProblem = prob;

    document.getElementById("owl-step-tag").textContent = `${node.unitTag} · Tier ${prog.tier}`;
    document.getElementById("owl-prompt-text").textContent = prob.story;
    document.getElementById("main-equation-banner").innerHTML = prob.equationHTML;
    GardenVisuals.renderMathVisual(document.getElementById("main-visual-stage"), prob.visualSpec);
    this.refreshVisualStageVisibility();

    const grid = document.getElementById("answer-choices-grid");
    grid.innerHTML = "";
    prob.choices.forEach((choice) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "choice-tile";
      btn.textContent = String(choice);
      btn.addEventListener("click", () => this.handleAnswerAttempt(choice, btn));
      grid.appendChild(btn);
    });

    document.getElementById("pg-live-badge").textContent = "PRACTICE QUESTION";
    document.getElementById("pg-live-coach-text").textContent = prob.story;
  },

  refreshVisualStageVisibility() {
    const stage = document.getElementById("main-visual-stage");
    const lbl = document.getElementById("visual-toggle-text");
    if (stage) stage.classList.toggle("hidden", !this.visualHintVisible);
    if (lbl) lbl.textContent = this.visualHintVisible ? "Hide Picture" : "Show Picture";
  },

  pickPraise() {
    let idx = Math.floor(Math.random() * OWL_PRAISE.length);
    if (idx === this.recentPraiseIdx) idx = (idx + 1) % OWL_PRAISE.length;
    this.recentPraiseIdx = idx;
    return OWL_PRAISE[idx];
  },

  handleAnswerAttempt(choice, btnEl, parentFluent = false) {
    if (!this.currentProblem) return;
    const node = this.getNode(this.state.selectedNodeId);
    const prog = this.getProgress(node.id);
    const isCorrect = choice === this.currentProblem.answer;

    if (isCorrect) {
      if (btnEl) btnEl.classList.add("correct");
      document.getElementById("main-equation-banner").innerHTML = this.currentProblem.solvedEquationHTML;

      if (!this.missedCurrentProblem || parentFluent) {
        this.consecutiveMisses = 0;
        prog.acorns = Math.min(ACORNS_PER_WALK, prog.acorns + 1);
        document.getElementById("owl-prompt-text").textContent = this.pickPraise();
        SharedAudioEngine.playChime("success");
      } else {
        document.getElementById("owl-prompt-text").textContent = "Good fixing! Let us try a fresh one for your next Acorn.";
        SharedAudioEngine.playChime("tap");
      }

      this.renderAcornBar();
      this.saveState();

      if (prog.acorns >= ACORNS_PER_WALK) {
        prog.mastered = true;
        prog.stars = Math.min(3, (prog.stars || 0) + 1);
        this.saveState();
        this.updateHeaderStatus();
        setTimeout(() => this.showVictoryModal(node, prog), 420);
      } else {
        setTimeout(() => this.loadNextProblem(false), 650);
      }
    } else {
      if (btnEl) btnEl.classList.add("wrong");
      this.missedCurrentProblem = true;
      this.consecutiveMisses++;
      this.visualHintVisible = true;
      this.refreshVisualStageVisibility();

      if (this.consecutiveMisses >= 2 && prog.tier > 1) {
        prog.tier -= 1;
        this.consecutiveMisses = 0;
        this.updateTierButtons();
        this.saveState();
      }
      document.getElementById("owl-prompt-text").textContent =
        OWL_ENCOURAGE[this.consecutiveMisses % OWL_ENCOURAGE.length];
      SharedAudioEngine.playChime("encourage");
    }
  },

  showVictoryModal(node, prog) {
    SharedAudioEngine.playChime("victory");
    document.getElementById("victory-node-title").textContent = `${node.title} — Complete!`;
    document.getElementById("victory-message").textContent =
      `“Well done, little Pip! You gathered all ${ACORNS_PER_WALK} Golden Acorns in ${node.shortName}. Let us continue down the meadow path!”`;
    const starsRow = document.getElementById("victory-stars-row");
    starsRow.innerHTML = [1, 2, 3]
      .map((s) => GardenVisuals.getIconSVG(s <= (prog.stars || 1) ? "star" : "starEmpty", 34))
      .join("");
    this.openModal("victory-modal");
  },

  toggleParentSidebar(forceState) {
    const sidebar = document.getElementById("parent-guide-modal");
    const btn = document.getElementById("btn-open-parent-guide");
    if (!sidebar) return;
    const shouldOpen = typeof forceState === "boolean" ? forceState : sidebar.classList.contains("collapsed");
    sidebar.classList.toggle("collapsed", !shouldOpen);
    if (btn) btn.classList.toggle("active", shouldOpen);
  },

  completeWalkManually() {
    const node = this.getNode(this.state.selectedNodeId);
    const prog = this.getProgress(node.id);
    prog.acorns = ACORNS_PER_WALK;
    prog.mastered = true;
    prog.stars = Math.max(1, prog.stars || 1);
    this.saveState();
    this.updateHeaderStatus();
    this.renderAcornBar();
    this.showVictoryModal(node, prog);
  },

  resetCurrentLevel() {
    const id = this.state.selectedNodeId;
    this.state.nodeProgress[id] = { acorns: 0, tier: 1, mastered: false, stars: 0 };
    this.state.learnStepIndex = 0;
    this.saveState();
    this.updateHeaderStatus();
    this.renderAcornBar();
    this.setStudioMode("learn");
  },

  openWalkControl() {
    this.renderWalkControlGrid();
    this.openModal("placement-modal");
  },

  renderWalkControlGrid() {
    const grid = document.getElementById("placement-grid");
    if (!grid) return;
    grid.innerHTML = "";
    GARDEN_NODES.forEach((node) => {
      const prog = this.getProgress(node.id);
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = `placement-item${prog.mastered ? " mastered" : ""}`;
      btn.innerHTML = `<div class="placement-item-tag">${node.unitTag}${prog.mastered ? " · Complete" : ""}</div>
        <div class="placement-item-title">${node.title}</div>`;
      btn.addEventListener("click", () => {
        this.closeModal("placement-modal");
        this.switchView("map", false);
        this.selectWalkAnimated(node.id);
      });
      grid.appendChild(btn);
    });
  },

  // ==================== GARDEN BLOCKS MANIPULATIVE MAT ====================
  openTabletopView() {
    this.switchView("tabletop");
  },

  openNodeInTabletop(nodeId) {
    const node = this.getNode(nodeId);
    this.tabletopTool = node.tabletopTool || "frames";
    this.switchView("tabletop");
  },

  setTabletopMode(mode) {
    this.tabletopMode = mode;
    document.getElementById("tt-mode-explore").classList.toggle("active", mode === "explore");
    document.getElementById("tt-mode-quiz").classList.toggle("active", mode === "quiz");
    if (mode === "quiz") this.generateTabletopQuiz();
    this.renderTabletop();
  },

  generateTabletopQuiz() {
    const tool = this.tabletopTool;
    if (tool === "frames") {
      const n = kRandInt(1, 10);
      this.tabletopQuizProblem = {
        prompt: "PRACTICE PROMPT: How many berries are in the frame?",
        spec: n <= 5 ? { type: "five-frame", count: n, itemType: "berry" } : { type: "ten-frame", count: n, itemType: "berry", partA: 5 },
        answer: n,
        choices: makeNumericChoices(n, 0, 10)
      };
    } else if (tool === "bonds") {
      const w = kRandInt(4, 10);
      const a = kRandInt(1, w - 1);
      const b = w - a;
      this.tabletopQuizProblem = {
        prompt: `PRACTICE PROMPT: Whole is ${w} and one Part is ${a}. Find the missing Part!`,
        spec: { type: "number-bond", whole: w, partA: a, partB: b, missing: "partB", showDots: true },
        answer: b,
        choices: makeNumericChoices(b, 0, 10)
      };
    } else if (tool === "addsub") {
      const a = kRandInt(2, 6);
      const b = kRandInt(1, 10 - a);
      this.tabletopQuizProblem = {
        prompt: `PRACTICE PROMPT: What is ${a} + ${b}?`,
        spec: { type: "ten-frame", count: a + b, itemType: "apple", partA: a },
        answer: a + b,
        choices: makeNumericChoices(a + b, 2, 10)
      };
    } else if (tool === "shapespat") {
      const s = kPick([
        { key: "triangle", name: "Triangle" },
        { key: "square", name: "Square" },
        { key: "hexagon", name: "Hexagon" },
        { key: "cylinder", name: "Cylinder" }
      ]);
      this.tabletopQuizProblem = {
        prompt: "PRACTICE PROMPT: Which shape is shown here?",
        spec: { type: "shapes", shapeKey: s.key, showVertices: true },
        answer: s.name,
        choices: ["Triangle", "Square", "Hexagon", "Cylinder"]
      };
    } else if (tool === "balance") {
      const lw = kPick([2, 8]);
      const rw = lw === 2 ? 8 : 2;
      const ans = lw > rw ? "Apple" : "Acorn";
      this.tabletopQuizProblem = {
        prompt: "PRACTICE PROMPT: Which side of the balance scale is HEAVIER?",
        spec: { type: "pan-balance", leftItem: "apple", leftWeight: lw, rightItem: "acorn", rightWeight: rw, leftLabel: "Apple", rightLabel: "Acorn" },
        answer: ans,
        choices: ["Apple", "Acorn", "Equal", "Neither"]
      };
    } else {
      const h = kRandInt(1, 12);
      const ans = `${h}:00`;
      const set = new Set([ans]);
      while (set.size < 4) set.add(`${kRandInt(1, 12)}:00`);
      this.tabletopQuizProblem = {
        prompt: "PRACTICE PROMPT: What time does the garden clock show?",
        spec: { type: "clock-hour", hour: h, minutes: 0, skyPhase: "Practice Clock" },
        answer: ans,
        choices: Array.from(set).sort((a, b) => parseInt(a, 10) - parseInt(b, 10))
      };
    }
  },

  renderTabletop() {
    document.querySelectorAll("#tabletop-tool-tabs .tool-tab").forEach((tab) => {
      tab.classList.toggle("active", tab.dataset.tool === this.tabletopTool);
    });
    const ws = document.getElementById("tabletop-workspace");
    if (!ws) return;

    if (this.tabletopMode === "quiz") {
      if (!this.tabletopQuizProblem) this.generateTabletopQuiz();
      const q = this.tabletopQuizProblem;
      ws.innerHTML = `<div class="tt-prompt-bar">${q.prompt}</div>
        <div class="tt-stage" id="tt-quiz-stage"></div>
        <div class="tt-controls" id="tt-quiz-choices"></div>`;
      GardenVisuals.renderMathVisual(document.getElementById("tt-quiz-stage"), q.spec);
      const chEl = document.getElementById("tt-quiz-choices");
      q.choices.forEach((c) => {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "choice-tile";
        b.style.minWidth = "120px";
        b.style.padding = "0 16px";
        b.textContent = String(c);
        b.addEventListener("click", () => {
          if (c === q.answer) {
            b.classList.add("correct");
            SharedAudioEngine.playChime("success");
            setTimeout(() => {
              this.generateTabletopQuiz();
              this.renderTabletop();
            }, 600);
          } else {
            b.classList.add("wrong");
            SharedAudioEngine.playChime("encourage");
          }
        });
        chEl.appendChild(b);
      });
      return;
    }

    // Explore & Teach Sandbox Mode
    const st = this.tabletopState;
    let promptText = "";
    let spec = null;
    let controlsHTML = "";

    if (this.tabletopTool === "frames") {
      promptText = `TEACHING PROMPT: Tap + or - to show numbers on a ${st.frameMax === 5 ? "5-Frame" : "10-Frame"} (${st.frameCount} shown).`;
      spec = st.frameMax === 5
        ? { type: "five-frame", count: Math.min(5, st.frameCount), itemType: "acorn" }
        : { type: "ten-frame", count: Math.min(10, st.frameCount), itemType: "berry", partA: 5 };
      controlsHTML = `
        <button class="tt-ctrl-btn${st.frameMax === 5 ? " active" : ""}" data-act="fmax5">5-Frame</button>
        <button class="tt-ctrl-btn${st.frameMax === 10 ? " active" : ""}" data-act="fmax10">10-Frame</button>
        <button class="tt-ctrl-btn" data-act="fminus">− 1</button>
        <button class="tt-ctrl-btn" data-act="fplus">+ 1</button>`;
    } else if (this.tabletopTool === "bonds") {
      const partB = st.bondWhole - st.bondPartA;
      promptText = `TEACHING PROMPT: Whole = ${st.bondWhole}. Split it into ${st.bondPartA} and ${partB}!`;
      spec = { type: "number-bond", whole: st.bondWhole, partA: st.bondPartA, partB, missing: st.bondMissing, showDots: true };
      controlsHTML = `
        <button class="tt-ctrl-btn" data-act="bwMinus">Whole −</button>
        <button class="tt-ctrl-btn" data-act="bwPlus">Whole +</button>
        <button class="tt-ctrl-btn" data-act="baMinus">Part A −</button>
        <button class="tt-ctrl-btn" data-act="baPlus">Part A +</button>
        <button class="tt-ctrl-btn" data-act="bToggleHide">${st.bondMissing === "none" ? "Hide Part B" : "Show All"}</button>`;
    } else if (this.tabletopTool === "addsub") {
      const total = Math.min(10, st.addA + st.addB);
      promptText = `TEACHING PROMPT: ${st.addA} + ${st.addB} = ${total} (or cross out ${st.subTake} to practice subtraction!).`;
      spec = { type: "ten-frame", count: total, itemType: "apple", partA: st.addA, crossOut: Math.min(total, st.subTake) };
      controlsHTML = `
        <button class="tt-ctrl-btn" data-act="addA">Part A (${st.addA}) +</button>
        <button class="tt-ctrl-btn" data-act="addB">Part B (${st.addB}) +</button>
        <button class="tt-ctrl-btn" data-act="crossMore">Cross Out (${st.subTake}) +</button>
        <button class="tt-ctrl-btn" data-act="crossClear">Clear Cross-Outs</button>`;
    } else if (this.tabletopTool === "shapespat") {
      promptText = `TEACHING PROMPT: Inspect corners and faces of 2D & 3D shapes (${st.shapeKey}).`;
      spec = { type: "shapes", shapeKey: st.shapeKey, showVertices: true };
      controlsHTML = ["circle", "triangle", "square", "rectangle", "hexagon", "sphere", "cube", "cylinder", "cone"]
        .map((s) => `<button class="tt-ctrl-btn${st.shapeKey === s ? " active" : ""}" data-shape="${s}">${s}</button>`)
        .join("");
    } else if (this.tabletopTool === "balance") {
      promptText = `TEACHING PROMPT: Compare weights on the pinewood balance scale (Left: ${st.balLeft}, Right: ${st.balRight}).`;
      spec = { type: "pan-balance", leftItem: "apple", leftWeight: st.balLeft, rightItem: "acorn", rightWeight: st.balRight, leftLabel: `Left (${st.balLeft})`, rightLabel: `Right (${st.balRight})` };
      controlsHTML = `
        <button class="tt-ctrl-btn" data-act="blMinus">Left −</button>
        <button class="tt-ctrl-btn" data-act="blPlus">Left +</button>
        <button class="tt-ctrl-btn" data-act="brMinus">Right −</button>
        <button class="tt-ctrl-btn" data-act="brPlus">Right +</button>`;
    } else {
      promptText = `TEACHING PROMPT: Practice reading ${st.clkHour}:00 (${st.clkHour} o'clock) on the garden clock.`;
      spec = { type: "clock-hour", hour: st.clkHour, minutes: 0, skyPhase: `${st.clkHour} o'clock` };
      controlsHTML = `
        <button class="tt-ctrl-btn" data-act="hrPrev">− 1 Hour</button>
        <button class="tt-ctrl-btn" data-act="hrNext">+ 1 Hour</button>`;
    }

    ws.innerHTML = `<div class="tt-prompt-bar">${promptText}</div>
      <div class="tt-stage" id="tt-explore-stage"></div>
      <div class="tt-controls" id="tt-explore-controls">${controlsHTML}</div>`;

    GardenVisuals.renderMathVisual(document.getElementById("tt-explore-stage"), spec);

    ws.querySelectorAll("[data-shape]").forEach((btn) => {
      btn.addEventListener("click", () => {
        st.shapeKey = btn.dataset.shape;
        this.renderTabletop();
      });
    });

    ws.querySelectorAll("[data-act]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const a = btn.dataset.act;
        if (a === "fmax5") { st.frameMax = 5; st.frameCount = Math.min(5, st.frameCount); }
        if (a === "fmax10") { st.frameMax = 10; }
        if (a === "fminus") st.frameCount = Math.max(0, st.frameCount - 1);
        if (a === "fplus") st.frameCount = Math.min(st.frameMax, st.frameCount + 1);
        if (a === "bwMinus") { st.bondWhole = Math.max(2, st.bondWhole - 1); st.bondPartA = Math.min(st.bondPartA, st.bondWhole - 1); }
        if (a === "bwPlus") st.bondWhole = Math.min(10, st.bondWhole + 1);
        if (a === "baMinus") st.bondPartA = Math.max(0, st.bondPartA - 1);
        if (a === "baPlus") st.bondPartA = Math.min(st.bondWhole, st.bondPartA + 1);
        if (a === "bToggleHide") st.bondMissing = st.bondMissing === "none" ? "partB" : "none";
        if (a === "addA") st.addA = (st.addA % 5) + 1;
        if (a === "addB") st.addB = (st.addB % 5) + 1;
        if (a === "crossMore") st.subTake = (st.subTake + 1) % 6;
        if (a === "crossClear") st.subTake = 0;
        if (a === "blMinus") st.balLeft = Math.max(1, st.balLeft - 1);
        if (a === "blPlus") st.balLeft = Math.min(10, st.balLeft + 1);
        if (a === "brMinus") st.balRight = Math.max(1, st.balRight - 1);
        if (a === "brPlus") st.balRight = Math.min(10, st.balRight + 1);
        if (a === "hrPrev") st.clkHour = st.clkHour === 1 ? 12 : st.clkHour - 1;
        if (a === "hrNext") st.clkHour = st.clkHour === 12 ? 1 : st.clkHour + 1;
        this.renderTabletop();
      });
    });
  }
};

if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", () => App.init());
}

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
  manualTierLock: false,
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
    subTake: 0,
    shapeTab: "shapes",
    shapeKey: "triangle",
    patKind: "AB",
    posRel: "above",
    balanceTab: "weight",
    balLeft: 5,
    balRight: 3,
    lenA: 6,
    lenB: 4,
    capLeftMore: true,
    tcTab: "clock",
    tensCount: 3,
    onesCount: 4,
    clkHour: 3,
    coinsList: [10, 5, 1, 1]
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
    HearthPWA.registerServiceWorker("../../sw.js", "../../");
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
    HearthPWA.openDialog(modalId);
  },

  closeModal(modalId) {
    HearthPWA.closeDialog(modalId);
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
        this.manualTierLock = true;
        this.consecutiveMisses = 0;
        this.saveState();
        this.updateTierButtons();
        if (this.state.studioMode === "trial") this.loadNextProblem(true);
      });
    });

    on("btn-placement", "click", () => this.openWalkControl());
    on("btn-close-placement", "click", () => this.closeModal("placement-modal"));
    HearthPWA.bindDialogDismiss(["victory-modal", "placement-modal"]);
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
      prog.tier = 1;
      this.consecutiveMisses = 0;
      this.manualTierLock = false;
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
        this.tabletopQuizProblem = null;
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
    this.manualTierLock = false;
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
          checkChoices.querySelectorAll(".learn-check-btn").forEach((b) => b.classList.remove("wrong"));
          if (choice === step.checkQuestion.answer) {
            btn.classList.add("correct");
            const okMsg = step.checkQuestion.coachText || "Spot on! That matches the picture cleanly.";
            document.getElementById("owl-prompt-text").textContent = okMsg;
            document.getElementById("pg-live-coach-text").textContent = okMsg;
            if (step.checkQuestion.solvedEquationHTML) {
              document.getElementById("main-equation-banner").innerHTML = step.checkQuestion.solvedEquationHTML;
            }
            SharedAudioEngine.playChime("success");
          } else {
            btn.classList.add("wrong");
            const tryMsg = "Look closely at the picture above and try one of the other choices!";
            document.getElementById("owl-prompt-text").textContent = tryMsg;
            document.getElementById("pg-live-coach-text").textContent = tryMsg;
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
      // Preserve parent overrides and 2-miss step-downs rather than snapping upward on reload.
      prog.tier = Math.max(1, Math.min(3, prog.tier || 1));
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
        if (!this.manualTierLock) {
          if (prog.acorns >= 3) prog.tier = Math.max(prog.tier, 3);
          else if (prog.acorns >= 2) prog.tier = Math.max(prog.tier, 2);
        }
        this.updateTierButtons();
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
    this.consecutiveMisses = 0;
    this.manualTierLock = false;
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
    this.tabletopQuizProblem = null;
    if (nodeId === 1) this.tabletopState.shapeTab = "position";
    else if (nodeId === 4) this.tabletopState.shapeTab = "shapes";
    else if (nodeId === 14) this.tabletopState.tcTab = "tens";
    else if (nodeId === 15) this.tabletopState.tcTab = "clock";
    else if (nodeId === 16 || nodeId === 17) this.tabletopState.tcTab = "coins";
    if (nodeId === 8) {
      this.tabletopState.frameMax = 20;
      this.tabletopState.frameCount = Math.max(11, this.tabletopState.frameCount);
    }
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
      const modeRoll = kRandInt(0, 2);
      if (modeRoll === 2) {
        const n = kRandInt(11, 20);
        this.tabletopQuizProblem = {
          prompt: "PRACTICE PROMPT: Count on from the full frame of 10! How many altogether?",
          spec: { type: "double-ten-frame", count: n, itemType: "acorn", showLabels: false },
          answer: n,
          choices: makeNumericChoices(n, 10, 20)
        };
      } else {
        const n = kRandInt(0, 10);
        this.tabletopQuizProblem = {
          prompt: "PRACTICE PROMPT: How many berries are in the frame?",
          spec: n <= 5 ? { type: "five-frame", count: n, itemType: "berry" } : { type: "ten-frame", count: n, itemType: "berry", partA: 5 },
          answer: n,
          choices: makeNumericChoices(n, 0, 10)
        };
      }
    } else if (tool === "bonds") {
      const w = kRandInt(4, 10);
      const a = kRandInt(0, w);
      const b = w - a;
      const missing = kPick(["whole", "partA", "partB"]);
      const showDots = kRandInt(0, 1) === 1;
      if (missing === "whole") {
        this.tabletopQuizProblem = {
          prompt: `PRACTICE PROMPT: Parts are ${a} and ${b}. What is the Whole?`,
          spec: { type: "number-bond", whole: w, partA: a, partB: b, missing: "whole", showDots },
          answer: w,
          choices: makeNumericChoices(w, 1, 10)
        };
      } else if (missing === "partA") {
        this.tabletopQuizProblem = {
          prompt: `PRACTICE PROMPT: Whole is ${w} and one Part is ${b}. Find the missing Part!`,
          spec: { type: "number-bond", whole: w, partA: a, partB: b, missing: "partA", showDots },
          answer: a,
          choices: makeNumericChoices(a, 0, 10)
        };
      } else {
        this.tabletopQuizProblem = {
          prompt: `PRACTICE PROMPT: Whole is ${w} and one Part is ${a}. Find the missing Part!`,
          spec: { type: "number-bond", whole: w, partA: a, partB: b, missing: "partB", showDots },
          answer: b,
          choices: makeNumericChoices(b, 0, 10)
        };
      }
    } else if (tool === "addsub") {
      const kind = kPick(["add", "sub", "story"]);
      if (kind === "add") {
        const a = kRandInt(2, 6);
        const b = kRandInt(1, 10 - a);
        this.tabletopQuizProblem = {
          prompt: `PRACTICE PROMPT: What is ${a} + ${b}?`,
          spec: { type: "ten-frame", count: a + b, itemType: "apple", partA: a },
          answer: a + b,
          choices: makeNumericChoices(a + b, 2, 10)
        };
      } else if (kind === "sub") {
        const w = kRandInt(5, 10);
        const t = kRandInt(1, w - 1);
        this.tabletopQuizProblem = {
          prompt: `PRACTICE PROMPT: ${w} apples, and ${t} are crossed out. What is ${w} − ${t}?`,
          spec: { type: "ten-frame", count: w, itemType: "apple", partA: w, crossOut: t },
          answer: w - t,
          choices: makeNumericChoices(w - t, 0, 9)
        };
      } else {
        const isAdd = kRandInt(0, 1) === 1;
        if (isAdd) {
          const a = kRandInt(2, 5);
          const b = kRandInt(1, 9 - a);
          this.tabletopQuizProblem = {
            prompt: `PRACTICE PROMPT: Pip had ${a} honey jars and packed ${b} MORE. How many altogether?`,
            spec: { type: "story-scene", countA: a, itemA: "honeyjar", labelA: `First (${a})`, countB: b, itemB: "honeyjar", labelB: `${b} More Join` },
            answer: a + b,
            choices: makeNumericChoices(a + b, 2, 10)
          };
        } else {
          const w = kRandInt(5, 9);
          const t = kRandInt(1, w - 1);
          this.tabletopQuizProblem = {
            prompt: `PRACTICE PROMPT: Pip brought ${w} berries and shared ${t}. How many berries remain?`,
            spec: { type: "story-scene", countA: w, itemA: "berry", labelA: `At Start (${w})`, countB: t, itemB: "berry", labelB: `${t} Shared` },
            answer: w - t,
            choices: makeNumericChoices(w - t, 0, 9)
          };
        }
      }
    } else if (tool === "shapespat") {
      const kind = kPick(["shape", "pattern", "position"]);
      if (kind === "shape") {
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
      } else if (kind === "pattern") {
        const pats = [
          { seq: [{ itemType: "acorn" }, { itemType: "leaf" }, { itemType: "acorn" }, { itemType: "leaf" }], ans: "Acorn" },
          { seq: [{ itemType: "berry" }, { itemType: "berry" }, { itemType: "daisy" }, { itemType: "berry" }, { itemType: "berry" }], ans: "Daisy" },
          { seq: [{ itemType: "acorn" }, { itemType: "leaf" }, { itemType: "berry" }, { itemType: "acorn" }, { itemType: "leaf" }], ans: "Berry" }
        ];
        const p = kPick(pats);
        this.tabletopQuizProblem = {
          prompt: "PRACTICE PROMPT: Chant the repeating pattern! What comes next?",
          spec: { type: "pattern-row", tokens: p.seq, showQuestion: true },
          answer: p.ans,
          choices: makeWordChoices(p.ans, ["Acorn", "Leaf", "Berry", "Daisy"])
        };
      } else {
        const rel = kPick(["above", "below", "beside"]);
        const labelMap = { above: "Above", below: "Below", beside: "Beside" };
        this.tabletopQuizProblem = {
          prompt: "PRACTICE PROMPT: Where is the ladybug compared to the cube?",
          spec: { type: "shapes", mode: "position", relation: rel, topItem: "ladybug", baseShape: "cube" },
          answer: labelMap[rel],
          choices: ["Above", "Below", "Beside", "Inside"]
        };
      }
    } else if (tool === "balance") {
      const kind = kPick(["weight", "length", "capacity"]);
      if (kind === "weight") {
        const lw = kPick([2, 8]);
        const rw = lw === 2 ? 8 : 2;
        const ans = lw > rw ? "Apple" : "Acorn";
        this.tabletopQuizProblem = {
          prompt: "PRACTICE PROMPT: Which side of the balance scale is HEAVIER?",
          spec: { type: "pan-balance", leftItem: "apple", leftWeight: lw, rightItem: "acorn", rightWeight: rw, leftLabel: "Apple", rightLabel: "Acorn" },
          answer: ans,
          choices: ["Apple", "Acorn", "Equal", "Neither"]
        };
      } else if (kind === "length") {
        const lenA = kRandInt(4, 8);
        let lenB = kRandInt(2, 7);
        if (lenA === lenB) lenB = Math.max(2, lenA - 2);
        const ans = lenA > lenB ? "Pine Stick" : "Oak Twig";
        this.tabletopQuizProblem = {
          prompt: "PRACTICE PROMPT: Compare both lined-up sticks. Which one is LONGER?",
          spec: { type: "length-compare", labelA: "Pine Stick", lenA, labelB: "Oak Twig", lenB },
          answer: ans,
          choices: ["Pine Stick", "Oak Twig", "Same Length", "Zero"]
        };
      } else {
        const leftBig = kRandInt(0, 1) === 1;
        this.tabletopQuizProblem = {
          prompt: "PRACTICE PROMPT: Which container holds MORE water?",
          spec: {
            type: "capacity-jars",
            leftLabel: leftBig ? "Big Pitcher" : "Small Cup",
            leftFill: leftBig ? 85 : 25,
            rightLabel: leftBig ? "Small Cup" : "Big Pitcher",
            rightFill: leftBig ? 25 : 85
          },
          answer: "Big Pitcher",
          choices: ["Big Pitcher", "Small Cup", "Same Amount", "Empty"]
        };
      }
    } else {
      const kind = kPick(["tens", "clock", "coins"]);
      if (kind === "tens") {
        const t = kRandInt(2, 9);
        const o = kRandInt(0, 9);
        const val = t * 10 + o;
        this.tabletopQuizProblem = {
          prompt: "PRACTICE PROMPT: Count the baskets of 10 first, then the loose ones! What number is shown?",
          spec: { type: "tens-ones-100", tens: t, ones: o },
          answer: val,
          choices: makeNumericChoices(val, 15, 99)
        };
      } else if (kind === "coins") {
        const combos = [[1, 1, 1], [5, 5], [10, 10], [10, 5], [25, 1]];
        const coins = kPick(combos);
        const total = coins.reduce((a, b) => a + b, 0);
        this.tabletopQuizProblem = {
          prompt: "PRACTICE PROMPT: Count these coins by look and size! How many cents in all?",
          spec: { type: "coins", coins, showLabels: false },
          answer: total,
          choices: makeNumericChoices(total, 1, 35)
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
      const fMax = st.frameMax;
      st.frameCount = Math.min(fMax, st.frameCount);
      promptText = `TEACHING PROMPT: Tap + or - on a ${fMax === 5 ? "5-Frame" : fMax === 10 ? "10-Frame" : "Double 10-Frame (Teens)"} — ${st.frameCount} shown.`;
      spec = fMax === 5
        ? { type: "five-frame", count: st.frameCount, itemType: "acorn" }
        : fMax === 10
          ? { type: "ten-frame", count: st.frameCount, itemType: "berry", partA: 5 }
          : { type: "double-ten-frame", count: st.frameCount, itemType: "acorn", showLabels: true };
      controlsHTML = `
        <button class="tt-ctrl-btn${fMax === 5 ? " active" : ""}" data-act="fmax5">5-Frame</button>
        <button class="tt-ctrl-btn${fMax === 10 ? " active" : ""}" data-act="fmax10">10-Frame</button>
        <button class="tt-ctrl-btn${fMax === 20 ? " active" : ""}" data-act="fmax20">20-Frame (Teens)</button>
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
      st.subTake = Math.min(total, st.subTake);
      promptText = st.subTake > 0
        ? `TEACHING PROMPT: Start with ${total} apples, cross out ${st.subTake}: ${total} − ${st.subTake} = ${total - st.subTake}!`
        : `TEACHING PROMPT: ${st.addA} + ${st.addB} = ${total} (tap Cross Out + to explore take-away!).`;
      spec = { type: "ten-frame", count: total, itemType: "apple", partA: st.addA, crossOut: st.subTake };
      controlsHTML = `
        <button class="tt-ctrl-btn" data-act="addA">Part A (${st.addA}) +</button>
        <button class="tt-ctrl-btn" data-act="addB">Part B (${st.addB}) +</button>
        <button class="tt-ctrl-btn" data-act="crossMore">Cross Out (${st.subTake}) +</button>
        <button class="tt-ctrl-btn" data-act="crossClear">Clear Cross-Outs</button>`;
    } else if (this.tabletopTool === "shapespat") {
      const subBar = `
        <button class="tt-ctrl-btn${st.shapeTab === "shapes" ? " active" : ""}" data-act="spShapes">2D &amp; 3D Shapes</button>
        <button class="tt-ctrl-btn${st.shapeTab === "pattern" ? " active" : ""}" data-act="spPattern">Patterns</button>
        <button class="tt-ctrl-btn${st.shapeTab === "position" ? " active" : ""}" data-act="spPosition">Position &amp; L/R</button>`;
      if (st.shapeTab === "pattern") {
        const patMap = {
          AB: { desc: "A – B – A – B", tokens: [{ itemType: "acorn" }, { itemType: "leaf" }, { itemType: "acorn" }, { itemType: "leaf" }] },
          AAB: { desc: "A – A – B – A – A", tokens: [{ itemType: "berry" }, { itemType: "berry" }, { itemType: "daisy" }, { itemType: "berry" }, { itemType: "berry" }] },
          ABC: { desc: "A – B – C – A – B", tokens: [{ itemType: "acorn" }, { itemType: "leaf" }, { itemType: "berry" }, { itemType: "acorn" }, { itemType: "leaf" }] }
        };
        const pat = patMap[st.patKind] || patMap.AB;
        promptText = `TEACHING PROMPT: Chant the ${st.patKind} pattern (${pat.desc}) and ask what belongs in ? next!`;
        spec = { type: "pattern-row", tokens: pat.tokens, showQuestion: true };
        controlsHTML = `${subBar}
          <button class="tt-ctrl-btn${st.patKind === "AB" ? " active" : ""}" data-pat="AB">AB Pattern</button>
          <button class="tt-ctrl-btn${st.patKind === "AAB" ? " active" : ""}" data-pat="AAB">AAB Pattern</button>
          <button class="tt-ctrl-btn${st.patKind === "ABC" ? " active" : ""}" data-pat="ABC">ABC Pattern</button>`;
      } else if (st.shapeTab === "position") {
        if (st.posRel === "leftright") {
          promptText = `TEACHING PROMPT: Point to Pip’s LEFT oak acorn and RIGHT berry!`;
          spec = { type: "left-right", leftItem: "acorn", rightItem: "berry", showSideLabels: true };
        } else {
          promptText = `TEACHING PROMPT: Look where the ladybug sits (${st.posRel.toUpperCase()} the cube)!`;
          spec = { type: "shapes", mode: "position", relation: st.posRel, topItem: "ladybug", baseShape: "cube" };
        }
        controlsHTML = `${subBar}
          <button class="tt-ctrl-btn${st.posRel === "above" ? " active" : ""}" data-pos="above">Above</button>
          <button class="tt-ctrl-btn${st.posRel === "below" ? " active" : ""}" data-pos="below">Below</button>
          <button class="tt-ctrl-btn${st.posRel === "beside" ? " active" : ""}" data-pos="beside">Beside</button>
          <button class="tt-ctrl-btn${st.posRel === "leftright" ? " active" : ""}" data-pos="leftright">Left / Right</button>`;
      } else {
        promptText = `TEACHING PROMPT: Inspect corners and faces of 2D & 3D shapes (${st.shapeKey}).`;
        spec = { type: "shapes", shapeKey: st.shapeKey, showVertices: true };
        controlsHTML = subBar + ["circle", "triangle", "square", "rectangle", "hexagon", "sphere", "cube", "cylinder", "cone"]
          .map((s) => `<button class="tt-ctrl-btn${st.shapeKey === s ? " active" : ""}" data-shape="${s}">${s}</button>`)
          .join("");
      }
    } else if (this.tabletopTool === "balance") {
      const subBar = `
        <button class="tt-ctrl-btn${st.balanceTab === "weight" ? " active" : ""}" data-act="balWeight">Scale</button>
        <button class="tt-ctrl-btn${st.balanceTab === "length" ? " active" : ""}" data-act="balLength">Length Bars</button>
        <button class="tt-ctrl-btn${st.balanceTab === "capacity" ? " active" : ""}" data-act="balCapacity">Capacity</button>`;
      if (st.balanceTab === "length") {
        promptText = `TEACHING PROMPT: Compare Pine Stick (${st.lenA} blocks) vs Oak Twig (${st.lenB} blocks) lined up on the left!`;
        spec = { type: "length-compare", labelA: "Pine Stick", lenA: st.lenA, labelB: "Oak Twig", lenB: st.lenB };
        controlsHTML = `${subBar}
          <button class="tt-ctrl-btn" data-act="laMinus">Pine −</button>
          <button class="tt-ctrl-btn" data-act="laPlus">Pine +</button>
          <button class="tt-ctrl-btn" data-act="lbMinus">Oak −</button>
          <button class="tt-ctrl-btn" data-act="lbPlus">Oak +</button>`;
      } else if (st.balanceTab === "capacity") {
        promptText = `TEACHING PROMPT: Compare the tall handled Pitcher vs the small Cup—which holds MORE water?`;
        spec = {
          type: "capacity-jars",
          leftLabel: st.capLeftMore ? "Tall Pitcher" : "Small Cup",
          leftFill: st.capLeftMore ? 85 : 25,
          rightLabel: st.capLeftMore ? "Small Cup" : "Tall Pitcher",
          rightFill: st.capLeftMore ? 25 : 85
        };
        controlsHTML = `${subBar}
          <button class="tt-ctrl-btn" data-act="capSwap">Swap Pitcher &amp; Cup</button>`;
      } else {
        promptText = `TEACHING PROMPT: Compare weights on the pinewood balance scale (Left: ${st.balLeft}, Right: ${st.balRight}).`;
        spec = { type: "pan-balance", leftItem: "apple", leftWeight: st.balLeft, rightItem: "acorn", rightWeight: st.balRight, leftLabel: `Left (${st.balLeft})`, rightLabel: `Right (${st.balRight})` };
        controlsHTML = `${subBar}
          <button class="tt-ctrl-btn" data-act="blMinus">Left −</button>
          <button class="tt-ctrl-btn" data-act="blPlus">Left +</button>
          <button class="tt-ctrl-btn" data-act="brMinus">Right −</button>
          <button class="tt-ctrl-btn" data-act="brPlus">Right +</button>`;
      }
    } else {
      const subBar = `
        <button class="tt-ctrl-btn${st.tcTab === "tens" ? " active" : ""}" data-act="tcTens">100s Tens &amp; Ones</button>
        <button class="tt-ctrl-btn${st.tcTab === "clock" ? " active" : ""}" data-act="tcClock">Clock</button>
        <button class="tt-ctrl-btn${st.tcTab === "coins" ? " active" : ""}" data-act="tcCoins">Coins</button>`;
      if (st.tcTab === "tens") {
        if (st.tensCount >= 10) st.onesCount = 0;
        const total = st.tensCount * 10 + st.onesCount;
        promptText = `TEACHING PROMPT: Build numbers up to 100! ${st.tensCount} Tens and ${st.onesCount} Ones = ${total}.`;
        spec = { type: "tens-ones-100", tens: st.tensCount, ones: st.onesCount };
        controlsHTML = `${subBar}
          <button class="tt-ctrl-btn" data-act="tensMinus">Tens −</button>
          <button class="tt-ctrl-btn" data-act="tensPlus">Tens +</button>
          <button class="tt-ctrl-btn" data-act="onesMinus">Ones −</button>
          <button class="tt-ctrl-btn" data-act="onesPlus">Ones +</button>`;
      } else if (st.tcTab === "coins") {
        const sum = st.coinsList.reduce((a, b) => a + b, 0);
        promptText = `TEACHING PROMPT: Compare coin sizes & values on the mat! Total shown = ${sum}¢.`;
        spec = { type: "coins", coins: st.coinsList.length ? st.coinsList : [1], showLabels: true };
        controlsHTML = `${subBar}
          <button class="tt-ctrl-btn" data-act="coinAdd25">+ Quarter (25¢)</button>
          <button class="tt-ctrl-btn" data-act="coinAdd10">+ Dime (10¢)</button>
          <button class="tt-ctrl-btn" data-act="coinAdd5">+ Nickel (5¢)</button>
          <button class="tt-ctrl-btn" data-act="coinAdd1">+ Penny (1¢)</button>
          <button class="tt-ctrl-btn" data-act="coinClear">Reset Coin</button>`;
      } else {
        promptText = `TEACHING PROMPT: Practice reading ${st.clkHour}:00 (${st.clkHour} o'clock) on the garden clock.`;
        spec = { type: "clock-hour", hour: st.clkHour, minutes: 0, skyPhase: `${st.clkHour} o'clock` };
        controlsHTML = `${subBar}
          <button class="tt-ctrl-btn" data-act="hrPrev">− 1 Hour</button>
          <button class="tt-ctrl-btn" data-act="hrNext">+ 1 Hour</button>`;
      }
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

    ws.querySelectorAll("[data-pat]").forEach((btn) => {
      btn.addEventListener("click", () => {
        st.patKind = btn.dataset.pat;
        this.renderTabletop();
      });
    });

    ws.querySelectorAll("[data-pos]").forEach((btn) => {
      btn.addEventListener("click", () => {
        st.posRel = btn.dataset.pos;
        this.renderTabletop();
      });
    });

    ws.querySelectorAll("[data-act]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const a = btn.dataset.act;
        if (a === "fmax5") { st.frameMax = 5; st.frameCount = Math.min(5, st.frameCount); }
        if (a === "fmax10") { st.frameMax = 10; st.frameCount = Math.min(10, st.frameCount); }
        if (a === "fmax20") { st.frameMax = 20; if (st.frameCount < 11) st.frameCount = 12; }
        if (a === "fminus") st.frameCount = Math.max(0, st.frameCount - 1);
        if (a === "fplus") st.frameCount = Math.min(st.frameMax, st.frameCount + 1);
        if (a === "bwMinus") { st.bondWhole = Math.max(2, st.bondWhole - 1); st.bondPartA = Math.min(st.bondPartA, st.bondWhole); }
        if (a === "bwPlus") st.bondWhole = Math.min(10, st.bondWhole + 1);
        if (a === "baMinus") st.bondPartA = Math.max(0, st.bondPartA - 1);
        if (a === "baPlus") st.bondPartA = Math.min(st.bondWhole, st.bondPartA + 1);
        if (a === "bToggleHide") st.bondMissing = st.bondMissing === "none" ? "partB" : "none";
        if (a === "addA") st.addA = (st.addA % 5) + 1;
        if (a === "addB") st.addB = (st.addB % 5) + 1;
        if (a === "crossMore") st.subTake = st.subTake >= st.addA + st.addB ? 0 : st.subTake + 1;
        if (a === "crossClear") st.subTake = 0;
        if (a === "spShapes") st.shapeTab = "shapes";
        if (a === "spPattern") st.shapeTab = "pattern";
        if (a === "spPosition") st.shapeTab = "position";
        if (a === "balWeight") st.balanceTab = "weight";
        if (a === "balLength") st.balanceTab = "length";
        if (a === "balCapacity") st.balanceTab = "capacity";
        if (a === "laMinus") st.lenA = Math.max(1, st.lenA - 1);
        if (a === "laPlus") st.lenA = Math.min(9, st.lenA + 1);
        if (a === "lbMinus") st.lenB = Math.max(1, st.lenB - 1);
        if (a === "lbPlus") st.lenB = Math.min(9, st.lenB + 1);
        if (a === "capSwap") st.capLeftMore = !st.capLeftMore;
        if (a === "blMinus") st.balLeft = Math.max(1, st.balLeft - 1);
        if (a === "blPlus") st.balLeft = Math.min(10, st.balLeft + 1);
        if (a === "brMinus") st.balRight = Math.max(1, st.balRight - 1);
        if (a === "brPlus") st.balRight = Math.min(10, st.balRight + 1);
        if (a === "tcTens") st.tcTab = "tens";
        if (a === "tcClock") st.tcTab = "clock";
        if (a === "tcCoins") st.tcTab = "coins";
        if (a === "tensMinus") st.tensCount = Math.max(1, st.tensCount - 1);
        if (a === "tensPlus") { st.tensCount = Math.min(10, st.tensCount + 1); if (st.tensCount === 10) st.onesCount = 0; }
        if (a === "onesMinus") st.onesCount = Math.max(0, st.onesCount - 1);
        if (a === "onesPlus") { if (st.tensCount < 10) st.onesCount = Math.min(9, st.onesCount + 1); }
        if (a === "hrPrev") st.clkHour = st.clkHour === 1 ? 12 : st.clkHour - 1;
        if (a === "hrNext") st.clkHour = st.clkHour === 12 ? 1 : st.clkHour + 1;
        if (a === "coinAdd25" && st.coinsList.length < 8) st.coinsList.push(25);
        if (a === "coinAdd10" && st.coinsList.length < 8) st.coinsList.push(10);
        if (a === "coinAdd5" && st.coinsList.length < 8) st.coinsList.push(5);
        if (a === "coinAdd1" && st.coinsList.length < 8) st.coinsList.push(1);
        if (a === "coinClear") st.coinsList = [1];
        this.renderTabletop();
      });
    });
  }
};

if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", () => App.init());
}

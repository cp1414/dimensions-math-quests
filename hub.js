// ============================================================================
// HOME HUB CONTROLLER — DESKTOP STUDY CD-ROM LIBRARY & OPTICAL LAUNCHER
// Pointer-driven disc drag-and-drop into animated CD-ROM Drive + CRT window.
// Zero external dependencies; 100% offline; keyboard-accessible fallback.
// ============================================================================

(function () {
  const SOUND_PREF_KEY = "hearth_hub_sound_v1";

  const HubAudio = {
    ctx: null,
    enabled: true,

    loadPref() {
      try {
        if (typeof localStorage !== "undefined") {
          const saved = localStorage.getItem(SOUND_PREF_KEY);
          if (saved === "0") this.enabled = false;
        }
      } catch (e) {}
    },

    savePref() {
      try {
        if (typeof localStorage !== "undefined") {
          localStorage.setItem(SOUND_PREF_KEY, this.enabled ? "1" : "0");
        }
      } catch (e) {}
    },

    getCtx() {
      if (!this.enabled || typeof window === "undefined") return null;
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return null;
      if (!this.ctx) this.ctx = new Ctx();
      if (this.ctx.state === "suspended") {
        this.ctx.resume().catch(() => {});
      }
      return this.ctx;
    },

    tone(freqStart, freqEnd, dur, type, vol, delay = 0) {
      try {
        const ctx = this.getCtx();
        if (!ctx) return;
        const start = ctx.currentTime + delay;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = type || "triangle";
        osc.frequency.setValueAtTime(freqStart, start);
        if (freqEnd !== freqStart) {
          osc.frequency.exponentialRampToValueAtTime(Math.max(40, freqEnd), start + dur);
        }
        gain.gain.setValueAtTime(0.0001, start);
        gain.gain.linearRampToValueAtTime(vol, start + Math.min(0.015, dur * 0.25));
        gain.gain.exponentialRampToValueAtTime(0.0001, start + dur);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(start);
        osc.stop(start + dur + 0.02);
      } catch (e) {}
    },

    playSelect() {
      this.tone(740, 520, 0.045, "triangle", 0.045, 0);
    },

    playLift() {
      this.tone(980, 1460, 0.055, "triangle", 0.05, 0);
      this.tone(1320, 1780, 0.045, "sine", 0.04, 0.035);
    },

    playDock() {
      this.tone(680, 410, 0.055, "triangle", 0.05, 0);
    },

    playTray(opening) {
      if (opening) {
        this.tone(165, 295, 0.16, "sawtooth", 0.025, 0);
        this.tone(540, 620, 0.04, "triangle", 0.035, 0.11);
      } else {
        this.tone(280, 150, 0.17, "sawtooth", 0.026, 0);
        this.tone(420, 260, 0.05, "triangle", 0.04, 0.12);
      }
    },

    playBoot() {
      const chord = [523.25, 659.25, 783.99, 987.77, 1174.66];
      chord.forEach((f, idx) => {
        this.tone(f, f, 0.34, idx % 2 === 0 ? "triangle" : "sine", 0.055, idx * 0.065);
      });
    },

    playReject() {
      this.tone(360, 310, 0.11, "triangle", 0.06, 0);
      this.tone(275, 220, 0.15, "triangle", 0.06, 0.11);
    }
  };

  function getSpeakerSVG(enabled) {
    if (enabled) {
      return `<svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
        <path d="M2 6 L5.5 6 L9.5 2.5 L9.5 13.5 L5.5 10 L2 10 Z" fill="currentColor"/>
        <path d="M11.8 5.2 Q14 8 11.8 10.8" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
      </svg>`;
    }
    return `<svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M2 6 L5.5 6 L9.5 2.5 L9.5 13.5 L5.5 10 L2 10 Z" fill="currentColor" opacity="0.6"/>
      <path d="M11.5 5.5 L14.5 10.5 M14.5 5.5 L11.5 10.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
    </svg>`;
  }

  function isReducedMotion() {
    try {
      return typeof window !== "undefined" &&
        typeof window.matchMedia === "function" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch (e) {
      return false;
    }
  }

  const state = {
    selectedGradeId: null,
    trayOpen: false,
    busy: false,
    lastTapId: null,
    lastTapAt: 0,
    bootNavigatedHref: null,
    lastAlertMessage: null,
    clockTimer: null,
    drag: null
  };

  function getGradeById(id) {
    if (typeof GRADE_CATALOG === "undefined") return null;
    for (let i = 0; i < GRADE_CATALOG.length; i++) {
      if (GRADE_CATALOG[i].id === id) return GRADE_CATALOG[i];
    }
    return null;
  }

  function formatProgressHTML(grade, prog) {
    if (grade.comingSoon) return "In Preparation";
    if (prog.masteredCount > 0 || prog.started) {
      return `<strong>${prog.masteredCount}</strong> of ${prog.totalUnits} ${grade.unitLabel} Complete`;
    }
    return `${grade.totalUnits} ${grade.unitLabel} · Ready`;
  }

  function updateWallClock() {
    const hourHand = document.getElementById("clock-hand-hour");
    const minHand = document.getElementById("clock-hand-minute");
    const secHand = document.getElementById("clock-hand-second");
    if (!hourHand || !minHand || !secHand) return;

    const now = new Date();
    const secs = now.getSeconds();
    const mins = now.getMinutes();
    const hours = now.getHours() % 12;

    const secDeg = secs * 6;
    const minDeg = mins * 6 + secs * 0.1;
    const hourDeg = hours * 30 + mins * 0.5;

    hourHand.setAttribute("transform", `rotate(${hourDeg.toFixed(1)} 1110 126)`);
    minHand.setAttribute("transform", `rotate(${minDeg.toFixed(1)} 1110 126)`);
    secHand.setAttribute("transform", `rotate(${secDeg.toFixed(1)} 1110 126)`);
  }

  function initWallClock() {
    updateWallClock();
    if (state.clockTimer && typeof clearInterval === "function") {
      clearInterval(state.clockTimer);
      state.clockTimer = null;
    }
    if (!isReducedMotion() && typeof setInterval === "function") {
      state.clockTimer = setInterval(updateWallClock, 1000);
    }
  }

  function renderRack() {
    const crestEl = document.getElementById("hub-crest-icon");
    if (crestEl && typeof HubArt !== "undefined") {
      crestEl.innerHTML = HubArt.getCrestSVG(34);
    }

    const wallEl = document.getElementById("room-wall-art");
    if (wallEl && typeof HubArt !== "undefined") {
      wallEl.innerHTML = HubArt.getStudyWallSVG();
    }
    initWallClock();

    const fanBay = document.getElementById("tower-fan-bay");
    if (fanBay && typeof HubArt !== "undefined") {
      fanBay.innerHTML = HubArt.getTowerFanSVG();
    }

    const grid = document.getElementById("hub-grade-grid");
    if (!grid || typeof GRADE_CATALOG === "undefined") return;

    grid.innerHTML = GRADE_CATALOG.map((grade, idx) => {
      const prog = readGradeProgressSummary(grade);
      const progressHTML = formatProgressHTML(grade, prog);
      const discLabel = `DISC 0${idx + 1}`;
      const cueText = grade.comingSoon ? "Prototype" : "";
      const coverSVG = typeof HubArt !== "undefined" ? HubArt.getCoverArtSVG(grade) : "";
      const discSVG = typeof HubArt !== "undefined" ? HubArt.getDiscArtSVG(grade) : "";

      return `<div class="jewel-case-slot" role="listitem">
        <button
          type="button"
          class="jewel-case-btn${grade.comingSoon ? " is-prototype" : ""}"
          data-grade-id="${grade.id}"
          data-href="${grade.href}"
          style="--case-tint:${grade.themeAccent};"
          aria-label="${grade.badge}: ${grade.title}. ${grade.comingSoon ? "Prototype coming soon." : "Drag disc into PC drive to play, or press Enter."}"
        >
          <div class="case-inner-tray" aria-hidden="true">
            <div class="case-spindle-rosette"></div>
            <span class="case-empty-note">Place disc in drive</span>
          </div>

          <div class="case-peeking-disc" aria-hidden="true">
            ${discSVG}
            <div class="disc-holo-foil"></div>
          </div>

          <div class="case-front-shell">
            <div class="case-ribbed-spine" aria-hidden="true">
              <span class="case-spine-text">${discLabel} · ${grade.badge.toUpperCase()}</span>
            </div>
            <div class="case-cover-window">
              ${coverSVG}
              <div class="case-plastic-glare" aria-hidden="true"></div>
              ${grade.comingSoon ? '<div class="case-shrinkwrap-sheen" aria-hidden="true"></div>' : ""}
            </div>
          </div>
        </button>

        <div class="case-shelf-plaque">
          <div class="plaque-top-row">
            <span class="plaque-grade">${grade.badge}</span>
            ${cueText ? `<span class="plaque-action-cue">${cueText}</span>` : ""}
          </div>
          <div class="plaque-progress">${progressHTML}</div>
        </div>
      </div>`;
    }).join("");
  }

  function renderScopeItems(items) {
    return `<div class="crt-scope-list">
      ${items.map((text) => `<div class="crt-scope-item"><span class="crt-bullet" aria-hidden="true"></span><span>${text}</span></div>`).join("")}
    </div>`;
  }

  function renderCRT(mode, grade, extraText) {
    const crt = document.getElementById("crt-screen-body");
    if (!crt) return;

    if (mode === "booting" && grade) {
      const pct = Math.max(0, Math.min(100, Math.round((typeof extraText === "number" ? extraText : 1) * 100)));
      crt.innerHTML = `<div class="crt-autoplay-window">
        <div class="crt-win-bar">
          <span class="crt-win-title">Hearth Library</span>
          <span class="crt-win-tag">Reading Disc</span>
        </div>
        <div class="crt-win-content">
          <div class="crt-title">${grade.title}</div>
          <div class="crt-sub">Preparing ${grade.badge} Curriculum World...</div>
          ${renderScopeItems([
            "Loading visual manipulatives and story lessons.",
            "Restoring local progress notebook."
          ])}
        </div>
        <div class="crt-bottom-stack">
          <div class="crt-gauge-row">
            <span>Loading</span>
            <div class="crt-gauge-track" aria-hidden="true"><div class="crt-gauge-fill" style="width:${pct}%"></div></div>
            <span>${pct}%</span>
          </div>
          <div class="crt-win-footer is-ready">Launching World...</div>
        </div>
      </div>`;
      return;
    }

    if (mode === "prototype" && grade) {
      crt.innerHTML = `<div class="crt-autoplay-window">
        <div class="crt-win-bar">
          <span class="crt-win-title">Hearth Library</span>
          <span class="crt-win-tag">Disc Ejected</span>
        </div>
        <div class="crt-win-content">
          <div class="crt-title">${grade.title}</div>
          <div class="crt-sub">${grade.subtitle}</div>
          ${renderScopeItems([
            "Grade 2 is currently in preparation.",
            "Try Kindergarten or Grade 1 discs on the stand."
          ])}
        </div>
        <div class="crt-bottom-stack">
          <div class="crt-win-footer is-alert">${extraText || "Prototype Edition — Coming Next"}</div>
        </div>
      </div>`;
      return;
    }

    if (mode === "dragging" && grade) {
      const ready = !!extraText;
      crt.innerHTML = `<div class="crt-autoplay-window">
        <div class="crt-win-bar">
          <span class="crt-win-title">CD-ROM Drive Ready</span>
          <span class="crt-win-tag">${grade.badge}</span>
        </div>
        <div class="crt-win-content">
          <div class="crt-title">${grade.title}</div>
          <div class="crt-sub">Place the disc onto the open tray on the right.</div>
          ${renderScopeItems(grade.semesters)}
        </div>
        <div class="crt-bottom-stack">
          <div class="crt-win-footer${ready ? " is-ready" : ""}">
            ${ready ? "Release to insert disc and begin" : "Move disc onto the open drive tray"}
          </div>
        </div>
      </div>`;
      return;
    }

    if (mode === "nudge" && grade) {
      crt.innerHTML = `<div class="crt-autoplay-window">
        <div class="crt-win-bar">
          <span class="crt-win-title">Hearth Library</span>
          <span class="crt-win-tag">Tray Open</span>
        </div>
        <div class="crt-win-content">
          <div class="crt-title">${grade.title}</div>
          <div class="crt-sub">${grade.subtitle}</div>
          ${renderScopeItems([
            "The drive tray is open. Pick up this disc and place it onto the tray."
          ])}
        </div>
        <div class="crt-bottom-stack">
          <div class="crt-win-footer is-alert">Drag disc into the drive tray to play</div>
        </div>
      </div>`;
      return;
    }

    if (mode === "preview" && grade) {
      const prog = readGradeProgressSummary(grade);
      const pct = grade.comingSoon
        ? 0
        : Math.round((prog.masteredCount / Math.max(1, prog.totalUnits)) * 100);
      const meterText = grade.comingSoon
        ? "In Prep"
        : `${prog.masteredCount} / ${prog.totalUnits}`;
      const shortScopes = grade.semesters.map((s) =>
        s.replace(/^Semester A/i, "Sem A").replace(/^Semester B/i, "Sem B")
      );

      crt.innerHTML = `<div class="crt-autoplay-window">
        <div class="crt-win-bar">
          <span class="crt-win-title">Hearth Library</span>
          <span class="crt-win-tag">${grade.badge}</span>
        </div>
        <div class="crt-win-content">
          <div class="crt-title">${grade.title}</div>
          <div class="crt-sub">${grade.subtitle}</div>
          ${renderScopeItems(shortScopes)}
        </div>
        <div class="crt-bottom-stack">
          <div class="crt-gauge-row">
            <span>Progress</span>
            <div class="crt-gauge-track" aria-hidden="true"><div class="crt-gauge-fill" style="width:${pct}%"></div></div>
            <span>${meterText}</span>
          </div>
          <div class="crt-win-footer">
            ${grade.comingSoon ? "Prototype Disc (Coming Next)" : "Place this disc into the CD-ROM Drive to begin"}
          </div>
        </div>
      </div>`;
      return;
    }

    const catalogCount = typeof GRADE_CATALOG !== "undefined" ? GRADE_CATALOG.length : 0;
    crt.innerHTML = `<div class="crt-autoplay-window">
      <div class="crt-win-bar">
        <span class="crt-win-title">Hearth Library</span>
        <span class="crt-win-tag">Ready</span>
      </div>
      <div class="crt-win-content">
        <div class="crt-title">Select a Curriculum Disc</div>
        <div class="crt-sub">${catalogCount} volumes on the wooden stand · Local progress saved.</div>
        ${renderScopeItems([
          "Click any jewel case to preview its scope and sequence.",
          "Pick up a disc and drop it onto the CD-ROM drive to play."
        ])}
      </div>
      <div class="crt-bottom-stack">
        <div class="crt-win-footer">Drag a CD-ROM into the computer drive</div>
      </div>
    </div>`;
  }

  function setTrayOpen(open, silent) {
    const prev = state.trayOpen;
    state.trayOpen = !!open;
    const dropZone = document.getElementById("pc-drop-zone");
    const driveLed = document.getElementById("pc-drive-led");
    if (dropZone && dropZone.classList) {
      dropZone.classList.toggle("is-tray-open", state.trayOpen);
      if (!state.trayOpen) dropZone.classList.remove("is-drop-ready");
    }
    if (driveLed && driveLed.classList) {
      driveLed.classList.toggle("active", state.trayOpen);
    }
    if (!silent && prev !== state.trayOpen) {
      HubAudio.playTray(state.trayOpen);
    }
  }

  function setDropReady(ready) {
    const dropZone = document.getElementById("pc-drop-zone");
    if (dropZone && dropZone.classList) {
      dropZone.classList.toggle("is-drop-ready", !!ready);
    }
  }

  function selectGrade(gradeId, silent) {
    const grade = getGradeById(gradeId);
    if (!grade) return;
    state.selectedGradeId = gradeId;
    const buttons = document.querySelectorAll(".jewel-case-btn");
    for (let i = 0; i < buttons.length; i++) {
      const btn = buttons[i];
      if (btn && btn.classList) {
        btn.classList.toggle("is-selected", btn.getAttribute("data-grade-id") === gradeId);
      }
    }
    if (!state.busy && !state.drag) {
      renderCRT("preview", grade);
    }
    if (!silent) HubAudio.playSelect();
  }

  function setCaseDiscRemoved(gradeId, removed) {
    const buttons = document.querySelectorAll(".jewel-case-btn");
    for (let i = 0; i < buttons.length; i++) {
      const btn = buttons[i];
      if (btn && btn.getAttribute && btn.getAttribute("data-grade-id") === gradeId && btn.classList) {
        btn.classList.toggle("is-disc-removed", !!removed);
      }
    }
  }

  function setTrayDiscVisual(grade) {
    const trayDisc = document.getElementById("tray-inserted-disc");
    if (!trayDisc) return;
    if (!grade) {
      trayDisc.innerHTML = "";
      if (trayDisc.classList) {
        trayDisc.classList.remove("has-disc", "spinning");
      }
      return;
    }
    trayDisc.innerHTML = typeof HubArt !== "undefined" ? HubArt.getDiscArtSVG(grade) : "";
    if (trayDisc.classList) {
      trayDisc.classList.add("has-disc");
    }
  }

  function finishNavigate(href) {
    state.bootNavigatedHref = href;
    if (typeof window !== "undefined" && window.location) {
      window.location.href = href;
    }
  }

  function insertDiscById(gradeId) {
    const grade = getGradeById(gradeId);
    if (!grade || state.busy) return false;

    state.busy = true;
    state.selectedGradeId = grade.id;
    setCaseDiscRemoved(grade.id, true);
    setTrayOpen(true, true);
    setDropReady(false);
    setTrayDiscVisual(grade);

    const driveLed = document.getElementById("pc-drive-led");
    const saveLed = document.getElementById("pc-save-led");
    const trayDisc = document.getElementById("tray-inserted-disc");
    if (trayDisc && trayDisc.classList) trayDisc.classList.add("spinning");

    if (grade.comingSoon) {
      state.lastAlertMessage = "Prototype Edition — Coming Next";
      renderCRT("prototype", grade, state.lastAlertMessage);
      HubAudio.playReject();
      if (driveLed && driveLed.classList) driveLed.classList.add("reading");

      const delay = isReducedMotion() ? 240 : 1250;
      setTimeout(() => {
        if (driveLed && driveLed.classList) driveLed.classList.remove("reading");
        setTrayDiscVisual(null);
        setTrayOpen(false, false);
        setCaseDiscRemoved(grade.id, false);
        state.busy = false;
      }, delay);
      return false;
    }

    HubAudio.playTray(false);
    HubAudio.playBoot();
    if (driveLed && driveLed.classList) driveLed.classList.add("reading");
    if (saveLed && saveLed.classList) saveLed.classList.add("active");

    if (isReducedMotion()) {
      setTrayOpen(false, true);
      renderCRT("booting", grade, 1);
      state.busy = false;
      finishNavigate(grade.href);
      return true;
    }

    renderCRT("booting", grade, 0.25);
    setTimeout(() => {
      setTrayOpen(false, true);
      renderCRT("booting", grade, 0.65);
    }, 240);

    setTimeout(() => {
      renderCRT("booting", grade, 1);
    }, 580);

    setTimeout(() => {
      if (driveLed && driveLed.classList) driveLed.classList.remove("reading");
      if (saveLed && saveLed.classList) saveLed.classList.remove("active");
      state.busy = false;
      finishNavigate(grade.href);
    }, 880);

    return true;
  }

  function isPointOverDrive(clientX, clientY) {
    const dropZone = document.getElementById("pc-drop-zone");
    const tray = document.getElementById("pc-disc-tray");
    const tower = document.getElementById("pc-tower");
    if (!dropZone || typeof dropZone.getBoundingClientRect !== "function") return false;

    const bayRect = dropZone.getBoundingClientRect();
    const trayRect = tray && typeof tray.getBoundingClientRect === "function"
      ? tray.getBoundingClientRect()
      : bayRect;
    const towerRect = tower && typeof tower.getBoundingClientRect === "function"
      ? tower.getBoundingClientRect()
      : bayRect;

    const minX = Math.min(bayRect.left, trayRect.left, towerRect.left) - 28;
    const maxX = Math.max(bayRect.right, trayRect.right, towerRect.right) + 28;
    const minY = Math.min(bayRect.top, trayRect.top) - 28;
    const maxY = Math.max(bayRect.bottom, trayRect.bottom, bayRect.top + 185) + 24;

    return clientX >= minX && clientX <= maxX && clientY >= minY && clientY <= maxY;
  }

  function showFloatingDisc(grade, clientX, clientY) {
    const layer = document.getElementById("dragged-disc-layer");
    const art = document.getElementById("dragged-disc-art");
    const tilt = document.getElementById("dragged-disc-tilt");
    if (!layer || !art) return;

    art.innerHTML = typeof HubArt !== "undefined" ? HubArt.getDiscArtSVG(grade) : "";
    layer.classList.remove("hidden");
    positionFloatingDisc(clientX, clientY, 0, 0);
    if (tilt) tilt.style.transform = "perspective(560px) rotateX(0deg) rotateY(0deg) scale(1.06)";
  }

  function positionFloatingDisc(clientX, clientY, vx, vy) {
    const layer = document.getElementById("dragged-disc-layer");
    const tilt = document.getElementById("dragged-disc-tilt");
    const foil = document.getElementById("dragged-disc-foil");
    if (!layer) return;

    const half = 78;
    layer.style.transform = `translate3d(${(clientX - half).toFixed(1)}px, ${(clientY - half).toFixed(1)}px, 0)`;

    if (tilt && !isReducedMotion()) {
      const rotY = Math.max(-22, Math.min(22, vx * 1.15));
      const rotX = Math.max(-18, Math.min(18, -vy * 1.15));
      tilt.style.transform = `perspective(560px) rotateX(${rotX.toFixed(1)}deg) rotateY(${rotY.toFixed(1)}deg) scale(1.06)`;
    }
    if (foil) {
      const angle = ((clientX + clientY) * 0.45) % 360;
      foil.style.setProperty("--foil-angle", `${angle.toFixed(0)}deg`);
    }
  }

  function hideFloatingDisc() {
    const layer = document.getElementById("dragged-disc-layer");
    if (layer && layer.classList) layer.classList.add("hidden");
  }

  function triggerDoubleClickNudge(btn, grade) {
    setTrayOpen(true, false);
    renderCRT("nudge", grade);
    if (btn && btn.classList) {
      btn.classList.remove("is-nudge");
      if (typeof btn.offsetWidth === "number") void btn.offsetWidth;
      btn.classList.add("is-nudge");
    }
  }

  function bindRackAndDrag() {
    const grid = document.getElementById("hub-grade-grid");
    if (!grid) return;

    const buttons = grid.querySelectorAll(".jewel-case-btn");
    for (let i = 0; i < buttons.length; i++) {
      const btn = buttons[i];
      const gradeId = btn.getAttribute("data-grade-id");

      btn.addEventListener("mouseenter", () => {
        if (!state.drag && !state.busy) {
          const grade = getGradeById(gradeId);
          if (grade) renderCRT("preview", grade);
        }
      });

      btn.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          insertDiscById(gradeId);
        }
      });

      btn.addEventListener("pointerdown", (e) => {
        if (state.busy || e.button > 0) return;
        const grade = getGradeById(gradeId);
        if (!grade) return;

        selectGrade(grade.id, true);
        if (typeof btn.setPointerCapture === "function") {
          try { btn.setPointerCapture(e.pointerId); } catch (err) {}
        }

        state.drag = {
          grade: grade,
          btn: btn,
          pointerId: e.pointerId,
          startX: e.clientX,
          startY: e.clientY,
          lastX: e.clientX,
          lastY: e.clientY,
          active: false,
          overDrive: false
        };
      });

      btn.addEventListener("pointermove", (e) => {
        const d = state.drag;
        if (!d || d.pointerId !== e.pointerId) return;

        const dist = Math.hypot(e.clientX - d.startX, e.clientY - d.startY);
        if (!d.active && dist >= 7) {
          d.active = true;
          HubAudio.playLift();
          setCaseDiscRemoved(d.grade.id, true);
          showFloatingDisc(d.grade, e.clientX, e.clientY);
          setTrayOpen(true, false);
          renderCRT("dragging", d.grade, false);
        }

        if (d.active) {
          const vx = e.clientX - d.lastX;
          const vy = e.clientY - d.lastY;
          d.lastX = e.clientX;
          d.lastY = e.clientY;
          positionFloatingDisc(e.clientX, e.clientY, vx, vy);

          const over = isPointOverDrive(e.clientX, e.clientY);
          if (over !== d.overDrive) {
            d.overDrive = over;
            setDropReady(over);
            renderCRT("dragging", d.grade, over);
          }
        }
      });

      const endPointer = (e, cancelled) => {
        const d = state.drag;
        if (!d || d.pointerId !== e.pointerId) return;
        state.drag = null;

        if (d.active) {
          hideFloatingDisc();
          const droppedOnDrive = !cancelled && isPointOverDrive(e.clientX, e.clientY);
          if (droppedOnDrive) {
            insertDiscById(d.grade.id);
          } else {
            HubAudio.playDock();
            setCaseDiscRemoved(d.grade.id, false);
            setDropReady(false);
            setTrayOpen(false, false);
            renderCRT("preview", d.grade);
          }
          return;
        }

        const now = Date.now();
        if (state.lastTapId === d.grade.id && now - state.lastTapAt < 380) {
          state.lastTapAt = 0;
          triggerDoubleClickNudge(d.btn, d.grade);
        } else {
          state.lastTapId = d.grade.id;
          state.lastTapAt = now;
          selectGrade(d.grade.id, false);
        }
      };

      btn.addEventListener("pointerup", (e) => endPointer(e, false));
      btn.addEventListener("pointercancel", (e) => endPointer(e, true));
    }

    const ejectBtn = document.getElementById("btn-drive-eject");
    if (ejectBtn) {
      ejectBtn.addEventListener("click", () => {
        if (state.busy) return;
        setTrayOpen(!state.trayOpen, false);
      });
    }

    const powerBtn = document.getElementById("btn-pc-power");
    if (powerBtn) {
      powerBtn.addEventListener("click", () => {
        HubAudio.playSelect();
        const selected = getGradeById(state.selectedGradeId);
        renderCRT(selected ? "preview" : "idle", selected);
      });
    }
  }

  function initSoundToggle() {
    HubAudio.loadPref();
    const btn = document.getElementById("btn-hub-sound");
    const icon = document.getElementById("hub-sound-icon");
    const label = document.getElementById("hub-sound-label");

    function syncUI() {
      if (icon) icon.innerHTML = getSpeakerSVG(HubAudio.enabled);
      if (label) label.textContent = HubAudio.enabled ? "Desk Audio: On" : "Desk Audio: Off";
      if (btn) btn.setAttribute("aria-pressed", HubAudio.enabled ? "true" : "false");
    }

    syncUI();
    if (btn) {
      btn.addEventListener("click", () => {
        HubAudio.enabled = !HubAudio.enabled;
        HubAudio.savePref();
        syncUI();
        if (HubAudio.enabled) HubAudio.playSelect();
      });
    }
  }

  function initDialog() {
    const dlg = document.getElementById("hub-about-dialog");
    const openBtn = document.getElementById("btn-hub-about");
    const closeBtn = document.getElementById("btn-close-about");
    if (!dlg || !openBtn || !closeBtn) return;

    openBtn.addEventListener("click", () => {
      dlg.classList.remove("hidden");
      if (typeof dlg.showModal === "function" && !dlg.open) dlg.showModal();
    });
    closeBtn.addEventListener("click", () => {
      dlg.classList.add("hidden");
      if (typeof dlg.close === "function" && dlg.open) dlg.close();
    });
    dlg.addEventListener("click", (e) => {
      if (e.target === dlg) {
        dlg.classList.add("hidden");
        if (typeof dlg.close === "function" && dlg.open) dlg.close();
      }
    });
  }

  function registerRootSW() {
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
        navigator.serviceWorker.register("./sw.js", { updateViaCache: "none" })
          .then((reg) => reg && reg.update && reg.update().catch(() => {}))
          .catch(() => {});
      }
    } catch (e) {}
  }

  function init() {
    renderRack();
    bindRackAndDrag();
    initSoundToggle();
    initDialog();
    registerRootSW();

    if (typeof GRADE_CATALOG !== "undefined" && GRADE_CATALOG.length > 0) {
      selectGrade(GRADE_CATALOG[0].id, true);
    } else {
      renderCRT("idle", null);
    }
  }

  if (typeof window !== "undefined") {
    window.HubLauncher = {
      init,
      selectGrade,
      insertDiscById,
      setTrayOpen,
      updateWallClock,
      getState: () => state
    };
  }

  document.addEventListener("DOMContentLoaded", init);
})();

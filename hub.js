// ============================================================================
// HOME HUB CONTROLLER — CLASSICAL FOLIO VOLUMES
// ============================================================================

(function () {
  function getHubIconSVG(key, size = 36) {
    if (key === "crest") {
      return `<svg width="${size}" height="${size}" viewBox="0 0 40 40" aria-hidden="true">
        <rect x="4" y="4" width="32" height="32" rx="6" fill="#245633" stroke="#E8C05A" stroke-width="2.2"/>
        <path d="M20 9 C26 13 28 21 20 30 C12 21 14 13 20 9 Z" fill="#FAF4E6"/>
        <path d="M20 12 L20 29 M20 18 L24 15 M20 22 L16 19" stroke="#245633" stroke-width="1.8" stroke-linecap="round"/>
      </svg>`;
    }
    if (key === "garden") {
      return `<svg width="${size}" height="${size}" viewBox="0 0 44 44" aria-hidden="true">
        <circle cx="22" cy="22" r="18" fill="#EDF5E8" stroke="#245633" stroke-width="2"/>
        <path d="M9 28 Q16 22 22 26 T35 24" fill="none" stroke="#6FA3B8" stroke-width="3" stroke-linecap="round"/>
        <polygon points="15,24 11,13 19,13" fill="#D97A2B" transform="rotate(180 15 18.5)"/>
        <circle cx="29" cy="18" r="5.5" fill="#F2B830" stroke="#8C5B12" stroke-width="1.3"/>
        <path d="M22 36 L22 22" stroke="#245633" stroke-width="2.4" stroke-linecap="round"/>
      </svg>`;
    }
    if (key === "shield") {
      return `<svg width="${size}" height="${size}" viewBox="0 0 44 44" aria-hidden="true">
        <path d="M22 5 L37 11 L37 22 C37 31 29 37 22 40 C15 37 7 31 7 22 L7 11 Z" fill="#173156" stroke="#C8962E" stroke-width="2.4"/>
        <path d="M22 10 L22 35 M12 21 L32 21" stroke="#E8C05A" stroke-width="3" stroke-linecap="round"/>
      </svg>`;
    }
    return `<svg width="${size}" height="${size}" viewBox="0 0 44 44" aria-hidden="true">
      <circle cx="22" cy="22" r="17" fill="#EAE2D3" stroke="#6E5A44" stroke-width="2.2"/>
      <polygon points="22,9 26,22 22,35 18,22" fill="#8C6B46"/>
      <circle cx="22" cy="22" r="3" fill="#FAF4E6" stroke="#6E5A44" stroke-width="1.5"/>
    </svg>`;
  }

  function renderHub() {
    const crestEl = document.getElementById("hub-crest-icon");
    if (crestEl) crestEl.innerHTML = getHubIconSVG("crest", 38);

    const grid = document.getElementById("hub-grade-grid");
    if (!grid || typeof GRADE_CATALOG === "undefined") return;

    grid.innerHTML = GRADE_CATALOG.map((grade) => {
      const prog = readGradeProgressSummary(grade);
      const progressText = grade.comingSoon
        ? "In Preparation"
        : prog.masteredCount > 0 || prog.started
        ? `<strong>${prog.masteredCount}</strong> of ${prog.totalUnits} ${grade.unitLabel} Complete`
        : `${grade.totalUnits} ${grade.unitLabel} · Ready`;

      const ctaText = grade.comingSoon
        ? "Coming Soon"
        : prog.started
        ? "Continue →"
        : `Open ${grade.badge} →`;

      const tagName = grade.comingSoon ? "div" : "a";
      const hrefAttr = grade.comingSoon ? "" : `href="${grade.href}"`;

      return `<${tagName} class="folio-card${grade.comingSoon ? " coming-soon" : ""}" ${hrefAttr} style="--folio-accent:${grade.themeAccent};">
        <span class="folio-ribbon">${grade.badge}</span>
        <div>
          <div class="folio-head">
            <div class="folio-emblem">${getHubIconSVG(grade.iconKey, 38)}</div>
            <div>
              <h3 class="folio-title">${grade.title}</h3>
              <p class="folio-subtitle">${grade.subtitle}</p>
            </div>
          </div>
          <p class="folio-desc" style="margin-top:12px;">${grade.description}</p>
        </div>

        <div class="folio-scope">
          ${grade.semesters.map((s) => `<div>${s}</div>`).join("")}
        </div>

        <div class="folio-footer">
          <span class="folio-progress">${progressText}</span>
          <span class="folio-cta${grade.comingSoon ? " disabled" : ""}" style="${grade.comingSoon ? "" : `background:${grade.themeAccent};`}">${ctaText}</span>
        </div>
      </${tagName}>`;
    }).join("");
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

  document.addEventListener("DOMContentLoaded", () => {
    renderHub();
    initDialog();
    registerRootSW();
  });
})();

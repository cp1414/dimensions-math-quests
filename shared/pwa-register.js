// ============================================================================
// SHARED PWA & DIALOG SHELL HELPERS — HEARTH & WONDER MATH
// Unifies Service Worker registration + native <dialog> lifecycle across the
// Home Hub and every grade adventure.
// ============================================================================

const HearthPWA = {
  registerServiceWorker(swPath = "./sw.js", scope) {
    try {
      if (
        typeof navigator !== "undefined" &&
        "serviceWorker" in navigator &&
        typeof window !== "undefined" &&
        window.location &&
        window.location.protocol &&
        window.location.protocol.startsWith("http")
      ) {
        const hadController = !!navigator.serviceWorker.controller;
        let reloaded = false;
        navigator.serviceWorker.addEventListener("controllerchange", () => {
          if (hadController && !reloaded) {
            reloaded = true;
            window.location.reload();
          }
        });
        const opts = { updateViaCache: "none" };
        if (scope) opts.scope = scope;
        navigator.serviceWorker
          .register(swPath, opts)
          .then((reg) => reg && reg.update && reg.update().catch(() => {}))
          .catch(() => {});
      }
    } catch (e) {}
  },

  openDialog(dialogId) {
    if (typeof document === "undefined") return;
    const el = document.getElementById(dialogId);
    if (!el) return;
    el.classList.remove("hidden");
    if (typeof el.showModal === "function") {
      try {
        if (!el.open) el.showModal();
      } catch (e) {}
    }
  },

  closeDialog(dialogId) {
    if (typeof document === "undefined") return;
    const el = document.getElementById(dialogId);
    if (!el) return;
    el.classList.add("hidden");
    if (typeof el.close === "function") {
      try {
        if (el.open) el.close();
      } catch (e) {}
    }
  },

  bindDialogDismiss(dialogIds) {
    if (typeof document === "undefined" || !Array.isArray(dialogIds)) return;
    dialogIds.forEach((dialogId) => {
      const el = document.getElementById(dialogId);
      if (!el) return;
      el.addEventListener("close", () => el.classList.add("hidden"));
      el.addEventListener("click", (e) => {
        if (e.target === el) this.closeDialog(dialogId);
      });
    });
  }
};

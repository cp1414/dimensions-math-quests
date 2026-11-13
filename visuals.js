// ============================================================================
// THE YOUNG KNIGHT'S QUEST — ILLUMINATED STORYBOOK ARTWORK & VISUAL MATH DIAGRAMS
// 100% Hand-Crafted Multi-Layered Vector Artwork — Zero Emojis
// ============================================================================

const Visuals = {
  // --------------------------------------------------------------------------
  // 1. THEMATIC GAME & UI SVG ICONS (Rich Gradients, Highlights & Bevels)
  // --------------------------------------------------------------------------
  getIconSVG(key, size = 26) {
    switch (key) {
      case "apple":
        return this.getItemSVG("apple", "primary", size);
      case "log":
        return this.getItemSVG("log", "primary", size);
      case "lantern":
        return this.getItemSVG("lantern", "primary", size);
      case "shieldSilver":
      case "shield":
        return this.getItemSVG("shield", "primary", size);
      case "shieldBronze":
        return this.getItemSVG("shield", "secondary", size);
      case "loaf":
        return this.getItemSVG("loaf", "primary", size);
      case "coin":
        return this.getItemSVG("coin", "secondary", size);
      case "clock":
        return `<svg width="${size}" height="${size}" viewBox="0 0 36 36">
          <circle cx="18" cy="18" r="15" fill="#FFFDF8" stroke="#173156" stroke-width="2.5"/>
          <circle cx="18" cy="18" r="12" fill="none" stroke="#E5B93C" stroke-width="1.2" stroke-dasharray="2,4"/>
          <circle cx="18" cy="6" r="1.5" fill="#173156"/>
          <circle cx="30" cy="18" r="1.5" fill="#173156"/>
          <circle cx="18" cy="30" r="1.5" fill="#173156"/>
          <circle cx="6" cy="18" r="1.5" fill="#173156"/>
          <line x1="18" y1="18" x2="18" y2="8" stroke="#982B2B" stroke-width="2.2" stroke-linecap="round"/>
          <line x1="18" y1="18" x2="25" y2="18" stroke="#173156" stroke-width="2.8" stroke-linecap="round"/>
          <circle cx="18" cy="18" r="2.2" fill="#F0C445" stroke="#173156" stroke-width="1"/>
        </svg>`;
      case "lock":
        return `<svg width="${size}" height="${size}" viewBox="0 0 36 36">
          <path d="M12 17 L12 10 A6 6 0 0 1 24 10 L24 17" fill="none" stroke="#546270" stroke-width="3.2"/>
          <rect x="7" y="17" width="22" height="16" rx="3.5" fill="#F0C445" stroke="#173156" stroke-width="2"/>
          <circle cx="18" cy="24" r="2.4" fill="#173156"/>
          <path d="M16.5 25 L19.5 25 L20 30 L16 30 Z" fill="#173156"/>
        </svg>`;
      case "star":
        return `<svg width="${size}" height="${size}" viewBox="0 0 36 36">
          <defs>
            <linearGradient id="starGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#FFF3B0"/>
              <stop offset="45%" stop-color="#F0C445"/>
              <stop offset="100%" stop-color="#B88214"/>
            </linearGradient>
          </defs>
          <polygon points="18,3 22.5,12.5 33,14 25.2,21.4 27.2,32 18,26.8 8.8,32 10.8,21.4 3,14 13.5,12.5" fill="url(#starGold)" stroke="#5C3B09" stroke-width="1.8" stroke-linejoin="round"/>
          <polygon points="18,6 21,13 28,14 22.5,19 24,26 18,22.5" fill="#FFFDF0" opacity="0.45"/>
        </svg>`;
      case "starEmpty":
        return `<svg width="${size}" height="${size}" viewBox="0 0 36 36">
          <polygon points="18,3 22.5,12.5 33,14 25.2,21.4 27.2,32 18,26.8 8.8,32 10.8,21.4 3,14 13.5,12.5" fill="#E6D7B9" stroke="#8C7654" stroke-width="1.8" stroke-linejoin="round" opacity="0.65"/>
        </svg>`;
      case "sword":
        return `<svg width="${size}" height="${size}" viewBox="0 0 36 36">
          <defs>
            <linearGradient id="bladeSteel" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#FFFFFF"/>
              <stop offset="50%" stop-color="#CFD9E2"/>
              <stop offset="100%" stop-color="#8FA1B3"/>
            </linearGradient>
          </defs>
          <path d="M29 4 L32 7 L15 24 L11 20 Z" fill="url(#bladeSteel)" stroke="#1E1812" stroke-width="1.7" stroke-linejoin="round"/>
          <line x1="29" y1="6" x2="14" y2="21" stroke="#FFFFFF" stroke-width="1.4" opacity="0.8"/>
          <path d="M8 17 L19 28" stroke="#E5B93C" stroke-width="4" stroke-linecap="round"/>
          <path d="M8 17 L19 28" stroke="#8C6410" stroke-width="1.2" stroke-linecap="round"/>
          <path d="M6 29 L11 24 L13.5 26.5 L8.5 31.5 Z" fill="#6E3B1E" stroke="#1E1812" stroke-width="1.5"/>
          <circle cx="6.5" cy="30.5" r="3" fill="#F0C445" stroke="#1E1812" stroke-width="1.5"/>
        </svg>`;
      case "bow":
        return `<svg width="${size}" height="${size}" viewBox="0 0 36 36">
          <path d="M10 4 C26 9 26 27 10 32" fill="none" stroke="#8B5428" stroke-width="3.6" stroke-linecap="round"/>
          <path d="M10 4 C24 9 24 27 10 32" fill="none" stroke="#C68952" stroke-width="1.3" stroke-linecap="round"/>
          <line x1="10" y1="5" x2="10" y2="31" stroke="#D8C7A8" stroke-width="1.6"/>
          <polygon points="5,16 9,18 5,20" fill="#982B2B"/>
          <line x1="6" y1="18" x2="29" y2="18" stroke="#3A2818" stroke-width="2.2"/>
          <polygon points="32,18 25,14.5 26.5,18 25,21.5" fill="#F0C445" stroke="#1E1812" stroke-width="1.3" stroke-linejoin="round"/>
        </svg>`;
      case "bridge":
        return `<svg width="${size}" height="${size}" viewBox="0 0 36 36">
          <rect x="2" y="12" width="32" height="15" rx="2.5" fill="#B5ADA2" stroke="#1E1812" stroke-width="1.8"/>
          <rect x="2" y="9" width="6" height="4" fill="#CFC7BC" stroke="#1E1812" stroke-width="1.4"/>
          <rect x="11" y="9" width="6" height="4" fill="#CFC7BC" stroke="#1E1812" stroke-width="1.4"/>
          <rect x="19" y="9" width="6" height="4" fill="#CFC7BC" stroke="#1E1812" stroke-width="1.4"/>
          <rect x="28" y="9" width="6" height="4" fill="#CFC7BC" stroke="#1E1812" stroke-width="1.4"/>
          <path d="M5 27 A 5.5 5.5 0 0 1 16 27 M20 27 A 5.5 5.5 0 0 1 31 27" fill="#3B719F" stroke="#1E1812" stroke-width="1.8"/>
          <path d="M3 30 Q18 27 33 30" fill="none" stroke="#7BA6C4" stroke-width="2" stroke-linecap="round"/>
        </svg>`;
      case "anchor":
        return `<svg width="${size}" height="${size}" viewBox="0 0 36 36">
          <circle cx="18" cy="7.5" r="3.2" fill="#F0C445" stroke="#173156" stroke-width="2"/>
          <line x1="18" y1="11" x2="18" y2="29" stroke="#173156" stroke-width="3.2"/>
          <line x1="11" y1="16" x2="25" y2="16" stroke="#C69722" stroke-width="2.8" stroke-linecap="round"/>
          <path d="M7 21 C9 31 27 31 29 21" fill="none" stroke="#173156" stroke-width="3" stroke-linecap="round"/>
          <polygon points="6,19 10,22 6,24" fill="#173156"/>
          <polygon points="30,19 26,22 30,24" fill="#173156"/>
        </svg>`;
      case "castle":
        return `<svg width="${size}" height="${size}" viewBox="0 0 36 36">
          <rect x="6" y="15" width="24" height="17" fill="#E5D6B8" stroke="#1E1812" stroke-width="1.8"/>
          <rect x="4" y="12" width="8" height="20" fill="#D5C29F" stroke="#1E1812" stroke-width="1.6"/>
          <rect x="24" y="12" width="8" height="20" fill="#D5C29F" stroke="#1E1812" stroke-width="1.6"/>
          <polygon points="3,12 8,4 13,12" fill="#982B2B" stroke="#1E1812" stroke-width="1.5"/>
          <polygon points="23,12 28,4 33,12" fill="#982B2B" stroke="#1E1812" stroke-width="1.5"/>
          <polygon points="12,15 18,7 24,15" fill="#173156" stroke="#1E1812" stroke-width="1.5"/>
          <path d="M14 32 L14 22 A4 4 0 0 1 22 22 L22 32 Z" fill="#5A3921" stroke="#1E1812" stroke-width="1.5"/>
        </svg>`;
      case "anvil":
        return `<svg width="${size}" height="${size}" viewBox="0 0 36 36">
          <path d="M3 14 L12 11 L30 11 L33 16 L25 19 L23 26 L29 30 L8 30 L13 26 L12 19 Z" fill="#546270" stroke="#1E1812" stroke-width="1.8" stroke-linejoin="round"/>
          <line x1="12" y1="13" x2="29" y2="13" stroke="#A5B3C2" stroke-width="1.8" stroke-linecap="round"/>
          <circle cx="20" cy="7" r="1.8" fill="#F0C445"/><circle cx="25" cy="6" r="1.3" fill="#E55039"/>
        </svg>`;
      case "crown":
        return `<svg width="${size}" height="${size}" viewBox="0 0 36 36">
          <polygon points="4,26 6,10 13,18 18,7 23,18 30,10 32,26" fill="#F0C445" stroke="#1E1812" stroke-width="1.8" stroke-linejoin="round"/>
          <polygon points="7,24 8,14 13,19 18,10 21,18" fill="#FFF6C4" opacity="0.55"/>
          <rect x="4" y="25" width="28" height="5" rx="2" fill="#982B2B" stroke="#1E1812" stroke-width="1.6"/>
          <circle cx="11" cy="27.5" r="1.4" fill="#F0C445"/>
          <circle cx="18" cy="27.5" r="1.6" fill="#54A0FF"/>
          <circle cx="25" cy="27.5" r="1.4" fill="#F0C445"/>
        </svg>`;
      case "crest":
        return `<svg width="${size}" height="${size}" viewBox="0 0 36 36">
          <path d="M5 5 L18 2 L31 5 L31 18 C31 27.5 18 34 18 34 C18 34 5 27.5 5 18 Z" fill="#173156" stroke="#F0C445" stroke-width="2.4"/>
          <path d="M8 7.5 L18 5 L28 7.5 L28 17.5 C28 24.5 18 30 18 30 C18 30 8 24.5 8 17.5 Z" fill="#244B82"/>
          <path d="M18 6 L18 30 M8.5 16 L27.5 16" stroke="#F0C445" stroke-width="2.8"/>
          <circle cx="18" cy="16" r="2.8" fill="#982B2B" stroke="#F0C445" stroke-width="1.2"/>
        </svg>`;
      case "map":
        return `<svg width="${size}" height="${size}" viewBox="0 0 36 36">
          <polygon points="4,8 13,5 23,9 32,6 32,28 23,31 13,27 4,30" fill="#F6E8CA" stroke="#1E1812" stroke-width="2" stroke-linejoin="round"/>
          <line x1="13" y1="5" x2="13" y2="27" stroke="#A68B67" stroke-width="1.6"/>
          <line x1="23" y1="9" x2="23" y2="31" stroke="#A68B67" stroke-width="1.6"/>
          <path d="M8 21 Q15 12 27 17" fill="none" stroke="#982B2B" stroke-width="2.2" stroke-dasharray="3,2"/>
          <circle cx="27" cy="17" r="2.4" fill="#982B2B"/>
        </svg>`;
      case "abacus":
        return `<svg width="${size}" height="${size}" viewBox="0 0 36 36">
          <rect x="4" y="6" width="28" height="24" rx="3.5" fill="#FAF2E1" stroke="#6E4726" stroke-width="2.6"/>
          <line x1="7" y1="13" x2="29" y2="13" stroke="#4A3520" stroke-width="1.8"/>
          <line x1="7" y1="23" x2="29" y2="23" stroke="#4A3520" stroke-width="1.8"/>
          <circle cx="11" cy="13" r="3.4" fill="#24578D" stroke="#1E1812" stroke-width="1.2"/>
          <circle cx="19" cy="13" r="3.4" fill="#24578D" stroke="#1E1812" stroke-width="1.2"/>
          <circle cx="14" cy="23" r="3.4" fill="#D4882A" stroke="#1E1812" stroke-width="1.2"/>
          <circle cx="23" cy="23" r="3.4" fill="#D4882A" stroke="#1E1812" stroke-width="1.2"/>
        </svg>`;
      case "scroll":
        return `<svg width="${size}" height="${size}" viewBox="0 0 36 36">
          <rect x="8" y="6" width="20" height="24" rx="2" fill="#FAF2E1" stroke="#1E1812" stroke-width="1.8"/>
          <rect x="5" y="5" width="26" height="4.5" rx="2.2" fill="#E5B93C" stroke="#1E1812" stroke-width="1.5"/>
          <rect x="5" y="26.5" width="26" height="4.5" rx="2.2" fill="#E5B93C" stroke="#1E1812" stroke-width="1.5"/>
          <line x1="12" y1="13.5" x2="24" y2="13.5" stroke="#982B2B" stroke-width="1.8" stroke-linecap="round"/>
          <line x1="12" y1="18" x2="24" y2="18" stroke="#473B2E" stroke-width="1.5" stroke-linecap="round"/>
          <line x1="12" y1="22.5" x2="20" y2="22.5" stroke="#473B2E" stroke-width="1.5" stroke-linecap="round"/>
        </svg>`;
      case "speakerOn":
        return `<svg width="${size}" height="${size}" viewBox="0 0 36 36">
          <polygon points="6,14 13,14 21,7 21,29 13,22 6,22" fill="#173156" stroke="#1E1812" stroke-width="1.8" stroke-linejoin="round"/>
          <path d="M25 13 C28 16 28 20 25 23 M28 9 C33 14 33 22 28 27" fill="none" stroke="#C69722" stroke-width="2.4" stroke-linecap="round"/>
        </svg>`;
      case "speakerOff":
        return `<svg width="${size}" height="${size}" viewBox="0 0 36 36">
          <polygon points="6,14 13,14 21,7 21,29 13,22 6,22" fill="#766756" stroke="#1E1812" stroke-width="1.8" stroke-linejoin="round"/>
          <line x1="25" y1="13" x2="32" y2="23" stroke="#982B2B" stroke-width="2.5" stroke-linecap="round"/>
          <line x1="32" y1="13" x2="25" y2="23" stroke="#982B2B" stroke-width="2.5" stroke-linecap="round"/>
        </svg>`;
      case "reset":
        return `<svg width="${size}" height="${size}" viewBox="0 0 36 36">
          <path d="M10 14 A 10 10 0 1 1 9 23" fill="none" stroke="#173156" stroke-width="2.6" stroke-linecap="round"/>
          <polygon points="6,15 11,8 15,15" fill="#173156"/>
        </svg>`;
      case "seal":
        return `<svg width="${size}" height="${size}" viewBox="0 0 36 36">
          <circle cx="18" cy="18" r="15" fill="#982B2B" stroke="#F0C445" stroke-width="2.4"/>
          <circle cx="18" cy="18" r="11.5" fill="#7D1D1D" stroke="#F0C445" stroke-width="1.2" stroke-dasharray="2.5,2"/>
          <polygon points="10.5,22.5 12,12.5 15.2,17 18,10.5 20.8,17 24,12.5 25.5,22.5" fill="#F0C445" stroke="#4A1010" stroke-width="0.8" stroke-linejoin="round"/>
        </svg>`;
      default:
        return this.getItemSVG("shield", "primary", size);
    }
  },

  // --------------------------------------------------------------------------
  // 2. MASTER ALDOUS (ILLUMINATED ROYAL SCHOLAR PORTRAIT SVG)
  // --------------------------------------------------------------------------
  getMerlinPortraitSVG() {
    return `<svg viewBox="0 0 64 64" width="100%" height="100%">
      <defs>
        <radialGradient id="aldousBg" cx="50%" cy="35%" r="65%">
          <stop offset="0%" stop-color="#2B5288"/>
          <stop offset="100%" stop-color="#10223E"/>
        </radialGradient>
        <linearGradient id="aldousBeard" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#FFFFFF"/>
          <stop offset="65%" stop-color="#E4E0D8"/>
          <stop offset="100%" stop-color="#C2BCB0"/>
        </linearGradient>
      </defs>
      <!-- Gilded Medallion Frame -->
      <circle cx="32" cy="32" r="30" fill="url(#aldousBg)" stroke="#E5B93C" stroke-width="3.2"/>
      <circle cx="32" cy="32" r="26.5" fill="none" stroke="#F8E296" stroke-width="0.9" opacity="0.55"/>
      <!-- Starlight dots -->
      <circle cx="14" cy="18" r="1.1" fill="#FFF3B0"/>
      <circle cx="50" cy="16" r="1.3" fill="#FFF3B0"/>
      <circle cx="13" cy="34" r="0.9" fill="#FFF3B0"/>
      <!-- Velvet Robe & Gold Stole -->
      <path d="M9 56 Q32 41 55 56" fill="#1F406E" stroke="#E5B93C" stroke-width="2.2"/>
      <path d="M24 46 L28 57 M40 46 L36 57" stroke="#F0C445" stroke-width="2.5"/>
      <!-- Warm Shaded Face & Ears -->
      <circle cx="20.5" cy="29" r="2.5" fill="#E8C09B" stroke="#1E1812" stroke-width="1.3"/>
      <circle cx="43.5" cy="29" r="2.5" fill="#E8C09B" stroke="#1E1812" stroke-width="1.3"/>
      <circle cx="32" cy="29" r="11.5" fill="#F7D8B8" stroke="#1E1812" stroke-width="1.6"/>
      <circle cx="26" cy="30.5" r="2.2" fill="#E59882" opacity="0.4"/>
      <circle cx="38" cy="30.5" r="2.2" fill="#E59882" opacity="0.4"/>
      <!-- Flowing Layered Silver Beard & Mustache -->
      <path d="M20 31 C17 45 24 55 32 58 C40 55 47 45 44 31 C39 35 35 35 32 35 C29 35 25 35 20 31 Z" fill="url(#aldousBeard)" stroke="#1E1812" stroke-width="1.6" stroke-linejoin="round"/>
      <path d="M26 38 Q29 48 32 54 M38 38 Q35 48 32 54" fill="none" stroke="#C5BFB3" stroke-width="1.3" stroke-linecap="round"/>
      <path d="M23 32.5 Q28 29.5 32 32.5 Q36 29.5 41 32.5" fill="none" stroke="#FFFFFF" stroke-width="2.6" stroke-linecap="round"/>
      <!-- Expressive Kind Eyes with Catchlights -->
      <circle cx="27.5" cy="27" r="2" fill="#1E1812"/>
      <circle cx="36.5" cy="27" r="2" fill="#1E1812"/>
      <circle cx="27" cy="26.3" r="0.7" fill="#FFFFFF"/>
      <circle cx="36" cy="26.3" r="0.7" fill="#FFFFFF"/>
      <path d="M24 23.8 Q27.5 21.5 30.5 23.8 M33.5 23.8 Q36.5 21.5 40 23.8" fill="none" stroke="#FFFFFF" stroke-width="2.1" stroke-linecap="round"/>
      <!-- Royal Astronomer/Scholar Hat with Gold Crest -->
      <path d="M15 21 Q32 2 49 21 Z" fill="#162E52" stroke="#E5B93C" stroke-width="1.8" stroke-linejoin="round"/>
      <path d="M13 21 Q32 16.5 51 21" fill="none" stroke="#F0C445" stroke-width="3" stroke-linecap="round"/>
      <polygon points="32,8 33.4,11.5 37,12 34.2,14.2 35,17.8 32,15.8 29,17.8 29.8,14.2 27,12 30.6,11.5" fill="#F0C445"/>
    </svg>`;
  },

  // --------------------------------------------------------------------------
  // 3. VISUAL MISSION ENCOUNTER & BOSS HEALTH BAR (5 Hits to Win!)
  // --------------------------------------------------------------------------
  renderMissionEncounter(missionType = "bandits", hits = 0) {
    if (missionType.startsWith("boss-")) {
      const bossKey = missionType.replace("boss-", "");
      const bossSVG = this.getBossSVG(bossKey, hits >= 5);
      let heartsHTML = "";
      for (let i = 0; i < 5; i++) {
        const isStruck = i < hits;
        heartsHTML += isStruck
          ? `<svg width="32" height="34" viewBox="0 0 32 34">
               <path d="M4 5 L16 2 L28 5 L28 17 C28 25 16 32 16 32 C16 32 4 25 4 17 Z" fill="#E5D8BF" stroke="#982B2B" stroke-width="2" stroke-dasharray="3,2"/>
               <line x1="6" y1="28" x2="26" y2="6" stroke="#982B2B" stroke-width="4" stroke-linecap="round"/>
             </svg>`
          : `<svg width="32" height="34" viewBox="0 0 32 34">
               <path d="M4 5 L16 2 L28 5 L28 17 C28 25 16 32 16 32 C16 32 4 25 4 17 Z" fill="#982B2B" stroke="#E5B93C" stroke-width="2.4"/>
               <polygon points="16,8 19,15 16,24 13,15" fill="#E5B93C"/>
             </svg>`;
      }
      return `
        <div style="display:flex;align-items:center;gap:12px;">
          <div style="width:44px;height:44px;">${bossSVG}</div>
          <div style="display:flex;gap:6px;align-items:center;">${heartsHTML}</div>
        </div>
      `;
    }

    let slotsHTML = "";
    for (let i = 0; i < 5; i++) {
      const done = i < hits;
      slotsHTML += this.getMissionTargetSlotSVG(missionType, done);
    }
    return `<div style="display:flex;gap:8px;align-items:center;">${slotsHTML}</div>`;
  },

  getBossSVG(bossKey, defeated = false, size = null) {
    const op = defeated ? "0.42" : "1";
    const dim = size ? `width="${size}" height="${size}"` : `width="100%" height="100%"`;
    if (bossKey === "dragon") {
      return `<svg viewBox="0 0 48 48" ${dim} opacity="${op}">
        <circle cx="24" cy="24" r="22" fill="#4A1212" stroke="#F0C445" stroke-width="2.6"/>
        <!-- Golden Horns -->
        <path d="M12 15 Q8 5 15 6 L19 14 Z" fill="#F0C445" stroke="#1E1812" stroke-width="1.4"/>
        <path d="M36 15 Q40 5 33 6 L29 14 Z" fill="#F0C445" stroke="#1E1812" stroke-width="1.4"/>
        <!-- Crimson Dragon Head & Wing Frills -->
        <path d="M8 20 L14 13 L24 11 L34 13 L40 20 L36 33 L24 42 L12 33 Z" fill="#C0292B" stroke="#1E1812" stroke-width="1.8" stroke-linejoin="round"/>
        <path d="M15 16 L24 13 L33 16 L31 31 L24 38 L17 31 Z" fill="#DF3E3E"/>
        <!-- Glowing Amber Dragon Eyes -->
        <polygon points="15,21 22,23.5 16,25.5" fill="#FFF275" stroke="#1E1812" stroke-width="1"/>
        <polygon points="33,21 26,23.5 32,25.5" fill="#FFF275" stroke="#1E1812" stroke-width="1"/>
        <!-- Nostrils & Fangs -->
        <circle cx="21" cy="31" r="1.3" fill="#2C0B0E"/><circle cx="27" cy="31" r="1.3" fill="#2C0B0E"/>
        <path d="M17 35 L20 32 L24 35 L28 32 L31 35" fill="none" stroke="#FFFDF5" stroke-width="2" stroke-linecap="round"/>
      </svg>`;
    } else if (bossKey === "serpent") {
      return `<svg viewBox="0 0 48 48" ${dim} opacity="${op}">
        <circle cx="24" cy="24" r="22" fill="#103242" stroke="#F0C445" stroke-width="2.6"/>
        <!-- Golden Fin Crest -->
        <polygon points="24,5 28,11 35,9 32,16 24,13" fill="#F0C445" stroke="#1E1812" stroke-width="1.2"/>
        <!-- Coiled Sea-Serpent Body -->
        <path d="M10 38 C11 16 20 10 28 11 C37 12 39 22 33 25 C25 23 23 30 25 38 Z" fill="#1F8A85" stroke="#1E1812" stroke-width="1.8"/>
        <path d="M15 37 C16 22 22 17 28 17" fill="none" stroke="#78E0DC" stroke-width="2.2" stroke-linecap="round"/>
        <circle cx="29" cy="16.5" r="2.5" fill="#FFF275" stroke="#1E1812" stroke-width="1"/>
        <!-- Foaming Waves -->
        <path d="M8 38 Q16 34 24 38 Q32 34 40 38" fill="none" stroke="#A8E6FF" stroke-width="2.5" stroke-linecap="round"/>
      </svg>`;
    } else if (bossKey === "golem") {
      return `<svg viewBox="0 0 48 48" ${dim} opacity="${op}">
        <circle cx="24" cy="24" r="22" fill="#2C353D" stroke="#F0C445" stroke-width="2.6"/>
        <!-- Riveted Iron Helm & Pauldrons -->
        <rect x="11" y="11" width="26" height="26" rx="5" fill="#8C9BA5" stroke="#1E1812" stroke-width="2"/>
        <rect x="14" y="14" width="20" height="8" rx="2" fill="#485460" stroke="#1E1812" stroke-width="1.4"/>
        <!-- Glowing Furnace Eyes -->
        <rect x="16" y="16" width="6" height="4" rx="1" fill="#FF9F43"/>
        <rect x="26" y="16" width="6" height="4" rx="1" fill="#FF9F43"/>
        <!-- Iron Grille Mouth -->
        <rect x="16" y="27" width="16" height="6" rx="1.5" fill="#2F3640" stroke="#1E1812" stroke-width="1.3"/>
        <line x1="20" y1="27" x2="20" y2="33" stroke="#E5B93C" stroke-width="1.5"/>
        <line x1="24" y1="27" x2="24" y2="33" stroke="#E5B93C" stroke-width="1.5"/>
        <line x1="28" y1="27" x2="28" y2="33" stroke="#E5B93C" stroke-width="1.5"/>
      </svg>`;
    } else {
      // Forest Giant
      return `<svg viewBox="0 0 48 48" ${dim} opacity="${op}">
        <circle cx="24" cy="24" r="22" fill="#233D26" stroke="#F0C445" stroke-width="2.6"/>
        <!-- Mossy Leaf Crown -->
        <path d="M11 17 Q16 8 24 11 Q32 8 37 17 Z" fill="#3B7A47" stroke="#1E1812" stroke-width="1.6"/>
        <!-- Timber Colossus Face & Beard -->
        <circle cx="24" cy="26" r="13" fill="#B57C4A" stroke="#1E1812" stroke-width="1.8"/>
        <path d="M12 28 Q24 41 36 28 L33 38 Q24 43 15 38 Z" fill="#5E3D22" stroke="#1E1812" stroke-width="1.6"/>
        <circle cx="19" cy="23" r="2.3" fill="#FFF275" stroke="#1E1812" stroke-width="1.1"/>
        <circle cx="29" cy="23" r="2.3" fill="#FFF275" stroke="#1E1812" stroke-width="1.1"/>
        <path d="M19 31 Q24 28 29 31" fill="none" stroke="#1E1812" stroke-width="2" stroke-linecap="round"/>
      </svg>`;
    }
  },

  getMissionTargetSlotSVG(type, done) {
    if (type === "locks") {
      return done
        ? `<svg width="34" height="36" viewBox="0 0 34 36" title="Unlocked!">
             <path d="M11 15 L11 8 A6 6 0 0 1 23 6" fill="none" stroke="#245B3C" stroke-width="3.2" stroke-linecap="round"/>
             <rect x="6" y="15" width="22" height="17" rx="3.5" fill="#F0C445" stroke="#173156" stroke-width="2"/>
             <circle cx="17" cy="22" r="2.5" fill="#173156"/>
             <path d="M15.5 23 L18.5 23 L19 28 L15 28 Z" fill="#173156"/>
           </svg>`
        : `<svg width="34" height="36" viewBox="0 0 34 36" title="Locked Cage">
             <path d="M11 16 L11 10 A6 6 0 0 1 23 10 L23 16" fill="none" stroke="#546270" stroke-width="3.2"/>
             <rect x="6" y="16" width="22" height="17" rx="3.5" fill="#8C9BA5" stroke="#1E1812" stroke-width="2"/>
             <circle cx="17" cy="23" r="2.5" fill="#1E1812"/>
             <path d="M15.5 24 L18.5 24 L19 29 L15 29 Z" fill="#1E1812"/>
           </svg>`;
    } else if (type === "ships") {
      return done
        ? `<svg width="36" height="36" viewBox="0 0 36 36" title="Pirate Skiff Sunk!">
             <circle cx="18" cy="18" r="14" fill="#EAF5EE" stroke="#245B3C" stroke-width="2.2"/>
             <path d="M6 25 Q18 21 30 25" fill="none" stroke="#24578D" stroke-width="2.8" stroke-linecap="round"/>
             <path d="M11 18 L16 23 L25 12" fill="none" stroke="#245B3C" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>
           </svg>`
        : `<svg width="36" height="36" viewBox="0 0 36 36" title="Pirate Skiff">
             <polygon points="18,4 18,22 30,19" fill="#982B2B" stroke="#1E1812" stroke-width="1.5" stroke-linejoin="round"/>
             <polygon points="18,6 18,20 9,19" fill="#F2E4C6" stroke="#1E1812" stroke-width="1.4" stroke-linejoin="round"/>
             <polygon points="5,23 31,23 26,31 10,31" fill="#6E4726" stroke="#1E1812" stroke-width="1.8" stroke-linejoin="round"/>
           </svg>`;
    } else if (type === "fort") {
      return done
        ? `<svg width="34" height="36" viewBox="0 0 34 36" title="Wall Raised!">
             <rect x="5" y="12" width="24" height="20" rx="2" fill="#F0C445" stroke="#173156" stroke-width="2"/>
             <rect x="5" y="7" width="6" height="6" fill="#982B2B" stroke="#173156" stroke-width="1.5"/>
             <rect x="14" y="7" width="6" height="6" fill="#173156" stroke="#173156" stroke-width="1.5"/>
             <rect x="23" y="7" width="6" height="6" fill="#982B2B" stroke="#173156" stroke-width="1.5"/>
             <path d="M14 32 L14 23 A3 3 0 0 1 20 23 L20 32 Z" fill="#5A3921"/>
           </svg>`
        : `<svg width="34" height="36" viewBox="0 0 34 36" title="Unbuilt Wall">
             <rect x="5" y="17" width="24" height="15" rx="2" fill="rgba(255,255,255,0.55)" stroke="#8C7353" stroke-width="2" stroke-dasharray="3,2"/>
           </svg>`;
    } else {
      return done
        ? `<svg width="34" height="36" viewBox="0 0 34 36" title="Foe Defeated!">
             <circle cx="17" cy="18" r="13.5" fill="#EAF5EE" stroke="#245B3C" stroke-width="2.4"/>
             <path d="M10 18 L15 23 L24 12" fill="none" stroke="#245B3C" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/>
           </svg>`
        : `<svg width="34" height="36" viewBox="0 0 34 36" title="Raider Standing">
             <path d="M5 6 L17 2.5 L29 6 L29 18 C29 26.5 17 33.5 17 33.5 C17 33.5 5 26.5 5 18 Z" fill="#4B5660" stroke="#1E1812" stroke-width="2"/>
             <line x1="11" y1="12" x2="23" y2="24" stroke="#F0C445" stroke-width="2.5" stroke-linecap="round"/>
             <line x1="23" y1="12" x2="11" y2="24" stroke="#F0C445" stroke-width="2.5" stroke-linecap="round"/>
           </svg>`;
    }
  },

  // --------------------------------------------------------------------------
  // 4. STORYBOOK PICTORIAL ITEM SVG ICONS (3D Shaded Apples, Shields, Lanterns, Logs)
  // --------------------------------------------------------------------------
  getItemSVG(type = "apple", colorVariant = "primary", size = 38) {
    const isSecondary = colorVariant === "secondary";
    const fillPrimary = isSecondary ? "#D9822B" : "#22558C";
    const fillPrimaryLight = isSecondary ? "#F5B056" : "#4A82BE";
    const fillApple = isSecondary ? "#F0B436" : "#CC2E28";
    const fillAppleDark = isSecondary ? "#C48216" : "#8F1B17";

    switch (type) {
      case "apple":
        return `<svg width="${size}" height="${size}" viewBox="0 0 36 36">
          <path d="M18 8 C19 4 22 3 24 4" stroke="#5A3921" stroke-width="2.5" fill="none" stroke-linecap="round"/>
          <path d="M19 6.5 C23 3.5 28 5.5 26 9.5 C23.5 10.5 20 8.5 19 6.5 Z" fill="#2E7D47" stroke="#1E1812" stroke-width="1.2"/>
          <path d="M18 9.5 C11 8 5.5 13 6.8 21 C8 28.5 13 33 17 32 C18 31.8 18 31.8 19 32 C23 33 28 28.5 29.2 21 C30.5 13 25 8 18 9.5 Z" fill="${fillApple}" stroke="#1E1812" stroke-width="1.8"/>
          <path d="M18 31.5 C22.5 32.5 27 28 28.2 21 C29 15 25.5 10.5 21 9.8 C24.5 13 25 24 18 31.5 Z" fill="${fillAppleDark}" opacity="0.35"/>
          <path d="M11 14 C9.8 17 9.8 21 11.8 24" stroke="#FFFFFF" stroke-width="2" opacity="0.65" fill="none" stroke-linecap="round"/>
        </svg>`;
      case "shield":
        return `<svg width="${size}" height="${size}" viewBox="0 0 36 36">
          <path d="M5.5 5.5 L18 2.5 L30.5 5.5 L30.5 18 C30.5 26.8 18 33.5 18 33.5 C18 33.5 5.5 26.8 5.5 18 Z" fill="${fillPrimary}" stroke="#1E1812" stroke-width="1.8" stroke-linejoin="round"/>
          <path d="M8 7.5 L18 5 L18 30.5 C18 30.5 8 24.5 8 17.5 Z" fill="${fillPrimaryLight}" opacity="0.45"/>
          <path d="M18 4.5 L18 31.5 M7.5 15.5 L28.5 15.5" stroke="#F0C445" stroke-width="2.6"/>
          <circle cx="18" cy="15.5" r="2.2" fill="#FFFFFF" opacity="0.8"/>
        </svg>`;
      case "lantern":
        return `<svg width="${size}" height="${size}" viewBox="0 0 36 36">
          <circle cx="18" cy="4.5" r="2.4" fill="none" stroke="#1E1812" stroke-width="1.8"/>
          <polygon points="10.5,8.5 25.5,8.5 28.5,13 7.5,13" fill="#343D46" stroke="#1E1812" stroke-width="1.6" stroke-linejoin="round"/>
          <rect x="9.5" y="13" width="17" height="15" rx="2" fill="${isSecondary ? '#FFEAA7' : '#F8C444'}" stroke="#1E1812" stroke-width="1.6"/>
          <path d="M18 15.5 C14.5 19.5 15.5 24.5 18 25.5 C20.5 24.5 21.5 19.5 18 15.5 Z" fill="#EB4D4B"/>
          <path d="M18 18 C16.5 20.5 17 23.5 18 24.2 C19 23.5 19.5 20.5 18 18 Z" fill="#FFF275"/>
          <polygon points="8.5,28 27.5,28 29.5,32 6.5,32" fill="#343D46" stroke="#1E1812" stroke-width="1.6" stroke-linejoin="round"/>
        </svg>`;
      case "log":
        return `<svg width="${size}" height="${size}" viewBox="0 0 36 36">
          <rect x="4.5" y="10.5" width="23" height="15" rx="3" fill="${isSecondary ? '#B57B48' : '#7C4D28'}" stroke="#1E1812" stroke-width="1.8"/>
          <line x1="8" y1="15" x2="22" y2="15" stroke="#4D2E16" stroke-width="1.4" stroke-linecap="round"/>
          <line x1="10" y1="21" x2="23" y2="21" stroke="#4D2E16" stroke-width="1.4" stroke-linecap="round"/>
          <ellipse cx="27.5" cy="18" rx="4.2" ry="7.5" fill="#F0D5AC" stroke="#1E1812" stroke-width="1.8"/>
          <ellipse cx="27.5" cy="18" rx="2.2" ry="4" fill="none" stroke="#A67B51" stroke-width="1.1"/>
          <circle cx="27.5" cy="18" r="1.2" fill="#7C4D28"/>
        </svg>`;
      case "loaf":
        return `<svg width="${size}" height="${size}" viewBox="0 0 36 36">
          <path d="M4.5 24 C3.5 13.5 9.5 9.5 18 9.5 C26.5 9.5 32.5 13.5 31.5 24 C31.5 27.5 28 28.5 18 28.5 C8 28.5 4.5 27.5 4.5 24 Z" fill="${isSecondary ? '#EDA83B' : '#CD8128'}" stroke="#1E1812" stroke-width="1.8"/>
          <path d="M8 15 C12 11.5 24 11.5 28 15" fill="none" stroke="#F8D794" stroke-width="2" stroke-linecap="round" opacity="0.6"/>
          <path d="M12.5 13 L14.5 19 M18 12 L20 18 M23.5 13 L25.5 19" stroke="#FFF5E4" stroke-width="1.9" stroke-linecap="round"/>
        </svg>`;
      case "coin":
      default:
        return `<svg width="${size}" height="${size}" viewBox="0 0 36 36">
          <circle cx="18" cy="18" r="13.5" fill="${isSecondary ? '#F0C445' : '#24578D'}" stroke="#1E1812" stroke-width="1.8"/>
          <circle cx="18" cy="18" r="10" fill="none" stroke="#FFFFFF" stroke-width="1.5" opacity="0.7"/>
          <polygon points="18,11 20,16 25,16 21,19 22.5,24 18,21 13.5,24 15,19 11,16 16,16" fill="#FFFFFF" opacity="0.65"/>
        </svg>`;
    }
  },

  // --------------------------------------------------------------------------
  // 5. YOUNG SQUIRE CHARACTER TOKEN SVG (Heroic Storybook Knight-Errant)
  // --------------------------------------------------------------------------
  getSquireSVG() {
    return `<svg viewBox="0 0 64 72" width="100%" height="100%">
      <!-- Billowing Crimson Cloak -->
      <path d="M17 31 Q8 48 10 63 L54 63 Q56 48 47 31 Z" fill="#A62626" stroke="#1E1812" stroke-width="2" stroke-linejoin="round"/>
      <!-- Upheld Broadsword in Right Hand -->
      <path d="M49 12 L53 12 L52 36 L48 36 Z" fill="#E2E8F0" stroke="#1E1812" stroke-width="1.5"/>
      <line x1="45" y1="36" x2="55" y2="36" stroke="#F0C445" stroke-width="3" stroke-linecap="round"/>
      <!-- Royal Blue Surcoat & Golden Cross -->
      <rect x="20" y="30" width="24" height="25" rx="5" fill="#1B3B68" stroke="#1E1812" stroke-width="2"/>
      <line x1="32" y1="32" x2="32" y2="53" stroke="#F0C445" stroke-width="2.8"/>
      <line x1="25" y1="39" x2="39" y2="39" stroke="#F0C445" stroke-width="2.4"/>
      <rect x="20" y="45" width="24" height="4.2" fill="#C69722" stroke="#1E1812" stroke-width="1.2"/>
      <!-- Boots -->
      <rect x="23.5" y="55" width="6.5" height="11" rx="2.2" fill="#5A3921" stroke="#1E1812" stroke-width="1.8"/>
      <rect x="34" y="55" width="6.5" height="11" rx="2.2" fill="#5A3921" stroke="#1E1812" stroke-width="1.8"/>
      <!-- Young Squire Head & Smile -->
      <circle cx="32" cy="20.5" r="10.5" fill="#F7D8B8" stroke="#1E1812" stroke-width="2"/>
      <path d="M21.5 18.5 Q24 9.5 33 10.5 Q41.5 10.5 42.5 18.5 Q38 14.5 32 14.5 Q25 14.5 21.5 18.5 Z" fill="#633E22" stroke="#1E1812" stroke-width="1.5"/>
      <circle cx="28.5" cy="20.5" r="1.7" fill="#1E1812"/>
      <circle cx="35.5" cy="20.5" r="1.7" fill="#1E1812"/>
      <circle cx="28" cy="19.9" r="0.6" fill="#FFFFFF"/>
      <circle cx="35" cy="19.9" r="0.6" fill="#FFFFFF"/>
      <path d="M28.5 24.8 Q32 27.2 35.5 24.8" fill="none" stroke="#1E1812" stroke-width="1.6" stroke-linecap="round"/>
      <!-- Squire's Crested Cap & Golden Plume -->
      <path d="M19.5 14 Q32 5 44.5 14 Z" fill="#173156" stroke="#1E1812" stroke-width="1.8"/>
      <path d="M37 10 Q48 1 54 7 Q47 12 38 12.5 Z" fill="#F0C445" stroke="#1E1812" stroke-width="1.4"/>
      <!-- Heraldic Heater Shield -->
      <path d="M9.5 33 L22.5 30 L22.5 43 C22.5 51 16 55.5 16 55.5 C16 55.5 9.5 51 9.5 43 Z" fill="#FFFDF8" stroke="#173156" stroke-width="2.2" stroke-linejoin="round"/>
      <path d="M16 32 L16 53.5 M11 41 L21 41" stroke="#982B2B" stroke-width="2.4"/>
    </svg>`;
  },

  // --------------------------------------------------------------------------
  // 6. ILLUSTRATED KINGDOM OVERWORLD MAP SVG (4 Lush Biomes & Classical Cartouche)
  // --------------------------------------------------------------------------
  renderKingdomMapSVG(nodes) {
    const points = nodes.map(n => ({
      x: (n.mapPos.x / 100) * 1200,
      y: (n.mapPos.y / 100) * 650
    }));

    let pathD = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const midX = (prev.x + curr.x) / 2;
      const midY = (prev.y + curr.y) / 2 - (i % 2 === 0 ? 18 : -18);
      pathD += ` Q ${midX} ${midY}, ${curr.x} ${curr.y}`;
    }

    return `<svg viewBox="0 0 1200 650" preserveAspectRatio="none">
      <defs>
        <radialGradient id="parchmentGlow" cx="48%" cy="46%" r="68%">
          <stop offset="0%" stop-color="#FCF6E8"/>
          <stop offset="58%" stop-color="#EFE0C2"/>
          <stop offset="100%" stop-color="#D4BE94"/>
        </radialGradient>
        <linearGradient id="riverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#89C4E1"/>
          <stop offset="50%" stop-color="#4F8FB8"/>
          <stop offset="100%" stop-color="#2E648C"/>
        </linearGradient>
        <radialGradient id="forestBiome" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#6DA362" stop-opacity="0.38"/>
          <stop offset="100%" stop-color="#6DA362" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="highlandBiome" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#C89D66" stop-opacity="0.34"/>
          <stop offset="100%" stop-color="#C89D66" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="dragonBiome" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#D96B43" stop-opacity="0.28"/>
          <stop offset="100%" stop-color="#D96B43" stop-opacity="0"/>
        </radialGradient>
      </defs>

      <!-- Warm Illuminated Parchment Base -->
      <rect width="1200" height="650" fill="url(#parchmentGlow)"/>

      <!-- Subtle Cartographic Grid & Rhumb Lines -->
      <g stroke="#B89F74" stroke-width="0.7" opacity="0.32">
        <line x1="0" y1="162" x2="1200" y2="162"/>
        <line x1="0" y1="325" x2="1200" y2="325"/>
        <line x1="0" y1="487" x2="1200" y2="487"/>
        <line x1="300" y1="0" x2="300" y2="650"/>
        <line x1="600" y1="0" x2="600" y2="650"/>
        <line x1="900" y1="0" x2="900" y2="650"/>
        <line x1="88" y1="240" x2="900" y2="80"/>
        <line x1="88" y1="240" x2="900" y2="520"/>
      </g>

      <!-- 4 Biome Region Glows -->
      <ellipse cx="205" cy="445" rx="255" ry="200" fill="url(#forestBiome)"/>
      <ellipse cx="485" cy="340" rx="235" ry="240" fill="url(#highlandBiome)"/>
      <ellipse cx="730" cy="340" rx="230" ry="250" fill="url(#highlandBiome)"/>
      <ellipse cx="1015" cy="280" rx="240" ry="260" fill="url(#dragonBiome)"/>

      <!-- The Great River of Twenty (With Banks & Shimmering Ripples) -->
      <path d="M 465 -15 C 480 95, 575 140, 545 255 C 515 365, 600 445, 555 565 C 535 615, 515 645, 505 665"
            fill="none" stroke="#C2AB82" stroke-width="52" stroke-linecap="round"/>
      <path d="M 465 -15 C 480 95, 575 140, 545 255 C 515 365, 600 445, 555 565 C 535 615, 515 645, 505 665"
            fill="none" stroke="url(#riverGrad)" stroke-width="38" stroke-linecap="round"/>
      <path d="M 465 -15 C 480 95, 575 140, 545 255 C 515 365, 600 445, 555 565"
            fill="none" stroke="#CBE9F7" stroke-width="3" stroke-dasharray="14,18" stroke-linecap="round" opacity="0.75"/>

      <!-- Highland Cove & Pirate Waters (Bottom Right Inlet) -->
      <path d="M 720 650 Q 755 540 825 585 L 860 650 Z" fill="url(#riverGrad)" opacity="0.65"/>

      <!-- Multi-Faceted Snow-Capped Mountains (West & East Ranges) -->
      <g stroke="#3E3225" stroke-width="1.8" stroke-linejoin="round">
        <!-- Western Foothills -->
        <polygon points="105,180 155,88 205,180" fill="#D5C2A3"/>
        <polygon points="155,88 180,180 205,180" fill="#B59F7E"/>
        <polygon points="155,88 140,116 155,110 170,118" fill="#FFFDF9"/>

        <polygon points="168,190 230,74 292,190" fill="#DFC09B"/>
        <polygon points="230,74 260,190 292,190" fill="#B89B74"/>
        <polygon points="230,74 210,110 228,102 248,112" fill="#FFFDF9"/>

        <!-- Highland Stronghold Peaks (Act III) -->
        <polygon points="645,145 700,45 755,145" fill="#D8C4A3"/>
        <polygon points="700,45 728,145 755,145" fill="#B29B78"/>
        <polygon points="700,45 682,78 700,72 718,80" fill="#FFFDF9"/>

        <!-- Dragon's Mountain Range (Act IV) -->
        <polygon points="885,155 950,34 1015,155" fill="#C9A882"/>
        <polygon points="950,34 985,155 1015,155" fill="#9E7E5B"/>
        <polygon points="950,34 930,72 950,65 970,74" fill="#FFE8BA"/>
      </g>

      <!-- Stoneholm Multi-Arch Bridge across the Great River -->
      <g transform="translate(495, 208)" stroke="#2C2219" stroke-width="1.8">
        <rect x="0" y="8" width="76" height="24" rx="4" fill="#C8BEB0"/>
        <rect x="4" y="2" width="12" height="8" fill="#DFD7CA"/>
        <rect x="60" y="2" width="12" height="8" fill="#DFD7CA"/>
        <path d="M12 32 A 11 11 0 0 1 34 32 M42 32 A 11 11 0 0 1 64 32" fill="#2E648C"/>
      </g>

      <!-- Lush Layered Woodland Groves (Pines & Ancient Oaks) -->
      <g stroke="#1E3522" stroke-width="1.5">
        <!-- Grove 1 -->
        <polygon points="65,455 82,412 99,455" fill="#2E693E"/>
        <polygon points="88,462 108,410 128,462" fill="#3D824F"/>
        <polygon points="115,458 132,418 149,458" fill="#2E693E"/>
        <!-- Grove 2 -->
        <circle cx="285" cy="465" r="18" fill="#357344"/>
        <circle cx="308" cy="456" r="22" fill="#468C56"/>
        <circle cx="328" cy="468" r="16" fill="#2E693E"/>
        <!-- Grove 3 -->
        <polygon points="365,285 382,242 399,285" fill="#2E693E"/>
        <polygon points="388,292 408,238 428,292" fill="#468C56"/>
        <!-- Grove 4 (Highland Pines) -->
        <polygon points="795,255 812,212 829,255" fill="#2E693E"/>
        <polygon points="818,262 838,208 858,262" fill="#3D824F"/>
      </g>

      <!-- Grand Royal Citadel & Cathedral Spires (Top Right) -->
      <g transform="translate(1025, 42)" stroke="#1E1812" stroke-width="1.8" stroke-linejoin="round">
        <rect x="16" y="34" width="76" height="50" fill="#F2E5C9"/>
        <rect x="4" y="18" width="24" height="66" fill="#E2D0AC"/>
        <rect x="80" y="18" width="24" height="66" fill="#E2D0AC"/>
        <rect x="38" y="12" width="32" height="72" fill="#FAF0DA"/>
        <polygon points="1,18 16,0 31,18" fill="#982B2B"/>
        <polygon points="77,18 92,0 107,18" fill="#982B2B"/>
        <polygon points="34,12 54,-12 74,12" fill="#173156"/>
        <circle cx="54" cy="32" r="8" fill="#F0C445"/>
        <path d="M44 84 L44 56 A10 10 0 0 1 64 56 L64 84 Z" fill="#5A3921"/>
      </g>

      <!-- Ornate Compass Rose -->
      <g transform="translate(76, 255)">
        <circle cx="0" cy="0" r="38" fill="#FDF9F0" stroke="#8C6D46" stroke-width="2.2"/>
        <circle cx="0" cy="0" r="31" fill="none" stroke="#C69722" stroke-width="1" stroke-dasharray="3,3"/>
        <polygon points="0,-34 7,-7 34,0 7,7 0,34 -7,7 -34,0 -7,-7" fill="#173156" stroke="#C69722" stroke-width="1.4"/>
        <polygon points="0,-34 0,0 7,-7" fill="#F0C445"/>
        <text x="0" y="-41" text-anchor="middle" font-family="Cinzel, serif" font-size="13" font-weight="800" fill="#173156">N</text>
      </g>

      <!-- The King's Highway (Dimensional Cobblestone Road & Golden Trail) -->
      <path d="${pathD}" fill="none" stroke="#6E5536" stroke-width="18" stroke-linecap="round" opacity="0.5"/>
      <path d="${pathD}" fill="none" stroke="#FAF1DC" stroke-width="11" stroke-linecap="round"/>
      <path d="${pathD}" fill="none" stroke="#C69722" stroke-width="3.5" stroke-dasharray="9,10" stroke-linecap="round"/>
    </svg>`;
  },

  // --------------------------------------------------------------------------
  // 7. MASTER ROUTER FOR LARGE, CLEAN VISUAL MATH DIAGRAMS
  // --------------------------------------------------------------------------
  renderMathVisual(container, spec) {
    if (!container || !spec) return;
    switch (spec.type) {
      case "number-bond-concrete":
        container.innerHTML = this.renderNumberBondAndFrame(spec);
        break;
      case "count-on-path":
        container.innerHTML = this.renderCountOnPath(spec);
        break;
      case "subtraction-crossout":
        container.innerHTML = this.renderSubtractionCrossOut(spec);
        break;
      case "comparison-rows":
        container.innerHTML = this.renderComparisonRows(spec);
        break;
      case "double-ten-frame":
        container.innerHTML = this.renderDoubleTenFrame(spec);
        break;
      case "make-ten":
        container.innerHTML = this.renderMakeTen(spec);
        break;
      case "subtract-from-ten":
        container.innerHTML = this.renderSubtractFromTen(spec);
        break;
      case "place-value":
        container.innerHTML = this.renderPlaceValue(spec);
        break;
      case "bar-model":
        container.innerHTML = this.renderBarModel(spec);
        break;
      case "regrouping":
        container.innerHTML = this.renderRegrouping(spec);
        break;
      case "equal-groups":
        container.innerHTML = this.renderEqualGroups(spec);
        break;
      case "shapes":
        container.innerHTML = this.renderShapes(spec);
        break;
      case "ordinals":
        container.innerHTML = this.renderOrdinals(spec);
        break;
      case "length-units":
        container.innerHTML = this.renderLengthUnits(spec);
        break;
      case "fractions":
        container.innerHTML = this.renderFractions(spec);
        break;
      case "clock":
        container.innerHTML = this.renderClock(spec);
        break;
      case "coins":
        container.innerHTML = this.renderCoins(spec);
        break;
      default:
        container.innerHTML = "";
    }
  },

  // --------------------------------------------------------------------------
  // DIAGRAM A: LARGE TEN-FRAME + NUMBER BOND (Uncluttered, Zero Clipped Text)
  // --------------------------------------------------------------------------
  renderNumberBondAndFrame(spec) {
    const { whole, partA, partB, missing, itemType = "apple" } = spec;

    let cellsHTML = "";
    for (let i = 0; i < 10; i++) {
      let content = "";
      if (i < partA) {
        content = this.getItemSVG(itemType, "primary", 44);
      } else if (i < partA + partB) {
        if (missing === "partB") {
          content = `<div style="width:40px;height:40px;border-radius:50%;border:3px dashed #B85D19;background:#FDF4EB;display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:800;color:#B85D19;font-family:var(--font-sans);">?</div>`;
        } else {
          content = this.getItemSVG(itemType, "secondary", 44);
        }
      }
      cellsHTML += `<div style="width:62px;height:62px;border:2px solid #2C3E50;display:flex;align-items:center;justify-content:center;background:#FFF;">${content}</div>`;
    }

    const wholeText = missing === "whole" ? "?" : whole;
    const partAText = missing === "partA" ? "?" : partA;
    const partBText = missing === "partB" ? "?" : partB;

    return `
      <div style="display:flex;align-items:center;justify-content:center;gap:54px;flex-wrap:wrap;width:100%;">
        <!-- Left: Large Ten-Frame -->
        <div style="display:grid;grid-template-columns:repeat(5, 62px);border:3.5px solid #1B365D;border-radius:10px;overflow:hidden;box-shadow:0 6px 16px rgba(0,0,0,0.08);">
          ${cellsHTML}
        </div>

        <!-- Right: Large Number Bond with generous viewBox so labels never clip -->
        <svg width="290" height="205" viewBox="0 0 290 205">
          <line x1="90" y1="102" x2="195" y2="50" stroke="#211C17" stroke-width="4"/>
          <line x1="90" y1="102" x2="195" y2="154" stroke="#211C17" stroke-width="4"/>

          <!-- Whole Circle -->
          <circle cx="70" cy="102" r="42" fill="${missing === 'whole' ? '#FBF4DE' : '#EBF4EE'}" stroke="${missing === 'whole' ? '#C59B27' : '#2B5B3F'}" stroke-width="4.5"/>
          <text x="70" y="114" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="34" font-weight="800" fill="${missing === 'whole' ? '#982B2B' : '#2B5B3F'}">${wholeText}</text>
          <text x="70" y="164" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="13" font-weight="800" fill="#2B5B3F">WHOLE</text>

          <!-- Part A Circle -->
          <circle cx="195" cy="50" r="34" fill="#EEF4FA" stroke="#24578D" stroke-width="4"/>
          <text x="195" y="61" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="28" font-weight="800" fill="#24578D">${partAText}</text>
          <text x="242" y="55" text-anchor="start" font-family="Plus Jakarta Sans, sans-serif" font-size="13" font-weight="800" fill="#24578D">PART</text>

          <!-- Part B Circle -->
          <circle cx="195" cy="154" r="34" fill="${missing === 'partB' ? '#FBF4DE' : '#FDF4EB'}" stroke="#B85D19" stroke-width="4" ${missing === 'partB' ? 'stroke-dasharray="6,4"' : ''}/>
          <text x="195" y="165" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="28" font-weight="800" fill="${missing === 'partB' ? '#982B2B' : '#B85D19'}">${partBText}</text>
          <text x="242" y="159" text-anchor="start" font-family="Plus Jakarta Sans, sans-serif" font-size="13" font-weight="800" fill="#B85D19">PART</text>
        </svg>
      </div>
    `;
  },

  // --------------------------------------------------------------------------
  // DIAGRAM B: COUNT-ON NUMBER PATH (1 to 10)
  // --------------------------------------------------------------------------
  renderCountOnPath(spec) {
    const { start, total } = spec;
    let boxesSVG = "";
    let arcsSVG = "";

    for (let n = 1; n <= 10; n++) {
      const x = 24 + (n - 1) * 64;
      const isStart = n === start;
      const isHop = n > start && n <= total;
      const bg = isStart ? "#24578D" : isHop ? "#FDF4EB" : "#FFFFFF";
      const textCol = isStart ? "#FFFFFF" : isHop ? "#B85D19" : "#211C17";
      const strokeCol = isStart ? "#1B365D" : isHop ? "#B85D19" : "#BFB39B";

      boxesSVG += `
        <rect x="${x}" y="76" width="56" height="56" rx="10" fill="${bg}" stroke="${strokeCol}" stroke-width="3"/>
        <text x="${x + 28}" y="113" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="26" font-weight="800" fill="${textCol}">${n}</text>
      `;

      if (n >= start && n < total) {
        const x1 = x + 28;
        const x2 = x + 64 + 28;
        const midX = (x1 + x2) / 2;
        arcsSVG += `
          <path d="M ${x1} 70 Q ${midX} 20, ${x2} 70" fill="none" stroke="#B85D19" stroke-width="3.5"/>
          <circle cx="${x2}" cy="70" r="5" fill="#B85D19"/>
          <text x="${midX}" y="36" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="14" font-weight="800" fill="#B85D19">+1</text>
        `;
      }
    }

    return `
      <svg width="680" height="150" viewBox="0 0 680 150" style="max-width:100%;">
        ${arcsSVG}
        ${boxesSVG}
      </svg>
    `;
  },

  // --------------------------------------------------------------------------
  // DIAGRAM C: SUBTRACTION CROSS-OUT + NUMBER BOND
  // --------------------------------------------------------------------------
  renderSubtractionCrossOut(spec) {
    const { whole, takeAway, remaining, itemType = "lantern" } = spec;

    let cellsHTML = "";
    for (let i = 0; i < 10; i++) {
      let cellInner = "";
      if (i < whole) {
        const isCrossed = i >= remaining;
        cellInner = `
          <div style="position:relative;display:flex;align-items:center;justify-content:center;">
            ${this.getItemSVG(itemType, isCrossed ? "secondary" : "primary", 44)}
            ${isCrossed ? `<svg width="52" height="52" viewBox="0 0 52 52" style="position:absolute;inset:-4px;">
              <line x1="6" y1="46" x2="46" y2="6" stroke="#982B2B" stroke-width="5" stroke-linecap="round"/>
            </svg>` : ""}
          </div>
        `;
      }
      cellsHTML += `<div style="width:62px;height:62px;border:2px solid #2C3E50;display:flex;align-items:center;justify-content:center;background:#FFF;">${cellInner}</div>`;
    }

    return `
      <div style="display:flex;align-items:center;justify-content:center;gap:48px;flex-wrap:wrap;">
        <div style="display:grid;grid-template-columns:repeat(5, 62px);border:3.5px solid #1B365D;border-radius:10px;overflow:hidden;box-shadow:0 6px 16px rgba(0,0,0,0.08);">
          ${cellsHTML}
        </div>
        <svg width="260" height="190" viewBox="0 0 260 190">
          <line x1="80" y1="95" x2="185" y2="48" stroke="#211C17" stroke-width="4"/>
          <line x1="80" y1="95" x2="185" y2="142" stroke="#211C17" stroke-width="4"/>
          <circle cx="65" cy="95" r="38" fill="#EBF4EE" stroke="#2B5B3F" stroke-width="4"/>
          <text x="65" y="106" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="30" font-weight="800" fill="#2B5B3F">${whole}</text>
          <circle cx="185" cy="48" r="30" fill="#FDF2F2" stroke="#982B2B" stroke-width="3.5"/>
          <text x="185" y="58" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="24" font-weight="800" fill="#982B2B">−${takeAway}</text>
          <circle cx="185" cy="142" r="30" fill="#EEF4FA" stroke="#24578D" stroke-width="3.5"/>
          <text x="185" y="152" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="24" font-weight="800" fill="#24578D">?</text>
        </svg>
      </div>
    `;
  },

  // --------------------------------------------------------------------------
  // DIAGRAM D: ONE-TO-ONE COMPARISON ROWS
  // --------------------------------------------------------------------------
  renderComparisonRows(spec) {
    const { topCount, bottomCount, topLabel, bottomLabel } = spec;
    let itemsSVG = "";
    const startX = 140;
    const stepX = 52;

    for (let i = 0; i < topCount; i++) {
      const cx = startX + i * stepX;
      const isExtra = i >= bottomCount;
      itemsSVG += `
        <rect x="${cx - 21}" y="18" width="42" height="42" rx="9" fill="${isExtra ? '#FBF4DE' : '#EEF4FA'}" stroke="${isExtra ? '#C59B27' : '#24578D'}" stroke-width="2.6"/>
        <circle cx="${cx}" cy="39" r="7" fill="${isExtra ? '#C59B27' : '#24578D'}" opacity="0.75"/>
      `;
    }

    for (let i = 0; i < bottomCount; i++) {
      const cx = startX + i * stepX;
      itemsSVG += `
        <line x1="${cx}" y1="62" x2="${cx}" y2="96" stroke="#766756" stroke-width="2.5" stroke-dasharray="4,4"/>
        <rect x="${cx - 21}" y="98" width="42" height="42" rx="9" fill="#FDF4EB" stroke="#B85D19" stroke-width="2.6"/>
        <circle cx="${cx}" cy="119" r="7" fill="#B85D19" opacity="0.75"/>
      `;
    }

    const bracketX1 = startX + bottomCount * stepX - 20;
    const bracketX2 = startX + (topCount - 1) * stepX + 20;
    const bracketMid = (bracketX1 + bracketX2) / 2;

    return `
      <svg width="690" height="165" viewBox="0 0 690 165" style="max-width:100%;">
        <text x="122" y="45" text-anchor="end" font-family="Plus Jakarta Sans, sans-serif" font-size="16" font-weight="800" fill="#24578D">${topLabel}</text>
        <text x="122" y="125" text-anchor="end" font-family="Plus Jakarta Sans, sans-serif" font-size="16" font-weight="800" fill="#B85D19">${bottomLabel}</text>
        ${itemsSVG}
        <path d="M ${bracketX1} 68 L ${bracketX1} 80 L ${bracketX2} 80 L ${bracketX2} 68" fill="none" stroke="#982B2B" stroke-width="3"/>
        <text x="${bracketMid}" y="102" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="16" font-weight="800" fill="#982B2B">Difference: ?</text>
      </svg>
    `;
  },

  // --------------------------------------------------------------------------
  // DIAGRAM E: DOUBLE TEN-FRAME (TEEN NUMBERS: 10 AND SOME MORE)
  // --------------------------------------------------------------------------
  renderDoubleTenFrame(spec) {
    const { first = 10, second = 4, revealTotal = false } = spec;
    const total = first + second;
    const ones = total - 10;

    const buildFrame = (isTop) => {
      let cells = "";
      for (let i = 0; i < 10; i++) {
        let dot = "";
        if (isTop) {
          dot = `<div style="width:36px;height:36px;border-radius:50%;background:radial-gradient(circle at 32% 30%, #5890CE 0%, #24578D 65%, #143356 100%);border:2px solid #122B49;box-shadow:inset 0 2px 2px rgba(255,255,255,0.45), 0 2px 4px rgba(0,0,0,0.2);"></div>`;
        } else if (i < ones) {
          dot = `<div style="width:36px;height:36px;border-radius:50%;background:radial-gradient(circle at 32% 30%, #F5B056 0%, #D4882A 65%, #8F5210 100%);border:2px solid #6E3D09;box-shadow:inset 0 2px 2px rgba(255,255,255,0.45), 0 2px 4px rgba(0,0,0,0.2);"></div>`;
        }
        cells += `<div style="width:52px;height:52px;border:2px solid #2C3E50;display:flex;align-items:center;justify-content:center;background:#FFFDF9;">${dot}</div>`;
      }
      return `<div style="display:grid;grid-template-columns:repeat(5, 52px);border:3.5px solid #1B365D;border-radius:10px;overflow:hidden;box-shadow:0 5px 14px rgba(0,0,0,0.1);">${cells}</div>`;
    };

    const wholeText = revealTotal ? total : "?";
    const onesText = revealTotal ? ones : "?";

    return `
      <div style="display:flex;align-items:center;justify-content:center;gap:42px;flex-wrap:wrap;">
        <div style="display:flex;flex-direction:column;gap:10px;">
          <div style="display:flex;align-items:center;gap:14px;">
            ${buildFrame(true)}
            <span style="font-family:var(--font-sans);font-weight:800;font-size:18px;color:#24578D;">10</span>
          </div>
          <div style="display:flex;align-items:center;gap:14px;">
            ${buildFrame(false)}
            <span style="font-family:var(--font-sans);font-weight:800;font-size:18px;color:#B85D19;">${onesText}</span>
          </div>
        </div>

        <svg width="210" height="185" viewBox="0 0 210 185">
          <line x1="105" y1="48" x2="55" y2="135" stroke="#211C17" stroke-width="3.5"/>
          <line x1="105" y1="48" x2="155" y2="135" stroke="#211C17" stroke-width="3.5"/>
          <circle cx="105" cy="45" r="34" fill="${revealTotal ? '#EBF4EE' : '#FBF4DE'}" stroke="${revealTotal ? '#2B5B3F' : '#C59B27'}" stroke-width="4"/>
          <text x="105" y="55" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="28" font-weight="800" fill="${revealTotal ? '#2B5B3F' : '#982B2B'}">${wholeText}</text>
          <circle cx="55" cy="138" r="30" fill="#EEF4FA" stroke="#24578D" stroke-width="3.5"/>
          <text x="55" y="147" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="24" font-weight="800" fill="#24578D">10</text>
          <circle cx="155" cy="138" r="30" fill="#FDF4EB" stroke="#B85D19" stroke-width="3.5"/>
          <text x="155" y="147" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="24" font-weight="800" fill="#B85D19">${onesText}</text>
        </svg>
      </div>
    `;
  },

  // --------------------------------------------------------------------------
  // DIAGRAM F: THE "MAKE 10" STRATEGY BRIDGE
  // --------------------------------------------------------------------------
  renderMakeTen(spec) {
    const { a, b, needForTen, leftover, revealSplit = false } = spec;

    let topCells = "";
    for (let i = 0; i < 10; i++) {
      const inner = i < a
        ? `<div style="width:34px;height:34px;border-radius:50%;background:radial-gradient(circle at 32% 30%, #5890CE 0%, #24578D 65%, #143356 100%);border:2px solid #122B49;box-shadow:0 2px 4px rgba(0,0,0,0.18);"></div>`
        : `<div style="width:34px;height:34px;border-radius:50%;background:radial-gradient(circle at 32% 30%, #FFF29E 0%, #E5B93C 75%, #B88614 100%);border:2.5px dashed #982B2B;"></div>`;
      topCells += `<div style="width:50px;height:50px;border:2px solid #2C3E50;display:flex;align-items:center;justify-content:center;background:#FFFDF9;">${inner}</div>`;
    }

    let botCells = "";
    for (let i = 0; i < 10; i++) {
      let inner = "";
      if (i < leftover) {
        inner = `<div style="width:34px;height:34px;border-radius:50%;background:radial-gradient(circle at 32% 30%, #F5B056 0%, #D4882A 65%, #8F5210 100%);border:2px solid #6E3D09;box-shadow:0 2px 4px rgba(0,0,0,0.18);"></div>`;
      } else if (i < b) {
        inner = `<div style="width:28px;height:28px;border-radius:50%;border:2px dotted #B85D19;opacity:0.45;"></div>`;
      }
      botCells += `<div style="width:50px;height:50px;border:2px solid #2C3E50;display:flex;align-items:center;justify-content:center;background:#FFFDF9;">${inner}</div>`;
    }

    const leftoverLabel = revealSplit ? leftover : "?";

    return `
      <div style="display:flex;align-items:center;justify-content:center;gap:42px;flex-wrap:wrap;">
        <div style="display:flex;flex-direction:column;gap:8px;">
          <div style="display:flex;align-items:center;gap:12px;">
            <div style="display:grid;grid-template-columns:repeat(5, 50px);border:3.5px solid #2B5B3F;border-radius:10px;overflow:hidden;box-shadow:0 5px 14px rgba(0,0,0,0.1);">${topCells}</div>
            <span style="font-family:var(--font-sans);font-size:20px;font-weight:800;color:#2B5B3F;">10</span>
          </div>
          <div style="display:flex;align-items:center;gap:12px;">
            <div style="display:grid;grid-template-columns:repeat(5, 50px);border:3.5px solid #1B365D;border-radius:10px;overflow:hidden;box-shadow:0 5px 14px rgba(0,0,0,0.1);">${botCells}</div>
            <span style="font-family:var(--font-sans);font-size:20px;font-weight:800;color:#B85D19;">${leftoverLabel}</span>
          </div>
        </div>

        <svg width="240" height="175" viewBox="0 0 240 175">
          <rect x="16" y="14" width="124" height="106" rx="14" fill="#EBF4EE" stroke="#2B5B3F" stroke-width="2.5" stroke-dasharray="5,4"/>
          <text x="45" y="56" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="34" font-weight="800" fill="#24578D">${a}</text>
          <text x="90" y="56" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="28" font-weight="800" fill="#211C17">+</text>
          <text x="148" y="56" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="34" font-weight="800" fill="#B85D19">${b}</text>

          <line x1="142" y1="64" x2="112" y2="92" stroke="#211C17" stroke-width="3"/>
          <line x1="154" y1="64" x2="184" y2="92" stroke="#211C17" stroke-width="3"/>

          <circle cx="108" cy="100" r="19" fill="#FBF4DE" stroke="#C59B27" stroke-width="2.5"/>
          <text x="108" y="107" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="18" font-weight="800" fill="#211C17">${needForTen}</text>

          <circle cx="188" cy="100" r="19" fill="#FDF4EB" stroke="#B85D19" stroke-width="2.5"/>
          <text x="188" y="107" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="18" font-weight="800" fill="#B85D19">${leftoverLabel}</text>
        </svg>
      </div>
    `;
  },

  // --------------------------------------------------------------------------
  // DIAGRAM G: "SUBTRACT FROM 10" STRATEGY
  // --------------------------------------------------------------------------
  renderSubtractFromTen(spec) {
    const { teen, ones, sub, leftInTen, revealSplit = false } = spec;

    let topCells = "";
    for (let i = 0; i < 10; i++) {
      const isCrossed = i >= leftInTen;
      topCells += `
        <div style="width:50px;height:50px;border:2px solid #2C3E50;display:flex;align-items:center;justify-content:center;background:#FFFDF9;position:relative;">
          <div style="width:32px;height:32px;border-radius:50%;background:${isCrossed ? '#E6B0AA' : 'radial-gradient(circle at 32% 30%, #5890CE 0%, #24578D 65%, #143356 100%)'};"></div>
          ${isCrossed ? `<svg width="38" height="38" viewBox="0 0 38 38" style="position:absolute;"><line x1="5" y1="33" x2="33" y2="5" stroke="#982B2B" stroke-width="4"/></svg>` : ''}
        </div>
      `;
    }

    let botCells = "";
    for (let i = 0; i < 10; i++) {
      botCells += `
        <div style="width:50px;height:50px;border:2px solid #2C3E50;display:flex;align-items:center;justify-content:center;background:#FFFDF9;">
          ${i < ones ? `<div style="width:32px;height:32px;border-radius:50%;background:radial-gradient(circle at 32% 30%, #F5B056 0%, #D4882A 65%, #8F5210 100%);"></div>` : ''}
        </div>
      `;
    }

    const topRemainLabel = revealSplit ? leftInTen : "?";

    return `
      <div style="display:flex;align-items:center;justify-content:center;gap:40px;flex-wrap:wrap;">
        <div style="display:flex;flex-direction:column;gap:8px;">
          <div style="display:flex;align-items:center;gap:12px;">
            <div style="display:grid;grid-template-columns:repeat(5, 50px);border:3px solid #982B2B;border-radius:8px;overflow:hidden;">${topCells}</div>
            <span style="font-family:var(--font-sans);font-size:20px;font-weight:800;color:#24578D;">${topRemainLabel}</span>
          </div>
          <div style="display:flex;align-items:center;gap:12px;">
            <div style="display:grid;grid-template-columns:repeat(5, 50px);border:3px solid #1B365D;border-radius:8px;overflow:hidden;">${botCells}</div>
            <span style="font-family:var(--font-sans);font-size:20px;font-weight:800;color:#B85D19;">${revealSplit ? ones : ""}</span>
          </div>
        </div>

        <svg width="220" height="165" viewBox="0 0 220 165">
          <text x="75" y="50" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="34" font-weight="800" fill="#1B365D">${teen}</text>
          <text x="128" y="50" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="28" font-weight="800" fill="#211C17">−</text>
          <text x="168" y="50" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="34" font-weight="800" fill="#982B2B">${sub}</text>
          <line x1="68" y1="58" x2="45" y2="90" stroke="#211C17" stroke-width="3"/>
          <line x1="82" y1="58" x2="105" y2="90" stroke="#211C17" stroke-width="3"/>
          <circle cx="42" cy="105" r="20" fill="#FDF4EB" stroke="#B85D19" stroke-width="2.5"/>
          <text x="42" y="112" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="18" font-weight="800" fill="#B85D19">${ones}</text>
          <circle cx="108" cy="105" r="20" fill="#EEF4FA" stroke="#24578D" stroke-width="2.5"/>
          <text x="108" y="112" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="18" font-weight="800" fill="#24578D">10</text>
        </svg>
      </div>
    `;
  },

  // --------------------------------------------------------------------------
  // DIAGRAM H: BASE-10 PLACE VALUE TOWERS & CHART
  // --------------------------------------------------------------------------
  renderPlaceValue(spec) {
    const { tens = 3, ones = 4, addTens = 0, addOnes = 0, revealChart = false } = spec;
    const totalTens = tens + addTens;
    const totalOnes = ones + addOnes;

    let towersHTML = "";
    for (let t = 0; t < totalTens; t++) {
      const col = t >= tens ? "#2B5B3F" : "#24578D";
      let blocks = "";
      for (let b = 0; b < 10; b++) {
        blocks += `<div style="width:24px;height:12px;border-bottom:1px solid rgba(255,255,255,0.45);background:${col};"></div>`;
      }
      towersHTML += `<div style="border:2px solid #1B2D48;border-radius:4px;overflow:hidden;">${blocks}</div>`;
    }

    let onesHTML = "";
    for (let o = 0; o < totalOnes; o++) {
      const col = o >= ones ? "#D4882A" : "#B85D19";
      onesHTML += `<div style="width:24px;height:24px;background:${col};border:2px solid #4A2508;border-radius:4px;"></div>`;
    }

    const tensBottomLabel = revealChart ? `${totalTens * 10}` : "Tens (10s)";
    const onesBottomLabel = revealChart ? `${totalOnes}` : "Ones (1s)";
    const chartTens = revealChart ? totalTens : "?";
    const chartOnes = revealChart ? totalOnes : "?";

    return `
      <div style="display:flex;align-items:center;justify-content:center;gap:48px;flex-wrap:wrap;">
        <div style="display:flex;align-items:flex-end;gap:32px;background:#FAF6EC;padding:18px 28px;border-radius:12px;border:2px solid #C8B289;">
          <div style="display:flex;flex-direction:column;align-items:center;gap:8px;">
            <div style="display:flex;gap:8px;align-items:flex-end;">${towersHTML}</div>
            <span style="font-family:var(--font-sans);font-size:17px;font-weight:800;color:#24578D;">${tensBottomLabel}</span>
          </div>
          <div style="display:flex;flex-direction:column;align-items:center;gap:8px;">
            <div style="display:grid;grid-template-columns:repeat(5, 24px);gap:6px;">${onesHTML}</div>
            <span style="font-family:var(--font-sans);font-size:17px;font-weight:800;color:#B85D19;">${onesBottomLabel}</span>
          </div>
        </div>

        <div style="border:3.5px solid #1B365D;border-radius:12px;overflow:hidden;width:210px;">
          <div style="display:grid;grid-template-columns:1fr 1fr;background:#1B365D;color:#FAF6EC;font-family:var(--font-sans);font-weight:800;font-size:14px;text-align:center;padding:8px 0;">
            <span style="border-right:1.5px solid #C59B27;">TENS</span>
            <span>ONES</span>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;background:#FFF;font-family:var(--font-sans);font-weight:800;font-size:38px;text-align:center;padding:14px 0;">
            <span style="color:#24578D;border-right:1.5px solid #DFD4BE;">${chartTens}</span>
            <span style="color:#B85D19;">${chartOnes}</span>
          </div>
        </div>
      </div>
    `;
  },

  // --------------------------------------------------------------------------
  // DIAGRAM I: PART-WHOLE & COMPARISON BAR MODELS
  // --------------------------------------------------------------------------
  renderBarModel(spec) {
    if (spec.modelType === "part-whole") {
      const { partA, partB, whole, missing, labelA, labelB } = spec;
      const pctA = Math.round((partA / whole) * 100);
      const pctB = 100 - pctA;
      const wholeDisplay = missing === "whole" ? "?" : whole;

      return `
        <div style="display:flex;flex-direction:column;align-items:center;width:100%;max-width:580px;gap:8px;">
          <div style="font-family:var(--font-sans);font-size:20px;font-weight:800;color:${missing === 'whole' ? '#982B2B' : '#2B5B3F'};">
            Whole = ${wholeDisplay}
          </div>
          <div style="width:100%;height:14px;border-top:3.5px solid #2B5B3F;border-left:3.5px solid #2B5B3F;border-right:3.5px solid #2B5B3F;border-radius:6px 6px 0 0;"></div>
          <div style="display:flex;width:100%;height:64px;border:3.5px solid #1B365D;border-radius:10px;overflow:hidden;">
            <div style="width:${pctA}%;background:#24578D;color:#FFF;display:flex;align-items:center;justify-content:center;font-family:var(--font-sans);font-weight:800;font-size:20px;border-right:3.5px solid #1B365D;">
              ${labelA}
            </div>
            <div style="width:${pctB}%;background:${missing === 'partB' ? '#FBF4DE' : '#D4882A'};color:${missing === 'partB' ? '#982B2B' : '#FFF'};display:flex;align-items:center;justify-content:center;font-family:var(--font-sans);font-weight:800;font-size:20px;">
              ${missing === "partB" ? "?" : labelB}
            </div>
          </div>
        </div>
      `;
    } else {
      const { partA, partB, diff, missing, labelA, labelB } = spec;
      const pctSmall = Math.round((partB / partA) * 100);
      const pctDiff = 100 - pctSmall;

      return `
        <div style="display:flex;flex-direction:column;width:100%;max-width:580px;gap:14px;">
          <div style="display:flex;align-items:center;gap:14px;">
            <span style="width:130px;text-align:right;font-family:var(--font-sans);font-weight:800;font-size:17px;color:#24578D;">${labelA}</span>
            <div style="flex:1;height:52px;background:#24578D;border:3px solid #1B365D;border-radius:10px;display:flex;align-items:center;justify-content:center;color:#FFF;font-family:var(--font-sans);font-weight:800;font-size:20px;">
              ${missing === "larger" ? "?" : partA}
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:14px;">
            <span style="width:130px;text-align:right;font-family:var(--font-sans);font-weight:800;font-size:17px;color:#B85D19;">${labelB}</span>
            <div style="flex:1;display:flex;align-items:center;">
              <div style="width:${pctSmall}%;height:52px;background:#D4882A;border:3px solid #7A3B0C;border-radius:10px;display:flex;align-items:center;justify-content:center;color:#FFF;font-family:var(--font-sans);font-weight:800;font-size:20px;">
                ${partB}
              </div>
              <div style="width:${pctDiff}%;height:52px;border:3px dashed #982B2B;border-radius:10px;margin-left:6px;background:#FBF4DE;display:flex;align-items:center;justify-content:center;color:#982B2B;font-family:var(--font-sans);font-weight:800;font-size:18px;">
                ${missing === "diff" ? "?" : `+${diff}`}
              </div>
            </div>
          </div>
        </div>
      `;
    }
  },

  // --------------------------------------------------------------------------
  // DIAGRAM J: TWO-DIGIT REGROUPING ("MAKE THE NEXT TEN" — UNIT 13)
  // --------------------------------------------------------------------------
  renderRegrouping(spec) {
    const { a, b, revealSplit = false } = spec;
    const aTens = Math.floor(a / 10);
    const aOnes = a % 10;
    const needForTen = 10 - aOnes;
    const leftover = b - needForTen;
    const nextTen = (aTens + 1) * 10;

    // 1. Build the existing Ten-Towers (10-rods)
    let towersHTML = "";
    for (let t = 0; t < aTens; t++) {
      let blocks = "";
      for (let k = 0; k < 10; k++) {
        blocks += `<div style="width:22px;height:11px;border-bottom:1px solid rgba(255,255,255,0.45);background:#24578D;"></div>`;
      }
      towersHTML += `<div style="border:2px solid #1B2D48;border-radius:4px;overflow:hidden;">${blocks}</div>`;
    }

    // 2. Build the Ten-Frame showing aOnes (blue) + needForTen (gold dashed) completing the New Ten!
    let topFrameCells = "";
    for (let i = 0; i < 10; i++) {
      const inner = i < aOnes
        ? `<div style="width:28px;height:28px;border-radius:50%;background:#24578D;"></div>`
        : `<div style="width:28px;height:28px;border-radius:50%;background:#E5B93C;border:2.5px dashed #982B2B;"></div>`;
      topFrameCells += `<div style="width:42px;height:42px;border:1.8px solid #2C3E50;display:flex;align-items:center;justify-content:center;background:#FFF;">${inner}</div>`;
    }

    // 3. Build the leftover Ones row below the completed Ten-Frame
    let botFrameCells = "";
    for (let i = 0; i < 5; i++) {
      const inner = i < leftover
        ? `<div style="width:28px;height:28px;border-radius:50%;background:#B85D19;"></div>`
        : "";
      botFrameCells += `<div style="width:42px;height:42px;border:1.8px solid #D5C8B0;display:flex;align-items:center;justify-content:center;background:#FAF6EC;">${inner}</div>`;
    }

    const leftoverText = revealSplit ? leftover : "?";
    const nextTenLabel = revealSplit ? nextTen : "?0";

    return `
      <div style="display:flex;align-items:center;justify-content:center;gap:42px;flex-wrap:wrap;">
        <!-- Left: Pictorial Ten-Towers + Ten-Frame making the Next Ten -->
        <div style="display:flex;align-items:center;gap:20px;background:#FAF6EC;padding:14px 22px;border-radius:12px;border:2px solid #C8B289;">
          <div style="display:flex;flex-direction:column;align-items:center;gap:6px;">
            <div style="display:flex;gap:6px;align-items:flex-end;">${towersHTML}</div>
            <span style="font-family:var(--font-sans);font-size:18px;font-weight:800;color:#24578D;">${aTens * 10}</span>
          </div>

          <div style="display:flex;flex-direction:column;gap:8px;align-items:center;">
            <div style="display:flex;align-items:center;gap:10px;">
              <div style="display:grid;grid-template-columns:repeat(5, 42px);border:3px solid #2B5B3F;border-radius:8px;overflow:hidden;">${topFrameCells}</div>
              <span style="font-family:var(--font-sans);font-size:18px;font-weight:800;color:#2B5B3F;">+10</span>
            </div>
            <div style="display:flex;align-items:center;gap:10px;">
              <div style="display:grid;grid-template-columns:repeat(5, 42px);border:2px solid #B85D19;border-radius:8px;overflow:hidden;">${botFrameCells}</div>
              <span style="font-family:var(--font-sans);font-size:18px;font-weight:800;color:#B85D19;">+${leftoverText}</span>
            </div>
          </div>
        </div>

        <!-- Right: Number-Bond Split (38 + 5 -> 5 splits into 2 and 3; 38 + 2 = 40) -->
        <svg width="255" height="185" viewBox="0 0 255 185">
          <!-- Dashed Make-Next-Ten Loop around a and needForTen -->
          <rect x="14" y="12" width="134" height="114" rx="16" fill="#EBF4EE" stroke="#2B5B3F" stroke-width="2.5" stroke-dasharray="6,4"/>
          <text x="81" y="152" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="22" font-weight="800" fill="#2B5B3F">${nextTenLabel}</text>

          <!-- Main numbers: a + b -->
          <text x="50" y="58" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="34" font-weight="800" fill="#24578D">${a}</text>
          <text x="102" y="58" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="28" font-weight="800" fill="#211C17">+</text>
          <text x="162" y="58" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="34" font-weight="800" fill="#B85D19">${b}</text>

          <!-- Number Bond legs splitting b into needForTen and leftover -->
          <line x1="154" y1="66" x2="120" y2="94" stroke="#211C17" stroke-width="3.2"/>
          <line x1="170" y1="66" x2="204" y2="94" stroke="#211C17" stroke-width="3.2"/>

          <!-- Split Part 1: needForTen (inside the green Make-Next-Ten loop) -->
          <circle cx="116" cy="102" r="20" fill="#FBF4DE" stroke="#C59B27" stroke-width="3"/>
          <text x="116" y="109" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="19" font-weight="800" fill="#211C17">${needForTen}</text>

          <!-- Split Part 2: leftover (outside the loop) -->
          <circle cx="208" cy="102" r="20" fill="#FDF4EB" stroke="#B85D19" stroke-width="3"/>
          <text x="208" y="109" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="19" font-weight="800" fill="#B85D19">${leftoverText}</text>

          <text x="208" y="152" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="22" font-weight="800" fill="#B85D19">+ ${leftoverText}</text>
        </svg>
      </div>
    `;
  },

  // --------------------------------------------------------------------------
  // DIAGRAM K: EQUAL GROUPS & FAIR SHARING TRAYS
  // --------------------------------------------------------------------------
  renderEqualGroups(spec) {
    const { groups, perGroup, itemType = "loaf", revealSkipCount = false } = spec;

    let traysHTML = "";
    for (let g = 0; g < groups; g++) {
      let itemsHTML = "";
      for (let i = 0; i < perGroup; i++) {
        itemsHTML += this.getItemSVG(itemType, g % 2 === 0 ? "primary" : "secondary", 38);
      }
      const badgeLabel = revealSkipCount ? `${(g + 1) * perGroup}` : `Tray ${g + 1}`;
      traysHTML += `
        <div style="display:flex;flex-direction:column;align-items:center;gap:8px;">
          <div style="background:#FAF6EC;border:3px solid #1B365D;border-radius:14px;padding:14px 18px;display:flex;gap:8px;flex-wrap:wrap;justify-content:center;min-width:125px;">
            ${itemsHTML}
          </div>
          <span style="font-family:var(--font-sans);font-size:15px;font-weight:800;color:#1B365D;background:#EEF4FA;padding:3px 12px;border-radius:99px;">
            ${badgeLabel}
          </span>
        </div>
      `;
    }

    return `
      <div style="display:flex;gap:20px;flex-wrap:wrap;justify-content:center;">
        ${traysHTML}
      </div>
    `;
  },

  // --------------------------------------------------------------------------
  // DIAGRAM L: SHAPES, SIDES, CORNERS & PATTERNS (Unit 8)
  // --------------------------------------------------------------------------
  renderShapes(spec) {
    const { mode = "single", shape = "triangle", pattern = [], showCornerNumbers = false } = spec;

    const drawPolygonSVG = (shapeName, size = 165, showCorners = true) => {
      const shapesMap = {
        circle: { pts: [], isCircle: true, fill: "#EEF4FA", stroke: "#24578D" },
        triangle: { pts: [[85, 18], [152, 142], [18, 142]], fill: "#FBF4DE", stroke: "#B85D19" },
        square: { pts: [[28, 28], [142, 28], [142, 142], [28, 142]], fill: "#EEF4FA", stroke: "#24578D" },
        rectangle: { pts: [[14, 42], [156, 42], [156, 128], [14, 128]], fill: "#EBF4EE", stroke: "#2B5B3F" },
        trapezoid: { pts: [[44, 36], [126, 36], [156, 134], [14, 134]], fill: "#FDF4EB", stroke: "#B85D19" },
        pentagon: { pts: [[85, 16], [154, 66], [128, 146], [42, 146], [16, 66]], fill: "#EEF4FA", stroke: "#1B365D" },
        hexagon: { pts: [[85, 14], [148, 48], [148, 122], [85, 156], [22, 122], [22, 48]], fill: "#FBF4DE", stroke: "#982B2B" }
      };
      const cfg = shapesMap[shapeName] || shapesMap.triangle;
      if (cfg.isCircle) {
        return `<svg width="${size}" height="${size}" viewBox="0 0 170 170">
          <circle cx="85" cy="85" r="64" fill="${cfg.fill}" stroke="${cfg.stroke}" stroke-width="5"/>
        </svg>`;
      }
      const polyPts = cfg.pts.map(p => p.join(",")).join(" ");
      let cornersSVG = "";
      if (showCorners) {
        cfg.pts.forEach(([x, y], idx) => {
          cornersSVG += `
            <circle cx="${x}" cy="${y}" r="8" fill="#E5B93C" stroke="#1B365D" stroke-width="2.5"/>
            ${showCornerNumbers ? `<text x="${x}" y="${y + 4}" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="11" font-weight="800" fill="#1B365D">${idx + 1}</text>` : ""}
          `;
        });
      }
      return `<svg width="${size}" height="${size}" viewBox="0 0 170 170">
        <polygon points="${polyPts}" fill="${cfg.fill}" stroke="${cfg.stroke}" stroke-width="5" stroke-linejoin="round"/>
        ${cornersSVG}
      </svg>`;
    };

    if (mode === "pattern") {
      let rowHTML = "";
      pattern.forEach(sh => {
        if (sh === "?") {
          rowHTML += `<div style="width:92px;height:92px;border:3.5px dashed #982B2B;border-radius:14px;background:#FBF4DE;display:flex;align-items:center;justify-content:center;font-family:var(--font-sans);font-size:36px;font-weight:800;color:#982B2B;">?</div>`;
        } else {
          rowHTML += `<div style="background:#FAF6EC;border:2.5px solid #C8B289;border-radius:14px;padding:6px;">${drawPolygonSVG(sh, 82, false)}</div>`;
        }
      });
      return `<div style="display:flex;align-items:center;gap:14px;flex-wrap:wrap;justify-content:center;">${rowHTML}</div>`;
    }

    if (mode === "composite") {
      // Two triangles joining to form a square or rhombus
      return `
        <div style="display:flex;align-items:center;gap:30px;justify-content:center;">
          ${drawPolygonSVG("triangle", 130, false)}
          <span style="font-family:var(--font-sans);font-size:34px;font-weight:800;color:#1B365D;">+</span>
          ${drawPolygonSVG("triangle", 130, false)}
          <span style="font-family:var(--font-sans);font-size:34px;font-weight:800;color:#1B365D;">→</span>
          <svg width="145" height="145" viewBox="0 0 170 170">
            <rect x="24" y="24" width="122" height="122" fill="#EEF4FA" stroke="#24578D" stroke-width="5"/>
            <line x1="24" y1="24" x2="146" y2="146" stroke="#982B2B" stroke-width="3.5" stroke-dasharray="6,5"/>
          </svg>
        </div>
      `;
    }

    return `<div style="display:flex;align-items:center;justify-content:center;">${drawPolygonSVG(shape, 180, true)}</div>`;
  },

  // --------------------------------------------------------------------------
  // DIAGRAM M: ORDINAL NUMBERS 1st TO 10th (Unit 9)
  // --------------------------------------------------------------------------
  renderOrdinals(spec) {
    const { total = 8, targetPos = 4, fromDirection = "left", revealOrdinals = false } = spec;
    // targetPos is 1-based position from either 'left' (Front Gate) or 'right' (Back)
    const highlightIdx = fromDirection === "left" ? targetPos - 1 : total - targetPos;

    let knightsHTML = "";
    for (let i = 0; i < total; i++) {
      const isTarget = i === highlightIdx;
      const ordNum = fromDirection === "left" ? i + 1 : total - i;
      const suffix = ordNum === 1 ? "st" : ordNum === 2 ? "nd" : ordNum === 3 ? "rd" : "th";
      const subLabel = isTarget ? "?" : revealOrdinals ? `${ordNum}${suffix}` : "•";
      knightsHTML += `
        <div style="display:flex;flex-direction:column;align-items:center;gap:6px;">
          <div style="width:58px;height:66px;border-radius:12px;background:${isTarget ? '#FBF4DE' : '#EEF4FA'};border:3.5px solid ${isTarget ? '#982B2B' : '#24578D'};display:flex;align-items:center;justify-content:center;box-shadow:${isTarget ? '0 0 0 4px rgba(229,185,60,0.45)' : 'none'};">
            ${this.getIconSVG(isTarget ? "crown" : "shieldSilver", 36)}
          </div>
          <span style="font-family:var(--font-sans);font-size:15px;font-weight:800;color:${isTarget ? '#982B2B' : '#1B365D'};">
            ${subLabel}
          </span>
        </div>
      `;
    }

    const gateHTML = `
      <div style="display:flex;flex-direction:column;align-items:center;gap:4px;padding:8px 12px;background:#E6D8C0;border:3px solid #1B365D;border-radius:10px;">
        ${this.getIconSVG("castle", 36)}
        <span style="font-family:var(--font-sans);font-size:12px;font-weight:800;color:#1B365D;">1st</span>
      </div>
    `;

    return `
      <div style="display:flex;align-items:center;justify-content:center;gap:12px;flex-wrap:wrap;">
        ${fromDirection === "left" ? gateHTML : ""}
        ${knightsHTML}
        ${fromDirection === "right" ? gateHTML : ""}
      </div>
    `;
  },

  // --------------------------------------------------------------------------
  // DIAGRAM N: LENGTH MEASUREMENT WITH BLOCK UNITS (Unit 10)
  // --------------------------------------------------------------------------
  renderLengthUnits(spec) {
    const { lengthA = 6, lengthB = null, offsetA = 0, labelA = "Royal Broadsword", revealNumbers = false } = spec;
    const unitPx = 48;

    const renderBarAndUnits = (len, color, label, offset = 0) => {
      const totalBlocks = offset + len;
      let blocks = "";
      for (let i = 0; i < totalBlocks; i++) {
        const isUnderBar = i >= offset;
        blocks += `
          <div style="width:${unitPx}px;height:38px;border:2px solid #1B365D;background:${isUnderBar ? '#FBF4DE' : '#EFE7D6'};opacity:${isUnderBar ? '1' : '0.55'};display:flex;align-items:center;justify-content:center;font-family:var(--font-sans);font-size:16px;font-weight:800;color:#1B365D;">
            ${revealNumbers ? (i + 1) : `<div style="width:8px;height:8px;border-radius:50%;background:${isUnderBar ? '#C59B27' : '#9E907A'};"></div>`}
          </div>
        `;
      }
      return `
        <div style="display:flex;flex-direction:column;align-items:flex-start;gap:8px;position:relative;">
          <!-- Object being measured (Royal Sword / Lance), shifted by offset if misaligned -->
          <div style="display:flex;align-items:center;">
            ${offset > 0 ? `<div style="width:${offset * unitPx}px;height:32px;border-right:3px dashed #982B2B;"></div>` : ""}
            <div style="width:${len * unitPx}px;height:32px;background:${color};border:3px solid #1B365D;border-radius:6px 24px 24px 6px;display:flex;align-items:center;padding-left:14px;color:#FFF;font-family:var(--font-sans);font-weight:800;font-size:15px;white-space:nowrap;overflow:hidden;">
              ${label}
            </div>
          </div>
          <!-- Non-standard Measuring Block Units aligned underneath -->
          <div style="display:flex;">${blocks}</div>
        </div>
      `;
    };

    if (lengthB !== null) {
      return `
        <div style="display:flex;flex-direction:column;align-items:flex-start;gap:16px;background:#FAF6EC;padding:16px 26px;border-radius:12px;border:2px solid #C8B289;">
          ${renderBarAndUnits(lengthA, "#24578D", "Sword A", 0)}
          ${renderBarAndUnits(lengthB, "#B85D19", "Sword B", 0)}
        </div>
      `;
    }

    return `
      <div style="display:flex;flex-direction:column;align-items:flex-start;background:#FAF6EC;padding:20px 30px;border-radius:12px;border:2px solid #C8B289;">
        ${renderBarAndUnits(lengthA, "#24578D", labelA, offsetA)}
      </div>
    `;
  },

  // --------------------------------------------------------------------------
  // DIAGRAM O: FRACTIONS — HALVES & FOURTHS/QUARTERS (Unit 15)
  // --------------------------------------------------------------------------
  renderFractions(spec) {
    const { parts = 4, shaded = 1, shape = "circle" } = spec;

    if (shape === "square") {
      let cells = "";
      const cols = parts === 2 ? "1fr 1fr" : "1fr 1fr";
      for (let i = 0; i < parts; i++) {
        const isShaded = i < shaded;
        cells += `
          <div style="background:${isShaded ? '#E5B93C' : '#FFFFFF'};border:2.5px solid #1B365D;display:flex;align-items:center;justify-content:center;"></div>
        `;
      }
      return `
        <div style="display:flex;align-items:center;justify-content:center;gap:36px;">
          <div style="width:170px;height:170px;display:grid;grid-template-columns:${cols};border:4px solid #1B365D;border-radius:12px;overflow:hidden;box-shadow:0 6px 14px rgba(0,0,0,0.08);">
            ${cells}
          </div>
        </div>
      `;
    }

    // Round Heraldic Shield divided into 2 equal Halves or 4 equal Fourths
    if (parts === 2) {
      return `
        <svg width="185" height="185" viewBox="0 0 185 185">
          <!-- Left Half -->
          <path d="M 92.5 14.5 A 78 78 0 0 0 92.5 170.5 Z" fill="${shaded >= 1 ? '#E5B93C' : '#FFFFFF'}" stroke="#1B365D" stroke-width="4.5"/>
          <!-- Right Half -->
          <path d="M 92.5 14.5 A 78 78 0 0 1 92.5 170.5 Z" fill="${shaded >= 2 ? '#E5B93C' : '#FFFFFF'}" stroke="#1B365D" stroke-width="4.5"/>
        </svg>
      `;
    }

    // 4 equal Fourths (Quarters)
    const qColors = [0, 1, 2, 3].map(i => (i < shaded ? "#E5B93C" : "#FFFFFF"));
    return `
      <svg width="185" height="185" viewBox="0 0 185 185">
        <!-- Top-Right Quarter (1) -->
        <path d="M 92.5 92.5 L 92.5 14.5 A 78 78 0 0 1 170.5 92.5 Z" fill="${qColors[0]}" stroke="#1B365D" stroke-width="4"/>
        <!-- Bottom-Right Quarter (2) -->
        <path d="M 92.5 92.5 L 170.5 92.5 A 78 78 0 0 1 92.5 170.5 Z" fill="${qColors[1]}" stroke="#1B365D" stroke-width="4"/>
        <!-- Bottom-Left Quarter (3) -->
        <path d="M 92.5 92.5 L 92.5 170.5 A 78 78 0 0 1 14.5 92.5 Z" fill="${qColors[2]}" stroke="#1B365D" stroke-width="4"/>
        <!-- Top-Left Quarter (4) -->
        <path d="M 92.5 92.5 L 14.5 92.5 A 78 78 0 0 1 92.5 14.5 Z" fill="${qColors[3]}" stroke="#1B365D" stroke-width="4"/>
      </svg>
    `;
  },

  // --------------------------------------------------------------------------
  // DIAGRAM P: TELLING TIME — O'CLOCK & HALF-PAST (Unit 18)
  // --------------------------------------------------------------------------
  renderClock(spec) {
    const { hour = 3, minutes = 0 } = spec;
    // Minute hand angle: 0 min -> -90 deg (12), 30 min -> +90 deg (6)
    const minAngleDeg = (minutes / 60) * 360 - 90;
    const minRad = (minAngleDeg * Math.PI) / 180;
    const mx = 100 + 64 * Math.cos(minRad);
    const my = 100 + 64 * Math.sin(minRad);

    // Hour hand angle: advances halfway between hour and hour+1 when minutes === 30!
    const hourAngleDeg = ((hour % 12 + minutes / 60) / 12) * 360 - 90;
    const hourRad = (hourAngleDeg * Math.PI) / 180;
    const hx = 100 + 42 * Math.cos(hourRad);
    const hy = 100 + 42 * Math.sin(hourRad);

    let numbersSVG = "";
    for (let n = 1; n <= 12; n++) {
      const ang = ((n / 12) * 360 - 90) * (Math.PI / 180);
      const nx = 100 + 72 * Math.cos(ang);
      const ny = 100 + 72 * Math.sin(ang) + 6;
      numbersSVG += `<text x="${nx}" y="${ny}" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="17" font-weight="800" fill="#1B365D">${n}</text>`;
    }

    return `
      <div style="display:flex;align-items:center;justify-content:center;gap:40px;">
        <svg width="195" height="195" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="92" fill="#E5B93C" stroke="#1B365D" stroke-width="5"/>
          <circle cx="100" cy="100" r="84" fill="#FFFDF8" stroke="#1B365D" stroke-width="2.5"/>
          ${numbersSVG}
          <!-- Minute Hand (Long, Crimson) -->
          <line x1="100" y1="100" x2="${mx}" y2="${my}" stroke="#982B2B" stroke-width="5" stroke-linecap="round"/>
          <!-- Hour Hand (Short, Royal Blue) -->
          <line x1="100" y1="100" x2="${hx}" y2="${hy}" stroke="#24578D" stroke-width="7.5" stroke-linecap="round"/>
          <circle cx="100" cy="100" r="6.5" fill="#1B365D"/>
        </svg>
      </div>
    `;
  },

  // --------------------------------------------------------------------------
  // DIAGRAM Q: MONEY — PENNIES, NICKELS, DIMES, QUARTERS (Unit 19)
  // --------------------------------------------------------------------------
  renderCoins(spec) {
    const { coins = [10, 10, 5, 1, 1] } = spec;
    let runningTotal = 0;
    let coinsHTML = "";

    coins.forEach(val => {
      runningTotal += val;
      let size = 62;
      let fill = "#E2E7EC";
      let stroke = "#4A5A6A";
      let textCol = "#1B365D";

      if (val === 25) {
        size = 76;
        fill = "#DCE4EC";
        stroke = "#1B365D";
      } else if (val === 10) {
        size = 56;
        fill = "#EBF0F5";
        stroke = "#24578D";
      } else if (val === 5) {
        size = 66;
        fill = "#DFE5EB";
        stroke = "#34495E";
      } else if (val === 1) {
        size = 60;
        fill = "#DDA16C";
        stroke = "#7A3B0C";
        textCol = "#4A2004";
      }

      coinsHTML += `
        <div style="display:flex;flex-direction:column;align-items:center;gap:8px;">
          <svg width="${size}" height="${size}" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="36" fill="${fill}" stroke="${stroke}" stroke-width="4"/>
            <circle cx="40" cy="40" r="30" fill="none" stroke="${stroke}" stroke-width="1.5" stroke-dasharray="3,3"/>
            <text x="40" y="49" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="25" font-weight="800" fill="${textCol}">${val}¢</text>
          </svg>
        </div>
      `;
    });

    return `
      <div style="display:flex;align-items:center;justify-content:center;gap:18px;flex-wrap:wrap;background:#FAF6EC;padding:18px 28px;border-radius:14px;border:2.5px solid #C8B289;">
        ${coinsHTML}
      </div>
    `;
  }
};

if (typeof window !== "undefined") {
  window.Visuals = Visuals;
}

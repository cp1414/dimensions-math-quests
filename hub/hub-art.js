// ============================================================================
// HOME HUB ART STUDIO — BESPOKE EARLY-2000s CD-ROM COVER & DISC ILLUSTRATIONS
// Pure inline SVG art, zero external images, zero emojis, zero trademarks.
// ============================================================================

const HubArt = {
  _svgUid: 0,

  getCrestSVG(size = 34) {
    return `<svg width="${size}" height="${size}" viewBox="0 0 40 40" aria-hidden="true">
      <defs>
        <linearGradient id="crest-bezel" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#F2DEAC"/>
          <stop offset="50%" stop-color="#C9963A"/>
          <stop offset="100%" stop-color="#755218"/>
        </linearGradient>
        <linearGradient id="crest-glass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#2D5E38"/>
          <stop offset="100%" stop-color="#183821"/>
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="36" height="36" rx="7" fill="url(#crest-bezel)" stroke="#2E200E" stroke-width="1.5"/>
      <rect x="5" y="5" width="30" height="30" rx="4.5" fill="url(#crest-glass)" stroke="#F5D98A" stroke-width="1.3"/>
      <circle cx="20" cy="20" r="10.2" fill="none" stroke="#F5D98A" stroke-width="1.4" opacity="0.88"/>
      <circle cx="20" cy="20" r="3.2" fill="#F5D98A"/>
      <path d="M20 8.5 L20 14.5 M20 25.5 L20 31.5 M8.5 20 L14.5 20 M25.5 20 L31.5 20" stroke="#FAF4E6" stroke-width="1.8" stroke-linecap="round"/>
    </svg>`;
  },

  getCoverArtSVG(grade) {
    if (grade.id === "k") return this._coverKindergarten(grade);
    if (grade.id === "g1") return this._coverGrade1(grade);
    return this._coverGrade2(grade);
  },

  getDiscArtSVG(grade) {
    const uid = ++this._svgUid;
    if (grade.id === "k") return this._discKindergarten(grade, uid);
    if (grade.id === "g1") return this._discGrade1(grade, uid);
    return this._discGrade2(grade, uid);
  },

  getTowerFanSVG() {
    return `<svg viewBox="0 0 80 80" class="tower-fan-svg" aria-hidden="true">
      <circle cx="40" cy="40" r="36" fill="rgba(22, 16, 11, 0.82)" stroke="rgba(216, 174, 96, 0.36)" stroke-width="2"/>
      <g class="fan-blades">
        <path d="M40 40 C36 22 44 10 53 14 C56 22 49 33 40 40 Z" fill="#8C7758"/>
        <path d="M40 40 C56 32 69 38 68 48 C61 52 48 47 40 40 Z" fill="#8C7758"/>
        <path d="M40 40 C51 54 48 68 38 70 C33 64 35 51 40 40 Z" fill="#8C7758"/>
        <path d="M40 40 C27 56 14 55 11 45 C16 39 29 38 40 40 Z" fill="#8C7758"/>
        <path d="M40 40 C22 33 17 20 26 14 C33 17 37 29 40 40 Z" fill="#8C7758"/>
      </g>
      <circle cx="40" cy="40" r="10" fill="#3B2E20" stroke="#D9A84E" stroke-width="1.6"/>
      <circle cx="40" cy="40" r="4" fill="#E8C05A"/>
    </svg>`;
  },

  getStudyWallSVG() {
    return `<svg viewBox="0 0 1280 340" preserveAspectRatio="xMidYMin meet" class="study-wall-svg" aria-hidden="true">
      <defs>
        <radialGradient id="wall-lamp-cone" cx="0.17" cy="0.44" r="0.32">
          <stop offset="0%" stop-color="#FFE396" stop-opacity="0.32"/>
          <stop offset="52%" stop-color="#E5B254" stop-opacity="0.11"/>
          <stop offset="100%" stop-color="#1C2A20" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="wall-wood-shelf" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#7B5939"/>
          <stop offset="52%" stop-color="#563B24"/>
          <stop offset="100%" stop-color="#301F12"/>
        </linearGradient>
        <linearGradient id="clock-brass-ring" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#F6DC93"/>
          <stop offset="45%" stop-color="#C89436"/>
          <stop offset="100%" stop-color="#735015"/>
        </linearGradient>
      </defs>

      <!-- Warm Banker's Lamp Ambient Pool -->
      <rect width="1280" height="340" fill="url(#wall-lamp-cone)"/>

      <!-- Upper-Left Study Bookshelf -->
      <g opacity="0.94">
        <!-- Cast-Iron Shelf Brackets -->
        <path d="M98 214 L98 260 Q98 234 132 230 L132 214 Z" fill="#1E2420" stroke="#454E45" stroke-width="1.2"/>
        <path d="M466 214 L466 260 Q466 234 432 230 L432 214 Z" fill="#1E2420" stroke="#454E45" stroke-width="1.2"/>
        <!-- Shelf Plank -->
        <rect x="62" y="200" width="440" height="16" rx="2" fill="url(#wall-wood-shelf)" stroke="#24170D" stroke-width="1.5"/>
        <line x1="66" y1="202" x2="498" y2="202" stroke="#A67E57" stroke-width="1" opacity="0.5"/>

        <!-- Brass & Emerald Banker's Lamp -->
        <ellipse cx="174" cy="198" rx="23" ry="4.5" fill="#BA8934" stroke="#4D3612" stroke-width="1.2"/>
        <path d="M174 196 L174 148 Q174 136 186 136" fill="none" stroke="#CFA14A" stroke-width="4.5" stroke-linecap="round"/>
        <path d="M156 138 Q180 119 208 138 L202 155 Q180 148 160 155 Z" fill="#2A6E4E" stroke="#183E2B" stroke-width="1.5"/>
        <ellipse cx="182" cy="154" rx="19" ry="4.5" fill="#FFE79E" opacity="0.88"/>

        <!-- Clothbound Books & Leaning Tome -->
        <rect x="234" y="122" width="22" height="78" rx="2" fill="#2A573B" stroke="#183221" stroke-width="1.2"/>
        <line x1="237" y1="136" x2="253" y2="136" stroke="#D9B056" stroke-width="2"/>
        <line x1="237" y1="184" x2="253" y2="184" stroke="#D9B056" stroke-width="2"/>

        <rect x="258" y="132" width="18" height="68" rx="2" fill="#74302C" stroke="#3E1715" stroke-width="1.2"/>
        <line x1="260" y1="144" x2="274" y2="144" stroke="#E4C684" stroke-width="1.6"/>

        <rect x="278" y="116" width="24" height="84" rx="2" fill="#264068" stroke="#15243E" stroke-width="1.2"/>
        <line x1="282" y1="132" x2="298" y2="132" stroke="#E4C062" stroke-width="2"/>
        <line x1="282" y1="182" x2="298" y2="182" stroke="#E4C062" stroke-width="2"/>

        <g transform="translate(314, 200) rotate(-14)">
          <rect x="0" y="-72" width="19" height="72" rx="2" fill="#926C3F" stroke="#45321C" stroke-width="1.2"/>
          <line x1="3" y1="-58" x2="16" y2="-58" stroke="#F4DFAD" stroke-width="1.5"/>
        </g>

        <!-- Small Brass Desk Globe on Right End of Shelf -->
        <circle cx="416" cy="160" r="21" fill="#32635D" stroke="#CFA14A" stroke-width="1.6"/>
        <path d="M399 156 Q416 150 433 158 M404 170 Q416 174 428 167" fill="none" stroke="#8DC2AA" stroke-width="1.4" opacity="0.72"/>
        <path d="M416 135 A25 25 0 0 1 416 185" fill="none" stroke="#CFA14A" stroke-width="2"/>
        <path d="M416 185 L416 196 M403 198 L429 198" stroke="#CFA14A" stroke-width="2.5" stroke-linecap="round"/>
      </g>

      <!-- Upper-Right Oak Corkboard with Psalm 147:5 (ESV) Note Card -->
      <g>
        <!-- Cast Shadow Behind Board -->
        <rect x="558" y="34" width="424" height="196" rx="6" fill="rgba(8, 12, 9, 0.42)"/>
        <!-- Oak Frame & Cork Surface -->
        <rect x="552" y="28" width="424" height="196" rx="5" fill="#4A3422" stroke="#24180F" stroke-width="2"/>
        <rect x="564" y="40" width="400" height="172" rx="2" fill="#775D44" stroke="#36281B" stroke-width="1.4"/>

        <!-- Left Pinned Scripture Note Card: Psalm 147:5 (ESV) -->
        <g transform="translate(580, 52) rotate(-1.5)">
          <rect x="2" y="3" width="224" height="142" rx="2" fill="rgba(22, 16, 10, 0.25)"/>
          <rect width="224" height="142" rx="2" fill="#F8F0DC" stroke="#A6906A" stroke-width="1.1"/>
          <!-- Faint Card Ruled Lines -->
          <line x1="14" y1="30" x2="210" y2="30" stroke="#DFC9A6" stroke-width="0.9"/>
          <line x1="14" y1="50" x2="210" y2="50" stroke="#E8DEC7" stroke-width="0.7"/>
          <line x1="14" y1="70" x2="210" y2="70" stroke="#E8DEC7" stroke-width="0.7"/>
          <line x1="14" y1="90" x2="210" y2="90" stroke="#E8DEC7" stroke-width="0.7"/>
          <line x1="14" y1="110" x2="210" y2="110" stroke="#E8DEC7" stroke-width="0.7"/>
          <!-- Crimson Brass Pushpin -->
          <circle cx="112" cy="11" r="4.5" fill="#9E2D24" stroke="#4D140F" stroke-width="0.9"/>
          <circle cx="110.8" cy="9.7" r="1.4" fill="#F4A096" opacity="0.75"/>
          <!-- Exact ESV Scripture Text -->
          <text x="16" y="45" fill="#2A1D12" font-family="Georgia, Palatino, serif" font-style="italic" font-size="13.2">“Great is our Lord, and</text>
          <text x="16" y="65" fill="#2A1D12" font-family="Georgia, Palatino, serif" font-style="italic" font-size="13.2">abundant in power; his</text>
          <text x="16" y="85" fill="#2A1D12" font-family="Georgia, Palatino, serif" font-style="italic" font-size="13.2">understanding is</text>
          <text x="16" y="105" fill="#2A1D12" font-family="Georgia, Palatino, serif" font-style="italic" font-size="13.2">beyond measure.”</text>
          <text x="208" y="129" text-anchor="end" fill="#684320" font-family="Georgia, Palatino, serif" font-weight="700" font-size="11.2">— Psalm 147:5 (ESV)</text>
        </g>

        <!-- Right Pinned Study Sketch Card -->
        <g transform="translate(822, 62) rotate(2.2)">
          <rect x="2" y="3" width="124" height="106" rx="2" fill="rgba(22, 16, 10, 0.25)"/>
          <rect width="124" height="106" rx="2" fill="#ECF2E7" stroke="#859B87" stroke-width="1"/>
          <circle cx="62" cy="10" r="4" fill="#2E6F40" stroke="#183C22" stroke-width="0.9"/>
          <!-- Tiny Number Bond / Ten-Frame Diagram -->
          <rect x="16" y="25" width="92" height="22" rx="1.5" fill="none" stroke="#366E45" stroke-width="1.2"/>
          <line x1="34.4" y1="25" x2="34.4" y2="47" stroke="#366E45" stroke-width="0.9"/>
          <line x1="52.8" y1="25" x2="52.8" y2="47" stroke="#366E45" stroke-width="0.9"/>
          <line x1="71.2" y1="25" x2="71.2" y2="47" stroke="#366E45" stroke-width="0.9"/>
          <line x1="89.6" y1="25" x2="89.6" y2="47" stroke="#366E45" stroke-width="0.9"/>
          <circle cx="25.2" cy="36" r="4.5" fill="#C97329"/>
          <circle cx="43.6" cy="36" r="4.5" fill="#C97329"/>
          <circle cx="62" cy="36" r="4.5" fill="#C97329"/>
          <circle cx="80.4" cy="36" r="4.5" fill="#2E6F40"/>
          <circle cx="98.8" cy="36" r="4.5" fill="#2E6F40"/>
          <text x="62" y="68" text-anchor="middle" fill="#2B4834" font-family="Georgia, serif" font-size="10.5" font-weight="700">3 + 2 = 5</text>
          <line x1="18" y1="81" x2="106" y2="81" stroke="#6E8774" stroke-width="1.3"/>
          <line x1="18" y1="92" x2="88" y2="92" stroke="#6E8774" stroke-width="1.3"/>
        </g>
      </g>

      <!-- Live Real-Time Brass & Walnut Study Wall Clock (centered at 1110, 126) -->
      <g id="study-wall-clock">
        <circle cx="1113" cy="130" r="62" fill="rgba(8, 12, 9, 0.44)"/>
        <circle cx="1110" cy="126" r="62" fill="#3C2A1B" stroke="#22170D" stroke-width="2"/>
        <circle cx="1110" cy="126" r="56" fill="none" stroke="url(#clock-brass-ring)" stroke-width="4.5"/>
        <circle cx="1110" cy="126" r="52" fill="#F5ECD6" stroke="#8C6E42" stroke-width="1.3"/>
        <circle cx="1110" cy="126" r="47" fill="none" stroke="#CBB994" stroke-width="0.8"/>

        <!-- 12 Hour Markers & Classic Cardinal Numerals -->
        <line x1="1110" y1="77" x2="1110" y2="83" stroke="#36281A" stroke-width="2.2"/>
        <line x1="1134.5" y1="83.6" x2="1132" y2="88" stroke="#6E5A42" stroke-width="1.5"/>
        <line x1="1152.4" y1="101.5" x2="1148" y2="104" stroke="#6E5A42" stroke-width="1.5"/>
        <line x1="1159" y1="126" x2="1153" y2="126" stroke="#36281A" stroke-width="2.2"/>
        <line x1="1152.4" y1="150.5" x2="1148" y2="148" stroke="#6E5A42" stroke-width="1.5"/>
        <line x1="1134.5" y1="168.4" x2="1132" y2="164" stroke="#6E5A42" stroke-width="1.5"/>
        <line x1="1110" y1="175" x2="1110" y2="169" stroke="#36281A" stroke-width="2.2"/>
        <line x1="1085.5" y1="168.4" x2="1088" y2="164" stroke="#6E5A42" stroke-width="1.5"/>
        <line x1="1067.6" y1="150.5" x2="1072" y2="148" stroke="#6E5A42" stroke-width="1.5"/>
        <line x1="1061" y1="126" x2="1067" y2="126" stroke="#36281A" stroke-width="2.2"/>
        <line x1="1067.6" y1="101.5" x2="1072" y2="104" stroke="#6E5A42" stroke-width="1.5"/>
        <line x1="1085.5" y1="83.6" x2="1088" y2="88" stroke="#6E5A42" stroke-width="1.5"/>

        <text x="1110" y="95" text-anchor="middle" fill="#2E2216" font-family="Georgia, serif" font-size="11" font-weight="700">12</text>
        <text x="1145" y="130" text-anchor="middle" fill="#2E2216" font-family="Georgia, serif" font-size="11" font-weight="700">3</text>
        <text x="1110" y="165" text-anchor="middle" fill="#2E2216" font-family="Georgia, serif" font-size="11" font-weight="700">6</text>
        <text x="1075" y="130" text-anchor="middle" fill="#2E2216" font-family="Georgia, serif" font-size="11" font-weight="700">9</text>

        <!-- Dynamic Clock Hands Driven by Local Time in hub.js -->
        <g id="clock-hand-hour" transform="rotate(0 1110 126)">
          <line x1="1110" y1="131" x2="1110" y2="99" stroke="#241910" stroke-width="3.6" stroke-linecap="round"/>
        </g>
        <g id="clock-hand-minute" transform="rotate(0 1110 126)">
          <line x1="1110" y1="133" x2="1110" y2="87" stroke="#342618" stroke-width="2.4" stroke-linecap="round"/>
        </g>
        <g id="clock-hand-second" transform="rotate(0 1110 126)">
          <line x1="1110" y1="137" x2="1110" y2="83" stroke="#9B2D22" stroke-width="1.3" stroke-linecap="round"/>
        </g>
        <circle cx="1110" cy="126" r="4" fill="#C89436" stroke="#2A1D12" stroke-width="1.1"/>
      </g>
    </svg>`;
  },

  _coverKindergarten(grade) {
    return `<svg viewBox="0 0 220 240" class="cover-art-svg" aria-hidden="true">
      <defs>
        <linearGradient id="k-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#3E82A8"/>
          <stop offset="48%" stop-color="#9CD1CE"/>
          <stop offset="100%" stop-color="#F7E4A6"/>
        </linearGradient>
        <radialGradient id="k-sun" cx="0.76" cy="0.24" r="0.34">
          <stop offset="0%" stop-color="#FFFCE0"/>
          <stop offset="45%" stop-color="#F6CE66" stop-opacity="0.88"/>
          <stop offset="100%" stop-color="#F6CE66" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="k-hill-back" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#598C5E"/>
          <stop offset="100%" stop-color="#2D5B39"/>
        </linearGradient>
        <linearGradient id="k-hill-front" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#478042"/>
          <stop offset="100%" stop-color="#1E4627"/>
        </linearGradient>
        <linearGradient id="k-brook" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#87D0DA"/>
          <stop offset="100%" stop-color="#3A7C96"/>
        </linearGradient>
        <linearGradient id="k-banner" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#204D2E"/>
          <stop offset="65%" stop-color="#317044"/>
          <stop offset="100%" stop-color="#1C4228"/>
        </linearGradient>
        <linearGradient id="k-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#FFE694"/>
          <stop offset="52%" stop-color="#DF9F2D"/>
          <stop offset="100%" stop-color="#9E6212"/>
        </linearGradient>
      </defs>

      <!-- Sunlit Sky & Horizon -->
      <rect width="220" height="240" fill="url(#k-sky)"/>
      <rect width="220" height="170" fill="url(#k-sun)"/>
      <circle cx="166" cy="56" r="21" fill="#FFF7CA" opacity="0.92"/>

      <!-- Distant Ridges & Pine Silhouette -->
      <path d="M0 112 Q52 84 114 106 T220 92 L220 172 L0 172 Z" fill="url(#k-hill-back)"/>
      <path d="M16 105 L23 86 L30 105 M32 103 L40 80 L48 103 M175 96 L183 75 L191 96 M192 98 L200 79 L208 98" fill="#2A5437" opacity="0.72"/>

      <!-- Midground Meadow & Winding Brook -->
      <path d="M0 132 Q68 118 134 134 T220 126 L220 240 L0 240 Z" fill="url(#k-hill-front)"/>
      <path d="M98 132 Q122 148 92 168 Q62 188 110 210 L146 210 Q106 188 128 166 Q146 148 126 132 Z" fill="url(#k-brook)" stroke="#B7EAEB" stroke-width="1.2"/>

      <!-- Stone Arch Footbridge -->
      <path d="M72 157 Q110 137 148 157 L148 166 Q110 148 72 166 Z" fill="#C9B48F" stroke="#5A452D" stroke-width="1.4"/>
      <path d="M75 153 Q110 133 145 153" fill="none" stroke="#6E5233" stroke-width="3" stroke-linecap="round"/>

      <!-- Glowing Meadow Lantern Post -->
      <path d="M164 166 L164 116 Q164 108 156 108 L152 108" fill="none" stroke="#2D231A" stroke-width="2.6" stroke-linecap="round"/>
      <circle cx="151" cy="117" r="14" fill="#FFE684" opacity="0.34"/>
      <polygon points="146,113 156,113 154,123 148,123" fill="#FFF3B2" stroke="#2D231A" stroke-width="1.3"/>

      <!-- Framing Oak Canopy Upper Right & Left -->
      <path d="M0 24 Q28 28 38 52 Q18 62 0 58 Z" fill="#2B5934"/>
      <path d="M174 22 Q196 34 220 28 L220 68 Q188 64 176 42 Z" fill="#D46A28" opacity="0.88"/>
      <circle cx="195" cy="40" r="10" fill="#E89A34" opacity="0.82"/>

      <!-- Hero Character: Pip the Hedgehog on the Meadow Bank -->
      <g transform="translate(52, 134)">
        <!-- Ground Shadow -->
        <ellipse cx="22" cy="42" rx="22" ry="5" fill="rgba(16, 36, 18, 0.36)"/>
        <!-- Quills -->
        <path d="M4 26 L0 16 L9 17 L7 7 L16 12 L19 3 L26 11 L33 6 L34 17 L40 24 Z" fill="#5D3D26" stroke="#2F1C10" stroke-width="1.3"/>
        <!-- Body & Snout -->
        <ellipse cx="24" cy="27" rx="14" ry="12" fill="#E8C99D" stroke="#5D3D26" stroke-width="1.3"/>
        <circle cx="37" cy="26" r="2.2" fill="#2A1A10"/>
        <circle cx="31" cy="23" r="2" fill="#1C1410"/>
        <circle cx="31.7" cy="22.3" r="0.7" fill="#FFFFFF"/>
        <!-- Forest Explorer Vest & Golden Acorn -->
        <path d="M16 25 Q23 23 28 32 L18 37 Z" fill="#2C693F"/>
        <ellipse cx="38" cy="34" rx="4.2" ry="5.2" fill="#E3A532" stroke="#6E450B" stroke-width="1.1"/>
        <path d="M34 31 Q38 27 42 31 Z" fill="#6E450B"/>
      </g>

      <!-- Four Seasons Medallion Corners (2000s Collector Stamp Detail) -->
      <g transform="translate(18, 48)">
        <circle cx="0" cy="0" r="10" fill="#FDF7E8" stroke="#C86028" stroke-width="1.5"/>
        <path d="M0 -6 L3 -1 L6 -2 L3 2 L4 6 L0 4 L-4 6 L-3 2 L-6 -2 L-3 -1 Z" fill="#D45B26"/>
      </g>
      <g transform="translate(42, 48)">
        <circle cx="0" cy="0" r="10" fill="#EEF7FB" stroke="#4D8EB0" stroke-width="1.5"/>
        <path d="M0 -5.5 L0 5.5 M-5 0 L5 0 M-3.5 -3.5 L3.5 3.5 M-3.5 3.5 L3.5 -3.5" stroke="#3D7D9E" stroke-width="1.5" stroke-linecap="round"/>
      </g>
      <g transform="translate(18, 72)">
        <circle cx="0" cy="0" r="10" fill="#FDF2F4" stroke="#B65B7A" stroke-width="1.5"/>
        <circle cx="0" cy="-3.5" r="2.4" fill="#E589A5"/><circle cx="3.3" cy="0" r="2.4" fill="#E589A5"/>
        <circle cx="0" cy="3.5" r="2.4" fill="#E589A5"/><circle cx="-3.3" cy="0" r="2.4" fill="#E589A5"/>
        <circle cx="0" cy="0" r="2" fill="#F2BE3E"/>
      </g>
      <g transform="translate(42, 72)">
        <circle cx="0" cy="0" r="10" fill="#FFF9E4" stroke="#C88D22" stroke-width="1.5"/>
        <circle cx="0" cy="0" r="4.5" fill="#F2B830"/>
      </g>

      <!-- Early-2000s Slanted Grade Header Bar -->
      <path d="M0 0 L220 0 L220 26 L0 32 Z" fill="url(#k-banner)"/>
      <path d="M0 32 L220 26" stroke="#E8C05A" stroke-width="1.8"/>
      <text x="12" y="19" fill="#FFFDF6" font-family="Trebuchet MS, Segoe UI, sans-serif" font-size="10.5" font-weight="800" letter-spacing="1.1">KINDERGARTEN · AGES 5–6</text>
      <rect x="172" y="5" width="38" height="16" rx="2" fill="#E8C05A"/>
      <text x="191" y="16.5" text-anchor="middle" fill="#172A1C" font-family="Trebuchet MS, sans-serif" font-size="9.5" font-weight="900">DISC 01</text>

      <!-- Bottom Game Title Plaque -->
      <path d="M0 178 L220 172 L220 240 L0 240 Z" fill="#173521" opacity="0.95"/>
      <path d="M0 178 L220 172" stroke="url(#k-gold)" stroke-width="2.5"/>
      <text x="110" y="200" text-anchor="middle" fill="#FFE79E" font-family="Georgia, Palatino, serif" font-size="18.5" font-weight="800" letter-spacing="0.4">PIP’S MEADOW</text>
      <text x="110" y="216" text-anchor="middle" fill="#D4E8D5" font-family="Georgia, serif" font-style="italic" font-size="11">&amp; The Four Seasons Garden</text>
      <text x="110" y="231" text-anchor="middle" fill="#9BC0A4" font-family="Trebuchet MS, sans-serif" font-size="8.4" font-weight="700" letter-spacing="0.7">${grade.totalUnits} GARDEN WALKS · 3D &amp; BLOCKS</text>
    </svg>`;
  },

  _coverGrade1(grade) {
    return `<svg viewBox="0 0 220 240" class="cover-art-svg" aria-hidden="true">
      <defs>
        <linearGradient id="g1-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#0E1B36"/>
          <stop offset="56%" stop-color="#223D6E"/>
          <stop offset="100%" stop-color="#C86D3B"/>
        </linearGradient>
        <radialGradient id="g1-ember" cx="0.68" cy="0.38" r="0.42">
          <stop offset="0%" stop-color="#FFCA63" stop-opacity="0.72"/>
          <stop offset="65%" stop-color="#BA3E25" stop-opacity="0.28"/>
          <stop offset="100%" stop-color="#172A4D" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="g1-gold-metal" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#FFF0AD"/>
          <stop offset="45%" stop-color="#DFAD3D"/>
          <stop offset="100%" stop-color="#8A5714"/>
        </linearGradient>
        <linearGradient id="g1-header" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#102244"/>
          <stop offset="70%" stop-color="#1E3F78"/>
          <stop offset="100%" stop-color="#0E1D38"/>
        </linearGradient>
      </defs>

      <!-- Twilight Sky & Ember Glow -->
      <rect width="220" height="240" fill="url(#g1-sky)"/>
      <rect width="220" height="190" fill="url(#g1-ember)"/>

      <!-- Distant Dragon Mountain Peaks & Wing Silhouette -->
      <polygon points="0,152 38,94 74,130 118,74 166,120 202,86 220,108 220,180 0,180" fill="#182744"/>
      <polygon points="118,74 134,104 121,100 111,114" fill="#3B5382" opacity="0.65"/>
      <!-- Looming Dragon Silhouette on Right Peak -->
      <path d="M148 92 Q166 56 196 46 Q182 68 188 86 Q172 82 158 96 Z" fill="#121A2C" opacity="0.88"/>
      <path d="M146 92 Q138 78 130 76 L138 86 L133 94 Z" fill="#121A2C"/>
      <circle cx="137" cy="83" r="1.8" fill="#FFB940"/>

      <!-- Castle Battlements & Beacon Torches -->
      <path d="M0 132 L20 132 L20 122 L28 122 L28 132 L40 132 L40 122 L48 122 L48 132 L62 132 L62 175 L0 175 Z" fill="#1F2B3F" stroke="#4D638A" stroke-width="1"/>
      <circle cx="24" cy="116" r="7" fill="#FFAB38" opacity="0.45"/>
      <polygon points="24,108 27,117 21,117" fill="#FFD96B"/>

      <!-- Stone Causeway with Subtle Ten-Frame Pavers -->
      <polygon points="36,176 184,176 210,145 12,145" fill="#2A3446" opacity="0.65"/>
      <line x1="60" y1="152" x2="160" y2="152" stroke="#53688E" stroke-width="1" opacity="0.5"/>
      <line x1="48" y1="162" x2="172" y2="162" stroke="#53688E" stroke-width="1" opacity="0.5"/>

      <!-- Hero Crest: Heraldic Shield & Sword Centerpiece -->
      <g transform="translate(110, 108)">
        <!-- Radiant Aura Ring -->
        <circle cx="0" cy="0" r="44" fill="none" stroke="#E8C05A" stroke-width="1.2" stroke-dasharray="4 3" opacity="0.55"/>
        <!-- Crossed Sword Behind Shield -->
        <path d="M0 -50 L4 -40 L4 34 L-4 34 L-4 -40 Z" fill="#DAE3F0" stroke="#364661" stroke-width="1.1"/>
        <rect x="-15" y="-33" width="30" height="4.5" rx="2" fill="url(#g1-gold-metal)"/>
        <!-- Royal Shield -->
        <path d="M0 -34 L30 -23 L30 -2 C30 18 16 32 0 38 C-16 32 -30 18 -30 -2 L-30 -23 Z" fill="#173156" stroke="url(#g1-gold-metal)" stroke-width="3.2"/>
        <path d="M0 -28 L23 -19 L23 -2 C23 14 12 25 0 30 C-12 25 -23 14 -23 -2 L-23 -19 Z" fill="#23487C"/>
        <!-- Crimson & Gold Quartering -->
        <path d="M0 -28 L0 30 M-23 -3 L23 -3" stroke="url(#g1-gold-metal)" stroke-width="4.2"/>
        <circle cx="0" cy="-3" r="7.5" fill="#9E2727" stroke="#FFF0AD" stroke-width="1.6"/>
        <polygon points="0,-8 2,-2.5 5.5,-2.5 2.6,0.5 3.6,5 0,2.5 -3.6,5 -2.6,0.5 -5.5,-2.5 -2,-2.5" fill="#FFE68C"/>
      </g>

      <!-- Early-2000s Steel-Blue Grade Header Bar -->
      <path d="M0 0 L220 0 L220 26 L0 32 Z" fill="url(#g1-header)"/>
      <path d="M0 32 L220 26" stroke="#DFAD3D" stroke-width="1.8"/>
      <text x="12" y="19" fill="#FFFDF6" font-family="Trebuchet MS, Segoe UI, sans-serif" font-size="10.5" font-weight="800" letter-spacing="1.1">GRADE 1 · AGES 6–7</text>
      <rect x="172" y="5" width="38" height="16" rx="2" fill="#DFAD3D"/>
      <text x="191" y="16.5" text-anchor="middle" fill="#101E38" font-family="Trebuchet MS, sans-serif" font-size="9.5" font-weight="900">DISC 02</text>

      <!-- Bottom Game Title Plaque -->
      <path d="M0 176 L220 170 L220 240 L0 240 Z" fill="#0F1C36" opacity="0.96"/>
      <path d="M0 176 L220 170" stroke="url(#g1-gold-metal)" stroke-width="2.5"/>
      <text x="110" y="198" text-anchor="middle" fill="#FFE692" font-family="Georgia, Palatino, serif" font-size="14.2" font-weight="800" letter-spacing="0.3">YOUNG KNIGHT’S QUEST</text>
      <text x="110" y="215" text-anchor="middle" fill="#D6E2F5" font-family="Georgia, serif" font-style="italic" font-size="11">4 Acts · 4 Bosses · Mental Math</text>
      <text x="110" y="231" text-anchor="middle" fill="#8FB1DE" font-family="Trebuchet MS, sans-serif" font-size="8.4" font-weight="700" letter-spacing="0.7">${grade.totalUnits} MISSIONS · VOICED TUTOR</text>
    </svg>`;
  },

  _coverGrade2(grade) {
    return `<svg viewBox="0 0 220 240" class="cover-art-svg" aria-hidden="true">
      <defs>
        <linearGradient id="g2-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#282329"/>
          <stop offset="52%" stop-color="#6A5344"/>
          <stop offset="100%" stop-color="#D7B284"/>
        </linearGradient>
        <linearGradient id="g2-brass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#F7DFAC"/>
          <stop offset="55%" stop-color="#BD8C44"/>
          <stop offset="100%" stop-color="#6B4A1E"/>
        </linearGradient>
      </defs>

      <!-- Dawn Expedition Sky & Distant Archipelago -->
      <rect width="220" height="240" fill="url(#g2-sky)"/>
      <circle cx="110" cy="108" r="56" fill="none" stroke="#F4DAB0" stroke-width="1" stroke-dasharray="3 4" opacity="0.42"/>
      <circle cx="110" cy="108" r="38" fill="none" stroke="#F4DAB0" stroke-width="1.3" opacity="0.5"/>

      <!-- Cloud Banks -->
      <path d="M0 144 Q32 128 66 138 Q98 122 134 136 Q178 124 220 138 L220 185 L0 185 Z" fill="#463830" opacity="0.78"/>
      <path d="M0 156 Q46 144 90 155 Q148 142 220 154 L220 190 L0 190 Z" fill="#2E2520" opacity="0.88"/>

      <!-- Brass Astrolabe & Lantern Airship -->
      <g transform="translate(110, 102)">
        <circle cx="0" cy="0" r="31" fill="rgba(28, 22, 18, 0.45)" stroke="url(#g2-brass)" stroke-width="2.6"/>
        <polygon points="0,-24 5,-5 24,0 5,5 0,24 -5,5 -24,0 -5,-5" fill="url(#g2-brass)" opacity="0.88"/>
        <circle cx="0" cy="0" r="6.5" fill="#FFF0C6" stroke="#6B4A1E" stroke-width="1.6"/>
        <!-- Mini Airship Lantern -->
        <ellipse cx="36" cy="-22" rx="14" ry="8" fill="#B67E3E" stroke="#F7DFAC" stroke-width="1.2"/>
        <rect x="31" y="-12" width="10" height="6" rx="1" fill="#3B2B1E" stroke="#F7DFAC" stroke-width="0.9"/>
        <circle cx="36" cy="-9" r="2.2" fill="#FFE78C"/>
      </g>

      <!-- Header Bar -->
      <path d="M0 0 L220 0 L220 26 L0 32 Z" fill="#3A2F27"/>
      <path d="M0 32 L220 26" stroke="#BD8C44" stroke-width="1.8"/>
      <text x="12" y="19" fill="#F4EAD7" font-family="Trebuchet MS, Segoe UI, sans-serif" font-size="10.5" font-weight="800" letter-spacing="1.1">GRADE 2 · AGES 7–8</text>
      <rect x="172" y="5" width="38" height="16" rx="2" fill="#9E8B75"/>
      <text x="191" y="16.5" text-anchor="middle" fill="#1C1612" font-family="Trebuchet MS, sans-serif" font-size="9.5" font-weight="900">DISC 03</text>

      <!-- Diagonal Prototype Wax-Sealed Tape -->
      <g transform="translate(110, 62) rotate(-14)">
        <rect x="-125" y="-12" width="250" height="24" fill="#8C3128" opacity="0.94" stroke="#E8C794" stroke-width="1.2"/>
        <text x="0" y="4" text-anchor="middle" fill="#FFF5E1" font-family="Trebuchet MS, sans-serif" font-size="9.5" font-weight="900" letter-spacing="1.8">PROTOTYPE · COMING NEXT</text>
      </g>

      <!-- Bottom Title Plaque -->
      <path d="M0 176 L220 170 L220 240 L0 240 Z" fill="#211A15" opacity="0.96"/>
      <path d="M0 176 L220 170" stroke="url(#g2-brass)" stroke-width="2.4"/>
      <text x="110" y="198" text-anchor="middle" fill="#F2D299" font-family="Georgia, Palatino, serif" font-size="13.2" font-weight="800" letter-spacing="0.25">LANTERN-KEEPER’S ATLAS</text>
      <text x="110" y="215" text-anchor="middle" fill="#D5C6B3" font-family="Georgia, serif" font-style="italic" font-size="10.8">Numbers to 1,000 &amp; Multiplication</text>
      <text x="110" y="231" text-anchor="middle" fill="#A4937F" font-family="Trebuchet MS, sans-serif" font-size="8.4" font-weight="700" letter-spacing="0.7">${grade.totalUnits} PLANNED EXPEDITIONS</text>
    </svg>`;
  },

  _discKindergarten(grade, uid) {
    return `<svg viewBox="0 0 200 200" class="cd-disc-svg" aria-hidden="true">
      <defs>
        <radialGradient id="cd-k-base-${uid}" cx="50%" cy="50%" r="50%">
          <stop offset="22%" stop-color="#D7E6CF"/>
          <stop offset="32%" stop-color="#2D6D41"/>
          <stop offset="86%" stop-color="#1E4B2B"/>
          <stop offset="93%" stop-color="#D4DEE2"/>
          <stop offset="100%" stop-color="#8A9CA6"/>
        </radialGradient>
        <path id="cd-k-arc-top-${uid}" d="M 30,100 A 70,70 0 1,1 170,100"/>
        <path id="cd-k-arc-bot-${uid}" d="M 164,106 A 64,64 0 1,1 36,106"/>
      </defs>
      <circle cx="100" cy="100" r="98" fill="url(#cd-k-base-${uid})" stroke="#B7C9D1" stroke-width="1.5"/>
      <!-- Seasonal Quadrant Rings -->
      <path d="M100 100 L100 16 A84 84 0 0 1 184 100 Z" fill="#D6872C" opacity="0.28"/>
      <path d="M100 100 L184 100 A84 84 0 0 1 100 184 Z" fill="#4D8FB3" opacity="0.26"/>
      <path d="M100 100 L100 184 A84 84 0 0 1 16 100 Z" fill="#599B58" opacity="0.28"/>
      <path d="M100 100 L16 100 A84 84 0 0 1 100 16 Z" fill="#F2BD3E" opacity="0.24"/>

      <!-- Printed Graphic Rings & Medallion -->
      <circle cx="100" cy="100" r="81" fill="none" stroke="#F4D37B" stroke-width="1.8"/>
      <circle cx="100" cy="100" r="62" fill="none" stroke="#FFFFFF" stroke-width="0.7" opacity="0.16"/>
      <circle cx="100" cy="100" r="48" fill="none" stroke="#FAF4E6" stroke-width="1" stroke-dasharray="3 3" opacity="0.72"/>

      <!-- Miniature Acorn & Leaf Emblems flanking Spindle -->
      <circle cx="52" cy="100" r="6" fill="#E3A532" stroke="#FFF4D2" stroke-width="1"/>
      <circle cx="148" cy="100" r="6" fill="#E3A532" stroke="#FFF4D2" stroke-width="1"/>

      <!-- Curved CD-ROM Typography -->
      <text fill="#FFF8E2" font-family="Georgia, serif" font-size="13.5" font-weight="800" letter-spacing="1.4">
        <textPath href="#cd-k-arc-top-${uid}" startOffset="50%" text-anchor="middle">PIP’S MEADOW</textPath>
      </text>
      <text fill="#D2EBCD" font-family="Trebuchet MS, sans-serif" font-size="9" font-weight="800" letter-spacing="1.3">
        <textPath href="#cd-k-arc-bot-${uid}" startOffset="50%" text-anchor="middle">KINDERGARTEN • DISC 01</textPath>
      </text>

      <!-- CD-ROM Mini Stamp -->
      <rect x="78" y="138" width="44" height="13" rx="2" fill="#173822" stroke="#E8C05A" stroke-width="1"/>
      <text x="100" y="147.5" text-anchor="middle" fill="#FFE8A3" font-family="Trebuchet MS, sans-serif" font-size="7.5" font-weight="900" letter-spacing="0.8">CD-ROM</text>

      <!-- Polycarbonate Hub & Center Spindle Hole -->
      <circle cx="100" cy="100" r="30" fill="#DDE6E8" opacity="0.88" stroke="#9AAAB2" stroke-width="1.5"/>
      <circle cx="100" cy="100" r="22" fill="rgba(255,255,255,0.42)" stroke="#70848C" stroke-width="1"/>
      <circle cx="100" cy="100" r="14" fill="#182026" stroke="#C5D2D8" stroke-width="2"/>
    </svg>`;
  },

  _discGrade1(grade, uid) {
    return `<svg viewBox="0 0 200 200" class="cd-disc-svg" aria-hidden="true">
      <defs>
        <radialGradient id="cd-g1-base-${uid}" cx="50%" cy="50%" r="50%">
          <stop offset="22%" stop-color="#D4DCE8"/>
          <stop offset="32%" stop-color="#1E3F76"/>
          <stop offset="86%" stop-color="#0E1E3C"/>
          <stop offset="93%" stop-color="#D6DFE6"/>
          <stop offset="100%" stop-color="#8798A6"/>
        </radialGradient>
        <path id="cd-g1-arc-top-${uid}" d="M 28,100 A 72,72 0 1,1 172,100"/>
        <path id="cd-g1-arc-bot-${uid}" d="M 164,106 A 64,64 0 1,1 36,106"/>
      </defs>
      <circle cx="100" cy="100" r="98" fill="url(#cd-g1-base-${uid})" stroke="#B7C8D6" stroke-width="1.5"/>

      <!-- Heraldic Crimson & Gold Quarters -->
      <path d="M100 100 L170 50 A84 84 0 0 1 170 150 Z" fill="#9E2727" opacity="0.34"/>
      <path d="M100 100 L30 150 A84 84 0 0 1 30 50 Z" fill="#9E2727" opacity="0.34"/>

      <!-- Arcane Geometric Ten-Ring -->
      <circle cx="100" cy="100" r="81" fill="none" stroke="#E5B93C" stroke-width="2"/>
      <circle cx="100" cy="100" r="62" fill="none" stroke="#FFFFFF" stroke-width="0.7" opacity="0.16"/>
      <circle cx="100" cy="100" r="49" fill="none" stroke="#E5B93C" stroke-width="1.3" stroke-dasharray="6 4" opacity="0.85"/>

      <!-- Miniature Heraldic Diamonds -->
      <polygon points="50,94 56,100 50,106 44,100" fill="#E5B93C"/>
      <polygon points="150,94 156,100 150,106 144,100" fill="#E5B93C"/>

      <!-- Curved Title -->
      <text fill="#FFE99B" font-family="Georgia, serif" font-size="12.2" font-weight="800" letter-spacing="1.1">
        <textPath href="#cd-g1-arc-top-${uid}" startOffset="50%" text-anchor="middle">YOUNG KNIGHT’S QUEST</textPath>
      </text>
      <text fill="#C9DCF7" font-family="Trebuchet MS, sans-serif" font-size="9" font-weight="800" letter-spacing="1.3">
        <textPath href="#cd-g1-arc-bot-${uid}" startOffset="50%" text-anchor="middle">GRADE 1 • DISC 02</textPath>
      </text>

      <!-- CD-ROM Mini Stamp -->
      <rect x="78" y="138" width="44" height="13" rx="2" fill="#0C172E" stroke="#E5B93C" stroke-width="1"/>
      <text x="100" y="147.5" text-anchor="middle" fill="#FFE99B" font-family="Trebuchet MS, sans-serif" font-size="7.5" font-weight="900" letter-spacing="0.8">CD-ROM</text>

      <!-- Polycarbonate Hub & Center Spindle Hole -->
      <circle cx="100" cy="100" r="30" fill="#DDE6EC" opacity="0.88" stroke="#9AA9B6" stroke-width="1.5"/>
      <circle cx="100" cy="100" r="22" fill="rgba(255,255,255,0.42)" stroke="#6C7F91" stroke-width="1"/>
      <circle cx="100" cy="100" r="14" fill="#182026" stroke="#C5D2D8" stroke-width="2"/>
    </svg>`;
  },

  _discGrade2(grade, uid) {
    return `<svg viewBox="0 0 200 200" class="cd-disc-svg" aria-hidden="true">
      <defs>
        <radialGradient id="cd-g2-base-${uid}" cx="50%" cy="50%" r="50%">
          <stop offset="22%" stop-color="#E6E4DF"/>
          <stop offset="32%" stop-color="#B9B6B0"/>
          <stop offset="86%" stop-color="#87847E"/>
          <stop offset="93%" stop-color="#DCDAD4"/>
          <stop offset="100%" stop-color="#76736D"/>
        </radialGradient>
        <path id="cd-g2-arc-top-${uid}" d="M 30,100 A 70,70 0 1,1 170,100"/>
        <path id="cd-g2-arc-bot-${uid}" d="M 164,106 A 64,64 0 1,1 36,106"/>
      </defs>
      <circle cx="100" cy="100" r="98" fill="url(#cd-g2-base-${uid})" stroke="#CECBC4" stroke-width="1.5"/>
      <circle cx="100" cy="100" r="80" fill="none" stroke="#423A32" stroke-width="1.4" stroke-dasharray="5 3"/>
      <circle cx="100" cy="100" r="48" fill="none" stroke="#8C3128" stroke-width="1.4"/>

      <!-- Etched Silver Disc Typography -->
      <text fill="#261F1A" font-family="Georgia, serif" font-size="11.5" font-weight="800" letter-spacing="0.8">
        <textPath href="#cd-g2-arc-top-${uid}" startOffset="50%" text-anchor="middle">LANTERN ATLAS • BETA</textPath>
      </text>
      <text fill="#6E261F" font-family="Trebuchet MS, sans-serif" font-size="9" font-weight="800" letter-spacing="1.0">
        <textPath href="#cd-g2-arc-bot-${uid}" startOffset="50%" text-anchor="middle">PROTOTYPE • DISC 03</textPath>
      </text>

      <rect x="70" y="138" width="60" height="13" rx="2" fill="#8C3128"/>
      <text x="100" y="147.5" text-anchor="middle" fill="#FFF4DE" font-family="Trebuchet MS, sans-serif" font-size="7.2" font-weight="900" letter-spacing="0.7">COMING NEXT</text>

      <!-- Polycarbonate Hub & Center Spindle Hole -->
      <circle cx="100" cy="100" r="30" fill="#E6E4DE" opacity="0.9" stroke="#9B978F" stroke-width="1.5"/>
      <circle cx="100" cy="100" r="22" fill="rgba(255,255,255,0.45)" stroke="#706C64" stroke-width="1"/>
      <circle cx="100" cy="100" r="14" fill="#182026" stroke="#C5D2D8" stroke-width="2"/>
    </svg>`;
  }
};

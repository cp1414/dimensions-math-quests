// ============================================================================
// SHARED CONCRETE-PICTORIAL-ABSTRACT (CPA) VECTOR VISUAL PRIMITIVES
// Reusable SVG diagrams across Kindergarten & Elementary grades — Zero Emojis
// ============================================================================

const CPAPrimitives = {
  // --------------------------------------------------------------------------
  // 1. GARDEN & STORYBOOK COUNTER ITEMS (100% Hand-Crafted SVG)
  // --------------------------------------------------------------------------
  getItemSVG(itemType, variant = "primary", size = 34) {
    const alt = variant === "secondary";
    switch (itemType) {
      case "acorn": {
        const body = alt ? "#C97B36" : "#B0682A";
        const cap = alt ? "#7A4820" : "#5E3719";
        return `<svg width="${size}" height="${size}" viewBox="0 0 36 36" aria-hidden="true">
          <path d="M18 4 C19 4 20 6 19.5 8" stroke="#4D2E14" stroke-width="2.6" stroke-linecap="round" fill="none"/>
          <path d="M7 15 C7 9 29 9 29 15 Z" fill="${cap}" stroke="#3E2410" stroke-width="1.6"/>
          <path d="M9 12 L27 12 M12 10 L24 10" stroke="#9B663B" stroke-width="1" opacity="0.6"/>
          <path d="M9 15 C9 26 14 31 18 33 C22 31 27 26 27 15 Z" fill="${body}" stroke="#4D2E14" stroke-width="1.6"/>
          <ellipse cx="14" cy="21" rx="2" ry="4" fill="#E39D5B" opacity="0.55"/>
        </svg>`;
      }
      case "leaf": {
        const fill = alt ? "#D97A2B" : "#4D8B4F";
        const stroke = alt ? "#8C4512" : "#28532A";
        return `<svg width="${size}" height="${size}" viewBox="0 0 36 36" aria-hidden="true">
          <path d="M18 4 C27 9 30 19 24 27 C20 31 16 31 12 27 C6 19 9 9 18 4 Z" fill="${fill}" stroke="${stroke}" stroke-width="1.8"/>
          <path d="M18 8 L18 33 M18 16 L24 12 M18 21 L12 17 M18 25 L23 22" stroke="#F4ECCE" stroke-width="1.5" stroke-linecap="round" opacity="0.8"/>
        </svg>`;
      }
      case "berry": {
        const fill = alt ? "#4563A8" : "#C43C48";
        const stroke = alt ? "#26396B" : "#7D1E28";
        return `<svg width="${size}" height="${size}" viewBox="0 0 36 36" aria-hidden="true">
          <path d="M12 10 L18 6 L24 10 L18 12 Z" fill="#467C3E" stroke="#264D22" stroke-width="1.4"/>
          <circle cx="18" cy="21" r="10.5" fill="${fill}" stroke="${stroke}" stroke-width="1.8"/>
          <circle cx="14" cy="17" r="2.6" fill="#FFFFFF" opacity="0.4"/>
          <circle cx="21" cy="23" r="1.2" fill="#FFF3D6" opacity="0.7"/>
          <circle cx="15" cy="24" r="1.1" fill="#FFF3D6" opacity="0.7"/>
        </svg>`;
      }
      case "daisy": {
        const petal = alt ? "#FCE38A" : "#FFFDF8";
        const center = alt ? "#D96B27" : "#F0B429";
        return `<svg width="${size}" height="${size}" viewBox="0 0 36 36" aria-hidden="true">
          <g stroke="#8A795D" stroke-width="1.1" fill="${petal}">
            <ellipse cx="18" cy="8" rx="3.4" ry="5.5"/>
            <ellipse cx="18" cy="28" rx="3.4" ry="5.5"/>
            <ellipse cx="8" cy="18" rx="5.5" ry="3.4"/>
            <ellipse cx="28" cy="18" rx="5.5" ry="3.4"/>
            <ellipse cx="11" cy="11" rx="3.4" ry="5" transform="rotate(-45 11 11)"/>
            <ellipse cx="25" cy="11" rx="3.4" ry="5" transform="rotate(45 25 11)"/>
            <ellipse cx="11" cy="25" rx="3.4" ry="5" transform="rotate(45 11 25)"/>
            <ellipse cx="25" cy="25" rx="3.4" ry="5" transform="rotate(-45 25 25)"/>
          </g>
          <circle cx="18" cy="18" r="5.5" fill="${center}" stroke="#8C5B12" stroke-width="1.4"/>
        </svg>`;
      }
      case "ladybug": {
        const wing = alt ? "#E08A2E" : "#C93636";
        return `<svg width="${size}" height="${size}" viewBox="0 0 36 36" aria-hidden="true">
          <circle cx="18" cy="10" r="5" fill="#2A2624"/>
          <path d="M14 7 L11 4 M22 7 L25 4" stroke="#2A2624" stroke-width="1.6" stroke-linecap="round"/>
          <ellipse cx="18" cy="21" rx="10" ry="11" fill="${wing}" stroke="#4A1A1A" stroke-width="1.6"/>
          <line x1="18" y1="10" x2="18" y2="32" stroke="#2A2624" stroke-width="1.8"/>
          <circle cx="13.5" cy="18" r="2" fill="#2A2624"/>
          <circle cx="22.5" cy="18" r="2" fill="#2A2624"/>
          <circle cx="14.5" cy="25" r="1.8" fill="#2A2624"/>
          <circle cx="21.5" cy="25" r="1.8" fill="#2A2624"/>
        </svg>`;
      }
      case "apple": {
        const fill = alt ? "#E6B832" : "#C73737";
        const stroke = alt ? "#8C6812" : "#781B1B";
        return `<svg width="${size}" height="${size}" viewBox="0 0 36 36" aria-hidden="true">
          <path d="M18 10 Q18 5 21 4" stroke="#5C3A1E" stroke-width="2.4" fill="none" stroke-linecap="round"/>
          <path d="M19 8 Q25 4 27 8 Q23 11 19 8 Z" fill="#4E8A45" stroke="#2D5727" stroke-width="1"/>
          <path d="M18 11 C11 9 6 15 7 22 C8 29 14 33 18 31 C22 33 28 29 29 22 C30 15 25 9 18 11 Z" fill="${fill}" stroke="${stroke}" stroke-width="1.7"/>
          <ellipse cx="13" cy="17" rx="2" ry="4" fill="#FFFFFF" opacity="0.32" transform="rotate(-15 13 17)"/>
        </svg>`;
      }
      case "honeyjar": {
        const lid = alt ? "#5A82B5" : "#C9523B";
        return `<svg width="${size}" height="${size}" viewBox="0 0 36 36" aria-hidden="true">
          <rect x="10" y="6" width="16" height="5" rx="2" fill="${lid}" stroke="#422817" stroke-width="1.5"/>
          <path d="M9 12 L27 12 L29 28 C29 31 26 33 18 33 C10 33 7 31 7 28 Z" fill="#F2B830" stroke="#7A4C10" stroke-width="1.7"/>
          <path d="M10 13 C12 17 15 14 18 17 C21 14 24 17 26 13" fill="#FFF2B8" opacity="0.7"/>
          <rect x="12" y="19" width="12" height="8" rx="2" fill="#FFFDF5" stroke="#8C6226" stroke-width="1.1"/>
        </svg>`;
      }
      case "pinecone": {
        const fill = alt ? "#9B683A" : "#7A4C26";
        return `<svg width="${size}" height="${size}" viewBox="0 0 36 36" aria-hidden="true">
          <ellipse cx="18" cy="20" rx="9" ry="12" fill="${fill}" stroke="#3E230E" stroke-width="1.7"/>
          <path d="M11 15 Q18 19 25 15 M10 20 Q18 24 26 20 M11 25 Q18 29 25 25" stroke="#E0B684" stroke-width="1.5" fill="none"/>
          <path d="M18 5 L18 9" stroke="#3E230E" stroke-width="2.5" stroke-linecap="round"/>
        </svg>`;
      }
      case "pebble":
      default: {
        const fill = alt ? "#86A4B8" : "#968E84";
        return `<svg width="${size}" height="${size}" viewBox="0 0 36 36" aria-hidden="true">
          <ellipse cx="18" cy="20" rx="12" ry="9" fill="${fill}" stroke="#46413B" stroke-width="1.7"/>
          <ellipse cx="14" cy="17" rx="4" ry="2" fill="#FFFFFF" opacity="0.35"/>
        </svg>`;
      }
    }
  },

  // --------------------------------------------------------------------------
  // 2. FIVE-FRAME & TEN-FRAME & DOUBLE TEN-FRAME (Subitizing & Place Value)
  // --------------------------------------------------------------------------
  renderFiveFrameHTML(count, itemType = "acorn", opts = {}) {
    const safeCount = Math.max(0, Math.min(5, count));
    const partA = typeof opts.partA === "number" ? opts.partA : safeCount;
    let cells = "";
    for (let i = 0; i < 5; i++) {
      const filled = i < safeCount;
      const variant = i < partA ? "primary" : "secondary";
      cells += `<div class="cpa-frame-cell" data-frame="5" style="width:58px;height:58px;border:2.5px solid #35583B;background:${filled ? "#F5FAF1" : "#FFFFFF"};display:flex;align-items:center;justify-content:center;border-radius:8px;">
        ${filled ? this.getItemSVG(itemType, variant, 36) : ""}
      </div>`;
    }
    return `<div class="cpa-five-frame" style="display:inline-flex;gap:6px;padding:10px;background:#E2EFE0;border:2.5px solid #2A4B30;border-radius:14px;">${cells}</div>`;
  },

  renderTenFrameHTML(count, itemType = "berry", opts = {}) {
    const safeCount = Math.max(0, Math.min(10, count));
    const partA = typeof opts.partA === "number" ? opts.partA : safeCount;
    const crossCount = typeof opts.crossOut === "number" ? opts.crossOut : 0;
    let cells = "";
    for (let i = 0; i < 10; i++) {
      const filled = i < safeCount;
      const variant = i < partA ? "primary" : "secondary";
      const isCrossed = filled && i >= safeCount - crossCount;
      cells += `<div class="cpa-frame-cell" data-frame="10" style="position:relative;width:58px;height:58px;border:2px solid #35583B;background:${filled ? "#F7FBF4" : "#FFFFFF"};display:flex;align-items:center;justify-content:center;border-radius:8px;">
        ${filled ? this.getItemSVG(itemType, variant, 34) : ""}
        ${isCrossed ? `<svg data-crossout="1" width="50" height="50" viewBox="0 0 50 50" style="position:absolute;inset:2px;pointer-events:none;"><line x1="8" y1="8" x2="42" y2="42" stroke="#982B2B" stroke-width="5" stroke-linecap="round"/><line x1="42" y1="8" x2="8" y2="42" stroke="#982B2B" stroke-width="5" stroke-linecap="round"/></svg>` : ""}
      </div>`;
    }
    return `<div class="cpa-ten-frame" style="display:inline-grid;grid-template-columns:repeat(5,58px);gap:5px;padding:10px;background:#E2EFE0;border:2.5px solid #2A4B30;border-radius:14px;">${cells}</div>`;
  },

  renderDoubleTenFrameHTML(count, itemType = "acorn", opts = {}) {
    const safeCount = Math.max(0, Math.min(20, count));
    const first = Math.min(10, safeCount);
    const second = Math.max(0, safeCount - 10);
    const showLabels = opts.showLabels !== false;
    return `<div style="display:flex;flex-wrap:wrap;gap:14px;align-items:center;justify-content:center;">
      <div style="display:flex;flex-direction:column;align-items:center;gap:4px;">
        ${this.renderTenFrameHTML(first, itemType, { partA: first })}
        ${showLabels ? `<span style="font-size:13px;font-weight:700;color:#2A4B30;">10</span>` : ""}
      </div>
      <div style="display:flex;flex-direction:column;align-items:center;gap:4px;">
        ${this.renderTenFrameHTML(second, itemType, { partA: 0 })}
        ${showLabels ? `<span style="font-size:13px;font-weight:700;color:#7A4820;">${second} more</span>` : ""}
      </div>
    </div>`;
  },

  // --------------------------------------------------------------------------
  // 3. NUMBER BOND (Signature CPA Part-Part-Whole Diagram)
  // --------------------------------------------------------------------------
  renderNumberBondSVG(whole, partA, partB, missing = "none", showDots = true) {
    const wText = missing === "whole" ? "?" : String(whole);
    const aText = missing === "partA" ? "?" : String(partA);
    const bText = missing === "partB" ? "?" : String(partB);
    const wFill = missing === "whole" ? "#FFF2CC" : "#FFFFFF";
    const aFill = missing === "partA" ? "#FFF2CC" : "#EAF5EE";
    const bFill = missing === "partB" ? "#FFF2CC" : "#FCECD9";

    const renderMiniDots = (cx, cy, n, color) => {
      if (!showDots || n <= 0 || n > 10) return "";
      let dots = "";
      const cols = n <= 3 ? n : n <= 6 ? 3 : 5;
      const rows = Math.ceil(n / cols);
      for (let i = 0; i < n; i++) {
        const r = Math.floor(i / cols);
        const c = i % cols;
        const dx = cx + (c - (cols - 1) / 2) * 10;
        const dy = cy + 16 + (r - (rows - 1) / 2) * 9;
        dots += `<circle cx="${dx}" cy="${dy}" r="3.1" fill="${color}"/>`;
      }
      return dots;
    };

    return `<svg width="260" height="190" viewBox="0 0 260 190" role="img" aria-label="Number bond diagram">
      <line x1="130" y1="54" x2="64" y2="128" stroke="#4D6644" stroke-width="5" stroke-linecap="round"/>
      <line x1="130" y1="54" x2="196" y2="128" stroke="#4D6644" stroke-width="5" stroke-linecap="round"/>
      <circle cx="130" cy="48" r="34" fill="${wFill}" stroke="#2A4B30" stroke-width="3.5"/>
      <text x="130" y="55" text-anchor="middle" font-size="26" font-weight="800" fill="${missing === "whole" ? "#B04E18" : "#1E2D1E"}">${wText}</text>
      <circle cx="64" cy="134" r="32" fill="${aFill}" stroke="#2E6F40" stroke-width="3"/>
      <text x="64" y="${showDots && missing !== "partA" ? 131 : 141}" text-anchor="middle" font-size="23" font-weight="800" fill="${missing === "partA" ? "#B04E18" : "#224B2E"}">${aText}</text>
      ${missing !== "partA" ? renderMiniDots(64, 132, partA, "#2E6F40") : ""}
      <circle cx="196" cy="134" r="32" fill="${bFill}" stroke="#A85B1C" stroke-width="3"/>
      <text x="196" y="${showDots && missing !== "partB" ? 131 : 141}" text-anchor="middle" font-size="23" font-weight="800" fill="${missing === "partB" ? "#B04E18" : "#7A3F10"}">${bText}</text>
      ${missing !== "partB" ? renderMiniDots(196, 132, partB, "#B05E22") : ""}
    </svg>`;
  },

  // --------------------------------------------------------------------------
  // 4. STEPPING-STONE NUMBER PATH (1–10)
  // --------------------------------------------------------------------------
  renderNumberPathSVG(start, jump, direction = "forward", opts = {}) {
    const cells = 10;
    const stepW = 54;
    const totalW = cells * stepW + 20;
    const revealEnd = opts.revealEnd === true;
    let boxes = "";
    let arcs = "";
    const endVal = direction === "forward" ? start + jump : start - jump;

    for (let i = 1; i <= cells; i++) {
      const x = 10 + (i - 1) * stepW;
      const isStart = i === start;
      const isEnd = revealEnd && i === endVal;
      const fill = isStart ? "#DCEFD9" : isEnd ? "#FCE8C3" : "#FFFDF8";
      const stroke = isStart ? "#2E6F40" : isEnd ? "#C0671B" : "#7D9173";
      boxes += `<rect x="${x}" y="58" width="48" height="48" rx="10" fill="${fill}" stroke="${stroke}" stroke-width="${isStart || isEnd ? 3 : 2}"/>
        <text x="${x + 24}" y="90" text-anchor="middle" font-size="21" font-weight="800" fill="#233322">${i}</text>`;
    }

    if (revealEnd) {
      const hops = Math.abs(jump);
      for (let h = 0; h < hops; h++) {
        const fromIdx = direction === "forward" ? start + h : start - h;
        const toIdx = direction === "forward" ? fromIdx + 1 : fromIdx - 1;
        if (fromIdx < 1 || toIdx < 1 || fromIdx > 10 || toIdx > 10) continue;
        const x1 = 10 + (fromIdx - 1) * stepW + 24;
        const x2 = 10 + (toIdx - 1) * stepW + 24;
        const mid = (x1 + x2) / 2;
        const arcColor = direction === "forward" ? "#2E6F40" : "#B03B2E";
        const label = direction === "forward" ? "+1" : "−1";
        arcs += `<path d="M ${x1} 54 Q ${mid} 22 ${x2} 54" fill="none" stroke="${arcColor}" stroke-width="2.8" stroke-linecap="round"/>
          <text x="${mid}" y="22" text-anchor="middle" font-size="13" font-weight="800" fill="${arcColor}">${label}</text>`;
      }
    } else {
      const sx = 10 + (start - 1) * stepW + 24;
      const badgeColor = direction === "forward" ? "#2E6F40" : "#B03B2E";
      const arrowText = direction === "forward" ? `Hop +${jump} →` : `← Hop −${jump}`;
      const clampedX = Math.max(62, Math.min(totalW - 62, sx));
      arcs = `<rect x="${clampedX - 52}" y="12" width="104" height="24" rx="5" fill="#FFFDF8" stroke="${badgeColor}" stroke-width="2"/>
        <text x="${clampedX}" y="29" text-anchor="middle" font-size="13" font-weight="800" fill="${badgeColor}">${arrowText}</text>
        <line x1="${sx}" y1="36" x2="${sx}" y2="54" stroke="${badgeColor}" stroke-width="2.2" stroke-dasharray="3,2"/>`;
    }

    return `<svg width="100%" style="max-width:${totalW}px" viewBox="0 0 ${totalW} 118" role="img" aria-label="Number path 1 to 10">${arcs}${boxes}</svg>`;
  },

  // --------------------------------------------------------------------------
  // 5. 1-TO-1 MATCHING COMPARISON ROWS
  // --------------------------------------------------------------------------
  renderCompareMatchHTML(topCount, bottomCount, topItem = "acorn", bottomItem = "leaf", showLines = true) {
    const cols = Math.max(topCount, bottomCount, 1);
    const cellW = 46;
    const width = cols * cellW;
    let topRow = "";
    let botRow = "";
    let lines = "";
    const pairs = Math.min(topCount, bottomCount);

    for (let i = 0; i < topCount; i++) {
      topRow += `<div class="cmp-cell-top" style="width:42px;height:42px;display:flex;align-items:center;justify-content:center;">${this.getItemSVG(topItem, "primary", 34)}</div>`;
    }
    for (let j = 0; j < bottomCount; j++) {
      botRow += `<div class="cmp-cell-bot" style="width:42px;height:42px;display:flex;align-items:center;justify-content:center;">${this.getItemSVG(bottomItem, "secondary", 34)}</div>`;
    }
    if (showLines && pairs > 0) {
      for (let p = 0; p < pairs; p++) {
        const cx = p * cellW + 21;
        lines += `<line x1="${cx}" y1="2" x2="${cx}" y2="26" stroke="#5A7554" stroke-width="2.2" stroke-dasharray="4,3"/>`;
      }
    }

    return `<div style="display:flex;flex-direction:column;align-items:flex-start;gap:2px;background:#F6FAF3;padding:12px 16px;border-radius:14px;border:2px solid #9BB892;">
      <div style="display:flex;gap:4px;">${topRow}</div>
      <svg width="${width}" height="28" viewBox="0 0 ${width} 28" aria-hidden="true">${lines}</svg>
      <div style="display:flex;gap:4px;">${botRow}</div>
    </div>`;
  },

  // --------------------------------------------------------------------------
  // 6. WOODEN PAN BALANCE (Weight Comparison: Heavier / Lighter / Equal)
  // --------------------------------------------------------------------------
  renderPanBalanceSVG(leftItem, leftWeight, rightItem, rightWeight, leftLabel = "", rightLabel = "") {
    const diff = rightWeight - leftWeight; // >0 means right is heavier (tilts down right)
    const angle = diff === 0 ? 0 : diff > 0 ? 11 : -11;
    const rad = (angle * Math.PI) / 180;
    const lx = 160 - Math.cos(rad) * 86;
    const ly = 72 - Math.sin(rad) * 86;
    const rx = 160 + Math.cos(rad) * 86;
    const ry = 72 + Math.sin(rad) * 86;

    return `<svg width="320" height="170" viewBox="0 0 320 170" role="img" aria-label="Garden pan balance scale">
      <path d="M126 156 L194 156 L172 138 L148 138 Z" fill="#8C5B32" stroke="#4D2E14" stroke-width="2"/>
      <rect x="155" y="66" width="10" height="74" rx="4" fill="#9B683B" stroke="#4D2E14" stroke-width="2"/>
      <line x1="${lx}" y1="${ly}" x2="${rx}" y2="${ry}" stroke="#4D2E14" stroke-width="5" stroke-linecap="round"/>
      <circle cx="160" cy="72" r="7" fill="#E8B948" stroke="#4D2E14" stroke-width="2"/>
      <!-- Left Pan -->
      <line x1="${lx}" y1="${ly}" x2="${lx - 22}" y2="${ly + 36}" stroke="#6B5A48" stroke-width="1.8"/>
      <line x1="${lx}" y1="${ly}" x2="${lx + 22}" y2="${ly + 36}" stroke="#6B5A48" stroke-width="1.8"/>
      <path d="M${lx - 30} ${ly + 36} Q${lx} ${ly + 48} ${lx + 30} ${ly + 36} Z" fill="#D4A656" stroke="#5C3D18" stroke-width="2"/>
      <g transform="translate(${lx - 18}, ${ly + 4})">${this.getItemSVG(leftItem, "primary", 34)}</g>
      <text x="${lx}" y="${ly + 62}" text-anchor="middle" font-size="12" font-weight="700" fill="#2A4B30">${leftLabel}</text>
      <!-- Right Pan -->
      <line x1="${rx}" y1="${ry}" x2="${rx - 22}" y2="${ry + 36}" stroke="#6B5A48" stroke-width="1.8"/>
      <line x1="${rx}" y1="${ry}" x2="${rx + 22}" y2="${ry + 36}" stroke="#6B5A48" stroke-width="1.8"/>
      <path d="M${rx - 30} ${ry + 36} Q${rx} ${ry + 48} ${rx + 30} ${ry + 36} Z" fill="#D4A656" stroke="#5C3D18" stroke-width="2"/>
      <g transform="translate(${rx - 18}, ${ry + 4})">${this.getItemSVG(rightItem, "secondary", 34)}</g>
      <text x="${rx}" y="${ry + 62}" text-anchor="middle" font-size="12" font-weight="700" fill="#7A4820">${rightLabel}</text>
    </svg>`;
  },

  // --------------------------------------------------------------------------
  // 7. 2D FLAT SHAPES & 3D SOLID SHAPES
  // --------------------------------------------------------------------------
  renderShapeSVG(shapeKey, size = 110, showVertices = false) {
    const fill = "#67A66F";
    const stroke = "#204A26";
    const altFill = "#E6A945";
    const altStroke = "#7A4C0E";
    let body = "";
    let dots = "";

    const vDot = (x, y) => showVertices ? `<circle cx="${x}" cy="${y}" r="5.5" fill="#F2C84B" stroke="#1E361E" stroke-width="2"/>` : "";

    switch (shapeKey) {
      case "circle":
        body = `<circle cx="60" cy="60" r="42" fill="${fill}" stroke="${stroke}" stroke-width="3.5"/>`;
        break;
      case "triangle":
        body = `<polygon points="60,16 104,98 16,98" fill="${fill}" stroke="${stroke}" stroke-width="3.5" stroke-linejoin="round"/>`;
        dots = vDot(60, 16) + vDot(104, 98) + vDot(16, 98);
        break;
      case "square":
        body = `<rect x="20" y="20" width="80" height="80" rx="3" fill="${fill}" stroke="${stroke}" stroke-width="3.5"/>`;
        dots = vDot(20, 20) + vDot(100, 20) + vDot(100, 100) + vDot(20, 100);
        break;
      case "rectangle":
        body = `<rect x="10" y="32" width="100" height="56" rx="3" fill="${fill}" stroke="${stroke}" stroke-width="3.5"/>`;
        dots = vDot(10, 32) + vDot(110, 32) + vDot(110, 88) + vDot(10, 88);
        break;
      case "hexagon":
        body = `<polygon points="60,14 100,37 100,83 60,106 20,83 20,37" fill="${fill}" stroke="${stroke}" stroke-width="3.5" stroke-linejoin="round"/>`;
        dots = vDot(60, 14) + vDot(100, 37) + vDot(100, 83) + vDot(60, 106) + vDot(20, 83) + vDot(20, 37);
        break;
      case "sphere":
        body = `<circle cx="60" cy="60" r="42" fill="${altFill}" stroke="${altStroke}" stroke-width="3"/>
                <ellipse cx="60" cy="60" rx="42" ry="14" fill="none" stroke="${altStroke}" stroke-width="1.6" stroke-dasharray="4,3"/>
                <circle cx="44" cy="42" r="10" fill="#FFF7D6" opacity="0.55"/>`;
        break;
      case "cube":
        body = `<polygon points="24,42 74,42 74,94 24,94" fill="${altFill}" stroke="${altStroke}" stroke-width="3" stroke-linejoin="round"/>
                <polygon points="24,42 46,22 96,22 74,42" fill="#F5CB76" stroke="${altStroke}" stroke-width="3" stroke-linejoin="round"/>
                <polygon points="74,42 96,22 96,74 74,94" fill="#C98A2B" stroke="${altStroke}" stroke-width="3" stroke-linejoin="round"/>`;
        break;
      case "cylinder":
        body = `<path d="M26 34 L26 88 A34 12 0 0 0 94 88 L94 34 Z" fill="${altFill}" stroke="${altStroke}" stroke-width="3"/>
                <ellipse cx="60" cy="34" rx="34" ry="12" fill="#F5CB76" stroke="${altStroke}" stroke-width="3"/>`;
        break;
      case "cone":
        body = `<path d="M60 16 L24 88 A36 12 0 0 0 96 88 Z" fill="${altFill}" stroke="${altStroke}" stroke-width="3" stroke-linejoin="round"/>
                <ellipse cx="60" cy="88" rx="36" ry="11" fill="#C98A2B" stroke="${altStroke}" stroke-width="2.5"/>`;
        break;
    }

    return `<svg width="${size}" height="${size}" viewBox="0 0 120 120" role="img" aria-label="${shapeKey}">${body}${dots}</svg>`;
  },

  // --------------------------------------------------------------------------
  // 8. ANALOG & DIGITAL CLOCK (Hour / Half-Hour)
  // --------------------------------------------------------------------------
  renderClockHTML(hour, minutes = 0) {
    const hAngle = ((hour % 12) + minutes / 60) * 30 - 90;
    const mAngle = minutes * 6 - 90;
    const hx = 75 + Math.cos((hAngle * Math.PI) / 180) * 32;
    const hy = 75 + Math.sin((hAngle * Math.PI) / 180) * 32;
    const mx = 75 + Math.cos((mAngle * Math.PI) / 180) * 48;
    const my = 75 + Math.sin((mAngle * Math.PI) / 180) * 48;

    let nums = "";
    for (let n = 1; n <= 12; n++) {
      const a = (n * 30 - 90) * (Math.PI / 180);
      const nx = 75 + Math.cos(a) * 54;
      const ny = 75 + Math.sin(a) * 54 + 4.5;
      nums += `<text x="${nx.toFixed(1)}" y="${ny.toFixed(1)}" text-anchor="middle" font-size="12" font-weight="800" fill="#233824">${n}</text>`;
    }

    const minStr = minutes < 10 ? `0${minutes}` : String(minutes);
    return `<div style="display:flex;flex-direction:column;align-items:center;gap:8px;">
      <svg width="146" height="146" viewBox="0 0 150 150" role="img" aria-label="Analog clock showing ${hour}:${minStr}">
        <circle cx="75" cy="75" r="68" fill="#FFFDF7" stroke="#2E6F40" stroke-width="5"/>
        <circle cx="75" cy="75" r="62" fill="none" stroke="#DCE8D5" stroke-width="2"/>
        ${nums}
        <line x1="75" y1="75" x2="${mx.toFixed(1)}" y2="${my.toFixed(1)}" stroke="#B84B28" stroke-width="3.5" stroke-linecap="round"/>
        <line x1="75" y1="75" x2="${hx.toFixed(1)}" y2="${hy.toFixed(1)}" stroke="#203D25" stroke-width="5.5" stroke-linecap="round"/>
        <circle cx="75" cy="75" r="5" fill="#E8B948" stroke="#203D25" stroke-width="2"/>
      </svg>
    </div>`;
  },

  // --------------------------------------------------------------------------
  // 9. US COINS (1¢, 5¢, 10¢, 25¢)
  // --------------------------------------------------------------------------
  renderCoinsHTML(coins, opts = {}) {
    const showLabels = opts.showLabels !== false;
    const specs = {
      1:  { label: "1¢",  name: "Penny",   r: 24, fill: "#D48155", rim: "#8A4624", text: "#421D0B", dash: "" },
      5:  { label: "5¢",  name: "Nickel",  r: 28, fill: "#CFD6DC", rim: "#6C7780", text: "#2C353B", dash: "" },
      10: { label: "10¢", name: "Dime",    r: 19, fill: "#E5EBEF", rim: "#7C8891", text: "#2C353B", dash: "1.6,1.6" },
      25: { label: "25¢", name: "Quarter", r: 34, fill: "#DCE2E6", rim: "#5A6670", text: "#242D33", dash: "2.4,1.8" }
    };
    const renderMotif = (val, c, color) => {
      if (val === 1) {
        return `<path d="M${c - 6} ${c - 7} L${c + 6} ${c - 7} L${c + 5} ${c + 4} Q${c} ${c + 9} ${c - 5} ${c + 4} Z" fill="${color}" opacity="0.32"/>
          <line x1="${c}" y1="${c - 5}" x2="${c}" y2="${c + 5}" stroke="${color}" stroke-width="1.6" opacity="0.55"/>`;
      }
      if (val === 5) {
        return `<path d="M${c - 9} ${c + 6} L${c + 9} ${c + 6} M${c - 7} ${c + 6} L${c - 7} ${c} L${c + 7} ${c} L${c + 7} ${c + 6}" fill="none" stroke="${color}" stroke-width="1.8" opacity="0.5"/>
          <path d="M${c - 5} ${c} A5 5 0 0 1 ${c + 5} ${c} Z" fill="${color}" opacity="0.35"/>`;
      }
      if (val === 10) {
        return `<line x1="${c}" y1="${c - 6}" x2="${c}" y2="${c + 7}" stroke="${color}" stroke-width="2" opacity="0.55"/>
          <path d="M${c - 3} ${c - 6} Q${c} ${c - 10} ${c + 3} ${c - 6} Z" fill="${color}" opacity="0.45"/>`;
      }
      return `<path d="M${c - 13} ${c - 3} Q${c} ${c - 11} ${c + 13} ${c - 3} L${c + 8} ${c + 5} L${c} ${c + 9} L${c - 8} ${c + 5} Z" fill="${color}" opacity="0.28"/>
        <path d="M${c - 10} ${c - 2} L${c} ${c + 6} L${c + 10} ${c - 2}" fill="none" stroke="${color}" stroke-width="1.8" opacity="0.55"/>`;
    };
    const items = coins.map((val) => {
      const s = specs[val] || specs[1];
      const box = s.r * 2 + 12;
      const c = box / 2;
      const innerDash = s.dash ? ` stroke-dasharray="${s.dash}"` : "";
      const centerHTML = showLabels
        ? `<text x="${c}" y="${c + 5}" text-anchor="middle" font-size="14" font-weight="800" fill="${s.text}">${s.label}</text>`
        : renderMotif(val, c, s.text);
      return `<div style="display:flex;flex-direction:column;align-items:center;gap:2px;" data-coin="${s.label}">
        <svg width="${box}" height="${box}" viewBox="0 0 ${box} ${box}" role="img" aria-label="${showLabels ? `${s.name} ${s.label}` : "Garden coin"}">
          <circle cx="${c}" cy="${c}" r="${s.r}" fill="${s.fill}" stroke="${s.rim}" stroke-width="3"/>
          <circle cx="${c}" cy="${c}" r="${s.r - 4.5}" fill="none" stroke="${s.rim}" stroke-width="1.2"${innerDash}/>
          ${centerHTML}
        </svg>
        ${showLabels ? `<span style="font-size:11px;font-weight:700;color:#4B5946;">${s.name}</span>` : ""}
      </div>`;
    }).join("");
    return `<div style="display:flex;flex-wrap:wrap;gap:12px;align-items:center;justify-content:center;">${items}</div>`;
  }
};

// ============================================================================
// PIP'S MEADOW & THE FOUR SEASONS GARDEN — KINDERGARTEN VECTOR ARTWORK
// Uses shared CPAPrimitives + bespoke Four Seasons Garden Map, Pip & Barnaby Owl
// ============================================================================

const GardenVisuals = {
  getIconSVG(key, size = 26) {
    switch (key) {
      case "acorn":
      case "leaf":
      case "berry":
      case "daisy":
      case "ladybug":
      case "apple":
      case "honeyjar":
      case "pinecone":
      case "pebble":
        return CPAPrimitives.getItemSVG(key, "primary", size);
      case "crest":
        return `<svg width="${size}" height="${size}" viewBox="0 0 36 36" aria-hidden="true">
          <circle cx="18" cy="18" r="15" fill="#E9F5E6" stroke="#D99B26" stroke-width="2.4"/>
          <path d="M18 7 C24 11 26 19 18 28 C10 19 12 11 18 7 Z" fill="#2E6F40"/>
          <path d="M18 10 L18 28" stroke="#FAF6EC" stroke-width="1.8" stroke-linecap="round"/>
        </svg>`;
      case "map":
        return `<svg width="${size}" height="${size}" viewBox="0 0 36 36" aria-hidden="true">
          <polygon points="4,8 13,5 23,9 32,6 32,28 23,31 13,27 4,30" fill="#F4EFE2" stroke="#2E6F40" stroke-width="2"/>
          <path d="M9 21 Q15 13 21 19 T28 14" fill="none" stroke="#D99B26" stroke-width="2.2" stroke-dasharray="3,2"/>
        </svg>`;
      case "blocks":
        return `<svg width="${size}" height="${size}" viewBox="0 0 36 36" aria-hidden="true">
          <rect x="6" y="18" width="11" height="11" rx="2" fill="#E6A945" stroke="#5E3719" stroke-width="1.8"/>
          <rect x="19" y="18" width="11" height="11" rx="2" fill="#4D8B4F" stroke="#204A26" stroke-width="1.8"/>
          <rect x="12" y="7" width="11" height="11" rx="2" fill="#C43C48" stroke="#7D1E28" stroke-width="1.8"/>
        </svg>`;
      case "compass":
        return `<svg width="${size}" height="${size}" viewBox="0 0 36 36" aria-hidden="true">
          <circle cx="18" cy="18" r="14" fill="#FFFDF8" stroke="#D99B26" stroke-width="2.2"/>
          <polygon points="18,7 22,18 18,29 14,18" fill="#2E6F40"/>
          <circle cx="18" cy="18" r="2.5" fill="#F4C852"/>
        </svg>`;
      case "speakerOn":
        return `<svg width="${size}" height="${size}" viewBox="0 0 36 36" aria-hidden="true">
          <polygon points="6,14 13,14 21,8 21,28 13,22 6,22" fill="#2E6F40"/>
          <path d="M25 13 A7 7 0 0 1 25 23" fill="none" stroke="#2E6F40" stroke-width="2.4" stroke-linecap="round"/>
          <path d="M28 9 A12 12 0 0 1 28 27" fill="none" stroke="#2E6F40" stroke-width="2.2" stroke-linecap="round"/>
        </svg>`;
      case "speakerOff":
        return `<svg width="${size}" height="${size}" viewBox="0 0 36 36" aria-hidden="true">
          <polygon points="6,14 13,14 21,8 21,28 13,22 6,22" fill="#7D887A"/>
          <line x1="24" y1="13" x2="31" y2="23" stroke="#B83B3B" stroke-width="2.6" stroke-linecap="round"/>
          <line x1="31" y1="13" x2="24" y2="23" stroke="#B83B3B" stroke-width="2.6" stroke-linecap="round"/>
        </svg>`;
      case "star":
        return `<svg width="${size}" height="${size}" viewBox="0 0 36 36" aria-hidden="true">
          <polygon points="18,4 22,13 32,14 24.5,21 26.5,31 18,26 9.5,31 11.5,21 4,14 14,13" fill="#F4C852" stroke="#9D711A" stroke-width="1.8" stroke-linejoin="round"/>
        </svg>`;
      case "starEmpty":
        return `<svg width="${size}" height="${size}" viewBox="0 0 36 36" aria-hidden="true">
          <polygon points="18,4 22,13 32,14 24.5,21 26.5,31 18,26 9.5,31 11.5,21 4,14 14,13" fill="#E8E1CF" stroke="#B5AA92" stroke-width="1.8" stroke-linejoin="round"/>
        </svg>`;
      case "seal":
        return `<svg width="${size}" height="${size}" viewBox="0 0 48 48" aria-hidden="true">
          <circle cx="24" cy="24" r="20" fill="#F4C852" stroke="#8C5B12" stroke-width="2.5"/>
          <circle cx="24" cy="24" r="15" fill="#2E6F40"/>
          <polygon points="24,13 27,20 34,21 29,26 30,33 24,29.5 18,33 19,26 14,21 21,20" fill="#F4C852"/>
        </svg>`;
      case "scroll":
        return `<svg width="${size}" height="${size}" viewBox="0 0 36 36" aria-hidden="true">
          <rect x="8" y="6" width="20" height="24" rx="4" fill="#FFFDF8" stroke="#8C5B12" stroke-width="2"/>
          <line x1="12" y1="13" x2="24" y2="13" stroke="#2E6F40" stroke-width="2" stroke-linecap="round"/>
          <line x1="12" y1="18" x2="24" y2="18" stroke="#435240" stroke-width="1.8" stroke-linecap="round"/>
          <line x1="12" y1="23" x2="20" y2="23" stroke="#435240" stroke-width="1.8" stroke-linecap="round"/>
        </svg>`;
      case "scale":
        return `<svg width="${size}" height="${size}" viewBox="0 0 36 36" aria-hidden="true">
          <line x1="18" y1="8" x2="18" y2="30" stroke="#5E3719" stroke-width="3"/>
          <line x1="6" y1="12" x2="30" y2="12" stroke="#5E3719" stroke-width="2.8" stroke-linecap="round"/>
          <path d="M5 20 Q9 24 13 20 Z" fill="#D99B26"/>
          <path d="M23 20 Q27 24 31 20 Z" fill="#D99B26"/>
          <rect x="12" y="29" width="12" height="4" rx="2" fill="#8C5B32"/>
        </svg>`;
      case "clock":
        return `<svg width="${size}" height="${size}" viewBox="0 0 36 36" aria-hidden="true">
          <circle cx="18" cy="18" r="14" fill="#FFFDF8" stroke="#2E6F40" stroke-width="2.4"/>
          <line x1="18" y1="18" x2="18" y2="9" stroke="#B83B3B" stroke-width="2.2" stroke-linecap="round"/>
          <line x1="18" y1="18" x2="25" y2="18" stroke="#1E281D" stroke-width="2.5" stroke-linecap="round"/>
          <circle cx="18" cy="18" r="2" fill="#D99B26"/>
        </svg>`;
      case "coin":
        return `<svg width="${size}" height="${size}" viewBox="0 0 36 36" aria-hidden="true">
          <circle cx="18" cy="18" r="13" fill="#F4C852" stroke="#8C5B12" stroke-width="2.2"/>
          <text x="18" y="22" text-anchor="middle" font-size="13" font-weight="800" fill="#5E3719">¢</text>
        </svg>`;
      case "shape":
        return CPAPrimitives.renderShapeSVG("hexagon", size, false);
      case "numberbond":
        return `<svg width="${size}" height="${size}" viewBox="0 0 36 36" aria-hidden="true">
          <line x1="18" y1="10" x2="10" y2="25" stroke="#2E6F40" stroke-width="2.2"/>
          <line x1="18" y1="10" x2="26" y2="25" stroke="#2E6F40" stroke-width="2.2"/>
          <circle cx="18" cy="9" r="5" fill="#F4C852" stroke="#2E6F40" stroke-width="1.8"/>
          <circle cx="10" cy="26" r="4.5" fill="#E9F5E6" stroke="#2E6F40" stroke-width="1.8"/>
          <circle cx="26" cy="26" r="4.5" fill="#FCECD9" stroke="#A85B1C" stroke-width="1.8"/>
        </svg>`;
      default:
        return CPAPrimitives.getItemSVG("acorn", "primary", size);
    }
  },

  getPipTokenSVG(size = 44) {
    return `<svg width="${size}" height="${size}" viewBox="0 0 48 48" aria-hidden="true">
      <ellipse cx="24" cy="30" rx="15" ry="12" fill="#7A5230" stroke="#3D2614" stroke-width="2"/>
      <path d="M12 24 L15 17 L19 22 L24 14 L29 22 L33 17 L36 24" fill="#634022" stroke="#3D2614" stroke-width="1.5" stroke-linejoin="round"/>
      <ellipse cx="24" cy="33" rx="10" ry="7.5" fill="#E8D2B0"/>
      <circle cx="20.5" cy="31" r="1.8" fill="#1E1812"/>
      <circle cx="27.5" cy="31" r="1.8" fill="#1E1812"/>
      <circle cx="24" cy="34.5" r="2.2" fill="#3D2614"/>
      <path d="M16 19 Q24 11 32 19" fill="#3D8C52" stroke="#1E4C2B" stroke-width="1.6"/>
    </svg>`;
  },

  getOwlPortraitSVG(size = 48) {
    return `<svg width="${size}" height="${size}" viewBox="0 0 52 52" aria-hidden="true">
      <circle cx="26" cy="26" r="24" fill="#F8F1DF" stroke="#8C5B12" stroke-width="2"/>
      <ellipse cx="26" cy="31" rx="14" ry="14" fill="#8C6239" stroke="#4D3219" stroke-width="1.8"/>
      <ellipse cx="26" cy="35" rx="8" ry="8" fill="#F3E5CA"/>
      <circle cx="20" cy="23" r="6" fill="#FFFDF8" stroke="#4D3219" stroke-width="1.6"/>
      <circle cx="32" cy="23" r="6" fill="#FFFDF8" stroke="#4D3219" stroke-width="1.6"/>
      <circle cx="20" cy="23" r="2.4" fill="#1E1812"/>
      <circle cx="32" cy="23" r="2.4" fill="#1E1812"/>
      <polygon points="26,25 23,29 29,29" fill="#E69B28" stroke="#7A4C10" stroke-width="1.2"/>
      <path d="M14 14 L20 18 M38 14 L32 18" stroke="#4D3219" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`;
  },

  renderGardenMapSVG(nodes) {
    let pathD = "";
    if (nodes && nodes.length > 0) {
      pathD = `M ${nodes[0].mapPos.x * 10} ${nodes[0].mapPos.y * 5.6}`;
      for (let i = 1; i < nodes.length; i++) {
        const p = nodes[i].mapPos;
        const prev = nodes[i - 1].mapPos;
        const cx = ((prev.x + p.x) / 2) * 10;
        const cy = ((prev.y + p.y) / 2) * 5.6 - (i % 2 === 0 ? 18 : -18);
        pathD += ` Q ${cx} ${cy} ${p.x * 10} ${p.y * 5.6}`;
      }
    }

    return `<svg viewBox="0 0 1000 560" preserveAspectRatio="none" style="width:100%;height:100%;display:block;" aria-hidden="true">
      <defs>
        <linearGradient id="seasonBands" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#F6E4C6"/>
          <stop offset="28%" stop-color="#E7EFF5"/>
          <stop offset="60%" stop-color="#E7F5E3"/>
          <stop offset="100%" stop-color="#FAF3CF"/>
        </linearGradient>
      </defs>
      <rect width="1000" height="560" fill="url(#seasonBands)"/>
      <!-- Gentle Rolling Hills -->
      <path d="M0 440 Q180 385 380 430 T740 410 T1000 430 L1000 560 L0 560 Z" fill="#C9DFBA" opacity="0.65"/>
      <path d="M0 130 Q260 175 520 115 T1000 135 L1000 0 L0 0 Z" fill="#DDF0D4" opacity="0.55"/>
      <!-- Seasonal Labels -->
      <text x="125" y="42" text-anchor="middle" font-size="16" font-weight="800" fill="#8C4B1C" opacity="0.75">I. AUTUMN HARVEST</text>
      <text x="365" y="42" text-anchor="middle" font-size="16" font-weight="800" fill="#325978" opacity="0.75">II. WINTER HEARTH</text>
      <text x="625" y="42" text-anchor="middle" font-size="16" font-weight="800" fill="#2A6B3B" opacity="0.75">III. SPRING BLOSSOM</text>
      <text x="875" y="42" text-anchor="middle" font-size="16" font-weight="800" fill="#8C6B14" opacity="0.75">IV. SUMMER MEADOW</text>
      <!-- Winding Brook -->
      <path d="M220 560 Q280 420 265 280 T320 0" fill="none" stroke="#99C7DB" stroke-width="18" stroke-linecap="round" opacity="0.45"/>
      <!-- Garden Stepping-Stone Trail -->
      <path d="${pathD}" fill="none" stroke="#C5A87E" stroke-width="16" stroke-linecap="round" opacity="0.5"/>
      <path d="${pathD}" fill="none" stroke="#7E6542" stroke-width="4" stroke-dasharray="10,9" stroke-linecap="round"/>
      <!-- Decorative Trees -->
      <circle cx="70" cy="120" r="28" fill="#D97A2B" opacity="0.65"/>
      <circle cx="95" cy="136" r="22" fill="#E6A945" opacity="0.65"/>
      <polygon points="340,120 314,175 366,175" fill="#467A59" opacity="0.7"/>
      <circle cx="620" cy="490" r="30" fill="#6BB36B" opacity="0.6"/>
      <circle cx="930" cy="490" r="34" fill="#E8B948" opacity="0.5"/>
    </svg>`;
  },

  // --------------------------------------------------------------------------
  // KINDERGARTEN VISUAL MATH DISPATCHER
  // --------------------------------------------------------------------------
  renderMathVisual(container, spec) {
    if (!container || !spec) return;
    let html = "";

    switch (spec.type) {
      case "sort-odd-one": {
        const cards = spec.cards.map((c, idx) => {
          const graphic = c.shapeKey
            ? CPAPrimitives.renderShapeSVG(c.shapeKey, 64, false)
            : CPAPrimitives.getItemSVG(c.itemType, c.variant || "primary", 56);
          return `<div class="sort-card" data-card-index="${idx}" style="width:110px;padding:12px 8px;border:2.5px solid #9CB894;border-radius:14px;background:#F9FCF7;display:flex;flex-direction:column;align-items:center;gap:6px;">
            <span style="font-size:13px;font-weight:800;color:#2E6F40;">${c.label}</span>
            ${graphic}
          </div>`;
        }).join("");
        html = `<div style="display:flex;flex-wrap:wrap;gap:14px;justify-content:center;">${cards}</div>`;
        break;
      }

      case "five-frame": {
        html = CPAPrimitives.renderFiveFrameHTML(spec.count, spec.itemType || "acorn", { partA: spec.partA });
        break;
      }

      case "ten-frame": {
        html = CPAPrimitives.renderTenFrameHTML(spec.count, spec.itemType || "berry", {
          partA: spec.partA,
          crossOut: spec.crossOut || 0
        });
        break;
      }

      case "double-ten-frame": {
        html = CPAPrimitives.renderDoubleTenFrameHTML(spec.count, spec.itemType || "acorn", {
          showLabels: spec.showLabels !== false
        });
        break;
      }

      case "ordinal-line": {
        const showNums = spec.showNumbers !== false;
        const cellW = spec.total > 7 ? 50 : 58;
        let cells = "";
        for (let i = 1; i <= spec.total; i++) {
          const isTarget = i === spec.targetIndex;
          const bg = isTarget ? "#FFF0C2" : "#F6FAF3";
          const border = isTarget ? "#D99B26" : "#9CB894";
          const subLabel = isTarget ? "?" : (showNums ? String(i) : (i === 1 ? "1st" : "·"));
          cells += `<div class="ordinal-slot" style="width:${cellW}px;padding:6px 4px;border:2.5px solid ${border};background:${bg};border-radius:12px;display:flex;flex-direction:column;align-items:center;gap:2px;">
            ${CPAPrimitives.getItemSVG(spec.itemType || "daisy", isTarget ? "secondary" : "primary", spec.total > 7 ? 30 : 34)}
            <span style="font-size:11px;font-weight:800;color:#2E6F40;">${subLabel}</span>
          </div>`;
        }
        html = `<div style="display:flex;flex-direction:column;align-items:center;gap:6px;">
          <div style="font-size:13px;font-weight:800;color:#2E6F40;">Start Counting From Left →</div>
          <div style="display:flex;flex-wrap:wrap;gap:6px;justify-content:center;">${cells}</div>
        </div>`;
        break;
      }

      case "shapes": {
        if (spec.mode === "position") {
          const itemA = CPAPrimitives.getItemSVG(spec.topItem || "ladybug", "primary", 46);
          const itemB = CPAPrimitives.renderShapeSVG(spec.baseShape || "cube", 74, false);
          if (spec.relation === "above") {
            html = `<div style="display:flex;flex-direction:column;align-items:center;gap:4px;">
              <div>${itemA}</div>
              <div>${itemB}</div>
            </div>`;
          } else if (spec.relation === "below") {
            html = `<div style="display:flex;flex-direction:column;align-items:center;gap:4px;">
              <div>${itemB}</div>
              <div>${itemA}</div>
            </div>`;
          } else {
            html = `<div style="display:flex;align-items:center;gap:14px;">
              <div>${itemB}</div>
              <div>${itemA}</div>
            </div>`;
          }
        } else if (spec.mode === "combine") {
          if (spec.combo === "two-squares") {
            html = `<svg width="180" height="110" viewBox="0 0 180 110" role="img" aria-label="Two squares side by side">
              <rect x="20" y="20" width="70" height="70" fill="#67A66F" stroke="#204A26" stroke-width="3"/>
              <rect x="90" y="20" width="70" height="70" fill="#82C289" stroke="#204A26" stroke-width="3"/>
              <line x1="90" y1="20" x2="90" y2="90" stroke="#FAF6EC" stroke-width="2.5" stroke-dasharray="4,3"/>
            </svg>`;
          } else {
            html = `<svg width="140" height="110" viewBox="0 0 140 110" role="img" aria-label="Two triangles forming a square">
              <polygon points="25,15 115,15 25,95" fill="#67A66F" stroke="#204A26" stroke-width="3" stroke-linejoin="round"/>
              <polygon points="115,15 115,95 25,95" fill="#82C289" stroke="#204A26" stroke-width="3" stroke-linejoin="round"/>
            </svg>`;
          }
        } else {
          html = CPAPrimitives.renderShapeSVG(spec.shapeKey || "triangle", 126, !!spec.showVertices);
        }
        break;
      }

      case "pattern-row": {
        const items = spec.tokens.map((tok) => {
          const g = tok.shapeKey
            ? CPAPrimitives.renderShapeSVG(tok.shapeKey, 48, false)
            : CPAPrimitives.getItemSVG(tok.itemType, tok.variant || "primary", 44);
          return `<div class="pat-cell" style="width:62px;height:62px;border:2px solid #9CB894;border-radius:12px;background:#F7FBF4;display:flex;align-items:center;justify-content:center;">${g}</div>`;
        }).join("");
        const qBox = spec.showQuestion !== false
          ? `<div class="pat-cell-q" style="width:62px;height:62px;border:2.5px dashed #D99B26;border-radius:12px;background:#FFF8E2;display:flex;align-items:center;justify-content:center;font-size:24px;font-weight:800;color:#B05E14;">?</div>`
          : "";
        html = `<div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;justify-content:center;">${items}${qBox}</div>`;
        break;
      }

      case "pan-balance": {
        html = CPAPrimitives.renderPanBalanceSVG(
          spec.leftItem || "apple",
          spec.leftWeight,
          spec.rightItem || "berry",
          spec.rightWeight,
          spec.leftLabel || "",
          spec.rightLabel || ""
        );
        break;
      }

      case "length-compare": {
        const makeBar = (label, len, color, border) => {
          let blocks = "";
          for (let i = 0; i < len; i++) {
            blocks += `<div class="len-unit-block" style="width:36px;height:30px;border:2px solid ${border};background:${color};border-radius:6px;"></div>`;
          }
          return `<div style="display:flex;align-items:center;gap:10px;">
            <span style="width:88px;text-align:right;font-weight:800;font-size:14px;color:#2A4B30;">${label}</span>
            <div style="display:flex;gap:3px;">${blocks}</div>
          </div>`;
        };
        html = `<div style="display:flex;flex-direction:column;gap:12px;align-items:flex-start;background:#F6FAF3;padding:14px 18px;border-radius:14px;border:2px solid #9BB892;">
          ${makeBar(spec.labelA || "Top", spec.lenA, "#83C47C", "#2E6F40")}
          ${spec.labelB ? makeBar(spec.labelB, spec.lenB, "#F2C36B", "#9D6517") : ""}
        </div>`;
        break;
      }

      case "height-compare": {
        const renderTree = (label, heightUnits, trunkColor, crownColor) => {
          const hPx = Math.max(36, heightUnits * 18);
          const yTop = 122 - hPx;
          return `<div style="display:flex;flex-direction:column;align-items:center;gap:4px;">
            <svg width="90" height="132" viewBox="0 0 90 132" aria-label="${label}">
              <line x1="8" y1="124" x2="82" y2="124" stroke="#6E5233" stroke-width="3" stroke-linecap="round"/>
              <rect x="39" y="${yTop + 20}" width="12" height="${Math.max(16, hPx - 20)}" rx="3" fill="${trunkColor}" stroke="#4A2E16" stroke-width="2"/>
              <ellipse cx="45" cy="${yTop + 18}" rx="26" ry="20" fill="${crownColor}" stroke="#204A26" stroke-width="2.4"/>
            </svg>
            <span style="font-size:13px;font-weight:800;color:#2A4B30;">${label}</span>
          </div>`;
        };
        html = `<div style="display:flex;gap:32px;align-items:flex-end;justify-content:center;background:#F6FAF3;padding:12px 22px;border-radius:14px;border:2px solid #9BB892;">
          ${renderTree(spec.labelA || "Pine", spec.heightA, "#8C5B32", "#4D8B4F")}
          ${renderTree(spec.labelB || "Oak", spec.heightB, "#7A4C26", "#7AB85E")}
        </div>`;
        break;
      }

      case "capacity-jars": {
        const renderContainer = (label, fillPct, color) => {
          const isLarge = fillPct >= 55;
          if (isLarge) {
            return `<div style="display:flex;flex-direction:column;align-items:center;gap:4px;">
              <svg width="112" height="122" viewBox="0 0 112 122" aria-label="${label}">
                <path d="M84 36 C100 36 100 72 84 72" fill="none" stroke="#3B5B6B" stroke-width="4" stroke-linecap="round"/>
                <rect x="20" y="18" width="64" height="90" rx="12" fill="#F8FCFF" stroke="#3B5B6B" stroke-width="3"/>
                <rect x="23" y="28" width="58" height="77" rx="8" fill="${color}" opacity="0.72"/>
                <rect x="28" y="10" width="48" height="8" rx="3" fill="#B58E5A" stroke="#5E3719" stroke-width="2"/>
              </svg>
              <span style="font-size:14px;font-weight:800;color:#243E4D;">${label}</span>
            </div>`;
          }
          return `<div style="display:flex;flex-direction:column;align-items:center;gap:4px;">
            <svg width="90" height="122" viewBox="0 0 90 122" aria-label="${label}">
              <rect x="24" y="62" width="42" height="46" rx="8" fill="#F8FCFF" stroke="#3B5B6B" stroke-width="3"/>
              <rect x="27" y="68" width="36" height="37" rx="5" fill="${color}" opacity="0.72"/>
              <rect x="30" y="56" width="30" height="6" rx="2.5" fill="#B58E5A" stroke="#5E3719" stroke-width="1.8"/>
            </svg>
            <span style="font-size:14px;font-weight:800;color:#243E4D;">${label}</span>
          </div>`;
        };
        html = `<div style="display:flex;gap:28px;align-items:flex-end;justify-content:center;">
          ${renderContainer(spec.leftLabel || "Jar A", spec.leftFill, "#66B2D6")}
          ${renderContainer(spec.rightLabel || "Jar B", spec.rightFill, "#5EA88A")}
        </div>`;
        break;
      }

      case "left-right": {
        const leftSVG = spec.leftShape
          ? CPAPrimitives.renderShapeSVG(spec.leftShape, 56, false)
          : CPAPrimitives.getItemSVG(spec.leftItem || "acorn", "primary", 52);
        const rightSVG = spec.rightShape
          ? CPAPrimitives.renderShapeSVG(spec.rightShape, 56, false)
          : CPAPrimitives.getItemSVG(spec.rightItem || "berry", "primary", 52);
        html = `<div style="display:flex;align-items:center;justify-content:center;gap:28px;background:#F6FAF3;padding:14px 24px;border-radius:14px;border:2px solid #9BB892;">
          <div style="display:flex;flex-direction:column;align-items:center;gap:4px;">
            ${leftSVG}
            ${spec.showSideLabels ? `<span style="font-size:12px;font-weight:800;color:#2E6F40;">← Left</span>` : ""}
          </div>
          <div style="display:flex;flex-direction:column;align-items:center;gap:2px;">
            ${this.getPipTokenSVG(52)}
            <span style="font-size:11px;font-weight:800;color:#6E4A2C;">Pip</span>
          </div>
          <div style="display:flex;flex-direction:column;align-items:center;gap:4px;">
            ${rightSVG}
            ${spec.showSideLabels ? `<span style="font-size:12px;font-weight:800;color:#2E6F40;">Right →</span>` : ""}
          </div>
        </div>`;
        break;
      }

      case "sort-count-groups": {
        const cells = (spec.items || []).map((it) =>
          `<div style="width:44px;height:44px;display:flex;align-items:center;justify-content:center;">${CPAPrimitives.getItemSVG(it.itemType, it.variant || "primary", 36)}</div>`
        ).join("");
        html = `<div style="display:grid;grid-template-columns:repeat(4,46px);gap:6px;padding:12px 16px;background:#F6FAF3;border:2.5px solid #9BB892;border-radius:14px;">${cells}</div>`;
        break;
      }

      case "scattered-group": {
        const coords = [
          [52, 42], [134, 34], [218, 48], [94, 88], [176, 92],
          [258, 82], [46, 134], [136, 140], [224, 136], [282, 40]
        ];
        let icons = "";
        const n = Math.max(0, Math.min(10, spec.count || 0));
        for (let i = 0; i < n; i++) {
          const [cx, cy] = coords[(i * 3 + (spec.seed || 0)) % coords.length];
          icons += `<g transform="translate(${cx - 18}, ${cy - 18})">${CPAPrimitives.getItemSVG(spec.itemType || "acorn", spec.variant || "primary", 36)}</g>`;
        }
        html = `<svg width="320" height="170" viewBox="0 0 320 170" style="background:#F6FAF3;border:2.5px solid #9BB892;border-radius:14px;" role="img" aria-label="Garden patch with ${n} items">
          <ellipse cx="160" cy="86" rx="136" ry="68" fill="#EBF4E5" stroke="#C5D8BC" stroke-width="2" stroke-dasharray="5,4"/>
          ${icons}
        </svg>`;
        break;
      }

      case "picture-graph": {
        const rows = (spec.rows || []).map((r) => {
          let rowIcons = "";
          for (let i = 0; i < r.count; i++) {
            rowIcons += `<div style="width:36px;height:36px;display:flex;align-items:center;justify-content:center;border:1.5px solid #C7D8C0;border-radius:6px;background:#FFFFFF;">${CPAPrimitives.getItemSVG(r.itemType, r.variant || "primary", 28)}</div>`;
          }
          return `<div style="display:flex;align-items:center;gap:10px;">
            <span style="width:78px;text-align:right;font-size:13px;font-weight:800;color:#2A4B30;">${r.label}</span>
            <div style="display:flex;gap:4px;">${rowIcons}</div>
          </div>`;
        }).join("");
        html = `<div style="display:flex;flex-direction:column;gap:8px;background:#F6FAF3;padding:12px 18px;border-radius:14px;border:2.5px solid #9BB892;">${rows}</div>`;
        break;
      }

      case "number-compare": {
        if (spec.mode === "order") {
          const stones = (spec.stones || []).map((val) => {
            const isQ = val === "?";
            return `<div style="width:62px;height:62px;border-radius:12px;border:2.5px solid ${isQ ? "#D99B26" : "#2E6F40"};background:${isQ ? "#FFF3D1" : "#FFFFFF"};display:flex;align-items:center;justify-content:center;font-size:24px;font-weight:800;color:${isQ ? "#B05E14" : "#233322"};">${val}</div>`;
          }).join("");
          html = `<div style="display:flex;gap:10px;align-items:center;justify-content:center;">${stones}</div>`;
        } else if (spec.mode === "word") {
          html = `<div style="padding:18px 34px;border-radius:14px;border:3px solid #2E6F40;background:#FFFDF7;font-size:32px;font-weight:800;color:#1F3D24;letter-spacing:0.03em;">“${spec.word}”</div>`;
        } else {
          html = `<div style="display:flex;align-items:center;gap:22px;">
            <div style="width:82px;height:82px;border-radius:14px;border:3px solid #2E6F40;background:#F4F9F2;display:flex;align-items:center;justify-content:center;font-size:34px;font-weight:800;color:#1E3F24;">${spec.numA}</div>
            <span style="font-size:20px;font-weight:800;color:#7A6242;">or</span>
            <div style="width:82px;height:82px;border-radius:14px;border:3px solid #A85B1C;background:#FFF8EB;display:flex;align-items:center;justify-content:center;font-size:34px;font-weight:800;color:#6E3810;">${spec.numB}</div>
          </div>`;
        }
        break;
      }

      case "compare-match": {
        html = CPAPrimitives.renderCompareMatchHTML(
          spec.topCount,
          spec.bottomCount,
          spec.topItem || "acorn",
          spec.bottomItem || "leaf",
          spec.showLines !== false
        );
        break;
      }

      case "number-bond": {
        html = CPAPrimitives.renderNumberBondSVG(
          spec.whole,
          spec.partA,
          spec.partB,
          spec.missing || "none",
          spec.showDots !== false
        );
        break;
      }

      case "count-path": {
        html = CPAPrimitives.renderNumberPathSVG(spec.start, spec.jump, spec.direction || "forward", {
          revealEnd: !!spec.revealEnd
        });
        break;
      }

      case "story-scene": {
        const makeBasket = (count, item, label) => {
          let icons = "";
          for (let i = 0; i < count; i++) {
            icons += CPAPrimitives.getItemSVG(item, "primary", 28);
          }
          return `<div style="display:flex;flex-direction:column;align-items:center;gap:4px;padding:10px 14px;border:2.5px solid #9BB892;border-radius:14px;background:#F6FAF3;min-width:110px;">
            <div style="display:flex;flex-wrap:wrap;gap:3px;max-width:155px;justify-content:center;">${icons}</div>
            <span style="font-size:12px;font-weight:800;color:#2E6F40;">${label}</span>
          </div>`;
        };
        html = `<div style="display:flex;align-items:center;gap:14px;justify-content:center;">
          ${makeBasket(spec.countA, spec.itemA || "honeyjar", spec.labelA || "First")}
          <div style="font-size:22px;font-weight:800;color:#8C5B12;">→</div>
          ${makeBasket(spec.countB, spec.itemB || spec.itemA || "honeyjar", spec.labelB || "Story")}
        </div>`;
        break;
      }

      case "tens-ones-100": {
        let bundles = "";
        for (let t = 0; t < spec.tens; t++) {
          bundles += `<div class="k-ten-basket" style="padding:6px 8px;border:2.5px solid #2E6F40;background:#E8F4E5;border-radius:12px;display:flex;flex-direction:column;align-items:center;gap:2px;">
            <div style="display:grid;grid-template-columns:repeat(2,14px);gap:2px;">
              ${Array(10).fill('<span style="width:12px;height:12px;border-radius:50%;background:#B0682A;border:1px solid #4D2E14;display:block;"></span>').join("")}
            </div>
            <span style="font-size:11px;font-weight:800;color:#1E4C2B;">10</span>
          </div>`;
        }
        let onesHTML = "";
        for (let o = 0; o < spec.ones; o++) {
          onesHTML += `<div class="k-loose-one" style="display:inline-flex;">${CPAPrimitives.getItemSVG("acorn", "secondary", 26)}</div>`;
        }
        html = `<div style="display:flex;flex-wrap:wrap;gap:10px;align-items:center;justify-content:center;">
          ${bundles}
          ${spec.ones > 0 ? `<div style="display:flex;flex-wrap:wrap;gap:4px;max-width:160px;padding:6px 8px;border:2px dashed #C08B48;border-radius:12px;background:#FFF9EE;">${onesHTML}</div>` : ""}
        </div>`;
        break;
      }

      case "skip-count-5s": {
        let bundles = "";
        for (let g = 0; g < spec.groups; g++) {
          bundles += `<div class="k-five-bundle" style="padding:7px 9px;border:2.5px solid #A85B1C;background:#FFF7E8;border-radius:12px;display:flex;flex-direction:column;align-items:center;gap:3px;">
            <div style="display:flex;flex-wrap:wrap;gap:2px;width:44px;justify-content:center;">
              ${Array(5).fill('<span style="width:12px;height:12px;border-radius:50%;background:#C43C48;border:1px solid #6E1C24;display:block;"></span>').join("")}
            </div>
            <span style="font-size:11px;font-weight:800;color:#7A3F10;">5</span>
          </div>`;
        }
        html = `<div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;justify-content:center;max-width:460px;">${bundles}</div>`;
        break;
      }

      case "daily-routine": {
        const phase = spec.phase || "morning";
        if (phase === "morning") {
          html = `<svg width="240" height="136" viewBox="0 0 240 136" role="img" aria-label="Morning sunrise scene">
            <rect width="240" height="136" rx="14" fill="#FDE8B4" stroke="#C99124" stroke-width="3"/>
            <circle cx="120" cy="84" r="30" fill="#F4B23A"/>
            <path d="M0 90 Q70 72 140 88 T240 82 L240 136 L0 136 Z" fill="#5D9955"/>
            <text x="120" y="28" text-anchor="middle" font-size="14" font-weight="800" fill="#7A4810">SUNRISE · BREAKFAST</text>
          </svg>`;
        } else if (phase === "afternoon") {
          html = `<svg width="240" height="136" viewBox="0 0 240 136" role="img" aria-label="Afternoon sunny sky">
            <rect width="240" height="136" rx="14" fill="#CBEAF8" stroke="#4D809E" stroke-width="3"/>
            <circle cx="176" cy="44" r="22" fill="#F4C844"/>
            <path d="M0 98 Q80 82 160 96 T240 90 L240 136 L0 136 Z" fill="#4D8B4F"/>
            <text x="92" y="34" text-anchor="middle" font-size="14" font-weight="800" fill="#23485E">MIDDAY SUN · PLAY</text>
          </svg>`;
        } else {
          html = `<svg width="240" height="136" viewBox="0 0 240 136" role="img" aria-label="Night sky with moon and stars">
            <rect width="240" height="136" rx="14" fill="#20324D" stroke="#8F6E2E" stroke-width="3"/>
            <circle cx="178" cy="44" r="18" fill="#F8E7A2"/>
            <circle cx="185" cy="39" r="15" fill="#20324D"/>
            <circle cx="52" cy="34" r="2.8" fill="#FFF6C4"/><circle cx="94" cy="24" r="2.4" fill="#FFF6C4"/><circle cx="136" cy="52" r="2.6" fill="#FFF6C4"/>
            <path d="M0 100 Q80 88 160 98 T240 92 L240 136 L0 136 Z" fill="#1F3E28"/>
            <text x="96" y="74" text-anchor="middle" font-size="14" font-weight="800" fill="#F8E7A2">MOON &amp; BEDTIME</text>
          </svg>`;
        }
        break;
      }

      case "clock-hour": {
        const badge = spec.skyPhase
          ? `<div style="font-size:11.5px;font-weight:800;letter-spacing:0.04em;text-transform:uppercase;color:#2E6F40;background:#EDF6EA;padding:4px 12px;border-radius:6px;border:1.5px solid #9CB894;">${spec.skyPhase}</div>`
          : "";
        html = `<div style="display:flex;flex-direction:column;align-items:center;gap:8px;">${badge}${CPAPrimitives.renderClockHTML(spec.hour, spec.minutes || 0)}</div>`;
        break;
      }

      case "coins": {
        html = CPAPrimitives.renderCoinsHTML(spec.coins || [1], {
          showLabels: spec.showLabels !== false
        });
        break;
      }

      default:
        html = CPAPrimitives.renderFiveFrameHTML(3, "acorn");
    }

    container.innerHTML = html;
  }
};

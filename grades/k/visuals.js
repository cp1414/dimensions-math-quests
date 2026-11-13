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
        html = CPAPrimitives.renderDoubleTenFrameHTML(spec.count, spec.itemType || "acorn");
        break;
      }

      case "ordinal-line": {
        let cells = "";
        for (let i = 1; i <= spec.total; i++) {
          const isTarget = i === spec.targetIndex;
          const bg = isTarget ? "#FFF0C2" : "#F6FAF3";
          const border = isTarget ? "#D99B26" : "#9CB894";
          cells += `<div class="ordinal-slot" style="width:58px;padding:6px 4px;border:2.5px solid ${border};background:${bg};border-radius:12px;display:flex;flex-direction:column;align-items:center;gap:2px;">
            ${CPAPrimitives.getItemSVG(spec.itemType || "daisy", isTarget ? "secondary" : "primary", 34)}
            <span style="font-size:11px;font-weight:800;color:#2E6F40;">${isTarget ? "?" : i}</span>
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
            blocks += `<div class="len-unit-block" style="width:40px;height:32px;border:2px solid ${border};background:${color};border-radius:6px;"></div>`;
          }
          return `<div style="display:flex;align-items:center;gap:10px;">
            <span style="width:82px;text-align:right;font-weight:800;font-size:14px;color:#2A4B30;">${label}</span>
            <div style="display:flex;gap:3px;">${blocks}</div>
          </div>`;
        };
        html = `<div style="display:flex;flex-direction:column;gap:12px;align-items:flex-start;background:#F6FAF3;padding:14px 18px;border-radius:14px;border:2px solid #9BB892;">
          ${makeBar(spec.labelA || "Top", spec.lenA, "#83C47C", "#2E6F40")}
          ${makeBar(spec.labelB || "Bottom", spec.lenB, "#F2C36B", "#9D6517")}
        </div>`;
        break;
      }

      case "capacity-jars": {
        const renderJar = (label, fillPct, color) => {
          const waterH = Math.round((fillPct / 100) * 76);
          const waterY = 96 - waterH;
          return `<div style="display:flex;flex-direction:column;align-items:center;gap:4px;">
            <svg width="96" height="112" viewBox="0 0 96 112" aria-label="${label}">
              <rect x="20" y="18" width="56" height="80" rx="10" fill="#F8FCFF" stroke="#3B5B6B" stroke-width="3"/>
              <rect x="22" y="${waterY}" width="52" height="${waterH}" rx="6" fill="${color}" opacity="0.75"/>
              <rect x="28" y="10" width="40" height="8" rx="3" fill="#B58E5A" stroke="#5E3719" stroke-width="2"/>
            </svg>
            <span style="font-size:14px;font-weight:800;color:#243E4D;">${label}</span>
          </div>`;
        };
        html = `<div style="display:flex;gap:28px;align-items:flex-end;justify-content:center;">
          ${renderJar(spec.leftLabel || "Jar A", spec.leftFill, "#66B2D6")}
          ${renderJar(spec.rightLabel || "Jar B", spec.rightFill, "#5EA88A")}
        </div>`;
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
        html = CPAPrimitives.renderNumberPathSVG(spec.start, spec.jump, spec.direction || "forward");
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

      case "clock-hour": {
        const badge = spec.skyPhase
          ? `<div style="font-size:13px;font-weight:800;color:#2E6F40;background:#EDF6EA;padding:4px 12px;border-radius:999px;border:1.5px solid #9CB894;">${spec.skyPhase}</div>`
          : "";
        html = `<div style="display:flex;flex-direction:column;align-items:center;gap:8px;">${badge}${CPAPrimitives.renderClockHTML(spec.hour, spec.minutes || 0)}</div>`;
        break;
      }

      case "coins": {
        html = CPAPrimitives.renderCoinsHTML(spec.coins || [1]);
        break;
      }

      default:
        html = CPAPrimitives.renderFiveFrameHTML(3, "acorn");
    }

    container.innerHTML = html;
  }
};

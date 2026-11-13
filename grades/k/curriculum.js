// ============================================================================
// PIP'S MEADOW & THE FOUR SEASONS GARDEN — COMPLETE KINDERGARTEN CURRICULUM
// 14 Core Kindergarten Visual & Mental Math Units + 3 Seasonal Celebrations
// (17 Total Garden Walks — Complete Semester A & Semester B Scope)
// ============================================================================

const GARDEN_RANKS = [
  { minWalks: 0,  title: "Sprout Seeker", iconKey: "leaf" },
  { minWalks: 3,  title: "Autumn Gatherer", iconKey: "acorn" },
  { minWalks: 6,  title: "Winter Hearth Helper", iconKey: "pinecone" },
  { minWalks: 10, title: "Spring Blossom Friend", iconKey: "daisy" },
  { minWalks: 14, title: "Meadow Keeper", iconKey: "honeyjar" },
  { minWalks: 17, title: "Four Seasons Master (Kindergarten)", iconKey: "seal" }
];

const OWL_PRAISE = [
  "Hoo-hoo! Wonderful spotting, little Pip!",
  "Gentle and bright! You saw the pattern clearly.",
  "Splendid work! Every piece fits in its proper place.",
  "Bravo, little Gardener! Your eyes are sharp as an owl’s.",
  "Joyful counting! Let us take one more step along the path."
];

const OWL_ENCOURAGE = [
  "Take a calm breath, little Pip, and look closely at the picture.",
  "No hurry in the garden! Let us count each one gently together.",
  "Look with fresh eyes—point to each piece one by one."
];

function kRandInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function kPick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function makeNumericChoices(answer, minVal, maxVal) {
  const set = new Set([answer]);
  let guard = 0;
  while (set.size < 4 && guard < 80) {
    guard++;
    const delta = kPick([-3, -2, -1, 1, 2, 3]);
    const cand = answer + delta;
    if (cand >= minVal && cand <= maxVal) set.add(cand);
  }
  let fallback = minVal;
  while (set.size < 4) {
    if (!set.has(fallback)) set.add(fallback);
    fallback++;
  }
  return Array.from(set).sort((a, b) => a - b);
}

function makeWordChoices(answer, pool) {
  const set = new Set([answer]);
  const shuffled = pool.slice().sort(() => Math.random() - 0.5);
  for (let i = 0; i < shuffled.length && set.size < 4; i++) {
    set.add(shuffled[i]);
  }
  return Array.from(set);
}

const GARDEN_NODES = [
  // ==================== SEASON I: AUTUMN HARVEST (SEMESTER A · UNITS 1–3) ====================
  {
    id: 1,
    season: "Season I · Autumn Harvest",
    unitTag: "Semester A · Unit 1",
    title: "1. The Leaf-Sorting Hollow",
    shortName: "Sort & Match",
    desc: "Notice what is the same, what is different, and sort autumn treasures.",
    iconKey: "leaf",
    tabletopTool: "shapespat",
    isMilestone: false,
    mapPos: { x: 9, y: 68 },
    teacherGuide: {
      script: "Ask: 'Which three belong together? Why does that one look different?' Let your child name the rule (shape, color, or kind) in their own words.",
      wonder: "God arranged leaves, seeds, and creatures by their kinds—sorting trains young eyes to notice order and beauty. Living Book pairing: Anno's Counting Book.",
      heuristic: "Classification by a single attribute (color, kind, or shape) prepares the mind for grouping sets and data later on.",
      handsOn: "Set out 3 acorns and 1 button (or 3 spoons and 1 fork) on the table. Ask your child which one does not belong and why."
    },
    learnSteps: [
      {
        stageLabel: "Concrete · Step 1 of 3",
        narrative: "Three green oak leaves belong together—one golden acorn is from a different group!",
        equationHTML: "Same &amp; Different",
        visualSpec: {
          type: "sort-odd-one",
          oddIndex: 2,
          cards: [
            { label: "A", itemType: "leaf", variant: "primary" },
            { label: "B", itemType: "leaf", variant: "primary" },
            { label: "C", itemType: "acorn", variant: "primary" },
            { label: "D", itemType: "leaf", variant: "primary" }
          ]
        }
      },
      {
        stageLabel: "Pictorial · Step 2 of 3",
        narrative: "Sometimes things are the same kind, yet one has a different color! Look closely at the berries.",
        equationHTML: "Sort by Color",
        visualSpec: {
          type: "sort-odd-one",
          oddIndex: 1,
          cards: [
            { label: "A", itemType: "berry", variant: "primary" },
            { label: "B", itemType: "berry", variant: "secondary" },
            { label: "C", itemType: "berry", variant: "primary" },
            { label: "D", itemType: "berry", variant: "primary" }
          ]
        },
        checkQuestion: {
          prompt: "Which card has the different berry?",
          choices: ["A", "B", "C", "D"],
          answer: "B"
        }
      },
      {
        stageLabel: "Abstract Rule · Step 3 of 3",
        narrative: "We can sort by kind, by color, or by shape! Spot the odd shape out to finish the lesson.",
        equationHTML: "Find the Rule",
        visualSpec: {
          type: "sort-odd-one",
          oddIndex: 3,
          cards: [
            { label: "A", shapeKey: "circle" },
            { label: "B", shapeKey: "circle" },
            { label: "C", shapeKey: "circle" },
            { label: "D", shapeKey: "triangle" }
          ]
        }
      }
    ],
    generateProblem(tier) {
      const labels = ["A", "B", "C", "D"];
      const oddIdx = kRandInt(0, 3);
      const mode = tier === 1 ? "kind" : tier === 2 ? kPick(["kind", "color"]) : kPick(["color", "shape"]);
      if (mode === "kind") {
        const mainItem = kPick(["acorn", "leaf", "daisy", "ladybug"]);
        const oddItem = mainItem === "acorn" ? "berry" : "acorn";
        const cards = labels.map((lbl, idx) => ({
          label: lbl,
          itemType: idx === oddIdx ? oddItem : mainItem,
          variant: "primary"
        }));
        return {
          story: `Three cards match, and one is different. Which card does NOT belong?`,
          equationHTML: `Odd One Out = ?`,
          solvedEquationHTML: `Card ${labels[oddIdx]} is different!`,
          answer: labels[oddIdx],
          choices: labels.slice(),
          visualSpec: { type: "sort-odd-one", cards, oddIndex: oddIdx }
        };
      } else if (mode === "color") {
        const item = kPick(["leaf", "berry", "apple"]);
        const cards = labels.map((lbl, idx) => ({
          label: lbl,
          itemType: item,
          variant: idx === oddIdx ? "secondary" : "primary"
        }));
        return {
          story: `Look at the colors carefully! Which card has a different color?`,
          equationHTML: `Different Color = ?`,
          solvedEquationHTML: `Card ${labels[oddIdx]} has a different color!`,
          answer: labels[oddIdx],
          choices: labels.slice(),
          visualSpec: { type: "sort-odd-one", cards, oddIndex: oddIdx }
        };
      }
      const mainShape = kPick(["circle", "square", "triangle"]);
      const oddShape = mainShape === "triangle" ? "square" : "triangle";
      const cards = labels.map((lbl, idx) => ({
        label: lbl,
        shapeKey: idx === oddIdx ? oddShape : mainShape
      }));
      return {
        story: `Sort by shape! Which card has a different shape from the others?`,
        equationHTML: `Different Shape = ?`,
        solvedEquationHTML: `Card ${labels[oddIdx]} is a ${oddShape}!`,
        answer: labels[oddIdx],
        choices: labels.slice(),
        visualSpec: { type: "sort-odd-one", cards, oddIndex: oddIdx }
      };
    }
  },

  {
    id: 2,
    season: "Season I · Autumn Harvest",
    unitTag: "Semester A · Unit 2",
    title: "2. Five Acorns for Pip",
    shortName: "Numbers 0–5",
    desc: "Count 0 to 5 with one-to-one touch and spot quantities instantly on a 5-frame.",
    iconKey: "acorn",
    tabletopTool: "frames",
    isMilestone: false,
    mapPos: { x: 16, y: 40 },
    teacherGuide: {
      script: "Ask: 'Can you tell how many acorns are in the tray without counting one-by-one?' Explain that zero means an empty tray.",
      wonder: "Seeing 3 or 4 instantly (subitizing) is a gift of human perception—just like recognizing a family member's face at a glance. Living Book: Mouse Count.",
      heuristic: "The 5-Frame anchors every early number to 5: 4 is simply 'one empty spot short of 5'!",
      handsOn: "Roll a die or flash 1–5 fingers for 2 seconds, then hide your hands and ask your child how many they saw."
    },
    learnSteps: [
      {
        stageLabel: "Concrete · Step 1 of 3",
        narrative: "Count each acorn in Pip’s 5-frame basket: 1, 2, 3!",
        equationHTML: "3 Acorns",
        visualSpec: { type: "five-frame", count: 3, itemType: "acorn" }
      },
      {
        stageLabel: "Pictorial · Step 2 of 3",
        narrative: "Notice how 4 leaves fill almost the whole 5-frame—just 1 empty box is left!",
        equationHTML: "4 Leaves (1 empty)",
        visualSpec: { type: "five-frame", count: 4, itemType: "leaf" },
        checkQuestion: {
          prompt: "How many acorns fill a FULL 5-frame?",
          choices: [3, 4, 5],
          answer: 5
        }
      },
      {
        stageLabel: "Zero Concept · Step 3 of 3",
        narrative: "When no acorns are inside the tray at all, we call that number ZERO (0).",
        equationHTML: "0 = Empty",
        visualSpec: { type: "five-frame", count: 0, itemType: "acorn" }
      }
    ],
    generateProblem(tier) {
      const item = kPick(["acorn", "leaf", "apple", "berry"]);
      const maxN = tier === 1 ? 3 : 5;
      const minN = tier === 3 ? 0 : 1;
      const count = kRandInt(minN, maxN);
      const plural = count === 1 ? item : item === "berry" ? "berries" : `${item}s`;
      return {
        story: `How many ${plural} are in the 5-frame tray?`,
        equationHTML: `How many? = ?`,
        solvedEquationHTML: `There are ${count} ${plural}!`,
        answer: count,
        choices: makeNumericChoices(count, 0, 5),
        visualSpec: { type: "five-frame", count, itemType: item }
      };
    }
  },

  {
    id: 3,
    season: "Season I · Autumn Harvest",
    unitTag: "Semester A · Unit 3",
    title: "3. Ten Berries & Garden Line",
    shortName: "Numbers 6–10 & Order",
    desc: "See 6 to 10 as '5 and some more' on a Ten-Frame, plus 1st to 10th position.",
    iconKey: "berry",
    tabletopTool: "frames",
    isMilestone: false,
    mapPos: { x: 23, y: 66 },
    teacherGuide: {
      script: "Point to the top row of 5 first: '5 on top and 2 on the bottom makes 7!' Also practice '1st, 2nd, 3rd...' from the left.",
      wonder: "Two hands of 5 fingers make 10—our own bodies carry a built-in ten-frame designed for orderly counting.",
      heuristic: "Seeing 6–10 as '5 + some more' eliminates slow 1-by-1 counting and builds instant fluency.",
      handsOn: "Line up 6 toy animals facing left. Ask which animal is 1st, 3rd, and 5th in line."
    },
    learnSteps: [
      {
        stageLabel: "Concrete · Step 1 of 3",
        narrative: "The top row holds 5 berries. Add 2 more below: 5 and 2 makes 7!",
        equationHTML: "5 and 2 make 7",
        visualSpec: { type: "ten-frame", count: 7, itemType: "berry", partA: 5 }
      },
      {
        stageLabel: "Pictorial · Step 2 of 3",
        narrative: "When both rows are full, we have 10!",
        equationHTML: "5 and 5 make 10",
        visualSpec: { type: "ten-frame", count: 10, itemType: "berry", partA: 5 },
        checkQuestion: {
          prompt: "5 on top and 3 below makes what number?",
          choices: [7, 8, 9],
          answer: 8
        }
      },
      {
        stageLabel: "Ordinal Order · Step 3 of 3",
        narrative: "Counting order from the left gives positions: 1st, 2nd, 3rd, 4th, 5th!",
        equationHTML: "1st · 2nd · 3rd · 4th · 5th",
        visualSpec: { type: "ordinal-line", total: 5, itemType: "daisy", targetIndex: 4 }
      }
    ],
    generateProblem(tier) {
      const useOrdinal = tier >= 2 && kRandInt(0, 2) === 0;
      if (useOrdinal) {
        const total = tier === 2 ? 5 : 8;
        const target = kRandInt(1, total);
        const ordNames = ["", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"];
        return {
          story: `Count from the left! Which position is the golden daisy?`,
          equationHTML: `Position = ?`,
          solvedEquationHTML: `It is in the ${ordNames[target]} spot!`,
          answer: ordNames[target],
          choices: makeWordChoices(ordNames[target], ordNames.slice(1, total + 1)),
          visualSpec: { type: "ordinal-line", total, itemType: "daisy", targetIndex: target }
        };
      }
      const item = kPick(["berry", "acorn", "apple"]);
      const count = tier === 1 ? kRandInt(6, 8) : kRandInt(6, 10);
      return {
        story: `Look at the top row of 5 and the extra ones below. How many in all?`,
        equationHTML: `5 and ${count - 5} = ?`,
        solvedEquationHTML: `5 and ${count - 5} = ${count}`,
        answer: count,
        choices: makeNumericChoices(count, 5, 10),
        visualSpec: { type: "ten-frame", count, itemType: item, partA: 5 }
      };
    }
  },

  // ==================== SEASON II: WINTER HEARTH (SEMESTER A · UNITS 4–5 + REVIEW) ====================
  {
    id: 4,
    season: "Season II · Winter Hearth",
    unitTag: "Semester A · Unit 4",
    title: "4. The Cozy Cottage Shapes",
    shortName: "Shapes & Patterns",
    desc: "Explore 2D flat shapes, 3D solids, spatial words, and repeating patterns.",
    iconKey: "shape",
    tabletopTool: "shapespat",
    isMilestone: false,
    mapPos: { x: 31, y: 35 },
    teacherGuide: {
      script: "Ask: 'How many straight sides and corners does this shape have?' For patterns, chant the pattern aloud together (leaf, acorn, leaf, acorn...) before choosing what comes next.",
      wonder: "Snowflakes have 6-sided hexagonal order, and honeycombs fit together with zero wasted space—geometry reveals quiet wisdom in nature. Living Book: The Greedy Triangle.",
      heuristic: "Naming attributes (corners, curved vs. flat faces) and chanting rhythmic AB/ABC patterns develops algebraic pattern sense.",
      handsOn: "Hunt around the room for a sphere (ball), cylinder (can), and cube (block), then lay out spoon-fork-spoon patterns."
    },
    learnSteps: [
      {
        stageLabel: "Flat Shapes · Step 1 of 3",
        narrative: "A triangle has 3 straight sides and 3 corners. Look at the golden corner dots!",
        equationHTML: "Triangle = 3 Corners",
        visualSpec: { type: "shapes", shapeKey: "triangle", showVertices: true }
      },
      {
        stageLabel: "3D Solids · Step 2 of 3",
        narrative: "Solid shapes aren’t flat—you can hold them! This is a cylinder, like a cozy log or soup can.",
        equationHTML: "3D Solid: Cylinder",
        visualSpec: { type: "shapes", shapeKey: "cylinder", showVertices: false },
        checkQuestion: {
          prompt: "How many corners does a circle have?",
          choices: [0, 3, 4],
          answer: 0
        }
      },
      {
        stageLabel: "Patterns · Step 3 of 3",
        narrative: "Patterns repeat in order! Acorn, leaf, acorn, leaf... what comes next?",
        equationHTML: "A – B – A – B – ?",
        visualSpec: {
          type: "pattern-row",
          tokens: [
            { itemType: "acorn" },
            { itemType: "leaf" },
            { itemType: "acorn" },
            { itemType: "leaf" }
          ]
        }
      }
    ],
    generateProblem(tier) {
      const mode = tier === 1 ? "flat" : tier === 2 ? kPick(["flat", "solid", "pattern"]) : kPick(["solid", "position", "pattern"]);
      if (mode === "flat") {
        const list = [
          { key: "circle", name: "Circle" },
          { key: "triangle", name: "Triangle" },
          { key: "square", name: "Square" },
          { key: "rectangle", name: "Rectangle" },
          { key: "hexagon", name: "Hexagon" }
        ];
        const chosen = kPick(list);
        return {
          story: `What is the name of this flat shape?`,
          equationHTML: `Shape Name = ?`,
          solvedEquationHTML: `It is a ${chosen.name}!`,
          answer: chosen.name,
          choices: makeWordChoices(chosen.name, list.map((x) => x.name)),
          visualSpec: { type: "shapes", shapeKey: chosen.key, showVertices: true }
        };
      }
      if (mode === "solid") {
        const list = [
          { key: "sphere", name: "Sphere" },
          { key: "cube", name: "Cube" },
          { key: "cylinder", name: "Cylinder" },
          { key: "cone", name: "Cone" }
        ];
        const chosen = kPick(list);
        return {
          story: `Which 3D solid shape is shown here?`,
          equationHTML: `3D Solid = ?`,
          solvedEquationHTML: `It is a ${chosen.name}!`,
          answer: chosen.name,
          choices: list.map((x) => x.name),
          visualSpec: { type: "shapes", shapeKey: chosen.key }
        };
      }
      if (mode === "position") {
        const rel = kPick(["above", "below", "beside"]);
        const labelMap = { above: "Above", below: "Below", beside: "Beside" };
        return {
          story: `Where is the little ladybug compared to the wooden cube?`,
          equationHTML: `Position = ?`,
          solvedEquationHTML: `The ladybug is ${rel} the cube!`,
          answer: labelMap[rel],
          choices: ["Above", "Below", "Beside", "Inside"],
          visualSpec: { type: "shapes", mode: "position", relation: rel, topItem: "ladybug", baseShape: "cube" }
        };
      }
      // Pattern mode
      const patterns = [
        { a: "acorn", b: "leaf", nameA: "Acorn", nameB: "Leaf", seq: ["a", "b", "a", "b"], ans: "Acorn" },
        { a: "berry", b: "daisy", nameA: "Berry", nameB: "Daisy", seq: ["a", "a", "b", "a", "a"], ans: "Daisy" },
        { a: "pinecone", b: "pebble", nameA: "Pinecone", nameB: "Pebble", seq: ["a", "b", "b", "a", "b"], ans: "Pebble" }
      ];
      const p = kPick(patterns);
      const tokens = p.seq.map((s) => ({ itemType: s === "a" ? p.a : p.b }));
      return {
        story: `Say the pattern aloud! What belongs in the ? spot next?`,
        equationHTML: `Next in Pattern = ?`,
        solvedEquationHTML: `${p.ans} comes next!`,
        answer: p.ans,
        choices: makeWordChoices(p.ans, [p.nameA, p.nameB, "Apple", "Ladybug"]),
        visualSpec: { type: "pattern-row", tokens, showQuestion: true }
      };
    }
  },

  {
    id: 5,
    season: "Season II · Winter Hearth",
    unitTag: "Semester A · Unit 5",
    title: "5. The Pinewood Balance Scale",
    shortName: "Length, Weight & Cup",
    desc: "Compare longer vs. shorter, heavier vs. lighter, and holds more vs. less.",
    iconKey: "scale",
    tabletopTool: "balance",
    isMilestone: false,
    mapPos: { x: 38, y: 63 },
    teacherGuide: {
      script: "Ask: 'Why did that side of the scale dip down?' Help your child notice that heavier things pull down, and longer bars stretch farther.",
      wonder: "Scripture speaks often of honest scales and true measures. Even at age 5, learning to compare fairly builds honest judgment. Living Book: Inch by Inch.",
      heuristic: "Before measuring with inches or pounds, Kindergarteners compare directly side-by-side (lining up ends at the same starting line!).",
      handsOn: "Hold a heavy mug in one hand and a feather or cotton ball in the other—act out a human balance scale!"
    },
    learnSteps: [
      {
        stageLabel: "Weight · Step 1 of 3",
        narrative: "When a pan goes DOWN on the balance scale, that side is HEAVIER. Look—the apple is heavier than the berry!",
        equationHTML: "Down = Heavier",
        visualSpec: { type: "pan-balance", leftItem: "apple", leftWeight: 6, rightItem: "berry", rightWeight: 2, leftLabel: "Apple", rightLabel: "Berry" }
      },
      {
        stageLabel: "Length · Step 2 of 3",
        narrative: "Line up both bars at the left edge. The green bar has more blocks, so it is LONGER!",
        equationHTML: "Longer vs. Shorter",
        visualSpec: { type: "length-compare", labelA: "Green Stick", lenA: 6, labelB: "Gold Twig", lenB: 3 },
        checkQuestion: {
          prompt: "Which stick is SHORTER?",
          choices: ["Green Stick", "Gold Twig"],
          answer: "Gold Twig"
        }
      },
      {
        stageLabel: "Capacity · Step 3 of 3",
        narrative: "Capacity means how much a jar can hold! Which pitcher holds MORE water?",
        equationHTML: "Holds More / Less",
        visualSpec: { type: "capacity-jars", leftLabel: "Blue Jar", leftFill: 80, rightLabel: "Green Jar", rightFill: 30 }
      }
    ],
    generateProblem(tier) {
      const mode = tier === 1 ? "weight" : kPick(["weight", "length", "capacity"]);
      if (mode === "weight") {
        const leftHeavy = kRandInt(0, 1) === 1;
        const askHeavy = kRandInt(0, 1) === 1;
        const pairs = [
          { a: "apple", nameA: "Apple", b: "berry", nameB: "Berry" },
          { a: "pinecone", nameA: "Pinecone", b: "leaf", nameB: "Leaf" },
          { a: "honeyjar", nameA: "Honey Jar", b: "daisy", nameB: "Daisy" }
        ];
        const pair = kPick(pairs);
        const lw = leftHeavy ? 7 : 2;
        const rw = leftHeavy ? 2 : 7;
        const heavierName = leftHeavy ? pair.nameA : pair.nameB;
        const lighterName = leftHeavy ? pair.nameB : pair.nameA;
        const ans = askHeavy ? heavierName : lighterName;
        return {
          story: `Look at the balance scale. Which one is ${askHeavy ? "HEAVIER" : "LIGHTER"}?`,
          equationHTML: `${askHeavy ? "Heavier" : "Lighter"} = ?`,
          solvedEquationHTML: `${ans} is ${askHeavy ? "heavier" : "lighter"}!`,
          answer: ans,
          choices: [pair.nameA, pair.nameB, "Both Equal", "Neither"],
          visualSpec: { type: "pan-balance", leftItem: pair.a, leftWeight: lw, rightItem: pair.b, rightWeight: rw, leftLabel: pair.nameA, rightLabel: pair.nameB }
        };
      }
      if (mode === "length") {
        const lenA = kRandInt(3, 8);
        let lenB = kRandInt(2, 8);
        if (lenB === lenA) lenB = lenA === 8 ? 5 : lenA + 2;
        const askLong = kRandInt(0, 1) === 1;
        const ans = askLong ? (lenA > lenB ? "Pine Stick" : "Oak Twig") : (lenA < lenB ? "Pine Stick" : "Oak Twig");
        return {
          story: `Compare the two sticks lined up together. Which one is ${askLong ? "LONGER" : "SHORTER"}?`,
          equationHTML: `${askLong ? "Longer" : "Shorter"} = ?`,
          solvedEquationHTML: `${ans} is ${askLong ? "longer" : "shorter"}!`,
          answer: ans,
          choices: ["Pine Stick", "Oak Twig", "Same Length", "Zero"],
          visualSpec: { type: "length-compare", labelA: "Pine Stick", lenA, labelB: "Oak Twig", lenB }
        };
      }
      const leftMore = kRandInt(0, 1) === 1;
      const askMore = kRandInt(0, 1) === 1;
      const lf = leftMore ? 85 : 25;
      const rf = leftMore ? 25 : 85;
      const ans = askMore ? (leftMore ? "Left Jar" : "Right Jar") : (leftMore ? "Right Jar" : "Left Jar");
      return {
        story: `Look at the water inside each jar. Which jar holds ${askMore ? "MORE" : "LESS"} water?`,
        equationHTML: `Holds ${askMore ? "More" : "Less"} = ?`,
        solvedEquationHTML: `${ans} holds ${askMore ? "more" : "less"}!`,
        answer: ans,
        choices: ["Left Jar", "Right Jar", "Same Amount", "Empty"],
        visualSpec: { type: "capacity-jars", leftLabel: "Left Jar", leftFill: lf, rightLabel: "Right Jar", rightFill: rf }
      };
    }
  },

  {
    id: 6,
    season: "Season II · Winter Hearth",
    unitTag: "Semester A · Celebration",
    title: "6. Winter Hearth Celebration",
    shortName: "Semester A Review",
    desc: "Celebrate everything from Autumn & Winter: Sorting, 0–10, Shapes, and Scales!",
    iconKey: "pinecone",
    tabletopTool: "frames",
    isMilestone: true,
    mapPos: { x: 45, y: 36 },
    teacherGuide: {
      script: "Celebrate! Remind your child how far they came—from sorting leaves to reading 10-frames, shapes, and scales.",
      wonder: "Reviewing past discoveries with gratitude echoes the joyful winter feast after the autumn harvest.",
      heuristic: "Spiraling back across sorting, subitizing, geometry, and measurement cements long-term number sense.",
      handsOn: "Brew warm cocoa or tea and play a quick 4-question 'Garden Treasure Hunt' around the living room."
    },
    learnSteps: [
      {
        stageLabel: "Review · Step 1 of 3",
        narrative: "Halfway through the seasons! Remember: 5 on top + 4 below = 9!",
        equationHTML: "5 + 4 = 9",
        visualSpec: { type: "ten-frame", count: 9, itemType: "pinecone", partA: 5 }
      },
      {
        stageLabel: "Review · Step 2 of 3",
        narrative: "A cube is a solid block with flat square faces.",
        equationHTML: "Solid: Cube",
        visualSpec: { type: "shapes", shapeKey: "cube" },
        checkQuestion: {
          prompt: "How many corners does a square have?",
          choices: [2, 3, 4],
          answer: 4
        }
      },
      {
        stageLabel: "Review · Step 3 of 3",
        narrative: "Ready for the Winter Hearth Celebration? Let us review Units 1 to 5 together!",
        equationHTML: "Semester A Complete!",
        visualSpec: { type: "five-frame", count: 5, itemType: "acorn" }
      }
    ],
    generateProblem(tier) {
      const kind = kPick(["frame", "shape", "balance"]);
      if (kind === "frame") {
        const n = tier === 1 ? kRandInt(2, 5) : kRandInt(5, 10);
        return {
          story: `Count the pinecones in the frame! How many are there?`,
          equationHTML: `Count = ?`,
          solvedEquationHTML: `There are ${n} pinecones!`,
          answer: n,
          choices: makeNumericChoices(n, 0, 10),
          visualSpec: n <= 5
            ? { type: "five-frame", count: n, itemType: "pinecone" }
            : { type: "ten-frame", count: n, itemType: "pinecone", partA: 5 }
        };
      }
      if (kind === "shape") {
        const s = kPick([
          { key: "triangle", name: "Triangle" },
          { key: "hexagon", name: "Hexagon" },
          { key: "cube", name: "Cube" },
          { key: "cone", name: "Cone" }
        ]);
        return {
          story: `Which shape is Pip looking at by the fire?`,
          equationHTML: `Shape = ?`,
          solvedEquationHTML: `It is a ${s.name}!`,
          answer: s.name,
          choices: ["Triangle", "Hexagon", "Cube", "Cone"],
          visualSpec: { type: "shapes", shapeKey: s.key }
        };
      }
      const lw = kPick([2, 8]);
      const rw = lw === 2 ? 8 : 2;
      const ans = lw > rw ? "Apple" : "Acorn";
      return {
        story: `Which side of the scale is HEAVIER?`,
        equationHTML: `Heavier = ?`,
        solvedEquationHTML: `${ans} is heavier!`,
        answer: ans,
        choices: ["Apple", "Acorn", "Both Equal", "Neither"],
        visualSpec: { type: "pan-balance", leftItem: "apple", leftWeight: lw, rightItem: "acorn", rightWeight: rw, leftLabel: "Apple", rightLabel: "Acorn" }
      };
    }
  },

  // ==================== SEASON III: SPRING BLOSSOM (SEMESTER B · UNITS 6–10 + REVIEW) ====================
  {
    id: 7,
    season: "Season III · Spring Blossom",
    unitTag: "Semester B · Unit 6",
    title: "7. Ladybugs & Daisies",
    shortName: "Compare Within 10",
    desc: "Compare sets using 1-to-1 matching: more, fewer, equal, and 1 more / 1 less.",
    iconKey: "ladybug",
    tabletopTool: "balance",
    isMilestone: false,
    mapPos: { x: 52, y: 65 },
    teacherGuide: {
      script: "Trace the dotted matching lines with a finger: 'Every ladybug has a daisy partner until here—look who has extras left over!'",
      wonder: "Matching partners one-to-one helps children see fairness and abundance without guessing. Living Book: How Many Snails?",
      heuristic: "Pairing two rows one-to-one makes 'how many more' and 'how many fewer' visually obvious before subtraction.",
      handsOn: "Set 5 spoons and 3 bowls on the table. Match each spoon to a bowl and ask which set has more and by how many."
    },
    learnSteps: [
      {
        stageLabel: "Concrete · Step 1 of 3",
        narrative: "Match each ladybug to a daisy below. Notice 2 extra ladybugs have no partner—there are MORE ladybugs!",
        equationHTML: "5 is more than 3",
        visualSpec: { type: "compare-match", topCount: 5, bottomCount: 3, topItem: "ladybug", bottomItem: "daisy" }
      },
      {
        stageLabel: "Pictorial · Step 2 of 3",
        narrative: "When every single item has a partner and none are left over, both sets are EQUAL!",
        equationHTML: "4 is equal to 4",
        visualSpec: { type: "compare-match", topCount: 4, bottomCount: 4, topItem: "ladybug", bottomItem: "daisy" },
        checkQuestion: {
          prompt: "Which number is 1 MORE than 6?",
          choices: [5, 7, 8],
          answer: 7
        }
      },
      {
        stageLabel: "1 More / 1 Less · Step 3 of 3",
        narrative: "6 ladybugs vs. 5 daisies: 6 is 1 MORE than 5, and 5 is 1 FEWER than 6!",
        equationHTML: "6 is 1 more than 5",
        visualSpec: { type: "compare-match", topCount: 6, bottomCount: 5, topItem: "ladybug", bottomItem: "daisy" }
      }
    ],
    generateProblem(tier) {
      const top = tier === 1 ? kRandInt(2, 5) : kRandInt(4, 9);
      let bot = kRandInt(1, tier === 1 ? 5 : 9);
      if (tier >= 2 && top === bot) bot = top > 2 ? top - 1 : top + 1;
      const askType = tier === 1 ? "whichMore" : kPick(["whichMore", "whichFewer", "howManyMore"]);

      if (askType === "howManyMore") {
        const diff = Math.abs(top - bot);
        return {
          story: `Match the ladybugs and daisies one-to-one. How many MORE are in the bigger row?`,
          equationHTML: `Difference = ?`,
          solvedEquationHTML: `${diff} more!`,
          answer: diff,
          choices: makeNumericChoices(diff, 0, 6),
          visualSpec: { type: "compare-match", topCount: top, bottomCount: bot, topItem: "ladybug", bottomItem: "daisy" }
        };
      }
      if (top === bot) {
        return {
          story: `Match the ladybugs and daisies. Which row has more, or are they equal?`,
          equationHTML: `${top} vs ${bot}`,
          solvedEquationHTML: `They are Equal (${top} = ${bot})!`,
          answer: "Equal",
          choices: ["Ladybugs", "Daisies", "Equal", "Zero"],
          visualSpec: { type: "compare-match", topCount: top, bottomCount: bot, topItem: "ladybug", bottomItem: "daisy" }
        };
      }
      const ans = askType === "whichMore"
        ? (top > bot ? "Ladybugs" : "Daisies")
        : (top < bot ? "Ladybugs" : "Daisies");
      return {
        story: `Look at the matching lines. Which group has ${askType === "whichMore" ? "MORE" : "FEWER"}?`,
        equationHTML: `${askType === "whichMore" ? "More" : "Fewer"} = ?`,
        solvedEquationHTML: `${ans} has ${askType === "whichMore" ? "more" : "fewer"}!`,
        answer: ans,
        choices: ["Ladybugs", "Daisies", "Equal", "Neither"],
        visualSpec: { type: "compare-match", topCount: top, bottomCount: bot, topItem: "ladybug", bottomItem: "daisy" }
      };
    }
  },

  {
    id: 8,
    season: "Season III · Spring Blossom",
    unitTag: "Semester B · Unit 7",
    title: "8. Sprouts Past Ten",
    shortName: "Numbers to 20",
    desc: "Build teen numbers 11 to 20 as '10 and some more' on double ten-frames.",
    iconKey: "daisy",
    tabletopTool: "frames",
    isMilestone: false,
    mapPos: { x: 57, y: 36 },
    teacherGuide: {
      script: "Say: 'Look—the first frame is already a full 10! So start counting from 10: ten... eleven, twelve, thirteen!'",
      wonder: "Teen numbers aren't random names—they are neatly organized groups of ten with extras beside them.",
      heuristic: "Never count all 14 from 1! Seeing 14 as '10 and 4 more' is the bedrock of place value.",
      handsOn: "Put 10 beans in a cup and 3 beans beside it. Ask: '10 and 3 makes...?' (13!)."
    },
    learnSteps: [
      {
        stageLabel: "Concrete · Step 1 of 3",
        narrative: "One full ten-frame is 10. Add 1 more acorn in the second frame: 10 and 1 makes 11!",
        equationHTML: "10 and 1 make 11",
        visualSpec: { type: "double-ten-frame", count: 11, itemType: "acorn" }
      },
      {
        stageLabel: "Pictorial · Step 2 of 3",
        narrative: "1 full ten-frame and 4 more makes 14! Don’t count from 1—start at 10!",
        equationHTML: "10 and 4 make 14",
        visualSpec: { type: "double-ten-frame", count: 14, itemType: "acorn" },
        checkQuestion: {
          prompt: "What number is 10 and 6 more?",
          choices: [15, 16, 17],
          answer: 16
        }
      },
      {
        stageLabel: "Twenty · Step 3 of 3",
        narrative: "Two full ten-frames together make 20! Two tens make twenty.",
        equationHTML: "10 and 10 make 20",
        visualSpec: { type: "double-ten-frame", count: 20, itemType: "acorn" }
      }
    ],
    generateProblem(tier) {
      const count = tier === 1 ? kRandInt(11, 15) : kRandInt(11, 20);
      const item = kPick(["acorn", "berry", "daisy"]);
      return {
        story: `The first frame has 10. Count the extra ones on the right—what number is this in all?`,
        equationHTML: `10 and ${count - 10} = ?`,
        solvedEquationHTML: `10 + ${count - 10} = ${count}`,
        answer: count,
        choices: makeNumericChoices(count, 10, 20),
        visualSpec: { type: "double-ten-frame", count, itemType: item }
      };
    }
  },

  {
    id: 9,
    season: "Season III · Spring Blossom",
    unitTag: "Semester B · Unit 8",
    title: "9. The Twin-Oak Number Bonds",
    shortName: "Number Bonds",
    desc: "Break a Whole into two Parts and bring two Parts back together (within 10).",
    iconKey: "numberbond",
    tabletopTool: "bonds",
    isMilestone: false,
    mapPos: { x: 63, y: 64 },
    teacherGuide: {
      script: "Use the words WHOLE and PART every time: 'The Whole is 7. One Part is 4. What is the other Part hiding in the oak?'",
      wonder: "Many parts joining into one harmonious whole—and one whole sharing into parts—is a pattern woven throughout all creation.",
      heuristic: "Number Bonds are the heart of mental math. Mastering bonds of 5, 6, 7, 8, 9, and 10 unlocks both addition and subtraction together.",
      handsOn: "Hide 6 pennies between your two hands. Open one hand showing 2 pennies and ask: 'How many are hiding in my other hand?'"
    },
    learnSteps: [
      {
        stageLabel: "Concrete · Step 1 of 3",
        narrative: "Two Parts join along the branches to make one Whole! 2 and 3 make 5.",
        equationHTML: "Part 2 + Part 3 = Whole 5",
        visualSpec: { type: "number-bond", whole: 5, partA: 2, partB: 3, missing: "none", showDots: true }
      },
      {
        stageLabel: "Missing Whole · Step 2 of 3",
        narrative: "Sometimes we know both Parts (4 and 3) and find the Whole at the top!",
        equationHTML: "4 and 3 make ?",
        visualSpec: { type: "number-bond", whole: 7, partA: 4, partB: 3, missing: "whole", showDots: true },
        checkQuestion: {
          prompt: "What Whole do Parts 4 and 3 make?",
          choices: [6, 7, 8],
          answer: 7
        }
      },
      {
        stageLabel: "Missing Part · Step 3 of 3",
        narrative: "And sometimes we know the Whole (10) and one Part (6). What Part makes 10?",
        equationHTML: "6 and ? make 10",
        visualSpec: { type: "number-bond", whole: 10, partA: 6, partB: 4, missing: "partB", showDots: true }
      }
    ],
    generateProblem(tier) {
      const whole = tier === 1 ? kRandInt(3, 5) : tier === 2 ? kRandInt(5, 8) : kRandInt(6, 10);
      const partA = kRandInt(1, whole - 1);
      const partB = whole - partA;
      const missing = tier === 1 ? "whole" : kPick(["whole", "partB"]);
      const showDots = tier < 3;
      if (missing === "whole") {
        return {
          story: `One part is ${partA} and the other part is ${partB}. What is the Whole?`,
          equationHTML: `${partA} and ${partB} make ?`,
          solvedEquationHTML: `${partA} and ${partB} make ${whole}!`,
          answer: whole,
          choices: makeNumericChoices(whole, 2, 10),
          visualSpec: { type: "number-bond", whole, partA, partB, missing: "whole", showDots }
        };
      }
      return {
        story: `The Whole is ${whole}, and one Part is ${partA}. What is the missing Part?`,
        equationHTML: `${partA} and ? make ${whole}`,
        solvedEquationHTML: `${partA} and ${partB} make ${whole}!`,
        answer: partB,
        choices: makeNumericChoices(partB, 0, 10),
        visualSpec: { type: "number-bond", whole, partA, partB, missing: "partB", showDots }
      };
    }
  },

  {
    id: 10,
    season: "Season III · Spring Blossom",
    unitTag: "Semester B · Unit 9",
    title: "10. Honeybees Gather Together",
    shortName: "Addition Within 10",
    desc: "Tell addition stories with + and =, and practice counting on.",
    iconKey: "honeyjar",
    tabletopTool: "addsub",
    isMilestone: false,
    mapPos: { x: 68, y: 35 },
    teacherGuide: {
      script: "Say: 'Plus (+) means putting parts together. Start with the bigger number and hop forward on the stones!'",
      wonder: "Watching bees gather nectar together into one golden hive shows cheerful cooperation.",
      heuristic: "Always start counting on from the LARGER addend (for 2 + 6, start at 6 and hop +2!).",
      handsOn: "Place 5 spoons on the table, cover them with a napkin, and set 2 more beside it. Say '5... 6, 7!' without peeking."
    },
    learnSteps: [
      {
        stageLabel: "Concrete · Step 1 of 3",
        narrative: "3 berries on top and 2 berries more join in the ten-frame! 3 + 2 = 5.",
        equationHTML: "3 + 2 = 5",
        visualSpec: { type: "ten-frame", count: 5, itemType: "berry", partA: 3 }
      },
      {
        stageLabel: "Counting On · Step 2 of 3",
        narrative: "Start at 5 on the stepping stones and hop forward 2 steps: 6, 7!",
        equationHTML: "5 + 2 = 7",
        visualSpec: { type: "count-path", start: 5, jump: 2, direction: "forward" },
        checkQuestion: {
          prompt: "Start at 6 and hop +2 forward. Where do you land?",
          choices: [7, 8, 9],
          answer: 8
        }
      },
      {
        stageLabel: "Abstract · Step 3 of 3",
        narrative: "The + sign joins parts, and = means 'is the same as'.",
        equationHTML: "4 + 4 = 8",
        visualSpec: { type: "ten-frame", count: 8, itemType: "honeyjar", partA: 4 }
      }
    ],
    generateProblem(tier) {
      if (tier >= 2 && kRandInt(0, 1) === 1) {
        const start = kRandInt(4, 7);
        const jump = kRandInt(1, Math.min(3, 10 - start));
        const total = start + jump;
        return {
          story: `Pip stands on stone ${start} and hops ${jump} steps forward. What is ${start} + ${jump}?`,
          equationHTML: `${start} + ${jump} = ?`,
          solvedEquationHTML: `${start} + ${jump} = ${total}`,
          answer: total,
          choices: makeNumericChoices(total, 2, 10),
          visualSpec: { type: "count-path", start, jump, direction: "forward" }
        };
      }
      const maxSum = tier === 1 ? 6 : 10;
      const a = kRandInt(1, maxSum - 1);
      const b = kRandInt(1, maxSum - a);
      const total = a + b;
      const item = kPick(["honeyjar", "berry", "daisy"]);
      return {
        story: `Pip gathers ${a} and then ${b} more. How many altogether?`,
        equationHTML: `${a} + ${b} = ?`,
        solvedEquationHTML: `${a} + ${b} = ${total}`,
        answer: total,
        choices: makeNumericChoices(total, 2, 10),
        visualSpec: { type: "ten-frame", count: total, itemType: item, partA: a }
      };
    }
  },

  {
    id: 11,
    season: "Season III · Spring Blossom",
    unitTag: "Semester B · Unit 10",
    title: "11. Crossing Out & Taking Away",
    shortName: "Subtraction Within 10",
    desc: "Subtract by crossing out, counting back, and finding the missing part.",
    iconKey: "apple",
    tabletopTool: "addsub",
    isMilestone: false,
    mapPos: { x: 73, y: 64 },
    teacherGuide: {
      script: "Read the equation as a story: 'We started with 7 apples, 2 were eaten (crossed out), how many are still left?'",
      wonder: "Taking away and sharing cleanly teaches that subtraction simply reveals the other part of a Number Bond.",
      heuristic: "Connect subtraction directly to Number Bonds: if 5 and 3 make 8, then 8 − 3 = 5!",
      handsOn: "Put 6 crackers on a plate. Eat 2 crackers and ask how many remain."
    },
    learnSteps: [
      {
        stageLabel: "Concrete · Step 1 of 3",
        narrative: "We had 6 apples and crossed out 2 that Pip ate. Count how many remain!",
        equationHTML: "6 − 2 = 4",
        visualSpec: { type: "ten-frame", count: 6, itemType: "apple", partA: 6, crossOut: 2 }
      },
      {
        stageLabel: "Counting Back · Step 2 of 3",
        narrative: "Start at 7 and hop backward 2 stones: 6, 5!",
        equationHTML: "7 − 2 = 5",
        visualSpec: { type: "count-path", start: 7, jump: 2, direction: "backward" },
        checkQuestion: {
          prompt: "There are 8 apples and 3 are crossed out. How many are left?",
          choices: [4, 5, 6],
          answer: 5
        }
      },
      {
        stageLabel: "Take Apart · Step 3 of 3",
        narrative: "Subtraction also finds a missing part in a Number Bond: 9 − 4 = 5.",
        equationHTML: "9 − 4 = 5",
        visualSpec: { type: "number-bond", whole: 9, partA: 4, partB: 5, missing: "partB", showDots: true }
      }
    ],
    generateProblem(tier) {
      if (tier >= 2 && kRandInt(0, 2) === 0) {
        const start = kRandInt(4, 9);
        const jump = kRandInt(1, Math.min(3, start - 1));
        const rem = start - jump;
        return {
          story: `Pip starts on stone ${start} and hops ${jump} steps back. What is ${start} − ${jump}?`,
          equationHTML: `${start} − ${jump} = ?`,
          solvedEquationHTML: `${start} − ${jump} = ${rem}`,
          answer: rem,
          choices: makeNumericChoices(rem, 0, 9),
          visualSpec: { type: "count-path", start, jump, direction: "backward" }
        };
      }
      const whole = tier === 1 ? kRandInt(3, 6) : kRandInt(5, 10);
      const take = kRandInt(1, whole - 1);
      const rem = whole - take;
      return {
        story: `There were ${whole} apples, and ${take} were crossed out. How many are left?`,
        equationHTML: `${whole} − ${take} = ?`,
        solvedEquationHTML: `${whole} − ${take} = ${rem}`,
        answer: rem,
        choices: makeNumericChoices(rem, 0, 9),
        visualSpec: { type: "ten-frame", count: whole, itemType: "apple", partA: whole, crossOut: take }
      };
    }
  },

  {
    id: 12,
    season: "Season III · Spring Blossom",
    unitTag: "Semester B · Celebration",
    title: "12. Spring Blossom Celebration",
    shortName: "Bonds & Facts Review",
    desc: "Show off teens, Number Bonds, addition, and subtraction within 10!",
    iconKey: "daisy",
    tabletopTool: "bonds",
    isMilestone: true,
    mapPos: { x: 77, y: 36 },
    teacherGuide: {
      script: "Celebrate your child's Spring mastery! Mix a quick Number Bond, teen frame, addition, and subtraction together.",
      wonder: "Spring blossoms open in order—first buds, then petals, then fruit. Learning follows gentle seasons too.",
      heuristic: "Fluency within 10 in Kindergarten makes Grade 1's Make-10 strategies feel joyful and natural.",
      handsOn: "Play 'Make 10 High Five'—you call a number (e.g., 7) and your child holds up the partner fingers (3) to make 10!"
    },
    learnSteps: [
      {
        stageLabel: "Review · Step 1 of 3",
        narrative: "Teens are 10 and some more! Here is 10 and 5 = 15.",
        equationHTML: "10 + 5 = 15",
        visualSpec: { type: "double-ten-frame", count: 15, itemType: "daisy" }
      },
      {
        stageLabel: "Review · Step 2 of 3",
        narrative: "Number Bonds connect + and −: if 4 and 6 make 10, then 10 − 4 = 6!",
        equationHTML: "4 + 6 = 10",
        visualSpec: { type: "number-bond", whole: 10, partA: 4, partB: 6, missing: "none", showDots: true },
        checkQuestion: {
          prompt: "If 3 and 7 make 10, what is 10 − 3?",
          choices: [6, 7, 8],
          answer: 7
        }
      },
      {
        stageLabel: "Review · Step 3 of 3",
        narrative: "Let us celebrate Spring across the meadow!",
        equationHTML: "Ready for Spring Review!",
        visualSpec: { type: "ten-frame", count: 10, itemType: "daisy", partA: 5 }
      }
    ],
    generateProblem(tier) {
      const kind = kPick(["bond", "add", "sub", "teen"]);
      if (kind === "teen") {
        const n = kRandInt(11, 18);
        return {
          story: `10 daisies on the left and ${n - 10} on the right. How many altogether?`,
          equationHTML: `10 + ${n - 10} = ?`,
          solvedEquationHTML: `10 + ${n - 10} = ${n}`,
          answer: n,
          choices: makeNumericChoices(n, 10, 20),
          visualSpec: { type: "double-ten-frame", count: n, itemType: "daisy" }
        };
      }
      if (kind === "bond") {
        const w = tier === 1 ? 6 : 10;
        const a = kRandInt(1, w - 1);
        const b = w - a;
        return {
          story: `The Whole is ${w} and one Part is ${a}. What is the missing Part?`,
          equationHTML: `${a} + ? = ${w}`,
          solvedEquationHTML: `${a} + ${b} = ${w}`,
          answer: b,
          choices: makeNumericChoices(b, 0, 10),
          visualSpec: { type: "number-bond", whole: w, partA: a, partB: b, missing: "partB", showDots: true }
        };
      }
      if (kind === "add") {
        const a = kRandInt(2, 6);
        const b = kRandInt(1, 10 - a);
        return {
          story: `${a} berries and ${b} more berries. How many altogether?`,
          equationHTML: `${a} + ${b} = ?`,
          solvedEquationHTML: `${a} + ${b} = ${a + b}`,
          answer: a + b,
          choices: makeNumericChoices(a + b, 2, 10),
          visualSpec: { type: "ten-frame", count: a + b, itemType: "berry", partA: a }
        };
      }
      const w = kRandInt(5, 9);
      const t = kRandInt(1, w - 1);
      return {
        story: `${w} apples, and ${t} are crossed out. How many remain?`,
        equationHTML: `${w} − ${t} = ?`,
        solvedEquationHTML: `${w} − ${t} = ${w - t}`,
        answer: w - t,
        choices: makeNumericChoices(w - t, 0, 9),
        visualSpec: { type: "ten-frame", count: w, itemType: "apple", partA: w, crossOut: t }
      };
    }
  },

  // ==================== SEASON IV: SUMMER MEADOW (SEMESTER B · UNITS 11–14 + FINAL) ====================
  {
    id: 13,
    season: "Season IV · Summer Meadow",
    unitTag: "Semester B · Unit 11",
    title: "13. Picnic Basket Stories",
    shortName: "Add & Subtract Mix",
    desc: "Decide when a garden story puts parts together (+) or takes a part away (−).",
    iconKey: "honeyjar",
    tabletopTool: "addsub",
    isMilestone: false,
    mapPos: { x: 82, y: 66 },
    teacherGuide: {
      script: "Before tapping a number, ask: 'Are we getting MORE altogether, or taking some AWAY?' Let the story guide the sign!",
      wonder: "Story problems train children to listen carefully and think truthfully about what is really happening.",
      heuristic: "Distinguishing + from − in mixed stories prevents children from blindly adding every two numbers they see.",
      handsOn: "Act out real snack stories at lunch: 'You have 4 grapes, I give you 3 more' vs. 'You have 7 grapes and eat 2.'"
    },
    learnSteps: [
      {
        stageLabel: "Joining Story · Step 1 of 3",
        narrative: "When more come to join the picnic, we ADD (+): 4 + 3 = 7!",
        equationHTML: "4 + 3 = 7",
        visualSpec: { type: "ten-frame", count: 7, itemType: "berry", partA: 4 }
      },
      {
        stageLabel: "Take-Away Story · Step 2 of 3",
        narrative: "When some are eaten or fly away, we SUBTRACT (−): 8 − 3 = 5!",
        equationHTML: "8 − 3 = 5",
        visualSpec: { type: "ten-frame", count: 8, itemType: "apple", partA: 8, crossOut: 3 },
        checkQuestion: {
          prompt: "Pip had 6 berries and ate 2. Should we Add (+) or Subtract (−)?",
          choices: ["Add (+)", "Subtract (−)"],
          answer: "Subtract (−)"
        }
      },
      {
        stageLabel: "Fact Family · Step 3 of 3",
        narrative: "The same Number Bond tells both stories! 3 + 5 = 8 and 8 − 3 = 5.",
        equationHTML: "3 + 5 = 8 · 8 − 3 = 5",
        visualSpec: { type: "number-bond", whole: 8, partA: 3, partB: 5, missing: "none", showDots: true }
      }
    ],
    generateProblem(tier) {
      const isAdd = kRandInt(0, 1) === 1;
      if (isAdd) {
        const a = kRandInt(2, tier === 1 ? 4 : 6);
        const b = kRandInt(1, 10 - a);
        return {
          story: `Pip packed ${a} honey jars and added ${b} more. How many in the basket now?`,
          equationHTML: `${a} + ${b} = ?`,
          solvedEquationHTML: `${a} + ${b} = ${a + b}`,
          answer: a + b,
          choices: makeNumericChoices(a + b, 2, 10),
          visualSpec: { type: "ten-frame", count: a + b, itemType: "honeyjar", partA: a }
        };
      }
      const whole = kRandInt(tier === 1 ? 4 : 6, 10);
      const take = kRandInt(1, whole - 1);
      return {
        story: `There were ${whole} berries on the picnic cloth and ${take} were eaten. How many are left?`,
        equationHTML: `${whole} − ${take} = ?`,
        solvedEquationHTML: `${whole} − ${take} = ${whole - take}`,
        answer: whole - take,
        choices: makeNumericChoices(whole - take, 0, 9),
        visualSpec: { type: "ten-frame", count: whole, itemType: "berry", partA: whole, crossOut: take }
      };
    }
  },

  {
    id: 14,
    season: "Season IV · Summer Meadow",
    unitTag: "Semester B · Unit 12",
    title: "14. A Hundred Meadow Stars",
    shortName: "Numbers to 100",
    desc: "Count by tens (10, 20, 30... 100) and read tens-and-ones groups to 100.",
    iconKey: "acorn",
    tabletopTool: "timecoins",
    isMilestone: false,
    mapPos: { x: 86, y: 36 },
    teacherGuide: {
      script: "Count the baskets by tens first: '10, 20, 30, 40...' then count the loose acorns by ones!",
      wonder: "Grouping tens makes huge numbers calm and clear—just like stars gathered into constellations.",
      heuristic: "Skip-counting by 10s up to 100 prepares Kindergarteners for all multi-digit place value in Grade 1.",
      handsOn: "Bundle 10 craft sticks or straws with rubber bands. Count 4 bundles of 10 (40) and 3 loose sticks (43)."
    },
    learnSteps: [
      {
        stageLabel: "Counting by 10s · Step 1 of 3",
        narrative: "Each basket holds 10 acorns! Count by tens: 10, 20, 30!",
        equationHTML: "3 Tens = 30",
        visualSpec: { type: "tens-ones-100", tens: 3, ones: 0 }
      },
      {
        stageLabel: "Tens & Ones · Step 2 of 3",
        narrative: "4 baskets of 10 (forty) and 2 loose acorns makes 42!",
        equationHTML: "40 and 2 = 42",
        visualSpec: { type: "tens-ones-100", tens: 4, ones: 2 },
        checkQuestion: {
          prompt: "5 baskets of 10 equals what number?",
          choices: [40, 50, 60],
          answer: 50
        }
      },
      {
        stageLabel: "All the Way to 100 · Step 3 of 3",
        narrative: "Ten baskets of 10 acorns make ONE HUNDRED (100)!",
        equationHTML: "10 Tens = 100",
        visualSpec: { type: "tens-ones-100", tens: 10, ones: 0 }
      }
    ],
    generateProblem(tier) {
      if (tier === 1) {
        const tens = kRandInt(2, 6);
        const val = tens * 10;
        return {
          story: `Count the baskets of 10 acorns! How many acorns in all?`,
          equationHTML: `${tens} Tens = ?`,
          solvedEquationHTML: `${tens} Tens = ${val}`,
          answer: val,
          choices: [val - 10, val, val + 10, val + 20].map((x) => Math.max(10, Math.min(100, x)))
            .filter((v, idx, arr) => arr.indexOf(v) === idx).length === 4
            ? [val - 10, val, val + 10, val + 20]
            : makeNumericChoices(val, 10, 100),
          visualSpec: { type: "tens-ones-100", tens, ones: 0 }
        };
      }
      const tens = kRandInt(2, tier === 2 ? 6 : 9);
      const ones = tier === 2 ? kPick([0, 2, 5]) : kRandInt(1, 5);
      const total = tens * 10 + ones;
      return {
        story: `Count the baskets of 10 first, then the loose acorns. What number is shown?`,
        equationHTML: `${tens * 10} + ${ones} = ?`,
        solvedEquationHTML: `${tens * 10} + ${ones} = ${total}`,
        answer: total,
        choices: makeNumericChoices(total, 10, 100),
        visualSpec: { type: "tens-ones-100", tens, ones }
      };
    }
  },

  {
    id: 15,
    season: "Season IV · Summer Meadow",
    unitTag: "Semester B · Unit 13",
    title: "15. The Garden Sundial & Clock",
    shortName: "Time to the Hour",
    desc: "Sequence daily rhythms (morning, afternoon, night) and read clocks to the hour.",
    iconKey: "clock",
    tabletopTool: "timecoins",
    isMilestone: false,
    mapPos: { x: 90, y: 65 },
    teacherGuide: {
      script: "Point to the hands: 'The SHORT hand points to the hour. When the LONG minute hand points straight up to 12, we say o'clock!'",
      wonder: "God set the sun and moon to mark days, seasons, and peaceful daily rhythms of work and rest.",
      heuristic: "Kindergarten time focuses on daily event order and exact o'clock hours (half-hours wait for Grade 1).",
      handsOn: "Notice when the family clock hits 12:00 for lunch or 7:00 for bedtime stories."
    },
    learnSteps: [
      {
        stageLabel: "Hands of the Clock · Step 1 of 3",
        narrative: "The short hour hand points to 3, and the long hand points up to 12. It is 3 o’clock!",
        equationHTML: "3:00 (3 o’clock)",
        visualSpec: { type: "clock-hour", hour: 3, minutes: 0, skyPhase: "Afternoon Garden" }
      },
      {
        stageLabel: "Daily Rhythm · Step 2 of 3",
        narrative: "8 o’clock in the morning is breakfast time—both the clock and the sun help us keep order!",
        equationHTML: "8:00 (Morning)",
        visualSpec: { type: "clock-hour", hour: 8, minutes: 0, skyPhase: "Morning Sunlight" },
        checkQuestion: {
          prompt: "Where does the LONG hand point at every o’clock hour?",
          choices: [3, 6, 12],
          answer: 12
        }
      },
      {
        stageLabel: "Bedtime Hour · Step 3 of 3",
        narrative: "When the short hand reaches 7 and the long hand is on 12, it is 7 o’clock!",
        equationHTML: "7:00 (Evening)",
        visualSpec: { type: "clock-hour", hour: 7, minutes: 0, skyPhase: "Evening Lanterns" }
      }
    ],
    generateProblem(tier) {
      const hour = tier === 1 ? kPick([2, 3, 4, 6, 9]) : kRandInt(1, 12);
      const ans = `${hour}:00`;
      const others = new Set([ans]);
      while (others.size < 4) {
        others.add(`${kRandInt(1, 12)}:00`);
      }
      const sorted = Array.from(others).sort((a, b) => parseInt(a, 10) - parseInt(b, 10));
      return {
        story: `Look at the short hour hand. What time does the garden clock show?`,
        equationHTML: `Clock Time = ?`,
        solvedEquationHTML: `It is ${hour}:00 (${hour} o’clock)!`,
        answer: ans,
        choices: sorted,
        visualSpec: { type: "clock-hour", hour, minutes: 0, skyPhase: "Garden Clock" }
      };
    }
  },

  {
    id: 16,
    season: "Season IV · Summer Meadow",
    unitTag: "Semester B · Unit 14",
    title: "16. The Farmers’ Market Coins",
    shortName: "Coins & Small Counts",
    desc: "Recognize penny (1¢), nickel (5¢), dime (10¢), and quarter (25¢) and count small coins.",
    iconKey: "coin",
    tabletopTool: "timecoins",
    isMilestone: false,
    mapPos: { x: 93, y: 38 },
    teacherGuide: {
      script: "Notice color and value: 'Copper penny is 1¢, thick silver nickel is 5¢, tiny silver dime is 10¢, and big quarter is 25¢!'",
      wonder: "Counting coins carefully builds real-world stewardship for farmers' markets and generous giving.",
      heuristic: "Pair coin recognition with counting by 1s (pennies), 5s (nickels), and 10s (dimes).",
      handsOn: "Dump a handful of real pennies, nickels, and dimes on the table and sort them into four bowls."
    },
    learnSteps: [
      {
        stageLabel: "Meet the Coins · Step 1 of 3",
        narrative: "A copper Penny is worth 1¢. Count 4 pennies: 1¢, 2¢, 3¢, 4¢!",
        equationHTML: "4 Pennies = 4¢",
        visualSpec: { type: "coins", coins: [1, 1, 1, 1] }
      },
      {
        stageLabel: "Nickels & Dimes · Step 2 of 3",
        narrative: "A Nickel is 5¢, and a tiny silver Dime is 10¢! Two dimes count 10¢, 20¢.",
        equationHTML: "2 Dimes = 20¢",
        visualSpec: { type: "coins", coins: [10, 10] },
        checkQuestion: {
          prompt: "How many cents is ONE Nickel worth?",
          choices: ["1¢", "5¢", "10¢"],
          answer: "5¢"
        }
      },
      {
        stageLabel: "Quarter · Step 3 of 3",
        narrative: "A Quarter is 25¢! And 1 dime + 2 pennies is 10¢, 11¢, 12¢.",
        equationHTML: "10¢ + 2¢ = 12¢",
        visualSpec: { type: "coins", coins: [10, 1, 1] }
      }
    ],
    generateProblem(tier) {
      if (tier === 1) {
        const val = kPick([1, 5, 10, 25]);
        const nameMap = { 1: "Penny (1¢)", 5: "Nickel (5¢)", 10: "Dime (10¢)", 25: "Quarter (25¢)" };
        return {
          story: `Which coin is Pip holding for the farmers' market?`,
          equationHTML: `Coin = ?`,
          solvedEquationHTML: `It is a ${nameMap[val]}!`,
          answer: nameMap[val],
          choices: ["Penny (1¢)", "Nickel (5¢)", "Dime (10¢)", "Quarter (25¢)"],
          visualSpec: { type: "coins", coins: [val] }
        };
      }
      const combos = tier === 2
        ? [
            [1, 1, 1],
            [1, 1, 1, 1, 1],
            [5, 5],
            [10, 10],
            [5, 1, 1]
          ]
        : [
            [10, 5],
            [10, 1, 1, 1],
            [5, 5, 1, 1],
            [10, 10, 5],
            [25, 1]
          ];
      const coins = kPick(combos);
      const total = coins.reduce((a, b) => a + b, 0);
      return {
        story: `Count the coins together! How many cents in all?`,
        equationHTML: `Total Cents = ?`,
        solvedEquationHTML: `Total = ${total}¢`,
        answer: total,
        choices: makeNumericChoices(total, 1, 35),
        visualSpec: { type: "coins", coins }
      };
    }
  },

  {
    id: 17,
    season: "Season IV · Summer Meadow",
    unitTag: "Kindergarten Crown",
    title: "17. Grand Summer Harvest Festival",
    shortName: "Kindergarten Finale",
    desc: "Celebrate all 14 Kindergarten units from Autumn leaves to Summer coins and clocks!",
    iconKey: "seal",
    tabletopTool: "timecoins",
    isMilestone: true,
    mapPos: { x: 93, y: 74 },
    teacherGuide: {
      script: "Celebrate your child's whole Kindergarten year! Look back across the map from Unit 1 to Unit 17 with wonder and joy.",
      wonder: "Every skill—sorting, subitizing, bonds, shapes, time, and coins—prepares your child warmly for Grade 1's Young Knight's Quest.",
      heuristic: "Your child is ready to advance to Grade 1 whenever they joyfully see small parts inside 10 and teens as 10 + ones.",
      handsOn: "Print or draw a 'Kindergarten Meadow Master' ribbon together and celebrate with a special family picnic!"
    },
    learnSteps: [
      {
        stageLabel: "Festival · Step 1 of 3",
        narrative: "From 5-frames and Number Bonds to 100 acorns, you learned every season’s wisdom!",
        equationHTML: "6 + 4 = 10",
        visualSpec: { type: "number-bond", whole: 10, partA: 6, partB: 4, missing: "none", showDots: true }
      },
      {
        stageLabel: "Festival · Step 2 of 3",
        narrative: "Remember: 10 Tens make 100, and the short hand points to the hour!",
        equationHTML: "10 Tens = 100",
        visualSpec: { type: "tens-ones-100", tens: 5, ones: 0 },
        checkQuestion: {
          prompt: "How many cents is a Dime worth?",
          choices: [5, 10, 25],
          answer: 10
        }
      },
      {
        stageLabel: "Festival · Step 3 of 3",
        narrative: "Let us gather our final 4 Golden Acorns to crown the Kindergarten year!",
        equationHTML: "Four Seasons Complete!",
        visualSpec: { type: "double-ten-frame", count: 20, itemType: "acorn" }
      }
    ],
    generateProblem(tier) {
      const pickType = kPick(["bond", "tens", "clock", "coins"]);
      if (pickType === "bond") {
        const a = kRandInt(2, 8);
        const b = 10 - a;
        return {
          story: `Make 10 for the Harvest Festival! ${a} and what number make 10?`,
          equationHTML: `${a} + ? = 10`,
          solvedEquationHTML: `${a} + ${b} = 10`,
          answer: b,
          choices: makeNumericChoices(b, 0, 10),
          visualSpec: { type: "number-bond", whole: 10, partA: a, partB: b, missing: "partB", showDots: true }
        };
      }
      if (pickType === "tens") {
        const t = kRandInt(3, 8);
        const o = tier === 1 ? 0 : kRandInt(1, 4);
        const total = t * 10 + o;
        return {
          story: `Count the baskets of 10 and loose acorns for the feast!`,
          equationHTML: `${t * 10} + ${o} = ?`,
          solvedEquationHTML: `${t * 10} + ${o} = ${total}`,
          answer: total,
          choices: makeNumericChoices(total, 10, 99),
          visualSpec: { type: "tens-ones-100", tens: t, ones: o }
        };
      }
      if (pickType === "clock") {
        const h = kPick([2, 4, 6, 9, 11]);
        const ans = `${h}:00`;
        const opts = new Set([ans]);
        while (opts.size < 4) opts.add(`${kRandInt(1, 12)}:00`);
        return {
          story: `When does the Harvest Festival bell ring? Read the clock!`,
          equationHTML: `Time = ?`,
          solvedEquationHTML: `${ans} (${h} o’clock)`,
          answer: ans,
          choices: Array.from(opts).sort((a, b) => parseInt(a, 10) - parseInt(b, 10)),
          visualSpec: { type: "clock-hour", hour: h, minutes: 0, skyPhase: "Harvest Festival" }
        };
      }
      const coins = [10, 5, 1, 1];
      return {
        story: `Count the festival coins: 1 dime, 1 nickel, and 2 pennies!`,
        equationHTML: `10 + 5 + 2 = ?`,
        solvedEquationHTML: `Total = 17¢`,
        answer: 17,
        choices: [12, 15, 17, 22],
        visualSpec: { type: "coins", coins }
      };
    }
  }
];

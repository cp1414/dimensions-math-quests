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
    desc: "Notice what is same or different, left vs. right, and sort autumn treasures.",
    iconKey: "leaf",
    tabletopTool: "shapespat",
    isMilestone: false,
    mapPos: { x: 9, y: 68 },
    teacherGuide: {
      script: "Ask: 'Which three belong together? Why does that one look different?' Practice naming left and right from Pip's spot, and sorting a mixed basket into groups.",
      wonder: "Things in the meadow grow after their own kinds—noticing sameness and difference trains young eyes for order and pattern.",
      heuristic: "Sorting by one attribute (kind, color, or shape) and knowing left from right builds the spatial and categorical thinking behind all math.",
      handsOn: "Set out 3 acorns and 1 button, then ask your child which is on the left side vs. the right side of a toy bear."
    },
    learnSteps: [
      {
        stageLabel: "Concrete · Step 1 of 4",
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
        stageLabel: "Pictorial · Step 2 of 4",
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
          answer: "B",
          coachText: "Yes! Card B is a golden berry while A, C, and D are red berries.",
          solvedEquationHTML: "B is Different!"
        }
      },
      {
        stageLabel: "Sort & Count · Step 3 of 4",
        narrative: "We can also sort a mixed basket into groups and count each kind! Look: 3 acorns and 5 leaves.",
        equationHTML: "3 Acorns · 5 Leaves",
        visualSpec: {
          type: "sort-count-groups",
          items: [
            { itemType: "acorn" }, { itemType: "leaf" }, { itemType: "leaf" }, { itemType: "acorn" },
            { itemType: "leaf" }, { itemType: "acorn" }, { itemType: "leaf" }, { itemType: "leaf" }
          ]
        }
      },
      {
        stageLabel: "Direction · Step 4 of 4",
        narrative: "Stand beside Pip! The acorn sits on Pip’s LEFT, and the berry sits on Pip’s RIGHT.",
        equationHTML: "Left &amp; Right",
        visualSpec: {
          type: "left-right",
          leftItem: "acorn",
          rightItem: "berry",
          showSideLabels: true
        }
      }
    ],
    generateProblem(tier) {
      const labels = ["A", "B", "C", "D"];
      const oddIdx = kRandInt(0, 3);
      const mode = tier === 1
        ? kPick(["kind", "leftright"])
        : tier === 2
          ? kPick(["color", "sortcount"])
          : kPick(["shape", "sortcompare", "leftright_shapes"]);

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
      }
      if (mode === "leftright") {
        const pairs = [
          { a: "acorn", nameA: "Acorn", b: "berry", nameB: "Berry" },
          { a: "leaf", nameA: "Leaf", b: "daisy", nameB: "Daisy" },
          { a: "apple", nameA: "Apple", b: "pinecone", nameB: "Pinecone" }
        ];
        const p = kPick(pairs);
        const askLeft = kRandInt(0, 1) === 1;
        const ans = askLeft ? p.nameA : p.nameB;
        return {
          story: `Look at Pip in the middle. Which treasure is on the ${askLeft ? "LEFT" : "RIGHT"} side?`,
          equationHTML: `${askLeft ? "Left" : "Right"} Side = ?`,
          solvedEquationHTML: `${ans} is on the ${askLeft ? "left" : "right"}!`,
          answer: ans,
          choices: makeWordChoices(ans, [p.nameA, p.nameB, "Pebble", "Honey Jar"]),
          visualSpec: { type: "left-right", leftItem: p.a, rightItem: p.b, showSideLabels: false }
        };
      }
      if (mode === "color") {
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
      if (mode === "sortcount") {
        const countA = kRandInt(2, 5);
        const countB = 8 - countA;
        const items = [
          ...Array(countA).fill({ itemType: "acorn" }),
          ...Array(countB).fill({ itemType: "leaf" })
        ].sort(() => Math.random() - 0.5);
        const askAcorn = kRandInt(0, 1) === 1;
        const ans = askAcorn ? countA : countB;
        return {
          story: `Sort the mixed basket in your mind! How many ${askAcorn ? "acorns" : "leaves"} are in the basket?`,
          equationHTML: `${askAcorn ? "Acorns" : "Leaves"} = ?`,
          solvedEquationHTML: `There are ${ans} ${askAcorn ? "acorns" : "leaves"}!`,
          answer: ans,
          choices: makeNumericChoices(ans, 1, 7),
          visualSpec: { type: "sort-count-groups", items }
        };
      }
      if (mode === "sortcompare") {
        const countA = kPick([2, 3, 5, 6]);
        const countB = 8 - countA; // always distinct from countA since countA != 4
        const items = [
          ...Array(countA).fill({ itemType: "daisy" }),
          ...Array(countB).fill({ itemType: "berry" })
        ].sort(() => Math.random() - 0.5);
        const ans = countA > countB ? "Daisies" : "Berries";
        return {
          story: `Sort the daisies and berries! Which group has MORE in the basket?`,
          equationHTML: `More Items = ?`,
          solvedEquationHTML: `${ans} have more (${Math.max(countA, countB)} vs ${Math.min(countA, countB)})!`,
          answer: ans,
          choices: ["Daisies", "Berries", "Same Number", "Zero"],
          visualSpec: { type: "sort-count-groups", items }
        };
      }
      if (mode === "leftright_shapes") {
        const sList = [
          { key: "circle", name: "Circle" },
          { key: "triangle", name: "Triangle" },
          { key: "square", name: "Square" },
          { key: "hexagon", name: "Hexagon" }
        ].sort(() => Math.random() - 0.5);
        const askLeft = kRandInt(0, 1) === 1;
        const ans = askLeft ? sList[0].name : sList[1].name;
        return {
          story: `Look beside Pip! Which shape is on Pip’s ${askLeft ? "LEFT" : "RIGHT"}?`,
          equationHTML: `${askLeft ? "Left" : "Right"} Shape = ?`,
          solvedEquationHTML: `The ${ans} is on the ${askLeft ? "left" : "right"}!`,
          answer: ans,
          choices: [sList[0].name, sList[1].name, sList[2].name, sList[3].name],
          visualSpec: { type: "left-right", leftShape: sList[0].key, rightShape: sList[1].key, showSideLabels: false }
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
    shortName: "Numbers 0–5 & Graphs",
    desc: "Count 0 to 5 in frames and scattered patches, and read early picture graphs.",
    iconKey: "acorn",
    tabletopTool: "frames",
    isMilestone: false,
    mapPos: { x: 16, y: 40 },
    teacherGuide: {
      script: "Ask: 'Can you tell how many leaves are in the tray without counting one-by-one?' Explain that zero means an empty tray, and trace scattered objects carefully with one finger.",
      wonder: "Seeing 3 or 4 instantly (subitizing) helps young minds recognize small groups at a glance before lining items up into picture graphs.",
      heuristic: "The 5-Frame anchors every early number to 5, while scattered groups build reliable one-to-one tagging.",
      handsOn: "Roll a die or flash 1–5 fingers for 2 seconds, then hide your hands and ask your child how many they saw."
    },
    learnSteps: [
      {
        stageLabel: "Concrete · Step 1 of 4",
        narrative: "Count each acorn in Pip’s 5-frame basket: 1, 2, 3!",
        equationHTML: "3 Acorns",
        visualSpec: { type: "five-frame", count: 3, itemType: "acorn" }
      },
      {
        stageLabel: "Pictorial · Step 2 of 4",
        narrative: "Notice how 4 leaves fill almost the whole 5-frame—just 1 empty box is left!",
        equationHTML: "4 Leaves (1 empty)",
        visualSpec: { type: "five-frame", count: 4, itemType: "leaf" },
        checkQuestion: {
          prompt: "How many leaves fill a FULL 5-frame?",
          choices: [3, 4, 5],
          answer: 5,
          coachText: "Right! Four leaves leave 1 empty box, so 5 leaves fill the full tray.",
          solvedEquationHTML: "5 Fill the Tray"
        }
      },
      {
        stageLabel: "Zero Concept · Step 3 of 4",
        narrative: "When no acorns are inside the tray at all, we call that number ZERO (0).",
        equationHTML: "0 = Empty",
        visualSpec: { type: "five-frame", count: 0, itemType: "acorn" }
      },
      {
        stageLabel: "Picture Graph · Step 4 of 4",
        narrative: "Lining treasures up in rows makes a picture graph—we can tell at a glance that leaves have the most!",
        equationHTML: "Picture Graph",
        visualSpec: {
          type: "picture-graph",
          rows: [
            { label: "Acorns", itemType: "acorn", count: 3 },
            { label: "Leaves", itemType: "leaf", count: 5 },
            { label: "Berries", itemType: "berry", count: 2 }
          ]
        }
      }
    ],
    generateProblem(tier) {
      if (tier === 1) {
        const item = kPick(["acorn", "leaf", "apple", "berry"]);
        const count = kRandInt(1, 4);
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
      if (tier === 2 && kRandInt(0, 1) === 1) {
        const item = kPick(["acorn", "leaf", "berry", "pinecone"]);
        const count = kRandInt(1, 5);
        const plural = count === 1 ? item : item === "berry" ? "berries" : `${item}s`;
        return {
          story: `Touch and count the scattered ${plural} in the patch! How many are there?`,
          equationHTML: `Count Scattered = ?`,
          solvedEquationHTML: `There are ${count} ${plural}!`,
          answer: count,
          choices: makeNumericChoices(count, 0, 5),
          visualSpec: { type: "scattered-group", count, itemType: item, seed: kRandInt(0, 9) }
        };
      }
      if (tier === 3 && kRandInt(0, 1) === 1) {
        const defs = [
          { label: "Acorns", itemType: "acorn" },
          { label: "Leaves", itemType: "leaf" },
          { label: "Berries", itemType: "berry" }
        ];
        const counts = [1, 2, 3, 4, 5].sort(() => Math.random() - 0.5).slice(0, 3);
        const rows = defs.map((d, i) => ({ label: d.label, itemType: d.itemType, count: counts[i] }));
        if (kRandInt(0, 1) === 0) {
          const targetIdx = kRandInt(0, 2);
          const ans = rows[targetIdx].count;
          return {
            story: `Read the picture graph! How many ${rows[targetIdx].label.toLowerCase()} are in the row?`,
            equationHTML: `${rows[targetIdx].label} = ?`,
            solvedEquationHTML: `There are ${ans} ${rows[targetIdx].label.toLowerCase()}!`,
            answer: ans,
            choices: makeNumericChoices(ans, 0, 5),
            visualSpec: { type: "picture-graph", rows }
          };
        }
        let maxRow = rows[0];
        rows.forEach((r) => { if (r.count > maxRow.count) maxRow = r; });
        return {
          story: `Look at the rows in the picture graph! Which treasure has the MOST?`,
          equationHTML: `Most = ?`,
          solvedEquationHTML: `${maxRow.label} has the most (${maxRow.count})!`,
          answer: maxRow.label,
          choices: ["Acorns", "Leaves", "Berries", "All Equal"],
          visualSpec: { type: "picture-graph", rows }
        };
      }
      const item = kPick(["acorn", "leaf", "apple", "berry"]);
      const minN = tier === 3 ? 0 : 1;
      const count = kRandInt(minN, 5);
      const plural = count === 1 ? item : item === "berry" ? "berries" : `${item}s`;
      return {
        story: tier === 3
          ? `Look closely at the garden patch—even an empty patch counts! How many ${plural}?`
          : `How many ${plural} are in the 5-frame tray?`,
        equationHTML: `How many? = ?`,
        solvedEquationHTML: `There are ${count} ${plural}!`,
        answer: count,
        choices: makeNumericChoices(count, 0, 5),
        visualSpec: tier === 3
          ? { type: "scattered-group", count, itemType: item, seed: kRandInt(0, 9) }
          : { type: "five-frame", count, itemType: item }
      };
    }
  },

  {
    id: 3,
    season: "Season I · Autumn Harvest",
    unitTag: "Semester A · Unit 3",
    title: "3. Ten Berries & Garden Line",
    shortName: "Numbers 6–10 & Order",
    desc: "Count 6 to 10 in frames and scattered groups, plus 1st to 10th ordinal order.",
    iconKey: "berry",
    tabletopTool: "frames",
    isMilestone: false,
    mapPos: { x: 23, y: 66 },
    teacherGuide: {
      script: "Point to the top row of 5 first: '5 on top and 2 below makes 7!' Also practice '1st, 2nd, 3rd...' all the way to 10th from the left.",
      wonder: "Two hands of 5 fingers make 10—our own bodies carry a built-in ten-frame designed for orderly counting.",
      heuristic: "Seeing 6–10 as '5 and some more' eliminates slow 1-by-1 counting and builds instant fluency.",
      handsOn: "Line up 10 toy blocks or buttons facing left. Ask which one is 1st, 4th, 7th, and 10th in line."
    },
    learnSteps: [
      {
        stageLabel: "Concrete · Step 1 of 3",
        narrative: "The top row holds 5 berries. Count on 2 more below: 6, 7!",
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
          answer: 8,
          coachText: "Yes! Five on top and 3 below makes 8!",
          solvedEquationHTML: "5 and 3 make 8"
        }
      },
      {
        stageLabel: "Ordinal Order · Step 3 of 3",
        narrative: "Counting order from the left gives positions: 1st, 2nd, 3rd, 4th, 5th—all the way to 10th!",
        equationHTML: "1st · 2nd · 3rd · ... · 10th",
        visualSpec: { type: "ordinal-line", total: 6, itemType: "daisy", targetIndex: 4, showNumbers: true }
      }
    ],
    generateProblem(tier) {
      const ordNames = ["", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th"];
      if (tier === 1) {
        const item = kPick(["berry", "acorn", "apple"]);
        const count = kRandInt(6, 10);
        return {
          story: `Count the full top row of 5 and the extra ones below! How many in all?`,
          equationHTML: `How many? = ?`,
          solvedEquationHTML: `5 and ${count - 5} make ${count}!`,
          answer: count,
          choices: makeNumericChoices(count, 5, 10),
          visualSpec: { type: "ten-frame", count, itemType: item, partA: 5 }
        };
      }
      if (tier === 2) {
        const roll = kRandInt(0, 2);
        if (roll === 0) {
          const total = 6;
          const target = kRandInt(1, total);
          return {
            story: `Count from the left starting at 1st! Which position is the golden daisy?`,
            equationHTML: `Position = ?`,
            solvedEquationHTML: `It is in the ${ordNames[target]} spot!`,
            answer: ordNames[target],
            choices: makeWordChoices(ordNames[target], ordNames.slice(1, total + 1)),
            visualSpec: { type: "ordinal-line", total, itemType: "daisy", targetIndex: target, showNumbers: false }
          };
        }
        if (roll === 1) {
          const item = kPick(["berry", "acorn", "apple"]);
          const count = kRandInt(6, 10);
          return {
            story: `Count the scattered ${item === "berry" ? "berries" : item + "s"} in the patch! How many in all?`,
            equationHTML: `Scattered Count = ?`,
            solvedEquationHTML: `There are ${count}!`,
            answer: count,
            choices: makeNumericChoices(count, 5, 10),
            visualSpec: { type: "scattered-group", count, itemType: item, seed: kRandInt(0, 9) }
          };
        }
        const n = kRandInt(5, 9);
        return {
          story: `There are ${n} berries in this ten-frame. What number is 1 MORE than ${n}?`,
          equationHTML: `1 More than ${n} = ?`,
          solvedEquationHTML: `1 more than ${n} is ${n + 1}!`,
          answer: n + 1,
          choices: makeNumericChoices(n + 1, 5, 10),
          visualSpec: { type: "ten-frame", count: n, itemType: "berry", partA: 5 }
        };
      }
      const roll = kRandInt(0, 2);
      if (roll === 0 || roll === 1) {
        const total = 10;
        const target = roll === 0 ? kRandInt(6, 10) : kRandInt(1, 10);
        return {
          story: `Count carefully from the left: 1st, 2nd, 3rd... Which spot is the golden daisy in?`,
          equationHTML: `Position (1st–10th) = ?`,
          solvedEquationHTML: `It is in the ${ordNames[target]} spot!`,
          answer: ordNames[target],
          choices: makeWordChoices(ordNames[target], ordNames.slice(1, 11)),
          visualSpec: { type: "ordinal-line", total, itemType: "daisy", targetIndex: target, showNumbers: false }
        };
      }
      const n = kRandInt(6, 10);
      const askLess = kRandInt(0, 1) === 1;
      const ans = askLess ? n - 1 : (n === 10 ? 9 : n + 1);
      const qWord = askLess || n === 10 ? "1 LESS" : "1 MORE";
      return {
        story: `Here are ${n} acorns. What number is ${qWord} than ${n}?`,
        equationHTML: `${qWord === "1 LESS" ? "1 Less" : "1 More"} than ${n} = ?`,
        solvedEquationHTML: `${qWord === "1 LESS" ? "1 less" : "1 more"} than ${n} is ${ans}!`,
        answer: ans,
        choices: makeNumericChoices(ans, 5, 10),
        visualSpec: { type: "scattered-group", count: n, itemType: "acorn", seed: kRandInt(0, 9) }
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
    desc: "Explore 2D flat shapes, 3D solids, spatial words, combining shapes, and patterns.",
    iconKey: "shape",
    tabletopTool: "shapespat",
    isMilestone: false,
    mapPos: { x: 31, y: 35 },
    teacherGuide: {
      script: "Ask: 'How many straight sides and corners does this shape have?' Chant repeating patterns aloud (acorn, leaf, berry...) and test putting two triangles or squares together.",
      wonder: "Snowflakes have 6-sided hexagonal order, and honeycombs fit together neatly—geometry reveals quiet wisdom in nature.",
      heuristic: "Naming shape attributes (corners, curved vs. flat faces), spatial relations, and chanting AB/AAB/ABC patterns develops geometric and algebraic thinking.",
      handsOn: "Hunt around the room for a sphere (ball), cylinder (can), and cube (block), and trace putting two square tiles side by side."
    },
    learnSteps: [
      {
        stageLabel: "Flat Shapes · Step 1 of 4",
        narrative: "A triangle has 3 straight sides and 3 corners. Look at the golden corner dots!",
        equationHTML: "Triangle = 3 Corners",
        visualSpec: { type: "shapes", shapeKey: "triangle", showVertices: true }
      },
      {
        stageLabel: "3D Solids · Step 2 of 4",
        narrative: "Solid shapes aren’t flat—you can hold them! This is a cylinder, like a cozy log or soup can.",
        equationHTML: "3D Solid: Cylinder",
        visualSpec: { type: "shapes", shapeKey: "cylinder", showVertices: false },
        checkQuestion: {
          prompt: "Which 3D solid has two flat circles and rolls like a cozy log?",
          choices: ["Sphere", "Cylinder", "Cube"],
          answer: "Cylinder",
          coachText: "Yes! A cylinder rolls smoothly like a log and has flat circular ends.",
          solvedEquationHTML: "Cylinder Rolls!"
        }
      },
      {
        stageLabel: "Position Words · Step 3 of 4",
        narrative: "Position words tell where things sit: the little ladybug rests ABOVE the wooden cube!",
        equationHTML: "Above · Below · Beside",
        visualSpec: { type: "shapes", mode: "position", relation: "above", topItem: "ladybug", baseShape: "cube" }
      },
      {
        stageLabel: "Patterns · Step 4 of 4",
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
      const mode = tier === 1
        ? "flat"
        : tier === 2
          ? kPick(["solid", "pattern"])
          : kPick(["position", "combine", "pattern"]);

      if (mode === "flat") {
        const list = [
          { key: "circle", name: "Circle", corners: 0 },
          { key: "triangle", name: "Triangle", corners: 3 },
          { key: "square", name: "Square", corners: 4 },
          { key: "rectangle", name: "Rectangle", corners: 4 },
          { key: "hexagon", name: "Hexagon", corners: 6 }
        ];
        const chosen = kPick(list);
        if (kRandInt(0, 1) === 0) {
          return {
            story: `What is the name of this flat shape?`,
            equationHTML: `Shape Name = ?`,
            solvedEquationHTML: `It is a ${chosen.name}!`,
            answer: chosen.name,
            choices: makeWordChoices(chosen.name, list.map((x) => x.name)),
            visualSpec: { type: "shapes", shapeKey: chosen.key, showVertices: true }
          };
        }
        return {
          story: `Count the golden corner dots on this flat ${chosen.name.toLowerCase()}! How many corners?`,
          equationHTML: `Corners = ?`,
          solvedEquationHTML: `A ${chosen.name.toLowerCase()} has ${chosen.corners} corners!`,
          answer: chosen.corners,
          choices: [0, 3, 4, 6],
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
      if (mode === "combine") {
        const useSquares = kRandInt(0, 1) === 0;
        if (useSquares) {
          return {
            story: `Put two matching squares side by side! What larger flat shape do they form together?`,
            equationHTML: `Combined Shape = ?`,
            solvedEquationHTML: `Two squares side by side make a Rectangle!`,
            answer: "Rectangle",
            choices: ["Rectangle", "Triangle", "Circle", "Hexagon"],
            visualSpec: { type: "shapes", mode: "combine", combo: "two-squares" }
          };
        }
        return {
          story: `Fit these two right triangles together! What flat shape do they make?`,
          equationHTML: `Combined Shape = ?`,
          solvedEquationHTML: `Two triangles together make a Square!`,
          answer: "Square",
          choices: ["Square", "Circle", "Cylinder", "Cone"],
          visualSpec: { type: "shapes", mode: "combine", combo: "two-triangles" }
        };
      }
      // Pattern mode (Tier 2: AB/AAB/ABB, Tier 3 adds ABC)
      const basePatterns = [
        { a: "acorn", b: "leaf", c: "berry", seq: ["a", "b", "a", "b"], ans: "Acorn" },
        { a: "berry", b: "daisy", c: "acorn", seq: ["a", "a", "b", "a", "a"], ans: "Daisy" },
        { a: "pinecone", b: "pebble", c: "leaf", seq: ["a", "b", "b", "a", "b"], ans: "Pebble" }
      ];
      const triPatterns = [
        { a: "acorn", b: "leaf", c: "berry", seq: ["a", "b", "c", "a", "b"], ans: "Berry" },
        { a: "daisy", b: "pinecone", c: "apple", seq: ["a", "b", "c", "a", "b"], ans: "Apple" }
      ];
      const nameOf = { acorn: "Acorn", leaf: "Leaf", berry: "Berry", daisy: "Daisy", pinecone: "Pinecone", pebble: "Pebble", apple: "Apple" };
      const p = tier === 3 ? kPick([...basePatterns, ...triPatterns]) : kPick(basePatterns);
      const tokens = p.seq.map((s) => ({ itemType: s === "a" ? p.a : s === "b" ? p.b : p.c }));
      return {
        story: `Say the pattern aloud! What belongs in the ? spot next?`,
        equationHTML: `Next in Pattern = ?`,
        solvedEquationHTML: `${p.ans} comes next!`,
        answer: p.ans,
        choices: makeWordChoices(p.ans, [nameOf[p.a], nameOf[p.b], nameOf[p.c], "Ladybug"]),
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
    desc: "Compare length, height, weight on a scale, capacity, and non-standard unit length.",
    iconKey: "scale",
    tabletopTool: "balance",
    isMilestone: false,
    mapPos: { x: 38, y: 63 },
    teacherGuide: {
      script: "Ask: 'Why did that side of the scale dip down?' Point out that both length sticks and height trees start from the exact same baseline.",
      wonder: "True scales and honest measures keep fairness in the garden. Even at age 5, comparing side-by-side builds careful judgment.",
      heuristic: "Kindergarteners compare directly at a shared baseline before counting non-standard unit blocks end to end.",
      handsOn: "Hold a heavy mug in one hand and a cotton ball in the other, then measure a book with paperclips lined up end-to-end!"
    },
    learnSteps: [
      {
        stageLabel: "Weight · Step 1 of 4",
        narrative: "When a pan goes DOWN on the balance scale, that side is HEAVIER. Look—the apple is heavier than the berry!",
        equationHTML: "Down = Heavier",
        visualSpec: { type: "pan-balance", leftItem: "apple", leftWeight: 6, rightItem: "berry", rightWeight: 2, leftLabel: "Apple", rightLabel: "Berry" }
      },
      {
        stageLabel: "Length · Step 2 of 4",
        narrative: "Line up both bars at the left edge. The green bar has more blocks, so it is LONGER!",
        equationHTML: "Longer vs. Shorter",
        visualSpec: { type: "length-compare", labelA: "Green Stick", lenA: 6, labelB: "Gold Twig", lenB: 3 },
        checkQuestion: {
          prompt: "Which stick is SHORTER?",
          choices: ["Green Stick", "Gold Twig"],
          answer: "Gold Twig",
          coachText: "Right! The Gold Twig only stretches 3 blocks, so it is shorter.",
          solvedEquationHTML: "Gold Twig is Shorter"
        }
      },
      {
        stageLabel: "Height · Step 3 of 4",
        narrative: "Both trees stand on the same flat ground! The Tall Oak reaches higher than the Small Sapling.",
        equationHTML: "Taller vs. Shorter",
        visualSpec: { type: "height-compare", labelA: "Tall Oak", heightA: 6, labelB: "Small Sapling", heightB: 2 }
      },
      {
        stageLabel: "Capacity · Step 4 of 4",
        narrative: "Capacity means how much a container holds! The Tall Pitcher holds MORE water than the Small Cup.",
        equationHTML: "Holds More / Less",
        visualSpec: { type: "capacity-jars", leftLabel: "Tall Pitcher", leftFill: 80, rightLabel: "Small Cup", rightFill: 30 }
      }
    ],
    generateProblem(tier) {
      const mode = tier === 1
        ? kPick(["weight", "length"])
        : tier === 2
          ? kPick(["height", "capacity", "length"])
          : kPick(["measureUnits", "weight", "height", "capacity"]);

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
      if (mode === "measureUnits") {
        const lenA = kRandInt(4, 9);
        return {
          story: `Count the green unit blocks placed end-to-end! How many blocks long is the branch?`,
          equationHTML: `Length = ? Blocks`,
          solvedEquationHTML: `The branch is ${lenA} blocks long!`,
          answer: lenA,
          choices: makeNumericChoices(lenA, 2, 10),
          visualSpec: { type: "length-compare", labelA: "Branch", lenA, labelB: "" }
        };
      }
      if (mode === "height") {
        const hA = kRandInt(4, 6);
        const hB = kRandInt(2, 3);
        const swap = kRandInt(0, 1) === 1;
        const heightA = swap ? hB : hA;
        const heightB = swap ? hA : hB;
        const askTall = kRandInt(0, 1) === 1;
        const ans = askTall ? (heightA > heightB ? "Pine Tree" : "Oak Bush") : (heightA < heightB ? "Pine Tree" : "Oak Bush");
        return {
          story: `Both grow up from the same ground! Which one is ${askTall ? "TALLER" : "SHORTER"}?`,
          equationHTML: `${askTall ? "Taller" : "Shorter"} = ?`,
          solvedEquationHTML: `${ans} is ${askTall ? "taller" : "shorter"}!`,
          answer: ans,
          choices: ["Pine Tree", "Oak Bush", "Same Height", "Zero"],
          visualSpec: { type: "height-compare", labelA: "Pine Tree", heightA, labelB: "Oak Bush", heightB }
        };
      }
      const leftMore = kRandInt(0, 1) === 1;
      const askMore = kRandInt(0, 1) === 1;
      const lf = leftMore ? 85 : 25;
      const rf = leftMore ? 25 : 85;
      const labelLeft = leftMore ? "Big Pitcher" : "Small Cup";
      const labelRight = leftMore ? "Small Cup" : "Big Pitcher";
      const ans = askMore ? "Big Pitcher" : "Small Cup";
      return {
        story: `Look at the pitcher and the cup! Which container holds ${askMore ? "MORE" : "LESS"} water?`,
        equationHTML: `Holds ${askMore ? "More" : "Less"} = ?`,
        solvedEquationHTML: `${ans} holds ${askMore ? "more" : "less"}!`,
        answer: ans,
        choices: [labelLeft, labelRight, "Same Amount", "Empty"],
        visualSpec: { type: "capacity-jars", leftLabel: labelLeft, leftFill: lf, rightLabel: labelRight, rightFill: rf }
      };
    }
  },

  {
    id: 6,
    season: "Season II · Winter Hearth",
    unitTag: "Semester A · Celebration",
    title: "6. Winter Hearth Celebration",
    shortName: "Semester A Review",
    desc: "Celebrate everything from Autumn & Winter: Sorting, 0–10, Positions, Shapes, and Measures!",
    iconKey: "pinecone",
    tabletopTool: "frames",
    isMilestone: true,
    mapPos: { x: 45, y: 36 },
    teacherGuide: {
      script: "Celebrate! Invite your child to review sorting, left/right, 0–10 counting, 1st–10th order, 2D/3D shapes, patterns, and height/weight/capacity.",
      wonder: "Reviewing past discoveries with gratitude echoes a cozy winter feast after the autumn harvest.",
      heuristic: "Spiraling back across sorting, subitizing, spatial sense, and direct comparison cements long-term understanding.",
      handsOn: "Brew warm cocoa or tea and play a 5-question 'Garden Treasure Hunt' around the living room."
    },
    learnSteps: [
      {
        stageLabel: "Review · Step 1 of 4",
        narrative: "Halfway through the seasons! Remember: 5 on top and 4 below make 9 in all!",
        equationHTML: "5 and 4 make 9",
        visualSpec: { type: "ten-frame", count: 9, itemType: "pinecone", partA: 5 }
      },
      {
        stageLabel: "Review · Step 2 of 4",
        narrative: "A cube is a solid block with flat square faces—you can hold it in your hand.",
        equationHTML: "Solid: Cube",
        visualSpec: { type: "shapes", shapeKey: "cube" },
        checkQuestion: {
          prompt: "Is this wooden cube a flat 2D shape or a 3D solid?",
          choices: ["Flat 2D Shape", "3D Solid"],
          answer: "3D Solid",
          coachText: "Right! A cube takes up space like a block, so it is a 3D solid.",
          solvedEquationHTML: "3D Solid: Cube"
        }
      },
      {
        stageLabel: "Review · Step 3 of 4",
        narrative: "We also learned to compare heights, lengths, weights, and pitchers from a shared baseline!",
        equationHTML: "Compare &amp; Measure",
        visualSpec: { type: "height-compare", labelA: "Tall Pine", heightA: 6, labelB: "Little Pine", heightB: 3 }
      },
      {
        stageLabel: "Review · Step 4 of 4",
        narrative: "Ready for the Winter Hearth Celebration? Let us review all of Units 1 to 5 together!",
        equationHTML: "Semester A Complete!",
        visualSpec: { type: "five-frame", count: 5, itemType: "acorn" }
      }
    ],
    generateProblem(tier) {
      const kind = tier === 1
        ? kPick(["frame", "oddOne", "flatShape", "balance"])
        : tier === 2
          ? kPick(["frame", "solidShape", "height", "capacity", "pattern"])
          : kPick(["ordinal", "sortMore", "position", "measureUnits", "scattered"]);

      if (kind === "frame") {
        const n = tier === 1 ? kRandInt(1, 5) : kRandInt(6, 10);
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
      if (kind === "oddOne") {
        const labels = ["A", "B", "C", "D"];
        const oddIdx = kRandInt(0, 3);
        const cards = labels.map((lbl, idx) => ({
          label: lbl,
          itemType: idx === oddIdx ? "acorn" : "leaf",
          variant: "primary"
        }));
        return {
          story: `Three leaves belong together and one does not! Which card is different?`,
          equationHTML: `Odd One = ?`,
          solvedEquationHTML: `Card ${labels[oddIdx]} is an acorn!`,
          answer: labels[oddIdx],
          choices: labels.slice(),
          visualSpec: { type: "sort-odd-one", cards, oddIndex: oddIdx }
        };
      }
      if (kind === "flatShape" || kind === "solidShape") {
        const pool = kind === "flatShape"
          ? [
              { key: "circle", name: "Circle" },
              { key: "triangle", name: "Triangle" },
              { key: "square", name: "Square" },
              { key: "hexagon", name: "Hexagon" }
            ]
          : [
              { key: "sphere", name: "Sphere" },
              { key: "cube", name: "Cube" },
              { key: "cylinder", name: "Cylinder" },
              { key: "cone", name: "Cone" }
            ];
        const s = kPick(pool);
        return {
          story: `Which shape is Pip looking at beside the winter fire?`,
          equationHTML: `Shape = ?`,
          solvedEquationHTML: `It is a ${s.name}!`,
          answer: s.name,
          choices: pool.map((x) => x.name),
          visualSpec: { type: "shapes", shapeKey: s.key, showVertices: kind === "flatShape" }
        };
      }
      if (kind === "balance") {
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
      if (kind === "height") {
        const leftTall = kRandInt(0, 1) === 1;
        const ans = leftTall ? "Cedar" : "Sprout";
        return {
          story: `Which tree in the snow is TALLER?`,
          equationHTML: `Taller = ?`,
          solvedEquationHTML: `${ans} is taller!`,
          answer: ans,
          choices: ["Cedar", "Sprout", "Same Height", "Zero"],
          visualSpec: { type: "height-compare", labelA: "Cedar", heightA: leftTall ? 6 : 2, labelB: "Sprout", heightB: leftTall ? 2 : 6 }
        };
      }
      if (kind === "capacity") {
        const leftBig = kRandInt(0, 1) === 1;
        return {
          story: `Which winter cocoa container holds MORE?`,
          equationHTML: `Holds More = ?`,
          solvedEquationHTML: `Tall Pitcher holds more!`,
          answer: "Tall Pitcher",
          choices: ["Tall Pitcher", "Tiny Mug", "Both Equal", "Empty"],
          visualSpec: {
            type: "capacity-jars",
            leftLabel: leftBig ? "Tall Pitcher" : "Tiny Mug",
            leftFill: leftBig ? 85 : 25,
            rightLabel: leftBig ? "Tiny Mug" : "Tall Pitcher",
            rightFill: leftBig ? 25 : 85
          }
        };
      }
      if (kind === "pattern") {
        return {
          story: `Chant the pattern! What comes next: pinecone, acorn, pinecone, acorn, ...?`,
          equationHTML: `Next = ?`,
          solvedEquationHTML: `Pinecone comes next!`,
          answer: "Pinecone",
          choices: ["Pinecone", "Acorn", "Berry", "Leaf"],
          visualSpec: {
            type: "pattern-row",
            tokens: [{ itemType: "pinecone" }, { itemType: "acorn" }, { itemType: "pinecone" }, { itemType: "acorn" }],
            showQuestion: true
          }
        };
      }
      if (kind === "ordinal") {
        const ordNames = ["", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"];
        const target = kRandInt(4, 8);
        return {
          story: `Count from the left! In what position is the golden daisy?`,
          equationHTML: `Position = ?`,
          solvedEquationHTML: `It is in the ${ordNames[target]} spot!`,
          answer: ordNames[target],
          choices: makeWordChoices(ordNames[target], ordNames.slice(1)),
          visualSpec: { type: "ordinal-line", total: 8, itemType: "daisy", targetIndex: target, showNumbers: false }
        };
      }
      if (kind === "sortMore") {
        const countA = kPick([2, 3, 5, 6]);
        const countB = 8 - countA;
        const items = [
          ...Array(countA).fill({ itemType: "pinecone" }),
          ...Array(countB).fill({ itemType: "leaf" })
        ].sort(() => Math.random() - 0.5);
        const ans = countA > countB ? "Pinecones" : "Leaves";
        return {
          story: `Sort the pinecones and leaves! Which group has MORE?`,
          equationHTML: `More Items = ?`,
          solvedEquationHTML: `${ans} have more!`,
          answer: ans,
          choices: ["Pinecones", "Leaves", "Both Equal", "Zero"],
          visualSpec: { type: "sort-count-groups", items }
        };
      }
      if (kind === "position") {
        const rel = kPick(["above", "below", "beside"]);
        const labelMap = { above: "Above", below: "Below", beside: "Beside" };
        return {
          story: `Where is the ladybug compared to the wooden cube?`,
          equationHTML: `Position = ?`,
          solvedEquationHTML: `The ladybug is ${rel} the cube!`,
          answer: labelMap[rel],
          choices: ["Above", "Below", "Beside", "Inside"],
          visualSpec: { type: "shapes", mode: "position", relation: rel, topItem: "ladybug", baseShape: "cube" }
        };
      }
      if (kind === "measureUnits") {
        const lenA = kRandInt(4, 8);
        return {
          story: `How many green unit blocks long is this cozy log?`,
          equationHTML: `Blocks Long = ?`,
          solvedEquationHTML: `The log is ${lenA} blocks long!`,
          answer: lenA,
          choices: makeNumericChoices(lenA, 2, 10),
          visualSpec: { type: "length-compare", labelA: "Log", lenA, labelB: "" }
        };
      }
      const n = kRandInt(6, 10);
      return {
        story: `Count the scattered berries carefully! How many are there?`,
        equationHTML: `Count = ?`,
        solvedEquationHTML: `There are ${n} berries!`,
        answer: n,
        choices: makeNumericChoices(n, 4, 10),
        visualSpec: { type: "scattered-group", count: n, itemType: "berry", seed: kRandInt(0, 9) }
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
    desc: "Compare sets using 1-to-1 matching: more, fewer, equal, how many more, and number compare.",
    iconKey: "ladybug",
    tabletopTool: "balance",
    isMilestone: false,
    mapPos: { x: 52, y: 65 },
    teacherGuide: {
      script: "Trace the dotted matching lines with a finger: 'Every ladybug has a daisy partner until here—look who has extras left over!'",
      wonder: "Matching partners one-to-one helps children see fairness and difference clearly without guessing.",
      heuristic: "Pairing two rows one-to-one makes 'how many more' and 'how many fewer' concrete before subtracting.",
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
          prompt: "Look at the dotted matching lines: are there more ladybugs, more daisies, or are they Equal?",
          choices: ["More Ladybugs", "More Daisies", "Equal"],
          answer: "Equal",
          coachText: "Yes! Every ladybug has a daisy partner with none left over, so both rows are Equal!",
          solvedEquationHTML: "4 = 4 (Equal)"
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
      if (tier === 3) {
        const askNumCompare = kRandInt(0, 1) === 0;
        if (askNumCompare) {
          const numA = kRandInt(2, 10);
          let numB = kRandInt(2, 10);
          if (numA === numB) numB = numA === 10 ? 7 : numA + 1;
          const askGreater = kRandInt(0, 1) === 1;
          const ans = askGreater ? Math.max(numA, numB) : Math.min(numA, numB);
          return {
            story: `Compare the two numbers without pictures! Which number is ${askGreater ? "GREATER" : "LESS"}?`,
            equationHTML: `${numA} or ${numB} (${askGreater ? "Greater" : "Less"}) = ?`,
            solvedEquationHTML: `${ans} is ${askGreater ? "greater" : "less"}!`,
            answer: ans,
            choices: [numA, numB, "Equal", "Zero"],
            visualSpec: { type: "number-compare", numA, numB }
          };
        }
        const n = kRandInt(4, 9);
        const askMore = kRandInt(0, 1) === 1;
        const ans = askMore ? n + 1 : n - 1;
        return {
          story: `Think along the counting path! What number is ${askMore ? "1 MORE" : "1 LESS"} than ${n}?`,
          equationHTML: `${askMore ? "1 More" : "1 Less"} than ${n} = ?`,
          solvedEquationHTML: `${askMore ? "1 more" : "1 less"} than ${n} is ${ans}!`,
          answer: ans,
          choices: makeNumericChoices(ans, 1, 10),
          visualSpec: { type: "compare-match", topCount: n, bottomCount: Math.max(1, n - 1), topItem: "ladybug", bottomItem: "daisy" }
        };
      }

      const top = tier === 1 ? kRandInt(2, 5) : kRandInt(3, 9);
      let bot = kRandInt(1, tier === 1 ? 5 : 9);
      if (tier >= 2 && top === bot) bot = top > 2 ? top - 1 : top + 1;
      const askType = tier === 1
        ? kPick(["whichMore", "whichFewer"])
        : kPick(["howManyMore", "howManyFewer", "whichFewer"]);

      if (askType === "howManyMore" || askType === "howManyFewer") {
        const diff = Math.abs(top - bot);
        const askMoreDiff = askType === "howManyMore";
        return {
          story: askMoreDiff
            ? `Match the ladybugs and daisies one-to-one. How many MORE are in the bigger row?`
            : `Match them one-to-one. How many FEWER are in the smaller row?`,
          equationHTML: `Difference = ?`,
          solvedEquationHTML: `${diff} ${askMoreDiff ? "more" : "fewer"}!`,
          answer: diff,
          choices: makeNumericChoices(diff, 0, 8),
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
    desc: "Build teen numbers 11 to 20 as 10 and ones, order 11–20, and read number words.",
    iconKey: "daisy",
    tabletopTool: "frames",
    isMilestone: false,
    mapPos: { x: 57, y: 36 },
    teacherGuide: {
      script: "Say: 'Look—the first frame is already a full 10! So start counting from 10: ten... eleven, twelve, thirteen!' Also practice reading number words and ordering to 20.",
      wonder: "Teen numbers aren't random names—they are neatly organized groups of ten with extras beside them.",
      heuristic: "Never count all 14 from 1! Seeing 14 as '10 and 4 more' is the bedrock of place value.",
      handsOn: "Put 10 beans in a cup and 3 beans beside it. Ask: '10 and 3 makes...?' (13!), then line up number cards 11 to 20."
    },
    learnSteps: [
      {
        stageLabel: "Concrete · Step 1 of 3",
        narrative: "One full ten-frame is 10. Add 1 more acorn in the second frame: 10 and 1 makes 11!",
        equationHTML: "10 and 1 make 11",
        visualSpec: { type: "double-ten-frame", count: 11, itemType: "acorn", showLabels: true }
      },
      {
        stageLabel: "Pictorial · Step 2 of 3",
        narrative: "1 full ten-frame and 4 more makes 14! Don’t count from 1—start at 10!",
        equationHTML: "10 and 4 make 14",
        visualSpec: { type: "double-ten-frame", count: 14, itemType: "acorn", showLabels: true },
        checkQuestion: {
          prompt: "What number is 10 and 6 more?",
          choices: [15, 16, 17],
          answer: 16,
          coachText: "Yes! Ten on the left plus 6 more equals 16!",
          solvedEquationHTML: "10 and 6 = 16"
        }
      },
      {
        stageLabel: "Twenty · Step 3 of 3",
        narrative: "Two full ten-frames together make 20! Two tens make twenty.",
        equationHTML: "10 and 10 make 20",
        visualSpec: { type: "double-ten-frame", count: 20, itemType: "acorn", showLabels: true }
      }
    ],
    generateProblem(tier) {
      if (tier === 1) {
        const count = kRandInt(11, 15);
        const item = kPick(["acorn", "berry", "daisy"]);
        return {
          story: `The left ten-frame is full (10). Count on the extra ones on the right—how many in all?`,
          equationHTML: `How many in all? = ?`,
          solvedEquationHTML: `10 and ${count - 10} make ${count}!`,
          answer: count,
          choices: makeNumericChoices(count, 10, 20),
          visualSpec: { type: "double-ten-frame", count, itemType: item, showLabels: false }
        };
      }
      if (tier === 2 && kRandInt(0, 1) === 1) {
        const start = kRandInt(11, 17);
        const stones = [start, start + 1, start + 2, start + 3];
        const missIdx = kRandInt(0, 3);
        const ans = stones[missIdx];
        const displayStones = stones.map((v, idx) => (idx === missIdx ? "?" : v));
        return {
          story: `Read the garden stepping stones in counting order! What number belongs in the ? spot?`,
          equationHTML: `Missing Number = ?`,
          solvedEquationHTML: `${ans} fits right in order!`,
          answer: ans,
          choices: makeNumericChoices(ans, 10, 20),
          visualSpec: { type: "number-compare", mode: "order", stones: displayStones }
        };
      }
      if (tier === 3) {
        const roll = kRandInt(0, 2);
        if (roll === 0) {
          const words = [
            { w: "eleven", n: 11 }, { w: "twelve", n: 12 }, { w: "thirteen", n: 13 },
            { w: "fourteen", n: 14 }, { w: "fifteen", n: 15 }, { w: "sixteen", n: 16 },
            { w: "seventeen", n: 17 }, { w: "eighteen", n: 18 }, { w: "nineteen", n: 19 },
            { w: "twenty", n: 20 }
          ];
          const chosen = kPick(words);
          return {
            story: `Read the garden sign word carefully! Which number does “${chosen.w}” stand for?`,
            equationHTML: `Number Word = ?`,
            solvedEquationHTML: `“${chosen.w}” means ${chosen.n}!`,
            answer: chosen.n,
            choices: makeNumericChoices(chosen.n, 10, 20),
            visualSpec: { type: "number-compare", mode: "word", word: chosen.w }
          };
        }
        if (roll === 1) {
          const base = kRandInt(11, 19);
          const askMore = kRandInt(0, 1) === 1;
          const ans = askMore ? base + 1 : base - 1;
          return {
            story: `Picture the number ${base} on the stepping stones. What number is ${askMore ? "1 MORE" : "1 LESS"} than ${base}?`,
            equationHTML: `${askMore ? "1 More" : "1 Less"} than ${base} = ?`,
            solvedEquationHTML: `${ans} is ${askMore ? "1 more" : "1 less"} than ${base}!`,
            answer: ans,
            choices: makeNumericChoices(ans, 10, 20),
            visualSpec: { type: "number-compare", mode: "order", stones: askMore ? [base, "?"] : ["?", base] }
          };
        }
      }
      const count = kRandInt(11, 20);
      const item = kPick(["acorn", "berry", "daisy"]);
      return {
        story: `Start from the full frame of 10 on the left and count on! How many in all?`,
        equationHTML: `How many in all? = ?`,
        solvedEquationHTML: `10 and ${count - 10} make ${count}!`,
        answer: count,
        choices: makeNumericChoices(count, 10, 20),
        visualSpec: { type: "double-ten-frame", count, itemType: item, showLabels: false }
      };
    }
  },

  {
    id: 9,
    season: "Season III · Spring Blossom",
    unitTag: "Semester B · Unit 8",
    title: "9. The Twin-Oak Number Bonds",
    shortName: "Number Bonds",
    desc: "Break a Whole into two Parts and bring two Parts back together (0 to 10).",
    iconKey: "numberbond",
    tabletopTool: "bonds",
    isMilestone: false,
    mapPos: { x: 63, y: 64 },
    teacherGuide: {
      script: "Use the words WHOLE and PART every time: 'The Whole is 7. One Part is 4. What is the other Part hiding in the oak?'",
      wonder: "Many parts joining into one harmonious whole—and one whole sharing into parts—is a pattern woven throughout the meadow.",
      heuristic: "Number Bonds are the heart of mental math. Mastering bonds of 0–10 unlocks both addition and subtraction together.",
      handsOn: "Hide 6 pennies between your two hands. Open one hand showing 2 pennies (or 0 pennies!) and ask how many are hiding in the other."
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
          answer: 7,
          coachText: "Yes! Parts 4 and 3 join to make the Whole 7!",
          solvedEquationHTML: "4 + 3 = 7"
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
      const whole = tier === 1 ? kRandInt(3, 6) : tier === 2 ? kRandInt(5, 9) : kRandInt(7, 10);
      const partA = tier === 1 ? kRandInt(1, whole - 1) : kRandInt(0, whole);
      const partB = whole - partA;
      const missing = tier === 1 ? "whole" : kPick(["whole", "partA", "partB"]);
      const showDots = tier < 3;
      if (missing === "whole") {
        return {
          story: `One part is ${partA} and the other part is ${partB}. What is the Whole?`,
          equationHTML: `${partA} and ${partB} make ?`,
          solvedEquationHTML: `${partA} and ${partB} make ${whole}!`,
          answer: whole,
          choices: makeNumericChoices(whole, 0, 10),
          visualSpec: { type: "number-bond", whole, partA, partB, missing: "whole", showDots }
        };
      }
      if (missing === "partA") {
        return {
          story: `The Whole is ${whole}, and one Part is ${partB}. What is the missing Part?`,
          equationHTML: `? and ${partB} make ${whole}`,
          solvedEquationHTML: `${partA} and ${partB} make ${whole}!`,
          answer: partA,
          choices: makeNumericChoices(partA, 0, 10),
          visualSpec: { type: "number-bond", whole, partA, partB, missing: "partA", showDots }
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
    desc: "Tell addition stories with + and =, and count on from the larger number.",
    iconKey: "honeyjar",
    tabletopTool: "addsub",
    isMilestone: false,
    mapPos: { x: 68, y: 35 },
    teacherGuide: {
      script: "Say: 'Plus (+) means putting parts together. Always start at the BIGGER number and hop forward on the stones!'",
      wonder: "Watching bees gather nectar together into one golden hive shows cheerful cooperation.",
      heuristic: "Starting from the LARGER addend (for 2 + 6, start at 6 and hop +2!) makes addition fast and accurate.",
      handsOn: "Place 5 spoons under a napkin and 2 beside it. Say '5... 6, 7!' without peeking underneath."
    },
    learnSteps: [
      {
        stageLabel: "Concrete · Step 1 of 3",
        narrative: "3 berries on top and 2 more berries join in the ten-frame! 3 + 2 = 5.",
        equationHTML: "3 + 2 = 5",
        visualSpec: { type: "ten-frame", count: 5, itemType: "berry", partA: 3 }
      },
      {
        stageLabel: "Counting On · Step 2 of 3",
        narrative: "Start at 5 on the stepping stones and hop forward 2 steps: 6, 7!",
        equationHTML: "5 + 2 = 7",
        visualSpec: { type: "count-path", start: 5, jump: 2, direction: "forward", revealEnd: true },
        checkQuestion: {
          prompt: "Start at 5 and hop +2 forward. Where do you land?",
          choices: [6, 7, 8],
          answer: 7,
          coachText: "Yes! Start at 5 and hop two stones forward: 6, 7!",
          solvedEquationHTML: "5 + 2 = 7"
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
      const nounSing = { honeyjar: "honey jar", berry: "berry", daisy: "daisy" };
      const nounPlur = { honeyjar: "honey jars", berry: "berries", daisy: "daisies" };
      const fmtItem = (item, n) => `${n} ${n === 1 ? nounSing[item] : nounPlur[item]}`;
      if (tier === 1) {
        const a = kRandInt(1, 4);
        const b = kRandInt(1, 5 - a);
        const total = a + b;
        const item = kPick(["honeyjar", "berry", "daisy"]);
        return {
          story: `Pip gathers ${fmtItem(item, a)} and then finds ${b} more. How many altogether?`,
          equationHTML: `${a} + ${b} = ?`,
          solvedEquationHTML: `${a} + ${b} = ${total}`,
          answer: total,
          choices: makeNumericChoices(total, 2, 10),
          visualSpec: { type: "ten-frame", count: total, itemType: item, partA: a }
        };
      }
      if (tier === 2 && kRandInt(0, 1) === 1) {
        const start = kRandInt(4, 7);
        const jump = kRandInt(1, Math.min(3, 10 - start));
        const total = start + jump;
        return {
          story: `Pip stands on stone ${start} and hops ${jump} ${jump === 1 ? "step" : "steps"} forward. What is ${start} + ${jump}?`,
          equationHTML: `${start} + ${jump} = ?`,
          solvedEquationHTML: `${start} + ${jump} = ${total}`,
          answer: total,
          choices: makeNumericChoices(total, 2, 10),
          visualSpec: { type: "count-path", start, jump, direction: "forward", revealEnd: false }
        };
      }
      if (tier === 3 && kRandInt(0, 1) === 1) {
        const smaller = kRandInt(1, 3);
        const larger = kRandInt(5, 10 - smaller);
        const total = smaller + larger;
        return {
          story: `For ${smaller} + ${larger}, start at the LARGER number ${larger} and hop ${smaller} ${smaller === 1 ? "step" : "steps"} forward! What is ${smaller} + ${larger}?`,
          equationHTML: `${smaller} + ${larger} = ?`,
          solvedEquationHTML: `${larger} + ${smaller} = ${total}`,
          answer: total,
          choices: makeNumericChoices(total, 2, 10),
          visualSpec: { type: "count-path", start: larger, jump: smaller, direction: "forward", revealEnd: false }
        };
      }
      const a = kRandInt(2, 7);
      const b = kRandInt(1, 10 - a);
      const total = a + b;
      const item = kPick(["honeyjar", "berry", "daisy"]);
      return {
        story: `Pip gathers ${fmtItem(item, a)} and adds ${b} more. How many in all?`,
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
    desc: "Subtract by crossing out, counting back, subtracting 0, and taking apart Number Bonds.",
    iconKey: "apple",
    tabletopTool: "addsub",
    isMilestone: false,
    mapPos: { x: 73, y: 64 },
    teacherGuide: {
      script: "Read the equation as a story: 'We started with 7 apples, 2 were eaten (crossed out), how many are still left?'",
      wonder: "Taking away and sharing cleanly teaches that subtraction simply reveals the other part of a Number Bond.",
      heuristic: "Connect subtraction directly to Number Bonds: if 4 and 5 make 9, then 9 − 4 = 5!",
      handsOn: "Put 6 crackers on a plate. Eat 2 crackers (or eat 0!) and ask how many remain."
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
        visualSpec: { type: "count-path", start: 7, jump: 2, direction: "backward", revealEnd: true },
        checkQuestion: {
          prompt: "Start at 7 and hop 2 stones backward. Where do you land?",
          choices: [4, 5, 6],
          answer: 5,
          coachText: "Yes! Hop back 2 steps from 7: 6, then 5!",
          solvedEquationHTML: "7 − 2 = 5"
        }
      },
      {
        stageLabel: "Take Apart · Step 3 of 3",
        narrative: "Subtraction also finds a missing part in a Number Bond: if the whole is 9 and one part is 4, 9 − 4 = 5.",
        equationHTML: "9 − 4 = 5",
        visualSpec: { type: "number-bond", whole: 9, partA: 4, partB: 5, missing: "partB", showDots: true }
      }
    ],
    generateProblem(tier) {
      if (tier === 2 && kRandInt(0, 2) === 0) {
        const start = kRandInt(4, 9);
        const jump = kRandInt(1, Math.min(3, start - 1));
        const rem = start - jump;
        return {
          story: `Pip starts on stone ${start} and hops ${jump} ${jump === 1 ? "step" : "steps"} backward. What is ${start} − ${jump}?`,
          equationHTML: `${start} − ${jump} = ?`,
          solvedEquationHTML: `${start} − ${jump} = ${rem}`,
          answer: rem,
          choices: makeNumericChoices(rem, 0, 9),
          visualSpec: { type: "count-path", start, jump, direction: "backward", revealEnd: false }
        };
      }
      if (tier === 3) {
        const roll = kRandInt(0, 2);
        if (roll === 0) {
          const whole = kRandInt(6, 10);
          const partA = kRandInt(1, whole - 1);
          const partB = whole - partA;
          return {
            story: `Use the Number Bond! The whole is ${whole} and one part is ${partA}. What is ${whole} − ${partA}?`,
            equationHTML: `${whole} − ${partA} = ?`,
            solvedEquationHTML: `${whole} − ${partA} = ${partB}`,
            answer: partB,
            choices: makeNumericChoices(partB, 0, 10),
            visualSpec: { type: "number-bond", whole, partA, partB, missing: "partB", showDots: false }
          };
        }
        if (roll === 1) {
          const whole = kRandInt(4, 10);
          const subZero = kRandInt(0, 1) === 0;
          const take = subZero ? 0 : whole;
          const rem = whole - take;
          return {
            story: subZero
              ? `Pip had ${whole} apples and ate NONE (0). How many apples are left?`
              : `Pip had ${whole} apples and shared ALL ${whole} with friends. How many are left?`,
            equationHTML: `${whole} − ${take} = ?`,
            solvedEquationHTML: `${whole} − ${take} = ${rem}`,
            answer: rem,
            choices: makeNumericChoices(rem, 0, 10),
            visualSpec: { type: "ten-frame", count: whole, itemType: "apple", partA: whole, crossOut: take }
          };
        }
      }
      const whole = tier === 1 ? kRandInt(3, 5) : kRandInt(6, 10);
      const take = kRandInt(1, whole - 1);
      const rem = whole - take;
      return {
        story: `There were ${whole} apples, and ${take} ${take === 1 ? "was" : "were"} crossed out. How many are left?`,
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
    desc: "Show off comparing, teen numbers, Number Bonds, addition, and subtraction within 10!",
    iconKey: "daisy",
    tabletopTool: "bonds",
    isMilestone: true,
    mapPos: { x: 77, y: 36 },
    teacherGuide: {
      script: "Celebrate your child's Spring mastery! Mix comparisons, teen frames, Number Bonds, addition, and subtraction together.",
      wonder: "Spring blossoms open in order—first buds, then petals, then fruit. Learning follows gentle seasons too.",
      heuristic: "Connecting addition and subtraction back to Number Bonds makes mental math fluent and joyful.",
      handsOn: "Play 'Make 10 High Five'—call out 6 and your child holds up 4 fingers to make 10!"
    },
    learnSteps: [
      {
        stageLabel: "Review · Step 1 of 3",
        narrative: "Teens are 10 and some more! Here is 10 and 5 = 15.",
        equationHTML: "10 + 5 = 15",
        visualSpec: { type: "double-ten-frame", count: 15, itemType: "daisy", showLabels: true }
      },
      {
        stageLabel: "Review · Step 2 of 3",
        narrative: "Number Bonds connect + and −: if 4 and 6 make 10, then 10 − 4 = 6!",
        equationHTML: "4 + 6 = 10",
        visualSpec: { type: "number-bond", whole: 10, partA: 4, partB: 6, missing: "none", showDots: true },
        checkQuestion: {
          prompt: "Look at this Number Bond: 4 and 6 make 10. What is 10 − 4?",
          choices: [4, 5, 6],
          answer: 6,
          coachText: "Yes! Because 4 and 6 make 10, taking 4 away leaves 6!",
          solvedEquationHTML: "10 − 4 = 6"
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
      if (tier === 1) {
        const kind = kPick(["compare", "teen", "bond", "add"]);
        if (kind === "compare") {
          const a = kRandInt(2, 5);
          let b = kRandInt(2, 5);
          if (a === b) b = a === 5 ? 3 : a + 1;
          const ans = a > b ? "Ladybugs" : "Daisies";
          return {
            story: `Match them one-to-one. Which group has MORE?`,
            equationHTML: `More = ?`,
            solvedEquationHTML: `${ans} have more!`,
            answer: ans,
            choices: ["Ladybugs", "Daisies", "Equal", "Neither"],
            visualSpec: { type: "compare-match", topCount: a, bottomCount: b, topItem: "ladybug", bottomItem: "daisy" }
          };
        }
        if (kind === "teen") {
          const n = kRandInt(11, 15);
          return {
            story: `10 daisies on the left and ${n - 10} on the right. How many altogether?`,
            equationHTML: `How many in all? = ?`,
            solvedEquationHTML: `10 + ${n - 10} = ${n}`,
            answer: n,
            choices: makeNumericChoices(n, 10, 20),
            visualSpec: { type: "double-ten-frame", count: n, itemType: "daisy", showLabels: false }
          };
        }
        if (kind === "bond") {
          const w = 5;
          const a = kRandInt(1, 4);
          return {
            story: `The Whole is ${w} and one Part is ${a}. What is the missing Part?`,
            equationHTML: `${a} and ? make ${w}`,
            solvedEquationHTML: `${a} and ${w - a} make ${w}!`,
            answer: w - a,
            choices: makeNumericChoices(w - a, 0, 6),
            visualSpec: { type: "number-bond", whole: w, partA: a, partB: w - a, missing: "partB", showDots: true }
          };
        }
        const a = kRandInt(1, 3);
        const b = kRandInt(1, 5 - a);
        return {
          story: `${a} ${a === 1 ? "berry" : "berries"} and ${b} more ${b === 1 ? "berry" : "berries"}. How many altogether?`,
          equationHTML: `${a} + ${b} = ?`,
          solvedEquationHTML: `${a} + ${b} = ${a + b}`,
          answer: a + b,
          choices: makeNumericChoices(a + b, 1, 6),
          visualSpec: { type: "ten-frame", count: a + b, itemType: "berry", partA: a }
        };
      }

      if (tier === 2) {
        const kind = kPick(["diff", "order", "bond", "sub"]);
        if (kind === "diff") {
          const a = kRandInt(5, 9);
          const b = kRandInt(2, a - 1);
          const diff = a - b;
          return {
            story: `Match the ladybugs and daisies one-to-one. How many MORE ladybugs are there?`,
            equationHTML: `How Many More = ?`,
            solvedEquationHTML: `${diff} more!`,
            answer: diff,
            choices: makeNumericChoices(diff, 0, 8),
            visualSpec: { type: "compare-match", topCount: a, bottomCount: b, topItem: "ladybug", bottomItem: "daisy" }
          };
        }
        if (kind === "order") {
          const s = kRandInt(12, 17);
          const stones = [s, s + 1, "?", s + 3];
          return {
            story: `What number goes on the blank stone in counting order?`,
            equationHTML: `Missing Stone = ?`,
            solvedEquationHTML: `${s + 2} goes between ${s + 1} and ${s + 3}!`,
            answer: s + 2,
            choices: makeNumericChoices(s + 2, 10, 20),
            visualSpec: { type: "number-compare", mode: "order", stones }
          };
        }
        if (kind === "bond") {
          const w = kRandInt(6, 9);
          const a = kRandInt(1, w - 1);
          return {
            story: `The Whole is ${w} and one Part is ${a}. What is the missing Part?`,
            equationHTML: `${a} + ? = ${w}`,
            solvedEquationHTML: `${a} + ${w - a} = ${w}`,
            answer: w - a,
            choices: makeNumericChoices(w - a, 0, 10),
            visualSpec: { type: "number-bond", whole: w, partA: a, partB: w - a, missing: "partB", showDots: true }
          };
        }
        const w = kRandInt(6, 9);
        const t = kRandInt(1, w - 1);
        return {
          story: `${w} apples, and ${t} ${t === 1 ? "is" : "are"} crossed out. How many remain?`,
          equationHTML: `${w} − ${t} = ?`,
          solvedEquationHTML: `${w} − ${t} = ${w - t}`,
          answer: w - t,
          choices: makeNumericChoices(w - t, 0, 9),
          visualSpec: { type: "ten-frame", count: w, itemType: "apple", partA: w, crossOut: t }
        };
      }

      const kind = kPick(["word", "bond", "addPath", "subBond"]);
      if (kind === "word") {
        const words = [
          { w: "twelve", n: 12 }, { w: "fifteen", n: 15 },
          { w: "eighteen", n: 18 }, { w: "twenty", n: 20 }
        ];
        const c = kPick(words);
        return {
          story: `Read the garden sign! Which number does “${c.w}” mean?`,
          equationHTML: `Word = ?`,
          solvedEquationHTML: `“${c.w}” = ${c.n}!`,
          answer: c.n,
          choices: makeNumericChoices(c.n, 10, 20),
          visualSpec: { type: "number-compare", mode: "word", word: c.w }
        };
      }
      if (kind === "bond") {
        const w = 10;
        const a = kRandInt(1, 9);
        return {
          story: `Make 10 without dots! ? and ${10 - a} make 10. What is the missing Part?`,
          equationHTML: `? + ${10 - a} = 10`,
          solvedEquationHTML: `${a} + ${10 - a} = 10`,
          answer: a,
          choices: makeNumericChoices(a, 0, 10),
          visualSpec: { type: "number-bond", whole: w, partA: a, partB: 10 - a, missing: "partA", showDots: false }
        };
      }
      if (kind === "addPath") {
        const start = kRandInt(5, 7);
        const jump = kRandInt(2, 10 - start);
        return {
          story: `Hop forward on the stones! What is ${start} + ${jump}?`,
          equationHTML: `${start} + ${jump} = ?`,
          solvedEquationHTML: `${start} + ${jump} = ${start + jump}`,
          answer: start + jump,
          choices: makeNumericChoices(start + jump, 2, 10),
          visualSpec: { type: "count-path", start, jump, direction: "forward", revealEnd: false }
        };
      }
      const w = kRandInt(7, 10);
      const a = kRandInt(2, w - 2);
      return {
        story: `Use the Number Bond! What is ${w} − ${a}?`,
        equationHTML: `${w} − ${a} = ?`,
        solvedEquationHTML: `${w} − ${a} = ${w - a}`,
        answer: w - a,
        choices: makeNumericChoices(w - a, 0, 10),
        visualSpec: { type: "number-bond", whole: w, partA: a, partB: w - a, missing: "partB", showDots: false }
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
    desc: "Choose + or − from the story, solve without sign hints, and build fact families.",
    iconKey: "honeyjar",
    tabletopTool: "addsub",
    isMilestone: false,
    mapPos: { x: 82, y: 66 },
    teacherGuide: {
      script: "Before tapping an answer, ask: 'Are we getting MORE altogether, or taking some AWAY?' Let the story tell you whether to + or −!",
      wonder: "Story problems train children to listen carefully and think truthfully about what happens.",
      heuristic: "Distinguishing joining stories (+) from take-away stories (−) keeps children from guessing blindly from numbers alone.",
      handsOn: "Act out real snack stories at lunch: 'You have 4 grapes and get 3 more' vs. 'You have 7 grapes and eat 2.'"
    },
    learnSteps: [
      {
        stageLabel: "Joining Story · Step 1 of 3",
        narrative: "When more come to join the basket, the group gets bigger—we ADD (+): 4 + 3 = 7!",
        equationHTML: "4 + 3 = 7",
        visualSpec: { type: "story-scene", countA: 4, itemA: "berry", labelA: "In Basket (4)", countB: 3, itemB: "berry", labelB: "3 More Join" }
      },
      {
        stageLabel: "Take-Away Story · Step 2 of 3",
        narrative: "When some are eaten or fly away, we SUBTRACT (−): 8 − 3 = 5!",
        equationHTML: "8 − 3 = 5",
        visualSpec: { type: "story-scene", countA: 8, itemA: "apple", labelA: "At Start (8)", countB: 3, itemB: "apple", labelB: "3 Eaten" },
        checkQuestion: {
          prompt: "Pip had 8 apples and 3 were eaten. Should we Add (+) or Subtract (−)?",
          choices: ["Add (+)", "Subtract (−)"],
          answer: "Subtract (−)",
          coachText: "Right! Eating 3 apples takes them away, so we Subtract (−)!",
          solvedEquationHTML: "8 − 3 = 5"
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
      if (tier === 1) {
        if (isAdd) {
          const a = kRandInt(2, 5);
          const b = kRandInt(1, Math.min(4, 9 - a));
          const tot = a + b;
          const correctEq = `${a} + ${b} = ${tot}`;
          const eqPool = [`${a} + ${b} = ${tot}`, `${a} − ${b} = ${a - b}`, `${tot} − ${a} = ${b}`, `${a} + ${b + 1} = ${tot + 1}`];
          const choices = Array.from(new Set(eqPool));
          while (choices.length < 4) choices.push(`${a + 1} + ${b} = ${tot + 1}`);
          return {
            story: `Pip had ${a} honey jars and packed ${b} MORE into the picnic basket. Which number sentence matches the story?`,
            equationHTML: `Choose Equation = ?`,
            solvedEquationHTML: `${correctEq}!`,
            answer: correctEq,
            choices: choices.sort(() => Math.random() - 0.5),
            visualSpec: { type: "story-scene", countA: a, itemA: "honeyjar", labelA: `At First (${a})`, countB: b, itemB: "honeyjar", labelB: `${b} More Join` }
          };
        }
        const whole = kRandInt(5, 9);
        const take = kRandInt(1, whole - 1);
        const rem = whole - take;
        const correctEq = `${whole} − ${take} = ${rem}`;
        const eqPool = [`${whole} − ${take} = ${rem}`, `${whole} + ${take} = ${whole + take}`, `${whole} − ${Math.max(0, take - 1)} = ${whole - Math.max(0, take - 1)}`, `${take} + ${whole} = ${whole + take}`];
        const choices = Array.from(new Set(eqPool));
        while (choices.length < 4) choices.push(`${whole - 1} − ${take} = ${Math.max(0, rem - 1)}`);
        return {
          story: `Pip brought ${whole} berries and shared ${take} with owl. Which number sentence tells how many are left?`,
          equationHTML: `Choose Equation = ?`,
          solvedEquationHTML: `${correctEq}!`,
          answer: correctEq,
          choices: choices.slice(0, 4).sort(() => Math.random() - 0.5),
          visualSpec: { type: "story-scene", countA: whole, itemA: "berry", labelA: `At Start (${whole})`, countB: take, itemB: "berry", labelB: `${take} Shared` }
        };
      }

      if (tier === 2) {
        if (isAdd) {
          const a = kRandInt(3, 6);
          const b = kRandInt(1, 10 - a);
          return {
            story: `Pip packed ${a} honey jars and found ${b} more on the porch. How many honey jars altogether?`,
            equationHTML: `How many now? = ?`,
            solvedEquationHTML: `${a} + ${b} = ${a + b}`,
            answer: a + b,
            choices: makeNumericChoices(a + b, 2, 10),
            visualSpec: { type: "story-scene", countA: a, itemA: "honeyjar", labelA: `In Basket (${a})`, countB: b, itemB: "honeyjar", labelB: `${b} More` }
          };
        }
        const whole = kRandInt(6, 10);
        const take = kRandInt(1, whole - 1);
        return {
          story: `There were ${whole} berries on the cloth, and ${take} were eaten! How many berries are left?`,
          equationHTML: `How many now? = ?`,
          solvedEquationHTML: `${whole} − ${take} = ${whole - take}`,
          answer: whole - take,
          choices: makeNumericChoices(whole - take, 0, 9),
          visualSpec: { type: "story-scene", countA: whole, itemA: "berry", labelA: `At Start (${whole})`, countB: take, itemB: "berry", labelB: `${take} Eaten` }
        };
      }

      // Tier 3: Fact-family link or missing-change word story
      if (kRandInt(0, 1) === 0) {
        const a = kRandInt(2, 6);
        const b = kRandInt(1, 10 - a);
        const whole = a + b;
        const correctEq = `${whole} − ${a} = ${b}`;
        const distractors = [`${whole} + ${a} = ${whole + a}`, `${a} − ${b} = ${Math.abs(a - b)}`, `${whole} − ${a === 1 ? 2 : a - 1} = ${whole - (a === 1 ? 2 : a - 1)}`];
        const choices = Array.from(new Set([correctEq, ...distractors]));
        while (choices.length < 4) choices.push(`${whole} − 0 = ${whole}`);
        return {
          story: `Look at the Number Bond: ${a} + ${b} = ${whole}. Which subtraction sentence belongs to the SAME fact family?`,
          equationHTML: `Fact Family = ?`,
          solvedEquationHTML: `${correctEq}!`,
          answer: correctEq,
          choices: choices.slice(0, 4).sort(() => Math.random() - 0.5),
          visualSpec: { type: "number-bond", whole, partA: a, partB: b, missing: "none", showDots: false }
        };
      }
      const whole = kRandInt(6, 10);
      const a = kRandInt(2, whole - 2);
      const b = whole - a;
      return {
        story: isAdd
          ? `Pip had ${a} daisies in a basket, picked some more, and now has ${whole} daisies! How many did Pip pick?`
          : `Pip brought ${whole} apples, gave some to friends, and still has ${a} left. How many did Pip give away?`,
        equationHTML: isAdd ? `${a} + ? = ${whole}` : `${whole} − ? = ${a}`,
        solvedEquationHTML: isAdd ? `${a} + ${b} = ${whole}` : `${whole} − ${b} = ${a}`,
        answer: b,
        choices: makeNumericChoices(b, 0, 10),
        visualSpec: { type: "number-bond", whole, partA: a, partB: b, missing: "partB", showDots: false }
      };
    }
  },

  {
    id: 14,
    season: "Season IV · Summer Meadow",
    unitTag: "Semester B · Unit 12",
    title: "14. A Hundred Meadow Stars",
    shortName: "Numbers to 100",
    desc: "Count by 10s to 100, skip-count by 5s, and build two-digit numbers with tens and ones.",
    iconKey: "acorn",
    tabletopTool: "timecoins",
    isMilestone: false,
    mapPos: { x: 86, y: 36 },
    teacherGuide: {
      script: "Count the baskets by tens first: '10, 20, 30, 40...' then count the loose acorns by ones—even all the way up to 9 loose ones and 100!",
      wonder: "Grouping into tens and fives makes large numbers calm and easy to see—like stars gathered into constellations.",
      heuristic: "Skip-counting by 10s and 5s up to 100 prepares Kindergarteners for place value and mental math in Grade 1.",
      handsOn: "Bundle 10 craft sticks with rubber bands. Count 6 bundles of 10 (60) and 8 loose sticks (68)."
    },
    learnSteps: [
      {
        stageLabel: "Counting by 10s · Step 1 of 4",
        narrative: "Each basket holds 10 acorns! Count by tens: 10, 20, 30!",
        equationHTML: "3 Tens = 30",
        visualSpec: { type: "tens-ones-100", tens: 3, ones: 0 }
      },
      {
        stageLabel: "Tens & Ones · Step 2 of 4",
        narrative: "4 baskets of 10 (forty) and 2 loose acorns makes 42!",
        equationHTML: "40 and 2 = 42",
        visualSpec: { type: "tens-ones-100", tens: 4, ones: 2 },
        checkQuestion: {
          prompt: "Count by 10s: what number is 5 baskets of 10?",
          choices: [40, 50, 60],
          answer: 50,
          coachText: "Yes! Count 10, 20, 30, 40, 50!",
          solvedEquationHTML: "5 Tens = 50"
        }
      },
      {
        stageLabel: "Counting by 5s · Step 3 of 4",
        narrative: "We can also skip-count bunches of 5 berries: 5, 10, 15, 20!",
        equationHTML: "4 Fives = 20",
        visualSpec: { type: "skip-count-5s", groups: 4 }
      },
      {
        stageLabel: "All the Way to 100 · Step 4 of 4",
        narrative: "Ten baskets of 10 acorns make ONE HUNDRED (100)!",
        equationHTML: "10 Tens = 100",
        visualSpec: { type: "tens-ones-100", tens: 10, ones: 0 }
      }
    ],
    generateProblem(tier) {
      if (tier === 1) {
        const tens = kRandInt(2, 10);
        const val = tens * 10;
        const tensChoices = [20, 30, 40, 50, 60, 70, 80, 90, 100]
          .filter((v) => v !== val)
          .sort(() => Math.random() - 0.5)
          .slice(0, 3);
        return {
          story: `Count the baskets of 10 acorns by tens! How many acorns in all?`,
          equationHTML: `Count by 10s = ?`,
          solvedEquationHTML: `${tens} Tens = ${val}!`,
          answer: val,
          choices: [val, ...tensChoices].sort((a, b) => a - b),
          visualSpec: { type: "tens-ones-100", tens, ones: 0 }
        };
      }
      if (tier === 2 && kRandInt(0, 1) === 1) {
        const groups = kRandInt(3, 10);
        const total = groups * 5;
        return {
          story: `Skip-count by 5s for every bunch of berries! 5, 10, 15... How many berries in all?`,
          equationHTML: `Count by 5s = ?`,
          solvedEquationHTML: `${groups} fives make ${total}!`,
          answer: total,
          choices: makeNumericChoices(total, 10, 60),
          visualSpec: { type: "skip-count-5s", groups }
        };
      }
      if (tier === 3 && kRandInt(0, 2) === 0) {
        const groups = kRandInt(6, 12);
        const total = groups * 5;
        return {
          story: `Count the bunches by 5s! How many berries altogether?`,
          equationHTML: `Skip-Count 5s = ?`,
          solvedEquationHTML: `${groups} fives = ${total}!`,
          answer: total,
          choices: makeNumericChoices(total, 20, 75),
          visualSpec: { type: "skip-count-5s", groups }
        };
      }
      const tens = kRandInt(2, tier === 2 ? 7 : 9);
      const ones = tier === 2 ? kRandInt(1, 5) : kRandInt(6, 9);
      const total = tens * 10 + ones;
      return {
        story: `Count the full baskets of 10 first, then keep counting the loose acorns by ones! What number is this?`,
        equationHTML: `Tens &amp; Ones = ?`,
        solvedEquationHTML: `${tens} tens and ${ones} ones = ${total}!`,
        answer: total,
        choices: makeNumericChoices(total, 15, 99),
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
    desc: "Order morning, afternoon, and night, and read analog clocks to the exact hour.",
    iconKey: "clock",
    tabletopTool: "timecoins",
    isMilestone: false,
    mapPos: { x: 90, y: 65 },
    teacherGuide: {
      script: "Point to the hands: 'The SHORT hand points to the hour. When the LONG minute hand points straight up to 12, we say o'clock!'",
      wonder: "The sun, moon, and gentle clocks mark days and seasons into peaceful daily rhythms of work and rest.",
      heuristic: "Kindergarten time builds intuition for morning/afternoon/night and exact o'clock hours.",
      handsOn: "Notice when the family clock hits 8:00 for morning lessons, 12:00 for lunch, and 7:00 for bedtime stories."
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
        narrative: "Every day follows an orderly rhythm: sunrise begins the morning, bright high sun is afternoon, and stars bring night!",
        equationHTML: "Morning · Afternoon · Night",
        visualSpec: { type: "daily-routine", phase: "morning" },
        checkQuestion: {
          prompt: "When the sun first rises for breakfast, what part of the day is it?",
          choices: ["Morning", "Afternoon", "Night"],
          answer: "Morning",
          coachText: "Yes! Sunrise starts the fresh Morning!",
          solvedEquationHTML: "Sunrise = Morning"
        }
      },
      {
        stageLabel: "Reading Hours · Step 3 of 3",
        narrative: "When the short hand points to 7 and the long hand is on 12, it is 7 o’clock!",
        equationHTML: "7:00 (Evening)",
        visualSpec: { type: "clock-hour", hour: 7, minutes: 0, skyPhase: "Evening Lanterns" }
      }
    ],
    generateProblem(tier) {
      if (tier === 1 && kRandInt(0, 1) === 0) {
        const phases = [
          { p: "morning", ans: "Morning", story: "Look at the garden sky! When we eat breakfast at sunrise, what time of day is it?" },
          { p: "afternoon", ans: "Afternoon", story: "The sun is high and bright for garden play! What part of the day is it?" },
          { p: "night", ans: "Night", story: "Stars and a crescent moon shine over the quiet meadow. What time of day is it?" }
        ];
        const chosen = kPick(phases);
        return {
          story: chosen.story,
          equationHTML: `Time of Day = ?`,
          solvedEquationHTML: `It is ${chosen.ans}!`,
          answer: chosen.ans,
          choices: ["Morning", "Afternoon", "Night", "Noon"],
          visualSpec: { type: "daily-routine", phase: chosen.p }
        };
      }
      if (tier === 3 && kRandInt(0, 1) === 1) {
        const hour = kRandInt(1, 12);
        const nextHour = hour === 12 ? 1 : hour + 1;
        const ans = `${nextHour}:00`;
        const opts = new Set([ans]);
        while (opts.size < 4) opts.add(`${kRandInt(1, 12)}:00`);
        return {
          story: `The garden clock shows ${hour}:00 right now. What time will it be 1 HOUR LATER?`,
          equationHTML: `1 Hour Later = ?`,
          solvedEquationHTML: `One hour after ${hour}:00 is ${ans}!`,
          answer: ans,
          choices: Array.from(opts).sort((a, b) => parseInt(a, 10) - parseInt(b, 10)),
          visualSpec: { type: "clock-hour", hour, minutes: 0, skyPhase: "Garden Clock" }
        };
      }
      const hour = tier === 1 ? kPick([2, 3, 4, 6, 9]) : kRandInt(1, 12);
      const ans = `${hour}:00`;
      const others = new Set([ans]);
      while (others.size < 4) {
        others.add(`${kRandInt(1, 12)}:00`);
      }
      const sorted = Array.from(others).sort((a, b) => parseInt(a, 10) - parseInt(b, 10));
      return {
        story: `Look closely at the short hour hand. What time does the garden clock show?`,
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
    desc: "Identify penny (1¢), nickel (5¢), dime (10¢), and quarter (25¢) by look and count cents.",
    iconKey: "coin",
    tabletopTool: "timecoins",
    isMilestone: false,
    mapPos: { x: 93, y: 38 },
    teacherGuide: {
      script: "Look at size, color, and edge: 'Copper penny is 1¢, smooth silver nickel is 5¢, TINY ridged dime is 10¢, and big ridged quarter is 25¢!'",
      wonder: "Counting coins carefully builds real-world stewardship for farmers' markets and generous giving.",
      heuristic: "Children first recognize coins by real visual traits (not printed text!), then skip-count nickels by 5s and dimes by 10s.",
      handsOn: "Dump real pennies, nickels, dimes, and quarters on the table, sort them without magnifying glasses, and count matching stacks."
    },
    learnSteps: [
      {
        stageLabel: "Penny & Nickel · Step 1 of 4",
        narrative: "A copper Penny is worth 1¢! Next to it, a smooth silver Nickel is larger and worth 5¢.",
        equationHTML: "Penny = 1¢ · Nickel = 5¢",
        visualSpec: { type: "coins", coins: [1, 5], showLabels: true },
        checkQuestion: {
          prompt: "How many cents is ONE smooth silver Nickel worth?",
          choices: ["1¢", "5¢", "10¢"],
          answer: "5¢",
          coachText: "Yes! A Nickel is 5¢—the same as 5 copper pennies!",
          solvedEquationHTML: "Nickel = 5¢"
        }
      },
      {
        stageLabel: "Tiny Dimes · Step 2 of 4",
        narrative: "A Dime is our tiniest silver coin with a ridged rim—yet it is worth 10¢! Count two dimes: 10¢, 20¢.",
        equationHTML: "2 Dimes = 20¢",
        visualSpec: { type: "coins", coins: [10, 10], showLabels: true },
        checkQuestion: {
          prompt: "How many cents is ONE tiny silver Dime worth?",
          choices: ["5¢", "10¢", "25¢"],
          answer: "10¢",
          coachText: "Right! Small in size, big in value—one Dime is 10¢!",
          solvedEquationHTML: "Dime = 10¢"
        }
      },
      {
        stageLabel: "The Big Quarter · Step 3 of 4",
        narrative: "Our largest coin in the coin pouch is the Quarter! One Quarter is worth 25¢.",
        equationHTML: "Quarter = 25¢",
        visualSpec: { type: "coins", coins: [25], showLabels: true }
      },
      {
        stageLabel: "Counting Coins · Step 4 of 4",
        narrative: "Start counting from the coin worth the most: 1 dime (10¢) and 2 pennies is 10¢, 11¢, 12¢!",
        equationHTML: "10¢ + 2¢ = 12¢",
        visualSpec: { type: "coins", coins: [10, 1, 1], showLabels: true }
      }
    ],
    generateProblem(tier) {
      if (tier === 1) {
        const val = kPick([1, 5, 10, 25]);
        const nameMap = { 1: "Penny (1¢)", 5: "Nickel (5¢)", 10: "Dime (10¢)", 25: "Quarter (25¢)" };
        return {
          story: `Look closely at this coin’s color and size! Which coin is it?`,
          equationHTML: `Identify Coin = ?`,
          solvedEquationHTML: `It is a ${nameMap[val]}!`,
          answer: nameMap[val],
          choices: ["Penny (1¢)", "Nickel (5¢)", "Dime (10¢)", "Quarter (25¢)"],
          visualSpec: { type: "coins", coins: [val], showLabels: false }
        };
      }
      if (tier === 2) {
        const likeCombos = [
          [1, 1, 1],
          [1, 1, 1, 1, 1],
          [5, 5],
          [5, 5, 5],
          [10, 10],
          [10, 10, 10]
        ];
        const coins = kPick(likeCombos);
        const total = coins.reduce((a, b) => a + b, 0);
        return {
          story: `Count these matching coins! How many cents altogether?`,
          equationHTML: `Total Cents = ?`,
          solvedEquationHTML: `Total = ${total}¢`,
          answer: total,
          choices: makeNumericChoices(total, 1, 35),
          visualSpec: { type: "coins", coins, showLabels: false }
        };
      }
      const combos = [
        [10, 5],
        [10, 1, 1, 1],
        [5, 5, 1, 1],
        [10, 10, 5],
        [25, 1],
        [25, 5],
        [25, 10],
        [10, 5, 1, 1]
      ];
      const coins = kPick(combos);
      const total = coins.reduce((a, b) => a + b, 0);
      return {
        story: `Start from the largest-value coin and count on! How many cents in all?`,
        equationHTML: `Total Cents = ?`,
        solvedEquationHTML: `Total = ${total}¢`,
        answer: total,
        choices: makeNumericChoices(total, 5, 40),
        visualSpec: { type: "coins", coins, showLabels: false }
      };
    }
  },

  {
    id: 17,
    season: "Season IV · Summer Meadow",
    unitTag: "Kindergarten Crown",
    title: "17. Grand Summer Harvest Festival",
    shortName: "Kindergarten Finale",
    desc: "Celebrate all 14 Kindergarten units from Autumn leaves and shapes to 100, clocks, and coins!",
    iconKey: "seal",
    tabletopTool: "timecoins",
    isMilestone: true,
    mapPos: { x: 93, y: 74 },
    teacherGuide: {
      script: "Celebrate your child's whole Kindergarten year! Revisit Semester A and B together with pride and joy.",
      wonder: "Every skill—sorting, subitizing, bonds, shapes, comparisons, 100, time, and coins—prepares your child warmly for Grade 1.",
      heuristic: "Your child is ready to advance to Grade 1 whenever they joyfully see parts inside 10, teens as 10 + ones, and tens to 100.",
      handsOn: "Draw a 'Kindergarten Meadow Master' ribbon together and celebrate with a special family picnic!"
    },
    learnSteps: [
      {
        stageLabel: "Festival · Step 1 of 4",
        narrative: "From 5-frames and Number Bonds to shapes and scales, you mastered every season’s wisdom!",
        equationHTML: "6 + 4 = 10",
        visualSpec: { type: "number-bond", whole: 10, partA: 6, partB: 4, missing: "none", showDots: true }
      },
      {
        stageLabel: "Hundred Stars · Step 2 of 4",
        narrative: "Remember: 10 baskets of 10 acorns count all the way to ONE HUNDRED (100)!",
        equationHTML: "10 Tens = 100",
        visualSpec: { type: "tens-ones-100", tens: 10, ones: 0 }
      },
      {
        stageLabel: "Clock & Coins · Step 3 of 4",
        narrative: "At the summer market, tiny silver Dimes count by tens (10¢ each) while Quarters are worth 25¢!",
        equationHTML: "Dime = 10¢",
        visualSpec: { type: "coins", coins: [10], showLabels: true },
        checkQuestion: {
          prompt: "How many cents is this silver Dime worth?",
          choices: [5, 10, 25],
          answer: 10,
          coachText: "Yes! One tiny silver Dime is worth 10¢!",
          solvedEquationHTML: "1 Dime = 10¢"
        }
      },
      {
        stageLabel: "Crowned · Step 4 of 4",
        narrative: "Let us gather our final 4 Golden Acorns to crown the entire Kindergarten year!",
        equationHTML: "Four Seasons Complete!",
        visualSpec: { type: "double-ten-frame", count: 20, itemType: "acorn", showLabels: true }
      }
    ],
    generateProblem(tier) {
      if (tier === 1) {
        const pickType = kPick(["shape", "compare", "bond", "tens", "clock", "coinId"]);
        if (pickType === "shape") {
          const pool = [
            { key: "triangle", name: "Triangle" },
            { key: "hexagon", name: "Hexagon" },
            { key: "cylinder", name: "Cylinder" },
            { key: "cube", name: "Cube" }
          ];
          const s = kPick(pool);
          return {
            story: `Which festival lantern shape is shown here?`,
            equationHTML: `Shape = ?`,
            solvedEquationHTML: `It is a ${s.name}!`,
            answer: s.name,
            choices: pool.map((x) => x.name),
            visualSpec: { type: "shapes", shapeKey: s.key, showVertices: s.key === "triangle" || s.key === "hexagon" }
          };
        }
        if (pickType === "compare") {
          const a = kRandInt(3, 6);
          const b = a === 6 ? 4 : a + 1;
          const ans = a > b ? "Ladybugs" : "Daisies";
          return {
            story: `Which festival row has MORE?`,
            equationHTML: `More = ?`,
            solvedEquationHTML: `${ans} have more!`,
            answer: ans,
            choices: ["Ladybugs", "Daisies", "Equal", "Neither"],
            visualSpec: { type: "compare-match", topCount: a, bottomCount: b, topItem: "ladybug", bottomItem: "daisy" }
          };
        }
        if (pickType === "bond") {
          const a = kRandInt(1, 5);
          const b = 6 - a;
          return {
            story: `Make 6 for the picnic! ${a} and what number make 6?`,
            equationHTML: `${a} + ? = 6`,
            solvedEquationHTML: `${a} + ${b} = 6`,
            answer: b,
            choices: makeNumericChoices(b, 0, 8),
            visualSpec: { type: "number-bond", whole: 6, partA: a, partB: b, missing: "partB", showDots: true }
          };
        }
        if (pickType === "tens") {
          const t = kRandInt(3, 9);
          const total = t * 10;
          const otherTens = [20, 30, 40, 50, 60, 70, 80, 90, 100].filter((x) => x !== total).sort(() => Math.random() - 0.5).slice(0, 3);
          return {
            story: `Count the baskets of 10 by tens! How many acorns in all?`,
            equationHTML: `Count by 10s = ?`,
            solvedEquationHTML: `${t} tens = ${total}!`,
            answer: total,
            choices: [total, ...otherTens].sort((a, b) => a - b),
            visualSpec: { type: "tens-ones-100", tens: t, ones: 0 }
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
        const val = kPick([1, 5, 10, 25]);
        const nameMap = { 1: "Penny (1¢)", 5: "Nickel (5¢)", 10: "Dime (10¢)", 25: "Quarter (25¢)" };
        return {
          story: `Which coin is in Pip’s festival pouch?`,
          equationHTML: `Coin = ?`,
          solvedEquationHTML: `It is a ${nameMap[val]}!`,
          answer: nameMap[val],
          choices: ["Penny (1¢)", "Nickel (5¢)", "Dime (10¢)", "Quarter (25¢)"],
          visualSpec: { type: "coins", coins: [val], showLabels: false }
        };
      }

      if (tier === 2) {
        const pickType = kPick(["ordinal", "height", "order20", "story", "tens", "coins"]);
        if (pickType === "ordinal") {
          const ordNames = ["", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th"];
          const target = kRandInt(5, 10);
          return {
            story: `Count from the left! Which festival spot holds the golden daisy?`,
            equationHTML: `Position = ?`,
            solvedEquationHTML: `It is the ${ordNames[target]} daisy!`,
            answer: ordNames[target],
            choices: makeWordChoices(ordNames[target], ordNames.slice(1)),
            visualSpec: { type: "ordinal-line", total: 10, itemType: "daisy", targetIndex: target, showNumbers: false }
          };
        }
        if (pickType === "height") {
          const leftTall = kRandInt(0, 1) === 1;
          const ans = leftTall ? "Oak Tree" : "Berry Bush";
          return {
            story: `Which garden plant stands TALLER from the ground?`,
            equationHTML: `Taller = ?`,
            solvedEquationHTML: `${ans} is taller!`,
            answer: ans,
            choices: ["Oak Tree", "Berry Bush", "Same Height", "Zero"],
            visualSpec: { type: "height-compare", labelA: "Oak Tree", heightA: leftTall ? 6 : 2, labelB: "Berry Bush", heightB: leftTall ? 2 : 6 }
          };
        }
        if (pickType === "order20") {
          const s = kRandInt(13, 17);
          return {
            story: `Which number fills the missing festival stone in order?`,
            equationHTML: `Missing = ?`,
            solvedEquationHTML: `${s + 1} goes between ${s} and ${s + 2}!`,
            answer: s + 1,
            choices: makeNumericChoices(s + 1, 10, 20),
            visualSpec: { type: "number-compare", mode: "order", stones: [s, "?", s + 2, s + 3] }
          };
        }
        if (pickType === "story") {
          const whole = kRandInt(7, 9);
          const take = kRandInt(2, 4);
          return {
            story: `Pip set ${whole} honey jars on the table and gave ${take} as festival gifts. How many remain?`,
            equationHTML: `How many now? = ?`,
            solvedEquationHTML: `${whole} − ${take} = ${whole - take}`,
            answer: whole - take,
            choices: makeNumericChoices(whole - take, 0, 9),
            visualSpec: { type: "story-scene", countA: whole, itemA: "honeyjar", labelA: `At Start (${whole})`, countB: take, itemB: "honeyjar", labelB: `${take} Given` }
          };
        }
        if (pickType === "tens") {
          const t = kRandInt(3, 8);
          const o = kRandInt(1, 5);
          const total = t * 10 + o;
          return {
            story: `Count the baskets of 10 and the loose acorns for the feast!`,
            equationHTML: `Tens &amp; Ones = ?`,
            solvedEquationHTML: `${t} tens and ${o} ones = ${total}!`,
            answer: total,
            choices: makeNumericChoices(total, 15, 99),
            visualSpec: { type: "tens-ones-100", tens: t, ones: o }
          };
        }
        const coins = kPick([[5, 5, 5], [10, 10], [10, 10, 10]]);
        const total = coins.reduce((a, b) => a + b, 0);
        return {
          story: `Count these matching silver coins! How many cents in all?`,
          equationHTML: `Total Cents = ?`,
          solvedEquationHTML: `Total = ${total}¢`,
          answer: total,
          choices: makeNumericChoices(total, 5, 35),
          visualSpec: { type: "coins", coins, showLabels: false }
        };
      }

      // Tier 3 Finale Mix
      const pickType = kPick(["bond", "word20", "skip5s", "tens", "clockLater", "coins"]);
      if (pickType === "bond") {
        const a = kRandInt(2, 8);
        const b = 10 - a;
        return {
          story: `Make 10 in your mind! ? and ${b} make 10. What is the missing part?`,
          equationHTML: `? + ${b} = 10`,
          solvedEquationHTML: `${a} + ${b} = 10`,
          answer: a,
          choices: makeNumericChoices(a, 0, 10),
          visualSpec: { type: "number-bond", whole: 10, partA: a, partB: b, missing: "partA", showDots: false }
        };
      }
      if (pickType === "word20") {
        const w = kPick([
          { w: "thirteen", n: 13 }, { w: "fifteen", n: 15 },
          { w: "seventeen", n: 17 }, { w: "twenty", n: 20 }
        ]);
        return {
          story: `Read the festival banner word! Which number does it say?`,
          equationHTML: `Word = ?`,
          solvedEquationHTML: `“${w.w}” = ${w.n}!`,
          answer: w.n,
          choices: makeNumericChoices(w.n, 10, 20),
          visualSpec: { type: "number-compare", mode: "word", word: w.w }
        };
      }
      if (pickType === "skip5s") {
        const g = kRandInt(6, 10);
        const tot = g * 5;
        return {
          story: `Skip-count by 5s! How many berries are in all these bunches?`,
          equationHTML: `Count by 5s = ?`,
          solvedEquationHTML: `${g} fives = ${tot}!`,
          answer: tot,
          choices: makeNumericChoices(tot, 20, 60),
          visualSpec: { type: "skip-count-5s", groups: g }
        };
      }
      if (pickType === "tens") {
        const t = kRandInt(4, 9);
        const o = kRandInt(6, 9);
        const total = t * 10 + o;
        return {
          story: `Count the baskets of 10 and all the loose ones! What number is this?`,
          equationHTML: `Tens &amp; Ones = ?`,
          solvedEquationHTML: `${t} tens and ${o} ones = ${total}!`,
          answer: total,
          choices: makeNumericChoices(total, 20, 99),
          visualSpec: { type: "tens-ones-100", tens: t, ones: o }
        };
      }
      if (pickType === "clockLater") {
        const h = kRandInt(1, 11);
        const ans = `${h + 1}:00`;
        const opts = new Set([ans]);
        while (opts.size < 4) opts.add(`${kRandInt(1, 12)}:00`);
        return {
          story: `The festival clock says ${h}:00 now. What time will it be 1 HOUR LATER?`,
          equationHTML: `1 Hour Later = ?`,
          solvedEquationHTML: `1 hour later is ${ans}!`,
          answer: ans,
          choices: Array.from(opts).sort((a, b) => parseInt(a, 10) - parseInt(b, 10)),
          visualSpec: { type: "clock-hour", hour: h, minutes: 0, skyPhase: "Harvest Festival" }
        };
      }
      const coinSet = kPick([[10, 5, 1, 1], [25, 10], [25, 5, 1], [10, 10, 5, 1]]);
      const total = coinSet.reduce((a, b) => a + b, 0);
      return {
        story: `Count Pip’s mixed festival coins from biggest value to smallest! How many cents?`,
        equationHTML: `Total Cents = ?`,
        solvedEquationHTML: `Total = ${total}¢`,
        answer: total,
        choices: makeNumericChoices(total, 10, 40),
        visualSpec: { type: "coins", coins: coinSet, showLabels: false }
      };
    }
  }
];

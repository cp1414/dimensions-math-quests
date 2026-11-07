// ============================================================================
// THE YOUNG KNIGHT'S QUEST — COMPLETE GRADE 1 (DIMENSIONS 1A & 1B) CAMPAIGN
// All 19 Official Chapters of Singapore Dimensions Math 1A & 1B + 4 Act Bosses
// (23 Total Missions — 100% Complete First Grade Scope, Zero Skipped Topics)
// ============================================================================

const SQUIRE_RANKS = [
  { minSeals: 0,  title: "Woodland Page", iconKey: "shieldBronze" },
  { minSeals: 4,  title: "Apprentice Squire", iconKey: "shieldSilver" },
  { minSeals: 8,  title: "Defender of the Bridge", iconKey: "bow" },
  { minSeals: 13, title: "Highland Warden", iconKey: "sword" },
  { minSeals: 18, title: "Knight of the Realm", iconKey: "crest" },
  { minSeals: 23, title: "Dragon Vanquisher (Grade 1 Master)", iconKey: "crown" }
];

const MERLIN_PRAISE = [
  "Direct hit, young Squire! Your reckoning is true!",
  "Bravo! Another foe falls before your sharp mind!",
  "Well struck! You saw how the parts and the whole fit together.",
  "Steadfast and brave! The realm is safer for your wisdom.",
  "Splendid! One step closer to victory!",
  "True as an arrow! Nothing escapes your eye."
];

const MERLIN_ENCOURAGE = [
  "Hold fast, young Squire! Raise your shield and look at the picture.",
  "Steady now! Count the parts in the frame and strike again.",
  "Even the bravest knights look twice. See how the parts join here.",
  "Take heart, my boy! Look closely at the diagram below."
];

// ============================================================================
// ACTIVITY-MATCHED & TOPIC-MATCHED VOICE BANK FOR MASTER ALDOUS
// Every clip has a unique clipKey in ./audio/<clipKey>.wav (plus a fallbackKey
// to the core 12 clips until new .wav files are generated).
// ============================================================================
const MASTER_ALDOUS_VOICES = {
  generalPraise: [
    { key: "praise_0", fallback: "praise_0", text: "Direct hit, young Squire! Your reckoning is true!" },
    { key: "praise_1", fallback: "praise_1", text: "Bravo! Another foe falls before your sharp mind!" },
    { key: "praise_2", fallback: "praise_2", text: "Well struck! You saw how the parts and the whole fit together." },
    { key: "praise_3", fallback: "praise_3", text: "Steadfast and brave! The realm is safer for your wisdom." },
    { key: "praise_4", fallback: "praise_4", text: "Splendid! One step closer to victory!" },
    { key: "praise_5", fallback: "praise_5", text: "True as an arrow! Nothing escapes your eye." }
  ],
  actionPraise: {
    bandits: [
      { key: "bandits_0", fallback: "praise_0", text: "Thwack! Right in the bandit's shield! That rascal is running for the hills!" },
      { key: "bandits_1", fallback: "praise_1", text: "Bullseye, young Squire! Another outlaw tumbles into the bushes!" },
      { key: "bandits_2", fallback: "praise_5", text: "Ha! Those raiders didn't expect a boy who knows his numbers like that!" },
      { key: "bandits_3", fallback: "praise_2", text: "Swift as an arrow! You sent that guard packing!" },
      { key: "praise_0", fallback: "praise_0", text: "Direct hit, young Squire! Your reckoning is true!" },
      { key: "praise_1", fallback: "praise_1", text: "Bravo! Another foe falls before your sharp mind!" },
      { key: "praise_3", fallback: "praise_3", text: "Steadfast and brave! The realm is safer for your wisdom." },
      { key: "praise_5", fallback: "praise_5", text: "True as an arrow! Nothing escapes your eye." }
    ],
    locks: [
      { key: "locks_0", fallback: "praise_2", text: "Clang! That heavy iron lock just snapped right open!" },
      { key: "locks_1", fallback: "praise_4", text: "Crack! Another chain shatters! The prisoners are cheering for you!" },
      { key: "locks_2", fallback: "praise_0", text: "Click! Your number bond was the exact key to pop that padlock!" },
      { key: "locks_3", fallback: "praise_3", text: "Down goes the iron bar! Just a few more locks to set everyone free!" },
      { key: "praise_2", fallback: "praise_2", text: "Well struck! You saw how the parts and the whole fit together." },
      { key: "praise_4", fallback: "praise_4", text: "Splendid! One step closer to victory!" },
      { key: "praise_0", fallback: "praise_0", text: "Direct hit, young Squire! Your reckoning is true!" },
      { key: "praise_5", fallback: "praise_5", text: "True as an arrow! Nothing escapes your eye." }
    ],
    fort: [
      { key: "fort_0", fallback: "praise_3", text: "Timber! Another giant oak beam rises into place on the castle wall!" },
      { key: "fort_1", fallback: "praise_4", text: "Clang-clang on the anvil! That royal armor is gleaming like gold!" },
      { key: "fort_2", fallback: "praise_0", text: "Up goes the siege ladder! We are climbing higher toward the battlements!" },
      { key: "fort_3", fallback: "praise_2", text: "Huzzah! The watchtower beacon blazes bright across the mountains!" },
      { key: "praise_3", fallback: "praise_3", text: "Steadfast and brave! The realm is safer for your wisdom." },
      { key: "praise_4", fallback: "praise_4", text: "Splendid! One step closer to victory!" },
      { key: "praise_2", fallback: "praise_2", text: "Well struck! You saw how the parts and the whole fit together." },
      { key: "praise_1", fallback: "praise_1", text: "Bravo! Another foe falls before your sharp mind!" }
    ],
    ships: [
      { key: "ships_0", fallback: "praise_0", text: "Splash! Direct hit from the catapult! That pirate skiff is sinking fast!" },
      { key: "ships_1", fallback: "praise_1", text: "Boom! Right through the pirate sails! The river is ours, my boy!" },
      { key: "ships_2", fallback: "praise_5", text: "Aha! Those river pirates are swimming for shore after that shot!" },
      { key: "praise_0", fallback: "praise_0", text: "Direct hit, young Squire! Your reckoning is true!" },
      { key: "praise_1", fallback: "praise_1", text: "Bravo! Another foe falls before your sharp mind!" },
      { key: "praise_2", fallback: "praise_2", text: "Well struck! You saw how the parts and the whole fit together." },
      { key: "praise_4", fallback: "praise_4", text: "Splendid! One step closer to victory!" }
    ],
    "boss-giant": [
      { key: "boss_giant_0", fallback: "praise_0", text: "Crash! You cracked a massive plate right off the Forest Giant's shield!" },
      { key: "boss_giant_1", fallback: "praise_1", text: "The Forest Giant is wobbling! His club just shook the whole woods!" },
      { key: "praise_0", fallback: "praise_0", text: "Direct hit, young Squire! Your reckoning is true!" },
      { key: "praise_1", fallback: "praise_1", text: "Bravo! Another foe falls before your sharp mind!" },
      { key: "praise_2", fallback: "praise_2", text: "Well struck! You saw how the parts and the whole fit together." },
      { key: "praise_3", fallback: "praise_3", text: "Steadfast and brave! The realm is safer for your wisdom." },
      { key: "praise_5", fallback: "praise_5", text: "True as an arrow! Nothing escapes your eye." }
    ],
    "boss-serpent": [
      { key: "boss_serpent_0", fallback: "praise_5", text: "Splash! Your strike pierced the Sea-Serpent's scales! Watch out for his tail!" },
      { key: "boss_serpent_1", fallback: "praise_1", text: "The River Serpent is diving in retreat! Strike him again, young Squire!" },
      { key: "praise_0", fallback: "praise_0", text: "Direct hit, young Squire! Your reckoning is true!" },
      { key: "praise_2", fallback: "praise_2", text: "Well struck! You saw how the parts and the whole fit together." },
      { key: "praise_3", fallback: "praise_3", text: "Steadfast and brave! The realm is safer for your wisdom." },
      { key: "praise_4", fallback: "praise_4", text: "Splendid! One step closer to victory!" },
      { key: "praise_5", fallback: "praise_5", text: "True as an arrow! Nothing escapes your eye." }
    ],
    "boss-golem": [
      { key: "boss_golem_0", fallback: "praise_2", text: "Sparks fly! Your math hammer just cracked the Iron Golem's chestplate!" },
      { key: "boss_golem_1", fallback: "praise_4", text: "Clang! The Iron Golem's gears are grinding to a halt!" },
      { key: "praise_0", fallback: "praise_0", text: "Direct hit, young Squire! Your reckoning is true!" },
      { key: "praise_1", fallback: "praise_1", text: "Bravo! Another foe falls before your sharp mind!" },
      { key: "praise_2", fallback: "praise_2", text: "Well struck! You saw how the parts and the whole fit together." },
      { key: "praise_3", fallback: "praise_3", text: "Steadfast and brave! The realm is safer for your wisdom." },
      { key: "praise_5", fallback: "praise_5", text: "True as an arrow! Nothing escapes your eye." }
    ],
    "boss-dragon": [
      { key: "boss_dragon_0", fallback: "praise_0", text: "Roar! Your arrow pierced right through the Red Dragon's fiery scales!" },
      { key: "boss_dragon_1", fallback: "praise_3", text: "You blocked the Dragon's fire breath with pure wisdom, young Knight!" },
      { key: "boss_dragon_2", fallback: "praise_1", text: "The Red Dragon is staggering! Ready your sword for the next strike!" },
      { key: "praise_0", fallback: "praise_0", text: "Direct hit, young Squire! Your reckoning is true!" },
      { key: "praise_2", fallback: "praise_2", text: "Well struck! You saw how the parts and the whole fit together." },
      { key: "praise_4", fallback: "praise_4", text: "Splendid! One step closer to victory!" },
      { key: "praise_5", fallback: "praise_5", text: "True as an arrow! Nothing escapes your eye." }
    ]
  },
  mentalMathIntro: [
    { key: "mental_intro_0", fallback: "praise_4", text: "Final strike—Mental Math! Picture the numbers in your head without the drawing!" },
    { key: "mental_intro_1", fallback: "praise_3", text: "A true Knight sees the numbers in his mind! Try this one in your head!" }
  ],
  mentalMathWin: [
    { key: "mental_win_0", fallback: "praise_0", text: "By the King's crown—you solved that completely in your head! Masterful!" },
    { key: "mental_win_1", fallback: "praise_5", text: "Pure mental math! You didn't even need the picture for that strike!" },
    { key: "praise_1", fallback: "praise_1", text: "Bravo! Another foe falls before your sharp mind!" },
    { key: "praise_4", fallback: "praise_4", text: "Splendid! One step closer to victory!" }
  ],
  topicCoach: {
    "number-bond-concrete": { key: "coach_bond", fallback: "encourage_0", text: "Look at the Ten-Frame and Number Bond: a full top row is five! Put the parts together!" },
    "count-on-path":        { key: "coach_path", fallback: "encourage_1", text: "Hold the bigger number in your head, then hop forward along the number path!" },
    "subtraction-crossout": { key: "coach_crossout", fallback: "encourage_2", text: "Start with all the items in the frame, cross out the ones that left, and count what remains!" },
    "comparison-rows":      { key: "coach_compare", fallback: "encourage_3", text: "Up to the dotted line, both rows match! Count the extra blocks sticking out past the line!" },
    "double-ten-frame":     { key: "coach_teen", fallback: "encourage_1", text: "The top frame is a full ten! Keep ten in your head and count on the loose ones below!" },
    "make-ten":             { key: "coach_maketen", fallback: "encourage_2", text: "Look at the empty spots in the top Ten-Frame! Fill the ten first, then add what is left!" },
    "subtract-from-ten":    { key: "coach_subten", fallback: "encourage_0", text: "Take the number straight out of the full ten first, then add the loose ones!" },
    "place-value":          { key: "coach_placevalue", fallback: "encourage_1", text: "Count the tall towers of ten by tens first—ten, twenty, thirty—then add the loose ones!" },
    "regrouping":           { key: "coach_regroup", fallback: "encourage_2", text: "See how many ones are needed to complete the next ten, then add the rest!" },
    "bar-model":            { key: "coach_barmodel", fallback: "encourage_3", text: "Look at the whole bar on top and the known part below—subtract to find the missing part!" },
    "equal-groups":         { key: "coach_groups", fallback: "encourage_1", text: "Count how many trays there are, and add the equal groups together!" },
    "shapes":               { key: "coach_shapes", fallback: "encourage_3", text: "Touch each golden corner dot around the shield and count them carefully!" },
    "ordinals":             { key: "coach_ordinals", fallback: "encourage_0", text: "Start at the Castle Gate where First begins, and count along the line to the Crown!" },
    "length-units":         { key: "coach_length", fallback: "encourage_1", text: "Count the yellow measuring blocks lined up from one end of the sword to the other!" },
    "fractions":            { key: "coach_fractions", fallback: "encourage_2", text: "Check how many equal parts make the whole shield, and count the gold parts!" },
    "clock":                { key: "coach_clock", fallback: "encourage_3", text: "Look at the short blue hand for the hour, and the long red hand for the minutes!" },
    "coins":                { key: "coach_coins", fallback: "encourage_1", text: "Start with the biggest coins on the left—count by tens and fives first, then the pennies!" }
  }
};

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function buildChoices(correct, minVal = 0, maxVal = 100) {
  const set = new Set([correct]);
  const offsets = [-2, -1, 1, 2, 3, -3, 5, -5, 10, -10];
  let idx = 0;
  while (set.size < 4 && idx < 35) {
    const delta = offsets[idx % offsets.length] + (idx >= offsets.length ? randInt(-4, 4) : 0);
    const cand = correct + delta;
    if (cand >= minVal && cand <= maxVal && cand !== correct) {
      set.add(cand);
    }
    idx++;
  }
  while (set.size < 4) {
    const fallback = randInt(minVal, Math.max(minVal + 5, correct + 4));
    if (fallback !== correct) set.add(fallback);
  }
  return Array.from(set).sort((a, b) => a - b);
}

const CURRICULUM_NODES = [
  // ==========================================================================
  // ACT I: THE FOREST OF TEN (Dimensions 1A, Chapters 1–4)
  // ==========================================================================
  {
    id: 1,
    act: 1,
    title: "Scout the Bandit Camp",
    subtitle: "Ch. 1: Numbers to 10 (Subitizing, Zero, Order & Compare)",
    gradeTag: "Dimensions 1A · Chapter 1",
    iconKey: "bow",
    missionType: "bandits",
    missionActionLabel: "Bandit Lookouts Spotted",
    mapPos: { x: 7, y: 70 },
    shortDesc: "Spot and clear 5 bandit lookouts by subitizing 5-groups, understanding zero, and ordering numbers 0 to 10.",
    teacherGuide: {
      wonder: "God created our very hands with 5 fingers on each side! In Dimensions 1A Ch. 1, children learn to see numbers 0–10 not as a blur of ones, but ordered around the anchor of 5 and 10—reflecting the Creator's orderly design.",
      script: "Ask: 'Look at the top row of 5—is it full? How many more are on the bottom row? Can you name the whole number without counting from 1?'",
      heuristic: "5-Group Subitizing on a Ten-Frame, Zero, & 1 More / 1 Less (Dimensions 1A Ch. 1, Lessons 1–6).",
      handsOn: "Flash 7 fingers (5 on one hand, 2 on the other) for 2 seconds and ask him to name the number instantly, then ask what is 1 more and 1 less."
    },
    learnSteps: [
      {
        stepTag: "Stage 1 · Creation's Order & 5-Groups",
        narrative: "God gave us 5 fingers on each hand to see numbers in order! On a Ten-Frame, a full top row is always 5. Here, 5 on top and 2 below make 7 right away!",
        equationHTML: `5 and 2 is <span class="eq-mystery-box solved">7</span>`,
        visualSpec: { type: "number-bond-concrete", whole: 7, partA: 5, partB: 2, itemType: "shield" }
      },
      {
        stepTag: "Stage 2 · Try It Together (Subitizing)",
        narrative: "TRY IT TOGETHER: Look at the Ten-Frame below. The top row has 5 blue shields and the bottom row has 3 gold shields. How many in all without counting one-by-one?",
        equationHTML: `5 and 3 is <span class="eq-mystery-box">?</span>`,
        visualSpec: { type: "number-bond-concrete", whole: 8, partA: 5, partB: 3, missing: "whole", itemType: "shield" },
        checkQuestion: {
          prompt: "5 and 3 make:",
          choices: [6, 7, 8, 9],
          answer: 8,
          solvedEquationHTML: `5 and 3 is <span class="eq-mystery-box solved">8</span>`,
          coachText: "A full top row of 5 plus 3 more on the bottom row is 8!"
        }
      },
      {
        stepTag: "Stage 3 · Completing 10 & Zero",
        narrative: "Two full rows of 5 make 10! When 0 extra shields are added to 5, we write 5 and 0 is 5—because Zero (0) means none!",
        equationHTML: `5 and 0 is <span class="eq-mystery-box solved">5</span>`,
        visualSpec: { type: "number-bond-concrete", whole: 5, partA: 5, partB: 0, itemType: "shield" }
      },
      {
        stepTag: "Stage 4 · 1 More and 1 Less on the Path",
        narrative: "Each step forward along the King's Number Path is 1 MORE, and each step back is 1 LESS! Starting at 7, 2 hops forward reaches 9!",
        equationHTML: `2 more than 7 is <span class="eq-mystery-box solved">9</span>`,
        visualSpec: { type: "count-on-path", start: 7, add: 2, total: 9 }
      },
      {
        stepTag: "Stage 5 · Try It Together (Order & Path)",
        narrative: "TRY IT TOGETHER: Look at the Ten-Frame with 9 shields (5 on top and 4 on the bottom). How many more shields do we need to fill all 10?",
        equationHTML: `9 and <span class="eq-mystery-box">?</span> make 10`,
        visualSpec: { type: "number-bond-concrete", whole: 10, partA: 9, partB: 1, missing: "partB", itemType: "shield" },
        checkQuestion: {
          prompt: "How many more to make 10?",
          choices: [1, 2, 3, 4],
          answer: 1,
          solvedEquationHTML: `9 and <span class="eq-mystery-box solved">1</span> make 10`,
          coachText: "Only 1 empty box is left in the frame of 10, so 9 and 1 make 10!"
        }
      }
    ],
    generateProblem(tier) {
      if (tier === 1) {
        if (Math.random() < 0.65) {
          const partA = pick([3, 4, 5]);
          const partB = randInt(1, 10 - partA);
          const total = partA + partB;
          const items = [
            { itemType: "shield", noun: "shields", place: "on the rack" },
            { itemType: "apple", noun: "apples", place: "in the basket" },
            { itemType: "lantern", noun: "lanterns", place: "at the camp" }
          ];
          const it = pick(items);
          return {
            story: `Spot the camp supplies! One group has ${partA} ${it.noun} and the other has ${partB} ${it.noun} ${it.place}. How many ${it.noun} in all?`,
            equationHTML: `${partA} and ${partB} is <span class="eq-mystery-box">?</span>`,
            solvedEquationHTML: `${partA} and ${partB} is <span class="eq-mystery-box solved">${total}</span>`,
            answer: total,
            choices: buildChoices(total, 2, 10),
            visualSpec: { type: "number-bond-concrete", whole: total, partA, partB, missing: "whole", itemType: it.itemType },
            whyText: `${partA} plus ${partB} more is ${total}.`
          };
        } else {
          const base = randInt(2, 8);
          const delta = pick([1, 2]);
          const ans = Math.min(10, base + delta);
          const actualDelta = ans - base;
          return {
            story: `The scout spots ${base} bandit tents and then ${actualDelta} more along the path. What number is ${actualDelta} MORE than ${base}?`,
            equationHTML: `${actualDelta} more than ${base} is <span class="eq-mystery-box">?</span>`,
            solvedEquationHTML: `${actualDelta} more than ${base} is <span class="eq-mystery-box solved">${ans}</span>`,
            answer: ans,
            choices: buildChoices(ans, 1, 10),
            visualSpec: { type: "count-on-path", start: base, add: actualDelta, total: ans },
            whyText: `Starting at ${base} and hopping ${actualDelta} more lands on ${ans}.`
          };
        }
      } else if (tier === 2 && Math.random() < 0.55) {
        const partA = pick([4, 5, 6]);
        const bottom = randInt(1, 10 - partA);
        const whole = partA + bottom;
        return {
          story: `There are ${whole} shields in the rack. The first group holds ${partA} shields. How many shields are in the second group?`,
          equationHTML: `${partA} and <span class="eq-mystery-box">?</span> make ${whole}`,
          solvedEquationHTML: `${partA} and <span class="eq-mystery-box solved">${bottom}</span> make ${whole}`,
          answer: bottom,
          choices: buildChoices(bottom, 1, 8),
          visualSpec: { type: "number-bond-concrete", whole, partA, partB: bottom, missing: "partB", itemType: "shield" },
          whyText: `${whole} is made of ${partA} and ${bottom}.`
        };
      } else {
        const base = randInt(3, 8);
        const isMore = Math.random() < 0.5;
        const delta = pick([1, 2]);
        const ans = isMore ? base + delta : base - delta;
        return {
          story: `The scout spots ${base} bandit tents. What number is ${delta} ${isMore ? "MORE" : "LESS"} than ${base}?`,
          equationHTML: `${delta} ${isMore ? "more" : "less"} than ${base} is <span class="eq-mystery-box">?</span>`,
          solvedEquationHTML: `${delta} ${isMore ? "more" : "less"} than ${base} is <span class="eq-mystery-box solved">${ans}</span>`,
          answer: ans,
          choices: buildChoices(ans, 0, 10),
          visualSpec: { type: "count-on-path", start: Math.min(base, ans), add: delta, total: Math.max(base, ans) },
          whyText: `${delta} ${isMore ? "more" : "less"} than ${base} lands on ${ans}.`
        };
      }
    }
  },

  {
    id: 2,
    act: 1,
    title: "Unlock the Iron Cages",
    subtitle: "Ch. 2: Number Bonds (Making 6, 7, 8, 9, and 10)",
    gradeTag: "Dimensions 1A · Chapter 2",
    iconKey: "lock",
    missionType: "locks",
    missionActionLabel: "Cage Locks Broken",
    mapPos: { x: 13, y: 53 },
    shortDesc: "Break 5 iron cage locks by mastering Part-Whole Number Bonds for 6, 7, 8, 9, and 10.",
    teacherGuide: {
      wonder: "In God's creation, wholes are harmoniously composed of parts—just as many members form one body. Number Bonds train the young Squire to see any number simultaneously as a Whole and as its Parts.",
      script: "Ask: 'What is the Whole number we need for this lock? What is the Part we already see? How many more make the Whole?'",
      heuristic: "Number Bonds & Part-Whole Decomposition for 6, 7, 8, 9, and 10 (Dimensions 1A Ch. 2, Lessons 1–6).",
      handsOn: "Place 8 coins on the table, then hide 3 under a cup: 'There are 8 in all, and you see 5. How many are hiding under the cup?'"
    },
    learnSteps: [
      {
        stepTag: "Stage 1 · Parts and the Whole",
        narrative: "Every iron lock is a Number Bond! Two smaller PARTS (4 red apples and 3 golden apples) join together to make one WHOLE (7)!",
        equationHTML: `4 and 3 make <span class="eq-mystery-box solved">7</span>`,
        visualSpec: { type: "number-bond-concrete", whole: 7, partA: 4, partB: 3, itemType: "apple" }
      },
      {
        stepTag: "Stage 2 · Different Ways to Make 8",
        narrative: "The same Whole can be split in different ways! 8 can be 5 and 3, OR 8 can be 6 and 2! Both pairs join to make a Whole of 8!",
        equationHTML: `6 and 2 make <span class="eq-mystery-box solved">8</span>`,
        visualSpec: { type: "number-bond-concrete", whole: 8, partA: 6, partB: 2, itemType: "apple" }
      },
      {
        stepTag: "Stage 3 · Try It Together (Missing Part of 9)",
        narrative: "TRY IT TOGETHER: To unlock a 9-lock when you already have 6 apples, look at the dashed empty spots: 6 and what missing part make 9?",
        equationHTML: `6 and <span class="eq-mystery-box">?</span> make 9`,
        visualSpec: { type: "number-bond-concrete", whole: 9, partA: 6, partB: 3, missing: "partB", itemType: "apple" },
        checkQuestion: {
          prompt: "6 and ? make 9:",
          choices: [2, 3, 4, 5],
          answer: 3,
          solvedEquationHTML: `6 and <span class="eq-mystery-box solved">3</span> make 9`,
          coachText: "Count the 3 dashed spots in the frame: 6 and 3 make 9!"
        }
      },
      {
        stepTag: "Stage 4 · The Royal Bonds of 10",
        narrative: "The most powerful Number Bonds in all of math are the Partners of 10: 9 & 1, 8 & 2, 7 & 3, 6 & 4, and 5 & 5!",
        equationHTML: `7 and <span class="eq-mystery-box solved">3</span> make 10`,
        visualSpec: { type: "number-bond-concrete", whole: 10, partA: 7, partB: 3, missing: "partB", itemType: "apple" }
      },
      {
        stepTag: "Stage 5 · Try It Together (Partner of 10)",
        narrative: "TRY IT TOGETHER: The master cage lock needs a Whole of 10. One part is 8. What is the missing partner of 8 that makes 10?",
        equationHTML: `8 and <span class="eq-mystery-box">?</span> make 10`,
        visualSpec: { type: "number-bond-concrete", whole: 10, partA: 8, partB: 2, missing: "partB", itemType: "apple" },
        checkQuestion: {
          prompt: "8 and ? make 10:",
          choices: [1, 2, 3, 4],
          answer: 2,
          solvedEquationHTML: `8 and <span class="eq-mystery-box solved">2</span> make 10`,
          coachText: "8 fills the top 5 and 3 on the bottom—leaving 2 spots to make 10!"
        }
      }
    ],
    generateProblem(tier) {
      if (tier === 1) {
        const whole = randInt(6, 10);
        const partA = randInt(1, whole - 1);
        const partB = whole - partA;
        return {
          story: `Break the cage lock! Join the two parts (${partA} and ${partB}) to find the Whole.`,
          equationHTML: `${partA} and ${partB} make <span class="eq-mystery-box">?</span>`,
          solvedEquationHTML: `${partA} and ${partB} make <span class="eq-mystery-box solved">${whole}</span>`,
          answer: whole,
          choices: buildChoices(whole, 3, 10),
          visualSpec: { type: "number-bond-concrete", whole, partA, partB, missing: "whole", itemType: "apple" },
          whyText: `${partA} and ${partB} together make a Whole of ${whole}.`
        };
      } else {
        const whole = tier === 2 ? randInt(6, 10) : pick([8, 9, 10]);
        const partA = randInt(1, whole - 1);
        const partB = whole - partA;
        return {
          story: `The iron lock requires a Whole of ${whole}. One part is ${partA}. What is the missing part?`,
          equationHTML: `${partA} and <span class="eq-mystery-box">?</span> make ${whole}`,
          solvedEquationHTML: `${partA} and <span class="eq-mystery-box solved">${partB}</span> make ${whole}`,
          answer: partB,
          choices: buildChoices(partB, 1, 9),
          visualSpec: { type: "number-bond-concrete", whole, partA, partB, missing: "partB", itemType: "apple" },
          whyText: `${partA} needs ${partB} more to make ${whole}.`
        };
      }
    }
  },

  {
    id: 3,
    act: 1,
    title: "Rebuild the Timber Fort",
    subtitle: "Ch. 3: Addition Within 10 (Joining, Counting On & Missing Addends)",
    gradeTag: "Dimensions 1A · Chapter 3",
    iconKey: "log",
    missionType: "fort",
    missionActionLabel: "Fort Walls Raised",
    mapPos: { x: 19, y: 69 },
    shortDesc: "Raise 5 timber walls by joining parts, Counting On from the greater number, and solving Missing Addends.",
    teacherGuide: {
      wonder: "Because God's laws of order never change, 5 + 3 and 3 + 5 always yield the exact same sum (the Commutative Law). Teaching the young Squire to grab the greater number first and count on saves effort and builds confidence.",
      script: "Ask: 'Which part is greater? Put that bigger number in your head, and hop forward for the smaller part!'",
      heuristic: "Part-Whole Addition, Turnaround Facts & Counting On from the Greater Addend (Dimensions 1A Ch. 3, Lessons 1–7).",
      handsOn: "Hold 6 blocks in one hand and 3 in the other: 'Start at 6 in your fist... 7, 8, 9!'"
    },
    learnSteps: [
      {
        stepTag: "Stage 1 · Addition as Joining Parts",
        narrative: "The plus sign (+) means we join two parts into one Whole! Joining 5 oak logs and 3 pine logs gives the addition equation 5 + 3 = 8!",
        equationHTML: `5 + 3 = <span class="eq-mystery-box solved">8</span>`,
        visualSpec: { type: "number-bond-concrete", whole: 8, partA: 5, partB: 3, itemType: "log" }
      },
      {
        stepTag: "Stage 2 · Counting On Along the Path",
        narrative: "Instead of counting from 1 every time, hold the first number (6) in your head and hop 3 times along the path: 7, 8, 9!",
        equationHTML: `6 + 3 = <span class="eq-mystery-box solved">9</span>`,
        visualSpec: { type: "count-on-path", start: 6, add: 3, total: 9 }
      },
      {
        stepTag: "Stage 3 · Try It Together (Start with the Greater!)",
        narrative: "TRY IT TOGETHER: For 2 + 7, a wise Squire starts at the GREATER number (7) and hops just 2 times! What is 2 + 7?",
        equationHTML: `2 + 7 = <span class="eq-mystery-box">?</span>`,
        visualSpec: { type: "count-on-path", start: 7, add: 2, total: 9 },
        checkQuestion: {
          prompt: "Start at 7 and hop 2:",
          choices: [7, 8, 9, 10],
          answer: 9,
          solvedEquationHTML: `2 + 7 = <span class="eq-mystery-box solved">9</span>`,
          coachText: "Start at 7 and hop 2 times: 8, 9!"
        }
      },
      {
        stepTag: "Stage 4 · Missing Addend Stories",
        narrative: "Sometimes we know the Whole wall needs 10 logs and we already have 7 logs. Count the hops from 7 to 10: 7 + 3 = 10!",
        equationHTML: `7 + <span class="eq-mystery-box solved">3</span> = 10`,
        visualSpec: { type: "count-on-path", start: 7, add: 3, total: 10 }
      },
      {
        stepTag: "Stage 5 · Try It Together (Missing Addend)",
        narrative: "TRY IT TOGETHER: The gate tower needs 9 logs in all, and we have 6 logs in place. How many more logs must we add to reach 9?",
        equationHTML: `6 + <span class="eq-mystery-box">?</span> = 9`,
        visualSpec: { type: "count-on-path", start: 6, add: 3, total: 9 },
        checkQuestion: {
          prompt: "6 + ? = 9:",
          choices: [2, 3, 4, 5],
          answer: 3,
          solvedEquationHTML: `6 + <span class="eq-mystery-box solved">3</span> = 9`,
          coachText: "From 6 to 9 takes 3 hops (7, 8, 9), so 6 + 3 = 9!"
        }
      }
    ],
    generateProblem(tier) {
      const big = tier === 1 ? randInt(4, 6) : randInt(5, 8);
      const small = randInt(1, 10 - big);
      const sum = big + small;
      const swap = tier >= 2 && Math.random() < 0.5;
      const a = swap ? small : big;
      const b = swap ? big : small;

      if (tier === 1 && Math.random() < 0.5) {
        return {
          story: `Raise the timber wall! Join ${big} oak logs and ${small} pine logs in the Ten-Frame. How many logs in all?`,
          equationHTML: `${big} + ${small} = <span class="eq-mystery-box">?</span>`,
          solvedEquationHTML: `${big} + ${small} = <span class="eq-mystery-box solved">${sum}</span>`,
          answer: sum,
          choices: buildChoices(sum, 3, 10),
          visualSpec: { type: "number-bond-concrete", whole: sum, partA: big, partB: small, missing: "whole", itemType: "log" },
          whyText: `Joining ${big} logs and ${small} logs makes ${sum} logs altogether.`
        };
      } else if (tier < 3) {
        return {
          story: `Raise the wall! Join ${a} logs and ${b} logs together. Start from ${big} and count on!`,
          equationHTML: `${a} + ${b} = <span class="eq-mystery-box">?</span>`,
          solvedEquationHTML: `${a} + ${b} = <span class="eq-mystery-box solved">${sum}</span>`,
          answer: sum,
          choices: buildChoices(sum, 3, 10),
          visualSpec: { type: "count-on-path", start: big, add: small, total: sum },
          whyText: `Start at ${big} and count on ${small} hops to reach ${sum}.`
        };
      } else {
        return {
          story: `The fort wall needs ${sum} logs in all. We have ${big} logs ready. How many more logs must we add?`,
          equationHTML: `${big} + <span class="eq-mystery-box">?</span> = ${sum}`,
          solvedEquationHTML: `${big} + <span class="eq-mystery-box solved">${small}</span> = ${sum}`,
          answer: small,
          choices: buildChoices(small, 1, 8),
          visualSpec: { type: "count-on-path", start: big, add: small, total: sum },
          whyText: `From ${big} up to ${sum} is ${small} hops.`
        };
      }
    }
  },

  {
    id: 4,
    act: 1,
    title: "Drive Back the Raiders",
    subtitle: "Ch. 4: Subtraction Within 10 (Taking Away, Missing Parts & Fact Families)",
    gradeTag: "Dimensions 1A · Chapter 4",
    iconKey: "sword",
    missionType: "bandits",
    missionActionLabel: "Raiders Driven Back",
    mapPos: { x: 25, y: 54 },
    shortDesc: "Drive back 5 raiders by mastering Taking-Away subtraction, Taking-Apart Number Bonds, and Fact Families.",
    teacherGuide: {
      wonder: "Addition and subtraction are inverse mirror images in God's ordered mathematics: what addition joins together, subtraction takes apart. In Dimensions 1A Ch. 4, children master both 'Taking Away' and 'Missing Part' subtraction.",
      script: "Ask: 'What is the Whole we started with? When we take away or know one part, what part remains?'",
      heuristic: "Cross-Out Taking Away, Number-Bond Subtraction & Fact Families (Dimensions 1A Ch. 4, Lessons 1–8).",
      handsOn: "Set out 9 toy soldiers and knock 4 down: '9 in all, take away 4, leaves 5 standing! And 5 + 4 brings back all 9!'"
    },
    learnSteps: [
      {
        stepTag: "Stage 1 · Subtraction as Taking Away",
        narrative: "8 raiders approach the gate. Our archers drive 3 away (crossed out in red). We write 8 − 3 = 5 raiders left!",
        equationHTML: `8 − 3 = <span class="eq-mystery-box solved">5</span>`,
        visualSpec: { type: "subtraction-crossout", whole: 8, takeAway: 3, remaining: 5, itemType: "shield" }
      },
      {
        stepTag: "Stage 2 · Try It Together (Cross-Out Subtraction)",
        narrative: "TRY IT TOGETHER: There are 9 lanterns in the watchtower, and scouts carry 4 lanterns out on patrol (crossed out). How many remain?",
        equationHTML: `9 − 4 = <span class="eq-mystery-box">?</span>`,
        visualSpec: { type: "subtraction-crossout", whole: 9, takeAway: 4, remaining: 5, itemType: "lantern" },
        checkQuestion: {
          prompt: "9 − 4 =",
          choices: [3, 4, 5, 6],
          answer: 5,
          solvedEquationHTML: `9 − 4 = <span class="eq-mystery-box solved">5</span>`,
          coachText: "Start with 9, cross out 4, and 5 lanterns remain!"
        }
      },
      {
        stepTag: "Stage 3 · Subtraction as Taking Apart a Number Bond",
        narrative: "Subtraction also finds a missing part when nothing leaves! When 9 shields in all have 5 blue, subtract 9 − 5 = 4 to find the gold part!",
        equationHTML: `9 − 5 = <span class="eq-mystery-box solved">4</span>`,
        visualSpec: { type: "number-bond-concrete", whole: 9, partA: 5, partB: 4, missing: "partB", itemType: "shield" }
      },
      {
        stepTag: "Stage 4 · Addition & Subtraction Fact Families",
        narrative: "One Number Bond (10 Whole, 6 and 4 Parts) gives a whole Fact Family: 6 + 4 = 10, 4 + 6 = 10, 10 − 6 = 4, and 10 − 4 = 6!",
        equationHTML: `10 − 6 = <span class="eq-mystery-box solved">4</span>`,
        visualSpec: { type: "number-bond-concrete", whole: 10, partA: 6, partB: 4, itemType: "shield" }
      },
      {
        stepTag: "Stage 5 · Try It Together (Missing Part Subtraction)",
        narrative: "TRY IT TOGETHER: The armory holds 10 shields in all. 7 are blue iron and the rest are gold. Subtract 10 − 7 to find the gold shields!",
        equationHTML: `10 − 7 = <span class="eq-mystery-box">?</span>`,
        visualSpec: { type: "number-bond-concrete", whole: 10, partA: 7, partB: 3, missing: "partB", itemType: "shield" },
        checkQuestion: {
          prompt: "10 − 7 =",
          choices: [2, 3, 4, 5],
          answer: 3,
          solvedEquationHTML: `10 − 7 = <span class="eq-mystery-box solved">3</span>`,
          coachText: "7 and 3 make 10, so 10 − 7 = 3!"
        }
      }
    ],
    generateProblem(tier) {
      const whole = tier === 1 ? randInt(5, 8) : randInt(7, 10);
      const takeAway = randInt(2, whole - 2);
      const remaining = whole - takeAway;
      if (tier === 1 || (tier === 2 && Math.random() < 0.5)) {
        return {
          story: `There were ${whole} raiders at the gate. You drove ${takeAway} of them away! How many are left?`,
          equationHTML: `${whole} − ${takeAway} = <span class="eq-mystery-box">?</span>`,
          solvedEquationHTML: `${whole} − ${takeAway} = <span class="eq-mystery-box solved">${remaining}</span>`,
          answer: remaining,
          choices: buildChoices(remaining, 1, 9),
          visualSpec: { type: "subtraction-crossout", whole, takeAway, remaining, itemType: "shield" },
          whyText: `Start with ${whole}, cross out ${takeAway}, and ${remaining} remain.`
        };
      } else {
        return {
          story: `The guardhouse holds ${whole} shields in all. ${takeAway} are iron and the rest are gold. How many are gold?`,
          equationHTML: `${whole} − ${takeAway} = <span class="eq-mystery-box">?</span>`,
          solvedEquationHTML: `${whole} − ${takeAway} = <span class="eq-mystery-box solved">${remaining}</span>`,
          answer: remaining,
          choices: buildChoices(remaining, 1, 9),
          visualSpec: { type: "number-bond-concrete", whole, partA: takeAway, partB: remaining, missing: "partB", itemType: "shield" },
          whyText: `Whole (${whole}) minus known part (${takeAway}) leaves ${remaining}.`
        };
      }
    }
  },

  {
    id: 5,
    act: 1,
    isBoss: true,
    title: "BOSS: The Forest Giant",
    subtitle: "Act I Boss: Addition, Subtraction & Number Bonds Within 10",
    gradeTag: "Dimensions 1A · Chapters 1–4 Boss",
    iconKey: "crest",
    missionType: "boss-giant",
    missionActionLabel: "Giant’s Armor Plates Cracked",
    mapPos: { x: 30, y: 34 },
    shortDesc: "ACT I BOSS: Crack the Forest Giant's 5 armor plates using Addition, Subtraction, and Number Bonds within 10!",
    teacherGuide: {
      wonder: "The Forest Giant tests whether the young Squire truly understands how Parts and Wholes work across Chapters 1–4—switching flexibly between joining parts (+) and decomposing a whole (−).",
      script: "Ask: 'Look closely at the sign and story: are we putting two parts together (+) or finding a missing part (−)?'",
      heuristic: "Addition & Subtraction Fact Families Within 10 (Dimensions 1A Ch. 1–4 Mastery).",
      handsOn: "Show 10 fingers, fold down 7: '10 minus 7 leaves 3 standing!'"
    },
    learnSteps: [
      {
        stepTag: "Boss Briefing 1 · Fact Families Within 10",
        narrative: "BEHOLD THE FOREST GIANT! Every Number Bond gives you both Addition (6 + 4 = 10) and Subtraction (10 − 6 = 4). Use both to crack his armor!",
        equationHTML: `10 − 6 = <span class="eq-mystery-box solved">4</span>`,
        visualSpec: { type: "number-bond-concrete", whole: 10, partA: 6, partB: 4, missing: "partB", itemType: "shield" }
      },
      {
        stepTag: "Boss Briefing 2 · Addition Warm-Up Strike",
        narrative: "WARM-UP STRIKE 1: Join 5 shields on the left and 3 shields on the right to forge your strike!",
        equationHTML: `5 + 3 = <span class="eq-mystery-box">?</span>`,
        visualSpec: { type: "number-bond-concrete", whole: 8, partA: 5, partB: 3, missing: "whole", itemType: "shield" },
        checkQuestion: {
          prompt: "Combine the two parts: 5 + 3 =",
          choices: [6, 7, 8, 9],
          answer: 8,
          solvedEquationHTML: `5 + 3 = <span class="eq-mystery-box solved">8</span>`,
          coachText: "Direct hit! 5 and 3 make 8!"
        }
      },
      {
        stepTag: "Boss Briefing 3 · Subtraction Warm-Up Strike",
        narrative: "WARM-UP STRIKE 2: The Giant's wooden club has 9 iron spikes in all. 5 are on the top side. How many spikes are on the other side?",
        equationHTML: `9 − 5 = <span class="eq-mystery-box">?</span>`,
        visualSpec: { type: "number-bond-concrete", whole: 9, partA: 5, partB: 4, missing: "partB", itemType: "shield" },
        checkQuestion: {
          prompt: "9 − 5 =",
          choices: [3, 4, 5, 6],
          answer: 4,
          solvedEquationHTML: `9 − 5 = <span class="eq-mystery-box solved">4</span>`,
          coachText: "5 and 4 make 9, so 9 − 5 = 4! Now enter the Boss Battle!"
        }
      }
    ],
    generateProblem(tier) {
      const whole = tier === 1 ? randInt(6, 8) : randInt(8, 10);
      const partA = randInt(2, whole - 2);
      const partB = whole - partA;
      const isSub = Math.random() < 0.6;
      if (isSub) {
        return {
          story: `Strike the Forest Giant! His shield has ${whole} plates in all. ${partA} are iron and the rest are gold. How many are gold?`,
          equationHTML: `${whole} − ${partA} = <span class="eq-mystery-box">?</span>`,
          solvedEquationHTML: `${whole} − ${partA} = <span class="eq-mystery-box solved">${partB}</span>`,
          answer: partB,
          choices: buildChoices(partB, 1, 9),
          visualSpec: { type: "number-bond-concrete", whole, partA, partB, missing: "partB", itemType: "shield" },
          whyText: `Whole (${whole}) minus the known part (${partA}) reveals ${partB}.`
        };
      } else {
        return {
          story: `Rally the archers! Join ${partA} arrows and ${partB} arrows to strike the Forest Giant!`,
          equationHTML: `${partA} + ${partB} = <span class="eq-mystery-box">?</span>`,
          solvedEquationHTML: `${partA} + ${partB} = <span class="eq-mystery-box solved">${whole}</span>`,
          answer: whole,
          choices: buildChoices(whole, 4, 10),
          visualSpec: { type: "number-bond-concrete", whole, partA, partB, missing: "whole", itemType: "shield" },
          whyText: `${partA} and ${partB} join to make ${whole}.`
        };
      }
    }
  },

  // ==========================================================================
  // ACT II: CROSSING THE RIVER OF TWENTY (Dimensions 1A, Chapters 5–9)
  // ==========================================================================
  {
    id: 6,
    act: 2,
    title: "Load the Supply Barges",
    subtitle: "Ch. 5: Numbers to 20 (Ten and Some More, Ordering & Adding Ones)",
    gradeTag: "Dimensions 1A · Chapter 5",
    iconKey: "loaf",
    missionType: "fort",
    missionActionLabel: "Supply Barges Loaded",
    mapPos: { x: 36, y: 18 },
    shortDesc: "Load 5 royal supply barges by mastering Teen Numbers (11–20) as 1 Full Ten and Loose Ones.",
    teacherGuide: {
      wonder: "Our entire decimal number system rests on grouping by 10! In Dimensions 1A Ch. 5, children discover that 'fourteen' literally means 'four and ten' (1 Ten and 4 Ones)—unlocking place value before they even reach 100.",
      script: "Ask: 'The top crate holds a full 10, and the bottom has loose ones. What is 10 and 6? What if we add 3 more ones to 14?'",
      heuristic: "Teen Numbers as 10 + Ones & Adding/Subtracting Ones Within 20 (Dimensions 1A Ch. 5, Lessons 1–6).",
      handsOn: "Bundle 10 sticks with a rubber band and place 4 loose sticks beside it: 10 + 4 = 14. Then add 3 more loose sticks: 14 + 3 = 17!"
    },
    learnSteps: [
      {
        stepTag: "Stage 1 · Teen Numbers Are 'Ten and Some More'",
        narrative: "Every teen number from 11 to 19 is 1 FULL TEN plus loose Ones! On the Double Ten-Frame, 10 on top and 4 below make 14!",
        equationHTML: `10 + 4 = <span class="eq-mystery-box solved">14</span>`,
        visualSpec: { type: "double-ten-frame", first: 10, second: 4, revealTotal: true }
      },
      {
        stepTag: "Stage 2 · Try It Together (10 and Ones)",
        narrative: "TRY IT TOGETHER: Look at the Double Ten-Frame: 1 full crate of 10 on top and loose ones on the bottom. Count the bottom frame and find 10 + 7!",
        equationHTML: `10 + 7 = <span class="eq-mystery-box">?</span>`,
        visualSpec: { type: "double-ten-frame", first: 10, second: 7 },
        checkQuestion: {
          prompt: "10 + 7 =",
          choices: [15, 16, 17, 18],
          answer: 17,
          solvedEquationHTML: `10 + 7 = <span class="eq-mystery-box solved">17</span>`,
          coachText: "10 and 7 make 17 (seven-teen)!"
        }
      },
      {
        stepTag: "Stage 3 · Adding Ones to a Teen Number",
        narrative: "When adding 13 + 5, keep the full 10 intact and simply add the loose ones: 3 + 5 = 8, so 10 + 8 = 18!",
        equationHTML: `13 + 5 = <span class="eq-mystery-box solved">18</span>`,
        visualSpec: { type: "double-ten-frame", first: 10, second: 8, revealTotal: true }
      },
      {
        stepTag: "Stage 4 · Try It Together (Adding Ones Within 20)",
        narrative: "TRY IT TOGETHER: The barge holds 12 crates (10 and 2), and the crew loads 4 more. Keep the 10 and add 2 + 4! What is 12 + 4?",
        equationHTML: `12 + 4 = <span class="eq-mystery-box">?</span>`,
        visualSpec: { type: "double-ten-frame", first: 10, second: 6 },
        checkQuestion: {
          prompt: "12 + 4 =",
          choices: [14, 15, 16, 17],
          answer: 16,
          solvedEquationHTML: `12 + 4 = <span class="eq-mystery-box solved">16</span>`,
          coachText: "Keep the 10, add 2 + 4 = 6 ones, and 10 + 6 = 16!"
        }
      }
    ],
    generateProblem(tier) {
      if (tier === 1) {
        const ones = randInt(1, 9);
        const total = 10 + ones;
        const itemNoun = pick(["loaves", "crates", "barrels", "lanterns"]);
        if (Math.random() < 0.65) {
          return {
            story: `Count the Double Ten-Frame on the ${itemNoun} barge! There is 1 full Ten on top and loose ones below. How many ${itemNoun} are there in all?`,
            equationHTML: `10 + ? = <span class="eq-mystery-box">?</span> (${itemNoun})`,
            solvedEquationHTML: `10 + ${ones} = <span class="eq-mystery-box solved">${total}</span> (${itemNoun})`,
            answer: total,
            choices: buildChoices(total, 11, 19),
            visualSpec: { type: "double-ten-frame", first: 10, second: ones },
            whyText: `1 full Ten (10) on top and ${ones} Ones below make ${total}.`
          };
        } else {
          const baseOnes = randInt(1, 6);
          const addOnes = randInt(1, 9 - baseOnes);
          const teen = 10 + baseOnes;
          const sum = teen + addOnes;
          return {
            story: `The barge holds ${teen} supply crates, and the squires load ${addOnes} more. How many crates are on the barge now?`,
            equationHTML: `${teen} + ${addOnes} = <span class="eq-mystery-box">?</span>`,
            solvedEquationHTML: `${teen} + ${addOnes} = <span class="eq-mystery-box solved">${sum}</span>`,
            answer: sum,
            choices: buildChoices(sum, 11, 20),
            visualSpec: { type: "double-ten-frame", first: 10, second: baseOnes + addOnes },
            whyText: `Keep the 10, and add ${baseOnes} + ${addOnes} = ${baseOnes + addOnes} ones to make ${sum}.`
          };
        }
      } else {
        const baseOnes = randInt(1, 7);
        const addOnes = randInt(1, 9 - baseOnes);
        const teen = 10 + baseOnes;
        const total = teen + addOnes;
        if (Math.random() < 0.35) {
          return {
            story: `The barge has ${total} supply crates in all, and ${addOnes} loose crates are unloaded. Subtract the ones while keeping the 10!`,
            equationHTML: `${total} − ${addOnes} = <span class="eq-mystery-box">?</span>`,
            solvedEquationHTML: `${total} − ${addOnes} = <span class="eq-mystery-box solved">${teen}</span>`,
            answer: teen,
            choices: buildChoices(teen, 10, 19),
            visualSpec: { type: "double-ten-frame", first: 10, second: baseOnes },
            whyText: `Keep 10, subtract ${baseOnes + addOnes} − ${addOnes} = ${baseOnes} -> ${teen}.`
          };
        }
        return {
          story: `The barge has ${teen} crates, and the crew loads ${addOnes} more. Add the ones while keeping the 10!`,
          equationHTML: `${teen} + ${addOnes} = <span class="eq-mystery-box">?</span>`,
          solvedEquationHTML: `${teen} + ${addOnes} = <span class="eq-mystery-box solved">${total}</span>`,
          answer: total,
          choices: buildChoices(total, 11, 20),
          visualSpec: { type: "double-ten-frame", first: 10, second: baseOnes + addOnes },
          whyText: `Keep 10, add ${baseOnes} + ${addOnes} = ${baseOnes + addOnes} -> ${total}.`
        };
      }
    }
  },

  {
    id: 7,
    act: 2,
    title: "Defend the Stone Bridge",
    subtitle: "Ch. 6: Addition to 20 (Make-10 Strategy with 9, 8, 7 & 6)",
    gradeTag: "Dimensions 1A · Chapter 6",
    iconKey: "bridge",
    missionType: "bandits",
    missionActionLabel: "Bridge Raiders Repelled",
    mapPos: { x: 43, y: 32 },
    shortDesc: "Repel 5 River Raiders at the Stone Bridge by bridging through 10 (Make-10 strategy)!",
    teacherGuide: {
      wonder: "Why guess or count on fingers past 10 when you can use the anchor of 10? The signature Singapore 'Make 10' bridge turns hard sums like 8 + 6 into an effortless 10 + 4 = 14!",
      script: "Ask: 'How many empty spots are left in the top Ten-Frame? Borrow that many from the second number to Make 10, then add what is left!'",
      heuristic: "Make-10 Addition Bridge with 9, 8, 7, and 6 (Dimensions 1A Ch. 6, Lessons 1–6).",
      handsOn: "Put 8 coins in a 10-frame and 5 outside. Slide 2 coins in to fill the 10: now you see 10 and 3 = 13!"
    },
    learnSteps: [
      {
        stepTag: "Stage 1 · Make 10 When Adding to 9",
        narrative: "When 9 knights meet 5 knights (9 + 5), look at the top Ten-Frame: 9 needs just 1 more to Make 10! Split 5 into 1 and 4 -> 10 + 4 = 14!",
        equationHTML: `9 + 5 = 10 + 4 = <span class="eq-mystery-box solved">14</span>`,
        visualSpec: { type: "make-ten", a: 9, b: 5, needForTen: 1, leftover: 4, total: 14, revealSplit: true }
      },
      {
        stepTag: "Stage 2 · Try It Together (Make 10 with 9)",
        narrative: "TRY IT TOGETHER: Solve 9 + 6 using the Make-10 bridge! Give 1 from the 6 to turn 9 into 10, then add what is left over!",
        equationHTML: `9 + 6 = <span class="eq-mystery-box">?</span>`,
        visualSpec: { type: "make-ten", a: 9, b: 6, needForTen: 1, leftover: 5, total: 15 },
        checkQuestion: {
          prompt: "9 + 6 =",
          choices: [13, 14, 15, 16],
          answer: 15,
          solvedEquationHTML: `9 + 6 = 10 + 5 = <span class="eq-mystery-box solved">15</span>`,
          coachText: "9 + 1 = 10, and 5 left over makes 10 + 5 = 15!"
        }
      },
      {
        stepTag: "Stage 3 · Make 10 When Adding to 8",
        narrative: "When 8 meets 6 (8 + 6), 8 has 2 empty spots in its Ten-Frame! Split 6 into 2 and 4 -> 8 + 2 = 10, and 10 + 4 = 14!",
        equationHTML: `8 + 6 = 10 + 4 = <span class="eq-mystery-box solved">14</span>`,
        visualSpec: { type: "make-ten", a: 8, b: 6, needForTen: 2, leftover: 4, total: 14, revealSplit: true }
      },
      {
        stepTag: "Stage 4 · Make 10 When Adding to 7 and 6",
        narrative: "When 7 meets 5 (7 + 5), 7 needs 3 to Make 10! Split 5 into 3 and 2 -> 7 + 3 = 10, and 10 + 2 = 12!",
        equationHTML: `7 + 5 = 10 + 2 = <span class="eq-mystery-box solved">12</span>`,
        visualSpec: { type: "make-ten", a: 7, b: 5, needForTen: 3, leftover: 2, total: 12, revealSplit: true }
      },
      {
        stepTag: "Stage 5 · Try It Together (Make 10 with 8)",
        narrative: "TRY IT TOGETHER: 8 archers on the bridge are joined by 5 more (8 + 5). Split 5 to fill the 10 first! What is 8 + 5?",
        equationHTML: `8 + 5 = <span class="eq-mystery-box">?</span>`,
        visualSpec: { type: "make-ten", a: 8, b: 5, needForTen: 2, leftover: 3, total: 13 },
        checkQuestion: {
          prompt: "8 + 5 =",
          choices: [11, 12, 13, 14],
          answer: 13,
          solvedEquationHTML: `8 + 5 = 10 + 3 = <span class="eq-mystery-box solved">13</span>`,
          coachText: "8 + 2 makes 10, plus 3 left over makes 13!"
        }
      }
    ],
    generateProblem(tier) {
      const a = tier === 1 ? pick([8, 9]) : tier === 2 ? pick([7, 8, 9]) : pick([6, 7, 8, 9]);
      const needForTen = 10 - a;
      const b = randInt(needForTen + 1, 9);
      const leftover = b - needForTen;
      const total = 10 + leftover;
      if (tier <= 2 && Math.random() < 0.35) {
        return {
          story: `Hold the Stone Bridge! To solve ${a} + ${b} by Making 10, we give ${needForTen} from ${b} to turn ${a} into 10. How many of the ${b} are left over to add to 10?`,
          equationHTML: `${a} + ${b} = 10 + <span class="eq-mystery-box">?</span>`,
          solvedEquationHTML: `${a} + ${b} = 10 + <span class="eq-mystery-box solved">${leftover}</span> (${total})`,
          answer: leftover,
          choices: buildChoices(leftover, 1, 8),
          visualSpec: { type: "make-ten", a, b, needForTen, leftover, total },
          whyText: `Splitting ${b} into ${needForTen} (to make 10) and ${leftover} leaves ${leftover} to add to 10!`
        };
      }
      return {
        story: `Hold the Stone Bridge! ${a} knights stand ready and ${b} more join them. Bridge through 10 to find ${a} + ${b}!`,
        equationHTML: `${a} + ${b} = <span class="eq-mystery-box">?</span>`,
        solvedEquationHTML: `${a} + ${b} = 10 + ${leftover} = <span class="eq-mystery-box solved">${total}</span>`,
        answer: total,
        choices: buildChoices(total, 11, 19),
        visualSpec: { type: "make-ten", a, b, needForTen, leftover, total },
        whyText: `Split ${b} into ${needForTen} and ${leftover}. ${a} + ${needForTen} = 10, plus ${leftover} is ${total}.`
      };
    }
  },

  {
    id: 8,
    act: 2,
    title: "Free the Captured Squires",
    subtitle: "Ch. 7: Subtraction Within 20 (Subtract from 10)",
    gradeTag: "Dimensions 1A · Chapter 7",
    iconKey: "shieldBronze",
    missionType: "locks",
    missionActionLabel: "Prison Chains Cut",
    mapPos: { x: 42, y: 54 },
    shortDesc: "Cut 5 chains to free the captured squires using Singapore's 'Subtract from 10' strategy!",
    teacherGuide: {
      wonder: "Instead of counting backward one-by-one from 14 or 15 (which is slow and error-prone), Dimensions 1A Ch. 7 uses our knowledge of 10-bonds: take the number straight out of the 10 first, then add the remaining ones!",
      script: "Ask: 'Can we take 8 from 3 loose ones? No! So take 8 straight out of the full 10 (leaving 2), and add that 2 to the 3 ones!'",
      heuristic: "Subtract from 10 Strategy (Dimensions 1A Ch. 7, Lessons 1–6).",
      handsOn: "Split 14 into a cup of 10 and 4 loose coins. Take 9 out of the 10-cup (1 left), plus 4 loose coins = 5!"
    },
    learnSteps: [
      {
        stepTag: "Stage 1 · Subtracting from the Ten",
        narrative: "To solve 13 − 8: we cannot take 8 from 3 loose ones! So split 13 into 10 and 3, take 8 straight from the 10 (leaving 2), and combine 2 + 3 = 5!",
        equationHTML: `13 − 8 = <span class="eq-mystery-box solved">5</span>`,
        visualSpec: { type: "subtract-from-ten", teen: 13, ones: 3, sub: 8, leftInTen: 2, answer: 5, revealSplit: true }
      },
      {
        stepTag: "Stage 2 · Try It Together (Subtracting 9 from 10)",
        narrative: "TRY IT TOGETHER: Solve 14 − 9! Split 14 into 10 and 4. Take 9 out of the 10, then add what is left to the 4 ones!",
        equationHTML: `14 − 9 = <span class="eq-mystery-box">?</span>`,
        visualSpec: { type: "subtract-from-ten", teen: 14, ones: 4, sub: 9, leftInTen: 1, answer: 5 },
        checkQuestion: {
          prompt: "14 − 9 =",
          choices: [4, 5, 6, 7],
          answer: 5,
          solvedEquationHTML: `14 − 9 = <span class="eq-mystery-box solved">5</span>`,
          coachText: "10 − 9 leaves 1 in the top frame, plus 4 below makes 5!"
        }
      },
      {
        stepTag: "Stage 3 · Subtracting 7 and 8 Across 10",
        narrative: "To solve 15 − 7: split 15 into 10 and 5. Take 7 from 10 (leaving 3), then add 3 + 5 = 8!",
        equationHTML: `15 − 7 = <span class="eq-mystery-box solved">8</span>`,
        visualSpec: { type: "subtract-from-ten", teen: 15, ones: 5, sub: 7, leftInTen: 3, answer: 8, revealSplit: true }
      },
      {
        stepTag: "Stage 4 · Try It Together (Subtracting 8)",
        narrative: "TRY IT TOGETHER: Cut the heavy chain of 16 links by striking off 8 (16 − 8). Take 8 from 10 first, then add the loose ones!",
        equationHTML: `16 − 8 = <span class="eq-mystery-box">?</span>`,
        visualSpec: { type: "subtract-from-ten", teen: 16, ones: 6, sub: 8, leftInTen: 2, answer: 8 },
        checkQuestion: {
          prompt: "16 − 8 =",
          choices: [6, 7, 8, 9],
          answer: 8,
          solvedEquationHTML: `16 − 8 = <span class="eq-mystery-box solved">8</span>`,
          coachText: "10 − 8 = 2, and 2 + 6 = 8 (and double 8 is 16)!"
        }
      }
    ],
    generateProblem(tier) {
      const sub = tier === 1 ? pick([8, 9]) : pick([6, 7, 8, 9]);
      const ones = randInt(1, sub - 1);
      const teen = 10 + ones;
      const leftInTen = 10 - sub;
      const answer = leftInTen + ones;
      return {
        story: `Cut the chain! We have ${teen} links and strike off ${sub}. Take ${sub} from the 10 first, then add the remaining ones!`,
        equationHTML: `${teen} − ${sub} = <span class="eq-mystery-box">?</span>`,
        solvedEquationHTML: `${teen} − ${sub} = <span class="eq-mystery-box solved">${answer}</span>`,
        answer,
        choices: buildChoices(answer, 2, 12),
        visualSpec: { type: "subtract-from-ten", teen, ones, sub, leftInTen, answer },
        whyText: `10 − ${sub} leaves ${leftInTen}. Then ${leftInTen} + ${ones} = ${answer}.`
      };
    }
  },

  {
    id: 9,
    act: 2,
    title: "Forge the Royal Shields",
    subtitle: "Ch. 8: Shapes, Sides, Corners & Patterns",
    gradeTag: "Dimensions 1A · Chapter 8",
    iconKey: "shieldSilver",
    missionType: "fort",
    missionActionLabel: "Heraldic Shields Crafted",
    mapPos: { x: 49, y: 68 },
    shortDesc: "Craft 5 heraldic shields by counting straight sides, corners (vertices), composite shapes, and patterns!",
    teacherGuide: {
      wonder: "From the 6-sided honeycomb of the bee to the symmetry of crystals, God filled creation with geometric order! In Dimensions 1A Ch. 8, children classify shapes by their straight sides and corners (vertices) and compose new shapes.",
      script: "Ask: 'Count the golden corner dots around the shape—how many straight sides and corners does this shield have?'",
      heuristic: "Shape Attributes, Composite Shapes & Patterns (Dimensions 1A Ch. 8, Lessons 1–6).",
      handsOn: "Cut a paper square diagonally into 2 triangles and let him reassemble them into a square or big triangle!"
    },
    learnSteps: [
      {
        stepTag: "Stage 1 · Triangles & 4-Sided Quadrilaterals",
        narrative: "Every polygon has the exact same number of straight sides and corners! A Triangle has 3 sides and 3 corners; a Square, Rectangle, or Trapezoid has 4!",
        equationHTML: `Triangle Corners = <span class="eq-mystery-box solved">3</span>`,
        visualSpec: { type: "shapes", mode: "single", shape: "triangle", showCornerNumbers: true }
      },
      {
        stepTag: "Stage 2 · Pentagons, Hexagons & Circles",
        narrative: "A Pentagon has 5 straight sides and 5 corners, and a honeycomb Hexagon has 6 sides and 6 corners! A round Circle has 0 straight sides and 0 corners.",
        equationHTML: `Hexagon Sides = <span class="eq-mystery-box solved">6</span>`,
        visualSpec: { type: "shapes", mode: "single", shape: "hexagon", showCornerNumbers: true }
      },
      {
        stepTag: "Stage 3 · Try It Together (Counting Vertices)",
        narrative: "TRY IT TOGETHER: Count the golden corner dots on this royal Pentagon shield. How many corners does a Pentagon have?",
        equationHTML: `Pentagon Corners = <span class="eq-mystery-box">?</span>`,
        visualSpec: { type: "shapes", mode: "single", shape: "pentagon" },
        checkQuestion: {
          prompt: "Pentagon corners:",
          choices: [3, 4, 5, 6],
          answer: 5,
          solvedEquationHTML: `Pentagon Corners = <span class="eq-mystery-box solved">5</span>`,
          coachText: "Touch the 5 golden dots around the Pentagon: it has 5 corners!"
        }
      },
      {
        stepTag: "Stage 4 · Composing New Shapes",
        narrative: "Smaller shapes can join to form a new composite shape! Two right Triangles joined along their longest side form 1 four-sided Square!",
        equationHTML: `2 Triangles make a <span class="eq-mystery-box solved">4</span>-sided Square`,
        visualSpec: { type: "shapes", mode: "composite" }
      }
    ],
    generateProblem(tier) {
      const catalog = [
        { key: "circle", label: "Circle", count: 0 },
        { key: "triangle", label: "Triangle", count: 3 },
        { key: "square", label: "Square", count: 4 },
        { key: "rectangle", label: "Rectangle", count: 4 },
        { key: "trapezoid", label: "Trapezoid", count: 4 },
        { key: "pentagon", label: "Pentagon", count: 5 },
        { key: "hexagon", label: "Hexagon", count: 6 }
      ];
      const polygons = catalog.slice(1);
      if (tier === 1) {
        if (Math.random() < 0.7) {
          const item = pick(catalog);
          const attr = Math.random() < 0.5 ? "corners" : "straight sides";
          return {
            story: `Inspect the ${item.label} shield on the anvil! Count carefully: how many ${attr} does this ${item.label} have?`,
            equationHTML: `${item.label} ${attr} = <span class="eq-mystery-box">?</span>`,
            solvedEquationHTML: `${item.label} ${attr} = <span class="eq-mystery-box solved">${item.count}</span>`,
            answer: item.count,
            choices: [0, 3, 4, 5, 6].filter(x => x === item.count || x > 0).slice(0, 4).sort((a, b) => a - b),
            visualSpec: { type: "shapes", mode: "single", shape: item.key },
            whyText: `Counting around the shape shows a ${item.label} has ${item.count} ${attr}.`
          };
        } else {
          const s1 = pick(polygons);
          const s2 = pick(polygons);
          const totalSides = s1.count + s2.count;
          return {
            story: `Look at the two heraldic shields: a ${s1.label} and a ${s2.label}. Count their straight sides—how many straight sides do they have in all?`,
            equationHTML: `${s1.label} + ${s2.label} = <span class="eq-mystery-box">?</span> sides`,
            solvedEquationHTML: `${s1.label} (${s1.count}) + ${s2.label} (${s2.count}) = <span class="eq-mystery-box solved">${totalSides}</span> sides`,
            answer: totalSides,
            choices: buildChoices(totalSides, 5, 13),
            visualSpec: { type: "shapes", mode: "pattern", pattern: [s1.key, s2.key] },
            whyText: `A ${s1.label} (${s1.count}) plus a ${s2.label} (${s2.count}) makes ${totalSides} sides in all!`
          };
        }
      } else {
        const s1 = pick(polygons);
        const s2 = pick(polygons);
        const attr = Math.random() < 0.5 ? "corners" : "straight sides";
        if (Math.random() < 0.35 && s1.count !== s2.count) {
          const big = s1.count > s2.count ? s1 : s2;
          const small = s1.count > s2.count ? s2 : s1;
          const diff = big.count - small.count;
          return {
            keepVisualInTier3: true,
            story: `Compare the two heraldic shields: a ${big.label} and a ${small.label}. How many MORE ${attr} does the ${big.label} have than the ${small.label}?`,
            equationHTML: `${big.label} − ${small.label} = <span class="eq-mystery-box">?</span> more ${attr}`,
            solvedEquationHTML: `${big.label} (${big.count}) − ${small.label} (${small.count}) = <span class="eq-mystery-box solved">${diff}</span> more ${attr}`,
            answer: diff,
            choices: buildChoices(diff, 1, 6),
            visualSpec: { type: "shapes", mode: "pattern", pattern: [big.key, small.key] },
            whyText: `A ${big.label} has ${big.count} ${attr} and a ${small.label} has ${small.count} ${attr}, so ${big.count} − ${small.count} = ${diff} more!`
          };
        }
        const totalCorners = s1.count + s2.count;
        return {
          keepVisualInTier3: true,
          story: `Count the ${attr} on the ${s1.label} and the ${s2.label}. How many ${attr} do the two shields have ALTOGETHER?`,
          equationHTML: `${s1.label} + ${s2.label} = <span class="eq-mystery-box">?</span> ${attr}`,
          solvedEquationHTML: `${s1.label} (${s1.count}) + ${s2.label} (${s2.count}) = <span class="eq-mystery-box solved">${totalCorners}</span> ${attr}`,
          answer: totalCorners,
          choices: buildChoices(totalCorners, 5, 13),
          visualSpec: { type: "shapes", mode: "pattern", pattern: [s1.key, s2.key] },
          whyText: `A ${s1.label} (${s1.count}) plus a ${s2.label} (${s2.count}) makes ${totalCorners} ${attr} in all!`
        };
      }
    }
  },

  {
    id: 10,
    act: 2,
    title: "Line Up the Royal Guard",
    subtitle: "Ch. 9: Ordinal Numbers (1st through 10th Position)",
    gradeTag: "Dimensions 1A · Chapter 9",
    iconKey: "crown",
    missionType: "bandits",
    missionActionLabel: "Guard Ranks Ordered",
    mapPos: { x: 55, y: 52 },
    shortDesc: "Order 5 ranks of the Royal Guard using ordinal positions (1st, 2nd, 3rd ... 10th) from the Castle Gate!",
    teacherGuide: {
      wonder: "In Creation—from the First Day to the Seventh Day—order and sequence matter! Dimensions 1A Ch. 9 distinguishes cardinal numbers (how many in all) from ordinal numbers (which position in line from a reference point).",
      script: "Ask: 'Find the Castle Gate where 1st begins! Is the Gate on the left or the right? Now count along the line to the Golden Crown!'",
      heuristic: "Ordinal Positions 1st–10th from Left/Right & Relative Position (Dimensions 1A Ch. 9, Lessons 1–4).",
      handsOn: "Line up 6 toy knights facing a cup and ask which knight is 1st, 3rd, and 5th—then turn the cup to the other end and recount!"
    },
    learnSteps: [
      {
        stepTag: "Stage 1 · Counting Ordinal Positions from the Left",
        narrative: "Always check where 1st begins! Starting at the Castle Gate on the LEFT (1st, 2nd, 3rd, 4th), the Golden Crown shield stands 4th in line!",
        equationHTML: `Position from Left Gate = <span class="eq-mystery-box solved">4</span>th`,
        visualSpec: { type: "ordinals", total: 7, targetPos: 4, fromDirection: "left", revealOrdinals: true }
      },
      {
        stepTag: "Stage 2 · Counting Ordinal Positions from the Right",
        narrative: "When the Castle Gate is on the RIGHT, we count 1st, 2nd, 3rd starting from the right end!",
        equationHTML: `Position from Right Gate = <span class="eq-mystery-box solved">3</span>rd`,
        visualSpec: { type: "ordinals", total: 7, targetPos: 3, fromDirection: "right", revealOrdinals: true }
      },
      {
        stepTag: "Stage 3 · Try It Together (Right-to-Left Ordinals)",
        narrative: "TRY IT TOGETHER: Look at the Castle Gate on the RIGHT (1st). Count from the right gate to the Golden Crown shield. What position is it?",
        equationHTML: `Position from Right Gate = <span class="eq-mystery-box">?</span>th`,
        visualSpec: { type: "ordinals", total: 7, targetPos: 5, fromDirection: "right" },
        checkQuestion: {
          prompt: "Position from the Right Gate:",
          choices: [3, 4, 5, 6],
          answer: 5,
          solvedEquationHTML: `Position from Right Gate = <span class="eq-mystery-box solved">5</span>th`,
          coachText: "Counting from the right gate (1st, 2nd, 3rd, 4th, 5th), the Crown is 5th!"
        }
      },
      {
        stepTag: "Stage 4 · Moving Forward & Backward in Line",
        narrative: "If a knight is 2nd in line and steps 3 places further back (2 + 3), he is now in 5th place!",
        equationHTML: `2nd + 3 places back = <span class="eq-mystery-box solved">5</span>th`,
        visualSpec: { type: "ordinals", total: 7, targetPos: 5, fromDirection: "left", revealOrdinals: true }
      }
    ],
    generateProblem(tier) {
      const total = tier === 1 ? pick([6, 7, 8, 9, 10]) : tier === 2 ? pick([7, 8, 9, 10]) : pick([8, 9, 10]);
      const fromDirection = tier === 1 ? pick(["left", "right"]) : pick(["left", "right"]);
      if (tier < 3) {
        const targetPos = randInt(1, total);
        const suffix = targetPos === 1 ? "st" : targetPos === 2 ? "nd" : targetPos === 3 ? "rd" : "th";
        return {
          story: `Start at the Castle Gate (1st on the ${fromDirection} of ${total} guards)! In which position is the Golden Crown shield?`,
          equationHTML: `Position (${fromDirection} of ${total}) = <span class="eq-mystery-box">?</span>${suffix}`,
          solvedEquationHTML: `Position (${fromDirection} of ${total}) = <span class="eq-mystery-box solved">${targetPos}</span>${suffix}`,
          answer: targetPos,
          choices: buildChoices(targetPos, 1, total),
          visualSpec: { type: "ordinals", total, targetPos, fromDirection },
          whyText: `Counting from the Castle Gate (1st on the ${fromDirection}), the Golden Crown shield is #${targetPos} (${targetPos}${suffix}).`
        };
      } else {
        const targetPos = randInt(1, 6);
        const stepBack = randInt(1, Math.min(4, total - targetPos));
        const newPos = targetPos + stepBack;
        const suffix = newPos === 1 ? "st" : newPos === 2 ? "nd" : newPos === 3 ? "rd" : "th";
        return {
          keepVisualInTier3: true,
          story: `MENTAL MATH: The Golden Crown is at #${targetPos} from the left Gate. If he moves ${stepBack} places further back in line, what position will he be in?`,
          equationHTML: `${targetPos} + ${stepBack} = <span class="eq-mystery-box">?</span>${suffix}`,
          solvedEquationHTML: `${targetPos} + ${stepBack} = <span class="eq-mystery-box solved">${newPos}</span>${suffix}`,
          answer: newPos,
          choices: buildChoices(newPos, 1, 10),
          visualSpec: { type: "ordinals", total, targetPos, fromDirection: "left" },
          whyText: `Starting at ${targetPos} and moving ${stepBack} places back (${targetPos} + ${stepBack}) puts him in ${newPos}${suffix} place!`
        };
      }
    }
  },

  {
    id: 11,
    act: 2,
    isBoss: true,
    title: "BOSS: The River Serpent",
    subtitle: "Act II Boss: Make-10, Subtract-from-10, Shapes & Ordinals",
    gradeTag: "Dimensions 1A · Chapters 5–9 Boss",
    iconKey: "crest",
    missionType: "boss-serpent",
    missionActionLabel: "Serpent Scales Struck",
    mapPos: { x: 56, y: 28 },
    shortDesc: "ACT II BOSS: Defeat the River Sea-Serpent to crown Semester 1A (Make-10, Subtract-from-10, Shapes & Ordinals)!",
    teacherGuide: {
      wonder: "This Boss Battle crowns Semester 1 (Dimensions 1A Chapters 5–9) by synthesizing Make-10 addition, Subtract-from-10, Geometry, and Ordinals!",
      script: "Ask: 'Before you strike, name your strategy: Are we Making 10, Subtracting from 10, or counting corners and ranks?'",
      heuristic: "Dimensions 1A Complete Semester Mastery.",
      handsOn: "Celebrate completing all of Dimensions 1A when the River Serpent falls!"
    },
    learnSteps: [
      {
        stepTag: "Step 1 of 3 · Make-10 Sword",
        narrative: "BOSS WARM-UP 1: Strike with your Make-10 Sword! For 8 + 5, give 2 to the 8 to make 10, then add what is left over!",
        equationHTML: `8 + 5 = <span class="eq-mystery-box">?</span>`,
        visualSpec: { type: "make-ten", a: 8, b: 5, needForTen: 2, leftover: 3, total: 13 },
        checkQuestion: {
          prompt: "Test your Make-10 Sword: What is 8 + 5?",
          choices: [12, 13, 14, 15],
          answer: 13,
          solvedEquationHTML: `8 + 5 = 10 + 3 = <span class="eq-mystery-box solved">13</span>`,
          coachText: "Direct hit! 8 + 2 makes 10, plus 3 makes 13!"
        }
      },
      {
        stepTag: "Step 2 of 3 · Subtract-from-10 Shield",
        narrative: "BOSS WARM-UP 2: Raise your Subtract-from-10 Shield! For 14 − 8, take 8 from the full 10-frame, then add the remaining ones!",
        equationHTML: `14 − 8 = <span class="eq-mystery-box">?</span>`,
        visualSpec: { type: "subtract-from-ten", teen: 14, ones: 4, sub: 8, leftInTen: 2, answer: 6 },
        checkQuestion: {
          prompt: "Test your Subtract-from-10 Shield: What is 14 − 8?",
          choices: [4, 5, 6, 7],
          answer: 6,
          solvedEquationHTML: `14 − 8 = 2 + 4 = <span class="eq-mystery-box solved">6</span>`,
          coachText: "Well blocked! 10 − 8 leaves 2, and 2 + 4 = 6!"
        }
      },
      {
        stepTag: "Step 3 of 3 · Geometry Crest",
        narrative: "BOSS WARM-UP 3: Pierce the Serpent's Hexagon crest by counting its 6 straight sides and 6 corners! Now enter the Trial!",
        equationHTML: `Hexagon corners = <span class="eq-mystery-box solved">6</span>`,
        visualSpec: { type: "shapes", mode: "single", shape: "hexagon", showCornerNumbers: true }
      }
    ],
    generateProblem(tier) {
      const roll = randInt(1, 3);
      if (roll === 1) {
        const a = pick([7, 8, 9]);
        const needForTen = 10 - a;
        const b = randInt(needForTen + 1, 8);
        const leftover = b - needForTen;
        const total = 10 + leftover;
        return {
          story: `Strike the River Serpent! Combine ${a} and ${b} using Make-10!`,
          equationHTML: `${a} + ${b} = <span class="eq-mystery-box">?</span>`,
          solvedEquationHTML: `${a} + ${b} = <span class="eq-mystery-box solved">${total}</span>`,
          answer: total,
          choices: buildChoices(total, 11, 18),
          visualSpec: { type: "make-ten", a, b, needForTen, leftover, total },
          whyText: `${a} + ${needForTen} = 10, plus ${leftover} makes ${total}.`
        };
      } else if (roll === 2) {
        const sub = pick([7, 8, 9]);
        const ones = randInt(2, sub - 1);
        const teen = 10 + ones;
        const leftInTen = 10 - sub;
        const answer = leftInTen + ones;
        return {
          story: `Block the Serpent's tail! Solve ${teen} − ${sub} by taking ${sub} from 10!`,
          equationHTML: `${teen} − ${sub} = <span class="eq-mystery-box">?</span>`,
          solvedEquationHTML: `${teen} − ${sub} = <span class="eq-mystery-box solved">${answer}</span>`,
          answer,
          choices: buildChoices(answer, 2, 11),
          visualSpec: { type: "subtract-from-ten", teen, ones, sub, leftInTen, answer },
          whyText: `10 − ${sub} = ${leftInTen}, plus ${ones} makes ${answer}.`
        };
      } else {
        if (Math.random() < 0.5) {
          const sh = pick([
            { key: "circle", label: "Circle", count: 0 },
            { key: "triangle", label: "Triangle", count: 3 },
            { key: "square", label: "Square", count: 4 },
            { key: "rectangle", label: "Rectangle", count: 4 },
            { key: "trapezoid", label: "Trapezoid", count: 4 },
            { key: "pentagon", label: "Pentagon", count: 5 },
            { key: "hexagon", label: "Hexagon", count: 6 }
          ]);
          return {
            story: `Pierce the Serpent's crest! How many corners does this ${sh.label} crest have?`,
            equationHTML: `${sh.label} corners = <span class="eq-mystery-box">?</span>`,
            solvedEquationHTML: `${sh.label} corners = <span class="eq-mystery-box solved">${sh.count}</span>`,
            answer: sh.count,
            choices: [0, 3, 4, 5, 6].filter(x => x === sh.count || x > 0).slice(0, 4).sort((a, b) => a - b),
            visualSpec: { type: "shapes", mode: "single", shape: sh.key },
            whyText: `A ${sh.label} has ${sh.count} corners.`
          };
        } else {
          const total = pick([7, 8, 9]);
          const fromDirection = pick(["left", "right"]);
          const targetPos = randInt(1, total);
          const suffix = targetPos === 1 ? "st" : targetPos === 2 ? "nd" : targetPos === 3 ? "rd" : "th";
          return {
            story: `Spot the Serpent's Weak Scale! Starting from the ${fromDirection} Gate (1st of ${total}), which position is the Golden Crown shield?`,
            equationHTML: `Position (${fromDirection} of ${total}) = <span class="eq-mystery-box">?</span>${suffix}`,
            solvedEquationHTML: `Position (${fromDirection} of ${total}) = <span class="eq-mystery-box solved">${targetPos}</span>${suffix}`,
            answer: targetPos,
            choices: buildChoices(targetPos, 1, total),
            visualSpec: { type: "ordinals", total, targetPos, fromDirection },
            whyText: `Counting from the ${fromDirection} Gate, the Golden Crown is #${targetPos} (${targetPos}${suffix}).`
          };
        }
      }
    }
  },

  // ==========================================================================
  // ACT III: THE HIGHLAND STRONGHOLDS TO 40 (Dimensions 1B, Chapters 10–15)
  // ==========================================================================
  {
    id: 12,
    act: 3,
    title: "Measure the Siege Beams",
    subtitle: "Ch. 10: Length (Measuring with Block Units & Comparing)",
    gradeTag: "Dimensions 1B · Chapter 10",
    iconKey: "log",
    missionType: "fort",
    missionActionLabel: "Siege Beams Measured",
    mapPos: { x: 63, y: 16 },
    shortDesc: "Measure 5 royal swords and siege beams by counting non-standard block units end-to-end!",
    teacherGuide: {
      wonder: "Scripture tells us that God 'measured the waters in the hollow of His hand and marked off the heavens with a span' (Isaiah 40:12). In Dimensions 1B Ch. 10, children learn the core principles of honest measurement before using rulers: aligning equal-sized units end-to-end from a common baseline with zero gaps or overlaps!",
      script: "Ask: 'See how the golden measuring blocks line up flush from hilt to tip with no gaps? How many blocks long is each blade?'",
      heuristic: "Non-Standard Unit Measurement & Length Comparison (1B Ch. 10).",
      handsOn: "Measure a pencil and a book using equal-sized LEGO bricks or paperclips lined up end-to-end."
    },
    learnSteps: [
      {
        stepTag: "Step 1 of 4 · Concrete Baseline & Units",
        narrative: "Before a master builder uses a ruler, he lines up equal-sized blocks end-to-end with no gaps or overlaps. This Royal Broadsword is 6 blocks long!",
        equationHTML: `Length = <span class="eq-mystery-box solved">6</span> blocks`,
        visualSpec: { type: "length-units", lengthA: 6, lengthB: null, revealNumbers: true }
      },
      {
        stepTag: "Step 2 of 4 · Try It Together",
        narrative: "Count the golden measuring blocks under this Longsword from left to right. How many blocks long is it?",
        equationHTML: `Length = <span class="eq-mystery-box">?</span> blocks`,
        visualSpec: { type: "length-units", lengthA: 8, lengthB: null },
        checkQuestion: {
          prompt: "How many measuring blocks long is the Longsword?",
          choices: [6, 7, 8, 9],
          answer: 8,
          solvedEquationHTML: `Length = <span class="eq-mystery-box solved">8</span> blocks`,
          coachText: "Exact measure! Eight equal blocks from hilt to tip makes 8 blocks long."
        }
      },
      {
        stepTag: "Step 3 of 4 · Pictorial Length Comparison",
        narrative: "We can also compare two blades starting at the same line! Count the blocks: Sword A is 8 blocks long and Sword B is 5 blocks long, so Sword A is 8 − 5 = 3 blocks longer!",
        equationHTML: `8 − 5 = <span class="eq-mystery-box solved">3</span> blocks longer`,
        visualSpec: { type: "length-units", lengthA: 8, lengthB: 5, revealNumbers: true }
      },
      {
        stepTag: "Step 4 of 4 · Offset Baseline ('Watch the Start Line!')",
        narrative: "Careful! What if a blade does NOT start at the first block? Here there are 2 empty blocks before the blade begins! Count only the blocks underneath the blade!",
        equationHTML: `Blade Length = <span class="eq-mystery-box">?</span> blocks`,
        visualSpec: { type: "length-units", lengthA: 5, lengthB: null, offsetA: 2 },
        checkQuestion: {
          prompt: "Skip the 2 empty blocks at the start! How many golden blocks long is the blade itself?",
          choices: [4, 5, 6, 7],
          answer: 5,
          solvedEquationHTML: `Blade Length = <span class="eq-mystery-box solved">5</span> blocks`,
          coachText: "Sharp eye! Even though it ends at block 7, it started after 2 empty blocks (7 − 2 = 5 blocks long)!"
        }
      }
    ],
    generateProblem(tier) {
      const bladeName = pick(["Royal Broadsword", "Knight's Lance", "Oak Siege Beam", "Highland Longsword", "Squire's Dagger"]);
      if (tier === 1) {
        const roll = Math.random();
        if (roll < 0.35) {
          const len = randInt(4, 10);
          return {
            story: `Measure the ${bladeName}! Count the unnumbered measuring blocks from end to end—how many blocks long is it?`,
            equationHTML: `${bladeName} = <span class="eq-mystery-box">?</span> blocks`,
            solvedEquationHTML: `${bladeName} = <span class="eq-mystery-box solved">${len}</span> blocks`,
            answer: len,
            choices: buildChoices(len, 2, 10),
            visualSpec: { type: "length-units", lengthA: len, lengthB: null, labelA: bladeName },
            whyText: `Counting the equal blocks from hilt to tip shows the ${bladeName} is ${len} blocks long.`
          };
        } else if (roll < 0.65) {
          const offsetA = randInt(1, 3);
          const len = randInt(4, 7);
          return {
            story: `Watch the baseline! The ${bladeName} starts after ${offsetA} empty ${offsetA === 1 ? "block" : "blocks"}. Count only the golden blocks underneath the ${bladeName}—how many blocks long is it?`,
            equationHTML: `${bladeName} (offset by ${offsetA}) = <span class="eq-mystery-box">?</span> blocks`,
            solvedEquationHTML: `${bladeName} (${offsetA + len} − ${offsetA}) = <span class="eq-mystery-box solved">${len}</span> blocks`,
            answer: len,
            choices: buildChoices(len, 2, 10),
            visualSpec: { type: "length-units", lengthA: len, lengthB: null, offsetA, labelA: bladeName },
            whyText: `Ignore the ${offsetA} empty ${offsetA === 1 ? "block" : "blocks"} before the blade: there are ${len} golden blocks underneath the ${bladeName}.`
          };
        } else {
          const lengthA = randInt(5, 9);
          const lengthB = randInt(2, lengthA - 1);
          const diff = lengthA - lengthB;
          return {
            story: `Count the measuring blocks under Sword A and Sword B! How many blocks LONGER is Sword A than Sword B?`,
            equationHTML: `Sword A − Sword B = <span class="eq-mystery-box">?</span> blocks longer`,
            solvedEquationHTML: `Sword A (${lengthA}) − Sword B (${lengthB}) = <span class="eq-mystery-box solved">${diff}</span> blocks longer`,
            answer: diff,
            choices: buildChoices(diff, 1, 8),
            visualSpec: { type: "length-units", lengthA, lengthB },
            whyText: `Sword A is ${lengthA} blocks and Sword B is ${lengthB} blocks, so ${lengthA} − ${lengthB} = ${diff} blocks longer.`
          };
        }
      } else if (tier === 2) {
        const roll = Math.random();
        if (roll < 0.45) {
          const lengthA = randInt(6, 10);
          const lengthB = randInt(2, lengthA - 1);
          const diff = lengthA - lengthB;
          const askShorter = Math.random() < 0.5;
          return {
            story: askShorter
              ? `Count the blocks under both blades! How many blocks SHORTER is Sword B than Sword A?`
              : `Count the blocks under both blades! How many blocks LONGER is Sword A than Sword B?`,
            equationHTML: `Sword A − Sword B = <span class="eq-mystery-box">?</span> blocks ${askShorter ? "shorter" : "longer"}`,
            solvedEquationHTML: `${lengthA} − ${lengthB} = <span class="eq-mystery-box solved">${diff}</span> blocks ${askShorter ? "shorter" : "longer"}`,
            answer: diff,
            choices: buildChoices(diff, 1, 9),
            visualSpec: { type: "length-units", lengthA, lengthB },
            whyText: `Sword A (${lengthA}) minus Sword B (${lengthB}) equals a difference of ${diff} blocks.`
          };
        } else if (roll < 0.75) {
          const lengthA = randInt(4, 7);
          const lengthB = randInt(2, 5);
          const totalLen = lengthA + lengthB;
          return {
            story: `Count the measuring blocks under Sword A and Sword B! If laid end-to-end, how many blocks long are Sword A and Sword B ALTOGETHER?`,
            equationHTML: `Sword A + Sword B = <span class="eq-mystery-box">?</span> blocks in all`,
            solvedEquationHTML: `Sword A (${lengthA}) + Sword B (${lengthB}) = <span class="eq-mystery-box solved">${totalLen}</span> blocks in all`,
            answer: totalLen,
            choices: buildChoices(totalLen, 5, 14),
            visualSpec: { type: "length-units", lengthA, lengthB },
            whyText: `Sword A (${lengthA} blocks) plus Sword B (${lengthB} blocks) equals ${totalLen} blocks altogether!`
          };
        } else {
          const offsetA = randInt(2, 3);
          const len = randInt(4, 7);
          return {
            story: `Careful—the ${bladeName} does not start at the baseline! It starts after ${offsetA} empty blocks. How many blocks long is the ${bladeName} itself?`,
            equationHTML: `${bladeName} (offset ${offsetA}) = <span class="eq-mystery-box">?</span> blocks`,
            solvedEquationHTML: `${offsetA + len} − ${offsetA} = <span class="eq-mystery-box solved">${len}</span> blocks`,
            answer: len,
            choices: buildChoices(len, 2, 10),
            visualSpec: { type: "length-units", lengthA: len, lengthB: null, offsetA, labelA: bladeName },
            whyText: `There are ${offsetA} empty blocks before the hilt and ${len} golden blocks under the blade.`
          };
        }
      } else {
        const lengthA = randInt(6, 10);
        const lengthB = randInt(2, lengthA - 1);
        if (Math.random() < 0.4) {
          const totalLen = lengthA + lengthB;
          return {
            story: `Sword A is ${lengthA} blocks long and Sword B is ${lengthB} blocks long. How many blocks long are they ALTOGETHER if laid end-to-end?`,
            equationHTML: `${lengthA} + ${lengthB} = <span class="eq-mystery-box">?</span> blocks`,
            solvedEquationHTML: `${lengthA} + ${lengthB} = <span class="eq-mystery-box solved">${totalLen}</span> blocks`,
            answer: totalLen,
            choices: buildChoices(totalLen, 6, 18),
            visualSpec: { type: "length-units", lengthA, lengthB },
            whyText: `${lengthA} blocks plus ${lengthB} blocks equals ${totalLen} blocks in all.`
          };
        }
        const diff = lengthA - lengthB;
        const askShorter = Math.random() < 0.5;
        return {
          story: askShorter
            ? `Sword A is ${lengthA} blocks long and Sword B is ${lengthB} blocks long. How many blocks SHORTER is Sword B?`
            : `Sword A is ${lengthA} blocks long and Sword B is ${lengthB} blocks long. How many blocks LONGER is Sword A?`,
          equationHTML: `${lengthA} − ${lengthB} = <span class="eq-mystery-box">?</span>`,
          solvedEquationHTML: `${lengthA} − ${lengthB} = <span class="eq-mystery-box solved">${diff}</span>`,
          answer: diff,
          choices: buildChoices(diff, 1, 9),
          visualSpec: { type: "length-units", lengthA, lengthB },
          whyText: `${lengthA} blocks minus ${lengthB} blocks equals a difference of ${diff} blocks.`
        };
      }
    }
  },

  {
    id: 13,
    act: 3,
    title: "Raise the Siege Ladders",
    subtitle: "Ch. 11: Comparing ('How Many More / Fewer?')",
    gradeTag: "Dimensions 1B · Chapter 11",
    iconKey: "castle",
    missionType: "fort",
    missionActionLabel: "Siege Ladders Raised",
    mapPos: { x: 66, y: 38 },
    shortDesc: "Compare two rows one-to-one ('How many more / fewer?') by subtracting to raise 5 siege ladders!",
    teacherGuide: {
      wonder: "In Dimensions 1B Ch. 11, students compare two quantities one-to-one to see why 'How many more?' and 'How many fewer?' are two ways of asking for the exact same difference (`Greater − Smaller = Difference`).",
      script: "Ask: 'Up to the gold dotted line, both rows are equal! Subtract the matching part to see the difference sticking out past the line!'",
      heuristic: "Subtraction as Comparison (1B Ch. 11).",
      handsOn: "Compare a 9-block tower and a 5-block tower side by side: 9 − 5 = 4 blocks more (and 5 has 4 blocks fewer than 9)."
    },
    learnSteps: [
      {
        stepTag: "Step 1 of 4 · One-to-One Matching",
        narrative: "The North Wall has 9 blocks and the Ladder has 6 blocks. Up to the dotted line, 6 match with 6. Past the line, 9 − 6 = 3 MORE blocks!",
        equationHTML: `9 − 6 = <span class="eq-mystery-box solved">3</span>`,
        visualSpec: { type: "comparison-rows", topCount: 9, bottomCount: 6, topLabel: "Wall", bottomLabel: "Ladder" }
      },
      {
        stepTag: "Step 2 of 4 · Try 'How Many More?'",
        narrative: "Count the blocks in the Watchtower row and the Gate row! How many MORE blocks does the Watchtower have?",
        equationHTML: `Tower − Gate = <span class="eq-mystery-box">?</span> more`,
        visualSpec: { type: "comparison-rows", topCount: 8, bottomCount: 5, topLabel: "Tower", bottomLabel: "Gate" },
        checkQuestion: {
          prompt: "How many MORE blocks does the Tower row have than the Gate row?",
          choices: [2, 3, 4, 5],
          answer: 3,
          solvedEquationHTML: `8 − 5 = <span class="eq-mystery-box solved">3</span> more`,
          coachText: "Well reasoned! 5 blocks match evenly up to the dotted line, leaving 8 − 5 = 3 extra blocks."
        }
      },
      {
        stepTag: "Step 3 of 4 · 'How Many Fewer?' Is the Same Difference!",
        narrative: "Notice the secret: saying '4 is 6 FEWER than 10' is the exact same difference as '10 is 6 MORE than 4'! Both use 10 − 4 = 6!",
        equationHTML: `10 − 4 = <span class="eq-mystery-box">?</span>`,
        visualSpec: { type: "comparison-rows", topCount: 10, bottomCount: 4, topLabel: "Cliff", bottomLabel: "Rope" },
        checkQuestion: {
          prompt: "The Cliff has 10 blocks and the Rope has 4. How many FEWER blocks does the Rope have?",
          choices: [4, 5, 6, 7],
          answer: 6,
          solvedEquationHTML: `10 − 4 = <span class="eq-mystery-box solved">6</span>`,
          coachText: "Bravo! Whether we ask 'how many more' or 'how many fewer', 10 − 4 = 6!"
        }
      },
      {
        stepTag: "Step 4 of 4 · Ready to Raise the Ladders",
        narrative: "Now compare the cliff heights and ladder rungs in the Trial to raise all 5 siege ladders!",
        equationHTML: `9 − 4 = <span class="eq-mystery-box solved">5</span>`,
        visualSpec: { type: "comparison-rows", topCount: 9, bottomCount: 4, topLabel: "Cliff", bottomLabel: "Ladder" }
      }
    ],
    generateProblem(tier) {
      const topCount = tier === 1 ? randInt(6, 9) : randInt(8, 10);
      const bottomCount = randInt(2, topCount - 2);
      const diff = topCount - bottomCount;
      const askFewer = Math.random() < 0.5;
      if (tier === 1) {
        return {
          story: askFewer
            ? `Count the Cliff stones and Ladder rungs in the comparison rows! How many FEWER rungs does the Ladder row have than the Cliff row?`
            : `Count the Cliff stones and Ladder rungs in the comparison rows! How many MORE stones does the Cliff row have than the Ladder row?`,
          equationHTML: `Cliff − Ladder = <span class="eq-mystery-box">?</span> ${askFewer ? "fewer" : "more"} (diff from ${topCount} & ${bottomCount})`.replace(` (diff from ${topCount} & ${bottomCount})`, ""),
          solvedEquationHTML: `${topCount} − ${bottomCount} = <span class="eq-mystery-box solved">${diff}</span> ${askFewer ? "fewer" : "more"}`,
          answer: diff,
          choices: buildChoices(diff, 1, 8),
          visualSpec: { type: "comparison-rows", topCount, bottomCount, topLabel: "Cliff", bottomLabel: "Ladder" },
          whyText: `The Cliff has ${topCount} and the Ladder has ${bottomCount}. ${bottomCount} match evenly, leaving ${topCount} − ${bottomCount} = ${diff}.`
        };
      }
      return {
        story: askFewer
          ? `The cliff has ${topCount} stones and our ladder has ${bottomCount} rungs. How many FEWER rungs does the ladder have?`
          : `The cliff is ${topCount} cubits high and our ladder is ${bottomCount} cubits high. How many MORE cubits do we need?`,
        equationHTML: `${topCount} − ${bottomCount} = <span class="eq-mystery-box">?</span>`,
        solvedEquationHTML: `${topCount} − ${bottomCount} = <span class="eq-mystery-box solved">${diff}</span>`,
        answer: diff,
        choices: buildChoices(diff, 1, 9),
        visualSpec: { type: "comparison-rows", topCount, bottomCount, topLabel: "Cliff", bottomLabel: "Ladder" },
        whyText: `${bottomCount} match evenly. ${topCount} − ${bottomCount} leaves a difference of ${diff}.`
      };
    }
  },

  {
    id: 14,
    act: 3,
    title: "Reclaim the Stolen Gold",
    subtitle: "Ch. 12: Numbers to 40 (Tens Towers & Loose Ones)",
    gradeTag: "Dimensions 1B · Chapter 12",
    iconKey: "coin",
    missionType: "locks",
    missionActionLabel: "Gold Chests Reclaimed",
    mapPos: { x: 65, y: 58 },
    shortDesc: "Recover 5 chests of stolen gold from the trolls by counting Tens Towers and Loose Ones up to 40.",
    teacherGuide: {
      wonder: "Notice the beauty of our base-ten number system: just ten symbols (0–9) can name any multitude by grouping in Tens! Dimensions 1B Ch. 12 expands beyond 20 to 40 so children master 2 Tens (20), 3 Tens (30), and 4 Tens (40) with loose ones.",
      script: "Ask: 'Count the golden Towers of 10 first (10, 20, 30...), then add the loose Ones!'",
      heuristic: "Place Value Tens & Ones to 40 (1B Ch. 12).",
      handsOn: "Count dimes by 10s (10, 20, 30) and pennies by 1s (31, 32, 33, 34)."
    },
    learnSteps: [
      {
        stepTag: "Step 1 of 4 · Counting Tens Towers",
        narrative: "Each golden tower holds 10 blocks! When we have 2 Tens towers (20) and 6 loose Ones, we have 20 + 6 = 26!",
        equationHTML: `20 + 6 = <span class="eq-mystery-box solved">26</span>`,
        visualSpec: { type: "place-value", tens: 2, ones: 6, addTens: 0, addOnes: 0, revealChart: true }
      },
      {
        stepTag: "Step 2 of 4 · Try 3 Tens + Ones",
        narrative: "Look at this chest: count the golden Tens towers (10 each) and the loose Ones. How much gold is that in all?",
        equationHTML: `Tens & Ones = <span class="eq-mystery-box">?</span>`,
        visualSpec: { type: "place-value", tens: 3, ones: 4, addTens: 0, addOnes: 0 },
        checkQuestion: {
          prompt: "Count the Tens towers and loose Ones in the chest:",
          choices: [24, 34, 36, 43],
          answer: 34,
          solvedEquationHTML: `30 + 4 = <span class="eq-mystery-box solved">34</span>`,
          coachText: "Splendid! 3 Tens is 30, plus 4 Ones makes 34!"
        }
      },
      {
        stepTag: "Step 3 of 4 · Reading Tens and Ones",
        narrative: "Count the golden Tens towers and the loose Ones! Notice how the Tens digit tells the towers, and the Ones digit tells the loose blocks!",
        equationHTML: `Tens & Ones = <span class="eq-mystery-box">?</span>`,
        visualSpec: { type: "place-value", tens: 3, ones: 8, addTens: 0, addOnes: 0 },
        checkQuestion: {
          prompt: "Count the Tens towers and loose Ones:",
          choices: [28, 36, 38, 83],
          answer: 38,
          solvedEquationHTML: `30 + 8 = <span class="eq-mystery-box solved">38</span>`,
          coachText: "Exact count! 30 + 8 = 38!"
        }
      },
      {
        stepTag: "Step 4 of 4 · Ready for the Gold Vaults",
        narrative: "Now count the Tens towers and loose Ones to unlock all 5 chests of stolen gold!",
        equationHTML: `20 + 9 = <span class="eq-mystery-box solved">29</span>`,
        visualSpec: { type: "place-value", tens: 2, ones: 9, addTens: 0, addOnes: 0, revealChart: true }
      }
    ],
    generateProblem(tier) {
      const tens = randInt(2, 3);
      const ones = randInt(1, 9);
      const total = tens * 10 + ones;
      const chestLabel = pick(["Oak Chest", "Iron Vault", "Royal Coffer", "Highland Strongbox", "Knight's Trunk"]);
      if (tier === 1) {
        return {
          story: `Unlock the ${chestLabel}! Count the golden Tens towers (10 each) and loose Ones inside—what number do they make in all?`,
          equationHTML: `${chestLabel}: Tens + Ones = <span class="eq-mystery-box">?</span>`,
          solvedEquationHTML: `${chestLabel}: ${tens * 10} + ${ones} = <span class="eq-mystery-box solved">${total}</span>`,
          answer: total,
          choices: buildChoices(total, 15, 40),
          visualSpec: { type: "place-value", tens, ones, addTens: 0, addOnes: 0 },
          whyText: `${tens} Tens towers is ${tens * 10}, plus ${ones} loose Ones is ${total}.`
        };
      } else if (tier === 2) {
        if (Math.random() < 0.45) {
          const addTens = 1;
          const start = total;
          const sum = start + 10;
          return {
            story: `Unlock the ${chestLabel}! Start with ${start} gold (${tens} Tens and ${ones} Ones) and add 1 more Ten tower (10)!`,
            equationHTML: `${start} + 10 = <span class="eq-mystery-box">?</span>`,
            solvedEquationHTML: `${start} + 10 = <span class="eq-mystery-box solved">${sum}</span>`,
            answer: sum,
            choices: buildChoices(sum, 15, 49),
            visualSpec: { type: "place-value", tens, ones, addTens, addOnes: 0 },
            whyText: `${tens} Tens plus 1 Ten is ${tens + 1} Tens (${(tens + 1) * 10}), plus ${ones} Ones is ${sum}.`
          };
        } else {
          return {
            story: `Look inside the ${chestLabel}! Count the Tens towers and loose Ones to find the total gold:`,
            equationHTML: `${chestLabel} Total = <span class="eq-mystery-box">?</span>`,
            solvedEquationHTML: `${tens * 10} + ${ones} = <span class="eq-mystery-box solved">${total}</span>`,
            answer: total,
            choices: buildChoices(total, 15, 40),
            visualSpec: { type: "place-value", tens, ones, addTens: 0, addOnes: 0 },
            whyText: `${tens} Tens is ${tens * 10}, plus ${ones} Ones is ${total}.`
          };
        }
      } else {
        if (Math.random() < 0.5) {
          return {
            story: `Unlock the ${chestLabel}! What number is ${tens} Tens and ${ones} Ones?`,
            equationHTML: `${tens} Tens + ${ones} Ones = <span class="eq-mystery-box">?</span>`,
            solvedEquationHTML: `${tens * 10} + ${ones} = <span class="eq-mystery-box solved">${total}</span>`,
            answer: total,
            choices: buildChoices(total, 15, 40),
            visualSpec: { type: "place-value", tens, ones, addTens: 0, addOnes: 0 },
            whyText: `${tens} Tens is ${tens * 10}, plus ${ones} Ones is ${total}.`
          };
        } else {
          const isTenLess = Math.random() < 0.5;
          if (isTenLess) {
            const ans = total - 10;
            return {
              story: `Unlock the ${chestLabel}! What is 10 LESS than ${total}?`,
              equationHTML: `${total} − 10 = <span class="eq-mystery-box">?</span>`,
              solvedEquationHTML: `${total} − 10 = <span class="eq-mystery-box solved">${ans}</span>`,
              answer: ans,
              choices: buildChoices(ans, 11, 39),
              visualSpec: { type: "place-value", tens: tens - 1, ones, addTens: 0, addOnes: 0 },
              whyText: `10 less than ${total} (${tens} Tens ${ones} Ones) is ${tens - 1} Tens ${ones} Ones = ${ans}.`
            };
          } else {
            const ans = total + 10;
            return {
              story: `Unlock the ${chestLabel}! What is 10 MORE than ${total}?`,
              equationHTML: `${total} + 10 = <span class="eq-mystery-box">?</span>`,
              solvedEquationHTML: `${total} + 10 = <span class="eq-mystery-box solved">${ans}</span>`,
              answer: ans,
              choices: buildChoices(ans, 20, 49),
              visualSpec: { type: "place-value", tens, ones, addTens: 1, addOnes: 0 },
              whyText: `10 more than ${total} is ${ans}.`
            };
          }
        }
      }
    }
  },

  {
    id: 15,
    act: 3,
    title: "Forge the Royal Armor",
    subtitle: "Ch. 13: Add & Subtract Within 40 (Make the Next Ten)",
    gradeTag: "Dimensions 1B · Chapter 13",
    iconKey: "anvil",
    missionType: "fort",
    missionActionLabel: "Armor Pieces Forged",
    mapPos: { x: 72, y: 70 },
    shortDesc: "Forge 5 pieces of royal armor by adding and subtracting within 40 and bridging to the Next Ten (e.g., 28 + 6)!",
    teacherGuide: {
      wonder: "In 1B Ch. 13, the young Squire sees that the exact same Make-10 truth learned in Chapter 7 works in every decade! Just as 8 + 6 makes 10 + 4 = 14, so 28 + 6 makes 30 + 4 = 34! And in subtraction within 40, we can decompose into Tens and Ones or use a Bar Model.",
      script: "Ask: 'Does adding the Ones stay under 10, or bridge across to the Next Ten? How many more does 28 need to reach 30?'",
      heuristic: "Addition & Subtraction Within 40 & Make the Next Ten (1B Ch. 13).",
      handsOn: "Show 28 + 5: use 2 of the 5 ones to complete the 3rd Ten-tower (30), plus 3 ones = 33."
    },
    learnSteps: [
      {
        stepTag: "Step 1 of 4 · Adding Ones Without Regrouping",
        narrative: "When the Ones don't reach 10 (like 23 + 5), keep the 2 Tens (20) and add the Ones (3 + 5 = 8) to get 28!",
        equationHTML: `23 + 5 = <span class="eq-mystery-box solved">28</span>`,
        visualSpec: { type: "place-value", tens: 2, ones: 3, addTens: 0, addOnes: 5, revealChart: true }
      },
      {
        stepTag: "Step 2 of 4 · Bridging to the Next Ten (Regrouping)",
        narrative: "When the Ones pass 10 (like 28 + 6), 28 needs 2 to complete the next Ten (30)! Split 6 to complete 30 first, then add the leftover ones!",
        equationHTML: `28 + 6 = <span class="eq-mystery-box">?</span>`,
        visualSpec: { type: "regrouping", a: 28, b: 6, total: 34 },
        checkQuestion: {
          prompt: "Bridge to 30 first: What is 28 + 6?",
          choices: [32, 33, 34, 36],
          answer: 34,
          solvedEquationHTML: `28 + 6 = 30 + 4 = <span class="eq-mystery-box solved">34</span>`,
          coachText: "Masterfully forged! 28 + 2 makes 30, plus 4 left over is 34!"
        }
      },
      {
        stepTag: "Step 3 of 4 · Try Bridging to 20",
        narrative: "Try 17 + 5! Look at the partially filled Ten-Frame: 17 needs 3 to complete 20, then add the remaining ones!",
        equationHTML: `17 + 5 = <span class="eq-mystery-box">?</span>`,
        visualSpec: { type: "regrouping", a: 17, b: 5, total: 22 },
        checkQuestion: {
          prompt: "Give 3 to 17 to make 20: What is 17 + 5?",
          choices: [21, 22, 23, 25],
          answer: 22,
          solvedEquationHTML: `17 + 5 = 20 + 2 = <span class="eq-mystery-box solved">22</span>`,
          coachText: "Exact strike! 17 + 3 = 20, and 20 + 2 = 22!"
        }
      },
      {
        stepTag: "Step 4 of 4 · Subtracting Within 40 (Part-Whole Bar Model)",
        narrative: "Chapter 13 also teaches subtraction within 40! If our Whole bar of iron is 38 bars and we use 15 bars, 38 − 15 = 23 bars remain!",
        equationHTML: `38 − 15 = <span class="eq-mystery-box">?</span>`,
        visualSpec: { type: "bar-model", modelType: "part-whole", partA: 15, partB: 23, whole: 38, missing: "partB", labelA: "15", labelB: "?" },
        checkQuestion: {
          prompt: "Subtract Tens (30 − 10) and Ones (8 − 5): What is 38 − 15?",
          choices: [13, 22, 23, 25],
          answer: 23,
          solvedEquationHTML: `38 − 15 = <span class="eq-mystery-box solved">23</span>`,
          coachText: "Brilliant! 3 Tens minus 1 Ten is 2 Tens (20), and 8 Ones minus 5 Ones is 3 -> 23!"
        }
      }
    ],
    generateProblem(tier) {
      if (tier === 1) {
        const tens = randInt(2, 3);
        const ones = randInt(1, 5);
        const addOnes = randInt(2, 9 - ones);
        const start = tens * 10 + ones;
        const total = start + addOnes;
        return {
          story: `Strike the anvil! Add ${start} and ${addOnes} by combining the loose Ones!`,
          equationHTML: `${start} + ${addOnes} = <span class="eq-mystery-box">?</span>`,
          solvedEquationHTML: `${start} + ${addOnes} = <span class="eq-mystery-box solved">${total}</span>`,
          answer: total,
          choices: buildChoices(total, 20, 40),
          visualSpec: { type: "place-value", tens, ones, addTens: 0, addOnes },
          whyText: `Keep ${tens * 10}, and add ${ones} + ${addOnes} = ${ones + addOnes} -> ${total}.`
        };
      } else if (tier === 2 || Math.random() < 0.6) {
        const a = randInt(1, 2) * 10 + randInt(7, 9);
        const need = 10 - (a % 10);
        const b = randInt(need + 1, 7);
        const total = a + b;
        return {
          story: `Forge the armor! Solve ${a} + ${b} by bridging to the next Ten first!`,
          equationHTML: `${a} + ${b} = <span class="eq-mystery-box">?</span>`,
          solvedEquationHTML: `${a} + ${b} = ${a + need} + ${b - need} = <span class="eq-mystery-box solved">${total}</span>`,
          answer: total,
          choices: buildChoices(total, 20, 40),
          visualSpec: { type: "regrouping", a, b, total },
          whyText: `${a} + ${need} makes ${a + need}, plus ${b - need} more is ${total}.`
        };
      } else {
        const whole = randInt(25, 39);
        const partA = randInt(11, Math.min(19, whole - 10));
        const partB = whole - partA;
        return {
          story: `Temper the steel! The Whole bar is ${whole} and ${partA} is used. Subtract ${whole} − ${partA} to find the remaining part!`,
          equationHTML: `${whole} − ${partA} = <span class="eq-mystery-box">?</span>`,
          solvedEquationHTML: `${whole} − ${partA} = <span class="eq-mystery-box solved">${partB}</span>`,
          answer: partB,
          choices: buildChoices(partB, 10, 30),
          visualSpec: { type: "bar-model", modelType: "part-whole", partA, partB, whole, missing: "partB", labelA: `${partA}`, labelB: `?` },
          whyText: `${whole} minus ${partA} leaves ${partB}.`
        };
      }
    }
  },

  {
    id: 16,
    act: 3,
    title: "Sink the Pirate Skiffs",
    subtitle: "Ch. 14: Grouping & Sharing (Visual Equal Groups, No × Symbol)",
    gradeTag: "Dimensions 1B · Chapter 14",
    iconKey: "anchor",
    missionType: "ships",
    missionActionLabel: "Pirate Skiffs Sunk",
    mapPos: { x: 75, y: 52 },
    shortDesc: "Sink 5 pirate skiffs by counting Equal Groups (repeated addition, no × symbol) and Fair Sharing!",
    teacherGuide: {
      wonder: "True to Dimensions 1B Ch. 14, we do NOT rush into abstract '×' or '÷' symbols in 1st grade! Instead, children build the concrete intuition of multiplication and division by seeing '3 equal groups of 4' as 4 + 4 + 4 = 12, and sharing items equally across trays.",
      script: "Ask: 'How many trays are there? How many shields are on each tray? Let's add those equal groups together!'",
      heuristic: "Adding Equal Groups & Fair Sharing Pictorially (1B Ch. 14).",
      handsOn: "Make 3 piles of 5 coins and count by 5s: 5, 10, 15! Then share 12 coins equally among 3 cups."
    },
    learnSteps: [
      {
        stepTag: "Step 1 of 4 · Equal Groups (Repeated Addition)",
        narrative: "When every tray holds the exact same number, we have EQUAL GROUPS! Look at 3 trays with 4 loaves on each: 4 + 4 + 4 = 12!",
        equationHTML: `4 + 4 + 4 = <span class="eq-mystery-box solved">12</span>`,
        visualSpec: { type: "equal-groups", groups: 3, perGroup: 4, total: 12, itemType: "loaf", revealSkipCount: true }
      },
      {
        stepTag: "Step 2 of 4 · Try Counting Equal Groups",
        narrative: "Look at these 4 trays with 3 shields on each tray. Add the equal groups: 3 + 3 + 3 + 3 = ?",
        equationHTML: `3 + 3 + 3 + 3 = <span class="eq-mystery-box">?</span>`,
        visualSpec: { type: "equal-groups", groups: 4, perGroup: 3, total: 12, itemType: "shield" },
        checkQuestion: {
          prompt: "How many shields are in 4 equal groups of 3?",
          choices: [9, 10, 12, 15],
          answer: 12,
          solvedEquationHTML: `3 + 3 + 3 + 3 = <span class="eq-mystery-box solved">12</span>`,
          coachText: "Direct hit! 3, 6, 9, 12 shields in all!"
        }
      },
      {
        stepTag: "Step 3 of 4 · Fair Sharing Into Equal Groups",
        narrative: "FAIR SHARING is the partner of Equal Groups! When 10 shields are shared equally between 2 trays, how many shields go on EACH tray?",
        equationHTML: `10 shared into 2 equal groups = <span class="eq-mystery-box">?</span> each`,
        visualSpec: { type: "equal-groups", groups: 2, perGroup: 5, total: 10, itemType: "shield" },
        checkQuestion: {
          prompt: "When 10 shields are shared equally into 2 trays, how many are on each tray?",
          choices: [2, 4, 5, 6],
          answer: 5,
          solvedEquationHTML: `10 shared into 2 equal groups = <span class="eq-mystery-box solved">5</span> each`,
          coachText: "Fair and just! 5 on the first tray and 5 on the second tray make 10!"
        }
      },
      {
        stepTag: "Step 4 of 4 · Finding How Many Groups",
        narrative: "What if we have 15 shields and put 5 shields on each tray? Look at the trays: it takes 3 trays to hold all 15!",
        equationHTML: `15 in groups of 5 = <span class="eq-mystery-box solved">3</span> trays`,
        visualSpec: { type: "equal-groups", groups: 3, perGroup: 5, total: 15, itemType: "shield" }
      }
    ],
    generateProblem(tier) {
      const groups = randInt(2, 4);
      const perGroup = pick([2, 3, 4, 5]);
      const total = groups * perGroup;
      const plusChain = Array.from({ length: groups }, () => perGroup).join(" + ");
      if (tier === 1) {
        return {
          story: `Fire the catapults! Count ${groups} equal trays with ${perGroup} shields on each tray—how many shields are there in all?`,
          equationHTML: `${plusChain} = <span class="eq-mystery-box">?</span>`,
          solvedEquationHTML: `${plusChain} = <span class="eq-mystery-box solved">${total}</span>`,
          answer: total,
          choices: buildChoices(total, 4, 20),
          visualSpec: { type: "equal-groups", groups, perGroup, total, itemType: "shield" },
          whyText: `${groups} equal groups of ${perGroup} (${plusChain}) make ${total}.`
        };
      } else if (tier === 2) {
        const roll = Math.random();
        if (roll < 0.45) {
          return {
            story: `Fire the catapults! Count ${groups} equal groups of ${perGroup} shields!`,
            equationHTML: `${groups} groups of ${perGroup} = <span class="eq-mystery-box">?</span>`,
            solvedEquationHTML: `${plusChain} = <span class="eq-mystery-box solved">${total}</span>`,
            answer: total,
            choices: buildChoices(total, 4, 20),
            visualSpec: { type: "equal-groups", groups, perGroup, total, itemType: "shield" },
            whyText: `${groups} equal groups of ${perGroup} (${plusChain}) make ${total}.`
          };
        } else if (roll < 0.75) {
          return {
            story: `Share ${total} shields equally among ${groups} squire trays! How many shields go on EACH tray?`,
            equationHTML: `${total} shared into ${groups} trays = <span class="eq-mystery-box">?</span> each`,
            solvedEquationHTML: `${total} shared into ${groups} trays = <span class="eq-mystery-box solved">${perGroup}</span> each`,
            answer: perGroup,
            choices: buildChoices(perGroup, 1, 8),
            visualSpec: { type: "equal-groups", groups, perGroup, total, itemType: "shield" },
            whyText: `When ${total} shields are shared equally into ${groups} trays, each tray holds ${perGroup}.`
          };
        } else {
          return {
            story: `We have ${total} shields in all and place ${perGroup} shields on each tray. How many trays do we fill?`,
            equationHTML: `${total} in trays of ${perGroup} = <span class="eq-mystery-box">?</span> trays`,
            solvedEquationHTML: `${total} in trays of ${perGroup} = <span class="eq-mystery-box solved">${groups}</span> trays`,
            answer: groups,
            choices: buildChoices(groups, 1, 6),
            visualSpec: { type: "equal-groups", groups, perGroup, total, itemType: "shield" },
            whyText: `Putting ${total} shields into equal trays of ${perGroup} fills ${groups} trays.`
          };
        }
      } else {
        if (Math.random() < 0.5) {
          return {
            story: `Share ${total} shields equally among ${groups} squire trays! How many shields go on EACH tray?`,
            equationHTML: `${total} in ${groups} equal groups = <span class="eq-mystery-box">?</span> each`,
            solvedEquationHTML: `${total} in ${groups} equal groups = <span class="eq-mystery-box solved">${perGroup}</span> each`,
            answer: perGroup,
            choices: buildChoices(perGroup, 1, 10),
            visualSpec: { type: "equal-groups", groups, perGroup, total, itemType: "shield" },
            whyText: `When ${total} is shared equally into ${groups} trays, each tray has ${perGroup}.`
          };
        } else {
          return {
            story: `We have ${total} shields and pack ${perGroup} shields onto each tray. How many trays are filled?`,
            equationHTML: `${total} in groups of ${perGroup} = <span class="eq-mystery-box">?</span> trays`,
            solvedEquationHTML: `${total} in groups of ${perGroup} = <span class="eq-mystery-box solved">${groups}</span> trays`,
            answer: groups,
            choices: buildChoices(groups, 1, 6),
            visualSpec: { type: "equal-groups", groups, perGroup, total, itemType: "shield" },
            whyText: `${total} packed in equal groups of ${perGroup} fills ${groups} trays.`
          };
        }
      }
    }
  },

  {
    id: 17,
    act: 3,
    title: "Divide the Royal Banners",
    subtitle: "Ch. 15: Fractions (Halves and Fourths / Quarters)",
    gradeTag: "Dimensions 1B · Chapter 15",
    iconKey: "shieldSilver",
    missionType: "fort",
    missionActionLabel: "Royal Banners Divided",
    mapPos: { x: 75, y: 28 },
    shortDesc: "Divide 5 royal shields and banners into Equal Halves (2 equal parts) and Fourths / Quarters (4 equal parts)!",
    teacherGuide: {
      wonder: "In medieval heraldry, shields are divided 'per pale' (in halves) or 'quarterly' (in fourths). Dimensions 1B Ch. 15 introduces fractions visually by emphasizing EQUAL parts: 2 equal parts are Halves, and 4 equal parts are Fourths (or Quarters).",
      script: "Ask: 'Are all the parts the exact same size? Is this shield cut into 2 equal Halves or 4 equal Fourths? How many parts are painted gold?'",
      heuristic: "Halves (2 Equal Parts) and Fourths/Quarters (4 Equal Parts) (1B Ch. 15).",
      handsOn: "Fold a square napkin in half (2 equal halves), then fold it again to show 4 equal fourths (quarters)!"
    },
    learnSteps: [
      {
        stepTag: "Step 1 of 4 · Halves (2 Equal Parts)",
        narrative: "When 1 Whole shield is divided into 2 EQUAL parts, each part is called 1 Half! It takes 2 equal Halves to make 1 Whole!",
        equationHTML: `1 Whole = <span class="eq-mystery-box solved">2</span> Equal Halves`,
        visualSpec: { type: "fractions", parts: 2, shaded: 1, shape: "circle" }
      },
      {
        stepTag: "Step 2 of 4 · Fourths / Quarters (4 Equal Parts)",
        narrative: "When 1 Whole shield is divided into 4 EQUAL parts, each part is called 1 Fourth (or 1 Quarter)! How many equal Fourths make 1 Whole?",
        equationHTML: `1 Whole = <span class="eq-mystery-box">?</span> Equal Fourths`,
        visualSpec: { type: "fractions", parts: 4, shaded: 1, shape: "circle" },
        checkQuestion: {
          prompt: "How many equal Fourths (Quarters) make up 1 Whole shield?",
          choices: [1, 2, 3, 4],
          answer: 4,
          solvedEquationHTML: `1 Whole = <span class="eq-mystery-box solved">4</span> Equal Fourths`,
          coachText: "Heraldic mastery! Four equal Fourths (Quarters) make 1 Whole!"
        }
      },
      {
        stepTag: "Step 3 of 4 · Counting Shaded Fourths",
        narrative: "Look at this square banner cut into 4 equal Fourths. Count how many of the 4 Fourths are painted royal gold!",
        equationHTML: `<span class="eq-mystery-box">?</span> out of 4 Fourths are Gold`,
        visualSpec: { type: "fractions", parts: 4, shaded: 3, shape: "square" },
        checkQuestion: {
          prompt: "How many of the 4 equal Fourths are painted Gold?",
          choices: [1, 2, 3, 4],
          answer: 3,
          solvedEquationHTML: `<span class="eq-mystery-box solved">3</span> out of 4 Fourths are Gold`,
          coachText: "Sharp eyes! 3 out of the 4 equal fourths are painted gold."
        }
      },
      {
        stepTag: "Step 4 of 4 · Ready toemblazon the Banners",
        narrative: "Notice how 2 Fourths of a shield is the exact same amount as 1 Half! Now enter the Trial to divide the 5 Royal Banners!",
        equationHTML: `2 Fourths = <span class="eq-mystery-box solved">1</span> Half`,
        visualSpec: { type: "fractions", parts: 4, shaded: 2, shape: "circle" }
      }
    ],
    generateProblem(tier) {
      const shape = pick(["circle", "square"]);
      const bannerName = pick(["royal shield", "knight's banner", "heraldic crest", "tournament buckler", "king's standard"]);
      const roll = tier === 1 ? randInt(1, 3) : randInt(1, 4);
      if (roll === 1) {
        const isHalves = Math.random() < 0.5;
        const parts = isHalves ? 2 : 4;
        const shaded = randInt(1, parts - 1);
        const word = isHalves ? "Halves" : "Fourths (Quarters)";
        return {
          story: `Look at the ${shape} ${bannerName}! How many equal parts make up 1 Whole when cut into ${word}?`,
          equationHTML: `Equal parts in 1 Whole (${word} of ${shape} ${bannerName}) = <span class="eq-mystery-box">?</span>`,
          solvedEquationHTML: `Equal parts in 1 Whole (${word} of ${shape} ${bannerName}) = <span class="eq-mystery-box solved">${parts}</span>`,
          answer: parts,
          choices: [1, 2, 3, 4],
          visualSpec: { type: "fractions", parts, shaded, shape },
          whyText: `${word} means 1 Whole is divided into ${parts} equal parts.`
        };
      } else if (roll === 2) {
        const parts = 4;
        const shaded = randInt(1, 4);
        return {
          story: `This ${shape} ${bannerName} is divided into 4 equal Fourths (Quarters). How many Fourths are painted Gold?`,
          equationHTML: `Gold Fourths on ${shape} ${bannerName} = <span class="eq-mystery-box">?</span> of 4`,
          solvedEquationHTML: `Gold Fourths on ${shape} ${bannerName} = <span class="eq-mystery-box solved">${shaded}</span> of 4`,
          answer: shaded,
          choices: [1, 2, 3, 4],
          visualSpec: { type: "fractions", parts, shaded, shape },
          whyText: `Count the gold sections: ${shaded} of the 4 equal fourths are painted gold.`
        };
      } else if (roll === 3) {
        const parts = 4;
        const shaded = randInt(1, 3);
        const unshaded = parts - shaded;
        return {
          story: `This ${shape} ${bannerName} has 4 equal Fourths, and ${shaded} ${shaded === 1 ? "is" : "are"} Gold. How many Fourths are NOT painted Gold (4 − ${shaded})?`,
          equationHTML: `4 Fourths − ${shaded} Gold (${shape} ${bannerName}) = <span class="eq-mystery-box">?</span> unshaded`,
          solvedEquationHTML: `4 Fourths − ${shaded} Gold (${shape} ${bannerName}) = <span class="eq-mystery-box solved">${unshaded}</span> unshaded`,
          answer: unshaded,
          choices: [1, 2, 3, 4],
          visualSpec: { type: "fractions", parts, shaded, shape },
          whyText: `4 equal fourths minus ${shaded} gold fourths leaves ${unshaded} unshaded fourths.`
        };
      } else {
        const isHalves = Math.random() < 0.5;
        const parts = isHalves ? 2 : 4;
        const wholes = pick([2, 3]);
        const totalParts = wholes * parts;
        const word = isHalves ? "Halves" : "Fourths";
        return {
          keepVisualInTier3: true,
          story: `MENTAL MATH: 1 Whole ${shape} ${bannerName} has ${parts} equal ${word}. How many equal ${word} are in ${wholes} Whole shields?`,
          equationHTML: `${wholes} Wholes × ${parts} ${word} = <span class="eq-mystery-box">?</span> ${word}`,
          solvedEquationHTML: `${wholes} Wholes × ${parts} ${word} = <span class="eq-mystery-box solved">${totalParts}</span> ${word}`,
          answer: totalParts,
          choices: buildChoices(totalParts, 2, 12),
          visualSpec: { type: "fractions", parts, shaded: parts, shape },
          whyText: `Each Whole has ${parts} ${word}, so ${wholes} Wholes have ${totalParts} ${word} in all!`
        };
      }
    }
  },

  {
    id: 18,
    act: 3,
    isBoss: true,
    title: "BOSS: The Iron Golem",
    subtitle: "Act III Boss: Length, Comparing, Numbers to 40, Equal Groups & Fractions",
    gradeTag: "Dimensions 1B · Chapters 10–15 Boss",
    iconKey: "crest",
    missionType: "boss-golem",
    missionActionLabel: "Golem Shields Shattered",
    mapPos: { x: 82, y: 42 },
    shortDesc: "ACT III BOSS: Shatter the Iron Golem using Regrouping to 40, Equal Groups, Length, and Fractions!",
    teacherGuide: {
      wonder: "The Iron Golem tests all of Act III (Dimensions 1B Chapters 10–15): Length/Comparison, Place Value & Regrouping to 40, Equal Groups, and Halves/Fourths.",
      script: "Ask: 'Look at the diagram—are we making the next ten, adding equal groups, or counting equal fourths?'",
      heuristic: "Dimensions 1B Chapters 10–15 Mastery.",
      handsOn: "Cheer him on as he shatters the Iron Golem's 5 shields!"
    },
    learnSteps: [
      {
        stepTag: "Step 1 of 3 · Make-the-Next-Ten Hammer",
        narrative: "BOSS WARM-UP 1: Ready your Make-the-Next-Ten Hammer! For 28 + 5, give 2 to 28 to make 30, then add what is left over!",
        equationHTML: `28 + 5 = <span class="eq-mystery-box">?</span>`,
        visualSpec: { type: "regrouping", a: 28, b: 5, total: 33 },
        checkQuestion: {
          prompt: "Test your Hammer against the Golem: What is 28 + 5?",
          choices: [31, 32, 33, 35],
          answer: 33,
          solvedEquationHTML: `28 + 5 = 30 + 3 = <span class="eq-mystery-box solved">33</span>`,
          coachText: "Crushing blow! 28 + 2 = 30, plus 3 = 33!"
        }
      },
      {
        stepTag: "Step 2 of 3 · Equal Groups Volley",
        narrative: "BOSS WARM-UP 2: Count Equal Groups! 3 trays with 4 shields on each tray is 4 + 4 + 4!",
        equationHTML: `4 + 4 + 4 = <span class="eq-mystery-box">?</span>`,
        visualSpec: { type: "equal-groups", groups: 3, perGroup: 4, total: 12, itemType: "shield" },
        checkQuestion: {
          prompt: "How many shields in 3 equal groups of 4?",
          choices: [8, 10, 12, 16],
          answer: 12,
          solvedEquationHTML: `4 + 4 + 4 = <span class="eq-mystery-box solved">12</span>`,
          coachText: "Direct hit! 4 + 4 + 4 = 12!"
        }
      },
      {
        stepTag: "Step 3 of 3 · Heraldic Fractions Core",
        narrative: "BOSS WARM-UP 3: Read the Golem's core divided into 4 equal Fourths (Quarters)! Now enter the Trial to shatter all 5 Golem shields!",
        equationHTML: `<span class="eq-mystery-box solved">3</span> out of 4 Fourths`,
        visualSpec: { type: "fractions", parts: 4, shaded: 3, shape: "circle" }
      }
    ],
    generateProblem(tier) {
      const roll = randInt(1, 3);
      if (roll === 1) {
        const groups = randInt(2, 4);
        const perGroup = pick([2, 3, 4, 5]);
        const total = groups * perGroup;
        const plusChain = Array.from({ length: groups }, () => perGroup).join(" + ");
        return {
          story: `Shatter the Iron Golem! Count ${groups} equal groups with ${perGroup} shields in each group!`,
          equationHTML: `${plusChain} = <span class="eq-mystery-box">?</span>`,
          solvedEquationHTML: `${plusChain} = <span class="eq-mystery-box solved">${total}</span>`,
          answer: total,
          choices: buildChoices(total, 4, 20),
          visualSpec: { type: "equal-groups", groups, perGroup, total, itemType: "shield" },
          whyText: `${groups} equal groups of ${perGroup} (${plusChain}) make ${total}.`
        };
      } else if (roll === 2) {
        const a = randInt(1, 2) * 10 + randInt(7, 9);
        const need = 10 - (a % 10);
        const b = randInt(need + 1, 6);
        const total = a + b;
        return {
          story: `Strike the Golem's armor! Bridge to the next ten: what is ${a} + ${b}?`,
          equationHTML: `${a} + ${b} = <span class="eq-mystery-box">?</span>`,
          solvedEquationHTML: `${a} + ${b} = <span class="eq-mystery-box solved">${total}</span>`,
          answer: total,
          choices: buildChoices(total, 20, 40),
          visualSpec: { type: "regrouping", a, b, total },
          whyText: `${a} + ${need} = ${a + need}, plus ${b - need} makes ${total}.`
        };
      } else {
        const shaded = randInt(1, 3);
        return {
          story: `The Golem's core is split into 4 equal Fourths (Quarters). How many Fourths are glowing Gold?`,
          equationHTML: `<span class="eq-mystery-box">?</span> out of 4 Fourths`,
          solvedEquationHTML: `<span class="eq-mystery-box solved">${shaded}</span> out of 4 Fourths`,
          answer: shaded,
          choices: [1, 2, 3, 4],
          visualSpec: { type: "fractions", parts: 4, shaded, shape: "circle" },
          whyText: `${shaded} of the 4 equal fourths are gold.`
        };
      }
    }
  },

  // ==========================================================================
  // ACT IV: THE DRAGON'S MOUNTAIN TO 100 (Dimensions 1B, Chapters 16–19)
  // ==========================================================================
  {
    id: 19,
    act: 4,
    title: "Light the Signal Beacons",
    subtitle: "Ch. 16: Numbers to 100 (Tens & Ones to 100)",
    gradeTag: "Dimensions 1B · Chapter 16",
    iconKey: "lantern",
    missionType: "fort",
    missionActionLabel: "Signal Beacons Lit",
    mapPos: { x: 83, y: 63 },
    shortDesc: "Ignite 5 mountain signal beacons by counting Tens Towers and Loose Ones all the way to 100!",
    teacherGuide: {
      wonder: "Psalm 147:4 says the Lord 'determines the number of the stars; He gives to all of them their names.' Dimensions 1B Ch. 16 extends place value all the way to 100 (10 Tens = 100), showing how large numbers remain simple and orderly when grouped by Tens.",
      script: "Ask: 'Count the golden Tens towers by 10s first (10, 20, 30, 40, 50, 60...), then count on the loose Ones!'",
      heuristic: "Tens & Ones to 100 (1B Ch. 16).",
      handsOn: "Count by 10s to 100 together: 10, 20, 30, 40, 50, 60, 70, 80, 90, 100!"
    },
    learnSteps: [
      {
        stepTag: "Step 1 of 4 · Counting Tens to 100",
        narrative: "Every golden tower holds 10 blocks! When we count 5 Tens towers (50) and 3 loose Ones, we have 50 + 3 = 53!",
        equationHTML: `50 + 3 = <span class="eq-mystery-box solved">53</span>`,
        visualSpec: { type: "place-value", tens: 5, ones: 3, addTens: 0, addOnes: 0, revealChart: true }
      },
      {
        stepTag: "Step 2 of 4 · Try Counting Tens & Ones",
        narrative: "Look at this mountain beacon: count the golden Tens towers (10 each) and the loose Ones. What number do they make together?",
        equationHTML: `Tens & Ones = <span class="eq-mystery-box">?</span>`,
        visualSpec: { type: "place-value", tens: 6, ones: 5, addTens: 0, addOnes: 0 },
        checkQuestion: {
          prompt: "Count the Tens towers and loose Ones on the beacon:",
          choices: [56, 60, 65, 75],
          answer: 65,
          solvedEquationHTML: `60 + 5 = <span class="eq-mystery-box solved">65</span>`,
          coachText: "Brightly lit! 6 Tens is 60, plus 5 Ones makes 65!"
        }
      },
      {
        stepTag: "Step 3 of 4 · Try Counting Near 100",
        narrative: "Even near 100, the rule never changes! Count the golden Tens towers by 10s and then add the loose Ones.",
        equationHTML: `Tens & Ones = <span class="eq-mystery-box">?</span>`,
        visualSpec: { type: "place-value", tens: 8, ones: 7, addTens: 0, addOnes: 0 },
        checkQuestion: {
          prompt: "What number do these Tens towers and loose Ones make?",
          choices: [78, 80, 87, 97],
          answer: 87,
          solvedEquationHTML: `80 + 7 = <span class="eq-mystery-box solved">87</span>`,
          coachText: "Well counted! 8 Tens (80) + 7 Ones = 87!"
        }
      },
      {
        stepTag: "Step 4 of 4 · Ready to Ignite the Beacons",
        narrative: "Remember: 10 Tens towers make 100! Now enter the Trial to ignite all 5 mountain signal beacons!",
        equationHTML: `70 + 4 = <span class="eq-mystery-box solved">74</span>`,
        visualSpec: { type: "place-value", tens: 7, ones: 4, addTens: 0, addOnes: 0, revealChart: true }
      }
    ],
    generateProblem(tier) {
      const tens = randInt(4, 9);
      const ones = randInt(1, 9);
      const total = tens * 10 + ones;
      const beaconName = pick(["North Peak Beacon", "Eagle Watchtower", "Highland Torch", "Citadel Signal", "Summit Brazier"]);
      if (tier === 1) {
        return {
          story: `Light the ${beaconName}! Count the golden Tens towers (10 each) and loose Ones—what number do they make in all?`,
          equationHTML: `${beaconName}: Tens + Ones = <span class="eq-mystery-box">?</span>`,
          solvedEquationHTML: `${beaconName}: ${tens * 10} + ${ones} = <span class="eq-mystery-box solved">${total}</span>`,
          answer: total,
          choices: buildChoices(total, 40, 99),
          visualSpec: { type: "place-value", tens, ones, addTens: 0, addOnes: 0 },
          whyText: `${tens} Tens (${tens * 10}) plus ${ones} Ones makes ${total}.`
        };
      } else if (tier === 2) {
        if (Math.random() < 0.45 && tens <= 8) {
          const addTens = pick([1, 2]);
          if (tens + addTens <= 9) {
            const start = total;
            const sum = start + addTens * 10;
            return {
              story: `Light the ${beaconName}! Start with ${start} (${tens} Tens and ${ones} Ones) and add ${addTens * 10} (${addTens} more Tens)!`,
              equationHTML: `${start} + ${addTens * 10} = <span class="eq-mystery-box">?</span>`,
              solvedEquationHTML: `${start} + ${addTens * 10} = <span class="eq-mystery-box solved">${sum}</span>`,
              answer: sum,
              choices: buildChoices(sum, 40, 99),
              visualSpec: { type: "place-value", tens, ones, addTens, addOnes: 0 },
              whyText: `${tens} Tens + ${addTens} Tens = ${tens + addTens} Tens (${(tens + addTens) * 10}), plus ${ones} Ones makes ${sum}.`
            };
          }
        }
        return {
          story: `Inspect the ${beaconName}! Count the Tens towers and loose Ones to find the beacon number:`,
          equationHTML: `${beaconName} Total = <span class="eq-mystery-box">?</span>`,
          solvedEquationHTML: `${tens * 10} + ${ones} = <span class="eq-mystery-box solved">${total}</span>`,
          answer: total,
          choices: buildChoices(total, 40, 99),
          visualSpec: { type: "place-value", tens, ones, addTens: 0, addOnes: 0 },
          whyText: `${tens} Tens (${tens * 10}) plus ${ones} Ones makes ${total}.`
        };
      } else {
        if (Math.random() < 0.5) {
          return {
            story: `Light the ${beaconName}! What number is ${tens} Tens and ${ones} Ones?`,
            equationHTML: `${tens} Tens + ${ones} Ones = <span class="eq-mystery-box">?</span>`,
            solvedEquationHTML: `${tens * 10} + ${ones} = <span class="eq-mystery-box solved">${total}</span>`,
            answer: total,
            choices: buildChoices(total, 40, 99),
            visualSpec: { type: "place-value", tens, ones, addTens: 0, addOnes: 0 },
            whyText: `${tens} Tens (${tens * 10}) plus ${ones} Ones makes ${total}.`
          };
        } else {
          const isTenLess = tens >= 5 && Math.random() < 0.5;
          if (isTenLess) {
            const ans = total - 10;
            return {
              story: `Light the ${beaconName}! What is 10 LESS than ${total}?`,
              equationHTML: `${total} − 10 = <span class="eq-mystery-box">?</span>`,
              solvedEquationHTML: `${total} − 10 = <span class="eq-mystery-box solved">${ans}</span>`,
              answer: ans,
              choices: buildChoices(ans, 30, 95),
              visualSpec: { type: "place-value", tens: tens - 1, ones, addTens: 0, addOnes: 0 },
              whyText: `10 less than ${total} is ${ans}.`
            };
          } else {
            const safeTens = Math.min(tens, 8);
            const start = safeTens * 10 + ones;
            const ans = start + 10;
            return {
              story: `Light the ${beaconName}! What is 10 MORE than ${start}?`,
              equationHTML: `${start} + 10 = <span class="eq-mystery-box">?</span>`,
              solvedEquationHTML: `${start} + 10 = <span class="eq-mystery-box solved">${ans}</span>`,
              answer: ans,
              choices: buildChoices(ans, 40, 99),
              visualSpec: { type: "place-value", tens: safeTens, ones, addTens: 1, addOnes: 0 },
              whyText: `10 more than ${start} is ${ans}.`
            };
          }
        }
      }
    }
  },

  {
    id: 20,
    act: 4,
    title: "Storm the Outer Ramparts",
    subtitle: "Ch. 17: Addition & Subtraction Within 100",
    gradeTag: "Dimensions 1B · Chapter 17",
    iconKey: "sword",
    missionType: "bandits",
    missionActionLabel: "Shadow Guards Defeated",
    mapPos: { x: 90, y: 70 },
    shortDesc: "Overcome 5 Shadow Guards on the ramparts by adding and subtracting two-digit numbers within 100!",
    teacherGuide: {
      wonder: "In 1B Ch. 17, students add and subtract two-digit numbers up to 100 by uniting Tens with Tens and Ones with Ones, and by reading Part-Whole Bar Models!",
      script: "Ask: 'Let's add or subtract the Tens first, then the Ones! What do we get when we put them together?'",
      heuristic: "Two-Digit Addition & Subtraction Within 100 (1B Ch. 17).",
      handsOn: "Write 42 + 25 as (40 + 20) + (2 + 5) = 67."
    },
    learnSteps: [
      {
        stepTag: "Step 1 of 4 · Adding Two-Digit Numbers (Tens + Tens, Ones + Ones)",
        narrative: "To add 42 + 25, add the Tens towers first (40 + 20 = 60) and add the loose Ones (2 + 5 = 7) to get 67!",
        equationHTML: `42 + 25 = <span class="eq-mystery-box solved">67</span>`,
        visualSpec: { type: "place-value", tens: 4, ones: 2, addTens: 2, addOnes: 5, revealChart: true }
      },
      {
        stepTag: "Step 2 of 4 · Try Two-Digit Addition",
        narrative: "Look at 34 + 23: combine 3 Tens + 2 Tens (30 + 20 = 50), and combine 4 Ones + 3 Ones (4 + 3 = 7)!",
        equationHTML: `34 + 23 = <span class="eq-mystery-box">?</span>`,
        visualSpec: { type: "place-value", tens: 3, ones: 4, addTens: 2, addOnes: 3 },
        checkQuestion: {
          prompt: "Add Tens (30 + 20) and Ones (4 + 3): What is 34 + 23?",
          choices: [51, 56, 57, 67],
          answer: 57,
          solvedEquationHTML: `34 + 23 = <span class="eq-mystery-box solved">57</span>`,
          coachText: "Well struck! 30 + 20 = 50, and 4 + 3 = 7 -> 57!"
        }
      },
      {
        stepTag: "Step 3 of 4 · Subtracting Tens & Two-Digit Numbers (Bar Model)",
        narrative: "When the Whole bar is 78 and one Part is 30, subtract 3 Tens from 7 Tens: 78 − 30 = 48!",
        equationHTML: `78 − 30 = <span class="eq-mystery-box">?</span>`,
        visualSpec: { type: "bar-model", modelType: "part-whole", partA: 30, partB: 48, whole: 78, missing: "partB", labelA: "30", labelB: "?" },
        checkQuestion: {
          prompt: "The Whole is 78 and one Part is 30. What is 78 − 30?",
          choices: [38, 40, 48, 58],
          answer: 48,
          solvedEquationHTML: `78 − 30 = <span class="eq-mystery-box solved">48</span>`,
          coachText: "Bravo! 7 Tens minus 3 Tens is 4 Tens (40), plus 8 Ones = 48!"
        }
      },
      {
        stepTag: "Step 4 of 4 · Ready for the Ramparts",
        narrative: "Now storm the Outer Ramparts by adding and subtracting two-digit numbers within 100!",
        equationHTML: `51 + 26 = <span class="eq-mystery-box solved">77</span>`,
        visualSpec: { type: "place-value", tens: 5, ones: 1, addTens: 2, addOnes: 6, revealChart: true }
      }
    ],
    generateProblem(tier) {
      if (tier < 3) {
        const tens = randInt(3, 5);
        const ones = randInt(1, 4);
        const addTens = randInt(1, 3);
        const addOnes = randInt(1, 9 - ones);
        const a = tens * 10 + ones;
        const b = addTens * 10 + addOnes;
        const total = a + b;
        return {
          story: `Storm the ramparts! Add ${a} and ${b} by combining Tens with Tens and Ones with Ones!`,
          equationHTML: `${a} + ${b} = <span class="eq-mystery-box">?</span>`,
          solvedEquationHTML: `${a} + ${b} = <span class="eq-mystery-box solved">${total}</span>`,
          answer: total,
          choices: buildChoices(total, 40, 99),
          visualSpec: { type: "place-value", tens, ones, addTens, addOnes },
          whyText: `${tens + addTens} Tens (${(tens + addTens) * 10}) + ${ones + addOnes} Ones = ${total}.`
        };
      } else {
        const partA = randInt(2, 4) * 10 + randInt(1, 3);
        const partB = randInt(2, 4) * 10 + randInt(2, 5);
        const whole = partA + partB;
        return {
          story: `Breach the inner gate! The Whole bar is ${whole} and the first part is ${partA}. What is the missing part?`,
          equationHTML: `${whole} − ${partA} = <span class="eq-mystery-box">?</span>`,
          solvedEquationHTML: `${whole} − ${partA} = <span class="eq-mystery-box solved">${partB}</span>`,
          answer: partB,
          choices: buildChoices(partB, 15, 80),
          visualSpec: { type: "bar-model", modelType: "part-whole", partA, partB, whole, missing: "partB", labelA: `${partA}`, labelB: `?` },
          whyText: `${whole} minus ${partA} equals ${partB}.`
        };
      }
    }
  },

  {
    id: 21,
    act: 4,
    title: "Ring the Watchtower Clock",
    subtitle: "Ch. 18: Time (Reading Clocks to the Hour & Half-Hour)",
    gradeTag: "Dimensions 1B · Chapter 18",
    iconKey: "clock",
    missionType: "fort",
    missionActionLabel: "Watchtower Bells Rung",
    mapPos: { x: 92, y: 54 },
    shortDesc: "Ring 5 watchtower bells by reading the Hour Hand and Minute Hand for O'Clock (:00) and Half-Past (:30)!",
    teacherGuide: {
      wonder: "In Genesis 1:14, God placed the lights in the heavens 'for signs and for seasons, and for days and years.' Dimensions 1B Ch. 18 teaches children to steward time by reading analog and digital clocks to the hour (minute hand at 12) and half-hour (minute hand at 6, hour hand halfway past the hour).",
      script: "Ask: 'Look at the long red Minute Hand first—is it pointing straight up to 12 (:00 O'Clock) or straight down to 6 (:30 Half-Past)? Now look at the short blue Hour Hand!'",
      heuristic: "Analog & Digital Time to the Hour and Half-Hour (1B Ch. 18).",
      handsOn: "Point out your wall clock at home whenever it hits the top of the hour (:00) or bottom of the hour (:30)."
    },
    learnSteps: [
      {
        stepTag: "Step 1 of 4 · Reading O'Clock (:00)",
        narrative: "When the long red Minute Hand points straight up to 12, it is O'CLOCK (:00)! The short blue Hour Hand points to 3, so it is 3:00 (3 o'clock)!",
        equationHTML: `Time = <span class="eq-mystery-box solved">3</span>:00 (3 o'clock)`,
        visualSpec: { type: "clock", hour: 3, minutes: 0 }
      },
      {
        stepTag: "Step 2 of 4 · Try Reading O'Clock",
        narrative: "Look at the Watchtower Clock: the long red Minute Hand points to 12. Look at the short blue Hour Hand—what hour o'clock is it?",
        equationHTML: `<span class="eq-mystery-box">?</span>:00 o'clock`,
        visualSpec: { type: "clock", hour: 9, minutes: 0 },
        checkQuestion: {
          prompt: "What hour o'clock does the Watchtower Clock show?",
          choices: [6, 9, 10, 12],
          answer: 9,
          solvedEquationHTML: `<span class="eq-mystery-box solved">9</span>:00 o'clock`,
          coachText: "Ring the bell! Short hand on 9 and long hand on 12 is 9:00 o'clock!"
        }
      },
      {
        stepTag: "Step 3 of 4 · Reading Half-Past (:30)",
        narrative: "When the long red Minute Hand points straight down to 6, 30 minutes have passed—it is HALF-PAST (:30)! Look at the short blue Hour Hand halfway past the hour—it is half-past what hour?",
        equationHTML: `Half-past <span class="eq-mystery-box">?</span> (:30)`,
        visualSpec: { type: "clock", hour: 7, minutes: 30 },
        checkQuestion: {
          prompt: "Look at the short blue Hour Hand and the long red hand on 6. It is half-past what hour?",
          choices: [6, 7, 8, 12],
          answer: 7,
          solvedEquationHTML: `Half-past <span class="eq-mystery-box solved">7</span> (7:30)`,
          coachText: "Spot on! Halfway past 7 is half-past 7 (7:30)!"
        }
      },
      {
        stepTag: "Step 4 of 4 · Elapsed Time (1 or 2 Hours Later)",
        narrative: "If the Watchtower Clock shows 4:00 right now, in 2 hours it will be 4 + 2 = 6:00! Now enter the Trial to ring all 5 bells!",
        equationHTML: `4:00 + 2 hr = <span class="eq-mystery-box solved">6</span>:00`,
        visualSpec: { type: "clock", hour: 4, minutes: 0 }
      }
    ],
    generateProblem(tier) {
      const hour = randInt(1, 12);
      const duty = pick(["Morning Watch", "Noon Bell", "Guard Change", "Evening Patrol", "Gate Opening", "Royal Feast"]);
      if (tier === 1) {
        return {
          story: `Look at the Watchtower Clock for ${duty}! The long red Minute Hand points to 12 (:00). Read the short blue Hour Hand—what hour o'clock is it?`,
          equationHTML: `${duty}: <span class="eq-mystery-box">?</span>:00 o'clock`,
          solvedEquationHTML: `${duty}: <span class="eq-mystery-box solved">${hour}</span>:00 o'clock`,
          answer: hour,
          choices: buildChoices(hour, 1, 12),
          visualSpec: { type: "clock", hour, minutes: 0 },
          whyText: `The short blue Hour Hand points to ${hour}, so it is ${hour}:00 (${hour} o'clock).`
        };
      } else if (tier === 2) {
        return {
          story: `Look at the Watchtower Clock for ${duty}! The long red Minute Hand points down to 6 (:30). Read the short blue Hour Hand—it is half-past what hour?`,
          equationHTML: `${duty}: Half-past <span class="eq-mystery-box">?</span>`,
          solvedEquationHTML: `${duty}: Half-past <span class="eq-mystery-box solved">${hour}</span> (${hour}:30)`,
          answer: hour,
          choices: buildChoices(hour, 1, 12),
          visualSpec: { type: "clock", hour, minutes: 30 },
          whyText: `The short blue hand has just passed ${hour}, so it is half-past ${hour} (${hour}:30).`
        };
      } else {
        const baseHour = randInt(1, 8);
        const addHrs = pick([1, 2, 3, 4]);
        const futureHour = baseHour + addHrs;
        const mins = pick([0, 30]);
        const minStr = mins === 0 ? "00" : "30";
        return {
          keepVisualInTier3: true,
          story: `MENTAL MATH: Read the Watchtower Clock shown right now, then find what hour it will be in ${addHrs} ${addHrs === 1 ? "hour" : "hours"}!`,
          equationHTML: `Clock + ${addHrs} hr = <span class="eq-mystery-box">?</span>:${minStr}`,
          solvedEquationHTML: `${baseHour}:${minStr} + ${addHrs} hr = <span class="eq-mystery-box solved">${futureHour}</span>:${minStr}`,
          answer: futureHour,
          choices: buildChoices(futureHour, 1, 12),
          visualSpec: { type: "clock", hour: baseHour, minutes: mins },
          whyText: `The clock shows ${baseHour}:${minStr}. ${addHrs} hours later (${baseHour} + ${addHrs}) is ${futureHour}:${minStr}!`
        };
      }
    }
  },

  {
    id: 22,
    act: 4,
    title: "Unlock the Royal Treasury",
    subtitle: "Ch. 19: Money (Pennies 1¢, Nickels 5¢, Dimes 10¢ & Quarters 25¢)",
    gradeTag: "Dimensions 1B · Chapter 19",
    iconKey: "coin",
    missionType: "locks",
    missionActionLabel: "Treasury Vaults Opened",
    mapPos: { x: 91, y: 32 },
    shortDesc: "Open 5 royal treasury vaults by counting Pennies (1¢), Nickels (5¢), Dimes (10¢), and Quarters (25¢)!",
    teacherGuide: {
      wonder: "Proverbs 16:11 reminds us that 'A just balance and scales are the Lord's; all the weights in the bag are His work.' Dimensions 1B Ch. 19 culminates Grade 1 by applying skip-counting (by 10s, 5s, and 1s) and place-value addition to real coins!",
      script: "Ask: 'Start with the highest-value coins on the left—count the 25¢ Quarters and 10¢ Dimes first, then add the 5¢ Nickels and 1¢ Pennies!'",
      heuristic: "Counting Coin Combinations by Value (1B Ch. 19).",
      handsOn: "Put real dimes, nickels, and pennies on the table and practice trading 5 pennies for 1 nickel or 2 nickels for 1 dime."
    },
    learnSteps: [
      {
        stepTag: "Step 1 of 4 · Coin Values (1¢, 5¢, 10¢, 25¢)",
        narrative: "In the Royal Treasury, a Penny is 1¢, a Nickel is 5¢, a Dime is 10¢, and a Quarter is 25¢! Count from largest value to smallest: 2 Dimes (20¢) + 1 Nickel (5¢) + 2 Pennies (2¢) = 27¢!",
        equationHTML: `10¢ + 10¢ + 5¢ + 1¢ + 1¢ = <span class="eq-mystery-box solved">27</span>¢`,
        visualSpec: { type: "coins", coins: [10, 10, 5, 1, 1] }
      },
      {
        stepTag: "Step 2 of 4 · Try Counting Dimes, Nickel & Pennies",
        narrative: "Count these coins from left to right: 3 Dimes (10¢, 20¢, 30¢), plus 1 Nickel (5¢), plus 1 Penny (1¢)!",
        equationHTML: `10¢ + 10¢ + 10¢ + 5¢ + 1¢ = <span class="eq-mystery-box">?</span>¢`,
        visualSpec: { type: "coins", coins: [10, 10, 10, 5, 1] },
        checkQuestion: {
          prompt: "How many cents is 3 Dimes (30¢) + 1 Nickel (5¢) + 1 Penny (1¢)?",
          choices: [26, 35, 36, 41],
          answer: 36,
          solvedEquationHTML: `10¢ + 10¢ + 10¢ + 5¢ + 1¢ = <span class="eq-mystery-box solved">36</span>¢`,
          coachText: "Exact count! 30¢ + 5¢ = 35¢, plus 1¢ = 36¢!"
        }
      },
      {
        stepTag: "Step 3 of 4 · Counting With a Quarter (25¢)",
        narrative: "A Quarter is worth 25¢! Start at 25¢, add a Dime (10¢) to get 35¢, then add 2 Pennies (2¢)!",
        equationHTML: `25¢ + 10¢ + 1¢ + 1¢ = <span class="eq-mystery-box">?</span>¢`,
        visualSpec: { type: "coins", coins: [25, 10, 1, 1] },
        checkQuestion: {
          prompt: "How many cents is 1 Quarter (25¢) + 1 Dime (10¢) + 2 Pennies (2¢)?",
          choices: [32, 35, 37, 42],
          answer: 37,
          solvedEquationHTML: `25¢ + 10¢ + 1¢ + 1¢ = <span class="eq-mystery-box solved">37</span>¢`,
          coachText: "Royal Treasurer! 25¢ + 10¢ = 35¢, plus 2¢ makes 37¢!"
        }
      },
      {
        stepTag: "Step 4 of 4 · Ready for the Treasury Vaults",
        narrative: "In Tier 3, you will even add 1 more Dime (10¢) in your head! Enter the Trial to unlock all 5 Treasury Vaults!",
        equationHTML: `25¢ + 5¢ + 1¢ = <span class="eq-mystery-box solved">31</span>¢`,
        visualSpec: { type: "coins", coins: [25, 5, 1] }
      }
    ],
    generateProblem(tier) {
      let coins = [];
      if (tier === 1) {
        const dimes = randInt(1, 3);
        const nickels = pick([0, 1]);
        const pennies = randInt(1, 4);
        for (let i = 0; i < dimes; i++) coins.push(10);
        for (let i = 0; i < nickels; i++) coins.push(5);
        for (let i = 0; i < pennies; i++) coins.push(1);
      } else if (tier === 2) {
        const quarters = pick([0, 1]);
        const dimes = quarters === 1 ? randInt(0, 2) : randInt(1, 3);
        const nickels = randInt(1, 2);
        const pennies = randInt(0, 3);
        for (let i = 0; i < quarters; i++) coins.push(25);
        for (let i = 0; i < dimes; i++) coins.push(10);
        for (let i = 0; i < nickels; i++) coins.push(5);
        for (let i = 0; i < pennies; i++) coins.push(1);
      } else {
        const quarters = pick([1, 2]);
        const dimes = quarters === 2 ? randInt(0, 2) : randInt(1, 3);
        const nickels = randInt(0, 2);
        const pennies = randInt(1, 4);
        for (let i = 0; i < quarters; i++) coins.push(25);
        for (let i = 0; i < dimes; i++) coins.push(10);
        for (let i = 0; i < nickels; i++) coins.push(5);
        for (let i = 0; i < pennies; i++) coins.push(1);
      }
      const baseTotal = coins.reduce((s, c) => s + c, 0);
      const eqParts = coins.map(c => `${c}¢`).join(" + ");
      if (tier < 3) {
        return {
          story: `Count the coins in the Royal Treasury from largest value to smallest! How many cents (¢) in all?`,
          equationHTML: `${eqParts} = <span class="eq-mystery-box">?</span>¢`,
          solvedEquationHTML: `${eqParts} = <span class="eq-mystery-box solved">${baseTotal}</span>¢`,
          answer: baseTotal,
          choices: buildChoices(baseTotal, 10, 85),
          visualSpec: { type: "coins", coins },
          whyText: `Adding the coins (${eqParts}) gives ${baseTotal}¢.`
        };
      } else {
        const extraCoin = pick([5, 10]);
        const extraName = extraCoin === 10 ? "Dime (10¢)" : "Nickel (5¢)";
        const totalWithMore = baseTotal + extraCoin;
        return {
          keepVisualInTier3: true,
          story: `MENTAL MATH: Count the coins shown (${eqParts}), then add 1 MORE ${extraName} in your head! How many cents in all?`,
          equationHTML: `(${eqParts}) + ${extraCoin}¢ = <span class="eq-mystery-box">?</span>¢`,
          solvedEquationHTML: `(${eqParts}) + ${extraCoin}¢ = <span class="eq-mystery-box solved">${totalWithMore}</span>¢`,
          answer: totalWithMore,
          choices: buildChoices(totalWithMore, 25, 99),
          visualSpec: { type: "coins", coins },
          whyText: `The shown coins make ${baseTotal}¢, plus ${extraCoin}¢ more in your head makes ${totalWithMore}¢!`
        };
      }
    }
  },

  {
    id: 23,
    act: 4,
    isBoss: true,
    title: "FINAL BOSS: The Red Dragon",
    subtitle: "Act IV Final Boss: Complete Grade 1A & 1B Mastery Crown",
    gradeTag: "Dimensions 1A & 1B · Chapters 1–19 Final Boss",
    iconKey: "crown",
    missionType: "boss-dragon",
    missionActionLabel: "Dragon Health Struck",
    mapPos: { x: 90, y: 12 },
    shortDesc: "FINAL GRADE 1 BOSS: Strike the Red Dragon 5 times across all 19 chapters of Dimensions Grade 1 to win the Crown!",
    teacherGuide: {
      wonder: "Soli Deo Gloria! The Red Dragon tests the full breadth of Dimensions Grade 1 (Chapters 1–19): Make-10, Subtract-from-10, Regrouping to the Next Ten, Two-Digit Numbers to 100, Time, and Money!",
      script: "Cheer him on! Every clean first-try answer lands a direct strike on the Red Dragon of Ignorance!",
      heuristic: "Dimensions 1A + 1B Complete 19-Chapter Mastery.",
      handsOn: "Bestow a real treat or Knight's Certificate when he defeats the Red Dragon of First Grade!"
    },
    learnSteps: [
      {
        stepTag: "Step 1 of 3 · Regrouping Lance",
        narrative: "FINAL BOSS WARM-UP 1: Ready your Regrouping Lance! For 38 + 5, give 2 to 38 to reach 40, then add what is left over!",
        equationHTML: `38 + 5 = <span class="eq-mystery-box">?</span>`,
        visualSpec: { type: "regrouping", a: 38, b: 5, total: 43 },
        checkQuestion: {
          prompt: "Strike the Dragon's armor: What is 38 + 5?",
          choices: [41, 42, 43, 45],
          answer: 43,
          solvedEquationHTML: `38 + 5 = 40 + 3 = <span class="eq-mystery-box solved">43</span>`,
          coachText: "Glorious strike! 38 + 2 = 40, plus 3 = 43!"
        }
      },
      {
        stepTag: "Step 2 of 3 · Subtract-from-10 Shield",
        narrative: "FINAL BOSS WARM-UP 2: Raise your Subtract-from-10 Shield! For 15 − 8, take 8 from 10 first, then add the remaining ones!",
        equationHTML: `15 − 8 = <span class="eq-mystery-box">?</span>`,
        visualSpec: { type: "subtract-from-ten", teen: 15, ones: 5, sub: 8, leftInTen: 2, answer: 7 },
        checkQuestion: {
          prompt: "Quench the Dragon's flame: What is 15 − 8?",
          choices: [5, 6, 7, 8],
          answer: 7,
          solvedEquationHTML: `15 − 8 = 2 + 5 = <span class="eq-mystery-box solved">7</span>`,
          coachText: "Held firm! 10 − 8 = 2, and 2 + 5 = 7!"
        }
      },
      {
        stepTag: "Step 3 of 3 · Royal Treasury & Watchtower Mastery",
        narrative: "FINAL BOSS WARM-UP 3: Combine Quarters (25¢), Dimes (10¢), Nickels (5¢), Pennies (1¢), and Half-Hour Clocks! Enter the Final Trial to claim the Knight's Crown!",
        equationHTML: `25¢ + 10¢ + 5¢ + 1¢ = <span class="eq-mystery-box solved">41</span>¢`,
        visualSpec: { type: "coins", coins: [25, 10, 5, 1] }
      }
    ],
    generateProblem(tier) {
      const roll = randInt(1, 4);
      if (roll === 1) {
        const a = randInt(2, 3) * 10 + randInt(7, 9);
        const need = 10 - (a % 10);
        const b = randInt(need + 1, 6);
        const total = a + b;
        return {
          story: `Pierce the Dragon's scales! Bridge to the next ten: what is ${a} + ${b}?`,
          equationHTML: `${a} + ${b} = <span class="eq-mystery-box">?</span>`,
          solvedEquationHTML: `${a} + ${b} = <span class="eq-mystery-box solved">${total}</span>`,
          answer: total,
          choices: buildChoices(total, 25, 50),
          visualSpec: { type: "regrouping", a, b, total },
          whyText: `${a} + ${need} = ${a + need}, plus ${b - need} is ${total}.`
        };
      } else if (roll === 2) {
        const sub = pick([8, 9]);
        const ones = randInt(3, 7);
        const teen = 10 + ones;
        const leftInTen = 10 - sub;
        const answer = leftInTen + ones;
        return {
          story: `Block the Dragon's fire with Subtract-from-10! What is ${teen} − ${sub}?`,
          equationHTML: `${teen} − ${sub} = <span class="eq-mystery-box">?</span>`,
          solvedEquationHTML: `${teen} − ${sub} = <span class="eq-mystery-box solved">${answer}</span>`,
          answer,
          choices: buildChoices(answer, 2, 11),
          visualSpec: { type: "subtract-from-ten", teen, ones, sub, leftInTen, answer },
          whyText: `10 − ${sub} = ${leftInTen}, plus ${ones} is ${answer}.`
        };
      } else if (roll === 3) {
        const quarters = pick([0, 1]);
        const dimes = randInt(1, 3);
        const nickels = randInt(0, 2);
        const pennies = randInt(1, 3);
        const coins = [];
        for (let i = 0; i < quarters; i++) coins.push(25);
        for (let i = 0; i < dimes; i++) coins.push(10);
        for (let i = 0; i < nickels; i++) coins.push(5);
        for (let i = 0; i < pennies; i++) coins.push(1);
        const total = coins.reduce((s, c) => s + c, 0);
        const eqParts = coins.map(c => `${c}¢`).join(" + ");
        return {
          story: `Guard the Dragon's hoard! Count these coins from largest value to smallest: ${eqParts}!`,
          equationHTML: `${eqParts} = <span class="eq-mystery-box">?</span>¢`,
          solvedEquationHTML: `${eqParts} = <span class="eq-mystery-box solved">${total}</span>¢`,
          answer: total,
          choices: buildChoices(total, 15, 85),
          visualSpec: { type: "coins", coins },
          whyText: `Adding ${eqParts} equals ${total}¢.`
        };
      } else {
        const hour = randInt(2, 10);
        const dragonPhase = pick(["Dawn Strike", "Highland Clash", "Citadel Defense", "Dragon's Roar"]);
        return {
          story: `Strike at the half-hour (${dragonPhase})! Look at the Watchtower Clock: the long red hand points to 6 (:30). Read the short blue Hour Hand—it is half-past what hour?`,
          equationHTML: `${dragonPhase}: Half-past <span class="eq-mystery-box">?</span>`,
          solvedEquationHTML: `${dragonPhase}: Half-past <span class="eq-mystery-box solved">${hour}</span> (${hour}:30)`,
          answer: hour,
          choices: buildChoices(hour, 1, 12),
          visualSpec: { type: "clock", hour, minutes: 30 },
          whyText: `The short hand just passed ${hour}, so it is half-past ${hour} (${hour}:30).`
        };
      }
    }
  }
];

if (typeof window !== "undefined") {
  window.SQUIRE_RANKS = SQUIRE_RANKS;
  window.MERLIN_PRAISE = MERLIN_PRAISE;
  window.MERLIN_ENCOURAGE = MERLIN_ENCOURAGE;
  window.MASTER_ALDOUS_VOICES = MASTER_ALDOUS_VOICES;
  window.CURRICULUM_NODES = CURRICULUM_NODES;
}

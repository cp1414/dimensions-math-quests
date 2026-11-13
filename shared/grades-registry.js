// ============================================================================
// SHARED MULTI-GRADE REGISTRY (HOME HUB + PROGRESS READER)
// Organized by Grade & Pedagogical Scope — Zero Third-Party Brand Names
// ============================================================================

const GRADE_CATALOG = [
  {
    id: "k",
    badge: "Kindergarten",
    title: "Pip’s Meadow & The Four Seasons Garden",
    subtitle: "Ages 5–6 · Gentle Visual & Hands-On Math",
    description:
      "Sort autumn leaves, subitize on five- and ten-frames, build number bonds, explore shapes & balances, and count to 100 across four peaceful seasons.",
    href: "grades/k/index.html",
    storageKey: "four_seasons_garden_v1",
    totalUnits: 17, // 14 Core Units + 3 Seasonal Celebrations
    unitLabel: "Garden Walks",
    semesters: [
      "Semester A (Units 1–5): Sort, 0–10, Ordinals, Shapes, Compare",
      "Semester B (Units 6–14): Compare, Teens, Bonds, +, −, 100s, Time, Coins"
    ],
    themeAccent: "#2E6F40",
    themeBg: "#F4F9F2",
    iconKey: "garden",
    comingSoon: false
  },
  {
    id: "g1",
    badge: "Grade 1",
    title: "The Young Knight’s Quest",
    subtitle: "Ages 6–7 · Complete Visual & Mental Math",
    description:
      "Journey alongside Master Aldous across 4 Acts: Number Bonds to 10, Make-10 & Subtract-from-10, Bar Models, Place Value to 100, Clocks & Coins.",
    href: "grades/g1/index.html",
    storageKey: "young_knights_quest_v2",
    totalUnits: 23, // 19 Core Units + 4 Act Bosses
    unitLabel: "Missions",
    semesters: [
      "Semester A (Units 1–9): Bonds to 10, Make-10, Shapes, Ordinals",
      "Semester B (Units 10–19): Length, Bar Models, To 100, Groups, Time, Coins"
    ],
    themeAccent: "#173156",
    themeBg: "#FAF4E6",
    iconKey: "shield",
    comingSoon: false
  },
  {
    id: "g2",
    badge: "Grade 2",
    title: "The Lantern-Keeper’s Atlas",
    subtitle: "Ages 7–8 · Multi-Digit, Multiplication & Bar Models",
    description:
      "Coming next: Numbers to 1,000, vertical & mental regrouping, multiplication & division tables, metric measurement, and two-step bar model stories.",
    href: "#",
    storageKey: "lantern_atlas_v1",
    totalUnits: 18,
    unitLabel: "Expeditions",
    semesters: [
      "Planned: Numbers to 1,000, Mental & Column Regrouping",
      "Planned: Multiplication & Division, Metric Units, Fractions, Time"
    ],
    themeAccent: "#6E5A44",
    themeBg: "#F4EFE6",
    iconKey: "compass",
    comingSoon: true
  }
];

function readGradeProgressSummary(grade) {
  const result = {
    started: false,
    masteredCount: 0,
    totalUnits: grade.totalUnits,
    starsEarned: 0
  };
  if (grade.comingSoon || typeof localStorage === "undefined") return result;
  try {
    const raw = localStorage.getItem(grade.storageKey);
    if (!raw) return result;
    const parsed = JSON.parse(raw);
    const prog = parsed && parsed.nodeProgress ? parsed.nodeProgress : {};
    const keys = Object.keys(prog);
    if (keys.length > 0) result.started = true;
    for (let i = 0; i < keys.length; i++) {
      const entry = prog[keys[i]];
      if (entry && entry.mastered) result.masteredCount++;
      if (entry && typeof entry.stars === "number") result.starsEarned += entry.stars;
    }
  } catch (e) {
    // Ignore malformed local storage safely
  }
  return result;
}

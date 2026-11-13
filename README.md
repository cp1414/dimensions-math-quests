# Hearth & Wonder Math
### A Multi-Grade Classical Christian Visual & Mental Math Suite for Homeschool Families

**Hearth & Wonder Math** is an offline-capable, zero-tracking Progressive Web App (PWA) that guides children and parents through a complete **Concrete → Pictorial → Abstract (CPA)** math journey from a single **Home Hub**. Choose your child’s grade on the landing page to enter a self-contained, single-screen story world with live parent coaching and interactive digital manipulatives.

* **100% Free, Private & Offline-Capable:** Zero ads, zero logins, zero cookies, zero external CDNs, and strict Content Security Policy headers. Progress is saved locally per grade in your browser (`localStorage`).
* **Unified Home Hub ([`index.html`](./index.html)):** Parents pick the grade level they need—Kindergarten, Grade 1, and future grades—and see progress at a glance.
* **Built for Parents & Kids Together:** Every grade includes a split-screen **Parent Guide** sidebar with Socratic scripts, Classical Christian wonder & living-book pairings, visual mental-math strategies, and hands-on tabletop activities.

---

## Available Grade Adventures

### Kindergarten — *Pip’s Meadow & The Four Seasons Garden* ([`grades/k/index.html`](./grades/k/index.html))
Journey alongside **Pip the Hedgehog** and **Professor Barnaby Owl** across **17 Garden Walks** (**14 Core Units + 3 Seasonal Celebrations**):
* **Season I · Autumn Harvest (Semester A, Units 1–3):** Match, Sort & Classify; Numbers 0–5 & Subitizing on 5-Frames; Numbers 6–10 & Ordinal Positions (`1st`–`10th`).
* **Season II · Winter Hearth (Semester A, Units 4–5 + Review):** Flat 2D Shapes, 3D Solids, Position Words & Patterns; Comparing Length, Weight (Pan Balance) & Capacity; Semester A Celebration.
* **Season III · Spring Blossom (Semester B, Units 6–10 + Review):** Comparing Sets Within 10; Numbers to 20 ("10 and Some More"); Number Bonds Within 10; Addition Within 10; Subtraction Within 10; Spring Celebration.
* **Season IV · Summer Meadow (Semester B, Units 11–14 + Finale):** Mixed Add & Subtract Stories; Numbers to 100 (Tens & Ones); Time to the Hour; US Coins (`1¢`, `5¢`, `10¢`, `25¢`); Grand Summer Harvest Festival.
* Includes a **6-Station Garden Blocks Workshop** (`5 & 10 Frames`, `Number Bonds`, `Add & Take Away`, `Shapes & Patterns`, `Balance & Length`, `100s, Clock & Coins`).

### Grade 1 — *The Young Knight’s Quest* ([`grades/g1/index.html`](./grades/g1/index.html))
Journey alongside **Master Aldous** across **23 Missions in 4 Acts** (**19 Core Units + 4 Act Bosses**):
* **Act I — The Forest of Ten (Units 1–4):** Numbers to 10, Number Bonds, Addition & Subtraction Within 10, Forest Giant Boss.
* **Act II — Crossing the River of Twenty (Units 5–9):** Numbers to 20, Make-10 Addition, Subtract-from-10, Shapes, Ordinals, River Serpent Boss.
* **Act III — The Highland Strongholds to 40 (Units 10–15):** Length, Comparison Bar Models, Numbers to 40, Make-the-Next-Ten Regrouping, Equal Groups & Sharing, Halves & Fourths, Iron Golem Boss.
* **Act IV — The Dragon’s Mountain to 100 (Units 16–19):** Numbers to 100, Two-Digit Addition & Subtraction, Hour & Half-Hour Clocks, Coins, Red Dragon Finale.
* Includes a **7-Station Math Blocks Workshop** and **57 pre-rendered `.wav` voice clips** in [`grades/g1/audio/`](./grades/g1/audio/).

---

## Running Locally & Verification

* **Play Locally:** Open [`index.html`](./index.html) directly in Safari, Chrome, or Edge, or serve the folder over HTTP (`python3 -m http.server`).
* **Project Structure:**
  * [`index.html`](./index.html), [`manifest.json`](./manifest.json), [`icon.svg`](./icon.svg), [`sw.js`](./sw.js) — Multi-grade PWA root & offline Service Worker with Safari byte-range audio support.
  * [`hub/`](./hub/) — Desktop Study Library Home Hub (`hub.css`, `hub.js`, `hub-art.js`).
  * [`shared/`](./shared/) — Shared registry, PWA/dialog helper, audio engine, CPA primitives, and vendored Three.js.
  * [`grades/k/`](./grades/k/) & [`grades/g1/`](./grades/g1/) — Self-contained grade story worlds, curricula, and Grade 1 voice bank ([`grades/g1/audio/`](./grades/g1/audio/)).
  * [`scripts/`](./scripts/) & [`tests/`](./tests/) — Static voice builder & automated QA suite.
* **Automated Multi-Grade QA Suite ([`tests/verify_all.py`](./tests/verify_all.py)):** Fuzz-tests 3,600 generated math problems across Kindergarten (17 walks) and Grade 1 (23 missions), checks adaptive mastery, workshop stations, audio headers, `sw.js` asset list, 100vh lock, CSP headers, and compliance:
  ```bash
  python3 tests/verify_all.py
  ```
* **Original Content Notice:** All stories, characters, dialogue, SVG artwork, and generated math exercises in this project are original works created independently for homeschool and educational use, and are not affiliated with or endorsed by any third-party curriculum publisher.

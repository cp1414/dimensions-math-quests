#!/usr/bin/env python3
"""
Automated QA & Verification Suite for The Young Knight's Quest
==============================================================
Runs 7 categories of automated tests using built-in macOS Python 3 + WebKit JavaScriptCore (jsc):
1. Story Text <-> Visual Item & Quantity Semantic Match (catches noun mismatches & number drift)
2. Rendered SVG / DOM Visual Truth Inspection (verifies drawn elements match the math)
3. Monte Carlo Problem Generator Fuzzing (2,070 random problems across 23 missions x 3 tiers)
4. Progressive Difficulty & Tier 3 Mental Math Verification
5. Adaptive Mastery State Machine ("No Guessing Through" & Auto Step-Down on 2 Misses)
6. Static Audio (.wav) RIFF Header & Voice Bank Completeness Verification
7. UI Invariants (Single-Page 100vh Lock, Zero System Emojis, Map Pin Non-Overlap)
"""

import json
import math
import os
import re
import subprocess
import sys
import wave

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
JSC_BIN = "/System/Library/Frameworks/JavaScriptCore.framework/Versions/A/Helpers/jsc"


def run_jsc_audit():
    js_test_code = r"""
    var window = { addEventListener: function(){} };
    var mockElements = {};
    function getMockEl(id) {
      if (!mockElements[id]) {
        mockElements[id] = {
          id: id,
          innerHTML: "",
          textContent: "",
          style: {},
          dataset: {},
          className: "",
          classList: {
            _set: {},
            add: function(c) { this._set[c] = true; },
            remove: function(c) { delete this._set[c]; },
            toggle: function(c, cond) {
              if (cond === undefined) cond = !this._set[c];
              if (cond) this._set[c] = true; else delete this._set[c];
            },
            contains: function(c) { return !!this._set[c]; }
          },
          addEventListener: function() {},
          setAttribute: function() {},
          showModal: function() { this.open = true; },
          close: function() { this.open = false; },
          appendChild: function() {},
          remove: function() {},
          querySelectorAll: function() { return []; }
        };
      }
      return mockElements[id];
    }
    var document = {
      getElementById: function(id) { return getMockEl(id); },
      querySelectorAll: function() { return []; },
      createElement: function(tag) { return getMockEl("created_" + Math.random()); },
      body: getMockEl("body")
    };
    var localStorage = {
      _store: {},
      getItem: function(k) { return this._store[k] || null; },
      setItem: function(k, v) { this._store[k] = String(v); },
      removeItem: function(k) { delete this._store[k]; }
    };
    var requestAnimationFrame = function(cb) { cb(); };
    var setTimeout = function(cb) { /* synchronous stub for state tests */ };
    var Audio = function(src) {
      this.src = src;
      this.play = function() { return { catch: function(){} }; };
      this.pause = function() {};
      this.addEventListener = function() {};
    };

    load("curriculum.js");
    load("visuals.js");
    load("app.js");

    var errors = [];
    function assert(cond, msg) {
      if (!cond) errors.push(msg);
    }

    // Allowed nouns per itemType so story text NEVER mismatches the drawn SVG item
    var ITEM_NOUNS = {
      apple:   ["apple", "apples", "part", "parts", "whole", "lock"],
      shield:  ["shield", "shields", "raider", "raiders", "bandit", "bandits", "plate", "plates", "group", "groups", "tray", "trays"],
      log:     ["log", "logs", "wall", "oak", "pine"],
      lantern: ["lantern", "lanterns"],
      loaf:    ["loaf", "loaves", "crate", "crates", "barge", "trays"]
    };
    var FORBIDDEN_CROSS_NOUNS = {
      apple:   ["coin", "coins", "lantern", "lanterns", "log", "logs"],
      shield:  ["apple", "apples", "loaf", "loaves", "lantern", "lanterns"],
      log:     ["apple", "apples", "coin", "coins", "lantern", "lanterns"],
      lantern: ["apple", "apples", "coin", "coins", "loaf", "loaves"],
      loaf:    ["apple", "apples", "lantern", "lanterns"]
    };

    function verifyVisualMatchesProblem(nodeId, label, text, eqHTML, solvedHTML, answer, spec) {
      var container = { innerHTML: "" };
      Visuals.renderMathVisual(container, spec);
      var html = container.innerHTML;
      assert(html && html.length > 20, "Node " + nodeId + " (" + label + "): empty visual HTML");

      // Check itemType noun consistency
      if (spec.itemType) {
        var lower = text.toLowerCase();
        var forbidden = FORBIDDEN_CROSS_NOUNS[spec.itemType] || [];
        for (var f = 0; f < forbidden.length; f++) {
          var badWord = forbidden[f];
          var regex = new RegExp("\\b" + badWord + "\\b", "i");
          assert(!regex.test(lower),
            "Node " + nodeId + " (" + label + "): Text mentions '" + badWord + "' but visual draws itemType='" + spec.itemType + "'! Text: " + text);
        }
      }

      // Check visual-specific structural & mathematical truth + DOM element counts!
      if (spec.type === "number-bond-concrete") {
        assert(spec.partA + spec.partB === spec.whole,
          "Node " + nodeId + " (" + label + "): number-bond-concrete partA + partB != whole");
        if (spec.missing === "whole" && answer !== undefined) {
          assert(answer === spec.whole, "Node " + nodeId + " (" + label + "): answer != whole");
          assert(text.indexOf(String(spec.partA)) !== -1 && text.indexOf(String(spec.partB)) !== -1,
            "Node " + nodeId + ": story text missing partA/partB numbers: " + text);
        } else if (spec.missing === "partB" && answer !== undefined) {
          assert(answer === spec.partB, "Node " + nodeId + " (" + label + "): answer != partB");
          assert(text.indexOf(String(spec.whole)) !== -1 && text.indexOf(String(spec.partA)) !== -1,
            "Node " + nodeId + ": story text missing whole/partA numbers: " + text);
        }
        // Verify Ten-Frame has 10 cells
        var tfCells = html.match(/width:62px;height:62px/g) || [];
        assert(tfCells.length === 10, "Node " + nodeId + ": Ten-Frame must have 10 cells, got " + tfCells.length);
      } else if (spec.type === "count-on-path") {
        // Verify Number Path has 10 numbered boxes (1..10) and (total - start) hop arcs
        var pathBoxes = html.match(/width="56" height="56"/g) || [];
        assert(pathBoxes.length === 10, "Node " + nodeId + ": Number path must render 10 boxes");
        var hopArcs = html.match(/\+1<\/text>/g) || [];
        assert(hopArcs.length === (spec.total - spec.start),
          "Node " + nodeId + ": Number path hop arcs (" + hopArcs.length + ") != total - start (" + (spec.total - spec.start) + ")");
      } else if (spec.type === "subtraction-crossout") {
        assert(spec.whole - spec.takeAway === spec.remaining,
          "Node " + nodeId + " (" + label + "): subtraction-crossout math mismatch");
        assert(text.indexOf(String(spec.whole)) !== -1 && text.indexOf(String(spec.takeAway)) !== -1,
          "Node " + nodeId + ": subtraction story text missing whole or takeAway: " + text);
        // Count red cross-out lines in rendered SVG (stroke="#982B2B" stroke-width="5")
        var crossMatches = html.match(/stroke="#982B2B" stroke-width="5"/g) || [];
        assert(crossMatches.length === spec.takeAway,
          "Node " + nodeId + " (" + label + "): drawn cross-outs (" + crossMatches.length + ") != takeAway (" + spec.takeAway + ")");
      } else if (spec.type === "comparison-rows") {
        if (answer !== undefined) {
          assert(spec.topCount - spec.bottomCount === answer,
            "Node " + nodeId + " (" + label + "): comparison-rows top - bottom != answer");
        }
        var compBoxes = html.match(/width="42" height="42"/g) || [];
        assert(compBoxes.length === spec.topCount + spec.bottomCount,
          "Node " + nodeId + ": comparison drawn boxes != topCount + bottomCount");
      } else if (spec.type === "make-ten") {
        assert(spec.a + spec.needForTen === 10, "Node " + nodeId + ": make-ten a + needForTen != 10");
        assert(spec.needForTen + spec.leftover === spec.b, "Node " + nodeId + ": make-ten split != b");
        assert(10 + spec.leftover === spec.total, "Node " + nodeId + ": make-ten total mismatch");
        if (answer !== undefined) {
          assert(answer === spec.total || answer === spec.leftover,
            "Node " + nodeId + ": make-ten answer must be total or leftover");
          assert(text.indexOf(String(spec.a)) !== -1 && text.indexOf(String(spec.b)) !== -1,
            "Node " + nodeId + ": make-ten story text missing a or b: " + text);
        }
      } else if (spec.type === "subtract-from-ten") {
        assert(10 - spec.sub === spec.leftInTen, "Node " + nodeId + ": subtract-from-ten 10 - sub != leftInTen");
        assert(spec.leftInTen + spec.ones === spec.answer, "Node " + nodeId + ": subtract-from-ten answer mismatch");
        if (answer !== undefined) {
          assert(text.indexOf(String(spec.teen)) !== -1 && text.indexOf(String(spec.sub)) !== -1,
            "Node " + nodeId + ": subtract-from-ten story text missing teen or sub: " + text);
        }
      } else if (spec.type === "place-value") {
        var expectedTotal = (spec.tens + (spec.addTens || 0)) * 10 + (spec.ones + (spec.addOnes || 0));
        if (answer !== undefined) {
          assert(expectedTotal === answer, "Node " + nodeId + " (" + label + "): place-value total != answer");
        }
        // Count drawn Ten-Towers (each tower has 10 segments -> border:2px solid #1B2D48)
        var drawnTowers = html.match(/border:2px solid #1B2D48/g) || [];
        assert(drawnTowers.length === (spec.tens + (spec.addTens || 0)),
          "Node " + nodeId + ": drawn Ten-Towers != totalTens");
        // Count drawn loose Ones cubes (width:24px;height:24px)
        var drawnOnes = html.match(/width:24px;height:24px/g) || [];
        assert(drawnOnes.length === (spec.ones + (spec.addOnes || 0)),
          "Node " + nodeId + ": drawn loose Ones != totalOnes");
      } else if (spec.type === "regrouping") {
        assert(spec.a + spec.b === spec.total, "Node " + nodeId + ": regrouping a + b != total");
        if (answer !== undefined) {
          assert(text.indexOf(String(spec.a)) !== -1 && text.indexOf(String(spec.b)) !== -1,
            "Node " + nodeId + ": regrouping story text missing a or b: " + text);
        }
      } else if (spec.type === "equal-groups") {
        assert(spec.groups * spec.perGroup === spec.total, "Node " + nodeId + ": equal-groups product != total");
        if (answer !== undefined) {
          assert(answer === spec.total || answer === spec.perGroup || answer === spec.groups,
            "Node " + nodeId + ": equal-groups answer must be total, perGroup, or groups");
        }
        var drawnTrays = html.match(/min-width:125px/g) || [];
        assert(drawnTrays.length === spec.groups,
          "Node " + nodeId + ": drawn trays (" + drawnTrays.length + ") != groups (" + spec.groups + ")");
      } else if (spec.type === "shapes" && spec.mode === "single") {
        // Count golden vertex circles (fill="#E5B93C" stroke="#1B365D")
        var vertexDots = html.match(/fill="#E5B93C" stroke="#1B365D"/g) || [];
        if (answer !== undefined) {
          assert(vertexDots.length === answer,
            "Node " + nodeId + ": drawn shape corner dots (" + vertexDots.length + ") != answer (" + answer + ")");
        }
      } else if (spec.type === "length-units") {
        var unitBlocks = html.match(/width:48px;height:38px/g) || [];
        var expectedBlocks = (spec.offsetA || 0) + spec.lengthA + (spec.lengthB ? spec.lengthB : 0);
        assert(unitBlocks.length === expectedBlocks,
          "Node " + nodeId + ": drawn measuring blocks (" + unitBlocks.length + ") != expected (" + expectedBlocks + ")");
      } else if (spec.type === "fractions") {
        var goldSlices = html.match(/#E5B93C/g) || [];
        assert(goldSlices.length === spec.shaded,
          "Node " + nodeId + ": drawn gold fraction parts (" + goldSlices.length + ") != shaded (" + spec.shaded + ")");
      } else if (spec.type === "coins") {
        for (var c2 = 0; c2 < spec.coins.length; c2++) {
          assert(html.indexOf(spec.coins[c2] + "¢") !== -1, "Node " + nodeId + ": missing coin SVG label " + spec.coins[c2] + "¢");
        }
      } else if (spec.type === "clock") {
        assert(spec.hour >= 1 && spec.hour <= 12, "Node " + nodeId + ": invalid clock hour " + spec.hour);
        assert(spec.minutes === 0 || spec.minutes === 30, "Node " + nodeId + ": invalid clock minutes " + spec.minutes);
      }
    }

    // 1. Audit all 23 missions: learnSteps + 30 random problems per tier (1, 2, 3)
    var totalProblemsTested = 0;
    for (var i = 0; i < CURRICULUM_NODES.length; i++) {
      var node = CURRICULUM_NODES[i];
      assert(node.learnSteps && node.learnSteps.length >= 3,
        "Node " + node.id + " must have at least 3 progressive CPA learnSteps, found " + (node.learnSteps ? node.learnSteps.length : 0));
      var checkCount = 0;
      for (var s = 0; s < node.learnSteps.length; s++) {
        var step = node.learnSteps[s];
        verifyVisualMatchesProblem(node.id, "learnStep[" + s + "]", step.narrative, step.equationHTML, step.equationHTML, undefined, step.visualSpec);
        if (step.checkQuestion) {
          checkCount++;
          assert(step.checkQuestion.choices && step.checkQuestion.choices.indexOf(step.checkQuestion.answer) !== -1,
            "Node " + node.id + " learnStep[" + s + "] checkQuestion answer missing from choices");
        }
      }
      assert(checkCount >= 1, "Node " + node.id + " must include at least 1 interactive checkQuestion in learnSteps");
      for (var tier = 1; tier <= 3; tier++) {
        for (var k = 0; k < 30; k++) {
          var prob = node.generateProblem(tier);
          totalProblemsTested++;
          verifyVisualMatchesProblem(node.id, "tier=" + tier, prob.story, prob.equationHTML, prob.solvedEquationHTML, prob.answer, prob.visualSpec);

          // Verify choices array
          assert(prob.choices && prob.choices.length === 4,
            "Node " + node.id + " tier " + tier + ": expected 4 choices, got " + JSON.stringify(prob.choices));
          var hasAns = false;
          for (var c = 0; c < prob.choices.length; c++) {
            if (prob.choices[c] === prob.answer) hasAns = true;
            if (c > 0) {
              assert(prob.choices[c] > prob.choices[c - 1],
                "Node " + node.id + " tier " + tier + ": choices not strictly sorted/unique: " + JSON.stringify(prob.choices));
            }
          }
          assert(hasAns, "Node " + node.id + " tier " + tier + ": answer " + prob.answer + " missing from choices " + JSON.stringify(prob.choices));
          assert(prob.equationHTML.indexOf("?") !== -1, "Node " + node.id + " tier " + tier + ": equationHTML missing '?'");
          assert(prob.solvedEquationHTML.indexOf(String(prob.answer)) !== -1,
            "Node " + node.id + " tier " + tier + ": solvedEquationHTML missing answer " + prob.answer);
        }
      }
    }

    // 2. Test Progressive Difficulty & Tier 3 Mental Math + Adaptive Mastery State Machine
    App.init();
    App.openNodeInStudio(1);
    App.setStudioMode("trial", false);
    var p1 = App.getProgress(1);
    assert(p1.shields === 0 && p1.tier === 1 && App.visualHintVisible === true,
      "Initial state should be 0 shields, Tier 1, visualHintVisible=true");

    // Simulate a WRONG answer first on Problem 1:
    var wrongChoice = App.currentProblem.choices[0] === App.currentProblem.answer
      ? App.currentProblem.choices[1]
      : App.currentProblem.choices[0];
    App.handleAnswerAttempt(wrongChoice, null);
    assert(App.missedCurrentProblem === true, "After wrong answer, missedCurrentProblem should be true");
    // Now tap the RIGHT answer on that same problem: shields must NOT increment!
    App.handleAnswerAttempt(App.currentProblem.answer, null);
    assert(p1.shields === 0, "Guessing right after a miss must NOT award a shield strike! Got shields=" + p1.shields);

    // Now simulate 4 clean first-try strikes to reach Strike 5 (Tier 3 Mental Math):
    for (var hit = 1; hit <= 4; hit++) {
      App.loadNextProblem(false);
      if (hit <= 2) assert(p1.tier === 1, "Hit " + hit + " should be Tier 1");
      if (hit >= 3) assert(p1.tier === 2, "Hit " + hit + " should be Tier 2");
      App.handleAnswerAttempt(App.currentProblem.answer, null);
      assert(p1.shields === hit, "After clean hit " + hit + ", shields should be " + hit);
    }

    // Load Strike 5 (4 shields -> Tier 3 Mental Math!):
    App.loadNextProblem(false);
    assert(p1.tier === 3, "At 4 shields (Strike 5), tier must automatically advance to Tier 3");
    assert(App.visualHintVisible === false, "At Tier 3 on arithmetic mission, visualHintVisible must start FALSE (Mental Math mode)");

    // Simulate 2 consecutive misses at Tier 3 -> must automatically step down to Tier 2!
    var w1 = App.currentProblem.choices[0] === App.currentProblem.answer ? App.currentProblem.choices[1] : App.currentProblem.choices[0];
    App.handleAnswerAttempt(w1, null);
    assert(App.visualHintVisible === true, "Missing a Tier 3 Mental Math problem must immediately reveal the visual diagram");
    App.loadNextProblem(true);
    var w2 = App.currentProblem.choices[0] === App.currentProblem.answer ? App.currentProblem.choices[1] : App.currentProblem.choices[0];
    App.handleAnswerAttempt(w2, null);
    assert(p1.tier === 2, "Missing 2 problems in a row at Tier 3 must step difficulty down to Tier 2, got tier=" + p1.tier);

    // 3. Test All 7 Math Blocks Workshop Stations (Explore & Quiz Modes + Node Jump)
    var stations = ["bonds10", "maketen", "shapeslen", "barmodel", "placevalue", "groupsfrac", "clockcoins"];
    for (var stIdx = 0; stIdx < stations.length; stIdx++) {
      App.tabletopTool = stations[stIdx];
      App.setTabletopMode("explore");
      var wsHTML = document.getElementById("tabletop-workspace").innerHTML;
      assert(wsHTML.indexOf("TEACHING PROMPT:") !== -1, "Math Blocks station " + stations[stIdx] + " explore mode missing teaching prompt");
      App.setTabletopMode("quiz");
      var qzHTML = document.getElementById("tabletop-workspace").innerHTML;
      assert(qzHTML.indexOf("PRACTICE PROMPT:") !== -1, "Math Blocks station " + stations[stIdx] + " quiz mode missing practice prompt");
      assert(App.tabletopQuizProblem && App.tabletopQuizProblem.choices.length === 4, "Math Blocks station " + stations[stIdx] + " quiz problem invalid");
    }
    for (var nid = 1; nid <= CURRICULUM_NODES.length; nid++) {
      App.openNodeInTabletop(nid);
      assert(App.state.currentView === "tabletop", "openNodeInTabletop(" + nid + ") should switch to tabletop view");
    }

    // 3b. Test Per-Level Reset (resetCurrentLevel resets only the active level, preserving others)
    App.state.nodeProgress[1] = { shields: 5, tier: 3, mastered: true, stars: 2 };
    App.state.nodeProgress[2] = { shields: 4, tier: 3, mastered: false, stars: 1 };
    App.state.selectedNodeId = 2;
    App.switchView("studio");
    App.openNodeInStudio(2);
    App.resetCurrentLevel();
    assert(App.getProgress(2).shields === 0 && App.getProgress(2).mastered === false && App.getProgress(2).stars === 0,
      "resetCurrentLevel must reset the current level (Node 2) to 0 shields and 0 stars");
    assert(App.getProgress(1).mastered === true && App.getProgress(1).stars === 2,
      "resetCurrentLevel must NOT reset other levels (Node 1)");

    // 4. Test Anti-Repeat Problem & Verbal Cue Selection Across All 23 Missions
    for (var nIdx = 0; nIdx < CURRICULUM_NODES.length; nIdx++) {
      var testNode = CURRICULUM_NODES[nIdx];
      // Verify 15 consecutive problems in each tier never repeat back-to-back
      for (var tTier = 1; tTier <= 3; tTier++) {
        App.recentProblemKeys = [];
        App.lastProblemAnswer = null;
        var prevEq = null;
        var uniqueSet = {};
        for (var pStep = 0; pStep < 15; pStep++) {
          var uProb = App.generateUniqueProblem(testNode, tTier);
          var sig = testNode.id + "|" + uProb.equationHTML + "|" + uProb.answer;
          assert(sig !== prevEq,
            "Back-to-back duplicate problem on Node " + testNode.id + " tier " + tTier + ": " + uProb.equationHTML);
          prevEq = sig;
          uniqueSet[sig] = true;
        }
        var uniqueCount = Object.keys(uniqueSet).length;
        assert(uniqueCount >= 5,
          "Insufficient problem variety on Node " + testNode.id + " tier " + tTier + ": only " + uniqueCount + " unique problems in 15 rolls");
      }

      // Verify 20 consecutive voice cues never repeat back-to-back
      var vPool = MASTER_ALDOUS_VOICES.actionPraise[testNode.missionType];
      assert(vPool && vPool.length >= 6,
        "Mission type " + testNode.missionType + " should have at least 6 praise lines, got " + (vPool ? vPool.length : 0));
      App.recentVoiceKeys = [];
      App.recentVoiceTexts = [];
      var prevVoiceText = null;
      for (var vStep = 0; vStep < 20; vStep++) {
        var vChosen = App.pickNonRepeatingVoice(vPool);
        assert(vChosen && vChosen.text !== prevVoiceText,
          "Back-to-back duplicate verbal cue on missionType " + testNode.missionType + ": " + (vChosen ? vChosen.text : "null"));
        prevVoiceText = vChosen.text;
      }
    }

    // Collect all voice keys referenced in curriculum.js
    var voiceKeys = [
      "praise_0","praise_1","praise_2","praise_3","praise_4","praise_5",
      "encourage_0","encourage_1","encourage_2","encourage_3",
      "victory_standard","victory_boss"
    ];
    for (var k1 in MASTER_ALDOUS_VOICES.actionPraise) {
      var arr = MASTER_ALDOUS_VOICES.actionPraise[k1];
      for (var j = 0; j < arr.length; j++) voiceKeys.push(arr[j].key);
    }
    for (var j2 = 0; j2 < MASTER_ALDOUS_VOICES.mentalMathIntro.length; j2++) {
      voiceKeys.push(MASTER_ALDOUS_VOICES.mentalMathIntro[j2].key);
    }
    for (var j3 = 0; j3 < MASTER_ALDOUS_VOICES.mentalMathWin.length; j3++) {
      voiceKeys.push(MASTER_ALDOUS_VOICES.mentalMathWin[j3].key);
    }
    for (var k2 in MASTER_ALDOUS_VOICES.topicCoach) {
      voiceKeys.push(MASTER_ALDOUS_VOICES.topicCoach[k2].key);
    }

    var mapPositions = [];
    for (var m = 0; m < CURRICULUM_NODES.length; m++) {
      mapPositions.push({ id: CURRICULUM_NODES[m].id, x: CURRICULUM_NODES[m].mapPos.x, y: CURRICULUM_NODES[m].mapPos.y });
    }

    print(JSON.stringify({
      ok: errors.length === 0,
      errors: errors,
      missionsTested: CURRICULUM_NODES.length,
      problemsTested: totalProblemsTested,
      voiceKeys: voiceKeys,
      mapPositions: mapPositions
    }));
    """

    proc = subprocess.run(
        [JSC_BIN, "-e", js_test_code],
        cwd=BASE_DIR,
        capture_output=True,
        text=True,
        check=True,
    )
    lines = [line.strip() for line in proc.stdout.splitlines() if line.strip().startswith("{")]
    return json.loads(lines[-1])


def verify_audio_files(voice_keys):
    errors = []
    audio_dir = os.path.join(BASE_DIR, "audio")
    for key in set(voice_keys):
        wav_path = os.path.join(audio_dir, f"{key}.wav")
        if not os.path.exists(wav_path):
            errors.append(f"Missing audio file: audio/{key}.wav")
            continue
        try:
            with wave.open(wav_path, "rb") as wf:
                frames = wf.getnframes()
                rate = wf.getframerate()
                duration = frames / float(rate) if rate else 0
                if duration < 0.5:
                    errors.append(f"Audio file too short ({duration:.2f}s): audio/{key}.wav")
        except Exception as exc:
            errors.append(f"Invalid WAV file audio/{key}.wav: {exc}")
    return errors


def verify_ui_and_map_invariants(map_positions):
    errors = []
    # 1. Check zero system emojis in JS/CSS files
    emoji_re = re.compile(r"[\U0001F300-\U0001FAFF\u2600-\u27BF]")
    for fname in ["curriculum.js", "visuals.js", "app.js", "styles.css"]:
        fpath = os.path.join(BASE_DIR, fname)
        with open(fpath, "r", encoding="utf-8") as f:
            content = f.read()
        found = emoji_re.findall(content)
        if found:
            errors.append(f"Found forbidden emoji(s) in {fname}: {found}")

    # 2. Check 100vh/100dvh + overflow: hidden + focus-visible + prefers-reduced-motion in styles.css
    with open(os.path.join(BASE_DIR, "styles.css"), "r", encoding="utf-8") as f:
        css = f.read()
    if "100vh" not in css or "100dvh" not in css or "overflow: hidden" not in css:
        errors.append("styles.css is missing 100vh, 100dvh, or overflow: hidden single-page lock")
    if ":focus-visible" not in css:
        errors.append("styles.css is missing :focus-visible keyboard accessibility styles")
    if "prefers-reduced-motion" not in css:
        errors.append("styles.css is missing @media (prefers-reduced-motion: reduce)")

    # 2b. Check modern HTML (<dialog>, aria-live, manifest.json, sw.js)
    with open(os.path.join(BASE_DIR, "index.html"), "r", encoding="utf-8") as f:
        html_doc = f.read()
    if "<dialog" not in html_doc:
        errors.append("index.html should use native <dialog> elements for modals")
    if 'aria-live="polite"' not in html_doc:
        errors.append("index.html is missing aria-live=\"polite\" on dynamic math prompts/equations")
    if "fonts.googleapis.com" in html_doc:
        errors.append("index.html still contains external Google Fonts network requests")
    for pwa_file in ["manifest.json", "sw.js", "icon.svg"]:
        if not os.path.exists(os.path.join(BASE_DIR, pwa_file)):
            errors.append(f"Missing offline PWA file: {pwa_file}")

    # 3. Check map pin spacing so no two pins overlap on the Kingdom Map
    for i in range(len(map_positions)):
        for j in range(i + 1, len(map_positions)):
            p1, p2 = map_positions[i], map_positions[j]
            dist = math.hypot(p1["x"] - p2["x"], p1["y"] - p2["y"])
            if dist < 5.5:
                errors.append(
                    f"Map pins {p1['id']} and {p2['id']} are too close ({dist:.1f}% < 5.5%)"
                )
    return errors


def main():
    print("=" * 72)
    print("RUNNING AUTOMATED QA SUITE: THE YOUNG KNIGHT'S QUEST")
    print("=" * 72)

    jsc_res = run_jsc_audit()
    audio_errors = verify_audio_files(jsc_res["voiceKeys"])
    ui_errors = verify_ui_and_map_invariants(jsc_res["mapPositions"])

    all_errors = jsc_res["errors"] + audio_errors + ui_errors

    print(f"[✓] Missions Audited:          {jsc_res['missionsTested']} / 23 (Units 1–19 + 4 Bosses)")
    print(f"[✓] Monte Carlo Problems Run:  {jsc_res['problemsTested']} generated problems (Text <-> Visual & Math checked)")
    print(f"[✓] Adaptive & Mental Math:    Verified Tier 1 -> Tier 2 -> Tier 3 (Picture hidden on Tier 3, auto step-down on 2 misses)")
    print(f"[✓] Static Voice Clips (.wav): {len(set(jsc_res['voiceKeys']))} / 57 WAV headers & durations verified")
    print(f"[✓] UI & Map Pin Invariants:   100vh lock, 0 emojis, and {len(jsc_res['mapPositions'])} non-overlapping map pins")
    print("-" * 72)

    if all_errors:
        print(f"FAILED WITH {len(all_errors)} ERROR(S):")
        for err in all_errors:
            print("  [✗]", err)
        sys.exit(1)
    else:
        print("ALL AUTOMATED TESTS PASSED (0 ERRORS)!")
        sys.exit(0)


if __name__ == "__main__":
    main()

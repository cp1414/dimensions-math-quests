#!/usr/bin/env python3
"""
Automated QA & Verification Suite for Hearth & Wonder Math (Multi-Grade Suite)
==============================================================================
Verifies:
1. Home Hub & Shared Core (100vh lock, CSP, zero emojis, PWA manifest & sw.js)
2. Grade 1: The Young Knight's Quest (23 missions, 2,070 Monte Carlo problems,
   adaptive mastery, 7 Math Blocks stations, 57 .wav files, UI/map invariants)
3. Kindergarten: Pip's Meadow & The Four Seasons Garden (17 Garden Walks,
   1,530 Monte Carlo problems, adaptive mastery, 6 Garden Blocks stations, UI/map invariants)
4. Copyright & Trademark Compliance (zero prohibited third-party brand strings)
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

MOCK_DOM_PRELUDE = r"""
var window = { addEventListener: function(){}, location: { protocol: "file:" } };
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
      _attrs: {},
      setAttribute: function(k, v) { this._attrs[k] = String(v); },
      getAttribute: function(k) { return this._attrs[k] || null; },
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
  addEventListener: function() {},
  body: getMockEl("body")
};
var localStorage = {
  _store: {},
  getItem: function(k) { return this._store[k] || null; },
  setItem: function(k, v) { this._store[k] = String(v); },
  removeItem: function(k) { delete this._store[k]; }
};
var requestAnimationFrame = function(cb) { cb(); };
var setTimeout = function(cb) {};
var Audio = function(src) {
  this.src = src;
  this.play = function() { return { catch: function(){} }; };
  this.pause = function() {};
  this.addEventListener = function() {};
};
"""


def run_grade1_jsc_audit():
    js_test_code = MOCK_DOM_PRELUDE + r"""
    load("shared/pwa-register.js");
    load("shared/audio-engine.js");
    load("grades/g1/curriculum.js");
    load("grades/g1/visuals.js");
    load("grades/g1/app.js");

    var errors = [];
    function assert(cond, msg) {
      if (!cond) errors.push(msg);
    }

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
      assert(html && html.length > 20, "G1 Node " + nodeId + " (" + label + "): empty visual HTML");

      if (spec.itemType) {
        var lower = text.toLowerCase();
        var forbidden = FORBIDDEN_CROSS_NOUNS[spec.itemType] || [];
        for (var f = 0; f < forbidden.length; f++) {
          var badWord = forbidden[f];
          var regex = new RegExp("\\b" + badWord + "\\b", "i");
          assert(!regex.test(lower),
            "G1 Node " + nodeId + " (" + label + "): Text mentions '" + badWord + "' but visual draws itemType='" + spec.itemType + "'! Text: " + text);
        }
      }

      if (spec.type === "number-bond-concrete") {
        assert(spec.partA + spec.partB === spec.whole, "G1 Node " + nodeId + ": number-bond-concrete partA + partB != whole");
        if (spec.missing === "whole" && answer !== undefined) assert(answer === spec.whole, "G1 Node " + nodeId + ": answer != whole");
        if (spec.missing === "partB" && answer !== undefined) assert(answer === spec.partB, "G1 Node " + nodeId + ": answer != partB");
        var tfCells = html.match(/width:62px;height:62px/g) || [];
        assert(tfCells.length === 10, "G1 Node " + nodeId + ": Ten-Frame must have 10 cells, got " + tfCells.length);
      } else if (spec.type === "count-on-path") {
        var pathBoxes = html.match(/width="56" height="56"/g) || [];
        assert(pathBoxes.length === 10, "G1 Node " + nodeId + ": Number path must render 10 boxes");
        var hopArcs = html.match(/\+1<\/text>/g) || [];
        assert(hopArcs.length === (spec.total - spec.start), "G1 Node " + nodeId + ": Number path hop arcs mismatch");
      } else if (spec.type === "subtraction-crossout") {
        assert(spec.whole - spec.takeAway === spec.remaining, "G1 Node " + nodeId + ": subtraction-crossout math mismatch");
        var crossMatches = html.match(/stroke="#982B2B" stroke-width="5"/g) || [];
        assert(crossMatches.length === spec.takeAway, "G1 Node " + nodeId + ": drawn cross-outs != takeAway");
      } else if (spec.type === "comparison-rows") {
        if (answer !== undefined) assert(spec.topCount - spec.bottomCount === answer, "G1 Node " + nodeId + ": comparison mismatch");
        var compBoxes = html.match(/width="42" height="42"/g) || [];
        assert(compBoxes.length === spec.topCount + spec.bottomCount, "G1 Node " + nodeId + ": comparison drawn boxes mismatch");
      } else if (spec.type === "make-ten") {
        assert(spec.a + spec.needForTen === 10 && spec.needForTen + spec.leftover === spec.b && 10 + spec.leftover === spec.total,
          "G1 Node " + nodeId + ": make-ten invariant mismatch");
      } else if (spec.type === "subtract-from-ten") {
        assert(10 - spec.sub === spec.leftInTen && spec.leftInTen + spec.ones === spec.answer, "G1 Node " + nodeId + ": subtract-from-ten mismatch");
      } else if (spec.type === "place-value") {
        var expectedTotal = (spec.tens + (spec.addTens || 0)) * 10 + (spec.ones + (spec.addOnes || 0));
        if (answer !== undefined) assert(expectedTotal === answer, "G1 Node " + nodeId + ": place-value total != answer");
        var drawnTowers = html.match(/border:2px solid #1B2D48/g) || [];
        assert(drawnTowers.length === (spec.tens + (spec.addTens || 0)), "G1 Node " + nodeId + ": drawn Ten-Towers mismatch");
        var drawnOnes = html.match(/width:24px;height:24px/g) || [];
        assert(drawnOnes.length === (spec.ones + (spec.addOnes || 0)), "G1 Node " + nodeId + ": drawn loose Ones mismatch");
      } else if (spec.type === "regrouping") {
        assert(spec.a + spec.b === spec.total, "G1 Node " + nodeId + ": regrouping mismatch");
      } else if (spec.type === "equal-groups") {
        assert(spec.groups * spec.perGroup === spec.total, "G1 Node " + nodeId + ": equal-groups mismatch");
        var drawnTrays = html.match(/min-width:125px/g) || [];
        assert(drawnTrays.length === spec.groups, "G1 Node " + nodeId + ": drawn trays mismatch");
      } else if (spec.type === "shapes" && spec.mode === "single") {
        var vertexDots = html.match(/fill="#E5B93C" stroke="#1B365D"/g) || [];
        if (answer !== undefined) assert(vertexDots.length === answer, "G1 Node " + nodeId + ": shape vertex dots mismatch");
      } else if (spec.type === "length-units") {
        var unitBlocks = html.match(/width:48px;height:38px/g) || [];
        var expectedBlocks = (spec.offsetA || 0) + spec.lengthA + (spec.lengthB ? spec.lengthB : 0);
        assert(unitBlocks.length === expectedBlocks, "G1 Node " + nodeId + ": length blocks mismatch");
      } else if (spec.type === "fractions") {
        var goldSlices = html.match(/#E5B93C/g) || [];
        assert(goldSlices.length === spec.shaded, "G1 Node " + nodeId + ": gold fraction parts mismatch");
      } else if (spec.type === "coins") {
        for (var c2 = 0; c2 < spec.coins.length; c2++) {
          assert(html.indexOf(spec.coins[c2] + "¢") !== -1, "G1 Node " + nodeId + ": missing coin SVG label");
        }
      } else if (spec.type === "clock") {
        assert(spec.hour >= 1 && spec.hour <= 12 && (spec.minutes === 0 || spec.minutes === 30), "G1 Node " + nodeId + ": invalid clock");
      }
    }

    var totalProblemsTested = 0;
    for (var i = 0; i < CURRICULUM_NODES.length; i++) {
      var node = CURRICULUM_NODES[i];
      assert(node.learnSteps && node.learnSteps.length >= 3, "G1 Node " + node.id + " needs >= 3 learnSteps");
      var checkCount = 0;
      for (var s = 0; s < node.learnSteps.length; s++) {
        var step = node.learnSteps[s];
        verifyVisualMatchesProblem(node.id, "learnStep[" + s + "]", step.narrative, step.equationHTML, step.equationHTML, undefined, step.visualSpec);
        if (step.checkQuestion) {
          checkCount++;
          assert(step.checkQuestion.choices && step.checkQuestion.choices.indexOf(step.checkQuestion.answer) !== -1,
            "G1 Node " + node.id + " checkQuestion answer missing");
        }
      }
      assert(checkCount >= 1, "G1 Node " + node.id + " needs >= 1 checkQuestion");
      for (var tier = 1; tier <= 3; tier++) {
        for (var k = 0; k < 30; k++) {
          var prob = node.generateProblem(tier);
          totalProblemsTested++;
          verifyVisualMatchesProblem(node.id, "tier=" + tier, prob.story, prob.equationHTML, prob.solvedEquationHTML, prob.answer, prob.visualSpec);
          assert(prob.choices && prob.choices.length === 4, "G1 Node " + node.id + " expected 4 choices");
          assert(prob.choices.indexOf(prob.answer) !== -1, "G1 Node " + node.id + " answer missing from choices");
        }
      }
    }

    App.init();
    App.openNodeInStudio(1);
    App.setStudioMode("trial", false);
    var p1 = App.getProgress(1);
    assert(p1.shields === 0 && p1.tier === 1 && App.visualHintVisible === true, "G1 initial state mismatch");
    var wrongChoice = App.currentProblem.choices[0] === App.currentProblem.answer ? App.currentProblem.choices[1] : App.currentProblem.choices[0];
    App.handleAnswerAttempt(wrongChoice, null);
    assert(App.missedCurrentProblem === true, "G1 missedCurrentProblem should be true");
    App.handleAnswerAttempt(App.currentProblem.answer, null);
    assert(p1.shields === 0, "G1 guessing right after miss must not award shield");

    for (var hit = 1; hit <= 4; hit++) {
      App.loadNextProblem(false);
      App.handleAnswerAttempt(App.currentProblem.answer, null);
      assert(p1.shields === hit, "G1 hit " + hit + " shields mismatch");
    }
    App.loadNextProblem(false);
    assert(p1.tier === 3 && App.visualHintVisible === false, "G1 Strike 5 must enter Tier 3 Mental Math");

    var w1 = App.currentProblem.choices[0] === App.currentProblem.answer ? App.currentProblem.choices[1] : App.currentProblem.choices[0];
    App.handleAnswerAttempt(w1, null);
    assert(App.visualHintVisible === true, "G1 miss at Tier 3 must show visual");
    App.loadNextProblem(true);
    var w2 = App.currentProblem.choices[0] === App.currentProblem.answer ? App.currentProblem.choices[1] : App.currentProblem.choices[0];
    App.handleAnswerAttempt(w2, null);
    assert(p1.tier === 2, "G1 2 consecutive misses must step down to Tier 2");

    var stations = ["bonds10", "maketen", "shapeslen", "barmodel", "placevalue", "groupsfrac", "clockcoins"];
    for (var stIdx = 0; stIdx < stations.length; stIdx++) {
      App.tabletopTool = stations[stIdx];
      App.setTabletopMode("explore");
      assert(document.getElementById("tabletop-workspace").innerHTML.indexOf("TEACHING PROMPT:") !== -1, "G1 station explore failed");
      App.setTabletopMode("quiz");
      assert(document.getElementById("tabletop-workspace").innerHTML.indexOf("PRACTICE PROMPT:") !== -1, "G1 station quiz failed");
    }

    var voiceKeys = [
      "praise_0","praise_1","praise_2","praise_3","praise_4","praise_5",
      "encourage_0","encourage_1","encourage_2","encourage_3",
      "victory_standard","victory_boss"
    ];
    for (var k1 in MASTER_ALDOUS_VOICES.actionPraise) {
      var arr = MASTER_ALDOUS_VOICES.actionPraise[k1];
      for (var j = 0; j < arr.length; j++) voiceKeys.push(arr[j].key);
    }
    for (var j2 = 0; j2 < MASTER_ALDOUS_VOICES.mentalMathIntro.length; j2++) voiceKeys.push(MASTER_ALDOUS_VOICES.mentalMathIntro[j2].key);
    for (var j3 = 0; j3 < MASTER_ALDOUS_VOICES.mentalMathWin.length; j3++) voiceKeys.push(MASTER_ALDOUS_VOICES.mentalMathWin[j3].key);
    for (var k2 in MASTER_ALDOUS_VOICES.topicCoach) voiceKeys.push(MASTER_ALDOUS_VOICES.topicCoach[k2].key);

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
    proc = subprocess.run([JSC_BIN, "-e", js_test_code], cwd=BASE_DIR, capture_output=True, text=True, check=True)
    lines = [line.strip() for line in proc.stdout.splitlines() if line.strip().startswith("{")]
    return json.loads(lines[-1])


def run_kindergarten_jsc_audit():
    js_test_code = MOCK_DOM_PRELUDE + r"""
    load("shared/pwa-register.js");
    load("shared/audio-engine.js");
    load("shared/cpa-primitives.js");
    load("grades/k/curriculum.js");
    load("grades/k/visuals.js");
    load("grades/k/garden3d.js");
    load("grades/k/app.js");

    var errors = [];
    function assert(cond, msg) {
      if (!cond) errors.push(msg);
    }

    function verifyKVisual(nodeId, label, spec, answer) {
      var container = { innerHTML: "" };
      GardenVisuals.renderMathVisual(container, spec);
      var html = container.innerHTML;
      assert(html && html.length > 20, "K Node " + nodeId + " (" + label + "): empty visual HTML");

      if (spec.type === "five-frame") {
        var f5 = html.match(/data-frame="5"/g) || [];
        assert(f5.length === 5, "K Node " + nodeId + ": five-frame must render 5 cells, got " + f5.length);
      } else if (spec.type === "ten-frame") {
        var f10 = html.match(/data-frame="10"/g) || [];
        assert(f10.length === 10, "K Node " + nodeId + ": ten-frame must render 10 cells, got " + f10.length);
        if (spec.crossOut) {
          var cx = html.match(/data-crossout="1"/g) || [];
          assert(cx.length === spec.crossOut, "K Node " + nodeId + ": cross-outs (" + cx.length + ") != " + spec.crossOut);
        }
      } else if (spec.type === "double-ten-frame") {
        var df10 = html.match(/data-frame="10"/g) || [];
        assert(df10.length === 20, "K Node " + nodeId + ": double-ten-frame must render 20 cells, got " + df10.length);
      } else if (spec.type === "number-bond") {
        assert(spec.partA + spec.partB === spec.whole, "K Node " + nodeId + ": number-bond math mismatch");
        if (spec.missing === "whole" && answer !== undefined) assert(answer === spec.whole, "K Node " + nodeId + ": bond answer != whole");
        if (spec.missing === "partB" && answer !== undefined) assert(answer === spec.partB, "K Node " + nodeId + ": bond answer != partB");
      } else if (spec.type === "tens-ones-100") {
        var baskets = html.match(/class="k-ten-basket"/g) || [];
        assert(baskets.length === spec.tens, "K Node " + nodeId + ": ten-baskets (" + baskets.length + ") != " + spec.tens);
        var loose = html.match(/class="k-loose-one"/g) || [];
        assert(loose.length === spec.ones, "K Node " + nodeId + ": loose ones (" + loose.length + ") != " + spec.ones);
      } else if (spec.type === "coins") {
        for (var i = 0; i < spec.coins.length; i++) {
          assert(html.indexOf(spec.coins[i] + "¢") !== -1, "K Node " + nodeId + ": missing coin label " + spec.coins[i] + "¢");
        }
      } else if (spec.type === "clock-hour") {
        assert(spec.hour >= 1 && spec.hour <= 12, "K Node " + nodeId + ": invalid hour " + spec.hour);
      }
    }

    var totalTested = 0;
    for (var i = 0; i < GARDEN_NODES.length; i++) {
      var node = GARDEN_NODES[i];
      assert(node.learnSteps && node.learnSteps.length >= 3, "K Node " + node.id + " needs >= 3 learnSteps");
      var checks = 0;
      for (var s = 0; s < node.learnSteps.length; s++) {
        var step = node.learnSteps[s];
        verifyKVisual(node.id, "learnStep[" + s + "]", step.visualSpec, undefined);
        if (step.checkQuestion) {
          checks++;
          assert(step.checkQuestion.choices && step.checkQuestion.choices.indexOf(step.checkQuestion.answer) !== -1,
            "K Node " + node.id + " checkQuestion answer missing from choices");
        }
      }
      assert(checks >= 1, "K Node " + node.id + " must have >= 1 checkQuestion");

      for (var tier = 1; tier <= 3; tier++) {
        for (var k = 0; k < 30; k++) {
          var prob = node.generateProblem(tier);
          totalTested++;
          verifyKVisual(node.id, "tier=" + tier, prob.visualSpec, prob.answer);
          assert(prob.choices && prob.choices.length === 4, "K Node " + node.id + " tier " + tier + " needs 4 choices");
          assert(prob.choices.indexOf(prob.answer) !== -1, "K Node " + node.id + " tier " + tier + " answer missing from choices");
          var uniq = {};
          for (var c = 0; c < prob.choices.length; c++) uniq[String(prob.choices[c])] = true;
          assert(Object.keys(uniq).length === 4, "K Node " + node.id + " tier " + tier + " duplicate choices: " + JSON.stringify(prob.choices));
        }
      }
    }

    // Test K Adaptive State Machine
    App.init();
    App.openNodeInStudio(2);
    App.setStudioMode("trial");
    var pk = App.getProgress(2);
    assert(pk.acorns === 0 && pk.tier === 1, "K initial state mismatch");
    var wrongK = App.currentProblem.choices[0] === App.currentProblem.answer ? App.currentProblem.choices[1] : App.currentProblem.choices[0];
    App.handleAnswerAttempt(wrongK, null);
    assert(App.missedCurrentProblem === true, "K miss flag should be true");
    App.handleAnswerAttempt(App.currentProblem.answer, null);
    assert(pk.acorns === 0, "K guessing after miss must NOT earn acorn");

    for (var hit = 1; hit <= 3; hit++) {
      App.loadNextProblem(false);
      App.handleAnswerAttempt(App.currentProblem.answer, null);
      assert(pk.acorns === hit, "K hit " + hit + " acorn mismatch");
    }
    App.loadNextProblem(false);
    assert(pk.tier === 3, "K at 3 acorns must advance to Tier 3");

    var kw1 = App.currentProblem.choices[0] === App.currentProblem.answer ? App.currentProblem.choices[1] : App.currentProblem.choices[0];
    App.handleAnswerAttempt(kw1, null);
    App.loadNextProblem(true);
    var kw2 = App.currentProblem.choices[0] === App.currentProblem.answer ? App.currentProblem.choices[1] : App.currentProblem.choices[0];
    App.handleAnswerAttempt(kw2, null);
    assert(pk.tier === 2, "K 2 misses at Tier 3 must step down to Tier 2");

    // Test all 6 Garden Blocks Stations
    var kStations = ["frames", "bonds", "addsub", "shapespat", "balance", "timecoins"];
    for (var stIdx = 0; stIdx < kStations.length; stIdx++) {
      App.tabletopTool = kStations[stIdx];
      App.setTabletopMode("explore");
      assert(document.getElementById("tabletop-workspace").innerHTML.indexOf("TEACHING PROMPT:") !== -1, "K station explore failed");
      App.setTabletopMode("quiz");
      assert(document.getElementById("tabletop-workspace").innerHTML.indexOf("PRACTICE PROMPT:") !== -1, "K station quiz failed");
    }

    // Test Per-Walk Reset
    App.state.nodeProgress[1] = { acorns: 4, tier: 3, mastered: true, stars: 2 };
    App.state.nodeProgress[2] = { acorns: 3, tier: 3, mastered: false, stars: 1 };
    App.openNodeInStudio(2);
    App.resetCurrentLevel();
    assert(App.getProgress(2).acorns === 0 && App.getProgress(2).mastered === false, "K resetCurrentLevel failed");
    assert(App.getProgress(1).mastered === true && App.getProgress(1).stars === 2, "K resetCurrentLevel affected other walk");

    var mapPositions = [];
    for (var m = 0; m < GARDEN_NODES.length; m++) {
      mapPositions.push({ id: GARDEN_NODES[m].id, x: GARDEN_NODES[m].mapPos.x, y: GARDEN_NODES[m].mapPos.y });
    }

    print(JSON.stringify({
      ok: errors.length === 0,
      errors: errors,
      walksTested: GARDEN_NODES.length,
      problemsTested: totalTested,
      mapPositions: mapPositions
    }));
    """
    proc = subprocess.run([JSC_BIN, "-e", js_test_code], cwd=BASE_DIR, capture_output=True, text=True, check=True)
    lines = [line.strip() for line in proc.stdout.splitlines() if line.strip().startswith("{")]
    return json.loads(lines[-1])


def verify_audio_files(voice_keys):
    errors = []
    audio_dir = os.path.join(BASE_DIR, "grades", "g1", "audio")
    for key in set(voice_keys):
        wav_path = os.path.join(audio_dir, f"{key}.wav")
        if not os.path.exists(wav_path):
            errors.append(f"Missing audio file: grades/g1/audio/{key}.wav")
            continue
        try:
            with wave.open(wav_path, "rb") as wf:
                frames = wf.getnframes()
                rate = wf.getframerate()
                duration = frames / float(rate) if rate else 0
                if duration < 0.5:
                    errors.append(f"Audio file too short ({duration:.2f}s): grades/g1/audio/{key}.wav")
        except Exception as exc:
            errors.append(f"Invalid WAV file grades/g1/audio/{key}.wav: {exc}")
    return errors


def verify_ui_and_compliance(g1_positions, k_positions):
    errors = []
    emoji_re = re.compile(r"[\U0001F300-\U0001FAFF\u2600-\u27BF]")
    trademark_re = re.compile(
        r"\b(Dimensions Math|Singapore Math|Primary Mathematics|Math in Focus|Marshall Cavendish|Official Chapters|1A|1B|KA|KB)\b",
        re.IGNORECASE
    )

    files_to_scan = [
        "index.html", "hub/hub.css", "hub/hub-art.js", "hub/hub.js", "manifest.json", "sw.js",
        "shared/pwa-register.js", "shared/grades-registry.js", "shared/audio-engine.js", "shared/cpa-primitives.js",
        "grades/g1/index.html", "grades/g1/styles.css", "grades/g1/curriculum.js", "grades/g1/visuals.js", "grades/g1/app.js",
        "grades/k/index.html", "grades/k/styles.css", "grades/k/curriculum.js", "grades/k/visuals.js", "grades/k/garden3d.js", "grades/k/app.js",
    ]

    if not os.path.exists(os.path.join(BASE_DIR, "shared/vendor/three/three.min.js")):
        errors.append("Missing vendored Three.js library: shared/vendor/three/three.min.js")

    with open(os.path.join(BASE_DIR, "sw.js"), "r", encoding="utf-8") as swf:
        sw_text = swf.read()
    m_assets = re.search(r"const\s+CORE_SHELL_ASSETS\s*=\s*\[(.*?)\];", sw_text, re.DOTALL)
    if not m_assets:
        errors.append("sw.js missing CORE_SHELL_ASSETS list")
    else:
        for asset_path in re.findall(r'"([^"]+)"', m_assets.group(1)):
            if asset_path == "./":
                continue
            rel_asset = asset_path[2:] if asset_path.startswith("./") else asset_path
            if not os.path.exists(os.path.join(BASE_DIR, rel_asset)):
                errors.append(f"sw.js CORE_SHELL_ASSETS entry missing on disk: {asset_path}")

    for rel in files_to_scan + ["README.md"]:
        fpath = os.path.join(BASE_DIR, rel)
        if not os.path.exists(fpath):
            errors.append(f"Missing required file: {rel}")
            continue
        with open(fpath, "r", encoding="utf-8") as f:
            content = f.read()
        if rel.endswith((".js", ".css")):
            found = emoji_re.findall(content)
            if found:
                errors.append(f"Found forbidden emoji(s) in {rel}: {found}")
        tm = trademark_re.findall(content)
        if tm:
            errors.append(f"Found prohibited curriculum trademark term(s) in {rel}: {set(tm)}")

    for css_rel in ["hub/hub.css", "grades/g1/styles.css", "grades/k/styles.css"]:
        with open(os.path.join(BASE_DIR, css_rel), "r", encoding="utf-8") as f:
            css = f.read()
        if "100vh" not in css or "100dvh" not in css or "overflow: hidden" not in css:
            errors.append(f"{css_rel} missing 100vh/100dvh or overflow: hidden")
        if ":focus-visible" not in css:
            errors.append(f"{css_rel} missing :focus-visible")
        if "prefers-reduced-motion" not in css:
            errors.append(f"{css_rel} missing prefers-reduced-motion")

    for html_rel in ["index.html", "grades/g1/index.html", "grades/k/index.html"]:
        with open(os.path.join(BASE_DIR, html_rel), "r", encoding="utf-8") as f:
            html = f.read()
        if "<dialog" not in html:
            errors.append(f"{html_rel} missing native <dialog>")
        if "Content-Security-Policy" not in html:
            errors.append(f"{html_rel} missing Content-Security-Policy meta tag")
        if "fonts.googleapis.com" in html:
            errors.append(f"{html_rel} contains external font request")

    for label, positions in [("Grade 1", g1_positions), ("Kindergarten", k_positions)]:
        for i in range(len(positions)):
            for j in range(i + 1, len(positions)):
                p1, p2 = positions[i], positions[j]
                dist = math.hypot(p1["x"] - p2["x"], p1["y"] - p2["y"])
                if dist < 5.5:
                    errors.append(f"{label} map pins {p1['id']} and {p2['id']} overlap ({dist:.1f}% < 5.5%)")

    return errors


def run_hub_jsc_audit():
    js_test_code = MOCK_DOM_PRELUDE + r"""
    var domReadyCb = null;
    document.addEventListener = function(ev, cb) {
      if (ev === "DOMContentLoaded") domReadyCb = cb;
    };
    setTimeout = function(cb) { if (typeof cb === "function") cb(); };
    load("shared/pwa-register.js");
    load("shared/audio-engine.js");
    load("shared/grades-registry.js");
    load("hub/hub-art.js");
    load("hub/hub.js");
    localStorage.setItem("young_knights_quest_v2", JSON.stringify({ nodeProgress: { "1": { mastered: true, stars: 2 } } }));
    localStorage.setItem("four_seasons_garden_v1", JSON.stringify({ nodeProgress: { "1": { mastered: true, stars: 1 } } }));
    if (domReadyCb) domReadyCb();

    var errors = [];
    var gridHTML = document.getElementById("hub-grade-grid").innerHTML;
    if (gridHTML.indexOf("grades/k/index.html") === -1) errors.push("Hub missing Kindergarten disc target");
    if (gridHTML.indexOf("grades/g1/index.html") === -1) errors.push("Hub missing Grade 1 disc target");
    if (gridHTML.indexOf("<strong>1</strong> of 17 Garden Walks Complete") === -1) errors.push("Hub failed to read Kindergarten progress");
    if (gridHTML.indexOf("<strong>1</strong> of 23 Missions Complete") === -1) errors.push("Hub failed to read Grade 1 progress");
    if (gridHTML.indexOf("PIP’S MEADOW") === -1 || gridHTML.indexOf("YOUNG KNIGHT’S QUEST") === -1) {
      errors.push("Hub missing bespoke SVG CD-ROM cover titles");
    }

    var wallHTML = document.getElementById("room-wall-art").innerHTML;
    if (wallHTML.indexOf("Great is our Lord, and") === -1 || wallHTML.indexOf("Psalm 147:5 (ESV)") === -1) {
      errors.push("Study wall missing Psalm 147:5 (ESV) note card");
    }
    var hTransform = document.getElementById("clock-hand-hour").getAttribute("transform") || "";
    var mTransform = document.getElementById("clock-hand-minute").getAttribute("transform") || "";
    var sTransform = document.getElementById("clock-hand-second").getAttribute("transform") || "";
    if (hTransform.indexOf("rotate(") !== 0 || mTransform.indexOf("rotate(") !== 0 || sTransform.indexOf("rotate(") !== 0) {
      errors.push("Study wall clock hands failed to update from local time");
    }

    var crtEl = document.getElementById("crt-screen-body");
    window.HubLauncher.selectGrade("g1", true);
    if (crtEl.innerHTML.indexOf("The Young Knight") === -1) {
      errors.push("CRT preview failed to show selected Grade 1 disc");
    }

    var protoOk = window.HubLauncher.insertDiscById("g2");
    if (protoOk !== false || crtEl.innerHTML.indexOf("Prototype Edition") === -1) {
      errors.push("Prototype disc insertion should display prototype eject notice without navigating");
    }

    var bootK = window.HubLauncher.insertDiscById("k");
    if (!bootK || window.HubLauncher.getState().bootNavigatedHref !== "grades/k/index.html") {
      errors.push("Kindergarten disc insertion failed to navigate to grades/k/index.html");
    }

    var bootG1 = window.HubLauncher.insertDiscById("g1");
    if (!bootG1 || window.HubLauncher.getState().bootNavigatedHref !== "grades/g1/index.html") {
      errors.push("Grade 1 disc insertion failed to navigate to grades/g1/index.html");
    }

    print(JSON.stringify({ ok: errors.length === 0, errors: errors, gradesListed: GRADE_CATALOG.length }));
    """
    proc = subprocess.run([JSC_BIN, "-e", js_test_code], cwd=BASE_DIR, capture_output=True, text=True, check=True)
    lines = [line.strip() for line in proc.stdout.splitlines() if line.strip().startswith("{")]
    return json.loads(lines[-1])


def main():
    print("=" * 72)
    print("RUNNING MULTI-GRADE QA SUITE: HEARTH & WONDER MATH")
    print("=" * 72)

    hub_res = run_hub_jsc_audit()
    g1_res = run_grade1_jsc_audit()
    k_res = run_kindergarten_jsc_audit()
    audio_errors = verify_audio_files(g1_res["voiceKeys"])
    ui_errors = verify_ui_and_compliance(g1_res["mapPositions"], k_res["mapPositions"])

    all_errors = hub_res["errors"] + g1_res["errors"] + k_res["errors"] + audio_errors + ui_errors

    print(f"[✓] Home Hub Audited:         {hub_res['gradesListed']} grade entries, live localStorage progress badges")

    print(f"[✓] Grade 1 Audited:          {g1_res['missionsTested']} / 23 missions, {g1_res['problemsTested']} Monte Carlo problems")
    print(f"[✓] Kindergarten Audited:     {k_res['walksTested']} / 17 walks, {k_res['problemsTested']} Monte Carlo problems")
    print(f"[✓] Grade 1 Voice Bank:       {len(set(g1_res['voiceKeys']))} / 57 WAV clips verified")
    print(f"[✓] Hub, Security & Maps:     100vh lock, CSP headers, 0 emojis, 0 trademarks, non-overlapping pins")
    print("-" * 72)

    if all_errors:
        print(f"FAILED WITH {len(all_errors)} ERROR(S):")
        for err in all_errors:
            print("  [✗]", err)
        sys.exit(1)
    else:
        print("ALL MULTI-GRADE AUTOMATED TESTS PASSED (0 ERRORS)!")
        sys.exit(0)


if __name__ == "__main__":
    main()

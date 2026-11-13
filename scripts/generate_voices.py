#!/usr/bin/env python3
"""
Master Aldous Voice Generator (Safe ONNX Static Audio Workflow)
---------------------------------------------------------------
SECURITY POLICY:
1. Always ask the user for explicit approval before running this script or
   downloading open-source packages/weights.
2. Uses ONLY the pure mathematical `.onnx` format (`kokoro-v1.0.int8.onnx`)
   and JSON/NPZ voice embeddings — NEVER PyTorch `.pt`/`.pth` pickle files.
3. After generating the static `.wav` files into `../audio/`, delete the
   temporary virtual environment and `.onnx` model files so only plain `.wav`
   audio files remain in the project.
"""

import os
import subprocess
import soundfile as sf
from kokoro_onnx import Kokoro

MODEL_URL = "https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/kokoro-v1.0.int8.onnx"
VOICES_URL = "https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/voices-v1.0.bin"

VOICE_NAME = "bm_george"  # Wise British male mentor voice (or "bm_fable")
SPEED = 0.92

LINES = {
    # Core general lines
    "praise_0": "Direct hit, young Squire! Your reckoning is true!",
    "praise_1": "Bravo! Another foe falls before your sharp mind!",
    "praise_2": "Well struck! You saw how the parts and the whole fit together.",
    "praise_3": "Steadfast and brave! The realm is safer for your wisdom.",
    "praise_4": "Splendid! One step closer to victory!",
    "praise_5": "True as an arrow! Nothing escapes your eye.",
    "encourage_0": "Hold fast, young Squire! Raise your shield and look at the picture.",
    "encourage_1": "Steady now! Count the parts in the frame and strike again.",
    "encourage_2": "Even the bravest knights look twice. See how the parts join here.",
    "encourage_3": "Take heart, my boy! Look closely at the diagram below.",
    "victory_standard": "Well done, young Squire! You have won the mission. Let us march onward along the King's Highway!",
    "victory_boss": "Glorious victory, young Squire! The Boss has fallen before your wisdom and courage!",

    # Activity-Matched: Bandits & Raiders
    "bandits_0": "Thwack! Right in the bandit's shield! That rascal is running for the hills!",
    "bandits_1": "Bullseye, young Squire! Another outlaw tumbles into the bushes!",
    "bandits_2": "Ha! Those raiders didn't expect a boy who knows his numbers like that!",
    "bandits_3": "Swift as an arrow! You sent that guard packing!",

    # Activity-Matched: Cage Locks & Treasure Vaults
    "locks_0": "Clang! That heavy iron lock just snapped right open!",
    "locks_1": "Crack! Another chain shatters! The prisoners are cheering for you!",
    "locks_2": "Click! Your number bond was the exact key to pop that padlock!",
    "locks_3": "Down goes the iron bar! Just a few more locks to set everyone free!",

    # Activity-Matched: Fort Building, Anvil Forging, Ladders & Beacons
    "fort_0": "Timber! Another giant oak beam rises into place on the castle wall!",
    "fort_1": "Clang-clang on the anvil! That royal armor is gleaming like gold!",
    "fort_2": "Up goes the siege ladder! We are climbing higher toward the battlements!",
    "fort_3": "Huzzah! The watchtower beacon blazes bright across the mountains!",

    # Activity-Matched: Sinking Pirate Skiffs
    "ships_0": "Splash! Direct hit from the catapult! That pirate skiff is sinking fast!",
    "ships_1": "Boom! Right through the pirate sails! The river is ours, my boy!",
    "ships_2": "Aha! Those river pirates are swimming for shore after that shot!",

    # Boss Battles: Forest Giant, River Serpent, Iron Golem, Red Dragon
    "boss_giant_0": "Crash! You cracked a massive plate right off the Forest Giant's shield!",
    "boss_giant_1": "The Forest Giant is wobbling! His club just shook the whole woods!",
    "boss_serpent_0": "Splash! Your strike pierced the Sea-Serpent's scales! Watch out for his tail!",
    "boss_serpent_1": "The River Serpent is diving in retreat! Strike him again, young Squire!",
    "boss_golem_0": "Sparks fly! Your math hammer just cracked the Iron Golem's chestplate!",
    "boss_golem_1": "Clang! The Iron Golem's gears are grinding to a halt!",
    "boss_dragon_0": "Roar! Your arrow pierced right through the Red Dragon's fiery scales!",
    "boss_dragon_1": "You blocked the Dragon's fire breath with pure wisdom, young Knight!",
    "boss_dragon_2": "The Red Dragon is staggering! Ready your sword for the next strike!",

    # Mental Math (Tier 3) Intros & Triumphs
    "mental_intro_0": "Final strike—Mental Math! Picture the numbers in your head without the drawing!",
    "mental_intro_1": "A true Knight sees the numbers in his mind! Try this one in your head!",
    "mental_win_0": "By the King's crown—you solved that completely in your head! Masterful!",
    "mental_win_1": "Pure mental math! You didn't even need the picture for that strike!",

    # Topic-Specific Visual & Mental Math Coaching Lines
    "coach_bond": "Look at the Ten-Frame and Number Bond: a full top row is five! Put the parts together!",
    "coach_path": "Hold the bigger number in your head, then hop forward along the number path!",
    "coach_crossout": "Start with all the items in the frame, cross out the ones that left, and count what remains!",
    "coach_compare": "Up to the dotted line, both rows match! Count the extra blocks sticking out past the line!",
    "coach_teen": "The top frame is a full ten! Keep ten in your head and count on the loose ones below!",
    "coach_maketen": "Look at the empty spots in the top Ten-Frame! Fill the ten first, then add what is left!",
    "coach_subten": "Take the number straight out of the full ten first, then add the loose ones!",
    "coach_placevalue": "Count the tall towers of ten by tens first—ten, twenty, thirty—then add the loose ones!",
    "coach_regroup": "See how many ones are needed to complete the next ten, then add the rest!",
    "coach_barmodel": "Look at the whole bar on top and the known part below—subtract to find the missing part!",
    "coach_groups": "Count how many trays there are, and add the equal groups together!",
    "coach_shapes": "Touch each golden corner dot around the shield and count them carefully!",
    "coach_ordinals": "Start at the Castle Gate where First begins, and count along the line to the Crown!",
    "coach_length": "Count the yellow measuring blocks lined up from one end of the sword to the other!",
    "coach_fractions": "Check how many equal parts make the whole shield, and count the gold parts!",
    "coach_clock": "Look at the short blue hand for the hour, and the long red hand for the minutes!",
    "coach_coins": "Start with the biggest coins on the left—count by tens and fives first, then the pennies!"
}

def main():
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    audio_dir = os.path.join(base_dir, "audio")
    tmp_dir = os.path.join(base_dir, ".tmp_voice_build")
    os.makedirs(audio_dir, exist_ok=True)
    os.makedirs(tmp_dir, exist_ok=True)

    model_path = os.path.join(tmp_dir, "kokoro-v1.0.int8.onnx")
    voices_path = os.path.join(tmp_dir, "voices-v1.0.bin")

    if not os.path.exists(model_path):
        print(f"Downloading ONNX model to {model_path} using macOS Keychain SSL...")
        subprocess.run(["/usr/bin/curl", "-fsSL", "-o", model_path, MODEL_URL], check=True)

    if not os.path.exists(voices_path):
        print(f"Downloading voice embeddings to {voices_path} using macOS Keychain SSL...")
        subprocess.run(["/usr/bin/curl", "-fsSL", "-o", voices_path, VOICES_URL], check=True)

    kokoro = Kokoro(model_path, voices_path)

    for key, text in LINES.items():
        out_path = os.path.join(audio_dir, f"{key}.wav")
        if os.path.exists(out_path):
            print(f"Skipping existing {out_path}")
            continue
        print(f"Generating {out_path}: {text}")
        samples, sample_rate = kokoro.create(text, voice=VOICE_NAME, speed=SPEED, lang="en-gb")
        sf.write(out_path, samples, sample_rate)

    print("All Master Aldous voice clips generated successfully!")

if __name__ == "__main__":
    main()

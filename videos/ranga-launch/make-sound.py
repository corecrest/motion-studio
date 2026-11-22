"""Generate the original 25-second soundtrack with Python and FFmpeg."""
from array import array
from math import exp, pi, sin
from pathlib import Path
from subprocess import run

RATE = 48_000
DURATION = 25
left = array("f", [0.0]) * (DURATION * RATE)
right = array("f", [0.0]) * (DURATION * RATE)


def voice(start, length, hz, gain, attack, decay, pan=0, overtone=0.12):
    offset = round(start * RATE)
    for n in range(min(round(length * RATE), len(left) - offset)):
        t = n / RATE
        fade = min(1.0, t / attack, (length - t) / 0.07)
        envelope = max(0, fade) * exp(-t / decay)
        phase = 2 * pi * hz * t
        sample = gain * envelope * (sin(phase) + overtone * sin(2 * phase))
        left[offset + n] += sample * (1 - pan)
        right[offset + n] += sample * (1 + pan)


# Restrained four-chord bed with a short two-note signature for the brand reveal.
for start, notes in [
    (0.36, (110, 164.81, 261.63)),
    (3.35, (87.31, 130.81, 220)),
    (7.42, (98, 146.83, 246.94)),
    (12.86, (82.41, 123.47, 196)),
    (20.91, (110, 164.81, 261.63)),
]:
    for index, note in enumerate(notes):
        voice(start + 0.05 * index, 4.8, note, 0.042 - 0.009 * index, 0.46, 2.5, (index - 1) * 0.23)

for start, note in [(0.42, 220), (1.06, 261.63), (3.40, 196), (10.64, 246.94), (12.86, 196), (17.40, 220), (21.70, 329.63), (22.08, 440)]:
    voice(start, 1.1, note, 0.09, 0.025, 0.22)
for index, start in enumerate((5.38, 10.45, 15.48, 19.27)):
    voice(start, 0.105, 670 if index % 2 else 540, 0.039, 0.008, 0.027, 0.06)

interleaved = array("f")
for index, (l_sample, r_sample) in enumerate(zip(left, right)):
    end_fade = min(1.0, (len(left) - index) / (RATE * 0.75))
    interleaved.extend((2.7 * l_sample * end_fade, 2.7 * r_sample * end_fade))
output = Path(__file__).resolve().parent / "assets" / "ranga-sound.m4a"
run(
    ["ffmpeg", "-v", "error", "-y", "-f", "f32le", "-ar", str(RATE), "-ac", "2",
     "-i", "-", "-c:a", "aac", "-b:a", "160k", str(output)],
    input=interleaved.tobytes(), check=True,
)

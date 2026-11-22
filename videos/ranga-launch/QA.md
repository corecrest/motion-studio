# Render and quality assurance

## Reproduce

From the Motion Studio repository root, install the repository dependencies and run:

```bash
bash scripts/render.sh ranga-launch
```

The composition is a 25-second, 1080 × 1920 HTML project with one paused, seekable GSAP timeline. Edit the markup in `index.html`, the design in `style.css`, and the timing and demonstration data in `motion.js`. GSAP 3.14.2 is included for offline rendering and retains its upstream license notice. Regenerate the original audio with `python3 videos/ranga-launch/make-sound.py` and FFmpeg.

## Asset provenance

- Wordmark extracted from the settled end frame of the original Ranga wordmark splash. The mark itself was left intact.
- Icon from the existing forest-green ribbon Ranga artwork. Transparent margins were trimmed and the image was resized proportionally.
- Screen layouts reference existing Ranga material. The app shown is an editable reconstruction with fictional data, identified on screen as an illustrative interface. There are no third-party bank or provider marks.
- The 5,000 RWF example stops at the USSD handoff. The later receipt is a separate recorded expense. The film makes no transfer confirmation, deposit-taking, provider partnership, store availability, or financial-insights claim.
- The stereo soundtrack is original additive synthesis. There are no external samples.

## Validation

- HyperFrames 0.9.81. First pass at 540 × 960 and 15 fps, then final capture at 1080 × 1920 and 30 fps using software rendering.
- Visually reviewed representative frames for text fit, contrast, account and payment detail legibility, and brand artwork. Checked continuity across the full runtime at half-second intervals.
- The HyperFrames linter reports zero errors and one advisory about the single top-level film clip. Its child beats are editable by timestamp in `motion.js`.
- FFprobe and FFmpeg checks cover stream metadata, all 750 video frames, and the full stereo audio track.

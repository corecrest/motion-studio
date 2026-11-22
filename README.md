# Motion Studio — Cloud Video Production

A private, cloud-ready studio for editing, previewing and exporting **code-generated animations**. Powered by [HyperFrames](https://github.com/heygen-com/hyperframes), GSAP and optional Three.js.

## Quick start

1. Open **[this repo's Codespaces](https://github.com/codespaces/new?hide_repo_select=true&repo=1467691126)** and create a Codespace on `main`.
2. Once setup completes, run:
   ```bash
   npm run doctor
   npm run preview
   ```
3. Open the forwarded port **3002** to preview `videos/brand-intro`.
4. To create a separate animation:
   ```bash
   bash scripts/new-video.sh my-first-promo
   ```
   Edit `videos/my-first-promo/index.html` using Codex or Claude Code and your reference assets.
5. Render locally inside the Codespace:
   ```bash
   bash scripts/render.sh my-first-promo
   ```
6. Commit/push the new composition. Open **[Actions](https://github.com/corecrest/motion-studio/actions/workflows/render-video.yml)**, choose **Run workflow**, provide `my-first-promo`, then download the finished MP4 under **Artifacts**.

## Contents

- `.devcontainer/` — cloud workstation configuration (Node 22, FFmpeg, browser).
- `.github/workflows/render-video.yml` — manual on-demand MP4 renderer.
- `videos/brand-intro/index.html` — eight-second **placeholder** brand animation, not Ranga's official assets.
- `scripts/new-video.sh` — create a copy of the starter project.
- `scripts/render.sh` — lint and export a composition.
- `prompts/` — agent briefs for Ranga, Folibly and an architectural photo-tour.
- `AGENTS.md` and `CLAUDE.md` — rules for Claude Code / Codex.
- [Cloud setup guide](docs/CLOUD_SETUP.md) — complete instructions.

## Limitations and safeguards

- This repository is a **code-driven video studio**, not a prompt-only generative video website. Your coding agent must create the composition before it can render.
- The HyperFrames, npm and browser dependencies install when you start a Codespace; the first actual render has **not yet been verified**.
- No AI accounts, paid rendering infrastructure or API keys are provisioned automatically.
- A manual Actions render uses GitHub-hosted compute; GitHub plan quotas, billing and usage limits apply.
- The demo requests GSAP from a public CDN. Use approved licensed assets and never commit credentials or sensitive footage.
- `dist/` is excluded from Git; exported Actions artifacts are retained for seven days.
- Review dependency licenses for commercial workflows.

## Further reading

- [HyperFrames](https://hyperframes.heygen.com/introduction)
- [GitHub Codespaces](https://docs.github.com/en/codespaces/quickstart)
- [GitHub Actions](https://docs.github.com/en/actions)

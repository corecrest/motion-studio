# Motion Studio cloud setup

## Architecture
Codespaces is the cloud workstation (browser VS Code and forwarded preview). GitHub Actions is the on-demand MP4 render worker. This is **not** an always-on public prompt-to-video website. Both services may incur GitHub usage costs.

## Start from this repository
1. Open [corecrest/motion-studio](https://github.com/corecrest/motion-studio).
2. Choose **Code → Codespaces → Create codespace on main**.
3. The devcontainer setup installs Node.js 22, FFmpeg, npm dependencies and the HyperFrames browser.
4. In the Codespace terminal:
   ```bash
   npm run doctor
   npm run preview
   ```
5. Open forwarded port **3002** to see the sample composition.
6. To make a new project:
   ```bash
   bash scripts/new-video.sh my-first-promo
   ```
7. Edit `videos/my-first-promo/index.html` (or instruct Codex / Claude Code to write it), then run:
   ```bash
   bash scripts/render.sh my-first-promo
   ```
8. Commit and push changed files.
9. Open **Actions → Render video to MP4 → Run workflow**. Enter `my-first-promo` and dispatch.
10. Once the run succeeds, open the workflow run and download the video ZIP from **Artifacts**. The default retention is 7 days.

## Prompt-driven creation
GitHub Actions does **not** turn a natural-language prompt directly into video. An agent must write composition code first, or a dedicated hosted AI-generation backend must be added. The prompt templates in `prompts/` are designed for coding agents.

## From Android
GitHub Codespaces can run in a mobile browser, though the browser IDE works better with desktop mode and a keyboard. Use the Actions tab to trigger renders without leaving Codespaces running.

## Costs, privacy and maintenance
- GitHub Codespaces and Actions usage quotas depend on plan and billing.
- Generated `dist/*.mp4` files are ignored by Git. Download and store important outputs.
- The repo is private. Do not make private Codespaces ports public for confidential work.
- The sample loads GSAP from jsDelivr and therefore requires network access.
- Codex, Claude Code or other coding-agent sign-in and billing are separate.
- For reproducible builds, generate and commit `package-lock.json` from a successful `npm install`, and pin the resolved HyperFrames version instead of `latest`.
- This project does not provide photorealistic image-to-video generation; that requires a separate service or model.

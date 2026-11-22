#!/usr/bin/env bash
set -euo pipefail

# Chrome Headless Shell requires these shared Linux libraries on Debian Bookworm.
# Audio, voice and Docker integrations are optional for normal MP4 rendering.
sudo apt-get update -qq
sudo DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
  ffmpeg \
  libnss3 libnspr4 libatk1.0-0 libatk-bridge2.0-0 libcups2 libdrm2 \
  libxkbcommon0 libatspi2.0-0 libxcomposite1 libxdamage1 libxfixes3 \
  libxrandr2 libgbm1 libpango-1.0-0 libcairo2 libasound2 \
  libx11-6 libxcb1 libx11-xcb1 libxext6 libxrender1 \
  libglib2.0-0 libdbus-1-3 fonts-liberation

npm install --no-audit --no-fund
npx hyperframes browser ensure
npx hyperframes skills update || echo 'Optional skills update failed; retry later.'

# Doctor can report optional missing integrations (Docker, AI audio) as failures.
# Display the report, but do not fail Codespaces creation on optional checks.
npx hyperframes doctor || echo 'Review the diagnostic output: optional services may remain unavailable.'

#!/usr/bin/env bash
set -euo pipefail
sudo apt-get update -qq
sudo DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends ffmpeg
npm install --no-audit --no-fund
npx hyperframes browser ensure
npx hyperframes skills update || echo 'Optional skills update failed; retry later.'
npx hyperframes doctor

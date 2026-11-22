#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
NAME="${1:-brand-intro}"
if [[ ! "$NAME" =~ ^[a-z0-9][a-z0-9_-]{0,49}$ ]]; then
  echo 'Invalid name: use lowercase letters, numbers, - or _ only.' >&2; exit 2
fi
DIR="$ROOT/videos/$NAME"
if [[ ! -f "$DIR/index.html" ]]; then
  echo "Not found: $DIR/index.html" >&2; exit 2
fi
mkdir -p "$ROOT/dist"
cd "$ROOT"
npx --no-install hyperframes lint "$DIR"
npx --no-install hyperframes render "$DIR" --format mp4 -o "$ROOT/dist/$NAME.mp4"
ffprobe -v error -show_entries format=duration,size -of default=noprint_wrappers=1 "$ROOT/dist/$NAME.mp4"
echo "Ready: dist/$NAME.mp4"

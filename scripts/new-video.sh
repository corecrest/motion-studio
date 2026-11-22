#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
NAME="${1:-}"
if [[ ! "$NAME" =~ ^[a-z0-9][a-z0-9_-]{0,49}$ ]]; then
  echo 'Usage: bash scripts/new-video.sh project-name (lowercase letters, digits, - or _)' >&2; exit 2
fi
TARGET="$ROOT/videos/$NAME"
if [[ -e "$TARGET" ]]; then echo 'Folder exists; refusing overwrite' >&2; exit 2; fi
mkdir -p "$TARGET"
cp "$ROOT/videos/brand-intro/index.html" "$TARGET/index.html"
echo "Created videos/$NAME/index.html. Edit it, then preview/render."

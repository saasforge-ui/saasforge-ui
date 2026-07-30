#!/usr/bin/env bash
# Copies the Pro component demo-preview sources from a sibling checkout of the
# private saasforge-ui-pro repo into this repo's (gitignored)
# src/components/premium-preview/ directory, so local `npm run dev` can render
# live Pro previews without that source ever being committed here.
#
# Usage: ./scripts/sync-premium-preview.sh [path-to-saasforge-ui-pro]
# Defaults to ../saasforge-ui-pro relative to this repo.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
PRO_REPO="${1:-$REPO_ROOT/../saasforge-ui-pro}"
SOURCE_DIR="$PRO_REPO/demo-previews"
DEST_DIR="$REPO_ROOT/src/components/premium-preview"

if [ ! -d "$SOURCE_DIR" ]; then
  echo "Error: couldn't find $SOURCE_DIR" >&2
  echo "Clone saasforge-ui-pro as a sibling directory, or pass its path as an argument." >&2
  exit 1
fi

mkdir -p "$DEST_DIR"
cp "$SOURCE_DIR"/*.tsx "$DEST_DIR/"
echo "Synced $(ls "$SOURCE_DIR"/*.tsx | wc -l) Pro preview components into $DEST_DIR"

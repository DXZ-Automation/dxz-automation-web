#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$REPO_ROOT"

CONFIG="${VISUAL_CONFIG:-visual.config.json}"
if [ ! -f "$CONFIG" ]; then
  echo "visual-diff: $CONFIG not found in $REPO_ROOT" >&2
  exit 1
fi

PORT=$(CONFIG_PATH="$CONFIG" node -e "console.log(new URL(JSON.parse(require('fs').readFileSync(process.env.CONFIG_PATH,'utf8')).baseURL).port)")
DEV_COMMAND=$(CONFIG_PATH="$CONFIG" node -e "console.log(JSON.parse(require('fs').readFileSync(process.env.CONFIG_PATH,'utf8')).devCommand)")
READY_TIMEOUT_MS=$(CONFIG_PATH="$CONFIG" node -e "console.log(JSON.parse(require('fs').readFileSync(process.env.CONFIG_PATH,'utf8')).readyTimeoutMs || 30000)")

SERVER_STARTED_BY_US=0
if ! curl -sf "http://localhost:$PORT" >/dev/null 2>&1; then
  echo "visual-diff: starting dev server ($DEV_COMMAND) on port $PORT..."
  eval "$DEV_COMMAND" >/tmp/visual-diff-devserver.log 2>&1 &
  DEV_PID=$!
  SERVER_STARTED_BY_US=1
  trap 'if [ "$SERVER_STARTED_BY_US" = "1" ]; then kill $DEV_PID 2>/dev/null || true; fi' EXIT

  ELAPSED=0
  until curl -sf "http://localhost:$PORT" >/dev/null 2>&1; do
    sleep 1
    ELAPSED=$((ELAPSED + 1000))
    if [ "$ELAPSED" -ge "$READY_TIMEOUT_MS" ]; then
      echo "visual-diff: dev server did not become ready within ${READY_TIMEOUT_MS}ms" >&2
      cat /tmp/visual-diff-devserver.log >&2
      exit 1
    fi
  done
else
  echo "visual-diff: dev server already running on port $PORT, reusing it"
fi

rm -rf visual/diff/current
echo "visual-diff: capturing current screenshots..."
node "$SCRIPT_DIR/lib/capture.mjs" --mode=diff --config="$CONFIG" --out=visual/diff/current

echo "visual-diff: comparing against baseline..."
node "$SCRIPT_DIR/lib/diff.mjs" --baseline=visual/baseline --current=visual/diff/current --out=visual/diff --config="$CONFIG"

#!/bin/sh
set -eu

cd "$(dirname "$0")"

if command -v bun >/dev/null 2>&1; then
  bun install --frozen-lockfile
  exec bun run dev -- --host 0.0.0.0
fi

if command -v npx >/dev/null 2>&1; then
  npx --yes bun@1.2.1 install --frozen-lockfile
  exec npx --yes bun@1.2.1 run dev -- --host 0.0.0.0
fi

echo "Node.js with npm/npx or Bun is required to run this project." >&2
exit 1

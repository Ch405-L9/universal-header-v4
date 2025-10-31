#!/usr/bin/env bash
set -Eeuo pipefail

ROOT="/home/t0n34781/Chat Analysis"
cd "$ROOT"

if [[ ! -d .venv ]]; then
  bash scripts/setup.sh
fi

. .venv/bin/activate
python -m src.main



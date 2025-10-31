#!/usr/bin/env bash
set -Eeuo pipefail
. .venv/bin/activate
python scripts/precheck.py
python -m src.main "$@"
echo "Run complete. See outputs/."

#!/usr/bin/env bash
set -Eeuo pipefail
python3 -m venv .venv
. .venv/bin/activate
pip install -r requirements.txt
npm install
python -m playwright install --with-deps
echo "Setup complete."

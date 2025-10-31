
#!/usr/bin/env bash

set -Eeuo pipefail

cd "$(dirname "$0")/.."
echo "[clean] pruning caches and temp files (safe list)"

find . -type d -name "pycache" -prune -exec rm -rf {} + 2>/dev/null || true

find . -type f -name "*.pyc" -delete 2>/dev/null || true

find . -type f -name ".DS_Store" -delete 2>/dev/null || true

find outputs -maxdepth 1 -type f -name ".urls.tmp" -delete 2>/dev/null || true
# do not delete outputs/contacts
rm -rf outputs/enriched 2>/dev/null || true

rm -rf outputs/lighthouse 2>/dev/null || true

rm -rf outputs/csv 2>/dev/null || true

rm -f  outputs/urls.txt outputs/BUILD_REPORT.txt outputs/cwv_summary.* outputs/shn_stamp.json 2>/dev/null || true
echo "[clean] done"


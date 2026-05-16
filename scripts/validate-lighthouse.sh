#!/usr/bin/env bash
# Usage: ./scripts/validate-lighthouse.sh [--url=URL] [--min-perf=N] [--min-seo=N] [--min-a11y=N] [--min-bp=N]
# Defaults: url=https://badgrtech.com, min-perf=90, min-seo=90, min-a11y=96, min-bp=92

set -euo pipefail

URL="https://badgrtech.com"
MIN_PERF=90
MIN_SEO=90
MIN_A11Y=96
MIN_BP=92
DEVICE="desktop"

for arg in "$@"; do
  case $arg in
    --url=*)       URL="${arg#*=}"      ;;
    --min-perf=*)  MIN_PERF="${arg#*=}" ;;
    --min-seo=*)   MIN_SEO="${arg#*=}"  ;;
    --min-a11y=*)  MIN_A11Y="${arg#*=}" ;;
    --min-bp=*)    MIN_BP="${arg#*=}"   ;;
    --mobile)      DEVICE="mobile"      ;;
    --desktop)     DEVICE="desktop"     ;;
  esac
done

echo "Running Lighthouse: $URL ($DEVICE)"
echo "Thresholds: perf>=$MIN_PERF  seo>=$MIN_SEO  a11y>=$MIN_A11Y  bp>=$MIN_BP"
echo ""

OUTFILE=$(mktemp /tmp/lighthouse-XXXXXX.json)

if [[ "$DEVICE" == "mobile" ]]; then
  npx lighthouse "$URL" \
    --output=json \
    --output-path="$OUTFILE" \
    --quiet \
    --chrome-flags="--headless --no-sandbox"
else
  npx lighthouse "$URL" \
    --output=json \
    --output-path="$OUTFILE" \
    --preset=desktop \
    --quiet \
    --chrome-flags="--headless --no-sandbox"
fi

python3 - <<EOF
import json, sys

with open("$OUTFILE") as f:
    data = json.load(f)

cats = data.get("categories", {})

perf = round(cats.get("performance", {}).get("score", 0) * 100)
a11y = round(cats.get("accessibility", {}).get("score", 0) * 100)
bp   = round(cats.get("best-practices", {}).get("score", 0) * 100)
seo  = round(cats.get("seo", {}).get("score", 0) * 100)

audits = data.get("audits", {})
lcp = audits.get("largest-contentful-paint", {}).get("displayValue", "N/A")
cls = audits.get("cumulative-layout-shift", {}).get("displayValue", "N/A")
fcp = audits.get("first-contentful-paint", {}).get("displayValue", "N/A")
tbt = audits.get("total-blocking-time", {}).get("displayValue", "N/A")

print("=" * 50)
print(f"  Performance:    {perf:3d} / 100")
print(f"  Accessibility:  {a11y:3d} / 100")
print(f"  Best Practices: {bp:3d} / 100")
print(f"  SEO:            {seo:3d} / 100")
print("=" * 50)
print(f"  LCP: {lcp}  FCP: {fcp}  CLS: {cls}  TBT: {tbt}")
print("=" * 50)

MIN_PERF = int("$MIN_PERF")
MIN_A11Y = int("$MIN_A11Y")
MIN_BP   = int("$MIN_BP")
MIN_SEO  = int("$MIN_SEO")

failures = []
if perf < MIN_PERF: failures.append(f"Performance {perf} < {MIN_PERF}")
if a11y < MIN_A11Y: failures.append(f"Accessibility {a11y} < {MIN_A11Y}")
if bp   < MIN_BP:   failures.append(f"Best Practices {bp} < {MIN_BP}")
if seo  < MIN_SEO:  failures.append(f"SEO {seo} < {MIN_SEO}")

if failures:
    print("")
    print("GATE FAILURES:")
    for f in failures:
        print(f"  - {f}")
    sys.exit(1)
else:
    print("")
    print("All score gates passed.")
EOF

rm -f "$OUTFILE"

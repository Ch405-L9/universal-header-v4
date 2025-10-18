#!/usr/bin/env bash
# run_lighthouse_audit.sh - Automated Lighthouse performance audit
# Project: BADGR-97_production
set -euo pipefail

echo "╔════════════════════════════════════════════════════════════╗"
echo "║     BADGR-97 LIGHTHOUSE PERFORMANCE AUDIT                 ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Check if Lighthouse is installed
if ! command -v lighthouse &> /dev/null; then
    echo "Lighthouse not installed. Installing globally..."
    npm install -g lighthouse
fi

# Create reports directory
mkdir -p lighthouse-reports

echo "Starting dev server..."
cd ~/BADGR-97_production
npm run dev &
SERVER_PID=$!

# Wait for server to start
echo "Waiting for server to start..."
sleep 5

echo ""
echo "Running Lighthouse audit on http://localhost:3000..."
echo ""

# Run Lighthouse
lighthouse http://localhost:3000 \
  --output html \
  --output json \
  --output-path ./lighthouse-reports/report \
  --chrome-flags="--headless" \
  --preset=desktop

# Stop dev server
kill $SERVER_PID

echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║  LIGHTHOUSE AUDIT COMPLETE                                ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
echo "Reports saved to:"
echo "  • lighthouse-reports/report.html"
echo "  • lighthouse-reports/report.json"
echo ""
echo "Open report:"
echo "  xdg-open lighthouse-reports/report.html"
echo ""

# Extract scores from JSON
if command -v jq &> /dev/null; then
    echo "SCORES:"
    echo "────────────────────────────────────────────────────────────"
    PERF=$(jq '.categories.performance.score * 100' lighthouse-reports/report.json)
    ACCESS=$(jq '.categories.accessibility.score * 100' lighthouse-reports/report.json)
    BEST=$(jq '.categories["best-practices"].score * 100' lighthouse-reports/report.json)
    SEO=$(jq '.categories.seo.score * 100' lighthouse-reports/report.json)

    echo "  Performance:      $PERF / 100"
    echo "  Accessibility:    $ACCESS / 100"
    echo "  Best Practices:   $BEST / 100"
    echo "  SEO:              $SEO / 100"
    echo ""

    # Check if passing
    if (( $(echo "$PERF >= 90" | bc -l) )) && \
       (( $(echo "$ACCESS >= 90" | bc -l) )) && \
       (( $(echo "$BEST >= 90" | bc -l) )) && \
       (( $(echo "$SEO >= 90" | bc -l) )); then
        echo "✅ ALL SCORES PASSING (90+)"
    else
        echo "⚠️  Some scores below 90 - review report for improvements"
    fi
else
    echo "Install 'jq' to see scores: sudo apt install jq"
fi

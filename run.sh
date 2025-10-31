#!/usr/bin/env bash
set -Eeuo pipefail

ROOT_DIR="/home/t0n34781/badgr_bot"
OUT_DIR="${ROOT_DIR}/outputs/lighthouse"
CSV_DIR="${ROOT_DIR}/outputs/csv"
CONF_DOMAINS="${ROOT_DIR}/configs/domains.txt"
mkdir -p "$OUT_DIR" "$CSV_DIR"

# pick Chrome path
detect_chrome() {
  for c in google-chrome-stable google-chrome chromium-browser chromium /snap/bin/chromium; do
    if command -v "$c" >/dev/null 2>&1; then
      echo "$c"; return
    fi
  done
  echo ""
}
CHROME_BIN="$(detect_chrome)"

# lighthouse runner
lh() {
  if command -v lighthouse >/dev/null 2>&1; then
    lighthouse "$@"
  else
    npx -y lighthouse@latest "$@"
  fi
}

slugify() {
  echo "$1" | sed -E 's#https?://##;s#[^a-zA-Z0-9._-]#_#g'
}

run_one() {
  local url="$1"
  local slug; slug="$(slugify "$url")"
  local out_base="${OUT_DIR}/${slug}"  # cleaned name (no double .report)
  local chrome_flags="--headless=new --no-sandbox --disable-gpu --disable-dev-shm-usage"

  echo "[RUN] $url → ${out_base}.json"
  lh "$url" \
    --preset=desktop \
    --only-categories=performance,accessibility,seo,best-practices \
    --output json --output html \
    --output-path "${out_base}" \
    --save-assets \
    --quiet \
    --chrome-flags="${chrome_flags}" \
    --max-wait-for-load=45000 \
    ${CHROME_BIN:+--chrome-path="${CHROME_BIN}"} \
    >"${OUT_DIR}/${slug}.stdout.log" 2>"${OUT_DIR}/${slug}.stderr.log" || true

  if [[ ! -f "${out_base}.report.json" && ! -f "${out_base}.report.report.json" && ! -f "${out_base}.json" ]]; then
    echo "[WARN] No JSON for ${url}. See ${OUT_DIR}/${slug}.stderr.log"
  fi
}

if [[ ! -f "$CONF_DOMAINS" ]]; then
  echo "Missing $CONF_DOMAINS"; exit 1
fi

mapfile -t DOMAINS < <(grep -Eo '^\s*[^#].*\S' "$CONF_DOMAINS" | sed 's/^\s*//;s/\s*$//')
for d in "${DOMAINS[@]}"; do
  [[ "$d" =~ ^https?:// ]] && url="$d" || url="https://$d"
  run_one "$url"
done

echo "Run complete → $OUT_DIR"

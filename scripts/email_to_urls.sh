
#!/usr/bin/env bash
# R10 · emails → URLs (freemail-skip, CSV-safe, DNS-gated) → outputs/urls.txt
set -Eeuo pipefail

cd "$(dirname "$0")/.."
IN="${1:-outputs/contacts/contacts.csv}"

OUT_DIR="outputs"

OUT="${OUT_DIR}/urls.txt"

TMP_DOMS="$(mktemp)"
mkdir -p "$OUT_DIR"

[[ -f "$IN" ]] || { echo "[email_to_urls] missing $IN" >&2; exit 2; }
# Extract unique candidate domains with a CSV-safe Python step
python3 - "$IN" <<'PY' > "$TMP_DOMS"

import sys, csv, re

freemail = re.compile(r'^(gmail.com|yahoo.com|outlook.com|hotmail.com|aol.com|icloud.com|proton.me|protonmail.com|mail.com|yandex.com|zoho.com|pm.me|live.com|msn.com)$', re.I)

path = sys.argv[1]

with open(path, newline='', encoding='utf-8') as f:

    r = csv.DictReader(f)

    cols = [c.lower() for c in r.fieldnames or []]

    # pick column name

    col = None

    for name in ("email","emails"):

        if name in cols:

            col = name; break

    if not col:

        sys.exit("no email or emails column")

    domains = set()

    for row in r:

        raw = (row.get(col) or "").strip()

        if not raw:

            continue

        # first email only

        email = re.split(r'[,; ]+', raw, 1)[0].strip().lower()

        if "@" not in email:

            continue

        dom = email.split("@",1)[1].strip().strip('>).,;"\'').lower()

        dom = re.sub(r'^www.', '', dom)

        if not re.match(r'^[a-z0-9.-]+.[a-z]{2,}$', dom):

            continue

        if freemail.search(dom):

            continue

        domains.add(dom)

for d in sorted(domains):

    print(d)

PY
# DNS-gate and emit https://domain
: > "$OUT"

while IFS= read -r dom; do

    [[ -z "$dom" ]] && continue

    if getent hosts "$dom" >/dev/null 2>&1; then

        echo "https://$dom" >> "$OUT"

    fi

done < "$TMP_DOMS"

rm -f "$TMP_DOMS"
echo "[email_to_urls] wrote $(wc -l < "$OUT" 2>/dev/null || echo 0) → $OUT"


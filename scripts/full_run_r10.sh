
#!/usr/bin/env bash

set -Eeuo pipefail

cd "$(dirname "$0")/.."
SHN_ID="${SHN_ID:-BADGR_BOT-R10-FullLive-$(date -u +%F)T}"
[[ -f .venv/bin/activate ]] && . .venv/bin/activate || true

mkdir -p outputs/{contacts,enriched,lighthouse,logs,csv}
# 1) collect_emails (assumed external; verify)
[[ -f outputs/contacts/contacts.csv ]] || { echo "[full_run] missing outputs/contacts/contacts.csv" >&2; exit 2; }

# 2) emails_to_urls
bash scripts/email_to_urls.sh

# 3) enrich_contacts
if [[ -x scripts/enrich.sh ]]; then

bash scripts/enrich.sh "outputs/contacts/contacts.csv" "outputs/enriched/enriched.csv" "upgini" "EMAIL" || true

else

python3 scripts/enrich_contacts.py \

--input_path outputs/contacts/contacts.csv \

--output_path outputs/enriched/enriched.csv \

--provider upgini --search_keys EMAIL || true

fi
# 4) lighthouse_audit_last
if [[ -x scripts/run.sh ]]; then

bash scripts/run.sh || true

else

python3 -m src.main || true

fi
# 5) cwv_analyze (optional)
[[ -f scripts/analyze_cwv.py ]] && python3 scripts/analyze_cwv.py || true

# 6) autodoc (optional)
if make -n autodoc >/dev/null 2>&1; then

make autodoc || true

else

{

echo "BADGR_BOT R10 Build Report"

date -u

echo "urls.txt: $([[ -f outputs/urls.txt ]] && echo present || echo missing)"

echo "lighthouse reports: $(ls -1 outputs/lighthouse/*.report.json 2>/dev/null | wc -l | tr -d ' ')"

} > outputs/BUILD_REPORT.txt

fi
# 7) cleanup (safe)
[[ -x scripts/repo_clean.sh ]] && bash scripts/repo_clean.sh || true

# SHN stamp
python3 - <<PY

import json, os, glob, time

out = {

"shn_id": "${SHN_ID}",

"stage": "FullLive",

"emails": (sum(1 for _ in open("outputs/contacts/contacts.csv", "r", encoding="utf-8"))-1) if os.path.exists("outputs/contacts/contacts.csv") else 0,

"urls": sum(1 for _ in open("outputs/urls.txt","r",encoding="utf-8")) if os.path.exists("outputs/urls.txt") else 0,

"lh_reports": len(glob.glob("outputs/lighthouse/*.report.json")),

"timestamp_utc": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),

"notes": "Audit executed last per directive"

}

os.makedirs("outputs", exist_ok=True)

with open("outputs/shn_stamp.json","w",encoding="utf-8") as f: json.dump(out,f,indent=2)

print("[full_run] SHN stamp → outputs/shn_stamp.json")

PY


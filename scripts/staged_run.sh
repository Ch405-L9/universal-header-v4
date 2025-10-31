
#!/usr/bin/env bash
# BADGR_BOT · R10 staged driver (correct logical order)
set -Eeuo pipefail

cd "$(dirname "$0")/.."
stage="${1:-all}"   # 1..7 | stage-name | all

SHN_ID="${2:-BADGR_BOT-R10-StagedPilot-$(date -u +%F)T}"
activate() { [[ -f .venv/bin/activate ]] && . .venv/bin/activate || true; }

ensure_dirs() { mkdir -p outputs/{contacts,enriched,lighthouse,logs,csv}; }

ok() { echo "[ok] $"; }

warn() { echo "[warn] $" >&2; }

need() { [[ -f "$1" ]] || { echo "[need] missing $1" >&2; return 1; }; }
run_collect_emails() {

activate; ensure_dirs

if need outputs/contacts/contacts.csv; then

ok "contacts present ($(wc -l < outputs/contacts/contacts.csv) lines)"

else

warn "collector must run before this driver"

fi

}
run_emails_to_urls() {

activate; ensure_dirs

bash scripts/email_to_urls.sh

}
run_enrich() {

activate; ensure_dirs

if [[ -x scripts/enrich.sh ]]; then

bash scripts/enrich.sh "outputs/contacts/contacts.csv" "outputs/enriched/enriched.csv" "upgini" "EMAIL" || true

else

python3 scripts/enrich_contacts.py \

--input_path outputs/contacts/contacts.csv \

--output_path outputs/enriched/enriched.csv \

--provider upgini --search_keys EMAIL || true

fi

}
run_lighthouse_last() {

activate; ensure_dirs

if [[ -x scripts/run.sh ]]; then

bash scripts/run.sh || true

else

python3 -m src.main || true

fi

}
run_cwv_analyze() {

activate

[[ -f scripts/analyze_cwv.py ]] && python3 scripts/analyze_cwv.py || ok "analyzer optional, skipping"

}
run_autodoc() {

activate

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

}
run_cleanup() {

activate

[[ -x scripts/repo_clean.sh ]] && bash scripts/repo_clean.sh || ok "no repo_clean.sh; skipped"

}
case "$stage" in

1|collect_emails)        run_collect_emails ;;

2|emails_to_urls)        run_emails_to_urls ;;

3|enrich_contacts)       run_enrich ;;

4|lighthouse_audit_last) run_lighthouse_last ;;

5|cwv_analyze)           run_cwv_analyze ;;

6|autodoc)               run_autodoc ;;

7|cleanup)               run_cleanup ;;

all)

run_collect_emails

run_emails_to_urls

run_enrich

run_lighthouse_last

run_cwv_analyze

run_autodoc

run_cleanup

;;

*) echo "usage: $0 {1..7|collect_emails|emails_to_urls|enrich_contacts|lighthouse_audit_last|cwv_analyze|autodoc|cleanup|all} [SHN_ID]" >&2; exit 64 ;;

esac
# SHN stamp after any stage
python3 - <<PY

import json, os, glob, time

out = {

"shn_id": os.environ.get("SHN_ID","BADGR_BOT-R10-StagedPilot"),

"urls_present": os.path.exists("outputs/urls.txt"),

"lh_reports": len(glob.glob("outputs/lighthouse/*.report.json")),

"cwv_summary_csv": os.path.exists("outputs/cwv_summary.csv"),

"timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())

}

os.makedirs("outputs", exist_ok=True)

with open("outputs/shn_stamp.json","w",encoding="utf-8") as f: json.dump(out,f,indent=2)

print("[stamp] outputs/shn_stamp.json updated")

PY


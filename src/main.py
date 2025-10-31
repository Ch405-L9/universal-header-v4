import os, sys
from src.schemas.records import CWV, LighthouseScores, AuditRow
from src.crew.tools.robots_guard import robots_allows
from src.crew.tools.lighthouse_tool import run_lighthouse
from src.crew.tools.csv_writer import write_csv

DOMAINS_FILE = "./configs/domains.txt"
OUT_CSV = "./outputs/csv/results.csv"

def safe_num(d: dict, key: str, default="N/A"):
    a = d.get(key) or {}
    val = a.get("numericValue")
    return val if val is not None else default

def safe_cat_score(rep: dict, key: str, default="N/A"):
    return (rep.get("categories", {}).get(key, {}) or {}).get("score", default)

def to_row(url: str) -> dict:
    rep = run_lighthouse(url)
    audits = rep.get("audits", {})

    perf = safe_cat_score(rep, "performance")
    seo  = safe_cat_score(rep, "seo")
    bp   = safe_cat_score(rep, "best-practices")
    a11y = safe_cat_score(rep, "accessibility")

    lcp = safe_num(audits, "largest-contentful-paint")
    cls = (audits.get("cumulative-layout-shift") or {}).get("numericValue", "N/A")
    # INP often not applicable in lab; do not fail if missing
    inp = safe_num(audits, "interaction-to-next-paint")

    # flatten to CSV-friendly dict
    return {
        "domain": url.split("/")[2],
        "page_url": url,
        "performance": perf if perf == "N/A" else round(perf*100, 1),
        "seo":        seo  if seo  == "N/A" else round(seo*100, 1),
        "best_practices": bp if bp == "N/A" else round(bp*100, 1),
        "accessibility":  a11y if a11y == "N/A" else round(a11y*100, 1),
        "lcp_ms": lcp,
        "cls": cls if isinstance(cls, (int,float)) else "N/A",
        "inp_ms": inp
    }

def main():
    if not os.path.exists(DOMAINS_FILE):
        print(f"Missing {DOMAINS_FILE}"); sys.exit(1)
    with open(DOMAINS_FILE, "r", encoding="utf-8") as f:
        domains = [l.strip() for l in f if l.strip()]

    urls = []
    for d in domains:
        u = d if d.startswith("http") else f"https://{d}"
        if robots_allows(u):
            urls.append(u)
        else:
            print("robots blocked, skipping:", d)

    rows = []
    for u in urls:
        try:
            rows.append(to_row(u))
            print("ok:", u)
        except Exception as e:
            print("fail:", u, str(e)[:200])

    write_csv(rows, OUT_CSV)
    print("CSV written →", OUT_CSV if rows else "(no rows; check outputs/lighthouse/*.json for details)")

if __name__ == "__main__":
    # ensure package imports work if someone runs python src/main.py directly
    sys.path.append(os.path.dirname(__file__))
    main()

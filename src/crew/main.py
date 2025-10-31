from __future__ import annotations
import os, sys, json, tempfile, shutil
from pathlib import Path
from typing import Any, Dict, List

DOMAINS_FILE = "/home/t0n34781/badgr_bot/configs/domains.txt"
LH_DIR = Path("/home/t0n34781/badgr_bot/outputs/lighthouse")
OUT_CSV = Path("/home/t0n34781/badgr_bot/outputs/csv/results.csv")

def is_num(x: Any) -> bool:
    return isinstance(x, (int, float)) and not (x != x)

def safe_num(audits: Dict[str, Any], key: str, default="N/A"):
    node = audits.get(key) or {}
    val = node.get("numericValue")
    return val if is_num(val) else default

def pct(x):
    return x if x == "N/A" else round(float(x) * 100, 1)

def read_raw(url: str) -> Dict[str, Any]:
    slug = url.replace("https://","").replace("http://","")
    slug = "".join([c if c.isalnum() or c in "._-" else "_" for c in slug])
    candidates = [
        LH_DIR / f"{slug}.report.json",
        LH_DIR / f"{slug}.report.report.json",
        LH_DIR / f"{slug}.json",
    ]
    for jf in candidates:
        if jf.exists():
            with open(jf, "r", encoding="utf-8") as f:
                return json.load(f)
    raise FileNotFoundError(f"No JSON found for {url} in {LH_DIR}")

def to_row(url: str) -> Dict[str, Any]:
    rep = read_raw(url)
    cats = (rep.get("categories") or {})
    audits = (rep.get("audits") or {})

    perf = cats.get("performance", {}).get("score", "N/A")
    seo  = cats.get("seo", {}).get("score", "N/A")
    bp   = cats.get("best-practices", {}).get("score", "N/A")
    a11y = cats.get("accessibility", {}).get("score", "N/A")

    lcp = safe_num(audits, "largest-contentful-paint")
    cls_raw = audits.get("cumulative-layout-shift", {}).get("numericValue")
    cls = cls_raw if is_num(cls_raw) else "N/A"
    inp = safe_num(audits, "interaction-to-next-paint", default="N/A")
    domain = url.split("/")[2] if "://" in url else url

    return {
        "domain": domain,
        "page_url": url,
        "performance": pct(perf),
        "seo": pct(seo),
        "best_practices": pct(bp),
        "accessibility": pct(a11y),
        "lcp_ms": lcp,
        "cls": cls,
        "inp_ms": inp
    }

def write_csv(rows: List[Dict[str, Any]], out_path: Path):
    if not rows:
        rows = [{"domain":"","page_url":"","performance":"","seo":"",
                 "best_practices":"","accessibility":"","lcp_ms":"",
                 "cls":"","inp_ms":""}]
    header = list(rows[0].keys())
    tmp = tempfile.NamedTemporaryFile("w", encoding="utf-8", delete=False)
    try:
        tmp.write(",".join(header) + "\n")
        for r in rows:
            tmp.write(",".join(str(r.get(k, "")) for k in header) + "\n")
        tmp.flush(); tmp.close()
        out_path.parent.mkdir(parents=True, exist_ok=True)
        shutil.move(tmp.name, out_path)
    finally:
        try: os.unlink(tmp.name)
        except FileNotFoundError: pass

def robots_allows(url: str) -> bool:
    try:
        from src.crew.tools.robots_guard import robots_allows as rg
        return rg(url)
    except Exception:
        return True

def main():
    if not Path(DOMAINS_FILE).exists():
        print(f"Missing {DOMAINS_FILE}"); sys.exit(1)

    with open(DOMAINS_FILE, "r", encoding="utf-8") as f:
        raw = [l.strip() for l in f if l.strip() and not l.strip().startswith("#")]

    urls = []
    for d in raw:
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
    print("CSV written →", OUT_CSV if rows else "(empty with header)")

if __name__ == "__main__":
    sys.path.append(os.path.dirname(__file__))
    main()

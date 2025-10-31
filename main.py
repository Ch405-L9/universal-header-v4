from __future__ import annotations
import os
import re
import time
import subprocess
from pathlib import Path
from typing import Dict, List

import yaml

from src.schemas.manifest import Manifest


def load_manifest(path: str) -> Manifest:
    with open(path, "r", encoding="utf-8") as f:
        data = yaml.safe_load(f)
    return Manifest.model_validate(data)


def _discover_google_cse(keywords: List[str], max_results: int, cx: str, lang: str, country: str, safe: bool, rps: float) -> List[str]:
    import requests
    api_key = os.environ.get("GOOGLE_API_KEY")
    if not api_key or not cx:
        return []
    results: List[str] = []
    delay = 1.0 / rps if rps > 0 else 0
    per_page = 10
    total = 0
    for kw in keywords:
        start = 1
        while total < max_results and start <= 91:  # Google CSE up to 10 pages
            params = {
                "key": api_key,
                "cx": cx,
                "q": kw,
                "num": min(per_page, max_results - total),
                "safe": "active" if safe else "off",
                "lr": f"lang_{lang}" if lang else None,
                "gl": country if country else None,
            }
            # remove None
            params = {k: v for k, v in params.items() if v is not None}
            try:
                resp = requests.get("https://www.googleapis.com/customsearch/v1", params=params, timeout=12)
                if resp.status_code != 200:
                    break
                data = resp.json() or {}
                items = data.get("items") or []
                if not items:
                    break
                for it in items:
                    link = it.get("link") or it.get("formattedUrl")
                    if not link:
                        continue
                    try:
                        domain = link.split("//", 1)[-1].split("/", 1)[0]
                        if ":" in domain:
                            domain = domain.split(":", 1)[0]
                    except Exception:
                        continue
                    if domain and domain not in results:
                        results.append(domain)
                        total += 1
                        if total >= max_results:
                            break
                start += per_page
                if delay:
                    time.sleep(delay)
            except Exception:
                break
    return results


def _discover_ddg(keywords: List[str], max_results: int, rps: float) -> List[str]:
    from duckduckgo_search import DDGS
    results: List[str] = []
    delay = 1.0 / rps if rps > 0 else 0
    with DDGS() as ddgs:
        for kw in keywords:
            for r in ddgs.text(kw, max_results=max_results):
                url = r.get("href") or r.get("link") or r.get("url")
                if not url:
                    continue
                try:
                    domain = url.split("//", 1)[-1].split("/", 1)[0]
                except Exception:
                    continue
                if ":" in domain:
                    domain = domain.split(":", 1)[0]
                if domain and domain not in results:
                    results.append(domain)
                if delay:
                    time.sleep(delay)
    return results


def discover_domains(config) -> List[str]:
    # Soften params: cap results and spread across providers
    max_results = max(1, min(config.max_results, 100))
    default_rps = 0.5 if config.safe_search else 1.0  # slightly slower when safe_search on
    goog_rps = float(getattr(config, "_parent", None).policy.discovery_google_rps) if hasattr(config, "_parent") and getattr(getattr(config, "_parent"), "policy", None) else None
    ddg_rps = float(getattr(config, "_parent", None).policy.discovery_ddg_rps) if hasattr(config, "_parent") and getattr(getattr(config, "_parent"), "policy", None) else None

    # Expand keyword set with variants
    try:
        all_keywords = list({*(config.keywords or []), *(config.query_variants or [])})
    except Exception:
        all_keywords = config.keywords

    domains: List[str] = []
    # Try Google first if allowed
    if config.provider in ("auto", "google"):
        cx = config.google_cx or os.environ.get("GOOGLE_CSE_ID")
        goog = _discover_google_cse(
            all_keywords,
            max_results,
            cx=cx,
            lang=config.lang,
            country=config.country,
            safe=config.safe_search,
            rps=(goog_rps or default_rps),
        )
        domains.extend(goog)
    # Fallback to DDG if needed or selected
    if (config.provider in ("auto", "ddg") and len(domains) < max_results):
        try:
            ddg = _discover_ddg(all_keywords, max_results - len(domains), rps=(ddg_rps or default_rps))
            domains.extend([d for d in ddg if d not in domains])
        except Exception:
            pass
    print(f"[Discovery] provider={config.provider} google_found={len([d for d in domains])} total={len(domains)}")
    return domains


def write_domains(domains: List[str], path: str) -> None:
    Path(path).parent.mkdir(parents=True, exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        for d in domains:
            f.write(d.strip() + "\n")


def robots_ok(url: str) -> bool:
    try:
        from src.crew.tools.robots_guard import robots_allows
        return robots_allows(url)
    except Exception:
        return True


def extract_emails(text: str) -> List[str]:
    pattern = r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}"
    emails = re.findall(pattern, text)
    # De-dup and filter obvious non-biz
    blocked = {"example.com", "gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "protonmail.com"}
    unique: List[str] = []
    for e in emails:
        dom = e.split("@")[-1].lower()
        if dom in blocked:
            continue
        if e not in unique:
            unique.append(e)
    return unique


def scrape_contacts(domains: List[str], max_pages: int, ua: str, rps: float) -> List[Dict[str, str]]:
    from playwright.sync_api import sync_playwright
    from bs4 import BeautifulSoup

    targets = ["/", "/contact", "/contact-us", "/about", "/about-us"]
    rows: List[Dict[str, str]] = []
    delay = 1.0 / rps if rps > 0 else 0

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(user_agent=ua)
        page = context.new_page()
        for domain in domains:
            base = domain if domain.startswith("http") else f"https://{domain}"
            seen = 0
            for path in targets:
                if seen >= max_pages:
                    break
                url = base.rstrip("/") + path
                if not robots_ok(url):
                    continue
                try:
                    page.goto(url, timeout=20000, wait_until="domcontentloaded")
                    html = page.content()
                    soup = BeautifulSoup(html, "lxml")
                    text = soup.get_text(" ", strip=True)
                    emails = extract_emails(text)
                    for em in emails:
                        rows.append({"domain": domain, "page_url": url, "email": em})
                    seen += 1
                    if delay:
                        time.sleep(delay)
                except Exception:
                    continue
        context.close()
        browser.close()
    # Deduplicate rows by (domain,email)
    unique_map: Dict[str, Dict[str, str]] = {}
    for r in rows:
        key = f"{r['domain']}|{r['email']}"
        unique_map[key] = r
    return list(unique_map.values())


def sync_to_badgr_bot(domains_file: str) -> None:
    # Mirror domains into badgr_bot config if present (so existing audit scripts work)
    bb_root = Path("/home/t0n34781/badgr_bot")
    bb_conf = bb_root / "configs/domains.txt"
    if bb_root.exists():
        bb_conf.parent.mkdir(parents=True, exist_ok=True)
        data = Path(domains_file).read_text(encoding="utf-8")
        bb_conf.write_text(data, encoding="utf-8")


def run_audits() -> None:
    script = Path("/home/t0n34781/Chat Analysis/scripts/run.sh")
    if not script.exists():
        raise FileNotFoundError(f"Missing audit runner script: {script}")
    subprocess.run(["bash", str(script)], check=True)


def parse_lighthouse_csv() -> Path:
    # Reuse existing CSV parser under src/crew/main.py (which writes into badgr_bot outputs)
    import importlib.util
    mod_path = "/home/t0n34781/Chat Analysis/src/crew/main.py"
    spec = importlib.util.spec_from_file_location("crew_main", mod_path)
    if spec is None or spec.loader is None:
        raise RuntimeError("Failed to import src/crew/main.py")
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    mod.main()
    return Path("/home/t0n34781/badgr_bot/outputs/csv/results.csv")


def copy_results(src_csv: Path, dest_csv: Path) -> None:
    dest_csv.parent.mkdir(parents=True, exist_ok=True)
    data = src_csv.read_text(encoding="utf-8")
    dest_csv.write_text(data, encoding="utf-8")


def save_contacts_sqlite(rows: List[Dict[str, str]], db_path: str) -> None:
    import sqlite3
    Path(db_path).parent.mkdir(parents=True, exist_ok=True)
    conn = sqlite3.connect(db_path)
    cur = conn.cursor()
    cur.execute(
        """
        CREATE TABLE IF NOT EXISTS contacts (
            domain TEXT,
            page_url TEXT,
            email TEXT,
            clearbit_name TEXT,
            clearbit_domain TEXT,
            clearbit_site TEXT,
            clearbit_employees INTEGER,
            clearbit_employees_range TEXT,
            clearbit_raised REAL,
            clearbit_sector TEXT,
            clearbit_industry TEXT,
            clearbit_subindustry TEXT,
            clearbit_tags TEXT,
            clearbit_logo TEXT,
            clearbit_twitter TEXT,
            clearbit_linkedin TEXT,
            os_match_score REAL,
            os_sanctioned TEXT,
            enriched TEXT
        )
        """
    )
    # Basic upsert: clear domain/email then insert
    cur.execute("DELETE FROM contacts WHERE domain IS NULL")
    for r in rows:
        cur.execute(
            """
            INSERT INTO contacts (
                domain,page_url,email,clearbit_name,clearbit_domain,clearbit_site,
                clearbit_employees,clearbit_employees_range,clearbit_raised,clearbit_sector,
                clearbit_industry,clearbit_subindustry,clearbit_tags,clearbit_logo,
                clearbit_twitter,clearbit_linkedin,os_match_score,os_sanctioned,enriched
            ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
            """,
            [
                r.get("domain"), r.get("page_url"), r.get("email"),
                r.get("clearbit_name"), r.get("clearbit_domain"), r.get("clearbit_site"),
                r.get("clearbit_employees"), r.get("clearbit_employees_range"), r.get("clearbit_raised"), r.get("clearbit_sector"),
                r.get("clearbit_industry"), r.get("clearbit_subindustry"), r.get("clearbit_tags"), r.get("clearbit_logo"),
                r.get("clearbit_twitter"), r.get("clearbit_linkedin"), r.get("os_match_score"), r.get("os_sanctioned"), r.get("enriched"),
            ],
        )
    conn.commit()
    conn.close()


def save_audits_sqlite(audit_csv: str, db_path: str) -> None:
    import csv
    import sqlite3
    Path(db_path).parent.mkdir(parents=True, exist_ok=True)
    conn = sqlite3.connect(db_path)
    cur = conn.cursor()
    cur.execute(
        """
        CREATE TABLE IF NOT EXISTS audits (
            domain TEXT,
            page_url TEXT,
            performance REAL,
            seo REAL,
            best_practices REAL,
            accessibility REAL,
            lcp_ms REAL,
            cls REAL,
            inp_ms REAL
        )
        """
    )
    cur.execute("DELETE FROM audits")
    with open(audit_csv, "r", encoding="utf-8") as f:
        rdr = csv.DictReader(f)
        for row in rdr:
            cur.execute(
                "INSERT INTO audits VALUES (?,?,?,?,?,?,?,?,?)",
                [
                    row.get("domain"), row.get("page_url"), row.get("performance"), row.get("seo"),
                    row.get("best_practices"), row.get("accessibility"), row.get("lcp_ms"), row.get("cls"), row.get("inp_ms"),
                ],
            )
    conn.commit()
    conn.close()


def compute_scores(db_path: str) -> None:
    import sqlite3
    conn = sqlite3.connect(db_path)
    cur = conn.cursor()
    cur.execute(
        """
        CREATE TABLE IF NOT EXISTS lead_scores (
            domain TEXT PRIMARY KEY,
            score REAL,
            priority TEXT
        )
        """
    )
    # Simple heuristic score: lower web vitals and scores -> higher need
    cur.execute(
        """
        WITH agg AS (
            SELECT a.domain,
                   AVG(COALESCE(a.performance,0)) AS perf,
                   AVG(COALESCE(a.seo,0)) AS seo,
                   AVG(COALESCE(a."best_practices",0)) AS bp,
                   AVG(COALESCE(a.accessibility,0)) AS a11y
            FROM audits a
            GROUP BY a.domain
        )
        SELECT domain,
               (100 - perf) * 0.4 + (100 - seo) * 0.3 + (100 - bp) * 0.2 + (100 - a11y) * 0.1 AS score
        FROM agg
        """
    )
    rows = cur.fetchall()
    for dom, score in rows:
        priority = "high" if (score is not None and score >= 40) else ("medium" if score and score >= 20 else "low")
        cur.execute(
            "INSERT OR REPLACE INTO lead_scores (domain, score, priority) VALUES (?,?,?)",
            [dom, score, priority],
        )
    conn.commit()
    conn.close()


def version_check() -> None:
    try:
        import pydantic, httpx, playwright, rich, ujson, yaml as _yaml, pandas, requests, upgini
        print(
            f"[Versions] pydantic={pydantic.__version__} httpx={httpx.__version__} playwright={playwright.__version__} "
            f"rich={rich.__version__} ujson={ujson.__version__} pyyaml={_yaml.__version__} pandas={pandas.__version__} "
            f"requests={requests.__version__} upgini={getattr(upgini, '__version__', 'unknown')}"
        )
    except Exception as e:
        print(f"[Versions] Warning: {e}")


def write_contacts_csv(rows: List[Dict[str, str]], path: str) -> None:
    try:
        from src.crew.tools.csv_writer import write_csv
        write_csv(rows, path)
    except Exception:
        # fallback simple writer
        import csv
        Path(path).parent.mkdir(parents=True, exist_ok=True)
        if not rows:
            rows = [{"domain": "", "page_url": "", "email": ""}]
        header = list(rows[0].keys())
        with open(path, "w", newline="", encoding="utf-8") as f:
            w = csv.DictWriter(f, fieldnames=header)
            w.writeheader()
            for r in rows:
                w.writerow(r)


def enrich_leads(rows: List[Dict[str, str]], enable_upgini: bool) -> List[Dict[str, str]]:
    if not enable_upgini or not rows:
        return rows
    api_key = os.environ.get("UPGINI_API_KEY")
    if not api_key:
        print("[Upgini] UPGINI_API_KEY not set; skipping enrichment")
        return rows
    try:
        import pandas as pd
        from upgini import FeaturesEnricher
        from upgini.metadata import SearchKey
    except Exception as e:
        print(f"[Upgini] Library unavailable: {e}")
        return rows

    try:
        # Build domain-level dataframe
        domains = sorted({r.get("domain", "").lower() for r in rows if r.get("domain")})
        if not domains:
            return rows
        X = pd.DataFrame({"domain": domains})
        # Dummy target; Upgini expects y, but we only need enrichment
        y = pd.Series([0] * len(X))

        enricher = FeaturesEnricher(
            api_key=api_key,
            search_keys={"domain": SearchKey.CATEGORICAL},
        )
        X_enriched, _, _ = enricher.fit_transform(
            X,
            y,
            calculate_metrics=False,
            keep_input=True,
            show_progress=False,
        )

        # Merge enriched columns back by domain
        enriched_cols = [c for c in X_enriched.columns if c not in ("domain",)]
        enriched_map: Dict[str, Dict[str, str]] = {}
        for _, row in X_enriched.iterrows():
            dom = str(row.get("domain", "")).lower()
            enriched_map[dom] = {k: row.get(k) for k in enriched_cols}

        out: List[Dict[str, str]] = []
        for r in rows:
            dom = str(r.get("domain", "")).lower()
            extra = enriched_map.get(dom, {})
            merged = dict(r)
            # Prefix to avoid collisions
            for k, v in extra.items():
                merged[f"upgini_{k}"] = v
            merged["enriched"] = "true"
            out.append(merged)
        print(f"[Upgini] Enriched {len(enriched_map)} domains")
        return out
    except Exception as e:
        print(f"[Upgini] Enrichment failed: {str(e)[:200]}")
        return rows


def enrich_clearbit(rows: List[Dict[str, str]], enabled: bool, rps: float) -> List[Dict[str, str]]:
    if not enabled or not rows:
        return rows
    api_key = os.environ.get("CLEARBIT_API_KEY")
    if not api_key:
        print("[Clearbit] CLEARBIT_API_KEY not set; skipping enrichment")
        return rows
    try:
        import requests
    except Exception as e:
        print(f"[Clearbit] requests unavailable: {e}")
        return rows

    # Unique domains to enrich
    domains = sorted({str(r.get("domain", "")).lower() for r in rows if r.get("domain")})
    info_map: Dict[str, Dict[str, str]] = {}
    delay = 1.0 / rps if rps > 0 else 0
    for dom in domains:
        try:
            url = f"https://company.clearbit.com/v2/companies/find?domain={dom}"
            # simple retry with backoff
            attempt = 0
            while attempt < 3:
                attempt += 1
                resp = requests.get(url, auth=(api_key, ""), timeout=12)
                if resp.status_code == 200:
                    data = resp.json() or {}
                    info_map[dom] = {
                        "clearbit_name": data.get("name"),
                        "clearbit_domain": data.get("domain"),
                        "clearbit_site": (data.get("site") or {}).get("url"),
                        "clearbit_employees": (data.get("metrics") or {}).get("employees"),
                        "clearbit_employees_range": (data.get("metrics") or {}).get("employeesRange"),
                        "clearbit_raised": (data.get("metrics") or {}).get("raised"),
                        "clearbit_sector": (data.get("category") or {}).get("sector"),
                        "clearbit_industry": (data.get("category") or {}).get("industry"),
                        "clearbit_subindustry": (data.get("category") or {}).get("subIndustry"),
                        "clearbit_tags": ",".join((data.get("tags") or [])[:20]) if isinstance(data.get("tags"), list) else None,
                        "clearbit_logo": data.get("logo"),
                        "clearbit_twitter": (data.get("twitter") or {}).get("handle") if isinstance(data.get("twitter"), dict) else data.get("twitter"),
                        "clearbit_linkedin": (data.get("linkedin") or {}).get("handle") if isinstance(data.get("linkedin"), dict) else data.get("linkedin"),
                        "clearbit_location": data.get("location"),
                    }
                    break
                elif resp.status_code in (402, 403, 404, 422):
                    # do not retry on permanent errors
                    break
                time.sleep(min(8, (2 ** (attempt - 1)) * 0.5))
            if delay:
                time.sleep(delay)
        except Exception:
            continue

    out: List[Dict[str, str]] = []
    for r in rows:
        dom = str(r.get("domain", "")).lower()
        extra = info_map.get(dom, {})
        merged = dict(r)
        merged.update({k: v for k, v in extra.items() if v is not None})
        out.append(merged)
    print(f"[Clearbit] Enriched {len(info_map)} domains")
    return out


def check_opensanctions(rows: List[Dict[str, str]], enabled: bool, rps: float) -> List[Dict[str, str]]:
    if not enabled or not rows:
        return rows
    try:
        import requests
    except Exception as e:
        print(f"[OpenSanctions] requests unavailable: {e}")
        return rows

    domains = sorted({str(r.get("domain", "")).lower() for r in rows if r.get("domain")})
    flag_map: Dict[str, Dict[str, str]] = {}
    delay = 1.0 / rps if rps > 0 else 0
    for dom in domains:
        try:
            # Query OpenSanctions match API with domain as query
            attempt = 0
            data = None
            while attempt < 3:
                attempt += 1
                resp = requests.get(
                    "https://api.opensanctions.org/match",
                    params={"q": dom, "size": 1},
                    timeout=12,
                )
                if resp.status_code == 200:
                    data = resp.json() or {}
                    break
                time.sleep(min(8, (2 ** (attempt - 1)) * 0.5))
            if data is None:
                continue
            # Heuristic: mark sanctioned if any result has score >= 0.85
            results = data.get("results") or []
            sanctioned = False
            score = None
            if results:
                best = results[0]
                score = best.get("score")
                sanctioned = bool(score and score >= 0.85)
            flag_map[dom] = {
                "os_match_score": score if score is not None else "",
                "os_sanctioned": "true" if sanctioned else "false",
            }
            if delay:
                time.sleep(delay)
        except Exception:
            continue

    out: List[Dict[str, str]] = []
    for r in rows:
        dom = str(r.get("domain", "")).lower()
        extra = flag_map.get(dom, {"os_match_score": "", "os_sanctioned": "false"})
        merged = dict(r)
        merged.update(extra)
        out.append(merged)
    print(f"[OpenSanctions] Checked {len(flag_map)} domains")
    return out


def main() -> None:
    manifest_path = "/home/t0n34781/Chat Analysis/configs/manifest.yaml"
    mf = load_manifest(manifest_path)
    version_check()

    # Phase 1: Discovery
    # Bind parent for rate lookups in discovery
    mf.discovery._parent = mf  # lightweight reference
    discovered = discover_domains(mf.discovery)
    # Write into primary domains file
    write_domains(discovered, mf.io.domains_file)
    # Mirror into badgr_bot so the audit scripts run as-is
    sync_to_badgr_bot(mf.io.domains_file)

    # Phase 2: Contact Scraping (Playwright)
    contacts = scrape_contacts(
        discovered,
        max_pages=mf.scrape.max_pages_per_domain,
        ua=mf.scrape.user_agent,
        rps=mf.policy.rate_limit_rps,
    ) if mf.scrape.fetch_contacts else []
    if mf.enrichment.enable_upgini:
        contacts = enrich_leads(contacts, enable_upgini=True)
    if mf.enrichment.enable_clearbit:
        contacts = enrich_clearbit(contacts, enabled=True, rps=(mf.policy.clearbit_rps or mf.policy.rate_limit_rps))
    if mf.enrichment.enable_opensanctions:
        contacts = check_opensanctions(contacts, enabled=True, rps=(mf.policy.opensanctions_rps or mf.policy.rate_limit_rps))
    write_contacts_csv(contacts, mf.io.contacts_csv)
    save_contacts_sqlite(contacts, mf.io.sqlite_db)

    # Phase 3: Audit (uses existing run.sh + parser)
    run_audits()
    src_csv = parse_lighthouse_csv()
    copy_results(src_csv, Path(mf.io.csv_results))
    save_audits_sqlite(str(Path(mf.io.csv_results)), mf.io.sqlite_db)
    compute_scores(mf.io.sqlite_db)

    print(f"Pipeline complete. Results → {mf.io.csv_results}")


if __name__ == "__main__":
    main()

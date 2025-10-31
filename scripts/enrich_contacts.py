#!/usr/bin/env python3
"""
R9 Enrichment: reads outputs/contacts/contacts.csv and appends company/contact metadata.
- Default provider: upgini (open-source friendly). Falls back gracefully if not installed.
- Writes outputs/enriched/enriched.csv
"""
from __future__ import annotations
import os, sys, argparse, time, json
from datetime import datetime
from typing import List
import pandas as pd

REQUIRED_INPUT_COLS = ["email"]
ENRICH_COLS = [
    "email_confidence","role","linkedin_url","company_name","company_size",
    "industry","tech_stack","phone","hq_country","hq_region","hq_city",
    "source_provider","enrichment_timestamp"
]

def ensure_cols(df: pd.DataFrame, cols: List[str]) -> pd.DataFrame:
    for c in cols:
        if c not in df.columns:
            df[c] = pd.NA
    return df

def normalize_input(df: pd.DataFrame) -> pd.DataFrame:
    cols = [c.lower() for c in df.columns]
    df.columns = cols
    # attempt to derive email if only 'emails' exists
    if "email" not in df.columns and "emails" in df.columns:
        df["email"] = df["emails"].astype(str).str.split(",").str[0].str.strip()
    return df

def safe_save(df: pd.DataFrame, path: str):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    df.to_csv(path, index=False)

def enrich_upgini(df: pd.DataFrame, search_keys: List[str]) -> pd.DataFrame:
    api_key = os.getenv("UPGINI_API_KEY", "")
    if not api_key:
        print("[enrich] UPGINI_API_KEY not set; writing pass-through with empty enrichment columns.")
        return ensure_cols(df, ENRICH_COLS)

    try:
        # lazy import so script works without dependency
        from upgini import FeaturesEnricher, SearchKey
        key_map = {
            "EMAIL": SearchKey.EMAIL,
            "PHONE": SearchKey.PHONE,
            "IP": SearchKey.IP,
            "DOMAIN": SearchKey.DOMAIN,
        }
        keys = [key_map.get(k.upper()) for k in search_keys if k.upper() in key_map]
        if not keys:
            keys = [SearchKey.EMAIL]

        print(f"[enrich] Upgini with search_keys={search_keys}")
        # Upgini requires fit() before transform(); pass a minimal dummy target
        fe = FeaturesEnricher(
            search_keys=keys,
            country="US",  # adjust if your leads are international
            max_features=64
        )

        # Build X with only columns Upgini needs (emails/phone/ip)
        X = df.copy()
        # Dummy target to satisfy fit API
        y = pd.Series([0]*len(X))
        fe.fit(X, y)
        enriched = fe.transform(X)
        # Normalize expected column names; map what we can
        # (Actual field names depend on returned dataset. We map common names defensively.)
        colmap = {
            "linkedin": "linkedin_url",
            "linkedin_url": "linkedin_url",
            "title": "role",
            "job_title": "role",
            "company": "company_name",
            "company_name": "company_name",
            "company_size": "company_size",
            "industry": "industry",
            "tech_stack": "tech_stack",
            "phone": "phone",
            "hq_country": "hq_country",
            "hq_region": "hq_region",
            "hq_city": "hq_city",
            "email_confidence": "email_confidence",
        }
        for src, dst in list(colmap.items()):
            if src in enriched.columns and dst not in enriched.columns:
                enriched[dst] = enriched[src]

        enriched = ensure_cols(enriched, ENRICH_COLS)
        enriched["source_provider"] = "upgini"
        enriched["enrichment_timestamp"] = datetime.utcnow().isoformat() + "Z"
        return enriched
    except ImportError:
        print("[enrich] upgini not installed; pip install upgini, then re-run. Writing pass-through.")
        return ensure_cols(df, ENRICH_COLS)
    except Exception as e:
        print(f"[enrich] Upgini error: {e}\nWriting pass-through with empty enrichment columns.")
        return ensure_cols(df, ENRICH_COLS)

def main():
    p = argparse.ArgumentParser(description="Lead enrichment (R9)")
    p.add_argument("--input_path", default="outputs/contacts/contacts.csv")
    p.add_argument("--output_path", default="outputs/enriched/enriched.csv")
    p.add_argument("--provider", default="upgini", choices=["upgini","none"])
    p.add_argument("--search_keys", default="EMAIL", help="comma list of keys: EMAIL,PHONE,IP,DOMAIN")
    args = p.parse_args()

    if not os.path.exists(args.input_path):
        print(f"[enrich] Input not found: {args.input_path}")
        sys.exit(2)

    df = pd.read_csv(args.input_path)
    df = normalize_input(df)

    missing = [c for c in REQUIRED_INPUT_COLS if c not in df.columns]
    if missing:
        print(f"[enrich] Missing required input columns: {missing}")
        sys.exit(3)

    search_keys = [s.strip() for s in args.search_keys.split(",") if s.strip()]
    if args.provider == "upgini":
        out = enrich_upgini(df, search_keys)
    else:
        out = ensure_cols(df, ENRICH_COLS)
        out["source_provider"] = "none"
        out["enrichment_timestamp"] = datetime.utcnow().isoformat() + "Z"

    safe_save(out, args.output_path)
    print(f"[enrich] Wrote → {args.output_path} rows={len(out)}")

if __name__ == "__main__":
    main()

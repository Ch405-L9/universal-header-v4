from __future__ import annotations
from typing import Dict, List, Optional
from pydantic import BaseModel, Field, HttpUrl


class Policy(BaseModel):
    respect_robots: bool = True
    rate_limit_rps: float = Field(default=1.0, ge=0)
    gdpr_ccpa_compliant: bool = True
    mobile_first_threshold_lcp_ms: int = Field(default=2500, ge=0)
    mobile_first_threshold_cls: float = Field(default=0.1, ge=0)
    self_eval_enabled: bool = True
    # Optional per-provider throttles (fallbacks to rate_limit_rps when None)
    discovery_google_rps: Optional[float] = None
    discovery_ddg_rps: Optional[float] = None
    clearbit_rps: Optional[float] = None
    opensanctions_rps: Optional[float] = None
    enrichment_upgini_rps: Optional[float] = None


class DiscoveryConfig(BaseModel):
    keywords: List[str] = Field(default_factory=list)
    query_variants: List[str] = Field(default_factory=list)
    max_results: int = Field(default=50, ge=1)
    include_news: bool = False
    provider: str = Field(default="auto", description="auto|google|ddg")
    safe_search: bool = True
    lang: str = Field(default="en")
    country: str = Field(default="US")
    google_cx: Optional[str] = None  # Google CSE ID (cx)


class ScrapeConfig(BaseModel):
    fetch_contacts: bool = True
    max_pages_per_domain: int = Field(default=3, ge=1)
    user_agent: str = Field(default="Mozilla/5.0")


class EnrichmentConfig(BaseModel):
    enable_upgini: bool = False
    enable_opensanctions: bool = False
    enable_clearbit: bool = False
    enable_crunchbase: bool = False


class AuditConfig(BaseModel):
    use_lighthouse: bool = True
    preset: str = Field(default="desktop")
    categories: List[str] = Field(default_factory=lambda: [
        "performance", "accessibility", "seo", "best-practices"
    ])


class OutreachConfig(BaseModel):
    enabled: bool = False
    dry_run: bool = True
    from_email: Optional[str] = None


class IOPaths(BaseModel):
    project_root: str
    configs_dir: str
    outputs_dir: str
    domains_file: str
    csv_results: str
    contacts_csv: str
    sqlite_db: str


class Manifest(BaseModel):
    name: str = Field(default="LeadGen-Audit Pipeline")
    description: Optional[str] = None
    policy: Policy = Field(default_factory=Policy)
    discovery: DiscoveryConfig = Field(default_factory=DiscoveryConfig)
    scrape: ScrapeConfig = Field(default_factory=ScrapeConfig)
    enrichment: EnrichmentConfig = Field(default_factory=EnrichmentConfig)
    audit: AuditConfig = Field(default_factory=AuditConfig)
    outreach: OutreachConfig = Field(default_factory=OutreachConfig)
    io: IOPaths



from pydantic import BaseModel, Field, HttpUrl
class CWV(BaseModel):
    lcp_ms: int = Field(ge=0)
    cls: float = Field(ge=0)
    inp_ms: int = Field(ge=0)
class LighthouseScores(BaseModel):
    performance: float = Field(ge=0, le=100)
    seo: float = Field(ge=0, le=100)
    best_practices: float = Field(ge=0, le=100)
    accessibility: float = Field(ge=0, le=100)
    cwv: CWV
class AuditRow(BaseModel):
    domain: str
    page_url: HttpUrl
    lighthouse: LighthouseScores

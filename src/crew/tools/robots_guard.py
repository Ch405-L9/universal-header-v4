import urllib.request, urllib.parse
def robots_allows(url: str, ua: str="Mozilla/5.0") -> bool:
    try:
        parts = urllib.parse.urlparse(url if url.startswith("http") else "https://" + url)
        base = f"{parts.scheme}://{parts.netloc}"
        robots_url = urllib.parse.urljoin(base, "/robots.txt")
        req = urllib.request.Request(robots_url, headers={"User-Agent": ua})
        with urllib.request.urlopen(req, timeout=6) as resp:
            txt = resp.read().decode("utf-8", errors="ignore").lower()
        if "user-agent: *" in txt and "disallow: /" in txt:
            return False
        return True
    except Exception:
        return True

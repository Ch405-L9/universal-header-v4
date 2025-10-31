import json, subprocess, os, re

CFG_PATH = "./configs/lh.config.json"

def sanitize(name: str) -> str:
    return re.sub(r'[^a-z0-9.-]+', '_', name.lower())

def run_lighthouse(url: str, out_dir: str = "./outputs/lighthouse") -> dict:
    os.makedirs(out_dir, exist_ok=True)
    base = url.split("//",1)[-1].rstrip("/")
    tag = sanitize(base)
    final_json = os.path.join(out_dir, f"{tag}.json")

    cmd = [
        "npx","lighthouse", url,
        "--quiet",
        "--output=json",
        f"--output-path={final_json}",
        f"--config-path={CFG_PATH}"
    ]
    res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    if res.returncode != 0:
        raise RuntimeError(f"Lighthouse failed for {url}: {res.stderr[:300]}")
    with open(final_json, "r", encoding="utf-8") as f:
        return json.load(f)

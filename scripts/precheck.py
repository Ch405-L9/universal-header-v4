import json, os, shutil, yaml
out = {"ok": True, "checks": []}
# tools
missing = [c for c in ["node","npm","python","npx"] if shutil.which(c) is None]
out["checks"].append({"cmds_missing": missing})
if missing: out["ok"] = False
# config
if not os.path.exists("./configs/bot.config.yaml"):
    out["ok"] = False
    out["config"] = "missing ./configs/bot.config.yaml"
else:
    with open("./configs/bot.config.yaml","r",encoding="utf-8") as f:
        cfg = yaml.safe_load(f)
    out["cfg_ok"] = bool(cfg)
# outputs writable
try:
    os.makedirs("./outputs/logs", exist_ok=True)
    with open("./outputs/logs/precheck.touch","w") as _:
        pass
except Exception as e:
    out["ok"] = False
    out["outputs_writable"] = str(e)
print(json.dumps(out))
exit(0 if out["ok"] else 1)

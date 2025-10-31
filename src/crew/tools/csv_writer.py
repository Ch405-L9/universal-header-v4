import csv, os
def write_csv(rows, path: str) -> None:
    os.makedirs(os.path.dirname(path), exist_ok=True)
    if not rows: return
    header = list(rows[0].keys())
    with open(path, "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=header)
        w.writeheader()
        for r in rows:
            w.writerow(r)

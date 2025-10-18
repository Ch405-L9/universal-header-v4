#!/usr/bin/env bash
FRONTEND_PORT="${1:-3000}"
API_PORT="${2:-3001}"
echo "=== BADGR QUICK CHECK — frontend:$FRONTEND_PORT api:$API_PORT ==="

pid=$(ss -ltnp 2>/dev/null | grep ":$API_PORT" | sed -E 's/.*pid=([0-9]+).*/\1/')
if [[ -z "$pid" ]]; then
  echo "API not listening on :$API_PORT"
else
  echo "API PID: $pid"
  echo "Cmd: $(ps -p $pid -o cmd=)"
  echo "CWD: $(readlink -f /proc/$pid/cwd)"
  echo "--- ENV (stripe/port/node_env) ---"
  sudo tr '\0' '\n' < /proc/$pid/environ 2>/dev/null | egrep -i 'STRIPE|PORT|NODE_ENV' || echo "No matching env vars or permission denied"
fi

echo "--- ROUTES (quick grep) ---"
grep -R --line-number -E "app\.get|app\.post|express\.Router|router\.get|router\.post" src 2>/dev/null | sed -n '1,40p' || echo "No routes found in src (or non-standard structure)"

echo "--- PROBE ---"
for ep in "/" "/health" "/api" "/api/stripe/create"; do
  printf "%-20s -> " "$ep"
  curl -s -o /dev/null -w "%{http_code} (%{time_total}s)\n" "http://localhost:${API_PORT}${ep}" || echo "curl failed"
done

echo "--- FRONTEND CHECK ---"
printf "frontend :%s -> " "$FRONTEND_PORT"
ss -ltnp 2>/dev/null | grep ":$FRONTEND_PORT" >/dev/null && echo "LISTEN" || echo "not listening"

echo "Done."

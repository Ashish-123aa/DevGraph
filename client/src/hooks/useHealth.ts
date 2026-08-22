import { useEffect, useState } from "react";
import { getHealth } from "../api/health";

export type DbStatus = "checking" | "connected" | "offline";

export function useHealth(pollIntervalMs = 30_000): DbStatus {
  const [status, setStatus] = useState<DbStatus>("checking");

  useEffect(() => {
    let cancelled = false;

    async function check() {
      try {
        const result = await getHealth();
        if (!cancelled) setStatus(result.database === "connected" ? "connected" : "offline");
      } catch {
        if (!cancelled) setStatus("offline");
      }
    }

    check();
    const interval = setInterval(check, pollIntervalMs);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [pollIntervalMs]);

  return status;
}

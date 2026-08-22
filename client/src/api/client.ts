const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5000";

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

interface RequestOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown;
  signal?: AbortSignal;
}

/**
 * A single fetch wrapper every api/*.ts module goes through. Normalizes
 * errors into ApiError so the UI can show a consistent, friendly message
 * instead of a raw network exception.
 */
export async function apiFetch<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = "GET", body, signal } = options;

  let response: Response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      method,
      headers: body ? { "Content-Type": "application/json" } : undefined,
      body: body ? JSON.stringify(body) : undefined,
      signal,
    });
  } catch (err) {
    throw new ApiError(
      "We couldn't reach the DevGraph server. Check your connection and try again.",
      0
    );
  }

  let payload: any = null;
  try {
    payload = await response.json();
  } catch {
    // Non-JSON response (e.g. a proxy error page) - fall through with null payload.
  }

  if (!response.ok) {
    const message =
      payload?.error ?? "We couldn't connect to the graph database. Please try again.";
    throw new ApiError(message, response.status);
  }

  return payload as T;
}

export function buildQuery(params: Record<string, string | number | undefined>): string {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== "") search.set(key, String(value));
  }
  const qs = search.toString();
  return qs ? `?${qs}` : "";
}

import { vi } from "vitest";

interface FakeRecord {
  get: (key: string) => unknown;
}

function toRecord(row: Record<string, unknown>): FakeRecord {
  return { get: (key: string) => row[key] };
}

/**
 * Returns a fake session whose run() always resolves with the given rows,
 * regardless of which query text was passed. Good enough for unit-testing
 * service logic without a live database. For tests where different calls
 * need different results, pass a function instead of an array.
 */
export function fakeSession(rowsOrFn: Record<string, unknown>[] | ((query: string) => Record<string, unknown>[])) {
  return {
    run: vi.fn(async (query: string) => {
      const rows = typeof rowsOrFn === "function" ? rowsOrFn(query) : rowsOrFn;
      return { records: rows.map(toRecord) };
    }),
    close: vi.fn(async () => undefined),
  };
}

import neo4j, { Driver } from "neo4j-driver";
import { env } from "../config/env";

/**
 * A single, reusable Neo4j driver instance talks to CognoDB over Bolt.
 * The driver itself manages an internal connection pool, so it should be
 * created once per process and shared across all requests - never per-request.
 */
let driver: Driver | null = null;

export function createDriver(): Driver {
  if (driver) return driver;

  driver = neo4j.driver(
    env.cognodbUri,
    neo4j.auth.basic(env.cognodbUsername, env.cognodbPassword),
    {
      maxConnectionPoolSize: 20,
      connectionAcquisitionTimeout: 10_000,
      maxTransactionRetryTime: 15_000,
      // This is a demo/analytics-style app (counts, difficulty ranks, etc.),
      // not a financial system - plain JS numbers are fine and much easier
      // to work with on the frontend than neo4j's lossless Integer type.
      disableLosslessIntegers: true,
    }
  );

  return driver;
}

export function getDriver(): Driver {
  if (!driver) {
    throw new Error("Driver has not been created yet. Call createDriver() during startup.");
  }
  return driver;
}

/**
 * Verifies CognoDB is reachable. Never throws - callers decide how to react
 * (e.g. the health endpoint reports "unavailable" instead of crashing).
 */
export async function verifyConnection(): Promise<boolean> {
  try {
    const d = getDriver();
    await d.verifyConnectivity();
    return true;
  } catch (err) {
    // Never log credentials - just the failure itself.
    console.error("CognoDB connectivity check failed:", (err as Error).message);
    return false;
  }
}

export async function closeDriver(): Promise<void> {
  if (driver) {
    await driver.close();
    driver = null;
  }
}

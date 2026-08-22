import { Session } from "neo4j-driver";
import { getDriver } from "./driver";

/**
 * Runs `work` inside a fresh session and guarantees the session is closed
 * afterwards, even if `work` throws. This is the only place in the codebase
 * that should call driver.session() directly - every service goes through
 * withSession() so sessions can never leak.
 */
export async function withSession<T>(work: (session: Session) => Promise<T>): Promise<T> {
  const session = getDriver().session();
  try {
    return await work(session);
  } finally {
    await session.close();
  }
}

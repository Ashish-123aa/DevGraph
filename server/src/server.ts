import { createApp } from "./app";
import { env } from "./config/env";
import { closeDriver, createDriver, verifyConnection } from "./db/driver";

async function main() {
  createDriver();

  const connected = await verifyConnection();
  if (connected) {
    console.log("Connected to CognoDB.");
  } else {
    // Do not crash - the API should stay up and report "unavailable" via
    // /api/health so the frontend can show a graceful offline state
    // instead of the whole app failing to boot.
    console.warn(
      "Could not verify a CognoDB connection at startup. The server will still start; " +
        "/api/health will report the database as unavailable until it's reachable."
    );
  }

  const app = createApp();
  const server = app.listen(env.port, () => {
    console.log(`DevGraph API listening on port ${env.port} (${env.nodeEnv})`);
  });

  const shutdown = async (signal: string) => {
    console.log(`Received ${signal}, shutting down gracefully...`);
    server.close(async () => {
      await closeDriver();
      process.exit(0);
    });
  };

  process.on("SIGINT", () => shutdown("SIGINT"));
  process.on("SIGTERM", () => shutdown("SIGTERM"));
}

main().catch((err) => {
  console.error("Fatal error during startup:", err.message);
  process.exit(1);
});

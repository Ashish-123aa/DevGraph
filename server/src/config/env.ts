import "dotenv/config";

interface EnvConfig {
  port: number;
  nodeEnv: "development" | "production" | "test";
  cognodbUri: string;
  cognodbUsername: string;
  cognodbPassword: string;
  corsOrigin: string;
}

function required(name: string): string {
  const value = process.env[name];
  if (!value || value.trim().length === 0) {
    throw new Error(
      `Missing required environment variable: ${name}. Copy server/.env.example to server/.env and fill it in.`
    );
  }
  return value;
}

function loadEnv(): EnvConfig {
  // In test mode we allow missing DB credentials since the DB is mocked.
  const isTest = process.env.NODE_ENV === "test";

  return {
    port: Number(process.env.PORT ?? 5000),
    nodeEnv: (process.env.NODE_ENV as EnvConfig["nodeEnv"]) ?? "development",
    cognodbUri: isTest ? process.env.COGNODB_URI ?? "bolt://mock" : required("COGNODB_URI"),
    cognodbUsername: isTest
      ? process.env.COGNODB_USERNAME ?? "mock"
      : required("COGNODB_USERNAME"),
    cognodbPassword: isTest
      ? process.env.COGNODB_PASSWORD ?? "mock"
      : required("COGNODB_PASSWORD"),
    corsOrigin: process.env.CORS_ORIGIN ?? "http://localhost:5173",
  };
}

export const env = loadEnv();

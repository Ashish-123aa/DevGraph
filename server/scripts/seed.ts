import "dotenv/config";
import neo4j, { Driver } from "neo4j-driver";
import { skills } from "./data/skills";
import { technologies } from "./data/technologies";
import { projects } from "./data/projects";
import { jobRoles } from "./data/jobRoles";
import { companies } from "./data/companies";
import { resources } from "./data/resources";
import { developers } from "./data/developers";
import { relationshipsForDeveloper } from "./data/developerTracks";
import * as rel from "./data/relationships";

const REQUIRED_ENV = ["COGNODB_URI", "COGNODB_USERNAME", "COGNODB_PASSWORD"];

function assertEnv() {
  const missing = REQUIRED_ENV.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variable(s): ${missing.join(", ")}. ` +
        `Copy server/.env.example to server/.env and fill in your CognoDB credentials.`
    );
  }
}

const NODE_LABELS = ["Developer", "Skill", "Technology", "Project", "JobRole", "Company", "Resource"];

async function createConstraints(driver: Driver) {
  const session = driver.session();
  try {
    console.log("Creating constraints...");
    for (const label of NODE_LABELS) {
      // IF NOT EXISTS keeps this safe to re-run.
      await session.run(
        `CREATE CONSTRAINT ${label.toLowerCase()}_id_unique IF NOT EXISTS
         FOR (n:${label}) REQUIRE n.id IS UNIQUE`
      );
    }
  } finally {
    await session.close();
  }
}

/**
 * Clears only nodes carrying one of DevGraph's own labels, rather than
 * running a blanket MATCH (n) DETACH DELETE n. Safe to re-run against an
 * instance that might (in principle) hold other data.
 */
async function clearSeedData(driver: Driver) {
  const session = driver.session();
  try {
    console.log("Clearing existing DevGraph seed data...");
    for (const label of NODE_LABELS) {
      await session.run(`MATCH (n:${label}) DETACH DELETE n`);
    }
  } finally {
    await session.close();
  }
}

async function createNodes(
  driver: Driver,
  label: string,
  items: Record<string, unknown>[],
  progressLabel: string
) {
  const session = driver.session();
  try {
    console.log(`Creating ${progressLabel}...`);
    await session.run(
      `UNWIND $items AS item
       CREATE (n:${label})
       SET n = item`,
      { items }
    );
    console.log(`  -> ${items.length} ${progressLabel} created.`);
  } finally {
    await session.close();
  }
}

/**
 * Creates one relationship type at a time via UNWIND over an array of
 * {fromId, toId} pairs. The relationship type is interpolated because
 * Cypher does not allow parameterizing relationship types - but it is
 * always one of a fixed, hardcoded set of type names below, never
 * user-supplied text.
 */
async function createRelationships(
  driver: Driver,
  fromLabel: string,
  relType: string,
  toLabel: string,
  pairs: [string, string][]
) {
  if (pairs.length === 0) return;
  const session = driver.session();
  try {
    const items = pairs.map(([fromId, toId]) => ({ fromId, toId }));
    await session.run(
      `UNWIND $items AS pair
       MATCH (a:${fromLabel} {id: pair.fromId})
       MATCH (b:${toLabel} {id: pair.toId})
       MERGE (a)-[:${relType}]->(b)`,
      { items }
    );
    console.log(`  -> ${pairs.length} (:${fromLabel})-[:${relType}]->(:${toLabel}) relationships created.`);
  } finally {
    await session.close();
  }
}

async function createDeveloperRelationships(driver: Driver) {
  console.log("Creating developer relationships (KNOWS / USES / BUILT)...");
  const knows: [string, string][] = [];
  const uses: [string, string][] = [];
  const built: [string, string][] = [];

  for (const dev of developers) {
    const profile = relationshipsForDeveloper(dev.track, dev.experienceLevel);
    for (const skillId of profile.skills) knows.push([dev.id, skillId]);
    for (const techId of profile.technologies) uses.push([dev.id, techId]);
    for (const projectId of profile.projects) built.push([dev.id, projectId]);
  }

  await createRelationships(driver, "Developer", "KNOWS", "Skill", knows);
  await createRelationships(driver, "Developer", "USES", "Technology", uses);
  await createRelationships(driver, "Developer", "BUILT", "Project", built);

  return knows.length + uses.length + built.length;
}

async function main() {
  console.log("Connecting to CognoDB...");
  assertEnv();

  const driver = neo4j.driver(
    process.env.COGNODB_URI!,
    neo4j.auth.basic(process.env.COGNODB_USERNAME!, process.env.COGNODB_PASSWORD!),
    { disableLosslessIntegers: true }
  );

  try {
    await driver.verifyConnectivity();
    console.log("Connected successfully.\n");

    await createConstraints(driver);
    await clearSeedData(driver);

    console.log("");
    await createNodes(driver, "Skill", skills as unknown as Record<string, unknown>[], "skills");
    await createNodes(driver, "Technology", technologies as unknown as Record<string, unknown>[], "technologies");
    await createNodes(driver, "Project", projects as unknown as Record<string, unknown>[], "projects");
    await createNodes(driver, "JobRole", jobRoles as unknown as Record<string, unknown>[], "job roles");
    await createNodes(driver, "Company", companies as unknown as Record<string, unknown>[], "companies");
    await createNodes(driver, "Resource", resources as unknown as Record<string, unknown>[], "resources");

    // Developers are stored without the `track` field - it only exists to
    // drive relationship generation below.
    const developerNodes = developers.map(({ track, ...rest }) => rest);
    await createNodes(driver, "Developer", developerNodes, "developers");

    console.log("\nCreating relationships...");
    let relCount = 0;

    relCount += await countAnd(createRelationships(driver, "Skill", "RELATED_TO", "Skill", rel.skillRelatedTo), rel.skillRelatedTo);
    relCount += await countAnd(createRelationships(driver, "Skill", "PREREQUISITE_FOR", "Skill", rel.skillPrerequisiteFor), rel.skillPrerequisiteFor);
    relCount += await countAnd(createRelationships(driver, "Skill", "ENABLES", "Technology", rel.skillEnablesTechnology), rel.skillEnablesTechnology);
    relCount += await countAnd(createRelationships(driver, "Technology", "COMPLEMENTS", "Technology", rel.technologyComplements), rel.technologyComplements);
    relCount += await countAnd(createRelationships(driver, "Skill", "REQUIRED_FOR", "JobRole", rel.skillRequiredForRole), rel.skillRequiredForRole);
    relCount += await countAnd(createRelationships(driver, "Technology", "COMMONLY_USED_IN", "JobRole", rel.technologyCommonlyUsedInRole), rel.technologyCommonlyUsedInRole);
    relCount += await countAnd(createRelationships(driver, "Project", "DEMONSTRATES", "Skill", rel.projectDemonstratesSkill), rel.projectDemonstratesSkill);
    relCount += await countAnd(createRelationships(driver, "Technology", "USED_IN", "Project", rel.technologyUsedInProject), rel.technologyUsedInProject);
    relCount += await countAnd(createRelationships(driver, "Project", "RELEVANT_TO", "JobRole", rel.projectRelevantToRole), rel.projectRelevantToRole);
    relCount += await countAnd(createRelationships(driver, "Company", "HIRES_FOR", "JobRole", rel.companyHiresForRole), rel.companyHiresForRole);
    relCount += await countAnd(createRelationships(driver, "Company", "USES", "Technology", rel.companyUsesTechnology), rel.companyUsesTechnology);
    relCount += await countAnd(createRelationships(driver, "Resource", "TEACHES", "Skill", rel.resourceTeachesSkill), rel.resourceTeachesSkill);
    relCount += await countAnd(createRelationships(driver, "Resource", "TEACHES_TECHNOLOGY", "Technology", rel.resourceTeachesTechnology), rel.resourceTeachesTechnology);

    relCount += await createDeveloperRelationships(driver);

    const nodeCount =
      skills.length +
      technologies.length +
      projects.length +
      jobRoles.length +
      companies.length +
      resources.length +
      developers.length;

    console.log("\nSeed completed successfully.\n");
    console.log(`Nodes created: ${nodeCount}`);
    console.log(`Relationships created: ${relCount}`);
  } catch (err) {
    console.error("\nSeed failed:", (err as Error).message);
    process.exitCode = 1;
  } finally {
    await driver.close();
  }
}

/** Small helper so each createRelationships call can contribute to the running total inline. */
async function countAnd<T>(promise: Promise<T>, pairs: unknown[]): Promise<number> {
  await promise;
  return pairs.length;
}

main();

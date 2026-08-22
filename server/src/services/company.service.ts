import { withSession } from "../db/session";
import { COMPANIES_FOR_TECHNOLOGY, COMPANY_DETAIL } from "../../queries/company.cypher";
import { NotFoundError, ValidationError } from "../utils/types";

export interface CompanyMatch {
  id: string;
  props: Record<string, unknown>;
  roles: { id: string; title: string }[];
}

export async function findCompaniesForTechnology(technology: string): Promise<CompanyMatch[]> {
  if (!technology) throw new ValidationError("A technology name is required.");
  return withSession(async (session) => {
    const check = await session.run(`MATCH (t:Technology {name: $technology}) RETURN t`, {
      technology,
    });
    if (check.records.length === 0) {
      throw new NotFoundError(`Unknown technology "${technology}".`);
    }
    const result = await session.run(COMPANIES_FOR_TECHNOLOGY, { technology });
    return result.records.map((r) => ({
      id: r.get("id"),
      props: r.get("props"),
      roles: (r.get("roles") as { id: string; title: string }[]).filter((role) => role.id),
    }));
  });
}

export async function getCompanyDetail(id: string) {
  return withSession(async (session) => {
    const result = await session.run(COMPANY_DETAIL, { id });
    const record = result.records[0];
    if (!record || !record.get("props")) {
      throw new NotFoundError(`No company found with id ${id}`);
    }
    return {
      props: record.get("props"),
      technologies: (record.get("technologies") as { id: string; name: string }[]).filter(
        (t) => t.id
      ),
      roles: (record.get("roles") as { id: string; title: string }[]).filter((r) => r.id),
    };
  });
}

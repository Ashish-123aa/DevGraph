import { ArrowRight, Database, GitBranch, Sparkles } from "lucide-react";
import { Legend } from "../components/Legend";

const CHAIN = ["Developer", "Skill", "Prerequisite Skill", "Technology", "Project", "Job Role"];

function ReasonCard({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Database;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="card p-5">
      <div className="mb-2 flex items-center gap-2">
        <Icon className="h-4 w-4 text-accent" />
        <h3 className="text-sm font-semibold text-text-primary">{title}</h3>
      </div>
      <p className="text-sm leading-relaxed text-text-muted">{children}</p>
    </div>
  );
}

export function AboutPage() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8 pb-8">
      <div>
        <h1 className="text-xl font-semibold text-text-primary">Why DevGraph uses a graph database</h1>
        <p className="mt-2 text-sm leading-relaxed text-text-muted">
          DevGraph is relationship-first. Its most useful questions - "how does my current skill
          connect to a target job?", "what should I learn next?", "which projects would prove I'm
          ready?" - are all questions about paths and connections, not isolated records.
        </p>
      </div>

      <div className="card p-5">
        <p className="label-mono mb-3">A traversal DevGraph answers directly</p>
        <div className="flex flex-wrap items-center gap-2">
          {CHAIN.map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <span className="rounded-full border border-border bg-bg px-3 py-1.5 text-sm text-text-primary">
                {step}
              </span>
              {i < CHAIN.length - 1 && <ArrowRight className="h-3.5 w-3.5 text-text-muted" />}
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-text-muted">
          "Find all career paths from a developer's current skills to a target job role, through
          related skills, prerequisite skills, and technologies" - a single variable-length
          traversal in CognoDB, expressed directly in the Career Path and Skill Gap pages.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <ReasonCard icon={GitBranch} title="Relationships are first-class data">
          Skills, technologies, projects, roles, and companies matter primarily because of how
          they connect - not as isolated rows. The graph stores that connection directly, as a
          typed, queryable relationship.
        </ReasonCard>
        <ReasonCard icon={Sparkles} title="Variable-depth traversal">
          "How does Java connect to a Backend Engineer role?" can take two hops or five, depending
          on the developer. Cypher's variable-length path syntax expresses that without knowing
          the depth in advance.
        </ReasonCard>
        <ReasonCard icon={Database} title="Recommendations from structure">
          "What should I learn next?" is answered by walking outward from what a developer already
          knows - the recommendation falls out of the graph's shape rather than a hand-maintained
          rules table.
        </ReasonCard>
      </div>

      <div className="card p-5">
        <p className="label-mono mb-3">The same question in a relational database</p>
        <p className="text-sm leading-relaxed text-text-muted">
          A relational implementation of career-path traversal needs junction tables for every
          many-to-many relationship - <code className="text-text-primary">developer_skills</code>,{" "}
          <code className="text-text-primary">skill_technologies</code>,{" "}
          <code className="text-text-primary">project_skills</code>,{" "}
          <code className="text-text-primary">job_role_skills</code>,{" "}
          <code className="text-text-primary">company_technologies</code>, and more - plus a chain
          of joins across them. A two-hop path and a five-hop path require different, hand-written
          queries, and each new relationship type means another table and another join. The graph
          model represents the same information as direct relationships, so the traversal depth is
          a query parameter, not a schema change.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-text-muted">
          To be clear: this isn't a claim that graph databases are always faster than relational
          ones. It's that DevGraph's relationship-heavy questions are more natural to express, and
          easier to evolve, as graph traversals.
        </p>
      </div>

      <div className="card p-5">
        <p className="label-mono mb-3">Entity legend</p>
        <Legend />
      </div>
    </div>
  );
}

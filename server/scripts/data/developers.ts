export type DeveloperTrack =
  | "backend_java"
  | "backend_node"
  | "backend_python"
  | "frontend_react"
  | "fullstack"
  | "devops"
  | "data_engineer";

export interface DeveloperSeed {
  id: string;
  name: string;
  experienceLevel: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  location: string;
  bio: string;
  /** Not persisted to CognoDB - used only by the seed script to assign coherent relationships. */
  track: DeveloperTrack;
}

export const developers: DeveloperSeed[] = [
  { id: "dev_001", name: "Aarav Sharma", experienceLevel: "Intermediate", location: "Bangalore, India", bio: "Backend-focused software engineer building payments infrastructure.", track: "backend_java" },
  { id: "dev_002", name: "Priya Nair", experienceLevel: "Advanced", location: "Bangalore, India", bio: "Full stack developer who enjoys owning features end to end.", track: "fullstack" },
  { id: "dev_003", name: "Rohan Mehta", experienceLevel: "Beginner", location: "Pune, India", bio: "Recently transitioned into software from a mechanical engineering background.", track: "frontend_react" },
  { id: "dev_004", name: "Ananya Iyer", experienceLevel: "Advanced", location: "Hyderabad, India", bio: "Platform engineer focused on developer tooling and CI/CD.", track: "devops" },
  { id: "dev_005", name: "Vikram Singh", experienceLevel: "Expert", location: "Delhi, India", bio: "Staff engineer specializing in distributed systems at scale.", track: "backend_java" },
  { id: "dev_006", name: "Sara Ahmed", experienceLevel: "Intermediate", location: "Karachi, Pakistan", bio: "Data engineer building pipelines for analytics teams.", track: "data_engineer" },
  { id: "dev_007", name: "Daniel Kim", experienceLevel: "Advanced", location: "Seoul, South Korea", bio: "Backend engineer with a focus on Node.js microservices.", track: "backend_node" },
  { id: "dev_008", name: "Emily Chen", experienceLevel: "Intermediate", location: "San Francisco, USA", bio: "Frontend engineer passionate about accessible design systems.", track: "frontend_react" },
  { id: "dev_009", name: "Lucas Ferreira", experienceLevel: "Beginner", location: "São Paulo, Brazil", bio: "Junior developer learning full stack development through side projects.", track: "fullstack" },
  { id: "dev_010", name: "Mei Tanaka", experienceLevel: "Advanced", location: "Tokyo, Japan", bio: "Cloud engineer specializing in Kubernetes-based platforms.", track: "devops" },
  { id: "dev_011", name: "Omar El-Sayed", experienceLevel: "Intermediate", location: "Cairo, Egypt", bio: "Backend developer working with Python and FastAPI services.", track: "backend_python" },
  { id: "dev_012", name: "Isabella Rossi", experienceLevel: "Advanced", location: "Milan, Italy", bio: "Senior frontend engineer leading a component library initiative.", track: "frontend_react" },
  { id: "dev_013", name: "Noah Williams", experienceLevel: "Expert", location: "London, UK", bio: "Principal engineer focused on reliability and observability.", track: "devops" },
  { id: "dev_014", name: "Fatima Zahra", experienceLevel: "Beginner", location: "Casablanca, Morocco", bio: "New graduate exploring backend development with Java.", track: "backend_java" },
  { id: "dev_015", name: "Ethan Brown", experienceLevel: "Intermediate", location: "Toronto, Canada", bio: "Full stack developer building internal tools.", track: "fullstack" },
  { id: "dev_016", name: "Grace Park", experienceLevel: "Advanced", location: "Seattle, USA", bio: "Data engineer maintaining large-scale ingestion pipelines.", track: "data_engineer" },
  { id: "dev_017", name: "Youssef Benali", experienceLevel: "Intermediate", location: "Tunis, Tunisia", bio: "Backend developer building APIs with Node.js and Express.", track: "backend_node" },
  { id: "dev_018", name: "Hannah Müller", experienceLevel: "Advanced", location: "Berlin, Germany", bio: "Senior software engineer with a focus on distributed systems.", track: "backend_java" },
  { id: "dev_019", name: "Ravi Kumar", experienceLevel: "Intermediate", location: "Chennai, India", bio: "Frontend engineer specializing in React performance.", track: "frontend_react" },
  { id: "dev_020", name: "Chloe Dubois", experienceLevel: "Beginner", location: "Paris, France", bio: "Bootcamp graduate starting a career in full stack development.", track: "fullstack" },
];

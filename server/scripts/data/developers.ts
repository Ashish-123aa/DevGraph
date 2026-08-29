export type DeveloperTrack =
  | "backend_java"
  | "backend_node"
  | "backend_python"
  | "frontend_react"
  | "fullstack"
  | "devops"
  | "data_engineer"
  | "mobile"
  | "ml_engineer";

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
  ...generateDevelopers(280, 20),
];

/**
 * The 20 developers above are hand-written for flavor and used in examples
 * elsewhere. The rest are generated deterministically from realistic
 * name/location pools, cycling evenly through every track (including the
 * newer "mobile" and "ml_engineer" tracks) and every experience level, so
 * the graph has enough Developer nodes - and enough KNOWS/USES/BUILT
 * relationships - to visualize meaningfully without hand-authoring
 * hundreds of individual bios. Every generated developer still gets a
 * coherent, logical set of relationships via relationshipsForDeveloper()
 * in developerTracks.ts - nothing here is random or meaningless, only the
 * name/location/bio flavor text is templated.
 */
function generateDevelopers(count: number, startIndex: number): DeveloperSeed[] {
  const FIRST_NAMES = [
    "Liam", "Olivia", "Noah", "Emma", "Arjun", "Sofia", "Kenji", "Mia", "Diego", "Zara",
    "Wei", "Ingrid", "Karim", "Yuki", "Elena", "Tariq", "Anika", "Mateo", "Nadia", "Felix",
    "Amara", "Hiro", "Leila", "Bruno", "Sana", "Oscar", "Priyanka", "Luca", "Chidi", "Freya",
    "Jamal", "Ines", "Kwame", "Mira", "Santiago", "Aiko", "Rafael", "Layla", "Dmitri", "Chiara",
    "Malik", "Petra", "Ahmad", "Naomi", "Viktor", "Amina", "Theo", "Sakura", "Emeka", "Lucia",
  ];
  const LAST_NAMES = [
    "Johansson", "Silva", "Patel", "Kowalski", "Yamamoto", "Ndiaye", "Fernandez", "Novak", "Haddad", "Rossi",
    "Kim", "Andersen", "Popescu", "Osei", "Ivanov", "Costa", "Nakamura", "Hassan", "Dubois", "Lindqvist",
    "Almeida", "Choi", "Baptiste", "Wojcik", "Farooq", "Moreau", "Sato", "Adeyemi", "Petrov", "Karlsson",
    "Mendes", "Okafor", "Lindgren", "Botha", "Suzuki", "Rahman", "Kovac", "Larsen", "Diallo", "Cruz",
    "Berg", "Nakagawa", "Schmidt", "Ojo", "Volkov", "Marchetti", "Hoang", "Reyes", "Eriksson", "Abara",
  ];
  const LOCATIONS = [
    "Bangalore, India", "Singapore", "Dublin, Ireland", "Warsaw, Poland", "Nairobi, Kenya",
    "Mexico City, Mexico", "Jakarta, Indonesia", "Lagos, Nigeria", "Stockholm, Sweden", "Ho Chi Minh City, Vietnam",
    "Buenos Aires, Argentina", "Amsterdam, Netherlands", "Tel Aviv, Israel", "Manila, Philippines", "Nairobi, Kenya",
    "Krakow, Poland", "Vancouver, Canada", "Austin, USA", "Melbourne, Australia", "Barcelona, Spain",
    "Lisbon, Portugal", "Zurich, Switzerland", "Bangkok, Thailand", "Accra, Ghana", "Bucharest, Romania",
    "Prague, Czechia", "Kuala Lumpur, Malaysia", "Cape Town, South Africa", "Helsinki, Finland", "Auckland, New Zealand",
  ];
  const EXPERIENCE_LEVELS: DeveloperSeed["experienceLevel"][] = [
    "Beginner",
    "Intermediate",
    "Intermediate",
    "Advanced",
    "Advanced",
    "Expert",
  ];
  const TRACKS: DeveloperTrack[] = [
    "backend_java",
    "backend_node",
    "backend_python",
    "frontend_react",
    "fullstack",
    "devops",
    "data_engineer",
    "mobile",
    "ml_engineer",
  ];
  const BIO_TEMPLATES: Record<DeveloperTrack, string[]> = {
    backend_java: [
      "Backend engineer focused on building reliable Java services.",
      "Enjoys designing clean APIs and well-tested backend systems.",
    ],
    backend_node: [
      "Node.js developer who likes building fast, async services.",
      "Backend engineer working mostly in the Node.js ecosystem.",
    ],
    backend_python: [
      "Python developer building APIs and data-facing services.",
      "Backend engineer with a preference for Python tooling.",
    ],
    frontend_react: [
      "Frontend engineer who cares about accessible, polished UI.",
      "React developer focused on performant, maintainable interfaces.",
    ],
    fullstack: [
      "Full stack developer comfortable owning a feature end to end.",
      "Generalist engineer who moves fluidly between frontend and backend.",
    ],
    devops: [
      "DevOps engineer focused on reliable, automated infrastructure.",
      "Platform-minded engineer who enjoys CI/CD and observability work.",
    ],
    data_engineer: [
      "Data engineer building pipelines that keep analytics teams unblocked.",
      "Enjoys designing resilient data ingestion and storage systems.",
    ],
    mobile: [
      "Mobile engineer building native and cross-platform apps.",
      "Focused on smooth, responsive mobile user experiences.",
    ],
    ml_engineer: [
      "ML engineer who enjoys turning data into deployed models.",
      "Works at the intersection of data science and production systems.",
    ],
  };

  const generated: DeveloperSeed[] = [];
  for (let i = 0; i < count; i++) {
    const globalIndex = startIndex + i;
    const firstName = FIRST_NAMES[globalIndex % FIRST_NAMES.length]!;
    const lastName = LAST_NAMES[(globalIndex * 7 + 3) % LAST_NAMES.length]!;
    const location = LOCATIONS[(globalIndex * 5 + 1) % LOCATIONS.length]!;
    const experienceLevel = EXPERIENCE_LEVELS[globalIndex % EXPERIENCE_LEVELS.length]!;
    const track = TRACKS[globalIndex % TRACKS.length]!;
    const bios = BIO_TEMPLATES[track];
    const bio = bios[globalIndex % bios.length]!;

    generated.push({
      id: `dev_${String(globalIndex + 1).padStart(3, "0")}`,
      name: `${firstName} ${lastName}`,
      experienceLevel,
      location,
      bio,
      track,
    });
  }
  return generated;
}
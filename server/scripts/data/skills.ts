export interface SkillSeed {
  id: string;
  name: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  description: string;
}

export const skills: SkillSeed[] = [
  // --- Fundamentals ---
  { id: "skill_programming_fundamentals", name: "Programming Fundamentals", category: "Fundamentals", difficulty: "Beginner", description: "Variables, control flow, functions, and basic problem solving." },
  { id: "skill_data_structures", name: "Data Structures", category: "Fundamentals", difficulty: "Intermediate", description: "Arrays, linked lists, trees, graphs, hash maps, and when to use each." },
  { id: "skill_algorithms", name: "Algorithms", category: "Fundamentals", difficulty: "Intermediate", description: "Sorting, searching, recursion, and complexity analysis." },
  { id: "skill_oop_design", name: "Object-Oriented Design", category: "Fundamentals", difficulty: "Intermediate", description: "Encapsulation, inheritance, polymorphism, and SOLID principles." },
  { id: "skill_system_design", name: "System Design", category: "Fundamentals", difficulty: "Advanced", description: "Designing scalable, reliable systems: load balancing, caching, sharding." },
  { id: "skill_git", name: "Git", category: "Fundamentals", difficulty: "Beginner", description: "Version control workflows, branching strategies, and collaboration." },

  // --- Programming Languages ---
  { id: "skill_java", name: "Java", category: "Programming Languages", difficulty: "Intermediate", description: "General-purpose, JVM-based object-oriented language widely used in backend systems." },
  { id: "skill_javascript", name: "JavaScript", category: "Programming Languages", difficulty: "Beginner", description: "The core scripting language of the web, also used server-side via Node.js." },
  { id: "skill_typescript", name: "TypeScript", category: "Programming Languages", difficulty: "Intermediate", description: "A statically typed superset of JavaScript." },
  { id: "skill_python", name: "Python", category: "Programming Languages", difficulty: "Beginner", description: "A readable, general-purpose language popular in backend, data, and scripting work." },
  { id: "skill_go", name: "Go", category: "Programming Languages", difficulty: "Intermediate", description: "A compiled, concurrency-friendly language often used for infrastructure tooling." },
  { id: "skill_sql", name: "SQL", category: "Data", difficulty: "Beginner", description: "The standard language for querying and managing relational databases." },

  // --- Backend ---
  { id: "skill_rest_apis", name: "REST APIs", category: "Backend", difficulty: "Intermediate", description: "Designing and consuming resource-oriented HTTP APIs." },
  { id: "skill_graphql", name: "GraphQL", category: "Backend", difficulty: "Intermediate", description: "A query language for APIs that lets clients request exactly the data they need." },
  { id: "skill_microservices", name: "Microservices", category: "Backend", difficulty: "Advanced", description: "Decomposing applications into independently deployable services." },
  { id: "skill_auth", name: "Authentication & Authorization", category: "Backend", difficulty: "Intermediate", description: "Identity, sessions, tokens (JWT/OAuth), and access control." },
  { id: "skill_message_queues", name: "Message Queues", category: "Backend", difficulty: "Advanced", description: "Asynchronous communication between services via queues and event streams." },

  // --- Frontend ---
  { id: "skill_html_css", name: "HTML & CSS", category: "Frontend", difficulty: "Beginner", description: "Structuring and styling web content." },
  { id: "skill_react_dev", name: "React Development", category: "Frontend", difficulty: "Intermediate", description: "Building component-based user interfaces with React." },
  { id: "skill_state_management", name: "State Management", category: "Frontend", difficulty: "Intermediate", description: "Managing shared application state across components." },
  { id: "skill_responsive_design", name: "Responsive Design", category: "Frontend", difficulty: "Beginner", description: "Building layouts that adapt across screen sizes." },
  { id: "skill_accessibility", name: "Web Accessibility", category: "Frontend", difficulty: "Intermediate", description: "Building interfaces usable by people with a wide range of abilities." },

  // --- Data ---
  { id: "skill_database_design", name: "Database Design", category: "Data", difficulty: "Intermediate", description: "Modeling entities, relationships, and schemas for relational systems." },
  { id: "skill_nosql_modeling", name: "NoSQL Data Modeling", category: "Data", difficulty: "Intermediate", description: "Modeling data for document, key-value, and wide-column stores." },
  { id: "skill_data_pipelines", name: "Data Pipelines", category: "Data", difficulty: "Advanced", description: "Building ETL/ELT pipelines to move and transform data reliably." },
  { id: "skill_data_warehousing", name: "Data Warehousing", category: "Data", difficulty: "Advanced", description: "Structuring analytical stores for large-scale reporting and BI." },

  // --- DevOps / Cloud ---
  { id: "skill_containerization", name: "Containerization", category: "DevOps", difficulty: "Intermediate", description: "Packaging applications and dependencies into portable containers." },
  { id: "skill_cicd", name: "CI/CD", category: "DevOps", difficulty: "Intermediate", description: "Automating build, test, and deployment pipelines." },
  { id: "skill_iac", name: "Infrastructure as Code", category: "DevOps", difficulty: "Advanced", description: "Managing infrastructure through versioned, declarative configuration." },
  { id: "skill_cloud_fundamentals", name: "Cloud Fundamentals", category: "Cloud", difficulty: "Beginner", description: "Core concepts of cloud compute, storage, and networking." },
  { id: "skill_k8s_orchestration", name: "Kubernetes Orchestration", category: "DevOps", difficulty: "Advanced", description: "Deploying, scaling, and managing containerized workloads." },
  { id: "skill_observability", name: "Monitoring & Observability", category: "DevOps", difficulty: "Intermediate", description: "Metrics, logs, and traces for understanding system health." },

  // --- Testing / Security ---
  { id: "skill_automated_testing", name: "Automated Testing", category: "Testing", difficulty: "Intermediate", description: "Unit, integration, and end-to-end testing practices." },
  { id: "skill_performance_optimization", name: "Performance Optimization", category: "Testing", difficulty: "Advanced", description: "Profiling and improving application speed and resource use." },
  { id: "skill_security_fundamentals", name: "Security Fundamentals", category: "Security", difficulty: "Intermediate", description: "Common vulnerabilities and defensive coding practices." },
];

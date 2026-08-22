export interface TechnologySeed {
  id: string;
  name: string;
  category: string;
  description: string;
}

export const technologies: TechnologySeed[] = [
  { id: "tech_spring_boot", name: "Spring Boot", category: "Backend Framework", description: "A Java framework for building production-ready backend services." },
  { id: "tech_nodejs", name: "Node.js", category: "Runtime", description: "A JavaScript runtime for building fast, event-driven backend services." },
  { id: "tech_express", name: "Express", category: "Backend Framework", description: "A minimal, unopinionated web framework for Node.js." },
  { id: "tech_fastapi", name: "FastAPI", category: "Backend Framework", description: "A modern, high-performance Python web framework based on type hints." },
  { id: "tech_django", name: "Django", category: "Backend Framework", description: "A batteries-included Python web framework." },
  { id: "tech_react", name: "React", category: "Frontend Library", description: "A component-based library for building user interfaces." },
  { id: "tech_vuejs", name: "Vue.js", category: "Frontend Framework", description: "An approachable, incrementally adoptable frontend framework." },
  { id: "tech_nextjs", name: "Next.js", category: "Frontend Framework", description: "A React framework with server rendering and file-based routing." },
  { id: "tech_postgresql", name: "PostgreSQL", category: "Database", description: "A powerful, open-source relational database." },
  { id: "tech_mongodb", name: "MongoDB", category: "Database", description: "A document-oriented NoSQL database." },
  { id: "tech_redis", name: "Redis", category: "Database", description: "An in-memory key-value store used for caching and pub/sub." },
  { id: "tech_mysql", name: "MySQL", category: "Database", description: "A widely used open-source relational database." },
  { id: "tech_kafka", name: "Kafka", category: "Messaging", description: "A distributed event streaming platform." },
  { id: "tech_rabbitmq", name: "RabbitMQ", category: "Messaging", description: "A message broker implementing AMQP." },
  { id: "tech_docker", name: "Docker", category: "DevOps", description: "A platform for building and running containerized applications." },
  { id: "tech_kubernetes", name: "Kubernetes", category: "DevOps", description: "A container orchestration platform for automating deployment and scaling." },
  { id: "tech_terraform", name: "Terraform", category: "DevOps", description: "An infrastructure-as-code tool for provisioning cloud resources." },
  { id: "tech_aws", name: "AWS", category: "Cloud", description: "Amazon's cloud computing platform." },
  { id: "tech_gcp", name: "Google Cloud Platform", category: "Cloud", description: "Google's cloud computing platform." },
  { id: "tech_azure", name: "Azure", category: "Cloud", description: "Microsoft's cloud computing platform." },
  { id: "tech_jenkins", name: "Jenkins", category: "CI/CD", description: "An open-source automation server for build and deployment pipelines." },
  { id: "tech_github_actions", name: "GitHub Actions", category: "CI/CD", description: "Workflow automation built into GitHub." },
  { id: "tech_elasticsearch", name: "Elasticsearch", category: "Search & Data", description: "A distributed search and analytics engine." },
  { id: "tech_prometheus", name: "Prometheus", category: "Observability", description: "A metrics collection and alerting toolkit." },
  { id: "tech_grafana", name: "Grafana", category: "Observability", description: "A dashboarding tool for visualizing metrics and logs." },
  { id: "tech_vite", name: "Vite", category: "Build Tool", description: "A fast frontend build tool and dev server." },
  { id: "tech_jest", name: "Jest", category: "Testing Tool", description: "A JavaScript testing framework." },
  { id: "tech_nginx", name: "Nginx", category: "Infrastructure", description: "A web server, reverse proxy, and load balancer." },
];

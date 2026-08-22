export interface ResourceSeed {
  id: string;
  title: string;
  type: "Course" | "Documentation" | "Book" | "Tutorial" | "Video";
  url: string;
  description: string;
}

export const resources: ResourceSeed[] = [
  { id: "resource_mdn_js", title: "MDN JavaScript Guide", type: "Documentation", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide", description: "The canonical reference for JavaScript language features." },
  { id: "resource_mdn_html_css", title: "MDN HTML & CSS Docs", type: "Documentation", url: "https://developer.mozilla.org/en-US/docs/Learn", description: "Foundational documentation for HTML and CSS." },
  { id: "resource_freecodecamp_js", title: "freeCodeCamp: JavaScript Algorithms and Data Structures", type: "Course", url: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/", description: "A free, project-based curriculum covering core JavaScript and data structures." },
  { id: "resource_react_docs", title: "React Official Documentation", type: "Documentation", url: "https://react.dev/learn", description: "The official guide and API reference for React." },
  { id: "resource_typescript_handbook", title: "TypeScript Handbook", type: "Documentation", url: "https://www.typescriptlang.org/docs/handbook/intro.html", description: "The official guide to TypeScript's type system and features." },
  { id: "resource_nodejs_docs", title: "Node.js Official Documentation", type: "Documentation", url: "https://nodejs.org/en/docs", description: "The official Node.js API and guides." },
  { id: "resource_spring_guides", title: "Spring Boot Official Guides", type: "Documentation", url: "https://spring.io/guides", description: "Official getting-started guides for Spring Boot." },
  { id: "resource_python_docs", title: "Python Official Tutorial", type: "Documentation", url: "https://docs.python.org/3/tutorial/", description: "The official introductory tutorial for Python." },
  { id: "resource_fastapi_docs", title: "FastAPI Documentation", type: "Documentation", url: "https://fastapi.tiangolo.com/", description: "The official FastAPI documentation and tutorial." },
  { id: "resource_postgres_docs", title: "PostgreSQL Official Documentation", type: "Documentation", url: "https://www.postgresql.org/docs/", description: "The official PostgreSQL manual." },
  { id: "resource_mongodb_university", title: "MongoDB University", type: "Course", url: "https://learn.mongodb.com/", description: "Free official courses on MongoDB data modeling and operations." },
  { id: "resource_docker_docs", title: "Docker Official Documentation", type: "Documentation", url: "https://docs.docker.com/", description: "The official guide to building and running containers." },
  { id: "resource_k8s_docs", title: "Kubernetes Official Documentation", type: "Documentation", url: "https://kubernetes.io/docs/home/", description: "The official Kubernetes concepts and task guides." },
  { id: "resource_aws_training", title: "AWS Skill Builder", type: "Course", url: "https://skillbuilder.aws/", description: "Free official training on AWS services and cloud fundamentals." },
  { id: "resource_terraform_docs", title: "Terraform Official Documentation", type: "Documentation", url: "https://developer.hashicorp.com/terraform/docs", description: "The official reference for HashiCorp Terraform." },
  { id: "resource_grokking_system_design", title: "Grokking the System Design Interview", type: "Course", url: "https://www.designgurus.io/course/grokking-the-system-design-interview", description: "A widely used course covering scalable system design patterns." },
  { id: "resource_ddia_book", title: "Designing Data-Intensive Applications", type: "Book", url: "https://dataintensive.net/", description: "Martin Kleppmann's book on the principles behind modern data systems." },
  { id: "resource_clean_code_book", title: "Clean Code", type: "Book", url: "https://www.oreilly.com/library/view/clean-code-a/9780136083238/", description: "Robert C. Martin's book on writing maintainable software." },
  { id: "resource_git_book", title: "Pro Git", type: "Book", url: "https://git-scm.com/book/en/v2", description: "The free, official book covering Git from basics to internals." },
  { id: "resource_cs50", title: "CS50: Introduction to Computer Science", type: "Course", url: "https://cs50.harvard.edu/x/", description: "Harvard's popular introductory computer science course." },
  { id: "resource_kafka_docs", title: "Apache Kafka Documentation", type: "Documentation", url: "https://kafka.apache.org/documentation/", description: "The official Kafka documentation covering streaming and messaging." },
  { id: "resource_graphql_docs", title: "GraphQL Official Documentation", type: "Documentation", url: "https://graphql.org/learn/", description: "The official introduction to GraphQL concepts." },
  { id: "resource_owasp_top10", title: "OWASP Top 10", type: "Documentation", url: "https://owasp.org/www-project-top-ten/", description: "The industry-standard awareness document for web application security risks." },
  { id: "resource_testing_library_docs", title: "Testing Library Documentation", type: "Documentation", url: "https://testing-library.com/docs/", description: "Guides for writing user-centric automated tests." },
  { id: "resource_web_dev_a11y", title: "web.dev: Accessibility", type: "Tutorial", url: "https://web.dev/learn/accessibility/", description: "Google's practical guide to building accessible web interfaces." },
  { id: "resource_prometheus_docs", title: "Prometheus Official Documentation", type: "Documentation", url: "https://prometheus.io/docs/introduction/overview/", description: "The official guide to Prometheus metrics and alerting." },
  { id: "resource_grafana_docs", title: "Grafana Documentation", type: "Documentation", url: "https://grafana.com/docs/", description: "The official documentation for building Grafana dashboards." },
  { id: "resource_freecodecamp_python", title: "freeCodeCamp: Scientific Computing with Python", type: "Course", url: "https://www.freecodecamp.org/learn/scientific-computing-with-python/", description: "A free, project-based introduction to Python." },
];

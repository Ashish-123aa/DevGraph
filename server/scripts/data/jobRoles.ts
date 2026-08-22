export interface JobRoleSeed {
  id: string;
  title: string;
  level: "Entry" | "Mid" | "Senior";
  description: string;
  salaryRange: string;
}

export const jobRoles: JobRoleSeed[] = [
  { id: "role_backend_engineer", title: "Backend Engineer", level: "Mid", description: "Builds and maintains server-side services, APIs, and data access layers.", salaryRange: "$90,000 - $150,000" },
  { id: "role_frontend_engineer", title: "Frontend Engineer", level: "Mid", description: "Builds user-facing interfaces and client-side application logic.", salaryRange: "$85,000 - $145,000" },
  { id: "role_fullstack_developer", title: "Full Stack Developer", level: "Mid", description: "Works across both frontend and backend to ship complete features.", salaryRange: "$90,000 - $150,000" },
  { id: "role_devops_engineer", title: "DevOps Engineer", level: "Senior", description: "Builds CI/CD pipelines and manages deployment infrastructure.", salaryRange: "$100,000 - $165,000" },
  { id: "role_data_engineer", title: "Data Engineer", level: "Mid", description: "Builds pipelines and storage systems that move and shape data reliably.", salaryRange: "$95,000 - $155,000" },
  { id: "role_cloud_engineer", title: "Cloud Engineer", level: "Senior", description: "Designs and operates cloud infrastructure and provisioning workflows.", salaryRange: "$100,000 - $160,000" },
  { id: "role_software_engineer", title: "Software Engineer", level: "Entry", description: "A general engineering role spanning application development end to end.", salaryRange: "$80,000 - $140,000" },
  { id: "role_sre", title: "Site Reliability Engineer", level: "Senior", description: "Keeps production systems reliable, observable, and performant at scale.", salaryRange: "$110,000 - $175,000" },
  { id: "role_platform_engineer", title: "Platform Engineer", level: "Senior", description: "Builds the internal tooling and infrastructure other engineers build on.", salaryRange: "$105,000 - $170,000" },
  { id: "role_qa_automation_engineer", title: "QA Automation Engineer", level: "Mid", description: "Designs and maintains automated test suites and quality processes.", salaryRange: "$80,000 - $130,000" },
];

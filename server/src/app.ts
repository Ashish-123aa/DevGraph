import cors from "cors";
import express from "express";
import helmet from "helmet";
import { env } from "./config/env";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler";

import healthRoutes from "./routes/health.routes";
import searchRoutes from "./routes/search.routes";
import nodesRoutes from "./routes/nodes.routes";
import graphRoutes from "./routes/graph.routes";
import entitiesRoutes from "./routes/entities.routes";
import careerRoutes from "./routes/career.routes";
import projectRoutes from "./routes/project.routes";
import companyRoutes from "./routes/company.routes";
import statsRoutes from "./routes/stats.routes";

export function createApp() {
  const app = express();

  app.use(helmet());
  app.use(cors({ origin: env.corsOrigin }));
  app.use(express.json({ limit: "100kb" })); // request size limit - see spec section 41

  app.use("/api/health", healthRoutes);
  app.use("/api/search", searchRoutes);
  app.use("/api/nodes", nodesRoutes);
  app.use("/api/graph", graphRoutes);
  app.use("/api", entitiesRoutes); // /api/skills, /api/technologies, /api/job-roles, /api/projects, /api/companies, /api/resources
  app.use("/api/career", careerRoutes);
  app.use("/api/projects", projectRoutes);
  app.use("/api/companies", companyRoutes);
  app.use("/api/stats", statsRoutes);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}

import { FastifyInstance } from "fastify";
import { authRoutes } from "./auth.routes";
import { userRoutes } from "./user.routes";
import { subsectionRoutes } from "./subsection.routes";
import { sectionRoutes } from "./section.routes";
import { milestoneRoutes } from "./milestone.routes";
import { projectRoutes } from "./project.routes";
import { stepRoutes } from "./step.routes";
import { testCaseRoutes } from "./test-case.routes";
import { testReportRoutes } from "./test-report.routes";
import { testRunRoutes } from "./test-run.routes";
import { fileRoutes } from "./file.routes";

export async function router(fastify: FastifyInstance) {
  await authRoutes(fastify);
  await userRoutes(fastify);
  await sectionRoutes(fastify);
  await subsectionRoutes(fastify);
  await milestoneRoutes(fastify);
  await projectRoutes(fastify);
  await stepRoutes(fastify);
  await testCaseRoutes(fastify);
  await testReportRoutes(fastify);
  await testRunRoutes(fastify);
  await fileRoutes(fastify);
}

import { FastifyInstance } from "fastify";
import {
  importTestCasesFromJson,
  importTestCasesFromCsv,
} from "../controllers/file-controller";
import { authorize } from "../middlewares/authorization-middleware";
import { UserRole } from "../../domain/entities/enums/user-role";
import { getTestCasesByIds } from "../controllers/test-case-controller";
import {
  getTestRunsByIds,
  ExportTestRunsQuery,
} from "../controllers/test-run-controller";
import { ExportTestCasesQuery } from "../controllers/test-case-controller";
import { RouteShorthandOptions } from "fastify/types/route";

interface ImportFileRoute {
  Body: { filePath: string };
}

const exportRouteOptions: RouteShorthandOptions = {
  schema: {
    querystring: {
      type: "object",
      properties: {
        ids: { type: "array", items: { type: "string" } },
        format: { type: "string" },
      },
      required: ["ids", "format"],
    },
  },
};

export async function fileRoutes(fastify: FastifyInstance) {
  const roles = [UserRole.MANAGER, UserRole.ADMIN, UserRole.USER];
  fastify.post<ImportFileRoute>(
    "/files/import/json",
    { preHandler: [authorize([UserRole.MANAGER, UserRole.ADMIN])] },
    importTestCasesFromJson,
  );

  fastify.post<ImportFileRoute>(
    "/files/import/csv",
    { preHandler: [authorize([UserRole.MANAGER, UserRole.ADMIN])] },
    importTestCasesFromCsv,
  );

  fastify.get<{ Querystring: ExportTestCasesQuery }>(
    "/files/export/test-cases",
    {
      preHandler: [authorize(roles)],
      ...exportRouteOptions,
    },
    getTestCasesByIds,
  );

  fastify.get<{ Querystring: ExportTestRunsQuery }>(
    "/files/export/test-runs",
    {
      preHandler: [authorize(roles)],
      ...exportRouteOptions,
    },
    getTestRunsByIds,
  );
}

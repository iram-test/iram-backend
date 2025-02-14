import { FastifyInstance } from "fastify";
import {
    importTestCasesFromJson,
    importTestCasesFromCsv,
    saveTestRunToPdf,
    saveTestCaseToPdf,
    exportTestCases,
    exportTestRun,
    saveTestCases,
} from "../controllers/file-controller";
import { authorize } from "../middlewares/authorization-middleware";
import { UserRole } from "../../domain/entities/enums/user-role";
import { TestCase } from "../../domain/entities/test-case-entity";
import { RouteGenericInterface } from "fastify/types/route";
import { TestRun } from "../../domain/entities/test-run-entity";

interface ImportFileRoute extends RouteGenericInterface {
    Body: { filePath: string };
}

interface ExportTestCasesRoute extends RouteGenericInterface {
    Body: { testCases: TestCase[]; format: string };
}

interface ExportTestRunRoute extends RouteGenericInterface {
    Body: { testRun: TestRun; format: string };
}

interface PdfFileRoute extends RouteGenericInterface {
    Params: { testRunId?: string; testCaseId?: string };
}

export async function fileRoutes(fastify: FastifyInstance) {
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

    // Generic test cases export
    fastify.post<ExportTestCasesRoute>(
        "/files/export/test-cases",
        { preHandler: [authorize([UserRole.MANAGER, UserRole.ADMIN])] },
        exportTestCases,
    );

    // Generic test run export
    fastify.post<ExportTestRunRoute>(
        "/files/export/test-run",
        { preHandler: [authorize([UserRole.MANAGER, UserRole.ADMIN])] },
        exportTestRun,
    );

    // Generic test cases save
    fastify.post<ExportTestCasesRoute>(
        "/files/save/test-cases",
        { preHandler: [authorize([UserRole.MANAGER, UserRole.ADMIN])] },
        saveTestCases,
    );

    fastify.get<PdfFileRoute>(
        "/files/test-runs/:testRunId/pdf",
        { preHandler: [authorize([UserRole.MANAGER, UserRole.ADMIN])] },
        saveTestRunToPdf,
    );

    fastify.get<PdfFileRoute>(
        "/files/test-cases/:testCaseId/pdf",
        { preHandler: [authorize([UserRole.MANAGER, UserRole.ADMIN])] },
        saveTestCaseToPdf,
    );
}
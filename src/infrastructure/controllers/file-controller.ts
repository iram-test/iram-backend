import { FastifyRequest, FastifyReply } from "fastify";
import fileService from "../services/file-service";
import { TestCase } from "../../domain/entities/test-case-entity";
import TestCaseService from "../services/test-case-service";
import TestRunService from "../services/test-run-service";
import { CustomError } from "../../tools/custom-error";
import { TestRun } from "../../domain/entities/test-run-entity";
import {MultipartFile} from "@fastify/multipart";

interface ImportFileRequest extends FastifyRequest {
    file: () => Promise<MultipartFile | undefined>;
}

interface ExportTestCasesRequest extends FastifyRequest {
    body: { testCases: TestCase[]; format: string };
}

interface ExportTestRunRequest extends FastifyRequest {
    body: { testRun: TestRun; format: string };
}

interface PdfFileRequest extends FastifyRequest {
    params: { testRunId?: string; testCaseId?: string };
}

export const importTestCasesFromJson = async (
    request: ImportFileRequest,
    reply: FastifyReply,
) => {
    try {
        const file = await request.file();
        if (!file) {
            throw new CustomError("File is required", 400);
        }

        const testCases = await fileService.importTestCasesFromJson(file);
        reply.code(200).send(testCases);
    } catch (error: any) {
        if (error instanceof CustomError) {
            reply.code(error.statusCode).send({ message: error.message });
        } else if (error instanceof Error) {
            reply.code(500).send({ message: error.message });
        } else {
            reply.code(500).send({ message: "An unexpected error occurred" });
        }
    }
};

export const importTestCasesFromCsv = async (
    request: ImportFileRequest,
    reply: FastifyReply,
) => {
    try {
        const file = await request.file();
        if (!file) {
            throw new CustomError("File is required", 400);
        }
        const testCases = await fileService.importTestCasesFromCsv(file);
        reply.code(200).send(testCases);
    } catch (error: any) {
        if (error instanceof CustomError) {
            reply.code(error.statusCode).send({ message: error.message });
        } else if (error instanceof Error) {
            reply.code(500).send({ message: error.message });
        } else {
            reply.code(500).send({ message: "An unexpected error occurred" });
        }
    }
};

export const exportTestCases = async (
    request: ExportTestCasesRequest,
    reply: FastifyReply,
) => {
    try {
        const { testCases, format } = request.body;
        const downloadUrl = await fileService.exportTestCases(testCases, format);
        reply.code(200).send({ downloadUrl });
    } catch (error: any) {
        if (error instanceof CustomError) {
            reply.code(error.statusCode).send({ message: error.message });
        } else if (error instanceof Error) {
            reply.code(500).send({ message: error.message });
        } else {
            reply.code(500).send({ message: "An unexpected error occurred" });
        }
    }
};

export const exportTestRun = async (
    request: ExportTestRunRequest,
    reply: FastifyReply,
) => {
    try {
        const { testRun, format } = request.body;
        const downloadUrl = await fileService.exportTestRun(testRun, format);
        reply.code(200).send({ downloadUrl });
    } catch (error: any) {
        if (error instanceof CustomError) {
            reply.code(error.statusCode).send({ message: error.message });
        } else if (error instanceof Error) {
            reply.code(500).send({ message: error.message });
        } else {
            reply.code(500).send({ message: "An unexpected error occurred" });
        }
    }
};

export const saveTestCases = async (
    request: ExportTestCasesRequest,
    reply: FastifyReply,
) => {
    try {
        const { testCases, format } = request.body;
        const downloadUrl = await fileService.saveTestCases(testCases, format);
        reply.code(200).send({ downloadUrl });
    } catch (error: any) {
        if (error instanceof CustomError) {
            reply.code(error.statusCode).send({ message: error.message });
        } else if (error instanceof Error) {
            reply.code(500).send({ message: error.message });
        } else {
            reply.code(500).send({ message: "An unexpected error occurred" });
        }
    }
};

export const saveTestRunToPdf = async (
    request: PdfFileRequest,
    reply: FastifyReply,
) => {
    try {
        const { testRunId } = request.params;

        if (!testRunId) {
            return reply.code(400).send({ message: "testRunId is required" });
        }

        const testRun = await TestRunService.getById(testRunId);

        if (!testRun) {
            return reply.code(404).send({ message: "TestRun not found" });
        }

        const downloadUrl = await fileService.saveTestRunToPdf(testRun);
        reply.code(200).send({ downloadUrl });
    } catch (error: any) {
        if (error instanceof CustomError) {
            reply.code(error.statusCode).send({ message: error.message });
        } else if (error instanceof Error) {
            reply.code(500).send({ message: error.message });
        } else {
            reply.code(500).send({ message: "An unexpected error occurred" });
        }
    }
};

export const saveTestCaseToPdf = async (
    request: PdfFileRequest,
    reply: FastifyReply,
) => {
    try {
        const { testCaseId } = request.params;

        if (!testCaseId) {
            return reply.code(400).send({ message: "testCaseId is required" });
        }

        const testCase = await TestCaseService.getById(testCaseId);

        if (!testCase) {
            return reply.code(404).send({ message: "TestCase not found" });
        }

        const downloadUrl = await fileService.saveTestCaseToPdf(testCase);
        reply.code(200).send({ downloadUrl });
    } catch (error: any) {
        if (error instanceof CustomError) {
            reply.code(error.statusCode).send({ message: error.message });
        } else if (error instanceof Error) {
            reply.code(500).send({ message: error.message });
        } else {
            reply.code(500).send({ message: "An unexpected error occurred" });
        }
    }
};
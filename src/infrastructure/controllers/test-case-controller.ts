import { FastifyReply, FastifyRequest } from "fastify";
import TestCaseService from "../services/test-case-service";
import {
  CreateTestCaseDTO,
  UpdateTestCaseDTO,
} from "../../application/dtos/test-case-dto";
import logger from "../../tools/logger";
import { CustomError } from "../../tools/custom-error";
import fileService from "../services/file-service";

export interface ExportTestCasesQuery {
  ids: string[];
  format: string;
}

export const addTestCase = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { projectId } = request.params as { projectId: string };
    const testCaseDto = request.body as CreateTestCaseDTO;
    const newTestCase = await TestCaseService.addTestCase(
      projectId,
      testCaseDto,
    );
    reply.status(201).send(newTestCase);
  } catch (error) {
    logger.error(`Error creating test case: ${error}`);
    if (error instanceof CustomError) {
      reply.status(error.statusCode).send({ message: error.message });
    } else {
      reply.status(500).send({ message: "Error creating test case" });
    }
  }
};

export const getAllTestCases = async (
  _: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const testCases = await TestCaseService.getAll();
    reply.status(200).send(testCases);
  } catch (error) {
    logger.error(`Error during getting all test cases: ${error}`);
    if (error instanceof CustomError) {
      reply.status(error.statusCode).send({ message: error.message });
    } else {
      reply.status(500).send({ message: "Error getting test cases" });
    }
  }
};

export const getTestCaseById = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { testCaseId } = request.params as { testCaseId: string };
    const testCase = await TestCaseService.getById(testCaseId);
    reply.status(200).send(testCase);
  } catch (error) {
    logger.error(`Error getting test case by id: ${error}`);
    if (error instanceof CustomError) {
      reply.status(error.statusCode).send({ message: error.message });
    } else {
      reply.status(500).send({ message: "Error getting test case" });
    }
  }
};

export const updateTestCase = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { testCaseId } = request.params as { testCaseId: string };
    const testCaseDto = request.body as UpdateTestCaseDTO;
    const updatedTestCase = await TestCaseService.update(
      testCaseId,
      testCaseDto,
    );
    reply.status(200).send(updatedTestCase);
  } catch (error) {
    logger.error(
      `Error during updating test case with id: ${request.params}: ${error}`,
    );
    if (error instanceof CustomError) {
      reply.status(error.statusCode).send({ message: error.message });
    } else {
      reply.status(500).send({ message: "Error updating test case" });
    }
  }
};

export const deleteTestCase = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { testCaseId } = request.params as { testCaseId: string };
    await TestCaseService.delete(testCaseId);
    reply.status(204).send();
  } catch (error) {
    logger.error(
      `Error deleting test case with id: ${request.params}: ${error}`,
    );
    if (error instanceof CustomError) {
      reply.status(error.statusCode).send({ message: error.message });
    } else {
      reply.status(500).send({ message: "Error deleting test case" });
    }
  }
};

export const getTestCasesByProjectId = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { projectId } = request.params as { projectId: string };
    const testCases = await TestCaseService.getTestCasesByProjectId(projectId);
    reply.status(200).send(testCases);
  } catch (error) {
    logger.error(`Error during getting test cases by project ID: ${error}`);
    if (error instanceof CustomError) {
      reply.status(error.statusCode).send({ message: error.message });
    } else {
      reply.status(500).send({ message: "Error getting test cases" });
    }
  }
};

export const getTestCasesBySectionId = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { sectionId } = request.params as { sectionId: string };
    const testCases = await TestCaseService.getBySectionId(sectionId);
    reply.status(200).send(testCases);
  } catch (error) {
    logger.error(`Error during getting test cases by section ID: ${error}`);
    if (error instanceof CustomError) {
      reply.status(error.statusCode).send({ message: error.message });
    } else {
      reply.status(500).send({ message: "Error getting test cases" });
    }
  }
};

export const getTestCasesByAssignedUserId = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { assignedUserId } = request.params as { assignedUserId: string };
    const testCases = await TestCaseService.getByAssignedUserId(assignedUserId);
    reply.status(200).send(testCases);
  } catch (error) {
    logger.error(
      `Error during getting test cases by assigned user ID: ${error}`,
    );
    if (error instanceof CustomError) {
      reply.status(error.statusCode).send({ message: error.message });
    } else {
      reply.status(500).send({ message: "Error getting test cases" });
    }
  }
};

export const getTestCaseByTitle = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { title } = request.params as { title: string };
    const testCase = await TestCaseService.getByTitle(title);
    reply.status(200).send(testCase);
  } catch (error) {
    logger.error(`Error during getting test case by title: ${error}`);
    if (error instanceof CustomError) {
      reply.status(error.statusCode).send({ message: error.message });
    } else {
      reply.status(500).send({ message: "Error getting test case" });
    }
  }
};

export const getTestCasesBySubSectionId = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { subsectionId } = request.params as { subsectionId: string };
    const testCases = await TestCaseService.getBySubSectionId(subsectionId);
    reply.status(200).send(testCases);
  } catch (error) {
    logger.error(`Error during getting test cases by sub section ID: ${error}`);
    if (error instanceof CustomError) {
      reply.status(error.statusCode).send({ message: error.message });
    } else {
      reply.status(500).send({ message: "Error getting test cases" });
    }
  }
};

export const getTestCasesByIds = async (
  request: FastifyRequest<{ Querystring: ExportTestCasesQuery }>,
  reply: FastifyReply,
) => {
  try {
    const { ids, format } = request.query;

    logger.info(
      `getTestCasesByIds called with ids: ${JSON.stringify(ids)}, format: ${format}`,
    );

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      logger.warn("No test case IDs provided.");
      throw new CustomError("Test case IDs are required", 400);
    }

    if (!format) {
      logger.warn("No format provided.");
      throw new CustomError("Format is required", 400);
    }

    const testCasesData = await fileService.exportTestCasesByIds(ids, format);

    const filename = `test_cases.${format}`;
    const contentType =
      format === "json"
        ? "application/json"
        : format === "csv"
          ? "text/csv"
          : "application/xml";

    reply.header("Content-Disposition", `attachment; filename="${filename}"`);
    reply.header("Content-Type", contentType);
    reply.send(testCasesData);
  } catch (error) {
    logger.error(`Error getting test cases by IDs: ${error}`);
    if (error instanceof CustomError) {
      reply.status(error.statusCode).send({ message: error.message });
    } else {
      reply.status(500).send({ message: "Error getting test cases" });
    }
  }
};

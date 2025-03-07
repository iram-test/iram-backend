import { FastifyReply, FastifyRequest } from "fastify";
import TestReportService from "../services/test-report-service";
import logger from "../../tools/logger";
import { CustomError } from "../../tools/custom-error";
import {
  CreateTestReportDTOSchema,
  UpdateTestReportDTOSchema,
} from "../../application/validation/dto-validation/test-report-dto-schema";
import { z } from "zod";

export const addTestReport = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { projectId } = request.params as { projectId: string };
    const testReportDto = CreateTestReportDTOSchema.parse(request.body);
    const newTestReport = await TestReportService.addTestReport(
      projectId,
      testReportDto,
    );
    reply.status(201).send(newTestReport);
  } catch (error) {
    if (error instanceof z.ZodError) {
      reply
        .code(400)
        .send({ message: "Validation error", errors: error.errors });
    } else {
      logger.error(`Error creating test report: ${error}`);
      reply.status(500).send({ message: "Error creating test report" });
    }
  }
};

export const getAllTestReports = async (
  _: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const testReports = await TestReportService.getAll();
    reply.status(200).send(testReports);
  } catch (error) {
    logger.error(`Error getting all test reports: ${error}`);
    if (error instanceof CustomError) {
      reply.status(error.statusCode).send({ message: error.message });
    } else {
      reply.status(500).send({ message: "Error getting test reports" });
    }
  }
};

export const getTestReportById = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { testReportId } = request.params as { testReportId: string };
    const testReport = await TestReportService.getById(testReportId);
    reply.status(200).send(testReport);
  } catch (error) {
    logger.error(`Error getting test report by ID: ${error}`);
    if (error instanceof CustomError) {
      reply.status(error.statusCode).send({ message: error.message });
    } else {
      reply.status(500).send({ message: "Error getting test report" });
    }
  }
};

export const updateTestReport = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { testReportId } = request.params as { testReportId: string };
    const testReportDto = UpdateTestReportDTOSchema.parse(request.body);

    if (testReportId !== testReportDto.testReportId) {
      return reply
        .status(400)
        .send({ message: "TestReport ID in path and body do not match" });
    }

    const updatedTestReport = await TestReportService.update(
      testReportId,
      testReportDto,
    );
    reply.status(200).send(updatedTestReport);
  } catch (error) {
    if (error instanceof z.ZodError) {
      reply
        .code(400)
        .send({ message: "Validation error", errors: error.errors });
    } else {
      logger.error(`Error updating test report ${request.params}: ${error}`);
      reply.status(500).send({ message: "Error updating test report" });
    }
  }
};

export const deleteTestReport = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { testReportId } = request.params as { testReportId: string };
    await TestReportService.delete(testReportId);
    reply.status(204).send();
  } catch (error) {
    logger.error(
      `Error deleting test report with id: ${request.params}: ${error}`,
    );
    if (error instanceof CustomError) {
      reply.status(error.statusCode).send({ message: error.message });
    } else {
      reply.status(500).send({ message: "Error deleting test report" });
    }
  }
};

export const getTestReportsByAssignedUserId = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { assignedUserId } = request.params as { assignedUserId: string };
    const testReports =
      await TestReportService.getByAssignedUserId(assignedUserId);
    reply.status(200).send(testReports);
  } catch (error) {
    logger.error(`Error getting test reports by assigned user ID: ${error}`);
    if (error instanceof CustomError) {
      reply.status(error.statusCode).send({ message: error.message });
    } else {
      reply.status(500).send({ message: "Error getting test reports" });
    }
  }
};

export const getTestReportByName = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { reportName } = request.params as { reportName: string };
    const testReport = await TestReportService.getByName(reportName);
    reply.status(200).send(testReport);
  } catch (error) {
    logger.error(`Error getting test report by name: ${error}`);
    if (error instanceof CustomError) {
      reply.status(error.statusCode).send({ message: error.message });
    } else {
      reply.status(500).send({ message: "Error getting test report" });
    }
  }
};

export const getTestReportsByProjectId = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { projectId } = request.params as { projectId: string };
    const testReports =
      await TestReportService.getTestReportsByProjectId(projectId);
    reply.status(200).send(testReports);
  } catch (error) {
    logger.error(`Error getting test reports by project ID: ${error}`);
    if (error instanceof CustomError) {
      reply.status(error.statusCode).send({ message: error.message });
    } else {
      reply.status(500).send({ message: "Error getting test reports" });
    }
  }
};

export const getTestReportsByUserId = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { userId } = request.params as { userId: string };
    const testReports = await TestReportService.getTestReportsByUserId(userId);
    reply.status(200).send(testReports);
  } catch (error) {
    logger.error(`Error getting test reports by user ID: ${error}`);
    if (error instanceof CustomError) {
      reply.status(error.statusCode).send({ message: error.message });
    } else {
      reply.status(500).send({ message: "Error getting test reports" });
    }
  }
};

import { FastifyReply, FastifyRequest } from "fastify";
import TestReportService from "../services/test-report-service";
import {
  CreateTestReportDTO,
  UpdateTestReportDTO,
} from "../../application/dtos/test-report-dto";
import logger from "../../tools/logger";

export const addTestReport = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const testReportDto = request.body as CreateTestReportDTO;
    const newTestReport = await TestReportService.addTestReport(testReportDto);
    reply.code(201).send(newTestReport);
  } catch (error) {
    logger.error(`Error creating test report: ${error}`);
    reply.code(500).send({ message: "Error creating test report" });
  }
};

export const getAllTestReports = async (
  _: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const testReports = await TestReportService.getAllTestReports();
    reply.code(200).send(testReports);
  } catch (error) {
    logger.error(`Error getting all test reports: ${error}`);
    reply.code(500).send({ message: "Error getting test reports" });
  }
};

export const getTestReportById = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { testReportId } = request.params as { testReportId: string };
    const testReport = await TestReportService.getTestReportById(testReportId);
    reply.code(200).send(testReport);
  } catch (error) {
    logger.error(`Error getting test report by ID: ${error}`);
    if (error instanceof Error && error.message === "Test report not found") {
      reply.code(404).send({ message: "Test report not found" });
    } else {
      reply.code(500).send({ message: "Error getting test report" });
    }
  }
};

export const updateTestReport = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { testReportId } = request.params as { testReportId: string };
    const testReportDto = request.body as UpdateTestReportDTO;
    const updatedTestReport = await TestReportService.updateTestReport(
      testReportId,
      testReportDto,
    );
    reply.code(200).send(updatedTestReport);
  } catch (error) {
    logger.error(`Error updating test report ${request.params}: ${error}`);
    if (
      error instanceof Error &&
      error.message === "Test report was not found"
    ) {
      reply.code(404).send({ message: "Test report was not found" });
    } else {
      reply.code(500).send({ message: "Error updating test report" });
    }
  }
};

export const deleteTestReport = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { testReportId } = request.params as { testReportId: string };
    await TestReportService.deleteTestReport(testReportId);
    reply.code(204).send();
  } catch (error) {
    logger.error(
      `Error deleting test report with id: ${request.params}: ${error}`,
    );
    if (error instanceof Error && error.message === "Test report not found") {
      reply.code(404).send({ message: "Test report not found" });
    } else {
      reply.code(500).send({ message: "Error deleting test report" });
    }
  }
};

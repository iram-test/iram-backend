import { TestReportPostgresRepository } from "../db/repositories/test-report-postgres-repository";
import {
  CreateTestReportDTO,
  UpdateTestReportDTO,
} from "../../application/dtos/test-report-dto";
import logger from "../../tools/logger";
import { CustomError } from "../../tools/custom-error";

const testReportRepository = new TestReportPostgresRepository();

class TestReportService {
  async addTestReport(testReportDto: CreateTestReportDTO) {
    try {
      const newTestReport =
        await testReportRepository.addTestReport(testReportDto);
      logger.info(`Test report created: ${newTestReport.name}`);
      return newTestReport;
    } catch (error) {
      logger.error(`Error creating test report:`, error);
      throw new CustomError("Failed to create test report", 500);
    }
  }

  async getAll() {
    try {
      logger.info(`Get all test reports`);
      return await testReportRepository.getAll();
    } catch (error) {
      logger.error(`Error getting all test reports:`, error);
      throw new CustomError("Failed to get test reports", 500);
    }
  }

  async getById(testReportId: string) {
    try {
      const testReport = await testReportRepository.getById(testReportId);
      if (!testReport) {
        logger.warn(`Test report with id: ${testReportId} was not found`);
        throw new CustomError("Test report not found", 404);
      }
      logger.info(`Test report with id: ${testReportId} was found.`);
      return testReport;
    } catch (error) {
      logger.error(`Error getting test report by id ${testReportId}:`, error);
      throw new CustomError("Failed to get test report", 500);
    }
  }

  async update(testReportId: string, testReportDto: UpdateTestReportDTO) {
    try {
      const testReport = await testReportRepository.getById(testReportId);
      if (!testReport) {
        logger.warn(
          `Test report with id ${testReportId} was not found for update.`,
        );
        throw new CustomError("Test report not found", 404);
      }
      const updatedTestReport = await testReportRepository.update({
        ...testReportDto,
        testReportId,
      });
      logger.info(`Test report with id: ${testReportId} updated successfully.`);
      return updatedTestReport;
    } catch (error) {
      logger.error(
        `Error updating test report with id ${testReportId}:`,
        error,
      );
      throw new CustomError("Failed to update test report", 500);
    }
  }

  async delete(testReportId: string) {
    try {
      const testReport = await testReportRepository.getById(testReportId);
      if (!testReport) {
        logger.warn(
          `Test report with id: ${testReportId} was not found for delete.`,
        );
        throw new CustomError("Test report not found", 404);
      }
      await testReportRepository.delete(testReportId);
      logger.info(`Test report with id: ${testReportId} deleted successfully.`);
    } catch (error) {
      logger.error(
        `Error deleting test report with id ${testReportId}:`,
        error,
      );
      throw new CustomError("Failed to delete test report", 500);
    }
  }

  async getTestReportsByAssignedUserId(assignedUserId: string) {
    try {
      logger.info(`Get test reports by assigned user id`);
      return await testReportRepository.getByAssignedUserId(assignedUserId);
    } catch (error) {
      logger.error(`Error getting test reports by assigned user id:`, error);
      throw new CustomError("Failed to get test reports", 500);
    }
  }

  async getTestReportByName(reportName: string) {
    try {
      const testReport = await testReportRepository.getByName(reportName);
      if (!testReport) {
        logger.warn(`Test report with name: ${reportName} was not found`);
        throw new CustomError("Test report not found", 404);
      }
      logger.info(`Test report with name: ${reportName} was found.`);
      return testReport;
    } catch (error) {
      logger.error(`Error getting test report by name:`, error);
      throw new CustomError("Failed to get test report", 500);
    }
  }
}

export default new TestReportService();

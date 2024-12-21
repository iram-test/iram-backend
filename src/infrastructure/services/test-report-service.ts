import { TestReportDomainService } from "../../domain/services/test-report-domain-service";
import { TestReportPostgresRepository } from "../db/repositories/test-report-postgres-repository";
import {
  CreateTestReportDTO,
  UpdateTestReportDTO,
} from "../../application/dtos/test-report-dto";
import logger from "../../tools/logger";
import { CustomError } from "../../tools/custom-error";
const testReportRepository = new TestReportPostgresRepository();
const testReportService = new TestReportDomainService(testReportRepository);

class TestReportService {
  async addTestReport(testReportDto: CreateTestReportDTO) {
    const newTestReport = await testReportService.addTestReport(testReportDto);
    logger.info(`Test report created: ${newTestReport.name}`);
    return newTestReport;
  }

  async getAllTestReports() {
    logger.info(`Get all test reports`);
    return await testReportService.getAll();
  }

  async getTestReportById(testReportId: string) {
    const testReport = await testReportService.getById(testReportId);
    if (!testReport) {
      logger.warn(`Test report with id: ${testReportId} was not found.`);
      throw new CustomError("Test report not found", 404);
    }
    logger.info(`Test report with id: ${testReportId} was found.`);
    return testReport;
  }
  async updateTestReport(
    testReportId: string,
    testReportDto: UpdateTestReportDTO,
  ) {
    const testReport = await testReportService.getById(testReportId);
    if (!testReport) {
      logger.warn(
        `Test report with id ${testReportId} was not found for update.`,
      );
      throw new CustomError("Test report was not found", 404);
    }
    const updatedTestReport = await testReportService.update({
      ...testReportDto,
      testReportId,
    });
    logger.info(`Test report with id: ${testReportId} updated`);
    return updatedTestReport;
  }
  async deleteTestReport(testReportId: string) {
    const testReport = await testReportService.getById(testReportId);
    if (!testReport) {
      logger.warn(
        `Test report with id ${testReportId} was not found for delete.`,
      );
      throw new CustomError("Test report not found", 404);
    }
    await testReportService.delete(testReportId);
    logger.info(`Test report with id ${testReportId} deleted`);
  }
}

export default new TestReportService();

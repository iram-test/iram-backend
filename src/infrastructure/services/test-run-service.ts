import { TestRunDomainService } from "../../domain/services/test-run-domain-service";
import { TestRunPostgresRepository } from "../db/repositories/test-run-postgres-repository";
import {
  CreateTestRunDTO,
  UpdateTestRunDTO,
} from "../../application/dtos/test-run-dto";
import logger from "../../tools/logger";
import { CustomError } from "../../tools/custom-error";

const testRunRepository = new TestRunPostgresRepository();
const testRunService = new TestRunDomainService(testRunRepository);

class TestRunService {
  async addTestRun(testRunDto: CreateTestRunDTO) {
    const newTestRun = await testRunService.addTestRun(testRunDto);
    logger.info(`Test run created: ${newTestRun.testRunId}`);
    return newTestRun;
  }

  async getAllTestRuns() {
    logger.info(`Get all test runs`);
    return await testRunService.getAll();
  }

  async getTestRunById(testRunId: string) {
    const testRun = await testRunService.getById(testRunId);
    if (!testRun) {
      logger.warn(`Test run with id: ${testRunId} was not found.`);
      throw new CustomError("Test run not found", 404);
    }
    logger.info(`Test run with id: ${testRunId} was found.`);
    return testRun;
  }

  async updateTestRun(testRunId: string, testRunDto: UpdateTestRunDTO) {
    const testRun = await testRunService.getById(testRunId);
    if (!testRun) {
      logger.warn(`Test run with id: ${testRunId} was not found for update.`);
      throw new CustomError("Test run not found", 404);
    }

    const updatedTestRun = await testRunService.update({
      ...testRunDto,
      testRunId,
    });
    logger.info(`Test run with id: ${testRunId} updated successfully`);
    return updatedTestRun;
  }

  async deleteTestRun(testRunId: string) {
    const testRun = await testRunService.getById(testRunId);
    if (!testRun) {
      logger.warn(`Test run with id: ${testRunId} was not found for delete.`);
      throw new CustomError("Test run not found", 404);
    }
    await testRunService.delete(testRunId);
    logger.info(`Test run with id: ${testRunId} deleted`);
  }
}

export default new TestRunService();

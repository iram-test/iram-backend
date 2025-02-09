import { TestRunPostgresRepository } from "../db/repositories/test-run-postgres-repository";
import {
  CreateTestRunDTO,
  UpdateTestRunDTO,
} from "../../application/dtos/test-run-dto";
import logger from "../../tools/logger";
import { CustomError } from "../../tools/custom-error";

const testRunRepository = new TestRunPostgresRepository();

class TestRunService {
  async addTestRun(testRunDto: CreateTestRunDTO) {
    try {
      const newTestRun = await testRunRepository.addTestRun(testRunDto);
      logger.info(`Test run created: ${newTestRun.testRunId}`);
      return newTestRun;
    } catch (error) {
      logger.error(`Error creating test run:`, error);
      throw new CustomError("Failed to create test run", 500);
    }
  }

  async getAllTestRuns() {
    try {
      logger.info(`Get all test runs`);
      return await testRunRepository.getAll();
    } catch (error) {
      logger.error(`Error getting all test runs:`, error);
      throw new CustomError("Failed to get test runs", 500);
    }
  }

  async getTestRunById(testRunId: string) {
    try {
      const testRun = await testRunRepository.getById(testRunId);
      if (!testRun) {
        logger.warn(`Test run with id: ${testRunId} was not found.`);
        throw new CustomError("Test run not found", 404);
      }
      logger.info(`Test run with id: ${testRunId} was found.`);
      return testRun;
    } catch (error) {
      logger.error(`Error getting test run by id ${testRunId}:`, error);
      throw new CustomError("Failed to get test run", 500);
    }
  }

  async updateTestRun(testRunId: string, testRunDto: UpdateTestRunDTO) {
    try {
      const testRun = await testRunRepository.getById(testRunId);
      if (!testRun) {
        logger.warn(`Test run with id: ${testRunId} was not found for update.`);
        throw new CustomError("Test run not found", 404);
      }

      const updatedTestRun = await testRunRepository.update({
        ...testRunDto,
        testRunId,
      });
      logger.info(`Test run with id: ${testRunId} updated successfully`);
      return updatedTestRun;
    } catch (error) {
      logger.error(`Error updating test run with id ${testRunId}:`, error);
      throw new CustomError("Failed to update test run", 500);
    }
  }

  async deleteTestRun(testRunId: string) {
    try {
      const testRun = await testRunRepository.getById(testRunId);
      if (!testRun) {
        logger.warn(`Test run with id: ${testRunId} was not found for delete.`);
        throw new CustomError("Test run not found", 404);
      }
      await testRunRepository.delete(testRunId);
      logger.info(`Test run with id: ${testRunId} deleted`);
    } catch (error) {
      logger.error(`Error deleting test run with id ${testRunId}:`, error);
      throw new CustomError("Failed to delete test run", 500);
    }
  }

  async getTestRunsByProjectId(projectId: string) {
    try {
      logger.info(`Get TestRuns by project id`);
      return await testRunRepository.getByProjectId(projectId);
    } catch (error) {
      logger.error(`Error getting TestRuns by project id:`, error);
      throw new CustomError("Failed to get test runs", 500);
    }
  }
}

export default new TestRunService();

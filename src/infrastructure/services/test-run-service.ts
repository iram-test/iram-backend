import { TestRunPostgresRepository } from "../db/repositories/test-run-postgres-repository";
import {
  CreateTestRunDTO,
  UpdateTestRunDTO,
} from "../../application/dtos/test-run-dto";
import logger from "../../tools/logger";
import { CustomError } from "../../tools/custom-error";
import { ProjectPostgresRepository } from "../db/repositories/project-postgres-repository";

const testRunRepository = new TestRunPostgresRepository();
const projectRepository = new ProjectPostgresRepository();

class TestRunService {
  async addTestRun(projectId: string, testRunDto: CreateTestRunDTO) {
    try {
      const project = await projectRepository.getById(projectId);
      if (!project) {
        logger.warn(`Project with id: ${projectId} was not found`);
        throw new CustomError("Project not found", 404);
      }
      const newTestRun = await testRunRepository.addTestRun({
        ...testRunDto,
        projectId: projectId,
      });
      logger.info(`Test run created: ${newTestRun.testRunId}`);
      return newTestRun;
    } catch (error) {
      logger.error(`Error creating test run:`, error);
      throw new CustomError("Failed to create test run", 500);
    }
  }

  async getAll() {
    try {
      logger.info(`Get all test runs`);
      return await testRunRepository.getAll();
    } catch (error) {
      logger.error(`Error getting all test runs:`, error);
      throw new CustomError("Failed to get test runs", 500);
    }
  }

  async getById(testRunId: string) {
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

  async update(testRunId: string, testRunDto: UpdateTestRunDTO) {
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

  async delete(testRunId: string) {
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

  async getByProjectId(projectId: string) {
    try {
      logger.info(`Get TestRuns by project id`);
      return await testRunRepository.getByProjectId(projectId);
    } catch (error) {
      logger.error(`Error getting TestRuns by project id:`, error);
      throw new CustomError("Failed to get test runs", 500);
    }
  }

  async getTestRunByProjectId(projectId: string) {
    try {
      logger.info(`Get TestRuns by project id`);
      return await testRunRepository.getTestRunByProjectId(projectId);
    } catch (error) {
      logger.error(`Error getting TestRuns by project id:`, error);
      throw new CustomError("Failed to get test runs", 500);
    }
  }

  async getTestRunByUserId(userId: string) {
    try {
      logger.info(`Get TestRuns by user id`);
      return await testRunRepository.getTestRunByUserId(userId);
    } catch (error) {
      logger.error(`Error getting TestRuns by user id:`, error);
      throw new CustomError("Failed to get test runs", 500);
    }
  }

  async getTestRunByTestReportId(testReportId: string) {
    try {
      logger.info(`Get TestRuns by test report id`);
      return await testRunRepository.getTestRunByTestReportId(testReportId);
    } catch (error) {
      logger.error(`Error getting TestRuns by test report id:`, error);
      throw new CustomError("Failed to get test runs", 500);
    }
  }
}

export default new TestRunService();

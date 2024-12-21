import { TestRunStepDomainService } from "../../domain/services/test-run-step-domain-service";
import { TestRunStepPostgresRepository } from "../db/repositories/test-run-step-postgres-repository";
import {
  CreateTestRunStepDTO,
  UpdateTestRunStepDTO,
} from "../../application/dtos/test-run-step-dto";
import logger from "../../tools/logger";
import { CustomError } from "../../tools/custom-error";

const testRunStepRepository = new TestRunStepPostgresRepository();
const testRunStepService = new TestRunStepDomainService(testRunStepRepository);

class TestRunStepService {
  async addTestRunStep(testRunStepDto: CreateTestRunStepDTO) {
    const newTestRunStep =
      await testRunStepService.addTestRunStep(testRunStepDto);
    logger.info(`Test run step created: ${newTestRunStep.testRunStepId}`);
    return newTestRunStep;
  }

  async getAllTestRunSteps() {
    logger.info(`Get all test run steps`);
    return await testRunStepService.getAll();
  }

  async getTestRunStepById(testRunStepId: string) {
    const testRunStep = await testRunStepService.getById(testRunStepId);
    if (!testRunStep) {
      logger.warn(`Test run step with id ${testRunStepId} was not found.`);
      throw new CustomError("Test run step not found", 404);
    }
    logger.info(`Test run step with id ${testRunStepId} was found`);
    return testRunStep;
  }

  async updateTestRunStep(
    testRunStepId: string,
    testRunStepDto: UpdateTestRunStepDTO,
  ) {
    const testRunStep = await testRunStepService.getById(testRunStepId);

    if (!testRunStep) {
      logger.warn(
        `Test run step with id: ${testRunStepId} was not found for update`,
      );
      throw new CustomError("Test run step not found", 404);
    }
    const updatedTestRunStep = await testRunStepService.update({
      ...testRunStepDto,
      testRunStepId,
    });
    logger.info(`Test run step with id: ${testRunStepId} was updated`);
    return updatedTestRunStep;
  }

  async deleteTestRunStep(testRunStepId: string) {
    const testRunStep = await testRunStepService.getById(testRunStepId);

    if (!testRunStep) {
      logger.warn(
        `Test run step with id ${testRunStepId} was not found for delete`,
      );
      throw new CustomError("Test run step not found", 404);
    }
    await testRunStepService.delete(testRunStepId);
    logger.info(`Test run step with id: ${testRunStepId} deleted`);
  }
}

export default new TestRunStepService();

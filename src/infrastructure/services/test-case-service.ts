import { TestCaseDomainService } from "../../domain/services/test-case-domain-service";
import { TestCasePostgresRepository } from "../db/repositories/test-case-postgres-repository";
import {
  CreateTestCaseDTO,
  UpdateTestCaseDTO,
} from "../../application/dtos/test-case-dto";
import logger from "../../tools/logger";
import { CustomError } from "../../tools/custom-error";

const testCaseRepository = new TestCasePostgresRepository();
const testCaseService = new TestCaseDomainService(testCaseRepository);

class TestCaseService {
  async addTestCase(testCaseDto: CreateTestCaseDTO) {
    const newTestCase = await testCaseService.addTestCase(testCaseDto);
    logger.info(`Test case created: ${newTestCase.title}`);
    return newTestCase;
  }

  async getAllTestCases() {
    logger.info(`Get all test cases`);
    return await testCaseService.getAll();
  }

  async getTestCaseById(testCaseId: string) {
    const testCase = await testCaseService.getById(testCaseId);
    if (!testCase) {
      logger.warn(`Test case with id: ${testCaseId} was not found`);
      throw new CustomError("Test case not found", 404);
    }
    logger.info(`Test case with id: ${testCaseId} was found.`);
    return testCase;
  }

  async updateTestCase(testCaseId: string, testCaseDto: UpdateTestCaseDTO) {
    const testCase = await testCaseService.getById(testCaseId);
    if (!testCase) {
      logger.warn(`Test case with id ${testCaseId} was not found for update.`);
      throw new CustomError("Test case not found", 404);
    }
    const updatedTestCase = await testCaseService.update({
      ...testCaseDto,
      testCaseId,
    });
    logger.info(`Test case with id: ${testCaseId} updated successfully.`);
    return updatedTestCase;
  }

  async deleteTestCase(testCaseId: string) {
    const testCase = await testCaseService.getById(testCaseId);
    if (!testCase) {
      logger.warn(`Test case with id: ${testCaseId} was not found for delete.`);
      throw new CustomError("Test case not found", 404);
    }
    await testCaseService.delete(testCaseId);
    logger.info(`Test case with id: ${testCaseId} deleted successfully.`);
  }
}

export default new TestCaseService();

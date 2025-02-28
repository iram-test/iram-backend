import { TestCasePostgresRepository } from "../db/repositories/test-case-postgres-repository";
import {
  CreateTestCaseDTO,
  UpdateTestCaseDTO,
} from "../../application/dtos/test-case-dto";
import logger from "../../tools/logger";
import { CustomError } from "../../tools/custom-error";
import { ProjectPostgresRepository } from "../db/repositories/project-postgres-repository";
import { TestCase } from "../../domain/entities/test-case-entity";

const testCaseRepository = new TestCasePostgresRepository();
const projectRepository = new ProjectPostgresRepository();

class TestCaseService {
  async addTestCase(projectId: string, testCaseDto: CreateTestCaseDTO) {
    try {
      const project = await projectRepository.getById(projectId);
      if (!project) {
        logger.warn(`Project with id: ${projectId} was not found`);
        throw new CustomError("Project not found", 404);
      }

      const newTestCase = await testCaseRepository.addTestCase({
        ...testCaseDto,
        projectId: projectId,
      });
      logger.info(`Test case created: ${newTestCase.title}`);
      return newTestCase;
    } catch (error) {
      logger.error(`Error creating test case:`, error);
      throw new CustomError("Failed to create test case", 500);
    }
  }

  async update(testCaseId: string, testCaseDto: UpdateTestCaseDTO) {
    try {
      const testCase = await testCaseRepository.getById(testCaseId);
      if (!testCase) {
        logger.warn(
          `Test case with id ${testCaseId} was not found for update.`,
        );
        throw new CustomError("Test case not found", 404);
      }
      const updatedTestCase = await testCaseRepository.update({
        ...testCaseDto,
        testCaseId,
      });
      logger.info(`Test case with id: ${testCaseId} updated successfully.`);
      return updatedTestCase;
    } catch (error) {
      logger.error(`Error updating test case with id ${testCaseId}:`, error);
      throw new CustomError("Failed to update test case", 500);
    }
  }

  async getAll() {
    try {
      logger.info(`Get all test cases`);
      return await testCaseRepository.getAll();
    } catch (error) {
      logger.error(`Error getting all test cases:`, error);
      throw new CustomError("Failed to get test cases", 500);
    }
  }

  async getById(testCaseId: string) {
    try {
      const testCase = await testCaseRepository.getById(testCaseId);
      if (!testCase) {
        logger.warn(`Test case with id: ${testCaseId} was not found`);
        throw new CustomError("Test case not found", 404);
      }
      logger.info(`Test case with id: ${testCaseId} was found.`);
      return testCase;
    } catch (error) {
      logger.error(`Error getting test case by id ${testCaseId}:`, error);
      throw new CustomError("Failed to get test case", 500);
    }
  }

  async delete(testCaseId: string) {
    try {
      const testCase = await testCaseRepository.getById(testCaseId);
      if (!testCase) {
        logger.warn(
          `Test case with id: ${testCaseId} was not found for delete.`,
        );
        throw new CustomError("Test case not found", 404);
      }
      await testCaseRepository.delete(testCaseId);
      logger.info(`Test case with id: ${testCaseId} deleted successfully.`);
    } catch (error) {
      logger.error(`Error deleting test case with id ${testCaseId}:`, error);
      throw new CustomError("Failed to delete test case", 500);
    }
  }

  async getByProjectId(projectId: string) {
    try {
      logger.info(`Get test cases by project id`);
      return await testCaseRepository.getByProjectId(projectId);
    } catch (error) {
      logger.error(`Error getting test cases by project id:`, error);
      throw new CustomError("Failed to get test cases", 500);
    }
  }

  async getBySectionId(sectionId: string) {
    try {
      logger.info(`Get test cases by section id`);
      return await testCaseRepository.getBySectionId(sectionId);
    } catch (error) {
      logger.error(`Error getting test cases by section id:`, error);
      throw new CustomError("Failed to get test cases", 500);
    }
  }

  async getByAssignedUserId(assignedUserId: string) {
    try {
      logger.info(`Get test cases by assigned user id`);
      return await testCaseRepository.getByAssignedUserId(assignedUserId);
    } catch (error) {
      logger.error(`Error getting test cases by assigned user id:`, error);
      throw new CustomError("Failed to get test cases", 500);
    }
  }

  async getByTitle(title: string) {
    try {
      const testCase = await testCaseRepository.getByTitle(title);
      if (!testCase) {
        logger.warn(`Test case with title: ${title} was not found`);
        throw new CustomError("Test case not found", 404);
      }
      logger.info(`Test case with title: ${title} was found.`);
      return testCase;
    } catch (error) {
      logger.error(`Error getting test case by title:`, error);
      throw new CustomError("Failed to get test case", 500);
    }
  }
  async getTestCasesByProjectId(projectId: string) {
    try {
      logger.info(`Get test cases by project id`);
      return await testCaseRepository.getTestCasesByProjectId(projectId);
    } catch (error) {
      logger.error(`Error getting test cases by project id:`, error);
      throw new CustomError("Failed to get test cases", 500);
    }
  }

  async getTestCasesByUserId(userId: string) {
    try {
      logger.info(`Get test cases by user id`);
      return await testCaseRepository.getTestCasesByUserId(userId);
    } catch (error) {
      logger.error(`Error getting test cases by user id:`, error);
      throw new CustomError("Failed to get test cases", 500);
    }
  }

  async getBySubSectionId(subsectionId: string) {
    try {
      logger.info(`Get test cases by sub section id`);
      return await testCaseRepository.getBySubSectionId(subsectionId);
    } catch (error) {
      logger.error(`Error getting test cases by sub section id:`, error);
      throw new CustomError("Failed to get test cases", 500);
    }
  }
  async getTestCasesByIds(ids: string[]): Promise<TestCase[]> {
    try {
      logger.info(`Get test cases by ids: ${ids.join(", ")}`);
      const testCases = await testCaseRepository.getTestCasesByIds(ids);
      return testCases;
    } catch (error) {
      logger.error(`Error getting test cases by ids: ${ids.join(", ")}`, error);
      throw new CustomError("Failed to get test cases", 500);
    }
  }
}

export default new TestCaseService();

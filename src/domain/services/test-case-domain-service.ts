import { TestCase } from "../entities/test-case-entity";
import { TestCaseRepository } from "../repositories/test-case-repository";
import {
  CreateTestCaseDTO,
  UpdateTestCaseDTO,
} from "../../application/dtos/test-case-dto";
import { v4 } from "uuid";

export class TestCaseDomainService implements TestCaseRepository {
  constructor(private testCaseRepository: TestCaseRepository) {}

  async addTestCase(
      testCaseDto: CreateTestCaseDTO & { projectId: string },
  ): Promise<TestCase> {
    return await this.testCaseRepository.addTestCase(testCaseDto);
  }

  getAll(): Promise<TestCase[]> {
    return this.testCaseRepository.getAll();
  }

  getByTitle(title: string): Promise<TestCase | null> {
    return this.testCaseRepository.getByTitle(title);
  }

  getById(testCaseId: string): Promise<TestCase | null> {
    return this.testCaseRepository.getById(testCaseId);
  }

  update(testCaseDto: UpdateTestCaseDTO): Promise<TestCase> {
    return this.testCaseRepository.update(testCaseDto);
  }

  delete(testCaseId: string): Promise<void> {
    return this.testCaseRepository.delete(testCaseId);
  }

  getByProjectId(projectId: string): Promise<TestCase[]> {
    return this.testCaseRepository.getByProjectId(projectId);
  }
  getBySectionId(sectionId: string): Promise<TestCase[]> {
    return this.testCaseRepository.getBySectionId(sectionId);
  }

  getBySubSectionId(subsectionId: string): Promise<TestCase[]> {
    return this.testCaseRepository.getBySubSectionId(subsectionId);
  }
  getByAssignedUserId(assignedUserId: string): Promise<TestCase[]> {
    return this.testCaseRepository.getByAssignedUserId(assignedUserId);
  }
  getTestCasesByProjectId(projectId: string): Promise<TestCase[]> {
    return this.testCaseRepository.getTestCasesByProjectId(projectId);
  }
  getTestCasesByUserId(userId: string): Promise<TestCase[]> {
    return this.testCaseRepository.getTestCasesByUserId(userId);
  }
  getTestCasesByIds(ids: string[]): Promise<TestCase[]> {
    return this.testCaseRepository.getTestCasesByIds(ids);
  }
}
import { TestCase } from "../entities/test-case-entity";
import { TestCaseRepository } from "../repositories/test-case-repository";
import {
  CreateTestCaseDTO,
  UpdateTestCaseDTO,
} from "../../application/dtos/test-case-dto";

export class TestCaseDomainService implements TestCaseRepository {
  constructor(private testCaseRepository: TestCaseRepository) {}

  addTestCase(testCaseDto: CreateTestCaseDTO): Promise<TestCase> {
    const testCase = new TestCase(
      "",
      testCaseDto.title,
      testCaseDto.sectionId,
      testCaseDto.templateType,
      testCaseDto.testType,
      testCaseDto.priority,
      testCaseDto.assignedUserId,
      testCaseDto.timeEstimation,
      testCaseDto.description,
      testCaseDto.stepsId,
      new Date().toISOString(),
      new Date().toISOString(),
    );
    return this.testCaseRepository.addTestCase(testCaseDto);
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
}

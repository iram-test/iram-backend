import { TestCase } from "../entities/test-case-entity";
import { TestCaseRepository } from "../repositories/test-case-repository";
import {
  CreateTestCaseDTO,
  UpdateTestCaseDTO,
} from "../../application/dtos/test-case-dto";

export class TestCaseDomainService implements TestCaseRepository {
  constructor(private testCaseRepository: TestCaseRepository) {}

  addTestCase(testCaseDto: CreateTestCaseDTO): Promise<TestCase> {
    return this.testCaseRepository.addTestCase(testCaseDto);
  }

  getAll(): Promise<TestCase[]> {
    return this.testCaseRepository.getAll();
  }

  save(testCaseDto: CreateTestCaseDTO): Promise<TestCase> {
    return this.testCaseRepository.save(testCaseDto);
  }

  getById(testCaseId: string): Promise<TestCase | null> {
    return this.testCaseRepository.getById(testCaseId);
  }

  getByTitle(title: string): Promise<TestCase | null> {
    return this.testCaseRepository.getByTitle(title);
  }

  update(testCase: UpdateTestCaseDTO & { testCaseId: string }): Promise<TestCase> {
    return this.testCaseRepository.update(testCase);
  }

  delete(testCaseId: string): Promise<void> {
    return this.testCaseRepository.delete(testCaseId);
  }
}
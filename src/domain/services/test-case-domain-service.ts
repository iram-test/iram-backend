import { TestCase } from "../entities/test-case-entity";
import { TestCaseRepository } from "../repositories/test-case-repository";

export class TestCaseDomainService implements TestCaseRepository {
  constructor(private testCaseRepository: TestCaseRepository) {}

  addTestCase(testCase: TestCase): Promise<TestCase> {
    return this.testCaseRepository.addTestCase(testCase);
  }

  getAll(): Promise<TestCase[]> {
    return this.testCaseRepository.getAll();
  }

  save(testCase: TestCase): Promise<TestCase> {
    return this.testCaseRepository.save(testCase);
  }

  getById(testCaseId: string): Promise<TestCase | null> {
    return this.testCaseRepository.getById(testCaseId);
  }

  getByTitle(title: string): Promise<TestCase | null> {
    return this.testCaseRepository.getByTitle(title);
  }

  update(testCase: TestCase): Promise<TestCase> {
    return this.testCaseRepository.update(testCase);
  }

  delete(testCaseId: string): Promise<void> {
    return this.testCaseRepository.delete(testCaseId);
  }
}

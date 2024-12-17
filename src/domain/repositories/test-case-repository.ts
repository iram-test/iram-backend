import { TestCase } from "../entities/test-case-entity";

export interface TestCaseRepository {
  addTestCase(testCase: TestCase): Promise<TestCase>;
  getAll(): Promise<TestCase[]>;
  save(testCase: TestCase): Promise<TestCase>;
  getById(testCaseId: string): Promise<TestCase | null>;
  getByTitle(title: string): Promise<TestCase | null>;
  update(testCase: TestCase): Promise<TestCase>;
  delete(testCaseId: string): Promise<void>;
}

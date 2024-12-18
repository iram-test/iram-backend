import { TestRun } from "../entities/test-run-entity";

export interface TestRunRepository {
  addTestRun(testCase: TestRun): Promise<TestRun>;
  getAll(): Promise<TestRun[]>;
  save(testCase: TestRun): Promise<TestRun>;
  getById(testCaseId: string): Promise<TestRun | null>;
  update(testCase: TestRun): Promise<TestRun>;
  delete(testCaseId: string): Promise<void>;
}

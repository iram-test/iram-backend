import { TestRunStep } from "../entities/test-run-step-entity";

export interface TestRunStepRepository {
  addTestRunStep(testRunStep: TestRunStep): Promise<TestRunStep>;
  getAll(): Promise<TestRunStep[]>;
  getById(testRunStepId: string): Promise<TestRunStep | null>;
  save(testRunStep: TestRunStep): Promise<TestRunStep>;
  update(testRunStep: TestRunStep): Promise<TestRunStep>;
  delete(testRunStepId: string): Promise<void>;
}

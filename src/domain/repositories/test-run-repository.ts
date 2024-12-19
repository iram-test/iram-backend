import { TestRun } from "../entities/test-run-entity";
import {
  CreateTestRunDTO,
  UpdateTestRunDTO,
} from "../../application/dtos/test-run-dto";

export interface TestRunRepository {
  addTestRun(testRun: CreateTestRunDTO): Promise<TestRun>;
  getAll(): Promise<TestRun[]>;
  getById(testRunId: string): Promise<TestRun | null>;
  save(testRun: TestRun): Promise<TestRun>;
  update(testRun: UpdateTestRunDTO & { testRunId: string }): Promise<TestRun>;
  delete(testRunId: string): Promise<void>;
}

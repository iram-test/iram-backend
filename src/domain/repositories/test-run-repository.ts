import { TestRun } from "../entities/test-run-entity";
import {
  CreateTestRunDTO,
  UpdateTestRunDTO,
} from "../../application/dtos/test-run-dto";

export interface TestRunRepository {
  addTestRun(
    testRun: CreateTestRunDTO & { projectId: string },
  ): Promise<TestRun>;
  getAll(): Promise<TestRun[]>;
  getById(testRunId: string): Promise<TestRun | null>;
  update(testRun: UpdateTestRunDTO): Promise<TestRun>;
  delete(testRunId: string): Promise<void>;
  getByProjectId(projectId: string): Promise<TestRun[]>;
  getTestRunByProjectId(projectId: string): Promise<TestRun[]>;
  getTestRunByUserId(userId: string): Promise<TestRun[]>;
  getTestRunByTestReportId(testReportId: string): Promise<TestRun[]>;
  getTestRunsByIds(ids: string[]): Promise<TestRun[]>;
}

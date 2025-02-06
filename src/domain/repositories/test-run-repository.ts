import { TestRun } from "../entities/test-run-entity";
import {
  CreateTestRunDTO,
  UpdateTestRunDTO,
} from "../../application/dtos/test-run-dto";

export interface TestRunRepository {
  addTestRun(testRun: CreateTestRunDTO): Promise<TestRun>;
  getAll(): Promise<TestRun[]>;
  getById(testRunId: string): Promise<TestRun | null>;
  update(testRun: UpdateTestRunDTO): Promise<TestRun>;
  delete(testRunId: string): Promise<void>;
  getByProjectId(projectId: string): Promise<TestRun[]>;
  getByMilestoneId(milestoneId: string): Promise<TestRun[]>;
  getByAssignedUserId(assignedUserId: string): Promise<TestRun[]>;
  getByTestCaseId(testCaseId: string): Promise<TestRun[]>;
}

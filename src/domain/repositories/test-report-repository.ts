import { TestReport } from "../entities/test-report-entity";
import {
  CreateTestReportDTO,
  UpdateTestReportDTO,
} from "../../application/dtos/test-report-dto";

export interface TestReportRepository {
  addTestReport(testReport: CreateTestReportDTO): Promise<TestReport>;
  getAll(): Promise<TestReport[]>;
  update(testReport: UpdateTestReportDTO): Promise<TestReport>;
  getById(testReportId: string): Promise<TestReport | null>;
  getByName(reportName: string): Promise<TestReport | null>;
  delete(testReportId: string): Promise<void>;
  getByAssignedUserId(assignedUserId: string): Promise<TestReport[]>;
  getByTestCaseId(testCaseId: string): Promise<TestReport[]>;
  getByMilestoneId(milestoneId: string): Promise<TestReport[]>;
  getByTestRunId(testRunId: string): Promise<TestReport[]>;
}

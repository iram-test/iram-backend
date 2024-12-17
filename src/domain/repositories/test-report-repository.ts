import { TestReport } from "../entities/test-report-entity";

export interface TestReportRepository {
  addTestReport(testReport: TestReport): Promise<TestReport>;
  getAll(): Promise<TestReport[]>;
  save(testReport: TestReport): Promise<TestReport>;
  getById(testReportId: string): Promise<TestReport | null>;
  getByName(reportName: string): Promise<TestReport | null>;
  update(testReport: TestReport): Promise<TestReport>;
  delete(testReportId: string): Promise<void>;
}

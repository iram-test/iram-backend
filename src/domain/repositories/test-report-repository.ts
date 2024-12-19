import { TestReport } from "../entities/test-report-entity";
import {
  CreateTestReportDTO,
  UpdateTestReportDTO,
} from "../../application/dtos/test-report-dto";

export interface TestReportRepository {
  addTestReport(testReport: CreateTestReportDTO): Promise<TestReport>;
  getAll(): Promise<TestReport[]>;
  save(testReport: CreateTestReportDTO): Promise<TestReport>;
  getById(testReportId: string): Promise<TestReport | null>;
  getByName(reportName: string): Promise<TestReport | null>;
  update(
    testReport: UpdateTestReportDTO & { testReportId: string },
  ): Promise<TestReport>;
  delete(testReportId: string): Promise<void>;
}

import { TestReport } from "../entities/test-report-entity";
import { TestReportRepository } from "../repositories/test-report-repository";
import {
  CreateTestReportDTO,
  UpdateTestReportDTO,
} from "../../application/dtos/test-report-dto";

export class TestReportDomainService implements TestReportRepository {
  constructor(private testReportRepository: TestReportRepository) {}

  async addTestReport(testReportDto: CreateTestReportDTO): Promise<TestReport> {
    const testReport = new TestReport(
      "",
      testReportDto.name,
      testReportDto.reference ?? null,
      testReportDto.description,
      testReportDto.assignedUserId ?? null,
      testReportDto.testCaseIds,
      testReportDto.milestoneIds,
      testReportDto.testRunIds,
      new Date().toISOString(),
      new Date().toISOString(),
    );
    return await this.testReportRepository.addTestReport(testReport); // Pass the constructed entity
  }

  getAll(): Promise<TestReport[]> {
    return this.testReportRepository.getAll();
  }

  getById(testReportId: string): Promise<TestReport | null> {
    return this.testReportRepository.getById(testReportId);
  }

  getByName(reportName: string): Promise<TestReport | null> {
    return this.testReportRepository.getByName(reportName);
  }

  update(testReportDto: UpdateTestReportDTO): Promise<TestReport> {
    return this.testReportRepository.update(testReportDto);
  }

  delete(testReportId: string): Promise<void> {
    return this.testReportRepository.delete(testReportId);
  }
  getByAssignedUserId(assignedUserId: string): Promise<TestReport[]> {
    return this.testReportRepository.getByAssignedUserId(assignedUserId);
  }
  getByTestCaseId(testCaseId: string): Promise<TestReport[]> {
    return this.testReportRepository.getByTestCaseId(testCaseId);
  }
  getByMilestoneId(milestoneId: string): Promise<TestReport[]> {
    return this.testReportRepository.getByMilestoneId(milestoneId);
  }
  getByTestRunId(testRunId: string): Promise<TestReport[]> {
    return this.testReportRepository.getByTestRunId(testRunId);
  }
}

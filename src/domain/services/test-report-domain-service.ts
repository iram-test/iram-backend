import { TestReport } from "../entities/test-report-entity";
import { TestReportRepository } from "../repositories/test-report-repository";
import {
  CreateTestReportDTO,
  UpdateTestReportDTO,
} from "../../application/dtos/test-report-dto";

export class TestReportDomainService implements TestReportRepository {
  constructor(private testReportRepository: TestReportRepository) {}

  addTestReport(testReportDto: CreateTestReportDTO): Promise<TestReport> {
      const testReport = new TestReport(
          '',
          testReportDto.name,
          testReportDto.reference ?? null,
          testReportDto.milestoneId ?? null,
          testReportDto.description,
          testReportDto.assignedUserId ?? null,
          testReportDto.testCaseId,
          new Date().toISOString(),
          new Date().toISOString(),
      );
    return this.testReportRepository.addTestReport(testReportDto);
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

  update(
    testReportDto: UpdateTestReportDTO
  ): Promise<TestReport> {
    return this.testReportRepository.update(testReportDto);
  }

  delete(testReportId: string): Promise<void> {
    return this.testReportRepository.delete(testReportId);
  }
}

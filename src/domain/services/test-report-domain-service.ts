import { TestReport } from "../entities/test-report-entity";
import { TestReportRepository } from "../repositories/test-report-repository";

export class TestReportDomainService implements TestReportRepository {
  constructor(private testReportRepository: TestReportRepository) {}

  addTestReport(testReport: TestReport): Promise<TestReport> {
    return this.testReportRepository.addTestReport(testReport);
  }

  getAll(): Promise<TestReport[]> {
    return this.testReportRepository.getAll();
  }

  save(testReport: TestReport): Promise<TestReport> {
    return this.testReportRepository.save(testReport);
  }

  getById(testReportId: string): Promise<TestReport | null> {
    return this.testReportRepository.getById(testReportId);
  }

  getByName(name: string): Promise<TestReport | null> {
    return this.testReportRepository.getByName(name);
  }

  update(testReport: TestReport): Promise<TestReport> {
    return this.testReportRepository.update(testReport);
  }

  delete(testReportId: string): Promise<void> {
    return this.testReportRepository.delete(testReportId);
  }
}

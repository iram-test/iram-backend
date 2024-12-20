import { TestReport } from "../entities/test-report-entity";
import { TestReportRepository } from "../repositories/test-report-repository";
import {
  CreateTestReportDTO,
  UpdateTestReportDTO,
} from "../../application/dtos/test-report-dto";

export class TestReportDomainService implements TestReportRepository {
  constructor(private testReportRepository: TestReportRepository) {}

  addTestReport(testReportDto: CreateTestReportDTO): Promise<TestReport> {
    return this.testReportRepository.addTestReport(testReportDto);
  }

  getAll(): Promise<TestReport[]> {
    return this.testReportRepository.getAll();
  }

  save(testReportDto: CreateTestReportDTO): Promise<TestReport> {
    return this.testReportRepository.save(testReportDto);
  }


  getById(testReportId: string): Promise<TestReport | null> {
    return this.testReportRepository.getById(testReportId);
  }

  getByName(name: string): Promise<TestReport | null> {
     return this.testReportRepository.getByName(name);
  }


  update(testReport: UpdateTestReportDTO & { testReportId: string }): Promise<TestReport> {
    return this.testReportRepository.update(testReport);
  }

  delete(testReportId: string): Promise<void> {
    return this.testReportRepository.delete(testReportId);
  }
}
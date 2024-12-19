// src/infrastructure/db/PostgresRepository/TestReportPostgresRepository.ts
import { TestReport } from "../../../domain/entities/test-report-entity";
import { PostgresDataSource } from "../../../tools/db-connection";
import { Repository, FindOptionsWhere } from "typeorm";
import { TestReportRepository } from "../../../domain/repositories/test-report-repository";
import {
  CreateTestReportDTO,
  UpdateTestReportDTO,
} from "../../../application/dtos/test-report-dto";
import { v4 } from "uuid";

export class TestReportPostgresRepository implements TestReportRepository {
  private repository: Repository<TestReport>;
  constructor() {
    this.repository = PostgresDataSource.getRepository(TestReport);
  }
  async addTestReport(testReport: CreateTestReportDTO): Promise<TestReport> {
    const createdTestReport = this.repository.create({
      ...testReport,
      testReportId: v4(),
    });
    return await this.repository.save(createdTestReport);
  }
  async getAll(): Promise<TestReport[]> {
    return await this.repository.find();
  }
  async getById(testReportId: string): Promise<TestReport | null> {
    return await this.repository.findOneBy({ testReportId });
  }
  async getByName(reportName: string): Promise<TestReport | null> {
    return await this.repository.findOneBy({ name: reportName });
  }
  async update(
    testReport: UpdateTestReportDTO & { testReportId: string },
  ): Promise<TestReport> {
    const existingTestReport = await this.repository.findOneBy({
      testReportId: testReport.testReportId,
    });
    if (!existingTestReport) {
      throw new Error(
        `Test report with id ${testReport.testReportId} was not found`,
      );
    }
    await this.repository.update(testReport.testReportId, { ...testReport });
    return (await this.repository.findOneBy({
      testReportId: testReport.testReportId,
    })) as TestReport;
  }
  async delete(testReportId: string): Promise<void> {
    await this.repository.delete({ testReportId });
  }

  async save(testReport: TestReport): Promise<TestReport> {
    return await this.repository.save(testReport);
  }

  async getBy(
    options: FindOptionsWhere<TestReport>,
  ): Promise<TestReport | null> {
    return await this.repository.findOneBy(options);
  }
}

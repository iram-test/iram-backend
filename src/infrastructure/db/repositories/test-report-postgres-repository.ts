import { TestReport } from "../../../domain/entities/test-report-entity";
import { TestReportEntity } from "../entities/test-report-entity";
import { PostgresDataSource } from "../../../tools/db-connection";
import { Repository, FindOptionsWhere } from "typeorm";
import { TestReportRepository } from "../../../domain/repositories/test-report-repository";
import {
  CreateTestReportDTO,
  UpdateTestReportDTO,
} from "../../../application/dtos/test-report-dto";
import { v4 } from "uuid";

export class TestReportPostgresRepository implements TestReportRepository {
  private repository: Repository<TestReportEntity>;
  constructor() {
    this.repository = PostgresDataSource.getRepository(TestReportEntity);
  }
  async addTestReport(testReport: CreateTestReportDTO): Promise<TestReport> {
    const createdTestReport = this.repository.create({
      testReportId: v4(),
      name: testReport.name,
      reference: testReport.reference === null ? null : testReport.reference,
      milestoneId:
        testReport.milestoneId === null ? null : testReport.milestoneId,
      description: testReport.description,
      assignedUserId:
        testReport.assignedUserId === null ? null : testReport.assignedUserId,
      testCaseId: testReport.testCaseId,
      folderId: testReport.folderId === null ? null : testReport.folderId,
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

    const updateTestReport: any = {
      name: testReport.name,
      reference: testReport.reference === null ? null : testReport.reference,
      milestoneId:
        testReport.milestoneId === null ? null : testReport.milestoneId,
      description: testReport.description,
      assignedUserId:
        testReport.assignedUserId === null ? null : testReport.assignedUserId,
      testCaseId: testReport.testCaseId,
      folderId: testReport.folderId === null ? null : testReport.folderId,
    };

    await this.repository.update(testReport.testReportId, updateTestReport);
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

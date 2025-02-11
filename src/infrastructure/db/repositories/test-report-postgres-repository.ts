import { DataSource, Repository } from "typeorm";
import { TestReportEntity } from "../entities/test-report-entity";
import { TestReport } from "../../../domain/entities/test-report-entity";
import {
  CreateTestReportDTO,
  UpdateTestReportDTO,
} from "../../../application/dtos/test-report-dto";
import { TestReportRepository } from "../../../domain/repositories/test-report-repository";
import { PostgresDataSource } from "../../../tools/db-connection";

export class TestReportPostgresRepository implements TestReportRepository {
  private repository: Repository<TestReportEntity>;

  constructor(private readonly dataSource: DataSource = PostgresDataSource) {
    this.repository = this.dataSource.getRepository(TestReportEntity);
  }

  async addTestReport(
    createDto: CreateTestReportDTO & { projectId: string },
  ): Promise<TestReport> {
    const testReport = this.repository.create(createDto);
    const savedTestReport = await this.repository.save(testReport);
    return this.toDomainEntity(savedTestReport);
  }

  async getAll(): Promise<TestReport[]> {
    const testReports = await this.repository.find({
      relations: ["project", "assignedUser", "testRuns", "milestones"],
    });
    return testReports.map((entity) => this.toDomainEntity(entity));
  }

  async update(updateDto: UpdateTestReportDTO): Promise<TestReport> {
    const { testReportId, ...updateData } = updateDto;
    await this.repository.update(testReportId, updateData);
    const updatedTestReport = await this.repository.findOneOrFail({
      where: { testReportId },
      relations: ["project", "assignedUser", "testRuns", "milestones"],
    });
    return this.toDomainEntity(updatedTestReport);
  }

  async getById(testReportId: string): Promise<TestReport | null> {
    const testReport = await this.repository.findOne({
      where: { testReportId },
      relations: ["project", "assignedUser", "testRuns", "milestones"],
    });
    return testReport ? this.toDomainEntity(testReport) : null;
  }

  async getByName(reportName: string): Promise<TestReport | null> {
    const testReport = await this.repository.findOne({
      where: { name: reportName },
      relations: ["project", "assignedUser", "testRuns", "milestones"],
    });
    return testReport ? this.toDomainEntity(testReport) : null;
  }

  async delete(testReportId: string): Promise<void> {
    await this.repository.delete(testReportId);
  }

  async getByAssignedUserId(assignedUserId: string): Promise<TestReport[]> {
    const testReports = await this.repository.find({
      where: { assignedUser: { userId: assignedUserId } },
      relations: ["project", "assignedUser", "testRuns", "milestones"],
    });
    return testReports.map((entity) => this.toDomainEntity(entity));
  }

  async getTestReportsByProjectId(projectId: string): Promise<TestReport[]> {
    const testReports = await this.repository.find({
      where: { project: { projectId: projectId } },
      relations: ["project", "assignedUser", "testRuns", "milestones"],
    });
    return testReports.map((entity) => this.toDomainEntity(entity));
  }

  async getTestReportsByUserId(userId: string): Promise<TestReport[]> {
    const testReports = await this.repository.find({
      where: { assignedUser: { userId: userId } },
      relations: ["project", "assignedUser", "testRuns", "milestones"],
    });
    return testReports.map((entity) => this.toDomainEntity(entity));
  }

  private toDomainEntity(entity: TestReportEntity): TestReport {
    const testCaseIds: string[] = [];
    const milestoneIds = entity.milestones
      ? entity.milestones.map((milestone) => milestone.milestoneID)
      : [];
    const testRunIds = entity.testRuns
      ? entity.testRuns.map((testRun) => testRun.testRunId)
      : [];

    return new TestReport(
      entity.testReportId,
      entity.name,
      entity.reference,
      entity.description,
      entity.assignedUser ? entity.assignedUser.userId : null,
      testCaseIds,
      milestoneIds,
      testRunIds,
      entity.project.projectId,
      entity.createdAt.toISOString(),
      entity.updatedAt.toISOString(),
    );
  }
}

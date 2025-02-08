import { DataSource, Repository } from "typeorm";
import { TestRunEntity } from "../entities/test-run-entity";
import { TestRun } from "../../../domain/entities/test-run-entity";
import {
  CreateTestRunDTO,
  UpdateTestRunDTO,
} from "../../../application/dtos/test-run-dto";
import { TestRunRepository } from "../../../domain/repositories/test-run-repository";
import { PostgresDataSource } from "../../../tools/db-connection";

export class TestRunPostgresRepository implements TestRunRepository {
  private repository: Repository<TestRunEntity>;

  constructor(private readonly dataSource: DataSource = PostgresDataSource) {
    this.repository = this.dataSource.getRepository(TestRunEntity);
  }

  async addTestRun(createDto: CreateTestRunDTO): Promise<TestRun> {
    const testRun = this.repository.create(createDto);
    const savedTestRun = await this.repository.save(testRun);
    return this.toDomainEntity(savedTestRun);
  }

  async getAll(): Promise<TestRun[]> {
    const testRuns = await this.repository.find({
      relations: ["testCase", "milestones", "project", "testReport"],
    });
    return testRuns.map((entity) => this.toDomainEntity(entity));
  }

  async getById(testRunId: string): Promise<TestRun | null> {
    const testRun = await this.repository.findOne({
      where: { testRunId },
      relations: ["testCase", "milestones", "project", "testReport"],
    });
    return testRun ? this.toDomainEntity(testRun) : null;
  }

  async update(updateDto: UpdateTestRunDTO): Promise<TestRun> {
    const { testRunId, ...updateData } = updateDto;
    await this.repository.update(testRunId, updateData);
    const updatedTestRun = await this.repository.findOneOrFail({
      where: { testRunId },
      relations: ["testCase", "milestones", "project", "testReport"],
    });
    return this.toDomainEntity(updatedTestRun);
  }

  async delete(testRunId: string): Promise<void> {
    await this.repository.delete(testRunId);
  }

  async getByProjectId(projectId: string): Promise<TestRun[]> {
    const testRuns = await this.repository.find({
      where: { project: { projectId } },
      relations: ["testCase", "milestones", "project", "testReport"],
    });
    return testRuns.map((entity) => this.toDomainEntity(entity));
  }

  private toDomainEntity(entity: TestRunEntity): TestRun {
    const milestoneIds = entity.milestones
      ? entity.milestones.map((milestone) => milestone.milestoneID)
      : [];

    const testCaseIds = entity.testCase
      ? entity.testCase.map((testCase) => testCase.testCaseId)
      : [];

    return new TestRun(
      entity.testRunId,
      entity.name,
      milestoneIds,
      null,
      entity.project.projectId,
      testCaseIds,
      entity.description,
      entity.createdAt.toISOString(),
      entity.updatedAt.toISOString(),
    );
  }
}

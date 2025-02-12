import { DataSource, Repository, In } from "typeorm";
import { TestRunEntity } from "../entities/test-run-entity";
import { TestRun } from "../../../domain/entities/test-run-entity";
import {
  CreateTestRunDTO,
  UpdateTestRunDTO,
} from "../../../application/dtos/test-run-dto";
import { TestRunRepository } from "../../../domain/repositories/test-run-repository";
import { PostgresDataSource } from "../../../tools/db-connection";
import { ProjectEntity } from "../entities/project-entity";
import { TestCaseEntity } from "../entities/test-case-entity";
import { UserEntity } from "../entities/user-entity";
import { MilestoneEntity } from "../entities/milestone-entity";
import { CustomError } from "../../../tools/custom-error";

export class TestRunPostgresRepository implements TestRunRepository {
  private repository: Repository<TestRunEntity>;

  constructor(private readonly dataSource: DataSource = PostgresDataSource) {
    this.repository = this.dataSource.getRepository(TestRunEntity);
  }

  async addTestRun(
    createDto: CreateTestRunDTO & { projectId: string },
  ): Promise<TestRun> {
    const projectRepository = this.dataSource.getRepository(ProjectEntity);
    const project = await projectRepository.findOneBy({
      projectId: createDto.projectId,
    });
    if (!project) {
      throw new CustomError("Project not found", 404);
    }

    let milestone;
    if (createDto.milestoneId) {
      const milestoneRepository =
        this.dataSource.getRepository(MilestoneEntity);
      milestone = await milestoneRepository.findOneBy({
        milestoneID: createDto.milestoneId,
      });
      if (!milestone) {
        throw new CustomError("Milestone not found", 404);
      }
    }

    let assignedUser;
    if (createDto.assignedUserId) {
      const userRepository = this.dataSource.getRepository(UserEntity);
      assignedUser = await userRepository.findOneBy({
        userId: createDto.assignedUserId,
      });
      if (!assignedUser) {
        throw new CustomError("User not found", 404);
      }
    }

    let testCases: TestCaseEntity[] = [];
    if (createDto.testCaseIds && createDto.testCaseIds.length > 0) {
      const testCaseRepository = this.dataSource.getRepository(TestCaseEntity);
      testCases = await testCaseRepository.findBy({
        testCaseId: In(createDto.testCaseIds),
      });

      if (testCases.length !== createDto.testCaseIds.length) {
        throw new CustomError("One or more Test Cases not found", 500);
      }
    }

    const testRun = this.repository.create({
      ...createDto,
      project,
      milestone,
      assignedUser,
      testCases,
    });

    const savedTestRun = await this.repository.save(testRun);
    const testRunFull = await this.repository.findOne({
      where: { testRunId: savedTestRun.testRunId },
      relations: [
        "testCases",
        "milestone",
        "project",
        "testReport",
        "assignedUser",
      ],
    });

    if (!testRunFull) {
      throw new CustomError(
        "Could not retrieve saved test run with relations",
        500,
      );
    }

    return this.toDomainEntity(testRunFull);
  }

  async getAll(): Promise<TestRun[]> {
    const testRuns = await this.repository.find({
      relations: [
        "testCases",
        "milestone",
        "project",
        "testReport",
        "assignedUser",
      ],
    });
    return testRuns.map((entity) => this.toDomainEntity(entity));
  }

  async getById(testRunId: string): Promise<TestRun | null> {
    const testRun = await this.repository.findOne({
      where: { testRunId },
      relations: [
        "testCases",
        "milestone",
        "project",
        "testReport",
        "assignedUser",
      ],
    });
    return testRun ? this.toDomainEntity(testRun) : null;
  }

  async update(updateDto: UpdateTestRunDTO): Promise<TestRun> {
    const { testRunId, ...updateData } = updateDto;
    await this.repository.update(testRunId, updateData);
    const updatedTestRun = await this.repository.findOneOrFail({
      where: { testRunId },
      relations: [
        "testCases",
        "milestone",
        "project",
        "testReport",
        "assignedUser",
      ],
    });
    return this.toDomainEntity(updatedTestRun);
  }

  async delete(testRunId: string): Promise<void> {
    await this.repository.delete(testRunId);
  }

  async getByProjectId(projectId: string): Promise<TestRun[]> {
    const testRuns = await this.repository.find({
      where: { project: { projectId } },
      relations: [
        "testCases",
        "milestone",
        "project",
        "testReport",
        "assignedUser",
      ],
    });
    return testRuns.map((entity) => this.toDomainEntity(entity));
  }

  async getTestRunByProjectId(projectId: string): Promise<TestRun[]> {
    return this.getByProjectId(projectId);
  }

  async getTestRunByUserId(userId: string): Promise<TestRun[]> {
    const testRuns = await this.repository.find({
      where: { assignedUser: { userId } },
      relations: [
        "testCases",
        "milestone",
        "project",
        "testReport",
        "assignedUser",
      ],
    });
    return testRuns.map((entity) => this.toDomainEntity(entity));
  }

  async getTestRunByTestReportId(testReportId: string): Promise<TestRun[]> {
    const testRuns = await this.repository.find({
      where: { testReport: { testReportId } },
      relations: [
        "testCases",
        "milestone",
        "project",
        "testReport",
        "assignedUser",
      ],
    });
    return testRuns.map((entity) => this.toDomainEntity(entity));
  }

  private toDomainEntity(entity: TestRunEntity): TestRun {
    const testCaseIds = entity.testCases
      ? entity.testCases.map((testCase) => testCase.testCaseId)
      : [];
    const milestoneId = entity.milestone ? entity.milestone.milestoneID : null;
    const assignedUserId = entity.assignedUser
      ? entity.assignedUser.userId
      : null;

    if (!entity.project) {
      throw new Error("Project relation is not loaded");
    }

    return new TestRun(
      entity.testRunId,
      entity.name,
      milestoneId,
      assignedUserId,
      entity.project.projectId,
      testCaseIds,
      entity.description,
      entity.createdAt.toISOString(),
      entity.updatedAt.toISOString(),
    );
  }
}

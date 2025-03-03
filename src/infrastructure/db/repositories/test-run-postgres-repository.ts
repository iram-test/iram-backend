import { DataSource, In, Repository } from "typeorm";
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
import { v4 as uuidv4 } from "uuid";

export class TestRunPostgresRepository implements TestRunRepository {
  private repository: Repository<TestRunEntity>;

  constructor(private readonly dataSource: DataSource = PostgresDataSource) {
    this.repository = this.dataSource.getRepository(TestRunEntity);
  }

  async addTestRun(
    createDto: CreateTestRunDTO & { projectId: string },
  ): Promise<TestRun> {
    const testRunId = uuidv4();
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
        milestoneId: createDto.milestoneId,
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
      testRunId,
      project,
      milestone,
      assignedUser,
    });

    const savedTestRun = await this.repository.save(testRun);

    if (testCases.length > 0) {
      savedTestRun.testCases = testCases;
      await this.dataSource.manager.save(savedTestRun);
    }

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
    const {
      testRunId,
      milestoneId,
      assignedUserId,
      testCaseIds,
      ...otherData
    } = updateDto;
    const updateData: any = { ...otherData };

    const testRun = await this.repository.findOne({
      where: { testRunId },
      relations: ["testCases", "milestone", "assignedUser"],
    });

    if (!testRun) {
      throw new CustomError("Test Run not found", 404);
    }

    if (milestoneId !== undefined) {
      if (milestoneId === null) {
        updateData.milestone = null;
      } else {
        const milestoneRepository =
          this.dataSource.getRepository(MilestoneEntity);
        const milestone = await milestoneRepository.findOneBy({ milestoneId });
        if (!milestone) {
          throw new CustomError("Milestone not found", 404);
        }
        updateData.milestone = milestone;
      }
    }

    if (assignedUserId !== undefined) {
      if (assignedUserId === null) {
        updateData.assignedUser = null;
      } else {
        const userRepository = this.dataSource.getRepository(UserEntity);
        const user = await userRepository.findOneBy({ userId: assignedUserId });
        if (!user) {
          throw new CustomError("User not found", 404);
        }
        updateData.assignedUser = user;
      }
    }

    if (testCaseIds !== undefined) {
      const testCaseRepository = this.dataSource.getRepository(TestCaseEntity);
      const newTestCases: TestCaseEntity[] = await testCaseRepository.findBy({
        testCaseId: In(testCaseIds),
      });

      if (newTestCases.length !== testCaseIds.length) {
        throw new CustomError("One or more Test Cases not found", 500);
      }

      testRun.testCases = newTestCases;
      await this.dataSource.manager.save(testRun);
    }

    Object.assign(testRun, otherData);

    await this.repository.save(testRun);

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
    await this.dataSource.transaction(async (transactionalEntityManager) => {
      const testRun = await transactionalEntityManager.findOne(TestRunEntity, {
        where: { testRunId },
        relations: ["testCases"],
      });

      if (!testRun) {
        throw new CustomError("Test Run not found", 404);
      }

      testRun.testCases = [];
      await transactionalEntityManager.save(testRun);

      await transactionalEntityManager.delete(TestRunEntity, testRunId);
    });
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

  async getTestRunsByIds(ids: string[]): Promise<TestRun[]> {
    const testRuns = await this.repository.find({
      where: { testRunId: In(ids) },
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
    const milestoneId = entity.milestone ? entity.milestone.milestoneId : null;
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

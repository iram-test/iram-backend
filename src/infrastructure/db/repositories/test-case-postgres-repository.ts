import { DataSource, Repository } from "typeorm";
import { TestCaseEntity } from "../entities/test-case-entity";
import { TestCase } from "../../../domain/entities/test-case-entity";
import {
  CreateTestCaseDTO,
  UpdateTestCaseDTO,
} from "../../../application/dtos/test-case-dto";
import { TestCaseRepository } from "../../../domain/repositories/test-case-repository";
import { PostgresDataSource } from "../../../tools/db-connection";
import { UserEntity } from "../entities/user-entity";

export class TestCasePostgresRepository implements TestCaseRepository {
  private repository: Repository<TestCaseEntity>;

  constructor(private readonly dataSource: DataSource = PostgresDataSource) {
    this.repository = this.dataSource.getRepository(TestCaseEntity);
  }

  async addTestCase(
    createDto: CreateTestCaseDTO & { projectId: string; sectionId: string },
  ): Promise<TestCase> {
    const testCase = this.repository.create(createDto);

    if (createDto.assignedUserId) {
      const userRepository = this.dataSource.getRepository(UserEntity);
      const user = await userRepository.findOne({
        where: { userId: createDto.assignedUserId },
      });
      if (user) {
        testCase.assignedUser = user;
      } else {
        throw new Error("User not found");
      }
    }

    const savedTestCase = await this.repository.save(testCase);
    return this.toDomainEntity(savedTestCase);
  }

  async getAll(): Promise<TestCase[]> {
    const testCases = await this.repository.find({
      relations: ["project", "assignedUser", "section", "steps", "testRun"],
    });
    return testCases.map((entity) => this.toDomainEntity(entity));
  }

  async update(updateDto: UpdateTestCaseDTO): Promise<TestCase> {
    const { testCaseId, ...updateData } = updateDto;
    await this.repository.update(testCaseId, updateData);
    const updatedTestCase = await this.repository.findOneOrFail({
      where: { testCaseId },
      relations: ["project", "assignedUser", "section", "steps", "testRun"],
    });
    return this.toDomainEntity(updatedTestCase);
  }

  async getById(testCaseId: string): Promise<TestCase | null> {
    const testCase = await this.repository.findOne({
      where: { testCaseId },
      relations: ["project", "assignedUser", "section", "steps", "testRun"],
    });
    return testCase ? this.toDomainEntity(testCase) : null;
  }

  async getByTitle(title: string): Promise<TestCase | null> {
    const testCase = await this.repository.findOne({
      where: { title },
      relations: ["project", "assignedUser", "section", "steps", "testRun"],
    });
    return testCase ? this.toDomainEntity(testCase) : null;
  }

  async delete(testCaseId: string): Promise<void> {
    await this.repository.delete(testCaseId);
  }

  async getByProjectId(projectId: string): Promise<TestCase[]> {
    const testCases = await this.repository.find({
      where: { project: { projectId } },
      relations: ["project", "assignedUser", "section", "steps", "testRun"],
    });
    return testCases.map((entity) => this.toDomainEntity(entity));
  }

  async getBySectionId(sectionId: string): Promise<TestCase[]> {
    const testCases = await this.repository.find({
      where: { section: { sectionId: sectionId } },
      relations: ["project", "assignedUser", "section", "steps", "testRun"],
    });
    return testCases.map((entity) => this.toDomainEntity(entity));
  }

  async getByAssignedUserId(assignedUserId: string): Promise<TestCase[]> {
    const testCases = await this.repository.find({
      where: { assignedUser: { userId: assignedUserId } },
      relations: ["project", "assignedUser", "section", "steps", "testRun"],
    });
    return testCases.map((entity) => this.toDomainEntity(entity));
  }

  async getTestCasesByProjectId(projectId: string): Promise<TestCase[]> {
    const testCases = await this.repository.find({
      where: { project: { projectId: projectId } },
      relations: ["project", "assignedUser", "section", "steps", "testRun"],
    });
    return testCases.map((entity) => this.toDomainEntity(entity));
  }

  async getTestCasesByUserId(userId: string): Promise<TestCase[]> {
    const testCases = await this.repository.find({
      where: { assignedUser: { userId: userId } },
      relations: ["project", "assignedUser", "section", "steps", "testRun"],
    });
    return testCases.map((entity) => this.toDomainEntity(entity));
  }

  private toDomainEntity(entity: TestCaseEntity): TestCase {
    const stepIds = entity.steps
      ? entity.steps.map((step) => step.stepId)
      : null;
    return new TestCase(
      entity.testCaseId,
      entity.title,
      entity.section.sectionId,
      entity.projectId,
      entity.assignedUser ? entity.assignedUser.userId : null,
      entity.templateType,
      entity.testType,
      entity.priority,
      entity.timeEstimation,
      entity.description,
      stepIds,
      entity.createdAt.toISOString(),
      entity.updatedAt.toISOString(),
    );
  }
}

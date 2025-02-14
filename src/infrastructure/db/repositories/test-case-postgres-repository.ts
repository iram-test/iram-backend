import { DataSource, In, Repository } from "typeorm";
import { TestCaseEntity } from "../entities/test-case-entity";
import { TestCase } from "../../../domain/entities/test-case-entity";
import {
  CreateTestCaseDTO,
  UpdateTestCaseDTO,
} from "../../../application/dtos/test-case-dto";
import { TestCaseRepository } from "../../../domain/repositories/test-case-repository";
import { PostgresDataSource } from "../../../tools/db-connection";
import { UserEntity } from "../entities/user-entity";
import { SectionEntity } from "../entities/section-entity";
import { SubSectionEntity } from "../entities/subsection-entity";
import { CustomError } from "../../../tools/custom-error";

export class TestCasePostgresRepository implements TestCaseRepository {
  private repository: Repository<TestCaseEntity>;

  constructor(private readonly dataSource: DataSource = PostgresDataSource) {
    this.repository = this.dataSource.getRepository(TestCaseEntity);
  }

  async addTestCase(
    createDto: CreateTestCaseDTO & {
      projectId: string;
      sectionId?: string | null;
    },
  ): Promise<TestCase> {
    const testCase = this.repository.create(createDto);

    if (createDto.sectionId) {
      const sectionRepository = this.dataSource.getRepository(SectionEntity);
      const section = await sectionRepository.findOne({
        where: { sectionId: createDto.sectionId },
      });
      if (section) {
        testCase.section = section;
        testCase.sectionId = section.sectionId;
        testCase.subsectionId = null;
      } else {
        const subSectionRepository =
          this.dataSource.getRepository(SubSectionEntity);
        const subSection = await subSectionRepository.findOne({
          where: { subsectionId: createDto.sectionId },
          relations: ["section"],
        });
        if (subSection) {
          testCase.section = subSection.section;
          testCase.sectionId = subSection.section.sectionId;
          testCase.subsectionId = subSection.subsectionId;
        } else {
          throw new CustomError("Section or SubSection not found", 404);
        }
      }
    }

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

  async update(updateDto: UpdateTestCaseDTO): Promise<TestCase> {
    const { testCaseId, sectionId, ...updateData } = updateDto;

    const existingTestCase = await this.repository.findOneOrFail({
      where: { testCaseId },
      relations: ["project", "assignedUser", "section", "steps", "testRun"],
    });

    if (sectionId !== undefined) {
      if (sectionId === null) {
        existingTestCase.section = null as any;
        existingTestCase.sectionId = null;
        existingTestCase.subsectionId = null;
      } else {
        const sectionRepository = this.dataSource.getRepository(SectionEntity);
        const section = await sectionRepository.findOne({
          where: { sectionId },
        });
        if (section) {
          existingTestCase.section = section;
          existingTestCase.sectionId = section.sectionId;
          existingTestCase.subsectionId = null;
        } else {
          // Пробуємо знайти як підсекцію
          const subSectionRepository =
            this.dataSource.getRepository(SubSectionEntity);
          const subSection = await subSectionRepository.findOne({
            where: { subsectionId: sectionId },
            relations: ["section"],
          });
          if (!subSection) {
            throw new Error("Section or SubSection not found");
          }
          existingTestCase.section = subSection.section;
          existingTestCase.sectionId = subSection.section.sectionId;
          existingTestCase.subsectionId = subSection.subsectionId;
        }
      }
    }

    Object.assign(existingTestCase, updateData);

    const updatedTestCase = await this.repository.save(existingTestCase);
    return this.toDomainEntity(updatedTestCase);
  }

  async getAll(): Promise<TestCase[]> {
    const testCases = await this.repository.find({
      relations: ["project", "assignedUser", "section", "steps", "testRun"],
    });
    return testCases.map((entity) => this.toDomainEntity(entity));
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

  async getBySubSectionId(subsectionId: string): Promise<TestCase[]> {
    const testCases = await this.repository.find({
      where: { subsectionId: subsectionId },
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

  async getTestCasesByIds(ids: string[]): Promise<TestCase[]> {
    const testCases = await this.repository.find({
      where: { testCaseId: In(ids) },
      relations: ["project", "assignedUser", "section", "steps", "testRun"],
    });
    return testCases.map((entity) => this.toDomainEntity(entity));
  }

  private toDomainEntity(entity: TestCaseEntity): TestCase {
    const resolvedSectionId = entity.subsectionId
      ? entity.subsectionId
      : entity.section
        ? entity.section.sectionId
        : null;
    const stepIds = entity.steps
      ? entity.steps.map((step) => step.stepId)
      : null;
    return new TestCase(
      entity.testCaseId,
      entity.title,
      resolvedSectionId,
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

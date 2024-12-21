import { TestCase } from "../../../domain/entities/test-case-entity";
import { TestCaseEntity } from "../entities/test-case-entity";
import { PostgresDataSource } from "../../../tools/db-connection";
import { Repository, FindOptionsWhere } from "typeorm";
import { TestCaseRepository } from "../../../domain/repositories/test-case-repository";
import {
  CreateTestCaseDTO,
  UpdateTestCaseDTO,
} from "../../../application/dtos/test-case-dto";
import { v4 } from "uuid";
import { StepDTO } from "../../../application/dtos/step-dto";

export class TestCasePostgresRepository implements TestCaseRepository {
  private repository: Repository<TestCaseEntity>;

  constructor() {
    this.repository = PostgresDataSource.getRepository(TestCaseEntity);
  }

  private entityToTestCase(entity: TestCaseEntity): TestCase {
    return new TestCase(
      entity.testCaseId,
      entity.title,
      entity.collection,
      entity.folderId,
      entity.templateType,
      entity.testType,
      entity.priority,
      entity.description,
      entity.timeEstimation,
      entity.reference,
      entity.createdAt,
      entity.updatedAt,
      entity.projectId,
      entity.status,
      entity.assignedUserId,
      entity.comment,
      entity.elapsedTime,
      entity.defects,
      entity.version,
      (entity.steps || []).map((step) => ({
        ...step,
        image: step.image === null ? undefined : step.image,
      })),
    );
  }

  async addTestCase(testCase: CreateTestCaseDTO): Promise<TestCase> {
    const createdTestCase = this.repository.create({
      ...testCase,
      testCaseId: v4(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const savedTestCase = await this.repository.save(createdTestCase);
    return this.entityToTestCase(savedTestCase);
  }

  async getAll(): Promise<TestCase[]> {
    const entities = await this.repository.find();
    return entities.map(this.entityToTestCase);
  }

  async getById(testCaseId: string): Promise<TestCase | null> {
    const entity = await this.repository.findOneBy({ testCaseId });
    return entity ? this.entityToTestCase(entity) : null;
  }

  async getByTitle(title: string): Promise<TestCase | null> {
    const entity = await this.repository.findOneBy({ title });
    return entity ? this.entityToTestCase(entity) : null;
  }

  async update(
    testCase: UpdateTestCaseDTO & { testCaseId: string },
  ): Promise<TestCase> {
    const existingTestCase = await this.repository.findOneBy({
      testCaseId: testCase.testCaseId,
    });

    if (!existingTestCase) {
      throw new Error(
        `Test case with id: ${testCase.testCaseId} was not found`,
      );
    }

    const updateData: Partial<TestCaseEntity> = {
      ...testCase,
      updatedAt: new Date(),
      steps: testCase.steps?.map((step) => ({
        ...step,
        image: step.image ?? null,
      })),
    };

    await this.repository.update(testCase.testCaseId, updateData);

    const updatedTestCase = await this.repository.findOneBy({
      testCaseId: testCase.testCaseId,
    });
    return updatedTestCase
      ? this.entityToTestCase(updatedTestCase)
      : ({} as TestCase);
  }

  async delete(testCaseId: string): Promise<void> {
    await this.repository.delete({ testCaseId });
  }

  async save(testCase: CreateTestCaseDTO): Promise<TestCase> {
    const createdTestCase = this.repository.create({
      ...testCase,
      testCaseId: v4(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const savedTestCase = await this.repository.save(createdTestCase);
    return this.entityToTestCase(savedTestCase);
  }

  async getBy(options: FindOptionsWhere<TestCase>): Promise<TestCase | null> {
    const entity = await this.repository.findOneBy(options);
    return entity ? this.entityToTestCase(entity) : null;
  }
}

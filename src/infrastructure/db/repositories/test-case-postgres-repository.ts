import { TestCase } from "../../../domain/entities/test-case-entity";
import { PostgresDataSource } from "../../../tools/db-connection";
import { Repository, FindOptionsWhere } from "typeorm";
import { TestCaseRepository } from "../../../domain/repositories/test-case-repository";
import {
  CreateTestCaseDTO,
  UpdateTestCaseDTO,
} from "../../../application/dtos/test-case-dto";
import { v4 } from "uuid";

export class TestCasePostgresRepository implements TestCaseRepository {
  private repository: Repository<TestCase>;
  constructor() {
    this.repository = PostgresDataSource.getRepository(TestCase);
  }
  async addTestCase(testCase: CreateTestCaseDTO): Promise<TestCase> {
    const createdTestCase = this.repository.create({
      ...testCase,
      testCaseId: v4(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return await this.repository.save(createdTestCase);
  }
  async getAll(): Promise<TestCase[]> {
    return await this.repository.find();
  }
  async getById(testCaseId: string): Promise<TestCase | null> {
    return await this.repository.findOneBy({ testCaseId });
  }
  async getByTitle(title: string): Promise<TestCase | null> {
    return await this.repository.findOneBy({ title });
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
    await this.repository.update(testCase.testCaseId, {
      ...testCase,
      updatedAt: new Date(),
    });
    return (await this.repository.findOneBy({
      testCaseId: testCase.testCaseId,
    })) as TestCase;
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
    return await this.repository.save(createdTestCase);
  }

  async getBy(options: FindOptionsWhere<TestCase>): Promise<TestCase | null> {
    return await this.repository.findOneBy(options);
  }
}

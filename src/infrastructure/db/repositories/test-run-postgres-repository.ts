import { TestRun } from "../../../domain/entities/test-run-entity";
import { PostgresDataSource } from "../../../tools/db-connection";
import { Repository, FindOptionsWhere } from "typeorm";
import { TestRunRepository } from "../../../domain/repositories/test-run-repository";
import {
  CreateTestRunDTO,
  UpdateTestRunDTO,
} from "../../../application/dtos/test-run-dto";
import { v4 } from "uuid";

export class TestRunPostgresRepository implements TestRunRepository {
  private repository: Repository<TestRun>;
  constructor() {
    this.repository = PostgresDataSource.getRepository(TestRun);
  }
  async addTestRun(testRun: CreateTestRunDTO): Promise<TestRun> {
    const createdTestRun = this.repository.create({
      ...testRun,
      testRunId: v4(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return await this.repository.save(createdTestRun);
  }
  async getAll(): Promise<TestRun[]> {
    return await this.repository.find();
  }

  async getById(testRunId: string): Promise<TestRun | null> {
    return await this.repository.findOneBy({ testRunId });
  }

  async update(
    testRun: UpdateTestRunDTO & { testRunId: string },
  ): Promise<TestRun> {
    const existingTestRun = await this.repository.findOneBy({
      testRunId: testRun.testRunId,
    });
    if (!existingTestRun) {
      throw new Error(`Test run with id ${testRun.testRunId} was not found`);
    }
    await this.repository.update(testRun.testRunId, {
      ...testRun,
      updatedAt: new Date(),
    });
    return (await this.repository.findOneBy({
      testRunId: testRun.testRunId,
    })) as TestRun;
  }
  async save(testRun: TestRun): Promise<TestRun> {
    return await this.repository.save(testRun);
  }

  async delete(testRunId: string): Promise<void> {
    await this.repository.delete({ testRunId });
  }

  async getBy(options: FindOptionsWhere<TestRun>): Promise<TestRun | null> {
    return await this.repository.findOneBy(options);
  }
}

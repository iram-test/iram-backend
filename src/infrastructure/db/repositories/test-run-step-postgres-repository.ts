import { TestRunStep } from "../../../domain/entities/test-run-step-entity";
import { PostgresDataSource } from "../../../tools/db-connection";
import { Repository, FindOptionsWhere } from "typeorm";
import { TestRunStepRepository } from "../../../domain/repositories/test-run-step-repository";
import {
  CreateTestRunStepDTO,
  UpdateTestRunStepDTO,
} from "../../../application/dtos/test-run-step-dto";
import { v4 } from "uuid";

export class TestRunStepPostgresRepository implements TestRunStepRepository {
  private repository: Repository<TestRunStep>;
  constructor() {
    this.repository = PostgresDataSource.getRepository(TestRunStep);
  }
  async addTestRunStep(
    testRunStep: CreateTestRunStepDTO,
  ): Promise<TestRunStep> {
    const createdTestRunStep = this.repository.create({
      ...testRunStep,
      testRunStepId: v4(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return await this.repository.save(createdTestRunStep);
  }
  async getAll(): Promise<TestRunStep[]> {
    return await this.repository.find();
  }
  async getById(testRunStepId: string): Promise<TestRunStep | null> {
    return await this.repository.findOneBy({ testRunStepId });
  }

  async update(
    testRunStep: UpdateTestRunStepDTO & { testRunStepId: string },
  ): Promise<TestRunStep> {
    const existingTestRunStep = await this.repository.findOneBy({
      testRunStepId: testRunStep.testRunStepId,
    });
    if (!existingTestRunStep) {
      throw new Error(
        `Test Run Step with id ${testRunStep.testRunStepId} was not found`,
      );
    }
    await this.repository.update(testRunStep.testRunStepId, {
      ...testRunStep,
      updatedAt: new Date(),
    });
    return (await this.repository.findOneBy({
      testRunStepId: testRunStep.testRunStepId,
    })) as TestRunStep;
  }

  async save(testRunStep: TestRunStep): Promise<TestRunStep> {
    return await this.repository.save(testRunStep);
  }

  async delete(testRunStepId: string): Promise<void> {
    await this.repository.delete({ testRunStepId });
  }

  async getBy(
    options: FindOptionsWhere<TestRunStep>,
  ): Promise<TestRunStep | null> {
    return await this.repository.findOneBy(options);
  }
}

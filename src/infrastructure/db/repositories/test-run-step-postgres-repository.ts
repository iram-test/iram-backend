import { TestRunStep } from "../../../domain/entities/test-run-step-entity";
import { TestRunStepEntity } from "../entities/test-run-step-entity";
import { PostgresDataSource } from "../../../tools/db-connection";
import { Repository, FindOptionsWhere } from "typeorm";
import { TestRunStepRepository } from "../../../domain/repositories/test-run-step-repository";
import {
  CreateTestRunStepDTO,
  UpdateTestRunStepDTO,
} from "../../../application/dtos/test-run-step-dto";
import { v4 } from "uuid";

export class TestRunStepPostgresRepository implements TestRunStepRepository {
  private repository: Repository<TestRunStepEntity>;
  constructor() {
    this.repository = PostgresDataSource.getRepository(TestRunStepEntity);
  }

  private mapToTestRunStep(entity: TestRunStepEntity): TestRunStep {
    return new TestRunStep(
      entity.testRunStepId,
      entity.step.stepId, // Assuming StepEntity has a 'stepId' property
      entity.status,
      entity.resultDescription,
      entity.createdAt,
      entity.updatedAt,
    );
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
    const savedEntity = await this.repository.save(createdTestRunStep);
    return this.mapToTestRunStep(savedEntity);
  }
  async getAll(): Promise<TestRunStep[]> {
    const entities = await this.repository.find();
    return entities.map((entity) => this.mapToTestRunStep(entity));
  }
  async getById(testRunStepId: string): Promise<TestRunStep | null> {
    const entity = await this.repository.findOneBy({ testRunStepId });
    return entity ? this.mapToTestRunStep(entity) : null;
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
    const updatedEntity = await this.repository.findOneBy({
      testRunStepId: testRunStep.testRunStepId,
    });

    return updatedEntity
      ? this.mapToTestRunStep(updatedEntity)
      : ({} as TestRunStep);
  }

  async save(testRunStep: TestRunStep): Promise<TestRunStep> {
    const entity = this.repository.create({
      ...testRunStep,
      step: { stepId: testRunStep.stepId }, // assuming you have stepId in TestRunStep object
    });

    const savedEntity = await this.repository.save(entity);

    return this.mapToTestRunStep(savedEntity);
  }

  async delete(testRunStepId: string): Promise<void> {
    await this.repository.delete({ testRunStepId });
  }

  async getBy(
    options: FindOptionsWhere<TestRunStep>,
  ): Promise<TestRunStep | null> {
    const entity = await this.repository.findOneBy(
      options as FindOptionsWhere<TestRunStepEntity>,
    );
    return entity ? this.mapToTestRunStep(entity) : null;
  }
}

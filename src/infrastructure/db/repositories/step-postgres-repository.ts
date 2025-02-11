import { DataSource, Repository } from "typeorm";
import { StepEntity } from "../entities/step-entity";
import { Step } from "../../../domain/entities/step-entity";
import {
  CreateStepDTO,
  UpdateStepDTO,
} from "../../../application/dtos/step-dto";
import { StepRepository } from "../../../domain/repositories/step-repository";
import { PostgresDataSource } from "../../../tools/db-connection";
import { TestCaseEntity } from "../entities/test-case-entity";

export class StepPostgresRepository implements StepRepository {
  private repository: Repository<StepEntity>;

  constructor(private readonly dataSource: DataSource = PostgresDataSource) {
    this.repository = this.dataSource.getRepository(StepEntity);
  }

  async addStep(
    createDto: CreateStepDTO & { testCaseId: string },
  ): Promise<Step> {
    const { testCaseId, ...stepData } = createDto;
    const step = this.repository.create(stepData);

    const testCaseRepository = this.dataSource.getRepository(TestCaseEntity);

    const testCase = await testCaseRepository.findOneBy({
      testCaseId: testCaseId,
    });

    if (!testCase) {
      throw new Error(`TestCase with id ${testCaseId} not found`);
    }

    step.testCase = testCase;

    const savedStep = await this.repository.save(step);
    return this.toDomainEntity(savedStep);
  }

  async update(updateDto: UpdateStepDTO): Promise<Step> {
    const { stepId, ...updateData } = updateDto;
    await this.repository.update(stepId, updateData);
    const updatedStep = await this.repository.findOneOrFail({
      where: { stepId },
      relations: ["testCase"],
    });
    return this.toDomainEntity(updatedStep);
  }

  async getById(stepId: string): Promise<Step | null> {
    const step = await this.repository.findOne({
      where: { stepId },
      relations: ["testCase"],
    });
    return step ? this.toDomainEntity(step) : null;
  }

  async delete(stepId: string): Promise<void> {
    await this.repository.delete(stepId);
  }

  async getStepsByTestCaseId(testCaseId: string): Promise<Step[]> {
    const steps = await this.repository.find({
      where: { testCase: { testCaseId: testCaseId } },
      relations: ["testCase"],
    });
    return steps.map((entity) => this.toDomainEntity(entity));
  }

  private toDomainEntity(entity: StepEntity): Step {
    return new Step(
      entity.stepId,
      entity.stepDescription,
      entity.expectedResult,
      entity.image,
      entity.createdAt.toISOString(),
      entity.updatedAt.toISOString(),
    );
  }
}

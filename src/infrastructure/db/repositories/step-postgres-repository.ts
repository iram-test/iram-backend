import { DataSource, Repository } from "typeorm";
import { StepEntity } from "../entities/step-entity";
import { Step } from "../../../domain/entities/step-entity";
import {
  CreateStepDTO,
  UpdateStepDTO,
} from "../../../application/dtos/step-dto";
import { StepRepository } from "../../../domain/repositories/step-repository";
import { PostgresDataSource } from "../../../tools/db-connection";

export class StepPostgresRepository implements StepRepository {
  private repository: Repository<StepEntity>;

  constructor(private readonly dataSource: DataSource = PostgresDataSource) {
    this.repository = this.dataSource.getRepository(StepEntity);
  }

  async addStep(createDto: CreateStepDTO): Promise<Step> {
    const step = this.repository.create(createDto);
    const savedStep = await this.repository.save(step);
    return this.toDomainEntity(savedStep);
  }

  async getAll(): Promise<Step[]> {
    const steps = await this.repository.find({
      relations: ["testCase"],
    });
    return steps.map((entity) => this.toDomainEntity(entity));
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

  private toDomainEntity(entity: StepEntity): Step {
    return new Step(
      entity.stepId,
      entity.stepDescription,
      entity.expectedResult,
      entity.images,
      entity.createdAt.toISOString(),
      entity.updatedAt.toISOString(),
    );
  }
}

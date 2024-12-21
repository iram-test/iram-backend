import { Step } from "../../../domain/entities/step-entity";
import { StepEntity } from "../entities/step-entity";
import { PostgresDataSource } from "../../../tools/db-connection";
import { Repository, FindOptionsWhere } from "typeorm";
import { StepRepository } from "../../../domain/repositories/step-repository";
import {
  CreateStepDTO,
  UpdateStepDTO,
} from "../../../application/dtos/step-dto";
import { v4 } from "uuid";

export class StepPostgresRepository implements StepRepository {
  private repository: Repository<StepEntity>;
  constructor() {
    this.repository = PostgresDataSource.getRepository(StepEntity);
  }
  async addStep(step: CreateStepDTO): Promise<Step> {
    const createdStep = this.repository.create({
      ...step,
      stepId: v4(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return await this.repository.save(createdStep);
  }
  async getAll(): Promise<Step[]> {
    return await this.repository.find();
  }
  async getById(stepId: string): Promise<Step | null> {
    return await this.repository.findOneBy({ stepId });
  }
  async update(step: UpdateStepDTO & { stepId: string }): Promise<Step> {
    const existingStep = await this.repository.findOneBy({
      stepId: step.stepId,
    });
    if (!existingStep) {
      throw new Error(`Step with id: ${step.stepId} was not found`);
    }
    await this.repository.update(step.stepId, {
      ...step,
      updatedAt: new Date(),
    });
    return (await this.repository.findOneBy({ stepId: step.stepId })) as Step;
  }

  async delete(stepId: string): Promise<void> {
    await this.repository.delete({ stepId });
  }
  async save(step: CreateStepDTO): Promise<Step> {
    const createdStep = this.repository.create({
      ...step,
      stepId: v4(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return await this.repository.save(createdStep);
  }
  async getBy(options: FindOptionsWhere<Step>): Promise<Step | null> {
    return await this.repository.findOneBy(options);
  }
}

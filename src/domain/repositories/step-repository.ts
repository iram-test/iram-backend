import { Step } from "../entities/step-entity";
import { CreateStepDTO, UpdateStepDTO } from "../../application/dtos/step-dto";

export interface StepRepository {
  addStep(step: CreateStepDTO): Promise<Step>;
  getAll(): Promise<Step[]>;
  save(step: CreateStepDTO): Promise<Step>;
  getById(stepId: string): Promise<Step | null>;
  update(step: UpdateStepDTO & { stepId: string }): Promise<Step>;
  delete(stepId: string): Promise<void>;
}

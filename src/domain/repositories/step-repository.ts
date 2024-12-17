import { Step } from "../entities/step-entity";

export interface StepRepository {
  addStep(step: Step): Promise<Step>;
  getAll(): Promise<Step[]>;
  save(step: Step): Promise<Step>;
  getById(stepId: string): Promise<Step | null>;
  update(step: Step): Promise<Step>;
  delete(stepId: string): Promise<void>;
}

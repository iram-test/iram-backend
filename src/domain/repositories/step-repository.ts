import { Step } from "../entities/step-entity";
import { CreateStepDTO, UpdateStepDTO } from "../../application/dtos/step-dto";

export interface StepRepository {
  addStep(step: CreateStepDTO & { testCaseId: string }): Promise<Step>;
  update(step: UpdateStepDTO): Promise<Step>;
  getById(stepId: string): Promise<Step | null>;
  delete(stepId: string): Promise<void>;
  getStepsByTestCaseId(testCaseId: string): Promise<Step[]>;
}

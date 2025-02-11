import { Step } from "../entities/step-entity";
import { StepRepository } from "../repositories/step-repository";
import { CreateStepDTO, UpdateStepDTO } from "../../application/dtos/step-dto";
import { v4 } from "uuid";

export class StepDomainService implements StepRepository {
  constructor(private stepRepository: StepRepository) {}

  async addStep(
    stepDto: CreateStepDTO & { testCaseId: string },
  ): Promise<Step> {
    return await this.stepRepository.addStep(stepDto);
  }

  getById(stepId: string): Promise<Step | null> {
    return this.stepRepository.getById(stepId);
  }

  update(stepDto: UpdateStepDTO): Promise<Step> {
    return this.stepRepository.update(stepDto);
  }

  delete(stepId: string): Promise<void> {
    return this.stepRepository.delete(stepId);
  }

  getStepsByTestCaseId(testCaseId: string): Promise<Step[]> {
    return this.stepRepository.getStepsByTestCaseId(testCaseId);
  }
}

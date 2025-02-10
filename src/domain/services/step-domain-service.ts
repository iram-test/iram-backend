import { Step } from "../entities/step-entity";
import { StepRepository } from "../repositories/step-repository";
import { CreateStepDTO, UpdateStepDTO } from "../../application/dtos/step-dto";
import { v4 } from "uuid";

export class StepDomainService implements StepRepository {
  constructor(private stepRepository: StepRepository) {}

  async addStep(stepDto: CreateStepDTO): Promise<Step> {
    const step = new Step(
      v4(),
      stepDto.stepDescription,
      stepDto.expectedResult,
      stepDto.image ?? null,
      new Date().toISOString(),
      new Date().toISOString(),
    );
    return await this.stepRepository.addStep(step);
  }

  getAll(): Promise<Step[]> {
    return this.stepRepository.getAll();
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

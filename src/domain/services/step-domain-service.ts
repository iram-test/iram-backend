import { Step } from "../entities/step-entity";
import { StepRepository } from "../repositories/step-repository";
import { CreateStepDTO, UpdateStepDTO } from "../../application/dtos/step-dto";

export class StepDomainService implements StepRepository {
  constructor(private stepRepository: StepRepository) {}

  addStep(stepDto: CreateStepDTO): Promise<Step> {
      const step = new Step(
          '',
          stepDto.stepDescription,
          stepDto.expectedResult,
          stepDto.image ?? null,
          new Date().toISOString(),
          new Date().toISOString(),
      );
    return this.stepRepository.addStep(stepDto);
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
}

import { Step } from "../entities/step-entity";
import { StepRepository } from "../repositories/step-repository";
import { CreateStepDTO, UpdateStepDTO } from "../../application/dtos/step-dto";

export class StepDomainService implements StepRepository {
  constructor(private stepRepository: StepRepository) {}

  addStep(stepDto: CreateStepDTO): Promise<Step> {
    return this.stepRepository.addStep(stepDto);
  }

  getAll(): Promise<Step[]> {
    return this.stepRepository.getAll();
  }

  save(stepDto: CreateStepDTO): Promise<Step> {
    return this.stepRepository.save(stepDto);
  }

  getById(stepId: string): Promise<Step | null> {
    return this.stepRepository.getById(stepId);
  }

  update(step: UpdateStepDTO & { stepId: string }): Promise<Step> {
    return this.stepRepository.update(step);
  }

  delete(stepId: string): Promise<void> {
    return this.stepRepository.delete(stepId);
  }
}

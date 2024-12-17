import { Step } from "../entities/step-entity";
import { StepRepository } from "../repositories/step-repository";

export class StepDomainService implements StepRepository {
  constructor(private stepRepository: StepRepository) {}

  addStep(step: Step): Promise<Step> {
    return this.stepRepository.addStep(step);
  }

  getAll(): Promise<Step[]> {
    return this.stepRepository.getAll();
  }

  save(step: Step): Promise<Step> {
    return this.stepRepository.save(step);
  }

  getById(stepId: string): Promise<Step | null> {
    return this.stepRepository.getById(stepId);
  }

  update(step: Step): Promise<Step> {
    return this.stepRepository.update(step);
  }

  delete(stepId: string): Promise<void> {
    return this.stepRepository.delete(stepId);
  }
}

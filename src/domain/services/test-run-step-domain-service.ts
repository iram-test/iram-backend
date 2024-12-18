import { TestRunStep } from "../entities/test-run-step-entity";
import { TestRunStepRepository } from "../repositories/test-run-step-repository";

export class TestRunStepDomainService implements TestRunStepRepository {
  constructor(private testRunStepRepository: TestRunStepRepository) {}

  addTestRunStep(testRunStep: TestRunStep): Promise<TestRunStep> {
    return this.testRunStepRepository.addTestRunStep(testRunStep);
  }

  getAll(): Promise<TestRunStep[]> {
    return this.testRunStepRepository.getAll();
  }

  getById(testRunStepId: string): Promise<TestRunStep | null> {
    return this.testRunStepRepository.getById(testRunStepId);
  }

  save(testRunStep: TestRunStep): Promise<TestRunStep> {
    return this.testRunStepRepository.save(testRunStep);
  }

  update(testRunStep: TestRunStep): Promise<TestRunStep> {
    return this.testRunStepRepository.update(testRunStep);
  }

  delete(testRunStepId: string): Promise<void> {
    return this.testRunStepRepository.delete(testRunStepId);
  }
}

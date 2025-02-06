import { TestRunStep } from "../entities/test-run-step-entity";
import { TestRunStepRepository } from "../repositories/test-run-step-repository";
import {
  CreateTestRunStepDTO,
  UpdateTestRunStepDTO,
} from "../../application/dtos/test-run-step-dto";

export class TestRunStepDomainService implements TestRunStepRepository {
  constructor(private testRunStepRepository: TestRunStepRepository) {}

  async addTestRunStep(
    testRunStepDto: CreateTestRunStepDTO,
  ): Promise<TestRunStep> {
      const testRunStep = new TestRunStep(
          '',
          testRunStepDto.step,
          testRunStepDto.priority,
          testRunStepDto.assignedUserId ?? null,
          testRunStepDto.estimatedTime ?? null,
          testRunStepDto.status,
          new Date().toISOString(),
          new Date().toISOString(),
      );
    return await this.testRunStepRepository.addTestRunStep(testRunStepDto);
  }

  getAll(): Promise<TestRunStep[]> {
    return this.testRunStepRepository.getAll();
  }

  getById(testRunStepId: string): Promise<TestRunStep | null> {
    return this.testRunStepRepository.getById(testRunStepId);
  }


  update(
    testRunStepDto: UpdateTestRunStepDTO
  ): Promise<TestRunStep> {
    return this.testRunStepRepository.update(testRunStepDto);
  }

  delete(testRunStepId: string): Promise<void> {
    return this.testRunStepRepository.delete(testRunStepId);
  }
}
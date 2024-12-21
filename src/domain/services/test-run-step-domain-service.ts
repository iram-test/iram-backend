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
    const testRunStep: TestRunStep = {
      testRunStepId: "", //generate a valid ID
      createdAt: new Date(),
      updatedAt: new Date(),
      stepId: testRunStepDto.stepId,
      status: testRunStepDto.status,
      resultDescription: testRunStepDto.resultDescription ?? undefined,
    };
    return await this.testRunStepRepository.addTestRunStep(testRunStep);
  }

  getAll(): Promise<TestRunStep[]> {
    return this.testRunStepRepository.getAll();
  }

  getById(testRunStepId: string): Promise<TestRunStep | null> {
    return this.testRunStepRepository.getById(testRunStepId);
  }

  async save(testRunStepDto: CreateTestRunStepDTO): Promise<TestRunStep> {
    const testRunStep: TestRunStep = {
      testRunStepId: "", //generate a valid ID
      createdAt: new Date(),
      updatedAt: new Date(),
      stepId: testRunStepDto.stepId,
      status: testRunStepDto.status,
      resultDescription: testRunStepDto.resultDescription ?? undefined,
    };
    return await this.testRunStepRepository.save(testRunStep);
  }

  update(
    testRunStep: UpdateTestRunStepDTO & { testRunStepId: string },
  ): Promise<TestRunStep> {
    return this.testRunStepRepository.update(testRunStep);
  }

  delete(testRunStepId: string): Promise<void> {
    return this.testRunStepRepository.delete(testRunStepId);
  }
}

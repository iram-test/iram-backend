import { TestRun } from "../entities/test-run-entity";
import { TestRunRepository } from "../repositories/test-run-repository";
import {
  CreateTestRunDTO,
  UpdateTestRunDTO,
} from "../../application/dtos/test-run-dto";

export class TestRunDomainService implements TestRunRepository {
  constructor(private testRunRepository: TestRunRepository) {}

  async addTestRun(testRunDto: CreateTestRunDTO): Promise<TestRun> {
    // Assuming Milestone is an array of Milestone IDs
    const milestone: any = testRunDto.milestone;

    const testRun: TestRun = new TestRun(
      "",
      testRunDto.name,
      milestone,
      testRunDto.assignedUserId ?? null,
      testRunDto.description,
      new Date().toISOString(),
      new Date().toISOString(),
      [], // Assuming testRunSteps are handled separately
    );
    return await this.testRunRepository.addTestRun(testRunDto);
  }

  getAll(): Promise<TestRun[]> {
    return this.testRunRepository.getAll();
  }

  getById(testRunId: string): Promise<TestRun | null> {
    return this.testRunRepository.getById(testRunId);
  }

  update(testRunDto: UpdateTestRunDTO): Promise<TestRun> {
    return this.testRunRepository.update(testRunDto);
  }

  delete(testRunId: string): Promise<void> {
    return this.testRunRepository.delete(testRunId);
  }
}

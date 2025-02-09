import { TestRun } from "../entities/test-run-entity";
import { TestRunRepository } from "../repositories/test-run-repository";
import {
  CreateTestRunDTO,
  UpdateTestRunDTO,
} from "../../application/dtos/test-run-dto";

export class TestRunDomainService implements TestRunRepository {
  constructor(private testRunRepository: TestRunRepository) {}

  async addTestRun(testRunDto: CreateTestRunDTO): Promise<TestRun> {
    const testRun: TestRun = new TestRun(
      "",
      testRunDto.name,
      testRunDto.milestoneIds,
      testRunDto.assignedUserIds ?? null,
      testRunDto.projectId,
      testRunDto.testCaseIds,
      testRunDto.description,
      new Date().toISOString(),
      new Date().toISOString(),
    );
    return await this.testRunRepository.addTestRun(testRun);
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

  getByProjectId(projectId: string): Promise<TestRun[]> {
    return this.testRunRepository.getByProjectId(projectId);
  }
  getTestRunByProjectId(projectId: string): Promise<TestRun[]> {
    // NEW
    return this.testRunRepository.getTestRunByProjectId(projectId);
  }

  getTestRunByUserId(userId: string): Promise<TestRun[]> {
    // NEW
    return this.testRunRepository.getTestRunByUserId(userId);
  }

  getTestRunByTestReportId(testReportId: string): Promise<TestRun[]> {
    // NEW
    return this.testRunRepository.getTestRunByTestReportId(testReportId);
  }
}

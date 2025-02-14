import { TestRun } from "../entities/test-run-entity";
import { TestRunRepository } from "../repositories/test-run-repository";
import {
  CreateTestRunDTO,
  UpdateTestRunDTO,
} from "../../application/dtos/test-run-dto";
import { v4 } from "uuid";

export class TestRunDomainService implements TestRunRepository {
  constructor(private testRunRepository: TestRunRepository) {}

  async addTestRun(
    testRunDto: CreateTestRunDTO & { projectId: string },
  ): Promise<TestRun> {
    const testRun: TestRun = new TestRun(
      v4(),
      testRunDto.name,
      testRunDto.milestoneId ?? null,
      testRunDto.assignedUserId ?? null,
      testRunDto.projectId,
      testRunDto.testCaseIds,
      testRunDto.description,
      new Date().toISOString(),
      new Date().toISOString(),
    );
    return await this.testRunRepository.addTestRun({
      ...testRunDto,
      projectId: testRunDto.projectId,
    });
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
    return this.testRunRepository.getTestRunByProjectId(projectId);
  }

  getTestRunByUserId(userId: string): Promise<TestRun[]> {
    return this.testRunRepository.getTestRunByUserId(userId);
  }

  getTestRunByTestReportId(testReportId: string): Promise<TestRun[]> {
    return this.testRunRepository.getTestRunByTestReportId(testReportId);
  }

  getTestRunsByIds(ids: string[]): Promise<TestRun[]> {
    return this.testRunRepository.getTestRunsByIds(ids);
  }
}

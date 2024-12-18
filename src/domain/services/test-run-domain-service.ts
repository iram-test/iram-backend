import { TestRun } from "../entities/test-run-entity";
import { TestRunRepository } from "../repositories/test-run-repository";

export class TestRunDomainService implements TestRunRepository {
  constructor(private testRunRepository: TestRunRepository) {}

  addTestRun(testRun: TestRun): Promise<TestRun> {
    return this.testRunRepository.addTestRun(testRun);
  }

  getAll(): Promise<TestRun[]> {
    return this.testRunRepository.getAll();
  }

  getById(testRunId: string): Promise<TestRun | null> {
    return this.testRunRepository.getById(testRunId);
  }

  save(testRun: TestRun): Promise<TestRun> {
    return this.testRunRepository.save(testRun);
  }

  update(testRun: TestRun): Promise<TestRun> {
    return this.testRunRepository.update(testRun);
  }

  delete(testRunId: string): Promise<void> {
    return this.testRunRepository.delete(testRunId);
  }
}

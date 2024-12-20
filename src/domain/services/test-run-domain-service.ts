import { TestRun } from "../entities/test-run-entity";
import { TestRunRepository } from "../repositories/test-run-repository";
import {
  CreateTestRunDTO,
  UpdateTestRunDTO,
} from "../../application/dtos/test-run-dto";

export class TestRunDomainService implements TestRunRepository {
  constructor(private testRunRepository: TestRunRepository) {}

  async addTestRun(testRunDto: CreateTestRunDTO): Promise<TestRun> {
      const testRun: TestRun = {
          testRunId: "",
          createdAt: new Date(),
          updatedAt: new Date(),
          ...testRunDto,
      }

    return await this.testRunRepository.addTestRun(testRun);
  }

  getAll(): Promise<TestRun[]> {
    return this.testRunRepository.getAll();
  }

  getById(testRunId: string): Promise<TestRun | null> {
    return this.testRunRepository.getById(testRunId);
  }

  async save(testRunDto: CreateTestRunDTO): Promise<TestRun> {
      const testRun: TestRun = {
            testRunId: "",
            createdAt: new Date(),
            updatedAt: new Date(),
            ...testRunDto,
        }
    return await this.testRunRepository.save(testRun);
  }

   update(testRun: UpdateTestRunDTO & { testRunId: string }): Promise<TestRun> {
      return this.testRunRepository.update(testRun)
   }


  delete(testRunId: string): Promise<void> {
    return this.testRunRepository.delete(testRunId);
  }
}
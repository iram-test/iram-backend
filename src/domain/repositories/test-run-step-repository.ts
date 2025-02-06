import { TestRunStep } from "../entities/test-run-step-entity";
import {
  CreateTestRunStepDTO,
  UpdateTestRunStepDTO,
} from "../../application/dtos/test-run-step-dto";

export interface TestRunStepRepository {
  addTestRunStep(testRunStep: CreateTestRunStepDTO): Promise<TestRunStep>;
  getAll(): Promise<TestRunStep[]>;
  getById(testRunStepId: string): Promise<TestRunStep | null>;
  update(
    testRunStep: UpdateTestRunStepDTO
  ): Promise<TestRunStep>;
  delete(testRunStepId: string): Promise<void>;
}
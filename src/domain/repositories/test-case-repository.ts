import { TestCase } from "../entities/test-case-entity";
import {
  CreateTestCaseDTO,
  UpdateTestCaseDTO,
} from "../../application/dtos/test-case-dto";

export interface TestCaseRepository {
  addTestCase(testCase: CreateTestCaseDTO): Promise<TestCase>;
  getAll(): Promise<TestCase[]>;
  save(testCase: CreateTestCaseDTO): Promise<TestCase>;
  getById(testCaseId: string): Promise<TestCase | null>;
  getByTitle(title: string): Promise<TestCase | null>;
  update(
    testCase: UpdateTestCaseDTO & { testCaseId: string },
  ): Promise<TestCase>;
  delete(testCaseId: string): Promise<void>;
}

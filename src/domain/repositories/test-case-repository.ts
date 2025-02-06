import { TestCase } from "../entities/test-case-entity";
import {
  CreateTestCaseDTO,
  UpdateTestCaseDTO,
} from "../../application/dtos/test-case-dto";

export interface TestCaseRepository {
  addTestCase(testCase: CreateTestCaseDTO): Promise<TestCase>;
  getAll(): Promise<TestCase[]>;
  update(
    testCase: UpdateTestCaseDTO
  ): Promise<TestCase>;
  getById(testCaseId: string): Promise<TestCase | null>;
  getByTitle(title: string): Promise<TestCase | null>;
  delete(testCaseId: string): Promise<void>;
}
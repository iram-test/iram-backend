import { TestCase } from "../entities/test-case-entity";
import {
  CreateTestCaseDTO,
  UpdateTestCaseDTO,
} from "../../application/dtos/test-case-dto";

export interface TestCaseRepository {
  addTestCase(
    testCase: CreateTestCaseDTO & { projectId: string },
  ): Promise<TestCase>;
  getAll(): Promise<TestCase[]>;
  update(testCase: UpdateTestCaseDTO): Promise<TestCase>;
  getById(testCaseId: string): Promise<TestCase | null>;
  getByTitle(title: string): Promise<TestCase | null>;
  delete(testCaseId: string): Promise<void>;
  getByProjectId(projectId: string): Promise<TestCase[]>;
  getBySectionId(sectionId: string): Promise<TestCase[]>;
  getBySubSectionId(subsectionId: string): Promise<TestCase[]>;
  getByAssignedUserId(assignedUserId: string): Promise<TestCase[]>;
  getTestCasesByProjectId(projectId: string): Promise<TestCase[]>;
  getTestCasesByUserId(userId: string): Promise<TestCase[]>;
}

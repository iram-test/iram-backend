import { Status } from "../../domain/entities/enums/status";
import { TestType } from "../../domain/entities/enums/test-type";
import { Priority } from "../../domain/entities/enums/project-priority";

export interface TestRunStepDTO {
  testRunStepId: string;
  step: TestType;
  priority: Priority;
  assignedUserId: string[] | null;
  estimatedTime: string;
  status: Status;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
}

export interface CreateTestRunStepDTO {
  step: TestType;
  priority: Priority;
  assignedUserId?: string[] | null;
  estimatedTime?: string;
  status: Status;
}

export interface UpdateTestRunStepDTO {
  testRunStepId: string;
  step?: TestType;
  priority?: Priority;
  assignedUserId?: string[] | null;
  estimatedTime?: string;
  status?: Status;
}

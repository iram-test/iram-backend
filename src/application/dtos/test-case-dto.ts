import { TemplateType } from "../../domain/entities/enums/template-type";
import { Priority } from "../../domain/entities/enums/project-priority";
import { TestType } from "../../domain/entities/enums/test-type";
import { Status } from "../../domain/entities/enums/status";
import { StepDTO } from "./step-dto";
import { CreateStepDTO } from "./step-dto";

export interface TestCaseDTO {
  testCaseId: string;
  title: string;
  collection: string;
  folderId: string;
  templateType: TemplateType;
  testType: TestType;
  priority: Priority;
  description: string;
  timeEstimation: string;
  reference: string | null;
  createdAt: Date;
  updatedAt: Date;
  projectId: string;
  status: Status;
  assignedUserId: string;
  comment: string;
  elapsedTime: string;
  defects: string;
  version: string;
  step: StepDTO[];
}

export interface CreateTestCaseDTO {
  title: string;
  collection: string;
  folderId: string;
  templateType: TemplateType;
  testType: TestType;
  priority: Priority;
  description: string;
  timeEstimation: string;
  reference?: string | null;
  projectId: string;
  status: Status;
  assignedUserId: string;
  comment: string;
  elapsedTime: string;
  defects: string;
  version: string;
  step: CreateStepDTO[];
}

export interface UpdateTestCaseDTO {
  testCaseId: string;
  title?: string;
  collection?: string;
  folderId?: string;
  templateType?: TemplateType;
  testType?: TestType;
  priority?: Priority;
  description?: string;
  timeEstimation?: string;
  reference?: string | null;
  status?: Status;
  assignedUserId?: string;
  comment?: string;
  elapsedTime?: string;
  defects?: string;
  version?: string;
}
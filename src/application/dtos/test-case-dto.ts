import { TemplateType } from "../../domain/entities/enums/template-type";
import { Priority } from "../../domain/entities/enums/project-priority";
import { TestType } from "../../domain/entities/enums/test-type";
import { Status } from "../../domain/entities/enums/status";

export interface TestCaseDTO {
  testCaseId: string;
  title: string;
  sectionId: string | null;
  projectId: string;
  assignedUserId: string | null;
  templateType: TemplateType;
  testType: TestType;
  priority: Priority;
  status: Status;
  timeEstimation: string;
  description: string;
  stepIds: string[] | null;
  createdAt: string;
  updatedAt: string;
  color: string | null;
}

export interface CreateTestCaseDTO {
  title: string;
  sectionId?: string | null;
  assignedUserId?: string;
  templateType: TemplateType;
  testType: TestType;
  priority: Priority;
  timeEstimation: string;
  description: string;
  stepIds?: string[] | null;
  status?: Status;
  color?: string | null;
}

export interface UpdateTestCaseDTO {
  testCaseId: string;
  title?: string;
  sectionId?: string | null;
  projectId?: string;
  assignedUserId?: string | null;
  templateType?: TemplateType;
  testType?: TestType;
  priority?: Priority;
  status?: Status;
  timeEstimation?: string;
  description?: string;
  stepIds?: string[] | null;
  color?: string | null;
}

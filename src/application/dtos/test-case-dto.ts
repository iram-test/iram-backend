import { TemplateType } from "../../domain/entities/enums/template-type";
import { Priority } from "../../domain/entities/enums/project-priority";
import { TestType } from "../../domain/entities/enums/test-type";

export interface TestCaseDTO {
  testCaseId: string;
  title: string;
  sectionId: string;
  testType: TestType;
  templateType: TemplateType;
  priority: Priority;
  assignedUserId: string;
  timeEstimation: string;
  description: string;
  stepsId: string[];
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
}

export interface CreateTestCaseDTO {
  title: string;
  sectionId: string;
  templateType: TemplateType;
  testType: TestType;
  priority: Priority;
  assignedUserId: string;
  timeEstimation: string;
  description: string;
  stepsId: string[];
}

export interface UpdateTestCaseDTO {
  testCaseId: string;
  title?: string;
  sectionId?: string;
  templateType?: TemplateType;
  testType?: TestType;
  priority?: Priority;
  assignedUserId?: string;
  timeEstimation?: string;
  description?: string;
  stepsId?: string[];
}

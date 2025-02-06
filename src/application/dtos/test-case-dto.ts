import { TemplateType } from "../../domain/entities/enums/template-type";
import { Priority } from "../../domain/entities/enums/project-priority";
import { TestType } from "../../domain/entities/enums/test-type";

export interface TestCaseDTO {
  testCaseId: string;
  title: string;
  sectionIds: string[]; // Changed sectionId to sectionIds
  projectId: string;
  assignedUserId: string;
  templateType: TemplateType;
  testType: TestType;
  priority: Priority;
  timeEstimation: string;
  description: string;
  stepIds: string[] | null; // Changed stepsId to stepIds
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
}

export interface CreateTestCaseDTO {
  title: string;
  sectionIds: string[]; // Changed sectionId to sectionIds
  projectId: string;
  assignedUserId: string;
  templateType: TemplateType;
  testType: TestType;
  priority: Priority;
  timeEstimation: string;
  description: string;
  stepIds: string[] | null; // Changed stepsId to stepIds
}

export interface UpdateTestCaseDTO {
  testCaseId: string;
  title?: string;
  sectionIds?: string[]; // Changed sectionId to sectionIds
  projectId?: string;
  assignedUserId?: string;
  templateType?: TemplateType;
  testType?: TestType;
  priority?: Priority;
  timeEstimation?: string;
  description?: string;
  stepIds?: string[] | null; // Changed stepsId to stepIds
}

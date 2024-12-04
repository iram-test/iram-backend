import { Priority } from "./enums/project-priority";
import { Status } from "./enums/project-status";
import { TemplateType } from "./enums/template-type";
import { TestType } from "./enums/test-type";
import { Step } from "./step-entity";

export declare class TestCase {
  constructor(
    testCaseId: string,
    title: string,
    collection: string,
    folderId: string,
    templateType: TemplateType,
    testType: TestType,
    priority: Priority,
    description: string,
    timeEstimation: string,
    reference: string | null,
    createdAt: Date,
    updatedAt: Date,
    projectId: string,
    status: Status,
    assignedUserId: string,
    comment: string,
    elapsedTime: string,
    defects: string,
    version: string,
    step: Step[],
  );

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
  step: Step[];
}

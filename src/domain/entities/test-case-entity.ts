import { Priority } from "./enums/project-priority";
import { Status } from "./enums/status";
import { TemplateType } from "./enums/template-type";
import { TestType } from "./enums/test-type";
import { Step } from "./step-entity";

export class TestCase {
  constructor(
    public testCaseId: string,
    public title: string,
    public collection: string,
    public folderId: string,
    public templateType: TemplateType,
    public testType: TestType,
    public priority: Priority,
    public description: string,
    public timeEstimation: string,
    public reference: string | null,
    public createdAt: Date,
    public updatedAt: Date,
    public projectId: string,
    public status: Status,
    public assignedUserId: string,
    public comment: string,
    public elapsedTime: string,
    public defects: string,
    public version: string,
    public step: Step[],
  ) {}
}

import { TemplateType } from "../../domain/entities/enums/template-type";
import { Priority } from "../../domain/entities/enums/project-priority";
import { TestType } from "../../domain/entities/enums/test-type";
import { Status } from "../../domain/entities/enums/status";
import { StepDTO } from "../../application/dtos/step-dto";

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
    public step: StepDTO[],
  ) {}
}

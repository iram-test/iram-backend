import { TemplateType } from "./enums/template-type";
import { TestType } from "./enums/test-type";
import { Priority } from "./enums/project-priority";

export class TestCase {
  constructor(
    public testCaseId: string,
    public title: string,
    public sectionIds: string[],
    public projectId: string,
    public assignedUserId: string,
    public templateType: TemplateType,
    public testType: TestType,
    public priority: Priority,
    public timeEstimation: string,
    public description: string,
    public stepIds: string[] | null,
    public createdAt: string,
    public updatedAt: string,
  ) {}
}

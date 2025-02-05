import { TemplateType } from "../../domain/entities/enums/template-type";
import { TestType } from "../../domain/entities/enums/test-type";
import { Priority } from "../../domain/entities/enums/project-priority";

export class TestCase {
  constructor(
    public testCaseId: string,
    public title: string,
    public sectionId: string,
    public templateType: TemplateType,
    public testType: TestType,
    public priority: Priority,
    public assignedUserId: string,
    public timeEstimation: string,
    public description: string,
    public stepsId: string[] | null,
    public createdAt: string,
    public updatedAt: string,
  ) {}
}

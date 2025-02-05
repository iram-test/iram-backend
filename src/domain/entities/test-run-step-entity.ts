import { Priority } from "./enums/project-priority";
import { Status } from "./enums/status";
import { TestType } from "./enums/test-type";

export class TestRunStep {
  constructor(
    public testRunStepId: string,
    public step: TestType,
    public priority: Priority,
    public assignedUserId: string[] | null,
    public estimatedTime: string,
    public status: Status,
    public createdAt: string,
    public updatedAt: string,
  ) {}
}

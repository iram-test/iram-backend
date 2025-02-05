import { Milestone } from "./milestone-entity";
import { TestRunStep } from "./test-run-step-entity";

export class TestRun {
  constructor(
    public testRunId: string,
    public name: string,
    public milestone: Milestone[],
    public assignedUserId: string[] | null,
    public description: string,
    public createdAt: string,
    public updatedAt: string,
    public testRunSteps: TestRunStep[],
  ) {}
}

import { Status } from "./enums/status";

export class TestRunStep {
  constructor(
    public testRunStepId: string,
    public stepId: string,
    public status: Status,
    public resultDescription: string | undefined,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}

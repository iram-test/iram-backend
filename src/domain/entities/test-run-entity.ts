import { Status } from "./enums/status";

export class TestRun {
  constructor(
    public testRunId: string,
    public status: Status,
    public comment: string,
    public version: string,
    public elapsed: string,
    public defects: string,
    public description: string,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}

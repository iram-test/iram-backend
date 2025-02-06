export class TestRun {
  constructor(
    public testRunId: string,
    public name: string,
    public milestoneIds: string[],
    public assignedUserIds: string[] | null,
    public projectId: string,
    public testCaseIds: string[],
    public description: string,
    public createdAt: string,
    public updatedAt: string,
  ) {}
}

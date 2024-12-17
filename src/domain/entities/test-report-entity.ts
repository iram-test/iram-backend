export class TestReport {
  constructor(
    public testReportId: string,
    public name: string,
    public reference: string | null,
    public milestoneId: string | null,
    public description: string,
    public assignedUserId: string | null,
    public testCaseId: string[],
    public folderId: string | null,
  ) {}
}

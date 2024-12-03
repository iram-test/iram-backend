export class TestReport {
	constructor(
		testReportId,
		name,
		reference,
		milestoneId,
		description,
		assignedUserId,
		testCaseId, // (all or specific)
		folderId // ?
	) {
		this.testReportId = testReportId;
		this.name = name;
		this.reference = reference;
		this.milestoneId = milestoneId;
		this.description = description;
		this.assignedUserId = assignedUserId;
		this.testCaseId = testCaseId;
		this.folderId = folderId;
	}
}

export class TestCase {
	constructor(
		testCaseId,
		title,
		collection,
		folderId,
		templateType,
		testType,
		priority,
		description,
		timeEstimation,
		reference,
		createdAt,
		updatedAt,
		projectId,
		status,
		assignedUserId,
		comment,
		elapsedTime,
		defects,
		version,
		step
	) {
		this.testCaseId = testCaseId;
		this.title = title;
		this.collection = collection;
		this.folderId = folderId;
		this.templateType = templateType;
		this.testType = testType;
		this.priority = priority;
		this.description = description;
		this.timeEstimation = timeEstimation;
		this.reference = reference ?? null;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
		this.projectId = projectId;
		this.status = status;
		this.assignedUserId = assignedUserId;
		this.comment = comment;
		this.elapsedTime = elapsedTime;
		this.defects = defects;
		this.version = version;
		this.step = step;
	}
}

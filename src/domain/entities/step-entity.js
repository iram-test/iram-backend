export class Step {
	constructor(stepId, stepDescription, expectedResult, createdAt, updatedAt) {
		this.stepId = stepId;
		this.stepDescription = stepDescription;
		this.expectedResult = expectedResult;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}
}

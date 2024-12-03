export declare class Step {
	constructor(
		stepId: string,
		stepDescription: string,
		expectedResult: string,
		createdAt: Date,
		updatedAt: Date
	);

	stepId: string;
	stepDescription: string;
	expectedResult: string;
	createdAt: Date;
	updatedAt: Date;
}

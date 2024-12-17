export interface StepDTO {
  stepId: string;
  stepDescription: string;
  expectedResult: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateStepDTO {
  stepDescription: string;
  expectedResult: string;
}

export interface UpdateStepDTO {
    stepId: string;
    stepDescription?: string;
    expectedResult?: string;
}
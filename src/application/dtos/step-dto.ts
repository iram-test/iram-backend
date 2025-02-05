export interface StepDTO {
  stepId: string;
  stepDescription: string;
  expectedResult: string;
  image: string[] | null;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
}

export interface CreateStepDTO {
  stepDescription: string;
  expectedResult: string;
  image?: string[] | null;
}

export interface UpdateStepDTO {
  stepId: string;
  stepDescription?: string;
  expectedResult?: string;
  image?: string[] | null;
}

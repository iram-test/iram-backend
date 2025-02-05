export interface TestRunDTO {
  testRunId: string;
  name: string;
  milestone: string[]; // Array of Milestone IDs
  assignedUserId: string[] | null;
  description: string;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
  testRunSteps: string[]; // Array of TestRunStep IDs
}

export interface CreateTestRunDTO {
  name: string;
  milestone: string[]; // Array of Milestone IDs
  assignedUserId?: string[] | null;
  description: string;
  testRunSteps?: string[]; // Array of TestRunStep IDs
}

export interface UpdateTestRunDTO {
  testRunId: string;
  name?: string;
  milestone?: string[]; // Array of Milestone IDs
  assignedUserId?: string[] | null;
  description?: string;
  testRunSteps?: string[]; // Array of TestRunStep IDs
}

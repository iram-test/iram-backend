export interface TestRunDTO {
  testRunId: string;
  name: string;
  milestoneIds: string[];
  assignedUserIds: string[] | null;
  projectId: string;
  testCaseIds: string[];
  description: string;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
}

export interface CreateTestRunDTO {
  name: string;
  milestoneIds: string[];
  assignedUserIds?: string[] | null;
  testCaseIds: string[];
  description: string;
}

export interface UpdateTestRunDTO {
  testRunId: string;
  name?: string;
  milestoneIds?: string[];
  assignedUserIds?: string[] | null;
  testCaseIds?: string[];
  description?: string;
}

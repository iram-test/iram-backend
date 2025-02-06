export interface TestRunDTO {
  testRunId: string;
  name: string;
  milestoneIds: string[]; // Changed milestone to milestoneIds, array of Milestone IDs
  assignedUserIds: string[] | null; // Changed assignedUserId to assignedUserIds, array of user IDs
  projectId: string;
  testCaseIds: string[];
  description: string;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
}

export interface CreateTestRunDTO {
  name: string;
  milestoneIds: string[]; // Changed milestone to milestoneIds, array of Milestone IDs
  assignedUserIds?: string[] | null; // Changed assignedUserId to assignedUserIds, array of user IDs
  projectId: string;
  testCaseIds: string[];
  description: string;
}

export interface UpdateTestRunDTO {
  testRunId: string;
  name?: string;
  milestoneIds?: string[]; // Changed milestone to milestoneIds, array of Milestone IDs
  assignedUserIds?: string[] | null; // Changed assignedUserId to assignedUserIds, array of user IDs
  projectId?: string;
  testCaseIds?: string[];
  description?: string;
}
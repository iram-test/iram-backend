export interface TestReportDTO {
  testReportId: string;
  name: string;
  reference: string | null;
  milestoneId: string | null;
  description: string;
  assignedUserId: string | null;
  testCaseId: string[];
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
}

export interface CreateTestReportDTO {
  name: string;
  reference?: string | null;
  milestoneId?: string | null;
  description: string;
  assignedUserId?: string | null;
  testCaseId: string[];
}

export interface UpdateTestReportDTO {
  testReportId: string;
  name?: string;
  reference?: string | null;
  milestoneId?: string | null;
  description?: string;
  assignedUserId?: string | null;
  testCaseId?: string[];
}

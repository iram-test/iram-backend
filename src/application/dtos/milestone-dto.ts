import { MilestoneStatus } from "../../domain/entities/enums/milestone-status";

export interface MilestoneDTO {
  milestoneId: string;
  name: string;
  parentId: string | null;
  description: string;
  startDate: string | null; // ISO string
  endDate: string | null; // ISO string
  status: MilestoneStatus;
  projectId: string | null;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
  testReportId: string | null;
  testRunId: string | null;
}

export interface CreateMilestoneDTO {
  name: string;
  parentId?: string | null;
  description: string;
  startDate?: string | null;
  endDate?: string | null;
  status: MilestoneStatus;
  testReportId?: string | null;
  testRunId?: string | null;
}

export interface UpdateMilestoneDTO {
  milestoneId: string;
  name?: string;
  parentId?: string | null;
  description?: string;
  startDate?: string | null; // ISO string
  endDate?: string | null; // ISO string
  status?: MilestoneStatus;
  projectId?: string;
}

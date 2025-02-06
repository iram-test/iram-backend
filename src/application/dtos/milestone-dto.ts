import { MilestoneStatus } from "../../domain/entities/enums/milestone-status";

export interface MilestoneDTO {
  milestoneID: string;
  name: string;
  parentId: string | null;
  description: string;
  startDate: string | null; // ISO string
  endDate: string | null; // ISO string
  status: MilestoneStatus;
  projectId: string; // Add projectId
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
}

export interface CreateMilestoneDTO {
  name: string;
  parentId?: string | null;
  description: string;
  startDate?: string | null; // ISO string
  endDate?: string | null; // ISO string
  status: MilestoneStatus;
  projectId: string; // Add projectId
}

export interface UpdateMilestoneDTO {
  milestoneID: string;
  name?: string;
  parentId?: string | null;
  description?: string;
  startDate?: string | null; // ISO string
  endDate?: string | null; // ISO string
  status?: MilestoneStatus;
  projectId?: string; // Add projectId
}

import { MilestoneStatus } from "../../domain/entities/enums/milestone-status";

export interface MilestoneDTO {
  milestoneID: string;
  name: string;
  parentId: string | null;
  description: string;
  startDate: Date | null;
  endDate: Date | null;
  status: MilestoneStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateMilestoneDTO {
  name: string;
  parentId?: string | null;
  description: string;
  startDate?: Date | null;
  endDate?: Date | null;
  status: MilestoneStatus;
}

export interface UpdateMilestoneDTO {
  milestoneID: string;
  name?: string;
  parentId?: string | null;
  description?: string;
  startDate?: Date | null;
  endDate?: Date | null;
  status?: MilestoneStatus;
}

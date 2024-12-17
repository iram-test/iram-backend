import { MilestoneStatus } from "./enums/milestone-status";

export class Milestone {
  constructor(
    public milestoneID: string,
    public name: string,
    public parentId: string | null,
    public description: string,
    public startDate: Date | null,
    public endDate: Date | null,
    public status: MilestoneStatus,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}

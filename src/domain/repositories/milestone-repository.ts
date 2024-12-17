import { Milestone } from "../entities/milestone-entity";

export interface MilestoneRepository {
  addMilestone(milestone: Milestone): Promise<Milestone>;
  getAll(): Promise<Milestone[]>;
  save(milestone: Milestone): Promise<Milestone>;
  getById(milestoneID: string): Promise<Milestone | null>;
  getByName(milestoneName: string): Promise<Milestone | null>;
  update(milestone: Milestone): Promise<Milestone>;
  delete(milestoneID: string): Promise<void>;
}

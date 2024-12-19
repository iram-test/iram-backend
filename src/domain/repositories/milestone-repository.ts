import { Milestone } from "../entities/milestone-entity";
import {
  CreateMilestoneDTO,
  UpdateMilestoneDTO,
} from "../../application/dtos/milestone-dto";

export interface MilestoneRepository {
  addMilestone(milestone: Milestone): Promise<Milestone>;
  getAll(): Promise<Milestone[]>;
  getByParent(parent: Milestone): Promise<Milestone[]>;
  save(milestone: Milestone): Promise<Milestone>;
  getById(milestoneID: string): Promise<Milestone | null>;
  getByName(milestoneName: string): Promise<Milestone | null>;
  update(
    milestone: UpdateMilestoneDTO & { milestoneID: string },
  ): Promise<Milestone>;
  delete(milestoneID: string): Promise<void>;
}

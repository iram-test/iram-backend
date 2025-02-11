import { Milestone } from "../entities/milestone-entity";
import {
  CreateMilestoneDTO,
  UpdateMilestoneDTO,
} from "../../application/dtos/milestone-dto";

export interface MilestoneRepository {
  addMilestone(milestone: Milestone): Promise<Milestone>;
  getAll(): Promise<Milestone[]>;
  getByParentId(parentId: string | null): Promise<Milestone[]>;
  update(milestone: UpdateMilestoneDTO): Promise<Milestone>;
  getById(milestoneID: string): Promise<Milestone | null>;
  getByName(milestoneName: string): Promise<Milestone | null>;
  delete(milestoneID: string): Promise<void>;
  getByProjectId(projectId: string): Promise<Milestone[]>;
}

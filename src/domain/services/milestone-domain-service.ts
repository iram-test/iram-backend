import { Milestone } from "../entities/milestone-entity";
import { MilestoneRepository } from "../repositories/milestone-repository";
import {
  CreateMilestoneDTO,
  UpdateMilestoneDTO,
} from "../../application/dtos/milestone-dto";
import { v4 } from "uuid";

export class MilestoneDomainService implements MilestoneRepository {
  constructor(private milestoneRepository: MilestoneRepository) {}

  async addMilestone(
    milestoneDto: CreateMilestoneDTO & { projectId: string },
  ): Promise<Milestone> {
    const milestone: Milestone = new Milestone(
      v4(),
      milestoneDto.name,
      milestoneDto.parentId ?? null,
      milestoneDto.description,
      milestoneDto.startDate ?? null,
      milestoneDto.endDate ?? null,
      milestoneDto.status,
      milestoneDto.projectId,
      milestoneDto.testReportId ?? null,
      milestoneDto.testRunId ?? null,
      new Date().toISOString(),
      new Date().toISOString(),
    );
    return await this.milestoneRepository.addMilestone(milestone);
  }

  getAll(): Promise<Milestone[]> {
    return this.milestoneRepository.getAll();
  }

  getByParentId(parentId: string | null): Promise<Milestone[]> {
    return this.milestoneRepository.getByParentId(parentId);
  }

  getById(milestoneID: string): Promise<Milestone | null> {
    return this.milestoneRepository.getById(milestoneID);
  }

  getByName(milestoneName: string): Promise<Milestone | null> {
    return this.milestoneRepository.getByName(milestoneName);
  }

  update(milestoneDto: UpdateMilestoneDTO): Promise<Milestone> {
    return this.milestoneRepository.update(milestoneDto);
  }

  delete(milestoneID: string): Promise<void> {
    return this.milestoneRepository.delete(milestoneID);
  }
  getByProjectId(projectId: string): Promise<Milestone[]> {
    return this.milestoneRepository.getByProjectId(projectId);
  }
}

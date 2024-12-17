import { Milestone } from "../entities/milestone-entity";
import { MilestoneRepository } from "../repositories/milestone-repository";

export class MilestoneDomainService implements MilestoneRepository {
  constructor(private milestoneRepository: MilestoneRepository) {}

  addMilestone(milestone: Milestone): Promise<Milestone> {
    return this.milestoneRepository.addMilestone(milestone);
  }

  getAll(): Promise<Milestone[]> {
    return this.milestoneRepository.getAll();
  }

  save(milestone: Milestone): Promise<Milestone> {
    return this.milestoneRepository.save(milestone);
  }

  getById(milestoneID: string): Promise<Milestone | null> {
    return this.milestoneRepository.getById(milestoneID);
  }

  getByName(milestoneName: string): Promise<Milestone | null> {
    return this.milestoneRepository.getByName(milestoneName);
  }

  update(milestone: Milestone): Promise<Milestone> {
    return this.milestoneRepository.update(milestone);
  }

  delete(milestoneID: string): Promise<void> {
    return this.milestoneRepository.delete(milestoneID);
  }
}

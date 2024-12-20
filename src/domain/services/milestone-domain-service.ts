import { Milestone } from "../entities/milestone-entity";
import { MilestoneRepository } from "../repositories/milestone-repository";
import {
    CreateMilestoneDTO,
    UpdateMilestoneDTO,
  } from "../../application/dtos/milestone-dto";

export class MilestoneDomainService implements MilestoneRepository {
  constructor(private milestoneRepository: MilestoneRepository) {}

  async addMilestone(milestoneDto: CreateMilestoneDTO): Promise<Milestone> {
    const milestone: Milestone = {
        milestoneID: "",
        createdAt: new Date(),
        updatedAt: new Date(),
        name: milestoneDto.name,
        description: milestoneDto.description,
        startDate: milestoneDto.startDate ?? null,
        endDate: milestoneDto.endDate ?? null,
        status: milestoneDto.status,
        parentId: milestoneDto.parentId ?? null,
    };


    return await this.milestoneRepository.addMilestone(milestone);
  }

    getAll(): Promise<Milestone[]> {
        return this.milestoneRepository.getAll();
    }

   getByParent(parent: Milestone): Promise<Milestone[]> {
       return this.milestoneRepository.getByParent(parent);
   }

  async save(milestoneDto: CreateMilestoneDTO): Promise<Milestone> {
    const milestone: Milestone = {
        milestoneID: "", //assign a valid id according to your logic
        createdAt: new Date(),
        updatedAt: new Date(),
       name: milestoneDto.name,
        description: milestoneDto.description,
        startDate: milestoneDto.startDate ?? null,
        endDate: milestoneDto.endDate ?? null,
        status: milestoneDto.status,
        parentId: milestoneDto.parentId ?? null,
    };
    return await this.milestoneRepository.save(milestone)
  }

  getById(milestoneID: string): Promise<Milestone | null> {
    return this.milestoneRepository.getById(milestoneID);
  }

  getByName(milestoneName: string): Promise<Milestone | null> {
    return this.milestoneRepository.getByName(milestoneName);
  }

    update(
        milestone: UpdateMilestoneDTO & { milestoneID: string },
    ): Promise<Milestone> {
      return this.milestoneRepository.update(milestone);
    }

  delete(milestoneID: string): Promise<void> {
    return this.milestoneRepository.delete(milestoneID);
  }
}
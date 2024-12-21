import { Milestone } from "../../../domain/entities/milestone-entity";
import { MilestoneEntity } from "../entities/milestone-entity";
import { PostgresDataSource } from "../../../tools/db-connection";
import { Repository } from "typeorm";
import { MilestoneRepository } from "../../../domain/repositories/milestone-repository";
import { v4 } from "uuid";
import {
  CreateMilestoneDTO,
  UpdateMilestoneDTO,
} from "../../../application/dtos/milestone-dto";

export class MilestonePostgresRepository implements MilestoneRepository {
  private repository: Repository<MilestoneEntity>;
  constructor() {
    this.repository = PostgresDataSource.getRepository(MilestoneEntity);
  }

  private mapToMilestone(entity: MilestoneEntity): Milestone {
    return new Milestone(
      entity.milestoneID,
      entity.name,
      entity.parentId,
      entity.description,
      entity.startDate,
      entity.endDate,
      entity.status,
      entity.createdAt,
      entity.updatedAt,
    );
  }

  async addMilestone(milestone: CreateMilestoneDTO): Promise<Milestone> {
    const createdMilestone = this.repository.create({
      ...milestone,
      milestoneID: v4(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const savedMilestone = await this.repository.save(createdMilestone);
    return this.mapToMilestone(savedMilestone);
  }

  async getAll(): Promise<Milestone[]> {
    const entities = await this.repository.find();
    return entities.map((entity) => this.mapToMilestone(entity));
  }

  async getById(milestoneID: string): Promise<Milestone | null> {
    const entity = await this.repository.findOneBy({ milestoneID });
    return entity ? this.mapToMilestone(entity) : null;
  }

  async getByName(name: string): Promise<Milestone | null> {
    const entity = await this.repository.findOneBy({ name });
    return entity ? this.mapToMilestone(entity) : null;
  }

  async getByParent(parent: Milestone): Promise<Milestone[]> {
    const entities = await this.repository.findBy({
      parentId: parent.milestoneID,
    });
    return entities.map((entity) => this.mapToMilestone(entity));
  }

  async update(
    milestone: UpdateMilestoneDTO & { milestoneID: string },
  ): Promise<Milestone> {
    const existingMilestone = await this.repository.findOneBy({
      milestoneID: milestone.milestoneID,
    });

    if (!existingMilestone) {
      throw new Error(
        `Milestone with id: ${milestone.milestoneID} was not found`,
      );
    }

    const updateData: Partial<MilestoneEntity> = {
      ...milestone,
      updatedAt: new Date(),
    };

    if (milestone.parentId !== undefined) {
      updateData.parentId = milestone.parentId;
    }

    await this.repository.update(milestone.milestoneID, updateData);

    const updatedMilestone = await this.repository.findOneBy({
      milestoneID: milestone.milestoneID,
    });

    return updatedMilestone
      ? this.mapToMilestone(updatedMilestone)
      : ({} as Milestone);
  }

  async save(milestone: Milestone): Promise<Milestone> {
    const savedMilestone = await this.repository.save({
      ...milestone,
    });

    return this.mapToMilestone(savedMilestone);
  }
  async delete(milestoneID: string): Promise<void> {
    await this.repository.delete({ milestoneID });
  }
}

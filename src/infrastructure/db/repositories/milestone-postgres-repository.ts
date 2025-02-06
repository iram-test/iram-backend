import { Milestone } from "../../../domain/entities/milestone-entity";
import { MilestoneEntity } from "../entities/milestone-entity";
import { PostgresDataSource } from "../../../tools/db-connection";
import { Repository, IsNull } from "typeorm";
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

  async addMilestone(milestoneDto: CreateMilestoneDTO): Promise<Milestone> {
    const milestoneEntity = this.repository.create({
      milestoneID: v4(),
      name: milestoneDto.name,
      parentId: milestoneDto.parentId ?? null,
      description: milestoneDto.description,
      startDate: milestoneDto.startDate ? new Date(milestoneDto.startDate) : null,
      endDate: milestoneDto.endDate ? new Date(milestoneDto.endDate) : null,
      status: milestoneDto.status,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const savedMilestone = await this.repository.save(milestoneEntity);

    return new Milestone(
        savedMilestone.milestoneID,
        savedMilestone.name,
        savedMilestone.parentId,
        savedMilestone.description,
        savedMilestone.startDate ? savedMilestone.startDate.toISOString() : null,
        savedMilestone.endDate ? savedMilestone.endDate.toISOString() : null,
        savedMilestone.status,
        savedMilestone.createdAt.toISOString(),
        savedMilestone.updatedAt.toISOString(),
    );
  }

  async getAll(): Promise<Milestone[]> {
    const entities = await this.repository.find();
    return entities.map(entity =>  new Milestone(
        entity.milestoneID,
        entity.name,
        entity.parentId,
        entity.description,
        entity.startDate ? entity.startDate.toISOString() : null,
        entity.endDate ? entity.endDate.toISOString() : null,
        entity.status,
        entity.createdAt.toISOString(),
        entity.updatedAt.toISOString(),
    ));
  }

  async getById(milestoneID: string): Promise<Milestone | null> {
    const entity = await this.repository.findOneBy({ milestoneID });
    if (!entity) return null;
    return new Milestone(
        entity.milestoneID,
        entity.name,
        entity.parentId,
        entity.description,
        entity.startDate ? entity.startDate.toISOString() : null,
        entity.endDate ? entity.endDate.toISOString() : null,
        entity.status,
        entity.createdAt.toISOString(),
        entity.updatedAt.toISOString(),
    );
  }

  async getByName(name: string): Promise<Milestone | null> {
    const entity = await this.repository.findOneBy({ name });
    if (!entity) return null;
    return new Milestone(
        entity.milestoneID,
        entity.name,
        entity.parentId,
        entity.description,
        entity.startDate ? entity.startDate.toISOString() : null,
        entity.endDate ? entity.endDate.toISOString() : null,
        entity.status,
        entity.createdAt.toISOString(),
        entity.updatedAt.toISOString(),
    );
  }

  async getByParentId(parentId: string | null): Promise<Milestone[]> {
    const entities = parentId
      ? await this.repository.findBy({ parentId })
      : await this.repository.findBy({ parentId: IsNull() });
  
    return entities.map(entity => new Milestone(
      entity.milestoneID,
      entity.name,
      entity.parentId,
      entity.description,
      entity.startDate ? entity.startDate.toISOString() : null,
      entity.endDate ? entity.endDate.toISOString() : null,
      entity.status,
      entity.createdAt.toISOString(),
      entity.updatedAt.toISOString(),
    ));
  }

  async update(milestoneDto: UpdateMilestoneDTO): Promise<Milestone> {
    const milestoneEntity = await this.repository.findOneBy({ milestoneID: milestoneDto.milestoneID });

    if (!milestoneEntity) {
      throw new Error(`Milestone with id: ${milestoneDto.milestoneID} was not found`);
    }

    milestoneEntity.name = milestoneDto.name ?? milestoneEntity.name;
    milestoneEntity.description = milestoneDto.description ?? milestoneEntity.description;
    milestoneEntity.parentId = milestoneDto.parentId ?? milestoneEntity.parentId;
    milestoneEntity.startDate = milestoneDto.startDate ? new Date(milestoneDto.startDate) : milestoneEntity.startDate;
    milestoneEntity.endDate = milestoneDto.endDate ? new Date(milestoneDto.endDate) : milestoneEntity.endDate;
    milestoneEntity.status = milestoneDto.status ?? milestoneEntity.status;
    milestoneEntity.updatedAt = new Date();

    const updatedMilestoneEntity = await this.repository.save(milestoneEntity);
    return new Milestone(
        updatedMilestoneEntity.milestoneID,
        updatedMilestoneEntity.name,
        updatedMilestoneEntity.parentId,
        updatedMilestoneEntity.description,
        updatedMilestoneEntity.startDate ? updatedMilestoneEntity.startDate.toISOString() : null,
        updatedMilestoneEntity.endDate ? updatedMilestoneEntity.endDate.toISOString() : null,
        updatedMilestoneEntity.status,
        updatedMilestoneEntity.createdAt.toISOString(),
        updatedMilestoneEntity.updatedAt.toISOString(),
    );
  }


  async delete(milestoneID: string): Promise<void> {
    await this.repository.delete({ milestoneID });
  }
}
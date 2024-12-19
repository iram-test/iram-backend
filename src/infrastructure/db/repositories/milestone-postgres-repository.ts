import { Milestone } from "../../../domain/entities/milestone-entity";
import { PostgresDataSource } from "../../../tools/db-connection";
import { Repository } from "typeorm";
import { MilestoneRepository } from "../../../domain/repositories/milestone-repository";
import { v4 } from "uuid";

export class MilestonePostgresRepository implements MilestoneRepository {
  private repository: Repository<Milestone>;
  constructor() {
    this.repository = PostgresDataSource.getRepository(Milestone);
  }
  async addMilestone(milestone: Milestone): Promise<Milestone> {
    const createdMilestone = this.repository.create({
      ...milestone,
      milestoneID: v4(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return await this.repository.save(createdMilestone);
  }

  async getAll(): Promise<Milestone[]> {
    return await this.repository.find();
  }
  async getById(milestoneID: string): Promise<Milestone | null> {
    return await this.repository.findOneBy({ milestoneID });
  }
  async getByName(name: string): Promise<Milestone | null> {
    return await this.repository.findOneBy({ name });
  }
  async getByParent(parent: Milestone): Promise<Milestone[]> {
    return await this.repository.findBy({ parentId: parent.milestoneID });
  }

  async update(milestone: Milestone): Promise<Milestone> {
    const existingMilestone = await this.repository.findOneBy({
      milestoneID: milestone.milestoneID,
    });
    if (!existingMilestone) {
      throw new Error(
        `Milestone with id: ${milestone.milestoneID} was not found`,
      );
    }
    await this.repository.update(milestone.milestoneID, {
      ...milestone,
      updatedAt: new Date(),
    });
    return (await this.repository.findOneBy({
      milestoneID: milestone.milestoneID,
    })) as Milestone;
  }

  async save(milestone: Milestone): Promise<Milestone> {
    return await this.repository.save(milestone);
  }
  async delete(milestoneID: string): Promise<void> {
    await this.repository.delete({ milestoneID });
  }
}

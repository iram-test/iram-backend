import { DataSource, Repository, FindOptionsWhere, IsNull } from "typeorm";
import { MilestoneEntity } from "../entities/milestone-entity";
import { Milestone } from "../../../domain/entities/milestone-entity";
import {
  CreateMilestoneDTO,
  UpdateMilestoneDTO,
} from "../../../application/dtos/milestone-dto";
import { MilestoneRepository } from "../../../domain/repositories/milestone-repository";
import { PostgresDataSource } from "../../../tools/db-connection";

export class MilestonePostgresRepository implements MilestoneRepository {
  private repository: Repository<MilestoneEntity>;

  constructor(private readonly dataSource: DataSource = PostgresDataSource) {
    this.repository = this.dataSource.getRepository(MilestoneEntity);
  }

  async addMilestone(createDto: CreateMilestoneDTO): Promise<Milestone> {
    const milestone = this.repository.create(createDto);
    const savedMilestone = await this.repository.save(milestone);
    return this.toDomainEntity(savedMilestone);
  }

  async getAll(): Promise<Milestone[]> {
    const milestones = await this.repository.find({
      relations: ["project", "testReport", "testRun", "parentMilestone"],
    });
    return milestones.map((entity) => this.toDomainEntity(entity));
  }

  async getByParentId(parentId: string | null): Promise<Milestone[]> {
    const whereCondition =
      parentId === null ? { parentId: IsNull() } : { parentId };
    const milestones = await this.repository.find({
      where: whereCondition,
      relations: ["project", "testReport", "testRun", "parentMilestone"],
    });
    return milestones.map((entity) => this.toDomainEntity(entity));
  }

  async update(updateDto: UpdateMilestoneDTO): Promise<Milestone> {
    const { milestoneID, ...updateData } = updateDto;
    await this.repository.update(milestoneID, updateData);
    const updatedMilestone = await this.repository.findOneOrFail({
      where: { milestoneID },
      relations: ["project", "testReport", "testRun", "parentMilestone"],
    });
    return this.toDomainEntity(updatedMilestone);
  }

  async getById(milestoneID: string): Promise<Milestone | null> {
    const milestone = await this.repository.findOne({
      where: { milestoneID },
      relations: ["project", "testReport", "testRun", "parentMilestone"],
    });
    return milestone ? this.toDomainEntity(milestone) : null;
  }

  async getByName(milestoneName: string): Promise<Milestone | null> {
    const milestone = await this.repository.findOne({
      where: { name: milestoneName },
      relations: ["project", "testReport", "testRun", "parentMilestone"],
    });
    return milestone ? this.toDomainEntity(milestone) : null;
  }

  async delete(milestoneID: string): Promise<void> {
    await this.repository.delete(milestoneID);
  }

  async getByProjectId(projectId: string): Promise<Milestone[]> {
    const milestones = await this.repository.find({
      where: { project: { projectId } },
      relations: ["project", "testReport", "testRun", "parentMilestone"],
    });
    return milestones.map((entity) => this.toDomainEntity(entity));
  }

  private toDomainEntity(entity: MilestoneEntity): Milestone {
    return new Milestone(
      entity.milestoneID,
      entity.name,
      entity.parentId,
      entity.description,
      entity.startDate,
      entity.endDate,
      entity.status,
      entity.project ? entity.project.projectId : null,
      entity.createdAt,
      entity.updatedAt,
      entity.testReport ? entity.testReport.testReportId : null,
      entity.testRun ? entity.testRun.testRunId : null,
    );
  }
}

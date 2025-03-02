import { DataSource, Repository, IsNull } from "typeorm";
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

  async addMilestone(
    createDto: CreateMilestoneDTO & {
      projectId: string;
      testReportId?: string | null;
      testRunId?: string | null;
    },
  ): Promise<Milestone> {
    const milestone = this.repository.create({
      ...createDto,
      projectId: createDto.projectId,
      testReportId: createDto.testReportId ?? null,
    });

    const savedMilestone = await this.repository.save(milestone);
    return this.toDomainEntity(savedMilestone);
  }

  async getAll(): Promise<Milestone[]> {
    const milestones = await this.repository.find({
      relations: ["project", "testReport", "testRuns", "parentMilestone"],
    });
    return milestones.map((entity) => this.toDomainEntity(entity));
  }

  async getByParentId(parentId: string | null): Promise<Milestone[]> {
    const whereCondition =
      parentId === null ? { parentId: IsNull() } : { parentId };
    const milestones = await this.repository.find({
      where: whereCondition,
      relations: ["project", "testReport", "testRuns", "parentMilestone"],
    });
    return milestones.map((entity) => this.toDomainEntity(entity));
  }

  async update(updateDto: UpdateMilestoneDTO): Promise<Milestone> {
    const { milestoneId, ...updateData } = updateDto;
    await this.repository.update(milestoneId, updateData);
    const updatedMilestone = await this.repository.findOneOrFail({
      where: { milestoneId },
      relations: ["project", "testReport", "testRuns", "parentMilestone"],
    });
    return this.toDomainEntity(updatedMilestone);
  }

  async getById(milestoneId: string): Promise<Milestone | null> {
    const milestone = await this.repository.findOne({
      where: { milestoneId },
      relations: ["project", "testReport", "testRuns", "parentMilestone"],
    });
    return milestone ? this.toDomainEntity(milestone) : null;
  }

  async getByName(milestoneName: string): Promise<Milestone | null> {
    const milestone = await this.repository.findOne({
      where: { name: milestoneName },
      relations: ["project", "testReport", "testRuns", "parentMilestone"],
    });
    return milestone ? this.toDomainEntity(milestone) : null;
  }

  async delete(milestoneId: string): Promise<void> {
    await this.repository.delete(milestoneId);
  }

  async getByProjectId(projectId: string): Promise<Milestone[]> {
    const milestones = await this.repository.find({
      where: { project: { projectId } },
      relations: ["project", "testReport", "testRuns", "parentMilestone"],
    });
    return milestones.map((entity) => this.toDomainEntity(entity));
  }

  private toDomainEntity(entity: MilestoneEntity): Milestone {
    return new Milestone(
      entity.milestoneId,
      entity.name,
      entity.parentId,
      entity.description,
      entity.startDate,
      entity.endDate,
      entity.status,
      entity.projectId,
      entity.testReportId,
      entity.testRuns && entity.testRuns.length > 0
        ? entity.testRuns[0].testRunId
        : null,
      entity.createdAt,
      entity.updatedAt,
    );
  }
}

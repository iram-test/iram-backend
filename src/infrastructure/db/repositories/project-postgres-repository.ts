import { DataSource, Repository } from "typeorm";
import { ProjectEntity } from "../entities/project-entity";
import { Project } from "../../../domain/entities/project-entity";
import {
  CreateProjectDTO,
  UpdateProjectDTO,
} from "../../../application/dtos/project-dto";
import { ProjectRepository } from "../../../domain/repositories/project-repository";
import { PostgresDataSource } from "../../../tools/db-connection";

export class ProjectPostgresRepository implements ProjectRepository {
  private repository: Repository<ProjectEntity>;

  constructor(private readonly dataSource: DataSource = PostgresDataSource) {
    this.repository = this.dataSource.getRepository(ProjectEntity);
  }

  async addProject(createDto: CreateProjectDTO): Promise<Project> {
    const project = this.repository.create(createDto);
    const savedProject = await this.repository.save(project);
    return this.toDomainEntity(savedProject);
  }

  async getAll(): Promise<Project[]> {
    const projects = await this.repository.find({
      relations: [
        "organization",
        "sections",
        "testCases",
        "milestones",
        "testReports",
        "testRuns",
        "assignedUser",
      ],
    });
    return projects.map((entity) => this.toDomainEntity(entity));
  }

  async update(updateDto: UpdateProjectDTO): Promise<Project> {
    const { projectId, ...updateData } = updateDto;
    await this.repository.update(projectId, updateData);
    const updatedProject = await this.repository.findOneOrFail({
      where: { projectId },
      relations: [
        "organization",
        "sections",
        "testCases",
        "milestones",
        "testReports",
        "testRuns",
        "assignedUser",
      ],
    });
    return this.toDomainEntity(updatedProject);
  }

  async getById(projectId: string): Promise<Project | null> {
    const project = await this.repository.findOne({
      where: { projectId },
      relations: [
        "organization",
        "sections",
        "testCases",
        "milestones",
        "testReports",
        "testRuns",
        "assignedUser",
      ],
    });
    return project ? this.toDomainEntity(project) : null;
  }

  async getByName(projectName: string): Promise<Project | null> {
    const project = await this.repository.findOne({
      where: { name: projectName },
      relations: [
        "organization",
        "sections",
        "testCases",
        "milestones",
        "testReports",
        "testRuns",
        "assignedUser",
      ],
    });
    return project ? this.toDomainEntity(project) : null;
  }

  async delete(projectId: string): Promise<void> {
    await this.repository.delete(projectId);
  }

  async getByOrganizationId(organizationId: string): Promise<Project[]> {
    const projects = await this.repository.find({
      where: { organization: { organizationId } },
      relations: [
        "organization",
        "sections",
        "testCases",
        "milestones",
        "testReports",
        "testRuns",
        "assignedUser",
      ],
    });
    return projects.map((entity) => this.toDomainEntity(entity));
  }

  private toDomainEntity(entity: ProjectEntity): Project {
    return new Project(
      entity.projectId,
      entity.name,
      entity.language ?? null,
      entity.location ?? null,
      entity.description,
      entity.organization.organizationId,
      entity.createdAt.toISOString(),
      entity.updatedAt.toISOString(),
    );
  }
}

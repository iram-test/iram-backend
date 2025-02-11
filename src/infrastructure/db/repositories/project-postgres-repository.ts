import { DataSource, Repository } from "typeorm";
import { ProjectEntity } from "../entities/project-entity";
import { Project } from "../../../domain/entities/project-entity";
import {
  CreateProjectDTO,
  UpdateProjectDTO,
} from "../../../application/dtos/project-dto";
import { ProjectRepository } from "../../../domain/repositories/project-repository";
import { PostgresDataSource } from "../../../tools/db-connection";
import { UserEntity } from "../entities/user-entity";

export class ProjectPostgresRepository implements ProjectRepository {
  private repository: Repository<ProjectEntity>;

  constructor(private readonly dataSource: DataSource = PostgresDataSource) {
    this.repository = this.dataSource.getRepository(ProjectEntity);
  }

  async addProject(createDto: CreateProjectDTO): Promise<Project> {
    const projectEntity = this.repository.create(createDto);
    const savedProjectEntity = await this.repository.save(projectEntity);
    return this.toDomainEntity(savedProjectEntity);
  }

  async getAll(): Promise<Project[]> {
    const projectEntities = await this.repository.find({
      relations: [
        "sections",
        "testCases",
        "milestones",
        "testReports",
        "testRuns",
        "manager",
      ],
    });
    return projectEntities.map((entity) => this.toDomainEntity(entity));
  }

  async update(
    projectId: string,
    updateDto: UpdateProjectDTO,
  ): Promise<Project | null> {
    try {
      await this.repository.update(projectId, updateDto);
      const updatedProjectEntity = await this.repository.findOne({
        where: { projectId },
        relations: [
          "sections",
          "testCases",
          "milestones",
          "testReports",
          "testRuns",
          "manager",
        ],
      });

      return updatedProjectEntity
        ? this.toDomainEntity(updatedProjectEntity)
        : null;
    } catch (error) {
      console.error("Error updating project:", error);
      return null;
    }
  }

  async getById(projectId: string): Promise<Project | null> {
    const projectEntity = await this.repository.findOne({
      where: { projectId },
      relations: [
        "sections",
        "testCases",
        "milestones",
        "testReports",
        "testRuns",
        "manager",
      ],
    });
    return projectEntity ? this.toDomainEntity(projectEntity) : null;
  }

  async getByName(projectName: string): Promise<Project | null> {
    const projectEntity = await this.repository.findOne({
      where: { name: projectName },
      relations: [
        "sections",
        "testCases",
        "milestones",
        "testReports",
        "testRuns",
        "manager",
      ],
    });
    return projectEntity ? this.toDomainEntity(projectEntity) : null;
  }

  async delete(projectId: string): Promise<void> {
    await this.repository.delete(projectId);
  }

  async addUserToProject(
    projectId: string,
    userId: string,
  ): Promise<Project | null> {
    try {
      const user = await this.dataSource
        .getRepository(UserEntity)
        .findOne({ where: { userId } });
      if (!user) {
        return null;
      }

      const project = await this.repository.findOne({ where: { projectId } });
      if (!project) {
        return null;
      }

      if (!project.users.includes(userId)) {
        project.users.push(userId);
        await this.repository.save(project);
      }
      return this.getById(projectId);
    } catch (error) {
      console.error("Error adding user to project:", error);
      return null;
    }
  }

  async removeUserFromProject(
    projectId: string,
    userId: string,
  ): Promise<Project | null> {
    try {
      const user = await this.dataSource
        .getRepository(UserEntity)
        .findOne({ where: { userId } });
      if (!user) {
        return null;
      }

      const project = await this.repository.findOne({ where: { projectId } });
      if (!project) {
        return null;
      }

      project.users = project.users.filter((id) => id !== userId);
      await this.repository.save(project);
      return this.getById(projectId);
    } catch (error) {
      console.error("Error removing user from project:", error);
      return null;
    }
  }

  private toDomainEntity(entity: ProjectEntity): Project {
    return new Project(
      entity.projectId,
      entity.name,
      entity.language ?? null,
      entity.location ?? null,
      entity.description,
      entity.managerId,
      entity.createdAt.toISOString(),
      entity.updatedAt.toISOString(),
      entity.users,
    );
  }
}

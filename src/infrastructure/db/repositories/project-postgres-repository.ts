import { Project } from "../../../domain/entities/project-entity";
import { ProjectEntity } from "../entities/project-entity";
import { PostgresDataSource } from "../../../tools/db-connection";
import { Repository, FindOptionsWhere } from "typeorm";
import { ProjectRepository } from "../../../domain/repositories/project-repository";
import {
  CreateProjectDTO,
  UpdateProjectDTO,
} from "../../../application/dtos/project-dto";
import { v4 } from "uuid";

export class ProjectPostgresRepository implements ProjectRepository {
  private repository: Repository<ProjectEntity>;
  constructor() {
    this.repository = PostgresDataSource.getRepository(ProjectEntity);
  }
  async addProject(projectDto: CreateProjectDTO): Promise<Project> {
    const projectEntity = this.repository.create({
      projectId: v4(),
      name: projectDto.name,
      language: projectDto.language,
      location: projectDto.location,
      description: projectDto.description,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const savedProject = await this.repository.save(projectEntity);
    return new Project(
      savedProject.projectId,
      savedProject.name,
      savedProject.language,
      savedProject.location,
      savedProject.description,
      null,
      savedProject.createdAt.toISOString(),
      savedProject.updatedAt.toISOString(),
    );
  }

  async getAll(): Promise<Project[]> {
    const entities = await this.repository.find();
    return entities.map(
      (entity) =>
        new Project(
          entity.projectId,
          entity.name,
          entity.language,
          entity.location,
          entity.description,
          null,
          entity.createdAt.toISOString(),
          entity.updatedAt.toISOString(),
        ),
    );
  }
  async getById(projectId: string): Promise<Project | null> {
    const entity = await this.repository.findOneBy({ projectId });
    if (!entity) return null;
    return new Project(
      entity.projectId,
      entity.name,
      entity.language,
      entity.location,
      entity.description,
      null,
      entity.createdAt.toISOString(),
      entity.updatedAt.toISOString(),
    );
  }
  async getByName(name: string): Promise<Project | null> {
    const entity = await this.repository.findOneBy({ name });
    if (!entity) return null;
    return new Project(
      entity.projectId,
      entity.name,
      entity.language,
      entity.location,
      entity.description,
      null,
      entity.createdAt.toISOString(),
      entity.updatedAt.toISOString(),
    );
  }

  async update(projectDto: UpdateProjectDTO): Promise<Project> {
    const projectEntity = await this.repository.findOneBy({
      projectId: projectDto.projectId,
    });

    if (!projectEntity) {
      throw new Error(`Project with id: ${projectDto.projectId} was not found`);
    }

    projectEntity.name = projectDto.name ?? projectEntity.name;
    projectEntity.language = projectDto.language ?? projectEntity.language;
    projectEntity.location = projectDto.location ?? projectEntity.location;
    projectEntity.description =
      projectDto.description ?? projectEntity.description;
    projectEntity.updatedAt = new Date();

    const updatedProject = await this.repository.save(projectEntity);
    return new Project(
      updatedProject.projectId,
      updatedProject.name,
      updatedProject.language,
      updatedProject.location,
      updatedProject.description,
      null,
      updatedProject.createdAt.toISOString(),
      updatedProject.updatedAt.toISOString(),
    );
  }

  async delete(projectId: string): Promise<void> {
    await this.repository.delete({ projectId });
  }
}

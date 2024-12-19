import { Project } from "../../../domain/entities/project-entity";
import { PostgresDataSource } from "../../../tools/db-connection";
import { Repository, FindOptionsWhere } from "typeorm";
import { ProjectRepository } from "../../../domain/repositories/project-repository";
import {
  CreateProjectDTO,
  UpdateProjectDTO,
} from "../../../application/dtos/project-dto";
import { v4 } from "uuid";

export class ProjectPostgresRepository implements ProjectRepository {
  private repository: Repository<Project>;
  constructor() {
    this.repository = PostgresDataSource.getRepository(Project);
  }
  async addProject(project: CreateProjectDTO): Promise<Project> {
    const createdProject = this.repository.create({
      ...project,
      projectId: v4(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return await this.repository.save(createdProject);
  }

  async getAll(): Promise<Project[]> {
    return await this.repository.find();
  }
  async getById(projectId: string): Promise<Project | null> {
    return await this.repository.findOneBy({ projectId });
  }
  async getByName(name: string): Promise<Project | null> {
    return await this.repository.findOneBy({ name });
  }

  async update(
    project: UpdateProjectDTO & { projectId: string },
  ): Promise<Project> {
    const existingProject = await this.repository.findOneBy({
      projectId: project.projectId,
    });
    if (!existingProject) {
      throw new Error(`Project with id: ${project.projectId} was not found`);
    }
    await this.repository.update(project.projectId, {
      ...project,
      updatedAt: new Date(),
    });
    return (await this.repository.findOneBy({
      projectId: project.projectId,
    })) as Project;
  }

  async delete(projectId: string): Promise<void> {
    await this.repository.delete({ projectId });
  }
  async save(project: Project): Promise<Project> {
    return await this.repository.save(project);
  }

  async getBy(options: FindOptionsWhere<Project>): Promise<Project | null> {
    return await this.repository.findOneBy(options);
  }
}

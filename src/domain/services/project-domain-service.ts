import { Project } from "../entities/project-entity";
import { ProjectRepository } from "../repositories/project-repository";
import {
  CreateProjectDTO,
  UpdateProjectDTO,
} from "../../application/dtos/project-dto";

export class ProjectDomainService implements ProjectRepository {
  constructor(private projectRepository: ProjectRepository) {}

  addProject(projectDto: CreateProjectDTO): Promise<Project> {
    const project: Project = new Project(
      "",
      projectDto.name,
      projectDto.language ?? null,
      projectDto.location ?? null,
      projectDto.description,
      projectDto.assignedUserId ?? null,
      new Date().toISOString(),
      new Date().toISOString(),
    );
    return this.projectRepository.addProject(projectDto);
  }

  getAll(): Promise<Project[]> {
    return this.projectRepository.getAll();
  }

  getById(projectId: string): Promise<Project | null> {
    return this.projectRepository.getById(projectId);
  }

  getByName(projectName: string): Promise<Project | null> {
    return this.projectRepository.getByName(projectName);
  }

  update(projectDto: UpdateProjectDTO): Promise<Project> {
    return this.projectRepository.update(projectDto);
  }

  delete(projectId: string): Promise<void> {
    return this.projectRepository.delete(projectId);
  }
}

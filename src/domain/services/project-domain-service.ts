import { Project } from "../entities/project-entity";
import { ProjectRepository } from "../repositories/project-repository";
import {
    CreateProjectDTO,
    UpdateProjectDTO,
  } from "../../application/dtos/project-dto";

export class ProjectDomainService implements ProjectRepository {
  constructor(private projectRepository: ProjectRepository) {}

  addProject(projectDto: CreateProjectDTO): Promise<Project> {
    return this.projectRepository.addProject(projectDto);
  }

  getAll(): Promise<Project[]> {
    return this.projectRepository.getAll();
  }

  save(projectDto: CreateProjectDTO): Promise<Project> {
    return this.projectRepository.save(projectDto);
  }

  getById(projectId: string): Promise<Project | null> {
    return this.projectRepository.getById(projectId);
  }

  getByName(projectName: string): Promise<Project | null> {
    return this.projectRepository.getByName(projectName);
  }

    update(project: UpdateProjectDTO & { projectId: string }): Promise<Project> {
        return this.projectRepository.update(project);
    }


  delete(projectId: string): Promise<void> {
    return this.projectRepository.delete(projectId);
  }
}

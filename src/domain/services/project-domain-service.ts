import { Project } from "../entities/project-entity";
import { ProjectRepository } from "../repositories/project-repository";

export class ProjectDomainService implements ProjectRepository {
  constructor(private projectRepository: ProjectRepository) {}

  addProject(project: Project): Promise<Project> {
    return this.projectRepository.addProject(project);
  }

  getAll(): Promise<Project[]> {
    return this.projectRepository.getAll();
  }

  save(project: Project): Promise<Project> {
    return this.projectRepository.save(project);
  }

  getById(projectId: string): Promise<Project | null> {
    return this.projectRepository.getById(projectId);
  }

  getByName(projectName: string): Promise<Project | null> {
    return this.projectRepository.getByName(projectName);
  }

  update(project: Project): Promise<Project> {
    return this.projectRepository.update(project);
  }

  delete(projectId: string): Promise<void> {
    return this.projectRepository.delete(projectId);
  }
}

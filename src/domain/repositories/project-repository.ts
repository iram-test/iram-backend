import { Project } from "../entities/project-entity";

export interface ProjectRepository {
  addProject(project: Project): Promise<Project>;
  getAll(): Promise<Project[]>;
  save(project: Project): Promise<Project>;
  getById(projectId: string): Promise<Project | null>;
  getByName(projectName: string): Promise<Project | null>;
  update(project: Project): Promise<Project>;
  delete(projectId: string): Promise<void>;
}

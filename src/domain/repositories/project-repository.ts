import { Project } from "../entities/project-entity";
import { UpdateProjectDTO } from "../../application/dtos/project-dto";

export interface ProjectRepository {
  addProject(project: Project): Promise<Project>;
  getAll(): Promise<Project[]>;
  update(projectId: string, project: UpdateProjectDTO): Promise<Project | null>;
  getById(projectId: string): Promise<Project | null>;
  getByName(projectName: string): Promise<Project | null>;
  delete(projectId: string): Promise<void>;
  addUserToProject(projectId: string, userId: string): Promise<Project | null>;
  removeUserFromProject(
      projectId: string,
      userId: string,
  ): Promise<Project | null>;
  getAllUsersFromProject(projectId: string): Promise<string[] | null>;
}
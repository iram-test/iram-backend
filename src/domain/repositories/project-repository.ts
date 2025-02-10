import { Project } from "../entities/project-entity";
import {
  CreateProjectDTO,
  UpdateProjectDTO,
} from "../../application/dtos/project-dto";

export interface ProjectRepository {
  addProject(project: CreateProjectDTO): Promise<Project>;
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
}

import { Project } from "../entities/project-entity";
import {
  CreateProjectDTO,
  UpdateProjectDTO,
} from "../../application/dtos/project-dto";

export interface ProjectRepository {
  addProject(project: CreateProjectDTO): Promise<Project>;
  getAll(): Promise<Project[]>;
  save(project: CreateProjectDTO): Promise<Project>;
  getById(projectId: string): Promise<Project | null>;
  getByName(projectName: string): Promise<Project | null>;
  update(project: UpdateProjectDTO & { projectId: string }): Promise<Project>;
  delete(projectId: string): Promise<void>;
}

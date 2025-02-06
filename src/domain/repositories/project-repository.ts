import { Project } from "../entities/project-entity";
import {
  CreateProjectDTO,
  UpdateProjectDTO,
} from "../../application/dtos/project-dto";

export interface ProjectRepository {
  addProject(project: CreateProjectDTO): Promise<Project>;
  getAll(): Promise<Project[]>;
  update(project: UpdateProjectDTO): Promise<Project>;
  getById(projectId: string): Promise<Project | null>;
  getByName(projectName: string): Promise<Project | null>;
  delete(projectId: string): Promise<void>;
  getByOrganizationId(organizationId: string): Promise<Project[]>;
}

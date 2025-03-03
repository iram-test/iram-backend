import { Project } from "../entities/project-entity";
import { ProjectRepository } from "../repositories/project-repository";
import {
  CreateProjectDTO,
  UpdateProjectDTO,
} from "../../application/dtos/project-dto";
import { v4 } from "uuid";
import { UserRepository } from "../repositories/user-repository";

export class ProjectDomainService {
  constructor(
    private projectRepository: ProjectRepository,
    private userRepository: UserRepository,
  ) {}

  async addProject(
    projectDto: CreateProjectDTO,
    userId: string,
  ): Promise<Project> {
    const project: Project = new Project(
      v4(),
      projectDto.name,
      projectDto.language ?? null,
      projectDto.location ?? null,
      projectDto.description,
      userId,
      new Date().toISOString(),
      new Date().toISOString(),
      [userId],
    );

    return this.projectRepository.addProject(project);
  }

  async getAll(): Promise<Project[]> {
    return this.projectRepository.getAll();
  }

  async getById(projectId: string): Promise<Project | null> {
    return this.projectRepository.getById(projectId);
  }

  async getByName(projectName: string): Promise<Project | null> {
    return this.projectRepository.getByName(projectName);
  }

  async updateProject(
    projectId: string,
    projectDto: UpdateProjectDTO,
  ): Promise<Project | null> {
    const existingProject = await this.projectRepository.getById(projectId);
    if (!existingProject) {
      return null;
    }

    if (projectDto.managerId) {
      existingProject.managerId = projectDto.managerId;
    }

    const updatedProjectData: UpdateProjectDTO = {
      ...projectDto,
      managerId: existingProject.managerId,
    };

    return this.projectRepository.update(projectId, updatedProjectData);
  }

  async deleteProject(projectId: string): Promise<void> {
    return this.projectRepository.delete(projectId);
  }

  async addUserToProject(
    projectId: string,
    userId: string,
  ): Promise<Project | null> {
    return this.projectRepository.addUserToProject(projectId, userId);
  }

  async removeUserFromProject(
    projectId: string,
    userId: string,
  ): Promise<Project | null> {
    return this.projectRepository.removeUserFromProject(projectId, userId);
  }

  async getAllUsersFromProject(projectId: string): Promise<string[] | null> {
    return this.projectRepository.getAllUsersFromProject(projectId);
  }

  async getProjectsByUserId(userId: string): Promise<Project[]> {
    return this.projectRepository.getProjectsByUserId(userId);
  }
  async getProjectsByManagerId(managerId: string): Promise<Project[]> {
    return this.projectRepository.getProjectsByManagerId(managerId);
  }
}

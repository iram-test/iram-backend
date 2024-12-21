import { ProjectDomainService } from "../../domain/services/project-domain-service";
import { ProjectPostgresRepository } from "../db/repositories/project-postgres-repository";
import {
  CreateProjectDTO,
  UpdateProjectDTO,
} from "../../application/dtos/project-dto";
import logger from "../../tools/logger";
import { CustomError } from "../../tools/custom-error";

const projectRepository = new ProjectPostgresRepository();
const projectService = new ProjectDomainService(projectRepository);

class ProjectService {
  async addProject(projectDto: CreateProjectDTO) {
    const newProject = await projectService.addProject(projectDto);
    logger.info(`Project created: ${newProject.name}`);
    return newProject;
  }

  async getAllProjects() {
    logger.info(`Get all projects`);
    return await projectService.getAll();
  }

  async getProjectById(projectId: string) {
    const project = await projectService.getById(projectId);
    if (!project) {
      logger.warn(`Project with id: ${projectId} was not found.`);
      throw new CustomError("Project not found", 404);
    }
    logger.info(`Project with id: ${projectId} was found.`);
    return project;
  }

  async updateProject(projectId: string, projectDto: UpdateProjectDTO) {
    const project = await projectService.getById(projectId);

    if (!project) {
      logger.warn(`Project with id: ${projectId} was not found for update`);
      throw new CustomError("Project not found", 404);
    }

    const updatedProject = await projectService.update({
      ...projectDto,
      projectId,
    });
    logger.info(`Project with id ${projectId} updated successfully`);
    return updatedProject;
  }

  async deleteProject(projectId: string) {
    const project = await projectService.getById(projectId);

    if (!project) {
      logger.warn(`Project with id: ${projectId} was not found for delete`);
      throw new CustomError("Project not found", 404);
    }

    await projectService.delete(projectId);
    logger.info(`Project with id ${projectId} deleted successfully`);
  }
}

export default new ProjectService();

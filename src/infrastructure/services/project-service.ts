import { ProjectPostgresRepository } from "../db/repositories/project-postgres-repository";
import {
  CreateProjectDTO,
  UpdateProjectDTO,
} from "../../application/dtos/project-dto";
import logger from "../../tools/logger";
import { CustomError } from "../../tools/custom-error";

const projectRepository = new ProjectPostgresRepository();

class ProjectService {
  async addProject(projectDto: CreateProjectDTO) {
    try {
      const newProject = await projectRepository.addProject(projectDto);
      logger.info(`Project created: ${newProject.name}`);
      return newProject;
    } catch (error) {
      logger.error(`Error creating project:`, error);
      throw new CustomError("Failed to create project", 500);
    }
  }

  async getAll() {
    try {
      logger.info(`Get all projects`);
      return await projectRepository.getAll();
    } catch (error) {
      logger.error(`Error getting all projects:`, error);
      throw new CustomError("Failed to get projects", 500);
    }
  }

  async getById(projectId: string) {
    try {
      const project = await projectRepository.getById(projectId);
      if (!project) {
        logger.warn(`Project with id: ${projectId} not found`);
        throw new CustomError("Project not found", 404);
      }
      logger.info(`Project with id: ${projectId} found`);
      return project;
    } catch (error) {
      logger.error(`Error getting project by id ${projectId}:`, error);
      throw new CustomError("Failed to get project", 500);
    }
  }

  async getByName(projectName: string) {
    try {
      const project = await projectRepository.getByName(projectName);
      if (!project) {
        logger.warn(`Project with name: ${projectName} not found`);
        throw new CustomError("Project not found", 404);
      }
      logger.info(`Project with name: ${projectName} found`);
      return project;
    } catch (error) {
      logger.error(`Error getting project by name ${projectName}:`, error);
      throw new CustomError("Failed to get project", 500);
    }
  }

  async update(projectId: string, projectDto: UpdateProjectDTO) {
    try {
      const project = await projectRepository.getById(projectId);
      if (!project) {
        logger.warn(`Project with id: ${projectId} not found for update`);
        throw new CustomError("Project not found", 404);
      }

      const updatedProject = await projectRepository.update({
        ...projectDto,
        projectId,
      });
      logger.info(`Project with id: ${projectId} updated`);
      return updatedProject;
    } catch (error) {
      logger.error(`Error updating project with id ${projectId}:`, error);
      throw new CustomError("Failed to update project", 500);
    }
  }

  async delete(projectId: string) {
    try {
      const project = await projectRepository.getById(projectId);
      if (!project) {
        logger.warn(`Project with id: ${projectId} not found for delete`);
        throw new CustomError("Project not found", 404);
      }

      await projectRepository.delete(projectId);
      logger.info(`Project with id: ${projectId} deleted`);
    } catch (error) {
      logger.error(`Error deleting project with id ${projectId}:`, error);
      throw new CustomError("Failed to delete project", 500);
    }
  }

  async getByOrganizationId(organizationId: string) {
    try {
      const projects =
        await projectRepository.getByOrganizationId(organizationId);
      logger.info(`Get projects by organization id: ${organizationId}`);
      return projects;
    } catch (error) {
      logger.error(
        `Error getting projects by organization id ${organizationId}:`,
        error,
      );
      throw new CustomError("Failed to get projects", 500);
    }
  }
}

export default new ProjectService();

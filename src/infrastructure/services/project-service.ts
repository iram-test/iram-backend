import { ProjectPostgresRepository } from "../db/repositories/project-postgres-repository";
import { UserPostgresRepository } from "../db/repositories/user-postgres-repository";
import {
  CreateProjectDTO,
  UpdateProjectDTO,
} from "../../application/dtos/project-dto";
import logger from "../../tools/logger";
import { CustomError } from "../../tools/custom-error";
import { ProjectDomainService } from "../../domain/services/project-domain-service";
import { Project } from "../../domain/entities/project-entity";

const projectRepository = new ProjectPostgresRepository();
const userRepository = new UserPostgresRepository();
const projectDomainService = new ProjectDomainService(
  projectRepository,
  userRepository,
);

class ProjectService {
  async addProject(projectDto: CreateProjectDTO, userId: string) {
    try {
      const newProject = await projectDomainService.addProject(
        projectDto,
        userId,
      );
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
      return await projectDomainService.getAll();
    } catch (error) {
      logger.error(`Error getting all projects:`, error);
      throw new CustomError("Failed to get projects", 500);
    }
  }

  async getProjectsByUserId(userId: string): Promise<Project[]> {
    try {
      logger.info(`Getting projects for user ID: ${userId}`);
      return await projectDomainService.getProjectsByUserId(userId);
    } catch (error) {
      logger.error(`Error getting projects for user ID ${userId}:`, error);
      throw new CustomError("Failed to get projects for user", 500);
    }
  }

  async getProjectsByManagerId(managerId: string): Promise<Project[]> {
    try {
      logger.info(`Getting projects for manager ID: ${managerId}`);
      return await projectDomainService.getProjectsByManagerId(managerId);
    } catch (error) {
      logger.error(
        `Error getting projects for manager ID ${managerId}:`,
        error,
      );
      throw new CustomError("Failed to get projects for manager", 500);
    }
  }

  async getAllUsersFromProject(projectId: string): Promise<string[]> {
    try {
      const users =
        await projectDomainService.getAllUsersFromProject(projectId);
      if (!users) {
        logger.warn(`Project with id: ${projectId} not found`);
        throw new CustomError("Project not found", 404);
      }
      logger.info(`Getting users for project ${projectId}`);
      return users;
    } catch (error) {
      logger.error(`Error getting users for project ${projectId}:`, error);
      throw new CustomError("Failed to get users for project", 500);
    }
  }

  async getById(projectId: string) {
    try {
      const project = await projectDomainService.getById(projectId);
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
      const project = await projectDomainService.getByName(projectName);
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
      const project = await projectDomainService.getById(projectId);
      if (!project) {
        logger.warn(`Project with id: ${projectId} not found for update`);
        throw new CustomError("Project not found", 404);
      }
      const updatedProject = await projectDomainService.updateProject(
        projectId,
        projectDto,
      );
      logger.info(`Project with id: ${projectId} updated`);
      return updatedProject;
    } catch (error) {
      logger.error(`Error updating project with id ${projectId}:`, error);
      throw new CustomError("Failed to update project", 500);
    }
  }

  async delete(projectId: string) {
    try {
      const project = await projectDomainService.getById(projectId);
      if (!project) {
        logger.warn(`Project with id: ${projectId} not found for delete`);
        throw new CustomError("Project not found", 404);
      }
      await projectDomainService.deleteProject(projectId);
      logger.info(`Project with id: ${projectId} deleted`);
    } catch (error) {
      logger.error(`Error deleting project with id ${projectId}:`, error);
      throw new CustomError("Failed to delete project", 500);
    }
  }

  async addUserToProject(projectId: string, userId: string) {
    try {
      const updatedProject = await projectDomainService.addUserToProject(
        projectId,
        userId,
      );
      if (!updatedProject) {
        logger.warn(`Project with id: ${projectId} not found`);
        throw new CustomError("Project not found", 404);
      }
      logger.info(`User ${userId} added to project ${projectId}`);
      return updatedProject;
    } catch (error) {
      logger.error(`Error adding user to project ${projectId}:`, error);
      throw new CustomError("Failed to add user to project", 500);
    }
  }

  async removeUserFromProject(projectId: string, userId: string) {
    try {
      const updatedProject = await projectDomainService.removeUserFromProject(
        projectId,
        userId,
      );
      if (!updatedProject) {
        logger.warn(`Project with id: ${projectId} not found`);
        throw new CustomError("Project not found", 404);
      }
      logger.info(`User ${userId} removed from project ${projectId}`);
      return updatedProject;
    } catch (error) {
      logger.error(`Error removing user from project ${projectId}:`, error);
      throw new CustomError("Failed to remove user from project", 500);
    }
  }
}

export default new ProjectService();

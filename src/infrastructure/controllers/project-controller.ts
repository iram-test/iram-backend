import { FastifyReply, FastifyRequest } from "fastify";
import ProjectService from "../services/project-service";
import logger from "../../tools/logger";
import { CustomError } from "../../tools/custom-error";
import { UserRole } from "../../domain/entities/enums/user-role";
import {
  CreateProjectDTOSchema,
  UpdateProjectDTOSchema,
} from "../../application/validation/dto-validation/project-dto-schema";
import { z } from "zod";

export const addProject = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const projectDto = CreateProjectDTOSchema.parse(request.body);
    const userId = request.user!.userId;
    const newProject = await ProjectService.addProject(projectDto, userId);
    reply.status(201).send(newProject);
  } catch (error) {
    if (error instanceof z.ZodError) {
      reply
        .code(400)
        .send({ message: "Validation error", errors: error.errors });
    } else {
      logger.error(`Error creating project: ${error}`);
      reply.status(500).send({ message: "Error creating project" });
    }
  }
};

export const getAllUsersFromProject = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { projectId } = request.params as { projectId: string };
    const users = await ProjectService.getAllUsersFromProject(projectId);
    reply.status(200).send(users);
  } catch (error) {
    logger.error(`Error getting users for project ${request.params}: ${error}`);
    if (error instanceof CustomError) {
      reply.status(error.statusCode).send({ message: error.message });
    } else {
      reply.status(500).send({ message: "Error getting users for project" });
    }
  }
};

export const getAllProjects = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const userRole = request.user!.role;
    const userId = request.user!.userId;

    if (userRole === UserRole.USER) {
      const projects = await ProjectService.getProjectsByUserId(userId);
      reply.status(200).send(projects);
    } else if (userRole === UserRole.MANAGER) {
      const managedProjects =
        await ProjectService.getProjectsByManagerId(userId);
      const userProjects = await ProjectService.getProjectsByUserId(userId);

      const allProjects = [...managedProjects, ...userProjects];
      const uniqueProjects = Array.from(
        new Set(allProjects.map((p) => p.projectId)),
      ).map((id) => allProjects.find((p) => p.projectId === id)!);

      reply.status(200).send(uniqueProjects);
    } else {
      const projects = await ProjectService.getAll();
      reply.status(200).send(projects);
    }
  } catch (error) {
    logger.error(`Error getting projects: ${error}`);
    if (error instanceof CustomError) {
      reply.status(error.statusCode).send({ message: error.message });
    } else {
      reply.status(500).send({ message: "Error getting projects" });
    }
  }
};

export const getProjectById = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { projectId } = request.params as { projectId: string };
    const project = await ProjectService.getById(projectId);
    reply.status(200).send(project);
  } catch (error) {
    logger.error(`Error getting project by id: ${error}`);
    if (error instanceof CustomError) {
      reply.status(error.statusCode).send({ message: error.message });
    } else {
      reply.status(500).send({ message: "Error getting project" });
    }
  }
};

export const updateProject = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { projectId } = request.params as { projectId: string };
    const projectDto = UpdateProjectDTOSchema.parse(request.body);
    const userId = request.user!.userId;
    const userRole = request.user!.role;

    const project = await ProjectService.getById(projectId);

    if (!project) {
      return reply.status(404).send({ message: "Project not found" });
    }
    if (project.managerId !== userId && userRole !== UserRole.ADMIN) {
      return reply
        .status(403)
        .send({ message: "Unauthorized to update this project" });
    }

    const updatedProject = await ProjectService.update(projectId, projectDto);
    reply.status(200).send(updatedProject);
  } catch (error) {
    if (error instanceof z.ZodError) {
      reply
        .code(400)
        .send({ message: "Validation error", errors: error.errors });
    } else {
      logger.error(
        `Error during update project with id ${request.params}: ${error}`,
      );
      reply.status(500).send({ message: "Error updating project" });
    }
  }
};

export const deleteProject = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { projectId } = request.params as { projectId: string };
    const userId = request.user!.userId;
    const userRole = request.user!.role;

    const project = await ProjectService.getById(projectId);
    if (!project) {
      return reply.status(404).send({ message: "Project not found" });
    }

    if (project.managerId !== userId && userRole !== UserRole.ADMIN) {
      return reply
        .status(403)
        .send({ message: "Unauthorized to delete this project" });
    }
    await ProjectService.delete(projectId);
    reply.status(204).send();
  } catch (error) {
    logger.error(
      `Error during delete project with id: ${request.params}: ${error}`,
    );
    if (error instanceof CustomError) {
      reply.status(error.statusCode).send({ message: error.message });
    } else {
      reply.status(500).send({ message: "Error deleting project" });
    }
  }
};

export const addUserToProject = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { projectId } = request.params as { projectId: string };
    const { userId } = request.body as { userId: string };
    const requestingUserId = request.user!.userId;
    const userRole = request.user!.role;

    const project = await ProjectService.getById(projectId);
    if (!project) {
      return reply.status(404).send({ message: "Project not found" });
    }

    if (project.managerId !== requestingUserId && userRole !== UserRole.ADMIN) {
      return reply
        .status(403)
        .send({ message: "Unauthorized to add users to this project" });
    }
    const updatedProject = await ProjectService.addUserToProject(
      projectId,
      userId,
    );
    reply.status(200).send(updatedProject);
  } catch (error) {
    logger.error(`Error adding user to project ${request.params}: ${error}`);
    if (error instanceof CustomError) {
      reply.status(error.statusCode).send({ message: error.message });
    } else {
      reply.status(500).send({ message: "Error adding user to project" });
    }
  }
};

export const removeUserFromProject = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { projectId } = request.params as { projectId: string };
    const { userId } = request.body as { userId: string };
    const requestingUserId = request.user!.userId;
    const userRole = request.user!.role;

    const project = await ProjectService.getById(projectId);
    if (!project) {
      return reply.status(404).send({ message: "Project not found" });
    }

    if (project.managerId !== requestingUserId && userRole !== UserRole.ADMIN) {
      return reply
        .status(403)
        .send({ message: "Unauthorized to remove users from this project" });
    }
    const updatedProject = await ProjectService.removeUserFromProject(
      projectId,
      userId,
    );
    reply.status(200).send(updatedProject);
  } catch (error) {
    logger.error(
      `Error removing user from project ${request.params}: ${error}`,
    );
    if (error instanceof CustomError) {
      reply.status(error.statusCode).send({ message: error.message });
    } else {
      reply.status(500).send({ message: "Error removing user from project" });
    }
  }
};

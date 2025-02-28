import { FastifyReply, FastifyRequest } from "fastify";
import ProjectService from "../services/project-service";
import {
  CreateProjectDTO,
  UpdateProjectDTO,
} from "../../application/dtos/project-dto";
import logger from "../../tools/logger";
import { CustomError } from "../../tools/custom-error";

export const addProject = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const projectDto = request.body as CreateProjectDTO;
    const userId = request.user!.userId;
    const newProject = await ProjectService.addProject(projectDto, userId);
    reply.status(201).send(newProject);
  } catch (error) {
    logger.error(`Error creating project: ${error}`);
    if (error instanceof CustomError) {
      reply.status(error.statusCode).send({ message: error.message });
    } else {
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
  _: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const projects = await ProjectService.getAll();
    reply.status(200).send(projects);
  } catch (error) {
    logger.error(`Error getting all projects: ${error}`);
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
    const projectDto = request.body as UpdateProjectDTO;
    const updatedProject = await ProjectService.update(projectId, projectDto);
    reply.status(200).send(updatedProject);
  } catch (error) {
    logger.error(
      `Error during update project with id ${request.params}: ${error}`,
    );
    if (error instanceof CustomError) {
      reply.status(error.statusCode).send({ message: error.message });
    } else {
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

import { FastifyReply, FastifyRequest } from "fastify";
import ProjectService from "../services/project-service";
import {
  CreateProjectDTO,
  UpdateProjectDTO,
} from "../../application/dtos/project-dto";
import logger from "../../tools/logger";

export const addProject = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const projectDto = request.body as CreateProjectDTO;
    const newProject = await ProjectService.addProject(projectDto);
    reply.code(201).send(newProject);
  } catch (error) {
    logger.error(`Error creating project: ${error}`);
    reply.code(500).send({ message: "Error creating project" });
  }
};

export const getAllProjects = async (
  _: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const projects = await ProjectService.getAllProjects();
    reply.code(200).send(projects);
  } catch (error) {
    logger.error(`Error getting all projects: ${error}`);
    reply.code(500).send({ message: "Error getting projects" });
  }
};

export const getProjectById = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { projectId } = request.params as { projectId: string };
    const project = await ProjectService.getProjectById(projectId);
    reply.code(200).send(project);
  } catch (error) {
    logger.error(`Error getting project by id: ${error}`);
    if (error instanceof Error && error.message === "Project not found") {
      reply.code(404).send({ message: "Project not found" });
    } else {
      reply.code(500).send({ message: "Error getting project" });
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
    const updatedProject = await ProjectService.updateProject(
      projectId,
      projectDto,
    );
    reply.code(200).send(updatedProject);
  } catch (error) {
    logger.error(
      `Error during update project with id ${request.params}: ${error}`,
    );
    if (error instanceof Error && error.message === "Project not found") {
      reply.code(404).send({ message: "Project not found" });
    } else {
      reply.code(500).send({ message: "Error updating project" });
    }
  }
};

export const deleteProject = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { projectId } = request.params as { projectId: string };
    await ProjectService.deleteProject(projectId);
    reply.code(204).send();
  } catch (error) {
    logger.error(
      `Error during delete project with id: ${request.params}: ${error}`,
    );
    if (error instanceof Error && error.message === "Project not found") {
      reply.code(404).send({ message: "Project not found" });
    } else {
      reply.code(500).send({ message: "Error deleting project" });
    }
  }
};

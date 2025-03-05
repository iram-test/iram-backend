import { FastifyReply, FastifyRequest } from "fastify";
import SectionService from "../services/section-service";
import logger from "../../tools/logger";
import { CustomError } from "../../tools/custom-error";
import {
  CreateSectionDTOSchema,
  UpdateSectionDTOSchema,
} from "../../application/validation/dto-validation/section-dto-schema";
import { z } from "zod";

export const addSection = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { projectId } = request.params as { projectId: string };
    const sectionDto = CreateSectionDTOSchema.parse(request.body);
    const newSection = await SectionService.addSection(projectId, sectionDto);
    reply.status(201).send(newSection);
  } catch (error) {
    if (error instanceof z.ZodError) {
      reply
        .code(400)
        .send({ message: "Validation error", errors: error.errors });
    } else {
      logger.error(`Error creating section: ${error}`);
      reply.status(500).send({ message: "Error creating section" });
    }
  }
};

export const getAll = async (_: FastifyRequest, reply: FastifyReply) => {
  try {
    const sections = await SectionService.getAll();
    reply.status(200).send(sections);
  } catch (error) {
    logger.error(`Error getting all sections: ${error}`);
    if (error instanceof CustomError) {
      reply.status(error.statusCode).send({ message: error.message });
    } else {
      reply.status(500).send({ message: "Error getting sections" });
    }
  }
};

export const getById = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { sectionId } = request.params as { sectionId: string };
    const section = await SectionService.getById(sectionId);
    reply.status(200).send(section);
  } catch (error) {
    logger.error(`Error getting section by id: ${error}`);
    if (error instanceof CustomError) {
      reply.status(error.statusCode).send({ message: error.message });
    } else {
      reply.status(500).send({ message: "Error getting section" });
    }
  }
};

export const update = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { sectionId } = request.params as { sectionId: string };
    const sectionDto = UpdateSectionDTOSchema.parse(request.body);

    if (sectionId !== sectionDto.sectionId) {
      return reply
        .status(400)
        .send({ message: "Section ID in path and body do not match" });
    }

    const updatedSection = await SectionService.update(sectionId, sectionDto);
    reply.status(200).send(updatedSection);
  } catch (error) {
    if (error instanceof z.ZodError) {
      reply
        .code(400)
        .send({ message: "Validation error", errors: error.errors });
    } else {
      logger.error(
        `Error during update section with id ${request.params}: ${error}`,
      );
      reply.status(500).send({ message: "Error updating section" });
    }
  }
};

export const deleteSection = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { sectionId } = request.params as { sectionId: string };
    await SectionService.delete(sectionId);
    reply.status(204).send();
  } catch (error) {
    logger.error(
      `Error during delete section with id: ${request.params}: ${error}`,
    );
    if (error instanceof CustomError) {
      reply.status(error.statusCode).send({ message: error.message });
    } else {
      reply.status(500).send({ message: "Error deleting section" });
    }
  }
};

export const getSectionsByProjectId = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { projectId } = request.params as { projectId: string };
    const sections = await SectionService.getSectionsByProjectId(projectId);
    reply.status(200).send(sections);
  } catch (error) {
    logger.error(`Error getting sections by project id: ${error}`);
    if (error instanceof CustomError) {
      reply.status(error.statusCode).send({ message: error.message });
    } else {
      reply
        .status(500)
        .send({ message: "Error getting sections by project id" });
    }
  }
};

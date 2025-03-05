import { FastifyReply, FastifyRequest } from "fastify";
import SubsectionService from "../services/subsection-service";
import logger from "../../tools/logger";
import { CustomError } from "../../tools/custom-error";
import {
  CreateSubsectionDTOSchema,
  UpdateSubsectionDTOSchema,
} from "../../application/validation/dto-validation/subsection-dto-schema";
import { z } from "zod";

export const addSubsection = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { sectionId } = request.params as { sectionId: string };
    const subsectionDto = CreateSubsectionDTOSchema.parse(request.body);
    const newSubsection = await SubsectionService.addSubsection(
      sectionId,
      subsectionDto,
    );
    reply.status(201).send(newSubsection);
  } catch (error) {
    if (error instanceof z.ZodError) {
      reply
        .code(400)
        .send({ message: "Validation error", errors: error.errors });
    } else {
      logger.error(`Error creating subsection: ${error}`);
      reply.status(500).send({ message: "Error creating subsection" });
    }
  }
};

export const getAllSubsections = async (
  _: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const subsections = await SubsectionService.getAll();
    reply.status(200).send(subsections);
  } catch (error) {
    logger.error(`Error getting all subsections: ${error}`);
    if (error instanceof CustomError) {
      reply.status(error.statusCode).send({ message: error.message });
    } else {
      reply.status(500).send({ message: "Error getting subsections" });
    }
  }
};

export const getSubsectionById = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { subsectionId } = request.params as { subsectionId: string };
    const subsection = await SubsectionService.getById(subsectionId);
    reply.status(200).send(subsection);
  } catch (error) {
    logger.error(`Error getting subsection by id: ${error}`);
    if (error instanceof CustomError) {
      reply.status(error.statusCode).send({ message: error.message });
    } else {
      reply.status(500).send({ message: "Error getting subsection" });
    }
  }
};

export const updateSubsection = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { subsectionId } = request.params as { subsectionId: string };
    const subsectionDto = UpdateSubsectionDTOSchema.parse(request.body);

    if (subsectionId !== subsectionDto.subsectionId) {
      return reply
        .status(400)
        .send({ message: "Subsection ID in path and body do not match" });
    }

    const updatedSubsection = await SubsectionService.update(
      subsectionId,
      subsectionDto,
    );
    reply.status(200).send(updatedSubsection);
  } catch (error) {
    if (error instanceof z.ZodError) {
      reply
        .code(400)
        .send({ message: "Validation error", errors: error.errors });
    } else {
      logger.error(
        `Error during update subsection with id ${request.params}: ${error}`,
      );
      reply.status(500).send({ message: "Error updating subsection" });
    }
  }
};

export const deleteSubsection = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { subsectionId } = request.params as { subsectionId: string };
    await SubsectionService.delete(subsectionId);
    reply.status(204).send();
  } catch (error) {
    logger.error(
      `Error during delete subsection with id: ${request.params}: ${error}`,
    );
    if (error instanceof CustomError) {
      reply.status(error.statusCode).send({ message: error.message });
    } else {
      reply.status(500).send({ message: "Error deleting subsection" });
    }
  }
};

export const getSubsectionsBySectionId = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { sectionId } = request.params as { sectionId: string };
    const subsections =
      await SubsectionService.getSubsectionsBySectionId(sectionId);
    reply.status(200).send(subsections);
  } catch (error) {
    logger.error(`Error getting subsections by sectionId: ${error}`);
    if (error instanceof CustomError) {
      reply.status(error.statusCode).send({ message: error.message });
    } else {
      reply
        .status(500)
        .send({ message: "Error getting subsections by sectionId" });
    }
  }
};

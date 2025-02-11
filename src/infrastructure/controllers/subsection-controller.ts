import { FastifyReply, FastifyRequest } from "fastify";
import SubsectionService from "../services/subsection-service";
import {
  CreateSubsectionDTO,
  UpdateSubsectionDTO,
} from "../../application/dtos/subsection-dto";
import logger from "../../tools/logger";
import { CustomError } from "../../tools/custom-error";

export const addSubsection = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { sectionId } = request.params as { sectionId: string };
    const subsectionDto = request.body as CreateSubsectionDTO;
    const newSubsection = await SubsectionService.addSubsection(
      sectionId,
      subsectionDto,
    );
    reply.status(201).send(newSubsection);
  } catch (error) {
    logger.error(`Error creating subsection: ${error}`);
    if (error instanceof CustomError) {
      reply.status(error.statusCode).send({ message: error.message });
    } else {
      reply.status(500).send({ message: "Error creating subsection" });
    }
  }
};

export const getAll = async (_: FastifyRequest, reply: FastifyReply) => {
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

export const getById = async (request: FastifyRequest, reply: FastifyReply) => {
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

export const update = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { subsectionId } = request.params as { subsectionId: string };
    const subsectionDto = request.body as UpdateSubsectionDTO;
    const updatedSubsection = await SubsectionService.update(
      subsectionId,
      subsectionDto,
    );
    reply.status(200).send(updatedSubsection);
  } catch (error) {
    logger.error(
      `Error during update subsection with id ${request.params}: ${error}`,
    );
    if (error instanceof CustomError) {
      reply.status(error.statusCode).send({ message: error.message });
    } else {
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

import { FastifyReply, FastifyRequest } from "fastify";
import ProjectUserAssociationService from "../services/project-user-association-service";
import {
  CreateProjectUserAssociationDTO,
  UpdateProjectUserAssociationDTO,
} from "../../application/dtos/project-user-association-dto";
import logger from "../../tools/logger";

export const addAssociation = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const associationDto = request.body as CreateProjectUserAssociationDTO;
    const newAssociation =
      await ProjectUserAssociationService.addAssociation(associationDto);
    reply.code(201).send(newAssociation);
  } catch (error) {
    logger.error(`Error during creating project user association: ${error}`);
    reply.code(500).send({
      message: "Error creating project user association",
    });
  }
};

export const getAllAssociations = async (
  _: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const associations =
      await ProjectUserAssociationService.getAllAssociations();
    reply.code(200).send(associations);
  } catch (error) {
    logger.error(`Error getting all project user associations: ${error}`);
    reply.code(500).send({
      message: "Error getting project user associations",
    });
  }
};
export const getAssociationById = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { associationId } = request.params as { associationId: string };
    const association =
      await ProjectUserAssociationService.getAssociationById(associationId);
    reply.code(200).send(association);
  } catch (error) {
    logger.error(
      `Error during getting project user association by id: ${error}`,
    );
    if (error instanceof Error && error.message === "Association not found") {
      reply.code(404).send({ message: "Association not found" });
    } else {
      reply.code(500).send({ message: "Error getting association" });
    }
  }
};

export const updateAssociation = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { associationId } = request.params as { associationId: string };
    const associationDto = request.body as UpdateProjectUserAssociationDTO;
    const updatedAssociation =
      await ProjectUserAssociationService.updateAssociation(
        associationId,
        associationDto,
      );
    reply.code(200).send(updatedAssociation);
  } catch (error) {
    logger.error(
      `Error during updating project user association with id ${request.params}: ${error}`,
    );
    if (error instanceof Error && error.message === "Association not found") {
      reply.code(404).send({ message: "Association not found" });
    } else {
      reply.code(500).send({ message: "Error updating association" });
    }
  }
};
export const deleteAssociation = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { associationId } = request.params as { associationId: string };
    await ProjectUserAssociationService.deleteAssociation(associationId);
    reply.code(204).send();
  } catch (error) {
    logger.error(
      `Error deleting project user association with id: ${request.params}: ${error}`,
    );
    if (error instanceof Error && error.message === "Association not found") {
      reply.code(404).send({ message: "Association not found" });
    } else {
      reply.code(500).send({ message: "Error deleting association" });
    }
  }
};

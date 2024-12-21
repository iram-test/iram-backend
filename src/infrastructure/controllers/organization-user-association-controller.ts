import { FastifyReply, FastifyRequest } from "fastify";
import OrganizationUserAssociationService from "../services/organization-user-association-service";
import {
  CreateOrganizationUserAssociationDTO,
  UpdateOrganizationUserAssociationDTO,
} from "../../application/dtos/organization-user-association-dto";
import logger from "../../tools/logger";

export const addAssociation = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const associationDto = request.body as CreateOrganizationUserAssociationDTO;
    const newAssociation =
      await OrganizationUserAssociationService.addAssociation(associationDto);
    reply.code(201).send(newAssociation);
  } catch (error) {
    logger.error(`Error creating organization user association: ${error}`);
    reply.code(500).send({
      message: "Error creating organization user association",
    });
  }
};

export const getAllAssociations = async (
  _: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const associations =
      await OrganizationUserAssociationService.getAllAssociations();
    reply.code(200).send(associations);
  } catch (error) {
    logger.error(`Error during getting all associations: ${error}`);
    reply.code(500).send({
      message: "Error during get all associations",
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
      await OrganizationUserAssociationService.getAssociationById(
        associationId,
      );
    reply.code(200).send(association);
  } catch (error) {
    logger.error(`Error during getting association by ID: ${error}`);
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
    const associationDto = request.body as UpdateOrganizationUserAssociationDTO;
    const updatedAssociation =
      await OrganizationUserAssociationService.updateAssociation(
        associationId,
        associationDto,
      );
    reply.code(200).send(updatedAssociation);
  } catch (error) {
    logger.error(
      `Error during updating association with id ${request.params}: ${error}`,
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
    await OrganizationUserAssociationService.deleteAssociation(associationId);
    reply.code(204).send();
  } catch (error) {
    logger.error(
      `Error during delete association with id ${request.params}: ${error}`,
    );
    if (error instanceof Error && error.message === "Association not found") {
      reply.code(404).send({ message: "Association not found" });
    } else {
      reply.code(500).send({ message: "Error deleting association" });
    }
  }
};

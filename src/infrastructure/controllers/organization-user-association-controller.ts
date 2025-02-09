import { FastifyReply, FastifyRequest } from "fastify";
import OrganizationUserAssociationService from "../services/organization-user-association-service";
import {
  CreateOrganizationUserAssociationDTO,
  UpdateOrganizationUserAssociationDTO,
} from "../../application/dtos/organization-user-association-dto";
import logger from "../../tools/logger";
import { CustomError } from "../../tools/custom-error";

export const addAssociation = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const associationDto = request.body as CreateOrganizationUserAssociationDTO;
    const newAssociation =
      await OrganizationUserAssociationService.addAssociation(associationDto);
    reply.status(201).send(newAssociation);
  } catch (error) {
    logger.error(`Error creating organization user association: ${error}`);
    if (error instanceof CustomError) {
      reply.status(error.statusCode).send({ message: error.message });
    } else {
      reply
        .status(500)
        .send({ message: "Error creating organization user association" });
    }
  }
};

export const getAllAssociations = async (
  _: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const associations =
      await OrganizationUserAssociationService.getAllAssociations();
    reply.status(200).send(associations);
  } catch (error) {
    logger.error(`Error during getting all associations: ${error}`);
    if (error instanceof CustomError) {
      reply.status(error.statusCode).send({ message: error.message });
    } else {
      reply.status(500).send({ message: "Error during get all associations" });
    }
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
    reply.status(200).send(association);
  } catch (error) {
    logger.error(`Error during getting association by ID: ${error}`);
    if (error instanceof CustomError) {
      reply.status(error.statusCode).send({ message: error.message });
    } else {
      reply.status(500).send({ message: "Error getting association" });
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
    reply.status(200).send(updatedAssociation);
  } catch (error) {
    logger.error(
      `Error during updating association with id ${request.params}: ${error}`,
    );
    if (error instanceof CustomError) {
      reply.status(error.statusCode).send({ message: error.message });
    } else {
      reply.status(500).send({ message: "Error updating association" });
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
    reply.status(204).send();
  } catch (error) {
    logger.error(
      `Error during delete association with id ${request.params}: ${error}`,
    );
    if (error instanceof CustomError) {
      reply.status(error.statusCode).send({ message: error.message });
    } else {
      reply.status(500).send({ message: "Error deleting association" });
    }
  }
};

// New controller methods based on the added service methods
export const getOrganizationsByUserId = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { userId } = request.params as { userId: string };
    const organizations =
      await OrganizationUserAssociationService.getOrganizationsByUserId(userId);
    reply.status(200).send(organizations);
  } catch (error) {
    logger.error(`Error getting organizations by user ID: ${error}`);
    if (error instanceof CustomError) {
      reply.status(error.statusCode).send({ message: error.message });
    } else {
      reply
        .status(500)
        .send({ message: "Error getting organizations by user ID" });
    }
  }
};

export const getOrganizationsByProjectId = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { projectId } = request.params as { projectId: string };
    const organizations =
      await OrganizationUserAssociationService.getOrganizationsByProjectId(
        projectId,
      );
    reply.status(200).send(organizations);
  } catch (error) {
    logger.error(`Error getting organizations by project ID: ${error}`);
    if (error instanceof CustomError) {
      reply.status(error.statusCode).send({ message: error.message });
    } else {
      reply
        .status(500)
        .send({ message: "Error getting organizations by project ID" });
    }
  }
};

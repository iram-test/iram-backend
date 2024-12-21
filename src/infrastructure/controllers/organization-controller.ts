import { FastifyReply, FastifyRequest } from "fastify";
import OrganizationService from "../services/organization-service";
import {
  CreateOrganizationDTO,
  UpdateOrganizationDTO,
} from "../../application/dtos/organization-dto";
import logger from "../../tools/logger";

export const addOrganization = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const organizationDto = request.body as CreateOrganizationDTO;
    const newOrganization =
      await OrganizationService.addOrganization(organizationDto);
    reply.code(201).send(newOrganization);
  } catch (error) {
    logger.error(`Error during creating organization: ${error}`);
    reply.code(500).send({ message: "Error creating organization" });
  }
};
export const getAllOrganizations = async (
  _: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const organizations = await OrganizationService.getAllOrganizations();
    reply.code(200).send(organizations);
  } catch (error) {
    logger.error(`Error getting all organizations: ${error}`);
    reply.code(500).send({ message: "Error getting organizations" });
  }
};
export const getOrganizationById = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { organizationId } = request.params as { organizationId: string };
    const organization =
      await OrganizationService.getOrganizationById(organizationId);
    reply.code(200).send(organization);
  } catch (error) {
    logger.error(`Error during getting organization by id: ${error}`);
    if (error instanceof Error && error.message === "Organization not found") {
      reply.code(404).send({ message: "Organization not found" });
    } else {
      reply.code(500).send({ message: "Error getting organization" });
    }
  }
};
export const updateOrganization = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { organizationId } = request.params as { organizationId: string };
    const organizationDto = request.body as UpdateOrganizationDTO;
    const updatedOrganization = await OrganizationService.updateOrganization(
      organizationId,
      organizationDto,
    );
    reply.code(200).send(updatedOrganization);
  } catch (error) {
    logger.error(`Error updating organization ${request.params}: ${error}`);
    if (error instanceof Error && error.message === "Organization not found") {
      reply.code(404).send({ message: "Organization not found" });
    } else {
      reply.code(500).send({ message: "Error updating organization" });
    }
  }
};
export const deleteOrganization = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { organizationId } = request.params as { organizationId: string };
    await OrganizationService.deleteOrganization(organizationId);
    reply.code(204).send();
  } catch (error) {
    logger.error(`Error during delete organization: ${error}`);
    if (error instanceof Error && error.message === "Organization not found") {
      reply.code(404).send({ message: "Organization not found" });
    } else {
      reply.code(500).send({ message: "Error deleting organization" });
    }
  }
};

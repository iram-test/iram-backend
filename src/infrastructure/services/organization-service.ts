import { OrganizationPostgresRepository } from "../db/repositories/organization-postgres-repository";
import {
  CreateOrganizationDTO,
  UpdateOrganizationDTO,
} from "../../application/dtos/organization-dto";
import logger from "../../tools/logger";
import { CustomError } from "../../tools/custom-error";

const organizationRepository = new OrganizationPostgresRepository();

class OrganizationService {
  async addOrganization(organizationDto: CreateOrganizationDTO) {
    try {
      const newOrganization =
        await organizationRepository.addOrganization(organizationDto);
      logger.info(`Organization created: ${newOrganization.name}`);
      return newOrganization;
    } catch (error) {
      logger.error(`Error creating organization:`, error);
      throw new CustomError("Failed to create organization", 500);
    }
  }

  async getAllOrganizations() {
    try {
      logger.info(`Get all organizations`);
      return await organizationRepository.getAll();
    } catch (error) {
      logger.error(`Error getting all organizations:`, error);
      throw new CustomError("Failed to get organizations", 500);
    }
  }

  async getOrganizationById(organizationId: string) {
    try {
      const organization = await organizationRepository.getById(organizationId);
      if (!organization) {
        logger.warn(`Organization with id: ${organizationId} not found`);
        throw new CustomError("Organization not found", 404);
      }
      logger.info(`Organization with id: ${organizationId} found`);
      return organization;
    } catch (error) {
      logger.error(
        `Error getting organization by id ${organizationId}:`,
        error,
      );
      throw new CustomError("Failed to get organization", 500);
    }
  }

  async updateOrganization(
    organizationId: string,
    organizationDto: UpdateOrganizationDTO,
  ) {
    try {
      const organization = await organizationRepository.getById(organizationId);
      if (!organization) {
        logger.warn(
          `Organization with id: ${organizationId} not found for update`,
        );
        throw new CustomError("Organization not found", 404);
      }

      const updatedOrganization = await organizationRepository.update({
        ...organizationDto,
        organizationId,
      });
      logger.info(
        `Organization with id: ${organizationId} updated successfully`,
      );
      return updatedOrganization;
    } catch (error) {
      logger.error(
        `Error updating organization with id ${organizationId}:`,
        error,
      );
      throw new CustomError("Failed to update organization", 500);
    }
  }

  async deleteOrganization(organizationId: string) {
    try {
      const organization = await organizationRepository.getById(organizationId);
      if (!organization) {
        logger.warn(
          `Organization with id: ${organizationId} not found for delete`,
        );
        throw new CustomError("Organization not found", 404);
      }
      await organizationRepository.delete(organizationId);
      logger.info(
        `Organization with id: ${organizationId} deleted successfully`,
      );
    } catch (error) {
      logger.error(
        `Error deleting organization with id ${organizationId}:`,
        error,
      );
      throw new CustomError("Failed to delete organization", 500);
    }
  }
}

export default new OrganizationService();

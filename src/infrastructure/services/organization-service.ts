import { OrganizationDomainService } from "../../domain/services/organization-domain-service";
import { OrganizationPostgresRepository } from "../db/repositories/organization-postgres-repository";
import {
  CreateOrganizationDTO,
  UpdateOrganizationDTO,
} from "../../application/dtos/organization-dto";
import logger from "../../tools/logger";
import { CustomError } from "../../tools/custom-error";

const organizationRepository = new OrganizationPostgresRepository();
const organizationService = new OrganizationDomainService(
  organizationRepository,
);

class OrganizationService {
  async addOrganization(organizationDto: CreateOrganizationDTO) {
    const newOrganization =
      await organizationService.addOrganization(organizationDto);
    logger.info(`Organization created: ${newOrganization.name}`);
    return newOrganization;
  }

  async getAllOrganizations() {
    logger.info(`Get all organizations`);
    return await organizationService.getAll();
  }

  async getOrganizationById(organizationId: string) {
    const organization = await organizationService.getById(organizationId);
    if (!organization) {
      logger.warn(`Organization with id: ${organizationId} not found`);
      throw new CustomError("Organization not found", 404);
    }
    logger.info(`Organization with id: ${organizationId} found`);
    return organization;
  }

  async updateOrganization(
    organizationId: string,
    organizationDto: UpdateOrganizationDTO,
  ) {
    const organization = await organizationService.getById(organizationId);
    if (!organization) {
      logger.warn(
        `Organization with id: ${organizationId} not found for update`,
      );
      throw new CustomError("Organization not found", 404);
    }

    const updatedOrganization = await organizationService.update({
      ...organizationDto,
      organizationId,
    });
    logger.info(`Organization with id: ${organizationId} updated successfully`);
    return updatedOrganization;
  }

  async deleteOrganization(organizationId: string) {
    const organization = await organizationService.getById(organizationId);
    if (!organization) {
      logger.warn(
        `Organization with id: ${organizationId} not found for delete`,
      );
      throw new CustomError("Organization not found", 404);
    }
    await organizationService.delete(organizationId);
    logger.info(`Organization with id: ${organizationId} deleted successfully`);
  }
}

export default new OrganizationService();

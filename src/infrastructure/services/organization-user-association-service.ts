import { OrganizationUserAssociationDomainService } from "../../domain/services/organization-user-association-domain-service";
import { OrganizationUserAssociationPostgresRepository } from "../db/repositories/organization-user-association-postgres-repository";
import {
  CreateOrganizationUserAssociationDTO,
  UpdateOrganizationUserAssociationDTO,
} from "../../application/dtos/organization-user-association-dto";
import logger from "../../tools/logger";
import { CustomError } from "../../tools/custom-error";

const associationRepository =
  new OrganizationUserAssociationPostgresRepository();
const associationService = new OrganizationUserAssociationDomainService(
  associationRepository,
);

class OrganizationUserAssociationService {
  async addAssociation(associationDto: CreateOrganizationUserAssociationDTO) {
    const newAssociation =
      await associationService.addAssociation(associationDto);
    logger.info(
      `Organization user association created with id: ${newAssociation.associationId}`,
    );
    return newAssociation;
  }

  async getAllAssociations() {
    logger.info(`Get all organization user associations`);
    return await associationService.getAll();
  }

  async getAssociationById(associationId: string) {
    const association = await associationService.getById(associationId);
    if (!association) {
      logger.warn(`Association with id: ${associationId} not found.`);
      throw new CustomError("Association not found", 404);
    }
    logger.info(`Association with id: ${associationId} was found.`);
    return association;
  }

  async updateAssociation(
    associationId: string,
    associationDto: UpdateOrganizationUserAssociationDTO,
  ) {
    const association = await associationService.getById(associationId);
    if (!association) {
      logger.warn(
        `Association with id: ${associationId} was not found for update`,
      );
      throw new CustomError("Association not found", 404);
    }
    const updatedAssociation = await associationService.update({
      ...associationDto,
      associationId,
    });
    logger.info(`Association with id: ${associationId} updated`);
    return updatedAssociation;
  }

  async deleteAssociation(associationId: string) {
    const association = await associationService.getById(associationId);
    if (!association) {
      logger.warn(
        `Association with id: ${associationId} was not found for delete.`,
      );
      throw new CustomError("Association not found", 404);
    }

    await associationService.delete(associationId);
    logger.info(`Association with id ${associationId} deleted`);
  }
}

export default new OrganizationUserAssociationService();

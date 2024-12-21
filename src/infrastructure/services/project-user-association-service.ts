import { ProjectUserAssociationDomainService } from "../../domain/services/project-user-association-domain-service";
import { ProjectUserAssociationPostgresRepository } from "../db/repositories/project-user-association-postgres-repository";
import {
  CreateProjectUserAssociationDTO,
  UpdateProjectUserAssociationDTO,
} from "../../application/dtos/project-user-association-dto";
import logger from "../../tools/logger";
import { CustomError } from "../../tools/custom-error";

const associationRepository = new ProjectUserAssociationPostgresRepository();
const associationService = new ProjectUserAssociationDomainService(
  associationRepository,
);
class ProjectUserAssociationService {
  async addAssociation(associationDto: CreateProjectUserAssociationDTO) {
    const newAssociation =
      await associationService.addAssociation(associationDto);
    logger.info(
      `Project user association created with id ${newAssociation.associationId}`,
    );
    return newAssociation;
  }

  async getAllAssociations() {
    logger.info(`Get all project user associations`);
    return await associationService.getAll();
  }

  async getAssociationById(associationId: string) {
    const association = await associationService.getById(associationId);
    if (!association) {
      logger.warn(
        `Project user association with id ${associationId} was not found`,
      );
      throw new CustomError("Association not found", 404);
    }
    logger.info(`Project user association with id ${associationId} was found`);
    return association;
  }

  async updateAssociation(
    associationId: string,
    associationDto: UpdateProjectUserAssociationDTO,
  ) {
    const association = await associationService.getById(associationId);
    if (!association) {
      logger.warn(
        `Association with id: ${associationId} was not found for update.`,
      );
      throw new CustomError("Association not found", 404);
    }
    const updatedAssociation = await associationService.update({
      ...associationDto,
      associationId,
    });
    logger.info(`Project user association with id: ${associationId} updated`);
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
    logger.info(`Project user association with id: ${associationId} deleted`);
  }
}

export default new ProjectUserAssociationService();

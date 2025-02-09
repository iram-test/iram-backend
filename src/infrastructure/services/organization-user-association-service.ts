import { OrganizationUserAssociationPostgresRepository } from "../db/repositories/organization-user-association-postgres-repository";
import {
  CreateOrganizationUserAssociationDTO,
  UpdateOrganizationUserAssociationDTO,
} from "../../application/dtos/organization-user-association-dto";
import logger from "../../tools/logger";
import { CustomError } from "../../tools/custom-error";

const associationRepository =
  new OrganizationUserAssociationPostgresRepository();

class OrganizationUserAssociationService {
  async addAssociation(associationDto: CreateOrganizationUserAssociationDTO) {
    try {
      const newAssociation =
        await associationRepository.addAssociation(associationDto);
      logger.info(
        `Organization user association created with id: ${newAssociation.associationId}`,
      );
      return newAssociation;
    } catch (error) {
      logger.error(`Error creating organization user association:`, error);
      throw new CustomError("Failed to create association", 500);
    }
  }

  async getAllAssociations() {
    try {
      logger.info(`Get all organization user associations`);
      return await associationRepository.getAll();
    } catch (error) {
      logger.error(`Error getting all organization user associations:`, error);
      throw new CustomError("Failed to get associations", 500);
    }
  }

  async getAssociationById(associationId: string) {
    try {
      const association = await associationRepository.getById(associationId);
      if (!association) {
        logger.warn(`Association with id: ${associationId} not found.`);
        throw new CustomError("Association not found", 404);
      }
      logger.info(`Association with id: ${associationId} was found.`);
      return association;
    } catch (error) {
      logger.error(`Error getting association by id ${associationId}:`, error);
      throw new CustomError("Failed to get association", 500);
    }
  }

  async updateAssociation(
    associationId: string,
    associationDto: UpdateOrganizationUserAssociationDTO,
  ) {
    try {
      const association = await associationRepository.getById(associationId);
      if (!association) {
        logger.warn(
          `Association with id: ${associationId} was not found for update`,
        );
        throw new CustomError("Association not found", 404);
      }
      const updatedAssociation = await associationRepository.update({
        ...associationDto,
        associationId,
      });
      logger.info(`Association with id: ${associationId} updated`);
      return updatedAssociation;
    } catch (error) {
      logger.error(
        `Error updating association with id ${associationId}:`,
        error,
      );
      throw new CustomError("Failed to update association", 500);
    }
  }

  async deleteAssociation(associationId: string) {
    try {
      const association = await associationRepository.getById(associationId);
      if (!association) {
        logger.warn(
          `Association with id: ${associationId} was not found for delete.`,
        );
        throw new CustomError("Association not found", 404);
      }

      await associationRepository.delete(associationId);
      logger.info(`Association with id ${associationId} deleted`);
    } catch (error) {
      logger.error(
        `Error deleting association with id ${associationId}:`,
        error,
      );
      throw new CustomError("Failed to delete association", 500);
    }
  }

  async getOrganizationsByUserId(userId: string) {
    try {
      logger.info(`Get organizations for user with id: ${userId}`);
      return await associationRepository.getOrganizationsByUserId(userId);
    } catch (error) {
      logger.error(
        `Error getting organizations for user with id ${userId}:`,
        error,
      );
      throw new CustomError("Failed to get organizations", 500);
    }
  }

  async getOrganizationsByProjectId(projectId: string) {
    try {
      logger.info(`Get users for project with id: ${projectId}`);
      return await associationRepository.getOrganizationsByProjectId(projectId);
    } catch (error) {
      logger.error(
        `Error getting users for project with id ${projectId}:`,
        error,
      );
      throw new CustomError("Failed to get users for project", 500);
    }
  }
}

export default new OrganizationUserAssociationService();

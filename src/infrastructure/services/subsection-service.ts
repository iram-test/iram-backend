import { SubsectionPostgresRepository } from "../db/repositories/subsection-postgres-repository";
import {
  CreateSubsectionDTO,
  UpdateSubsectionDTO,
} from "../../application/dtos/subsection-dto";
import logger from "../../tools/logger";
import { CustomError } from "../../tools/custom-error";

const subsectionRepository = new SubsectionPostgresRepository();

class SubsectionService {
  async addSubsection(subsectionDto: CreateSubsectionDTO) {
    try {
      const newSubsection =
        await subsectionRepository.addSubsection(subsectionDto);
      logger.info(`Subsection created: ${newSubsection.name}`);
      return newSubsection;
    } catch (error) {
      logger.error(`Error creating subsection:`, error);
      throw new CustomError("Failed to create subsection", 500);
    }
  }

  async getAll() {
    try {
      logger.info(`Get all subsections`);
      return await subsectionRepository.getAll();
    } catch (error) {
      logger.error(`Error getting all subsections:`, error);
      throw new CustomError("Failed to get subsections", 500);
    }
  }

  async getById(subsectionId: string) {
    try {
      const subsection = await subsectionRepository.getById(subsectionId);
      if (!subsection) {
        logger.warn(`Subsection with id: ${subsectionId} not found`);
        throw new CustomError("Subsection not found", 404);
      }
      logger.info(`Subsection with id: ${subsectionId} found`);
      return subsection;
    } catch (error) {
      logger.error(`Error getting subsection by id ${subsectionId}:`, error);
      throw new CustomError("Failed to get subsection", 500);
    }
  }

  async getByName(subsectionName: string) {
    try {
      const subsection = await subsectionRepository.getByName(subsectionName);
      if (!subsection) {
        logger.warn(`Subsection with name: ${subsectionName} not found`);
        throw new CustomError("Subsection not found", 404);
      }
      logger.info(`Subsection with name: ${subsectionName} found`);
      return subsection;
    } catch (error) {
      logger.error(
        `Error getting subsection by name ${subsectionName}:`,
        error,
      );
      throw new CustomError("Failed to get subsection", 500);
    }
  }

  async update(subsectionId: string, subsectionDto: UpdateSubsectionDTO) {
    try {
      const subsection = await subsectionRepository.getById(subsectionId);
      if (!subsection) {
        logger.warn(
          `Subsection with ID ${subsectionId} was not found for update.`,
        );
        throw new CustomError("Subsection not found", 404);
      }

      const updatedSubsection = await subsectionRepository.update({
        ...subsectionDto,
        subsectionId,
      });
      logger.info(`Subsection with id: ${subsectionId} updated successfully`);
      return updatedSubsection;
    } catch (error) {
      logger.error(`Error updating subsection with id ${subsectionId}:`, error);
      throw new CustomError("Failed to update subsection", 500);
    }
  }

  async delete(subsectionId: string) {
    try {
      const subsection = await subsectionRepository.getById(subsectionId);
      if (!subsection) {
        logger.warn(
          `Subsection with ID ${subsectionId} was not found for delete.`,
        );
        throw new CustomError("Subsection not found", 404);
      }
      await subsectionRepository.delete(subsectionId);
      logger.info(`Subsection with id: ${subsectionId} deleted successfully`);
    } catch (error) {
      logger.error(`Error deleting subsection with id ${subsectionId}:`, error);
      throw new CustomError("Failed to delete subsection", 500);
    }
  }

  async getSubsectionsBySectionId(sectionId: string) {
    try {
      const subsections =
        await subsectionRepository.getSubsectionsBySectionId(sectionId);
      logger.info(`Get subsections by sectionId ${sectionId}`);
      return subsections;
    } catch (error) {
      logger.error(
        `Error getting subsections by sectionId ${sectionId}:`,
        error,
      );
      throw new CustomError("Failed to get subsections by sectionId", 500);
    }
  }
}

export default new SubsectionService();

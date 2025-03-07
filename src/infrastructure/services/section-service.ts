import { SectionPostgresRepository } from "../db/repositories/section-postgres-repository";
import {
  CreateSectionDTO,
  UpdateSectionDTO,
} from "../../application/dtos/section-dto";
import logger from "../../tools/logger";
import { CustomError } from "../../tools/custom-error";
import { ProjectPostgresRepository } from "../db/repositories/project-postgres-repository";

const sectionRepository = new SectionPostgresRepository();
const projectRepository = new ProjectPostgresRepository();

class SectionService {
  async addSection(projectId: string, sectionDto: CreateSectionDTO) {
    try {
      const project = await projectRepository.getById(projectId);
      if (!project) {
        logger.warn(`Project with id: ${projectId} was not found`);
        throw new CustomError("Project not found", 404);
      }
      const newSection = await sectionRepository.addSection({
        ...sectionDto,
        projectId: projectId,
      });
      logger.info(`Section created: ${newSection.name}`);
      return newSection;
    } catch (error) {
      logger.error(`Error creating section:`, error);
      throw new CustomError("Failed to create section", 500);
    }
  }

  async getAll() {
    try {
      logger.info(`Get all sections`);
      return await sectionRepository.getAll();
    } catch (error) {
      logger.error(`Error getting all sections:`, error);
      throw new CustomError("Failed to get sections", 500);
    }
  }

  async getById(sectionId: string) {
    try {
      const section = await sectionRepository.getById(sectionId);
      if (!section) {
        logger.warn(`Section with id: ${sectionId} not found`);
        throw new CustomError("Section not found", 404);
      }
      logger.info(`Section with id: ${sectionId} found`);
      return section;
    } catch (error) {
      logger.error(`Error getting section by id ${sectionId}:`, error);
      throw new CustomError("Failed to get section", 500);
    }
  }

  async getByName(sectionName: string) {
    try {
      const section = await sectionRepository.getByName(sectionName);
      if (!section) {
        logger.warn(`Section with name: ${sectionName} not found`);
        throw new CustomError("Section not found", 404);
      }
      logger.info(`Section with name: ${sectionName} found`);
      return section;
    } catch (error) {
      logger.error(`Error getting section by name ${sectionName}:`, error);
      throw new CustomError("Failed to get section", 500);
    }
  }

  async update(sectionId: string, sectionDto: UpdateSectionDTO) {
    try {
      const section = await sectionRepository.getById(sectionId);
      if (!section) {
        logger.warn(`Section with ID ${sectionId} was not found for update.`);
        throw new CustomError("Section not found", 404);
      }

      const updatedSection = await sectionRepository.update({
        ...sectionDto,
        sectionId,
      });
      logger.info(`Section with id: ${sectionId} updated successfully`);
      return updatedSection;
    } catch (error) {
      logger.error(`Error updating section with id ${sectionId}:`, error);
      throw new CustomError("Failed to update section", 500);
    }
  }

  async delete(sectionId: string) {
    try {
      const section = await sectionRepository.getById(sectionId);
      if (!section) {
        logger.warn(`Section with ID ${sectionId} was not found for delete.`);
        throw new CustomError("Section not found", 404);
      }
      await sectionRepository.delete(sectionId);
      logger.info(`Section with id: ${sectionId} deleted successfully`);
    } catch (error) {
      logger.error(`Error deleting section with id ${sectionId}:`, error);
      throw new CustomError("Failed to delete section", 500);
    }
  }

  async getSectionsByProjectId(projectId: string) {
    try {
      const sections =
        await sectionRepository.getSectionsByProjectId(projectId);
      logger.info(`Get all sections by project ID: ${projectId}`);
      return sections;
    } catch (error) {
      logger.error(`Error getting sections by project ID ${projectId}:`, error);
      throw new CustomError("Failed to get sections by project ID", 500);
    }
  }
}

export default new SectionService();

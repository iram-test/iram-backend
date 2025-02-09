import { MilestoneDomainService } from "../../domain/services/milestone-domain-service";
import { MilestonePostgresRepository } from "../db/repositories/milestone-postgres-repository";
import {
  CreateMilestoneDTO,
  UpdateMilestoneDTO,
} from "../../application/dtos/milestone-dto";
import logger from "../../tools/logger";
import { CustomError } from "../../tools/custom-error";

const milestoneRepository = new MilestonePostgresRepository();
const milestoneService = new MilestoneDomainService(milestoneRepository);

class MilestoneService {
  async addMilestone(milestoneDto: CreateMilestoneDTO) {
    try {
      const newMilestone = await milestoneService.addMilestone(milestoneDto);
      logger.info(`Milestone created: ${newMilestone.name}`);
      return newMilestone;
    } catch (error) {
      logger.error(`Error creating milestone:`, error);
      throw new CustomError("Failed to create milestone", 500);
    }
  }

  async getAllMilestones() {
    try {
      logger.info(`Get all milestones`);
      return await milestoneService.getAll();
    } catch (error) {
      logger.error(`Error getting all milestones:`, error);
      throw new CustomError("Failed to get milestones", 500);
    }
  }

  async getMilestoneById(milestoneID: string) {
    try {
      const milestone = await milestoneService.getById(milestoneID);
      if (!milestone) {
        logger.warn(`Milestone with id: ${milestoneID} not found`);
        throw new CustomError("Milestone not found", 404);
      }
      logger.info(`Milestone with id: ${milestoneID} found`);
      return milestone;
    } catch (error) {
      logger.error(`Error getting milestone by id ${milestoneID}:`, error);
      throw new CustomError("Failed to get milestone", 500);
    }
  }

  async updateMilestone(milestoneID: string, milestoneDto: UpdateMilestoneDTO) {
    try {
      const milestone = await milestoneService.getById(milestoneID);
      if (!milestone) {
        logger.warn(`Milestone with id: ${milestoneID} not found for update`);
        throw new CustomError("Milestone not found", 404);
      }

      const updatedMilestone = await milestoneService.update({
        ...milestoneDto,
        milestoneID,
      });
      logger.info(`Milestone with id: ${milestoneID} updated`);
      return updatedMilestone;
    } catch (error) {
      logger.error(`Error updating milestone with id ${milestoneID}:`, error);
      throw new CustomError("Failed to update milestone", 500);
    }
  }
  async deleteMilestone(milestoneID: string) {
    try {
      const milestone = await milestoneService.getById(milestoneID);
      if (!milestone) {
        logger.warn(`Milestone with id: ${milestoneID} not found for delete`);
        throw new CustomError("Milestone not found", 404);
      }
      await milestoneService.delete(milestoneID);
      logger.info(`Milestone with id: ${milestoneID} deleted`);
    } catch (error) {
      logger.error(`Error deleting milestone with id ${milestoneID}:`, error);
      throw new CustomError("Failed to delete milestone", 500);
    }
  }
}

export default new MilestoneService();

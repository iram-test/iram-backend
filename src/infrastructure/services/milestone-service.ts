import { MilestoneDomainService } from "../../domain/services/milestone-domain-service";
import { MilestonePostgresRepository } from "../db/repositories/milestone-postgres-repository";
import {
  CreateMilestoneDTO,
  UpdateMilestoneDTO,
} from "../../application/dtos/milestone-dto";
import logger from "../../tools/logger";
import { CustomError } from "../../tools/custom-error";
import { ProjectPostgresRepository } from "../db/repositories/project-postgres-repository";

const milestoneRepository = new MilestonePostgresRepository();
const projectRepository = new ProjectPostgresRepository();
const milestoneService = new MilestoneDomainService(milestoneRepository);

class MilestoneService {
  async addMilestone(projectId: string, milestoneDto: CreateMilestoneDTO) {
    try {
      const project = await projectRepository.getById(projectId);
      if (!project) {
        logger.warn(`Project with id: ${projectId} was not found`);
        throw new CustomError("Project not found", 404);
      }

      const newMilestone = await milestoneService.addMilestone({
        ...milestoneDto,
        projectId: projectId,
      });
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

  async getMilestoneById(milestoneId: string) {
    try {
      const milestone = await milestoneService.getById(milestoneId);
      if (!milestone) {
        logger.warn(`Milestone with id: ${milestoneId} not found`);
        throw new CustomError("Milestone not found", 404);
      }
      logger.info(`Milestone with id: ${milestoneId} found`);
      return milestone;
    } catch (error) {
      logger.error(`Error getting milestone by id ${milestoneId}:`, error);
      throw new CustomError("Failed to get milestone", 500);
    }
  }

  async updateMilestone(milestoneId: string, milestoneDto: UpdateMilestoneDTO) {
    try {
      const milestone = await milestoneService.getById(milestoneId);
      if (!milestone) {
        logger.warn(`Milestone with id: ${milestoneId} not found for update`);
        throw new CustomError("Milestone not found", 404);
      }

      const updatedMilestone = await milestoneService.update({
        ...milestoneDto,
        milestoneId,
      });
      logger.info(`Milestone with id: ${milestoneId} updated`);
      return updatedMilestone;
    } catch (error) {
      logger.error(`Error updating milestone with id ${milestoneId}:`, error);
      throw new CustomError("Failed to update milestone", 500);
    }
  }
  async deleteMilestone(milestoneId: string) {
    try {
      const milestone = await milestoneService.getById(milestoneId);
      if (!milestone) {
        logger.warn(`Milestone with id: ${milestoneId} not found for delete`);
        throw new CustomError("Milestone not found", 404);
      }
      await milestoneService.delete(milestoneId);
      logger.info(`Milestone with id: ${milestoneId} deleted`);
    } catch (error) {
      logger.error(`Error deleting milestone with id ${milestoneId}:`, error);
      throw new CustomError("Failed to delete milestone", 500);
    }
  }

  async getByProjectId(projectId: string) {
    try {
      logger.info(`Get milestones by project id`);
      return await milestoneService.getByProjectId(projectId);
    } catch (error) {
      logger.error(`Error getting milestones by project id:`, error);
      throw new CustomError("Failed to get milestones", 500);
    }
  }
}

export default new MilestoneService();

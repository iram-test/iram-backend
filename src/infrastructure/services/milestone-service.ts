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
    const newMilestone = await milestoneService.addMilestone(milestoneDto);
    logger.info(`Milestone created: ${newMilestone.name}`);
    return newMilestone;
  }

  async getAllMilestones() {
    logger.info(`Get all milestones`);
    return await milestoneService.getAll();
  }

  async getMilestoneById(milestoneID: string) {
    const milestone = await milestoneService.getById(milestoneID);
    if (!milestone) {
      logger.warn(`Milestone with id: ${milestoneID} not found`);
      throw new CustomError("Milestone not found", 404);
    }
    logger.info(`Milestone with id: ${milestoneID} found`);
    return milestone;
  }

  async updateMilestone(milestoneID: string, milestoneDto: UpdateMilestoneDTO) {
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
  }
  async deleteMilestone(milestoneID: string) {
    const milestone = await milestoneService.getById(milestoneID);
    if (!milestone) {
      logger.warn(`Milestone with id: ${milestoneID} not found for delete`);
      throw new CustomError("Milestone not found", 404);
    }
    await milestoneService.delete(milestoneID);
    logger.info(`Milestone with id: ${milestoneID} deleted`);
  }
}

export default new MilestoneService();

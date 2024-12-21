import { StepDomainService } from "../../domain/services/step-domain-service";
import { StepPostgresRepository } from "../db/repositories/step-postgres-repository";
import { CreateStepDTO, UpdateStepDTO } from "../../application/dtos/step-dto";
import logger from "../../tools/logger";
import { CustomError } from "../../tools/custom-error";

const stepRepository = new StepPostgresRepository();
const stepService = new StepDomainService(stepRepository);
class StepService {
  async addStep(stepDto: CreateStepDTO) {
    const newStep = await stepService.addStep(stepDto);
    logger.info(`Step created: ${newStep.stepId}`);
    return newStep;
  }

  async getAllSteps() {
    logger.info(`Get all steps`);
    return await stepService.getAll();
  }

  async getStepById(stepId: string) {
    const step = await stepService.getById(stepId);
    if (!step) {
      logger.warn(`Step with id: ${stepId} was not found.`);
      throw new CustomError("Step not found", 404);
    }
    logger.info(`Step with id: ${stepId} was found.`);
    return step;
  }

  async updateStep(stepId: string, stepDto: UpdateStepDTO) {
    const step = await stepService.getById(stepId);
    if (!step) {
      logger.warn(`Step with id: ${stepId} was not found for update.`);
      throw new CustomError("Step not found", 404);
    }
    const updatedStep = await stepService.update({ ...stepDto, stepId });
    logger.info(`Step with id ${stepId} updated`);
    return updatedStep;
  }

  async deleteStep(stepId: string) {
    const step = await stepService.getById(stepId);
    if (!step) {
      logger.warn(`Step with id: ${stepId} was not found for delete.`);
      throw new CustomError("Step not found", 404);
    }
    await stepService.delete(stepId);
    logger.info(`Step with id ${stepId} deleted`);
  }
}

export default new StepService();

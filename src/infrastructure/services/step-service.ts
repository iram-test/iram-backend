import { StepPostgresRepository } from "../db/repositories/step-postgres-repository";
import { CreateStepDTO, UpdateStepDTO } from "../../application/dtos/step-dto";
import logger from "../../tools/logger";
import { CustomError } from "../../tools/custom-error";

const stepRepository = new StepPostgresRepository();

class StepService {
  async addStep(stepDto: CreateStepDTO) {
    try {
      const newStep = await stepRepository.addStep(stepDto);
      logger.info(`Step created: ${newStep.stepId}`);
      return newStep;
    } catch (error) {
      logger.error(`Error creating step:`, error);
      throw new CustomError("Failed to create step", 500);
    }
  }

  async getAll() {
    try {
      logger.info(`Get all steps`);
      return await stepRepository.getAll();
    } catch (error) {
      logger.error(`Error getting all steps:`, error);
      throw new CustomError("Failed to get steps", 500);
    }
  }

  async getById(stepId: string) {
    try {
      const step = await stepRepository.getById(stepId);
      if (!step) {
        logger.warn(`Step with id: ${stepId} was not found.`);
        throw new CustomError("Step not found", 404);
      }
      logger.info(`Step with id: ${stepId} was found.`);
      return step;
    } catch (error) {
      logger.error(`Error getting step by id ${stepId}:`, error);
      throw new CustomError("Failed to get step", 500);
    }
  }

  async update(stepId: string, stepDto: UpdateStepDTO) {
    try {
      const step = await stepRepository.getById(stepId);
      if (!step) {
        logger.warn(`Step with id: ${stepId} was not found for update.`);
        throw new CustomError("Step not found", 404);
      }
      const updatedStep = await stepRepository.update({ ...stepDto, stepId });
      logger.info(`Step with id ${stepId} updated`);
      return updatedStep;
    } catch (error) {
      logger.error(`Error updating step with id ${stepId}:`, error);
      throw new CustomError("Failed to update step", 500);
    }
  }

  async delete(stepId: string) {
    try {
      const step = await stepRepository.getById(stepId);
      if (!step) {
        logger.warn(`Step with id: ${stepId} was not found for delete.`);
        throw new CustomError("Step not found", 404);
      }
      await stepRepository.delete(stepId);
      logger.info(`Step with id ${stepId} deleted`);
    } catch (error) {
      logger.error(`Error deleting step with id ${stepId}:`, error);
      throw new CustomError("Failed to delete step", 500);
    }
  }

  async getStepsByTestCaseId(testCaseId: string) {
    try {
      const steps = await stepRepository.getStepsByTestCaseId(testCaseId);
      logger.info(`Get steps by testCaseId ${testCaseId}`);
      return steps;
    } catch (error) {
      logger.error(`Error getting steps by testCaseId ${testCaseId}:`, error);
      throw new CustomError("Failed to get steps by testCaseId", 500);
    }
  }
}

export default new StepService();

import { StepPostgresRepository } from "../db/repositories/step-postgres-repository";
import { CreateStepDTO, UpdateStepDTO } from "../../application/dtos/step-dto";
import logger from "../../tools/logger";
import { CustomError } from "../../tools/custom-error";
import { TestCasePostgresRepository } from "../db/repositories/test-case-postgres-repository";
import {config} from "../../configs";
import * as Minio from "minio";

const stepRepository = new StepPostgresRepository();

const minioClient = new Minio.Client({
  endPoint: config.minio.endPoint,
  port: config.minio.port,
  useSSL: config.minio.useSSL,
  accessKey: config.minio.accessKey,
  secretKey: config.minio.secretKey
});

class StepService {
  async addStep(testCaseId: string, stepDto: CreateStepDTO) {
    try {
      const testCase = await new TestCasePostgresRepository().getById(
          testCaseId,
      );
      if (!testCase) {
        logger.warn(`Test case with id: ${testCaseId} was not found`);
        throw new CustomError("Test case not found", 404);
      }
      const newStep = await stepRepository.addStep({ ...stepDto, testCaseId });
      logger.info(`Step created: ${newStep.stepId}`);
      return newStep;
    } catch (error) {
      logger.error(`Error creating step:`, error);
      throw new CustomError("Failed to create step", 500);
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

  async uploadImage(stepId: string, imageUrl: string) {
    try {
      const step = await stepRepository.getById(stepId);
      if (!step) {
        logger.warn(`Step with id: ${stepId} was not found for image upload.`);
        throw new CustomError("Step not found", 404);
      }
      const currentImages = step.image || [];
      const updatedImages = [...currentImages, imageUrl];
      const updatedStep = await stepRepository.update({
        stepId,
        image: updatedImages,
      });
      logger.info(`Image uploaded for step with id ${stepId}`);
      return updatedStep;
    } catch (error) {
      logger.error(`Error uploading image for step with id ${stepId}:`, error);
      throw new CustomError("Failed to upload image", 500);
    }
  }

  async uploadExpectedImage(stepId: string, imageUrl: string) {
    try {
      const step = await stepRepository.getById(stepId);
      if (!step) {
        logger.warn(
            `Step with id: ${stepId} was not found for expected image upload.`,
        );
        throw new CustomError("Step not found", 404);
      }
      const currentExpectedImages = step.expectedImage || [];
      const updatedExpectedImages = [...currentExpectedImages, imageUrl];
      const updatedStep = await stepRepository.update({
        stepId,
        expectedImage: updatedExpectedImages,
      });
      logger.info(`Expected image uploaded for step with id ${stepId}`);
      return updatedStep;
    } catch (error) {
      logger.error(
          `Error uploading expected image for step with id ${stepId}:`,
          error,
      );
      throw new CustomError("Failed to upload expected image", 500);
    }
  }

  async deleteImage(stepId: string, imageUrl: string) {
    try {
      const step = await stepRepository.getById(stepId);
      if (!step) {
        logger.warn(`Step with id: ${stepId} was not found for image deletion.`);
        throw new CustomError("Step not found", 404);
      }

      const currentImages = step.image || [];
      const filename = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);

      if (!currentImages.includes(imageUrl)) {
        logger.warn(`Image with URL: ${imageUrl} not found in step with id: ${stepId}.`);
        throw new CustomError("Image not found", 404);
      }

      const updatedImages = currentImages.filter(img => img !== imageUrl);
      await stepRepository.update({ stepId, image: updatedImages });

      await this.deleteFileFromMinIO(filename);

      logger.info(`Image deleted for step with id ${stepId}`);
    } catch (error: any) {
      logger.error(`Error deleting image for step with id ${stepId}:`, error);
      throw new CustomError("Failed to delete image", 500);
    }
  }

  async deleteExpectedImage(stepId: string, imageUrl: string) {
    try {
      const step = await stepRepository.getById(stepId);
      if (!step) {
        logger.warn(`Step with id: ${stepId} was not found for expected image deletion.`);
        throw new CustomError("Step not found", 404);
      }

      const currentExpectedImages = step.expectedImage || [];
      const filename = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);

      if (!currentExpectedImages.includes(imageUrl)) {
        logger.warn(`Expected image with URL: ${imageUrl} not found in step with id: ${stepId}.`);
        throw new CustomError("Expected image not found", 404);
      }

      const updatedExpectedImages = currentExpectedImages.filter(img => img !== imageUrl);
      await stepRepository.update({ stepId, expectedImage: updatedExpectedImages });

      await this.deleteFileFromMinIO(filename);

      logger.info(`Expected image deleted for step with id ${stepId}`);
    } catch (error: any) {
      logger.error(`Error deleting expected image for step with id ${stepId}:`, error);
      throw new CustomError("Failed to delete expected image", 500);
    }
  }

  private async deleteFileFromMinIO(filename: string): Promise<void> {
    try {
      await minioClient.removeObject(config.minio.bucketName, filename);
      logger.info(`File deleted successfully from MinIO: ${filename}`);
    } catch (error: any) {
      logger.error(`Error deleting file from MinIO: ${error.message}`);
      throw new Error(`Failed to delete from MinIO: ${error.message}`);
    }
  }
}

export default new StepService();
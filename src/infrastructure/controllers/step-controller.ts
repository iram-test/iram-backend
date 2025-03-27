import { FastifyReply, FastifyRequest } from "fastify";
import StepService from "../services/step-service";
import logger from "../../tools/logger";
import { CustomError } from "../../tools/custom-error";
import path from "node:path";

import {
  CreateStepDTOSchema,
  UpdateStepDTOSchema,
} from "../../application/validation/dto-validation/step-dto-schema";
import { z } from "zod";
import * as Minio from 'minio';
import {config} from "../../configs";
import {PassThrough} from "stream";

const minioClient = new Minio.Client({
  endPoint: config.minio.endPoint,
  port: config.minio.port,
  useSSL: config.minio.useSSL,
  accessKey: config.minio.accessKey,
  secretKey: config.minio.secretKey
});

async function checkAndCreateBucket() {
  try {
    logger.info(`Checking if bucket ${config.minio.bucketName} exists...`);
    const bucketExists = await minioClient.bucketExists(config.minio.bucketName);
    logger.info(`Bucket ${config.minio.bucketName} exists: ${bucketExists}`);
    if (!bucketExists) {
      logger.info(`Creating bucket ${config.minio.bucketName}...`);
      await minioClient.makeBucket(config.minio.bucketName, 'us-east-1');
      logger.info(`Bucket ${config.minio.bucketName} created successfully`);
    }
  } catch (err: any) {
    logger.error(`Error checking/creating bucket: ${err.message}`);
    logger.error(`Error details: ${err.stack}`); // Add this line
    throw new Error(`Failed to initialize MinIO: ${err.message}`);
  }
}
checkAndCreateBucket().catch(error => {
  logger.error("MinIO bucket initialization failed:", error);
  process.exit(1);
});

const generateUniqueFilename = (stepId: string, filename: string): string => {
  const fileExtension = path.extname(filename);
  return `${stepId}-${Date.now()}${fileExtension}`;
};

const uploadToMinIO = async (fileStream: NodeJS.ReadableStream, filename: string, fileSize: number): Promise<string> => {
  try {
    const passThrough = new PassThrough();
    fileStream.pipe(passThrough);

    await minioClient.putObject(config.minio.bucketName, filename, passThrough, fileSize);
    const publicUrl = `${config.minio.publicUrl}/${config.minio.bucketName}/${filename}`;
    logger.info(`File uploaded successfully to MinIO: ${filename}`);
    return publicUrl;
  } catch (error: any) {
    logger.error(`Error uploading file to MinIO: ${error.message}`);
    throw new Error(`Failed to upload to MinIO: ${error.message}`);
  }
};

export const addStep = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { testCaseId } = request.params as { testCaseId: string };
    const stepDto = CreateStepDTOSchema.parse(request.body);
    const newStep = await StepService.addStep(testCaseId, stepDto);
    reply.status(201).send(newStep);
  } catch (error) {
    if (error instanceof z.ZodError) {
      reply
          .code(400)
          .send({ message: "Validation error", errors: error.errors });
    } else {
      logger.error(`Error creating step: ${error}`);
      reply.status(500).send({ message: "Error creating step" });
    }
  }
};

export const getStepById = async (
    request: FastifyRequest,
    reply: FastifyReply,
) => {
  try {
    const { stepId } = request.params as { stepId: string };
    const step = await StepService.getById(stepId);
    reply.status(200).send(step);
  } catch (error) {
    logger.error(`Error during getting step by ID: ${error}`);
    if (error instanceof CustomError) {
      reply.status(error.statusCode).send({ message: error.message });
    } else {
      reply.status(500).send({ message: "Error getting step" });
    }
  }
};

export const updateStep = async (
    request: FastifyRequest,
    reply: FastifyReply,
) => {
  try {
    const { stepId } = request.params as { stepId: string };
    const stepDto = UpdateStepDTOSchema.parse(request.body);

    if (stepId !== stepDto.stepId) {
      return reply
          .status(400)
          .send({ message: "Step ID in path and body do not match" });
    }

    const updatedStep = await StepService.update(stepId, stepDto);
    reply.status(200).send(updatedStep);
  } catch (error) {
    if (error instanceof z.ZodError) {
      reply
          .code(400)
          .send({ message: "Validation error", errors: error.errors });
    } else {
      logger.error(
          `Error during update step with id ${request.params}: ${error}`,
      );
      reply.status(500).send({ message: "Error updating step" });
    }
  }
};

export const deleteStep = async (
    request: FastifyRequest,
    reply: FastifyReply,
) => {
  try {
    const { stepId } = request.params as { stepId: string };
    await StepService.delete(stepId);
    reply.status(204).send();
  } catch (error) {
    logger.error(`Error deleting step with id: ${request.params}: ${error}`);
    if (error instanceof CustomError) {
      reply.status(error.statusCode).send({ message: error.message });
    } else {
      reply.status(500).send({ message: "Error deleting step" });
    }
  }
};

export const getStepsByTestCaseId = async (
    request: FastifyRequest,
    reply: FastifyReply,
) => {
  try {
    const { testCaseId } = request.params as { testCaseId: string };
    const steps = await StepService.getStepsByTestCaseId(testCaseId);
    reply.status(200).send(steps);
  } catch (error) {
    logger.error(`Error getting steps by testCaseId: ${error}`);
    if (error instanceof CustomError) {
      reply.status(error.statusCode).send({ message: error.message });
    } else {
      reply.status(500).send({ message: "Error getting steps by testCaseId" });
    }
  }
};

export const uploadImage = async (
    request: FastifyRequest,
    reply: FastifyReply,
) => {
  try {
    const { stepId } = request.params as { stepId: string };
    const data = await request.file({ limits: { fileSize: 10000000 } });

    if (!data) {
      return reply.status(400).send({ message: "No file uploaded" });
    }

    const filename = generateUniqueFilename(stepId, data.filename);

    const imageUrl = await uploadToMinIO(data.file, filename, data.file.readableLength || data.file.bytesRead);

    const updatedStep = await StepService.uploadImage(stepId, imageUrl);
    reply.status(200).send(updatedStep);

  } catch (error: any) {
    logger.error(`Error uploading image: ${error.message}`);
    reply.status(500).send({ message: `Error uploading image: ${error.message}` });
  }
};

export const uploadExpectedImage = async (
    request: FastifyRequest,
    reply: FastifyReply,
) => {
  try {
    const { stepId } = request.params as { stepId: string };
    const data = await request.file({ limits: { fileSize: 10000000 } });

    if (!data) {
      return reply.status(400).send({ message: "No file uploaded" });
    }

    const filename = generateUniqueFilename(stepId, data.filename);
    const imageUrl = await uploadToMinIO(data.file, filename, data.file.readableLength || data.file.bytesRead);

    const updatedStep = await StepService.uploadExpectedImage(stepId, imageUrl);
    reply.status(200).send(updatedStep);

  } catch (error: any) {
    logger.error(`Error uploading expected image: ${error.message}`);
    reply.status(500).send({ message: `Error uploading expected image: ${error.message}` });
  }
};

export const deleteImage = async (
    request: FastifyRequest,
    reply: FastifyReply,
) => {
  try {
    const { stepId } = request.params as { stepId: string };
    const { imageUrl } = request.body as { imageUrl: string };

    await StepService.deleteImage(stepId, imageUrl);
    reply.status(204).send();
  } catch (error: any) {
    logger.error(`Error deleting image: ${error.message}`);
    reply.status(500).send({ message: `Error deleting image: ${error.message}` });
  }
};

export const deleteExpectedImage = async (
    request: FastifyRequest,
    reply: FastifyReply,
) => {
  try {
    const { stepId } = request.params as { stepId: string };
    const { imageUrl } = request.body as { imageUrl: string };

    await StepService.deleteExpectedImage(stepId, imageUrl);
    reply.status(204).send();
  } catch (error: any) {
    logger.error(`Error deleting expected image: ${error.message}`);
    reply.status(500).send({ message: `Error deleting expected image: ${error.message}` });
  }
};
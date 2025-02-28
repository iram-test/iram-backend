import { FastifyReply, FastifyRequest } from "fastify";
import StepService from "../services/step-service";
import { CreateStepDTO, UpdateStepDTO } from "../../application/dtos/step-dto";
import logger from "../../tools/logger";
import { CustomError } from "../../tools/custom-error";
import { pipeline } from 'stream';
import path from "node:path";
import * as fs from "node:fs";

const UPLOAD_DIR = path.join(process.cwd(), 'uploads');

export const addStep = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { testCaseId } = request.params as { testCaseId: string };
    const stepDto = request.body as CreateStepDTO;
    const newStep = await StepService.addStep(testCaseId, stepDto);
    reply.status(201).send(newStep);
  } catch (error) {
    logger.error(`Error creating step: ${error}`);
    if (error instanceof CustomError) {
      reply.status(error.statusCode).send({ message: error.message });
    } else {
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
    const stepDto = request.body as UpdateStepDTO;
    const updatedStep = await StepService.update(stepId, stepDto);
    reply.status(200).send(updatedStep);
  } catch (error) {
    logger.error(
        `Error during update step with id ${request.params}: ${error}`,
    );
    if (error instanceof CustomError) {
      reply.status(error.statusCode).send({ message: error.message });
    } else {
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

export const uploadImage = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { stepId } = request.params as { stepId: string };
    const data = await request.file({ limits: { fileSize: 10000000 } }); // Додайте обмеження тут також

    if (!data) {
      reply.status(400).send({ message: 'No file uploaded' });
      return;
    }

    const filename = data.filename;
    const fileExtension = path.extname(filename);
    const newFilename = `${stepId}-${Date.now()}${fileExtension}`;
    const uploadPath = path.join(UPLOAD_DIR, newFilename);
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });

    await new Promise((resolve, reject) => {
      pipeline(
          data.file,
          fs.createWriteStream(uploadPath),
          (err) => {
            if (err) {
              logger.error(`Pipeline failed: ${err}`);
              reject(err);
            } else {
              logger.info('Pipeline succeeded');
              resolve(true);
            }
          }
      );
    });

    const baseUrl = process.env.BASE_URL || 'http://localhost:3002';
    const imageUrl = `${baseUrl}/uploads/${newFilename}`;


    const updatedStep = await StepService.uploadImage(stepId, imageUrl);

    reply.status(200).send(updatedStep);
  } catch (error) {
    logger.error(`Error uploading image: ${error}`);
    if (error instanceof CustomError) {
      reply.status(error.statusCode).send({ message: error.message });
    } else {
      reply.status(500).send({ message: "Error uploading image" });
    }
  }
};
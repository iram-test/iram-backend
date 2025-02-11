import { FastifyReply, FastifyRequest } from "fastify";
import MilestoneService from "../services/milestone-service";
import {
  CreateMilestoneDTO,
  UpdateMilestoneDTO,
} from "../../application/dtos/milestone-dto";
import logger from "../../tools/logger";
import { CustomError } from "../../tools/custom-error";

export const addMilestone = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { projectId } = request.params as { projectId: string };
    const milestoneDto = request.body as CreateMilestoneDTO;
    const newMilestone = await MilestoneService.addMilestone(
      projectId,
      milestoneDto,
    );
    reply.status(201).send(newMilestone);
  } catch (error) {
    logger.error(`Error creating milestone: ${error}`);
    if (error instanceof CustomError) {
      reply.status(error.statusCode).send({ message: error.message });
    } else {
      reply.status(500).send({ message: "Error creating milestone" });
    }
  }
};

export const getAllMilestones = async (
  _: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const milestones = await MilestoneService.getAllMilestones();
    reply.status(200).send(milestones);
  } catch (error) {
    logger.error(`Error getting all milestones: ${error}`);
    if (error instanceof CustomError) {
      reply.status(error.statusCode).send({ message: error.message });
    } else {
      reply.status(500).send({ message: "Error getting milestones" });
    }
  }
};

export const getMilestoneById = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { milestoneID } = request.params as { milestoneID: string };
    const milestone = await MilestoneService.getMilestoneById(milestoneID);
    reply.status(200).send(milestone);
  } catch (error) {
    logger.error(`Error during getting milestone by id: ${error}`);
    if (error instanceof CustomError) {
      reply.status(error.statusCode).send({ message: error.message });
    } else {
      reply.status(500).send({ message: "Error getting milestone" });
    }
  }
};

export const updateMilestone = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { milestoneID } = request.params as { milestoneID: string };
    const milestoneDto = request.body as UpdateMilestoneDTO;
    const updatedMilestone = await MilestoneService.updateMilestone(
      milestoneID,
      milestoneDto,
    );
    reply.status(200).send(updatedMilestone);
  } catch (error) {
    logger.error(`Error during update milestone: ${error}`);
    if (error instanceof CustomError) {
      reply.status(error.statusCode).send({ message: error.message });
    } else {
      reply.status(500).send({ message: "Error updating milestone" });
    }
  }
};

export const deleteMilestone = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { milestoneID } = request.params as { milestoneID: string };
    await MilestoneService.deleteMilestone(milestoneID);
    reply.status(204).send();
  } catch (error) {
    logger.error(`Error during delete milestone: ${error}`);
    if (error instanceof CustomError) {
      reply.status(error.statusCode).send({ message: error.message });
    } else {
      reply.status(500).send({ message: "Error deleting milestone" });
    }
  }
};

export const getMilestonesByProjectId = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { projectId } = request.params as { projectId: string };
    const milestones = await MilestoneService.getByProjectId(projectId);
    reply.status(200).send(milestones);
  } catch (error) {
    logger.error(`Error getting milestones by project ID: ${error}`);
    if (error instanceof CustomError) {
      reply.status(error.statusCode).send({ message: error.message });
    } else {
      reply.status(500).send({ message: "Error getting milestones" });
    }
  }
};

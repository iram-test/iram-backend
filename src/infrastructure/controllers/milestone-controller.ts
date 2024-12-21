import { FastifyReply, FastifyRequest } from "fastify";
import MilestoneService from "../services/milestone-service";
import {
  CreateMilestoneDTO,
  UpdateMilestoneDTO,
} from "../../application/dtos/milestone-dto";
import logger from "../../tools/logger";

export const addMilestone = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const milestoneDto = request.body as CreateMilestoneDTO;
    const newMilestone = await MilestoneService.addMilestone(milestoneDto);
    reply.code(201).send(newMilestone);
  } catch (error) {
    logger.error(`Error creating milestone: ${error}`);
    reply.code(500).send({ message: "Error creating milestone" });
  }
};

export const getAllMilestones = async (
  _: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const milestones = await MilestoneService.getAllMilestones();
    reply.code(200).send(milestones);
  } catch (error) {
    logger.error(`Error getting all milestones: ${error}`);
    reply.code(500).send({ message: "Error getting milestones" });
  }
};
export const getMilestoneById = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { milestoneID } = request.params as { milestoneID: string };
    const milestone = await MilestoneService.getMilestoneById(milestoneID);
    reply.code(200).send(milestone);
  } catch (error) {
    logger.error(`Error during getting milestone by id: ${error}`);
    if (error instanceof Error && error.message === "Milestone not found") {
      reply.code(404).send({ message: "Milestone not found" });
    } else {
      reply.code(500).send({ message: "Error getting milestone" });
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
    reply.code(200).send(updatedMilestone);
  } catch (error) {
    logger.error(`Error during update milestone: ${error}`);
    if (error instanceof Error && error.message === "Milestone not found") {
      reply.code(404).send({ message: "Milestone not found" });
    } else {
      reply.code(500).send({ message: "Error updating milestone" });
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
    reply.code(204).send();
  } catch (error) {
    logger.error(`Error during delete milestone: ${error}`);
    if (error instanceof Error && error.message === "Milestone not found") {
      reply.code(404).send({ message: "Milestone not found" });
    } else {
      reply.code(500).send({ message: "Error deleting milestone" });
    }
  }
};

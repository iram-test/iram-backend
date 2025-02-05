import { FastifyReply, FastifyRequest } from "fastify";
import FolderService from "../services/folder-service";
import {
  CreateFolderDTO,
  UpdateFolderDTO,
} from "../../application/dtos/section-dto";
import logger from "../../tools/logger";

export const addFolder = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const folderDto = request.body as CreateFolderDTO;
    const newFolder = await FolderService.addFolder(folderDto);
    reply.code(201).send(newFolder);
  } catch (error) {
    logger.error(`Error creating folder: ${error}`);
    reply.code(500).send({ message: "Error creating folder" });
  }
};

export const getAllFolders = async (_: FastifyRequest, reply: FastifyReply) => {
  try {
    const folders = await FolderService.getAllFolders();
    reply.code(200).send(folders);
  } catch (error) {
    logger.error(`Error getting all folders: ${error}`);
    reply.code(500).send({ message: "Error getting folders" });
  }
};

export const getFolderById = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { folderId } = request.params as { folderId: string };
    const folder = await FolderService.getFolderById(folderId);
    reply.code(200).send(folder);
  } catch (error) {
    logger.error(`Error getting folder by id: ${error}`);
    if (error instanceof Error && error.message === "Folder not found") {
      reply.code(404).send({ message: "Folder not found" });
    } else {
      reply.code(500).send({ message: "Error getting folder" });
    }
  }
};
export const updateFolder = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { folderId } = request.params as { folderId: string };
    const folderDto = request.body as UpdateFolderDTO;
    const updatedFolder = await FolderService.updateFolder(folderId, folderDto);
    reply.code(200).send(updatedFolder);
  } catch (error) {
    logger.error(
      `Error during updating folder with id: ${request.params}: ${error}`,
    );
    if (error instanceof Error && error.message === "Folder not found") {
      reply.code(404).send({ message: "Folder not found" });
    } else {
      reply.code(500).send({ message: "Error updating folder" });
    }
  }
};

export const deleteFolder = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { folderId } = request.params as { folderId: string };
    await FolderService.deleteFolder(folderId);
    reply.code(204).send();
  } catch (error) {
    logger.error(`Error deleting folder with id ${request.params}: ${error}`);
    if (error instanceof Error && error.message === "Folder not found") {
      reply.code(404).send({ message: "Folder not found" });
    } else {
      reply.code(500).send({ message: "Error deleting folder" });
    }
  }
};

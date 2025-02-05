import { FolderDomainService } from "../../domain/services/folder-domain-service";
import { FolderPostgresRepository } from "../db/repositories/folder-postgres-repository";
import {
  CreateFolderDTO,
  UpdateFolderDTO,
} from "../../application/dtos/section-dto";
import logger from "../../tools/logger";
import { CustomError } from "../../tools/custom-error";

const folderRepository = new FolderPostgresRepository();
const folderService = new FolderDomainService(folderRepository);

class FolderService {
  async addFolder(folderDto: CreateFolderDTO) {
    const newFolder = await folderService.addFolder(folderDto);
    logger.info(`Folder created: ${newFolder.name}`);
    return newFolder;
  }

  async getAllFolders() {
    logger.info(`Get all folders`);
    return await folderService.getAll();
  }

  async getFolderById(folderId: string) {
    const folder = await folderService.getById(folderId);
    if (!folder) {
      logger.warn(`Folder with id: ${folderId} not found`);
      throw new CustomError("Folder not found", 404);
    }
    logger.info(`Folder with id: ${folderId} found`);
    return folder;
  }

  async updateFolder(folderId: string, folderDto: UpdateFolderDTO) {
    const folder = await folderService.getById(folderId);
    if (!folder) {
      logger.warn(`Folder with ID ${folderId} was not found for update.`);
      throw new CustomError("Folder not found", 404);
    }

    const updatedFolder = await folderService.update({
      ...folderDto,
      folderId,
    });
    logger.info(`Folder with id: ${folderId} updated successfully`);
    return updatedFolder;
  }

  async deleteFolder(folderId: string) {
    const folder = await folderService.getById(folderId);
    if (!folder) {
      logger.warn(`Folder with ID ${folderId} was not found for delete.`);
      throw new CustomError("Folder not found", 404);
    }
    await folderService.delete(folderId);
    logger.info(`Folder with id: ${folderId} deleted successfully`);
  }
}

export default new FolderService();

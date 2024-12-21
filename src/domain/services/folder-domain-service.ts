import { Folder } from "../entities/folder-entity";
import { FolderRepository } from "../repositories/folder-repository";
import {
  CreateFolderDTO,
  UpdateFolderDTO,
} from "../../application/dtos/folder-dto";

export class FolderDomainService implements FolderRepository {
  constructor(private folderRepository: FolderRepository) {}

  addFolder(folderDto: CreateFolderDTO): Promise<Folder> {
    return this.folderRepository.addFolder(folderDto);
  }

  getAll(): Promise<Folder[]> {
    return this.folderRepository.getAll();
  }

  save(folderDto: CreateFolderDTO): Promise<Folder> {
    return this.folderRepository.save(folderDto);
  }

  getById(folderId: string): Promise<Folder | null> {
    return this.folderRepository.getById(folderId);
  }

  getByName(folderName: string): Promise<Folder | null> {
    return this.folderRepository.getByName(folderName);
  }

  update(folder: UpdateFolderDTO & { folderId: string }): Promise<Folder> {
    return this.folderRepository.update(folder);
  }

  delete(folderId: string): Promise<void> {
    return this.folderRepository.delete(folderId);
  }
}

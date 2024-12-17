import { Folder } from "../entities/folder-entity";
import { FolderRepository } from "../repositories/folder-repository";

export class FolderDomainService implements FolderRepository {
  constructor(private folderRepository: FolderRepository) {}

  addFolder(folder: Folder): Promise<Folder> {
    return this.folderRepository.addFolder(folder);
  }

  getAll(): Promise<Folder[]> {
    return this.folderRepository.getAll();
  }

  save(folder: Folder): Promise<Folder> {
    return this.folderRepository.save(folder);
  }

  getById(folderId: string): Promise<Folder | null> {
    return this.folderRepository.getById(folderId);
  }

  getByName(folderName: string): Promise<Folder | null> {
    return this.folderRepository.getByName(folderName);
  }

  update(folder: Folder): Promise<Folder> {
    return this.folderRepository.update(folder);
  }

  delete(folderId: string): Promise<void> {
    return this.folderRepository.delete(folderId);
  }
}

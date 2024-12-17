import { Folder } from "../entities/folder-entity"

export interface FolderRepository {
  addFolder(folder: Folder): Promise<Folder>;
  getAll(): Promise<Folder[]>;
  save(folder: Folder): Promise<Folder>;
  getById(folderId: string): Promise<Folder | null>;
  getByName(folderName: string): Promise<Folder | null>;
  update(folder: Folder): Promise<Folder>;
  delete(folderId: string): Promise<void>;
}

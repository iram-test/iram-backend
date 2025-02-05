import { Folder } from "../entities/section-entity";
import {
  CreateFolderDTO,
  UpdateFolderDTO,
} from "../../application/dtos/section-dto";

export interface FolderRepository {
  addFolder(folder: CreateFolderDTO): Promise<Folder>;
  getAll(): Promise<Folder[]>;
  save(folder: CreateFolderDTO): Promise<Folder>;
  getById(folderId: string): Promise<Folder | null>;
  getByName(folderName: string): Promise<Folder | null>;
  update(folder: UpdateFolderDTO & { folderId: string }): Promise<Folder>;
  delete(folderId: string): Promise<void>;
}

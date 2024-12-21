import { Folder } from "../../../domain/entities/folder-entity";
import { FolderEntity } from "../entities/folder-entity";
import { PostgresDataSource } from "../../../tools/db-connection";
import { Repository, FindOptionsWhere } from "typeorm";
import { FolderRepository } from "../../../domain/repositories/folder-repository";
import {
  CreateFolderDTO,
  UpdateFolderDTO,
} from "../../../application/dtos/folder-dto";
import { v4 } from "uuid";

export class FolderPostgresRepository implements FolderRepository {
  private repository: Repository<FolderEntity>;
  constructor() {
    this.repository = PostgresDataSource.getRepository(FolderEntity);
  }
  async addFolder(folder: CreateFolderDTO): Promise<Folder> {
    const createdFolder = this.repository.create({
      ...folder,
      folderId: v4(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return await this.repository.save(createdFolder);
  }
  async getAll(): Promise<Folder[]> {
    return await this.repository.find();
  }
  async getById(folderId: string): Promise<Folder | null> {
    return await this.repository.findOneBy({ folderId });
  }
  async getByName(folderName: string): Promise<Folder | null> {
    return await this.repository.findOneBy({ name: folderName });
  }

  async update(
    folder: UpdateFolderDTO & { folderId: string },
  ): Promise<Folder> {
    const existingFolder = await this.repository.findOneBy({
      folderId: folder.folderId,
    });
    if (!existingFolder) {
      throw new Error(`Folder with id: ${folder.folderId} was not found`);
    }
    await this.repository.update(folder.folderId, {
      ...folder,
      updatedAt: new Date(),
    });
    return (await this.repository.findOneBy({
      folderId: folder.folderId,
    })) as Folder;
  }
  async delete(folderId: string): Promise<void> {
    await this.repository.delete({ folderId });
  }
  async save(folder: Folder): Promise<Folder> {
    return await this.repository.save(folder);
  }

  async getBy(options: FindOptionsWhere<Folder>): Promise<Folder | null> {
    return await this.repository.findOneBy(options);
  }
}

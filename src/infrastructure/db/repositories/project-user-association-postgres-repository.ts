import { ProjectUserAssociation } from "../../../domain/entities/project-user-association";
import { PostgresDataSource } from "../../../tools/db-connection";
import { Repository, FindOptionsWhere } from "typeorm";
import { ProjectUserAssociationRepository } from "../../../domain/repositories/project-user-association-repository";
import {
  CreateProjectUserAssociationDTO,
  UpdateProjectUserAssociationDTO,
} from "../../../application/dtos/project-user-association-dto";
import { v4 } from "uuid";

export class ProjectUserAssociationPostgresRepository
  implements ProjectUserAssociationRepository
{
  private repository: Repository<ProjectUserAssociation>;
  constructor() {
    this.repository = PostgresDataSource.getRepository(ProjectUserAssociation);
  }
  async addAssociation(
    association: CreateProjectUserAssociationDTO,
  ): Promise<ProjectUserAssociation> {
    const createdAssociation = this.repository.create({
      ...association,
      associationId: v4(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return await this.repository.save(createdAssociation);
  }
  async getAll(): Promise<ProjectUserAssociation[]> {
    return await this.repository.find();
  }
  async getById(associationId: string): Promise<ProjectUserAssociation | null> {
    return await this.repository.findOneBy({ associationId });
  }

  async getByUserId(userId: string): Promise<ProjectUserAssociation | null> {
    return await this.repository.findOneBy({ userId });
  }

  async update(
    association: UpdateProjectUserAssociationDTO & { associationId: string },
  ): Promise<ProjectUserAssociation> {
    const existingAssociation = await this.repository.findOneBy({
      associationId: association.associationId,
    });
    if (!existingAssociation) {
      throw new Error(
        `Association with id ${association.associationId} was not found`,
      );
    }
    await this.repository.update(association.associationId, {
      ...association,
      updatedAt: new Date(),
    });
    return (await this.repository.findOneBy({
      associationId: association.associationId,
    })) as ProjectUserAssociation;
  }
  async delete(associationId: string): Promise<void> {
    await this.repository.delete({ associationId });
  }

  async save(
    association: ProjectUserAssociation,
  ): Promise<ProjectUserAssociation> {
    return await this.repository.save(association);
  }

  async getBy(
    options: FindOptionsWhere<ProjectUserAssociation>,
  ): Promise<ProjectUserAssociation | null> {
    return await this.repository.findOneBy(options);
  }
}

import { ProjectUserAssociation } from "../../../domain/entities/project-user-association";
import { ProjectUserAssociationRepository } from "../../../domain/repositories/project-user-association-repository";
import {
  CreateProjectUserAssociationDTO,
  UpdateProjectUserAssociationDTO,
} from "../../../application/dtos/project-user-association-dto";
import { PostgresDataSource } from "../../../tools/db-connection";
import { ProjectUserAssociationEntity } from "../entities/project-user-association-entity";
import { Repository } from "typeorm";
import { v4 } from "uuid";

export class ProjectUserAssociationPostgresRepository
  implements ProjectUserAssociationRepository
{
  private repository: Repository<ProjectUserAssociationEntity>;

  constructor() {
    this.repository = PostgresDataSource.getRepository(
      ProjectUserAssociationEntity,
    );
  }

  async addAssociation(
    associationDto: CreateProjectUserAssociationDTO,
  ): Promise<ProjectUserAssociation> {
    const associationEntity = this.repository.create({
      associationId: v4(),
      projectId: associationDto.projectId,
      userId: associationDto.userId,
      role: associationDto.role,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const savedAssociation = await this.repository.save(associationEntity);

    return new ProjectUserAssociation(
      savedAssociation.associationId,
      savedAssociation.projectId,
      savedAssociation.userId,
      savedAssociation.role,
      savedAssociation.createdAt.toISOString(),
      savedAssociation.updatedAt.toISOString(),
    );
  }
  async getAll(): Promise<ProjectUserAssociation[]> {
    const entities = await this.repository.find({
      relations: ["user", "project"], // Eagerly load the related user and project
    });
    return entities.map(
      (entity) =>
        new ProjectUserAssociation(
          entity.associationId,
          entity.projectId,
          entity.userId,
          entity.role,
          entity.createdAt.toISOString(),
          entity.updatedAt.toISOString(),
        ),
    );
  }

  async getById(associationId: string): Promise<ProjectUserAssociation | null> {
    const entity = await this.repository.findOne({
      where: { associationId },
      relations: ["user", "project"], // Eagerly load the related user and project
    });
    if (!entity) return null;
    return new ProjectUserAssociation(
      entity.associationId,
      entity.projectId,
      entity.userId,
      entity.role,
      entity.createdAt.toISOString(),
      entity.updatedAt.toISOString(),
    );
  }

  async getByUserId(userId: string): Promise<ProjectUserAssociation[]> {
    const entities = await this.repository.find({
      where: { userId },
      relations: ["user", "project"], // Eagerly load the related user and project
    });
    return entities.map(
      (entity) =>
        new ProjectUserAssociation(
          entity.associationId,
          entity.projectId,
          entity.userId,
          entity.role,
          entity.createdAt.toISOString(),
          entity.updatedAt.toISOString(),
        ),
    );
  }

  async update(
    associationDto: UpdateProjectUserAssociationDTO,
  ): Promise<ProjectUserAssociation> {
    const associationEntity = await this.repository.findOneBy({
      associationId: associationDto.associationId,
    });

    if (!associationEntity) {
      throw new Error(
        `Association with id ${associationDto.associationId} was not found`,
      );
    }

    associationEntity.role = associationDto.role ?? associationEntity.role;
    associationEntity.updatedAt = new Date();

    const updatedAssociation = await this.repository.save(associationEntity);
    return new ProjectUserAssociation(
      updatedAssociation.associationId,
      updatedAssociation.projectId,
      updatedAssociation.userId,
      updatedAssociation.role,
      updatedAssociation.createdAt.toISOString(),
      updatedAssociation.updatedAt.toISOString(),
    );
  }

  async delete(associationId: string): Promise<void> {
    await this.repository.delete({ associationId });
  }

  async getAssociationByUserIdAndProjectId(
    userId: string,
    projectId: string,
  ): Promise<ProjectUserAssociation | null> {
    const entity = await this.repository.findOne({
      where: { userId, projectId },
      relations: ["user", "project"], // Eagerly load the related user and project
    });
    if (!entity) return null;
    return new ProjectUserAssociation(
      entity.associationId,
      entity.projectId,
      entity.userId,
      entity.role,
      entity.createdAt.toISOString(),
      entity.updatedAt.toISOString(),
    );
  }

  async getAssociationsByProjectId(
    projectId: string,
  ): Promise<ProjectUserAssociation[]> {
    const entities = await this.repository.find({
      where: { projectId },
      relations: ["user", "project"], // Eagerly load the related user and project
    });
    return entities.map(
      (entity) =>
        new ProjectUserAssociation(
          entity.associationId,
          entity.projectId,
          entity.userId,
          entity.role,
          entity.createdAt.toISOString(),
          entity.updatedAt.toISOString(),
        ),
    );
  }
}

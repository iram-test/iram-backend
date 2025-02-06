import { OrganizationUserAssociation } from "../../../domain/entities/organization-user-association";
import { OrganizationUserAssociationEntity } from "../entities/organization-user-association-entity";
import { PostgresDataSource } from "../../../tools/db-connection";
import { Repository } from "typeorm";
import { OrganizationUserAssociationRepository } from "../../../domain/repositories/organization-user-association-repository";
import {
  CreateOrganizationUserAssociationDTO,
  UpdateOrganizationUserAssociationDTO,
} from "../../../application/dtos/organization-user-association-dto";
import { v4 } from "uuid";

export class OrganizationUserAssociationPostgresRepository
  implements OrganizationUserAssociationRepository
{
  private repository: Repository<OrganizationUserAssociationEntity>;
  constructor() {
    this.repository = PostgresDataSource.getRepository(
      OrganizationUserAssociationEntity,
    );
  }
  async addAssociation(
    associationDto: CreateOrganizationUserAssociationDTO,
  ): Promise<OrganizationUserAssociation> {
    const associationEntity = this.repository.create({
      associationId: v4(),
      userId: associationDto.userId,
      organizationId: associationDto.organizationId,
      role: associationDto.role,
      assignedAt: new Date(),
    });
    const savedAssociation = await this.repository.save(associationEntity);
    return new OrganizationUserAssociation(
      savedAssociation.associationId,
      savedAssociation.userId,
      savedAssociation.organizationId,
      savedAssociation.role,
      savedAssociation.assignedAt.toISOString(),
    );
  }

  async getAll(): Promise<OrganizationUserAssociation[]> {
    const entities = await this.repository.find({
      relations: ["user", "organization"], // Eagerly load the related user and organization
    });
    return entities.map(
      (entity) =>
        new OrganizationUserAssociation(
          entity.associationId,
          entity.userId,
          entity.organizationId,
          entity.role,
          entity.assignedAt.toISOString(),
        ),
    );
  }
  async getById(
    associationId: string,
  ): Promise<OrganizationUserAssociation | null> {
    const entity = await this.repository.findOne({
      where: { associationId },
      relations: ["user", "organization"], // Eagerly load the related user and organization
    });
    if (!entity) return null;
    return new OrganizationUserAssociation(
      entity.associationId,
      entity.userId,
      entity.organizationId,
      entity.role,
      entity.assignedAt.toISOString(),
    );
  }
  async getByUserId(
    userId: string,
  ): Promise<OrganizationUserAssociation | null> {
    const entity = await this.repository.findOne({
      where: { userId },
      relations: ["user", "organization"], // Eagerly load the related user and organization
    });
    if (!entity) return null;
    return new OrganizationUserAssociation(
      entity.associationId,
      entity.userId,
      entity.organizationId,
      entity.role,
      entity.assignedAt.toISOString(),
    );
  }

  async getByOrganizationId(
    organizationId: string,
  ): Promise<OrganizationUserAssociation[]> {
    const entities = await this.repository.find({
      where: { organizationId },
      relations: ["user", "organization"], // Eagerly load the related user and organization
    });
    return entities.map(
      (entity) =>
        new OrganizationUserAssociation(
          entity.associationId,
          entity.userId,
          entity.organizationId,
          entity.role,
          entity.assignedAt.toISOString(),
        ),
    );
  }

  async update(
    associationDto: UpdateOrganizationUserAssociationDTO,
  ): Promise<OrganizationUserAssociation> {
    const associationEntity = await this.repository.findOneBy({
      associationId: associationDto.associationId,
    });

    if (!associationEntity) {
      throw new Error(
        `Association with id ${associationDto.associationId} was not found`,
      );
    }

    associationEntity.role = associationDto.role ?? associationEntity.role;

    const updatedAssociation = await this.repository.save(associationEntity);
    return new OrganizationUserAssociation(
      updatedAssociation.associationId,
      updatedAssociation.userId,
      updatedAssociation.organizationId,
      updatedAssociation.role,
      updatedAssociation.assignedAt.toISOString(),
    );
  }

  async delete(associationId: string): Promise<void> {
    await this.repository.delete({ associationId });
  }
}

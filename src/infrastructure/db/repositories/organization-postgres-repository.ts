import { Organization } from "../../../domain/entities/organization-entity";
import { OrganizationEntity } from "../entities/organization-entity";
import { PostgresDataSource } from "../../../tools/db-connection";
import { Repository } from "typeorm";
import { OrganizationRepository } from "../../../domain/repositories/organization-repository";
import {
  CreateOrganizationDTO,
  UpdateOrganizationDTO,
} from "../../../application/dtos/organization-dto";
import { v4 } from "uuid";

export class OrganizationPostgresRepository implements OrganizationRepository {
  private repository: Repository<OrganizationEntity>;
  constructor() {
    this.repository = PostgresDataSource.getRepository(OrganizationEntity);
  }
  async addOrganization(
    organizationDto: CreateOrganizationDTO,
  ): Promise<Organization> {
      const organizationEntity = this.repository.create({
          organizationId: v4(),
          name: organizationDto.name,
          description: organizationDto.description,
          projectId: organizationDto.projectId,
          createdAt: new Date(),
          updatedAt: new Date(),
      });
    const savedOrganization = await this.repository.save(organizationEntity);
    return new Organization(
      savedOrganization.organizationId,
      null,
      savedOrganization.name,
      savedOrganization.description,
      savedOrganization.createdAt.toISOString(),
      savedOrganization.updatedAt.toISOString(),
      savedOrganization.projectId,
    );
  }
  async getAll(): Promise<Organization[]> {
      const entities = await this.repository.find({
          relations: ['project'], // Eagerly load the related project
      });
    return entities.map((entity) => new Organization(
      entity.organizationId,
      null, //assignedUserId
      entity.name,
      entity.description,
      entity.createdAt.toISOString(),
      entity.updatedAt.toISOString(),
      entity.projectId,
    ));
  }
  async getById(organizationId: string): Promise<Organization | null> {
      const entity = await this.repository.findOne({
          where: { organizationId },
          relations: ['project'], // Eagerly load the related project
      });
      if (!entity) return null;
    return new Organization(
      entity.organizationId,
      null, //entity.assignedUserId,
      entity.name,
      entity.description,
      entity.createdAt.toISOString(),
      entity.updatedAt.toISOString(),
      entity.projectId,
    );
  }

  async getByName(name: string): Promise<Organization | null> {
      const entity = await this.repository.findOne({
          where: { name },
          relations: ['project'], // Eagerly load the related project
      });
      if (!entity) return null;
    return new Organization(
      entity.organizationId,
      null, //entity.assignedUserId,
      entity.name,
      entity.description,
      entity.createdAt.toISOString(),
      entity.updatedAt.toISOString(),
      entity.projectId,
    );
  }

  async update(organizationDto: UpdateOrganizationDTO): Promise<Organization> {
      const organizationEntity = await this.repository.findOneBy({ organizationId: organizationDto.organizationId });

      if (!organizationEntity) {
          throw new Error(`Organization with id ${organizationDto.organizationId} was not found`);
      }

      organizationEntity.name = organizationDto.name ?? organizationEntity.name;
      organizationEntity.description = organizationDto.description ?? organizationEntity.description;
      organizationEntity.updatedAt = new Date();


      const updatedOrganizationEntity = await this.repository.save(organizationEntity);

      return new Organization(
          updatedOrganizationEntity.organizationId,
          null,
          updatedOrganizationEntity.name,
          updatedOrganizationEntity.description,
          updatedOrganizationEntity.createdAt.toISOString(),
          updatedOrganizationEntity.updatedAt.toISOString(),
          updatedOrganizationEntity.projectId,
      );
  }

  async delete(organizationId: string): Promise<void> {
    await this.repository.delete({ organizationId });
  }
}
import { DataSource, Repository } from "typeorm";
import { OrganizationUserAssociationEntity } from "../entities/organization-user-association-entity";
import { OrganizationUserAssociation } from "../../../domain/entities/organization-user-association";
import {
  CreateOrganizationUserAssociationDTO,
  UpdateOrganizationUserAssociationDTO,
} from "../../../application/dtos/organization-user-association-dto";
import { OrganizationUserAssociationRepository } from "../../../domain/repositories/organization-user-association-repository";
import { PostgresDataSource } from "../../../tools/db-connection";
import { ProjectEntity } from "../entities/project-entity";

export class OrganizationUserAssociationPostgresRepository
  implements OrganizationUserAssociationRepository
{
  private repository: Repository<OrganizationUserAssociationEntity>;
  private projectRepository: Repository<ProjectEntity>;

  constructor(private readonly dataSource: DataSource = PostgresDataSource) {
    this.repository = this.dataSource.getRepository(
      OrganizationUserAssociationEntity,
    );
    this.projectRepository = this.dataSource.getRepository(ProjectEntity);
  }

  async addAssociation(
    createDto: CreateOrganizationUserAssociationDTO,
  ): Promise<OrganizationUserAssociation> {
    const association = this.repository.create(createDto);
    const savedAssociation = await this.repository.save(association);
    return this.toDomainEntity(savedAssociation);
  }

  async getAll(): Promise<OrganizationUserAssociation[]> {
    const associations = await this.repository.find({
      relations: ["user", "organization"],
    });
    return associations.map((entity) => this.toDomainEntity(entity));
  }

  async update(
    updateDto: UpdateOrganizationUserAssociationDTO,
  ): Promise<OrganizationUserAssociation> {
    const { associationId, ...updateData } = updateDto;
    await this.repository.update(associationId, updateData);
    const updatedAssociation = await this.repository.findOneOrFail({
      where: { associationId },
      relations: ["user", "organization"],
    });
    return this.toDomainEntity(updatedAssociation);
  }

  async getById(
    associationId: string,
  ): Promise<OrganizationUserAssociation | null> {
    const association = await this.repository.findOne({
      where: { associationId },
      relations: ["user", "organization"],
    });
    return association ? this.toDomainEntity(association) : null;
  }

  async getByUserId(userId: string): Promise<OrganizationUserAssociation[]> {
    const associations = await this.repository.find({
      where: { userId },
      relations: ["user", "organization"],
    });
    return associations.map((entity) => this.toDomainEntity(entity));
  }

  async getByOrganizationId(
    organizationId: string,
  ): Promise<OrganizationUserAssociation[]> {
    const associations = await this.repository.find({
      where: { organizationId },
      relations: ["user", "organization"],
    });
    return associations.map((entity) => this.toDomainEntity(entity));
  }

  async delete(associationId: string): Promise<void> {
    await this.repository.delete(associationId);
  }

  async getOrganizationsByUserId(
    userId: string,
  ): Promise<OrganizationUserAssociation[]> {
    const associations = await this.repository.find({
      where: { userId: userId },
      relations: ["organization"],
    });
    return associations.map((entity) => this.toDomainEntity(entity));
  }

  async getOrganizationsByProjectId(
    projectId: string,
  ): Promise<OrganizationUserAssociation[]> {
    const project = await this.projectRepository.findOne({
      where: { projectId: projectId },
      relations: ["organization"],
    });

    if (!project || !project.organization) {
      return [];
    }

    const organizationId = project.organization.organizationId;

    const associations = await this.repository.find({
      where: { organizationId: organizationId },
      relations: ["user", "organization"],
    });

    return associations.map((entity) => this.toDomainEntity(entity));
  }

  private toDomainEntity(
    entity: OrganizationUserAssociationEntity,
  ): OrganizationUserAssociation {
    return new OrganizationUserAssociation(
      entity.associationId,
      entity.userId,
      entity.organizationId,
      entity.role,
      entity.assignedAt.toISOString(),
    );
  }
}

import { DataSource, Repository } from "typeorm";
import { OrganizationEntity } from "../entities/organization-entity";
import { Organization } from "../../../domain/entities/organization-entity";
import {
  CreateOrganizationDTO,
  UpdateOrganizationDTO,
} from "../../../application/dtos/organization-dto";
import { OrganizationRepository } from "../../../domain/repositories/organization-repository";
import { PostgresDataSource } from "../../../tools/db-connection";

export class OrganizationPostgresRepository implements OrganizationRepository {
  private repository: Repository<OrganizationEntity>;

  constructor(private readonly dataSource: DataSource = PostgresDataSource) {
    this.repository = this.dataSource.getRepository(OrganizationEntity);
  }

  async addOrganization(
    createDto: CreateOrganizationDTO,
  ): Promise<Organization> {
    const organization = this.repository.create(createDto);
    const savedOrganization = await this.repository.save(organization);
    return this.toDomainEntity(savedOrganization);
  }

  async getAll(): Promise<Organization[]> {
    const organizations = await this.repository.find({
      relations: ["userAssociations", "projects"],
    });
    return organizations.map((entity) => this.toDomainEntity(entity));
  }

  async update(updateDto: UpdateOrganizationDTO): Promise<Organization> {
    const { organizationId, ...updateData } = updateDto;
    await this.repository.update(organizationId, updateData);
    const updatedOrganization = await this.repository.findOneOrFail({
      where: { organizationId },
      relations: ["userAssociations", "projects"],
    });
    return this.toDomainEntity(updatedOrganization);
  }

  async getById(organizationId: string): Promise<Organization | null> {
    const organization = await this.repository.findOne({
      where: { organizationId },
      relations: ["userAssociations", "projects"],
    });
    return organization ? this.toDomainEntity(organization) : null;
  }

  async getByName(organizationName: string): Promise<Organization | null> {
    const organization = await this.repository.findOne({
      where: { name: organizationName },
      relations: ["userAssociations", "projects"],
    });
    return organization ? this.toDomainEntity(organization) : null;
  }

  async delete(organizationId: string): Promise<void> {
    await this.repository.delete(organizationId);
  }

  private toDomainEntity(entity: OrganizationEntity): Organization {
    return new Organization(
      entity.organizationId,
      entity.name,
      entity.description,
      entity.createdAt.toISOString(),
      entity.updatedAt.toISOString(),
    );
  }
}

import { Organization } from "../../../domain/entities/organization-entity";
import { OrganizationEntity } from "../entities/organization-entity";
import { PostgresDataSource } from "../../../tools/db-connection";
import { Repository, FindOptionsWhere } from "typeorm";
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
    organization: CreateOrganizationDTO,
  ): Promise<Organization> {
    const createdOrganization = this.repository.create({
      ...organization,
      organizationId: v4(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return await this.repository.save(createdOrganization);
  }
  async getAll(): Promise<Organization[]> {
    return await this.repository.find();
  }
  async getById(organizationId: string): Promise<Organization | null> {
    return await this.repository.findOneBy({ organizationId });
  }

  async getByName(name: string): Promise<Organization | null> {
    return await this.repository.findOneBy({ name });
  }

  async update(
    organization: UpdateOrganizationDTO & { organizationId: string },
  ): Promise<Organization> {
    const existingOrganization = await this.repository.findOneBy({
      organizationId: organization.organizationId,
    });
    if (!existingOrganization) {
      throw new Error(
        `Organization with id ${organization.organizationId} was not found`,
      );
    }
    await this.repository.update(organization.organizationId, {
      ...organization,
      updatedAt: new Date(),
    });
    return (await this.repository.findOneBy({
      organizationId: organization.organizationId,
    })) as Organization;
  }
  async delete(organizationId: string): Promise<void> {
    await this.repository.delete({ organizationId });
  }

  async save(organization: Organization): Promise<Organization> {
    return await this.repository.save(organization);
  }

  async getBy(
    options: FindOptionsWhere<Organization>,
  ): Promise<Organization | null> {
    return await this.repository.findOneBy(options);
  }
}

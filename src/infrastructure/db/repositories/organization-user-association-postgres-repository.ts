import { OrganizationUserAssociation } from "../../../domain/entities/organization-user-association";
import { OrganizationUserAssociationEntity } from "../entities/organization-user-association-entity";
import { PostgresDataSource } from "../../../tools/db-connection";
import { Repository, FindOptionsWhere } from "typeorm";
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
    association: CreateOrganizationUserAssociationDTO,
  ): Promise<OrganizationUserAssociation> {
    const createdAssociation = this.repository.create({
      ...association,
      associationId: v4(),
      assignedAt: new Date(),
    });
    return await this.repository.save(createdAssociation);
  }

  async getAll(): Promise<OrganizationUserAssociation[]> {
    return await this.repository.find();
  }
  async getById(
    associationId: string,
  ): Promise<OrganizationUserAssociation | null> {
    return await this.repository.findOneBy({ associationId });
  }
  async getByUserId(
    userId: string,
  ): Promise<OrganizationUserAssociation | null> {
    return await this.repository.findOneBy({ userId });
  }

  async update(
    association: UpdateOrganizationUserAssociationDTO & {
      associationId: string;
    },
  ): Promise<OrganizationUserAssociation> {
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
      assignedAt: new Date(),
    });
    return (await this.repository.findOneBy({
      associationId: association.associationId,
    })) as OrganizationUserAssociation;
  }

  async delete(associationId: string): Promise<void> {
    await this.repository.delete({ associationId });
  }

  async save(
    association: OrganizationUserAssociation,
  ): Promise<OrganizationUserAssociation> {
    return await this.repository.save(association);
  }

  async getBy(
    options: FindOptionsWhere<OrganizationUserAssociation>,
  ): Promise<OrganizationUserAssociation | null> {
    return await this.repository.findOneBy(options);
  }
}

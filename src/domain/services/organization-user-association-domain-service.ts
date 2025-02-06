import { OrganizationUserAssociation } from "../entities/organization-user-association";
import { OrganizationUserAssociationRepository } from "../repositories/organization-user-association-repository";
import {
  CreateOrganizationUserAssociationDTO,
  UpdateOrganizationUserAssociationDTO,
} from "../../application/dtos/organization-user-association-dto";

export class OrganizationUserAssociationDomainService
  implements OrganizationUserAssociationRepository
{
  constructor(
    private associationRepository: OrganizationUserAssociationRepository,
  ) {}

  async addAssociation(
    associationDto: CreateOrganizationUserAssociationDTO,
  ): Promise<OrganizationUserAssociation> {
    const association: OrganizationUserAssociation =
      new OrganizationUserAssociation(
        "",
        associationDto.userId,
        associationDto.organizationId,
        associationDto.role,
        new Date().toISOString(),
      );
    return await this.associationRepository.addAssociation(association); // Pass the constructed entity
  }

  getAll(): Promise<OrganizationUserAssociation[]> {
    return this.associationRepository.getAll();
  }

  getById(associationId: string): Promise<OrganizationUserAssociation | null> {
    return this.associationRepository.getById(associationId);
  }

  getByUserId(userId: string): Promise<OrganizationUserAssociation[]> {
    return this.associationRepository.getByUserId(userId);
  }

  getByOrganizationId(
    organizationId: string,
  ): Promise<OrganizationUserAssociation[]> {
    return this.associationRepository.getByOrganizationId(organizationId);
  }

  update(
    associationDto: UpdateOrganizationUserAssociationDTO,
  ): Promise<OrganizationUserAssociation> {
    return this.associationRepository.update(associationDto);
  }

  delete(associationId: string): Promise<void> {
    return this.associationRepository.delete(associationId);
  }
}

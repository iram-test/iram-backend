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

  addAssociation(
    associationDto: CreateOrganizationUserAssociationDTO,
  ): Promise<OrganizationUserAssociation> {
    return this.associationRepository.addAssociation(associationDto);
  }

  getAll(): Promise<OrganizationUserAssociation[]> {
    return this.associationRepository.getAll();
  }

  save(
    associationDto: CreateOrganizationUserAssociationDTO,
  ): Promise<OrganizationUserAssociation> {
    return this.associationRepository.save(associationDto);
  }

  getById(associationId: string): Promise<OrganizationUserAssociation | null> {
    return this.associationRepository.getById(associationId);
  }

  getByUserId(userId: string): Promise<OrganizationUserAssociation | null> {
    return this.associationRepository.getByUserId(userId);
  }

   update(
    association: UpdateOrganizationUserAssociationDTO & {
        associationId: string;
    },
  ): Promise<OrganizationUserAssociation> {
    return this.associationRepository.update(association);
  }


  delete(associationId: string): Promise<void> {
    return this.associationRepository.delete(associationId);
  }
}

import { OrganizationUserAssociation } from "../entities/organization-user-association";
import { OrganizationUserAssociationRepository } from "../repositories/organization-user-association-repository";

export class OrganizationUserAssociationDomainService implements OrganizationUserAssociationRepository {
  constructor(private associationRepository: OrganizationUserAssociationRepository) {}

  addAssociation(association: OrganizationUserAssociation): Promise<OrganizationUserAssociation> {
    return this.associationRepository.addAssociation(association);
  }

  getAll(): Promise<OrganizationUserAssociation[]> {
    return this.associationRepository.getAll();
  }

  save(association: OrganizationUserAssociation): Promise<OrganizationUserAssociation> {
    return this.associationRepository.save(association);
  }

  getById(associationId: string): Promise<OrganizationUserAssociation | null> {
    return this.associationRepository.getById(associationId);
  }

  getByUserId(userId: string): Promise<OrganizationUserAssociation | null> {
    return this.associationRepository.getByUserId(userId);
  }

  update(association: OrganizationUserAssociation): Promise<OrganizationUserAssociation> {
    return this.associationRepository.update(association);
  }

  delete(associationId: string): Promise<void> {
    return this.associationRepository.delete(associationId);
  }
}

import { OrganizationUserAssociation } from "../entities/organization-user-association";

export interface OrganizationUserAssociationRepository {
  addAssociation(association: OrganizationUserAssociation): Promise<OrganizationUserAssociation>;
  getAll(): Promise<OrganizationUserAssociation[]>;
  save(association: OrganizationUserAssociation): Promise<OrganizationUserAssociation>;
  getById(associationId: string): Promise<OrganizationUserAssociation | null>;
  getByUserId(userId: string): Promise<OrganizationUserAssociation | null>;
  update(association: OrganizationUserAssociation): Promise<OrganizationUserAssociation>;
  delete(associationId: string): Promise<void>;
}

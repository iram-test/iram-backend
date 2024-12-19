import { OrganizationUserAssociation } from "../entities/organization-user-association";
import {
  CreateOrganizationUserAssociationDTO,
  UpdateOrganizationUserAssociationDTO,
} from "../../application/dtos/organization-user-association-dto";

export interface OrganizationUserAssociationRepository {
  addAssociation(
    association: CreateOrganizationUserAssociationDTO,
  ): Promise<OrganizationUserAssociation>;
  getAll(): Promise<OrganizationUserAssociation[]>;
  save(
    association: CreateOrganizationUserAssociationDTO,
  ): Promise<OrganizationUserAssociation>;
  getById(associationId: string): Promise<OrganizationUserAssociation | null>;
  getByUserId(userId: string): Promise<OrganizationUserAssociation | null>;
  update(
    association: UpdateOrganizationUserAssociationDTO & {
      associationId: string;
    },
  ): Promise<OrganizationUserAssociation>;
  delete(associationId: string): Promise<void>;
}

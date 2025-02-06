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
  update(
    association: UpdateOrganizationUserAssociationDTO
  ): Promise<OrganizationUserAssociation>;
  getById(associationId: string): Promise<OrganizationUserAssociation | null>;
  getByUserId(userId: string): Promise<OrganizationUserAssociation | null>;
  delete(associationId: string): Promise<void>;
  getByOrganizationId(organizationId:string):Promise<OrganizationUserAssociation[]>
}
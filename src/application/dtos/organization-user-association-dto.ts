import { UserRole } from "../../domain/entities/enums/user-role";

export interface OrganizationUserAssociationDTO {
  associationId: string;
  userId: string;
  organizationId: string;
  role: UserRole;
  assignedAt: string; // ISO string
}

export interface CreateOrganizationUserAssociationDTO {
  userId: string;
  organizationId: string;
  role: UserRole;
}

export interface UpdateOrganizationUserAssociationDTO {
  associationId: string;
  role?: UserRole;
}

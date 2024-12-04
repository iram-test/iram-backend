import { UserRole } from "./enums/user-role";
import { UserPermission } from "./enums/user-permission";

export declare class OrganizationUserAssociation {
  constructor(
    associationId: string,
    userId: string,
    organizationId: string,
    role: UserRole,
    permission: UserPermission,
    assignedAt: Date,
  );

  associationId: string;
  userId: string;
  organizationId: string;
  role: UserRole;
  permission: UserPermission;
  assignedAt: Date;
}

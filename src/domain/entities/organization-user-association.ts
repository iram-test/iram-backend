import { UserRole } from './enums/user-role';
import { UserPermission } from './enums/user-permission';

export class OrganizationUserAssociation {
  constructor(
    public associationId: string,
    public userId: string,
    public organizationId: string,
    public role: UserRole,
    public permission: UserPermission,
    public assignedAt: Date,
  ) {}
}
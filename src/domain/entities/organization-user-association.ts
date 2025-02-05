import { UserRole } from "./enums/user-role";

export class OrganizationUserAssociation {
  constructor(
    public associationId: string,
    public userId: string,
    public organizationId: string,
    public role: UserRole,
    public assignedAt: string,
  ) {}
}

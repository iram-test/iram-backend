export class OrganizationUserAssociation {
  constructor(
    associationId,
    userId,
    organizationId,
    role,
    permission,
    assignedAt,
  ) {
    this.associationId = associationId;
    this.userId = userId;
    this.organizationId = organizationId;
    this.role = role;
    this.permission = permission;
    this.assignedAt = assignedAt;
  }
}

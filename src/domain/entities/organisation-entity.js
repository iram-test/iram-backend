export class Organization {
  constructor(
    organizationId,
    name,
    description,
    createdAt,
    updatedAt,
    projectId,
  ) {
    this.organizationId = organizationId;
    this.name = name;
    this.description = description;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.projectId = projectId;
  }
}

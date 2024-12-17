export class Organization {
  constructor(
    public organizationId: string,
    public name: string,
    public description: string,
    public createdAt: Date,
    public updatedAt: Date,
    public projectId: string,
  ) {}
}
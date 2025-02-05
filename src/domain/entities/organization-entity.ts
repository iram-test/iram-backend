export class Organization {
  constructor(
    public organizationId: string,
    public assignedUserId: string[] | null,
    public name: string,
    public description: string,
    public createdAt: string,
    public updatedAt: string,
    public projectId: string,
  ) {}
}

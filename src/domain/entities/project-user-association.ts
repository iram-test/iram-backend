import { ProjectRole } from "./enums/project-role";

export class ProjectUserAssociation {
  constructor(
    public associationId: string,
    public projectId: string,
    public userId: string,
    public role: ProjectRole,
    public createdAt?: Date,
    public updatedAt?: Date,
  ) {}
}

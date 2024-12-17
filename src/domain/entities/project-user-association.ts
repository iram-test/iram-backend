import { ProjectRole } from './enums/project-role';

export class ProjectUserAssociation {
  constructor(
    public associationId: string,
    public projectId: string,
    public userId: string,
    public projectRole: ProjectRole,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}
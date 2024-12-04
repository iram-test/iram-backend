import { ProjectRole } from "./enums/project-role";

export declare class ProjectUserAssociation {
  constructor(
    associationId: string,
    projectId: string,
    userId: string,
    projectRole: ProjectRole,
    createdAt: Date,
    updatedAt: Date,
  );

  associationId: string;
  projectId: string;
  userId: string;
  projectRole: ProjectRole;
  createdAt: Date;
  updatedAt: Date;
}

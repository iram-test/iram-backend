import { ProjectRole } from "../../domain/entities/enums/project-role";

export interface ProjectUserAssociationDTO {
  associationId: string;
  projectId: string;
  userId: string;
  role: ProjectRole;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
}

export interface CreateProjectUserAssociationDTO {
  projectId: string;
  userId: string;
  role: ProjectRole;
}

export interface UpdateProjectUserAssociationDTO {
  associationId: string;
  role?: ProjectRole;
}

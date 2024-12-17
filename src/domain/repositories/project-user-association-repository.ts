import { ProjectUserAssociation } from "../entities/project-user-association";

export interface ProjectUserAssociationRepository {
  addAssociation(association: ProjectUserAssociation): Promise<ProjectUserAssociation>;
  getAll(): Promise<ProjectUserAssociation[]>;
  save(association: ProjectUserAssociation): Promise<ProjectUserAssociation>;
  getById(associationId: string): Promise<ProjectUserAssociation | null>;
  getByUserId(userId: string): Promise<ProjectUserAssociation | null>;
  update(association: ProjectUserAssociation): Promise<ProjectUserAssociation>;
  delete(associationId: string): Promise<void>;
}

import { ProjectUserAssociation } from "../entities/project-user-association";
import {
  CreateProjectUserAssociationDTO,
  UpdateProjectUserAssociationDTO,
} from "../../application/dtos/project-user-association-dto";

export interface ProjectUserAssociationRepository {
  addAssociation(
    association: CreateProjectUserAssociationDTO,
  ): Promise<ProjectUserAssociation>;
  getAll(): Promise<ProjectUserAssociation[]>;
  save(
    association: CreateProjectUserAssociationDTO,
  ): Promise<ProjectUserAssociation>;
  getById(associationId: string): Promise<ProjectUserAssociation | null>;
  getByUserId(userId: string): Promise<ProjectUserAssociation | null>;
  update(
    association: UpdateProjectUserAssociationDTO & { associationId: string },
  ): Promise<ProjectUserAssociation>;
  delete(associationId: string): Promise<void>;
  getAssociationByUserIdAndProjectId(
    userId: string,
    projectId: string,
  ): Promise<ProjectUserAssociation | null>;
}

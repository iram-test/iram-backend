import { ProjectUserAssociation } from "../../../domain/entities/project-user-association";
import { ProjectUserAssociationRepository } from "../../../domain/repositories/project-user-association-repository";
import {
  CreateProjectUserAssociationDTO,
  UpdateProjectUserAssociationDTO,
} from "../../../application/dtos/project-user-association-dto";
import { PostgresDataSource } from "../../../tools/db-connection";
import { ProjectUserAssociationEntity } from "../entities/project-user-association-entity";

export class ProjectUserAssociationPostgresRepository
  implements ProjectUserAssociationRepository
{
  async addAssociation(
    association: CreateProjectUserAssociationDTO,
  ): Promise<ProjectUserAssociation> {
    const { projectId, userId, projectRole } = association;
    const newAssociation = await PostgresDataSource.query(
      `INSERT INTO project_user_associations (project_id, user_id, role ) VALUES ($1, $2, $3) RETURNING *`,
      [projectId, userId, projectRole],
    );
    return this.mapDbEntityToProjectUserAssociation(
      newAssociation.rows[0] as ProjectUserAssociationEntity,
    );
  }
  async getAll(): Promise<ProjectUserAssociation[]> {
    const associations = await PostgresDataSource.query(
      `SELECT * FROM project_user_associations`,
    );
    return associations.rows.map((association: ProjectUserAssociationEntity) =>
      this.mapDbEntityToProjectUserAssociation(association),
    );
  }
  async save(
    association: CreateProjectUserAssociationDTO,
  ): Promise<ProjectUserAssociation> {
    const { projectId, userId, projectRole } = association;
    const updatedAssociation = await PostgresDataSource.query(
      `UPDATE project_user_associations SET role = $1 WHERE project_id = $2 and user_id = $3 RETURNING *`,
      [projectRole, projectId, userId],
    );
    return this.mapDbEntityToProjectUserAssociation(
      updatedAssociation.rows[0] as ProjectUserAssociationEntity,
    );
  }

  async getById(associationId: string): Promise<ProjectUserAssociation | null> {
    const association = await PostgresDataSource.query(
      `SELECT * FROM project_user_associations WHERE associationId = $1`,
      [associationId],
    );
    return association.rows[0]
      ? this.mapDbEntityToProjectUserAssociation(
          association.rows[0] as ProjectUserAssociationEntity,
        )
      : null;
  }

  async getByUserId(userId: string): Promise<ProjectUserAssociation | null> {
    const association = await PostgresDataSource.query(
      `SELECT * FROM project_user_associations WHERE user_id = $1`,
      [userId],
    );
    return association.rows[0]
      ? this.mapDbEntityToProjectUserAssociation(
          association.rows[0] as ProjectUserAssociationEntity,
        )
      : null;
  }

  async update(
    association: UpdateProjectUserAssociationDTO & { associationId: string },
  ): Promise<ProjectUserAssociation> {
    const { associationId, projectRole } = association;
    const updatedAssociation = await PostgresDataSource.query(
      `UPDATE project_user_associations SET role = $1 WHERE associationId = $2  RETURNING *`,
      [projectRole, associationId],
    );
    return this.mapDbEntityToProjectUserAssociation(
      updatedAssociation.rows[0] as ProjectUserAssociationEntity,
    );
  }

  async delete(associationId: string): Promise<void> {
    await PostgresDataSource.query(
      `DELETE FROM project_user_associations WHERE associationId = $1`,
      [associationId],
    );
  }
  async getAssociationByUserIdAndProjectId(
    userId: string,
    projectId: string,
  ): Promise<ProjectUserAssociation | null> {
    const association = await PostgresDataSource.query(
      `SELECT * FROM project_user_associations WHERE user_id = $1 AND project_id = $2`,
      [userId, projectId],
    );
    return association.rows[0]
      ? this.mapDbEntityToProjectUserAssociation(
          association.rows[0] as ProjectUserAssociationEntity,
        )
      : null;
  }
  private mapDbEntityToProjectUserAssociation(
    projectUserAssociationEntity: ProjectUserAssociationEntity,
  ): ProjectUserAssociation {
    return {
      associationId: projectUserAssociationEntity.associationId,
      projectId: projectUserAssociationEntity.projectId,
      userId: projectUserAssociationEntity.userId,
      role: projectUserAssociationEntity.role,
    };
  }
}

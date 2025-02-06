import { ProjectUserAssociation } from "../entities/project-user-association";
import { ProjectUserAssociationRepository } from "../repositories/project-user-association-repository";
import {
  CreateProjectUserAssociationDTO,
  UpdateProjectUserAssociationDTO,
} from "../../application/dtos/project-user-association-dto";

export class ProjectUserAssociationDomainService
  implements ProjectUserAssociationRepository
{
  constructor(
    private associationRepository: ProjectUserAssociationRepository,
  ) {}

  addAssociation(
    associationDto: CreateProjectUserAssociationDTO,
  ): Promise<ProjectUserAssociation> {
    const association:ProjectUserAssociation = new ProjectUserAssociation(
      '',
      associationDto.projectId,
      associationDto.userId,
      associationDto.role,
      new Date().toISOString(),
      new Date().toISOString(),
    )
    return this.associationRepository.addAssociation(associationDto);
  }

  getAll(): Promise<ProjectUserAssociation[]> {
    return this.associationRepository.getAll();
  }


  getById(associationId: string): Promise<ProjectUserAssociation | null> {
    return this.associationRepository.getById(associationId);
  }

  getByUserId(userId: string): Promise<ProjectUserAssociation[]> {
    return this.associationRepository.getByUserId(userId);
  }

  update(
    associationDto: UpdateProjectUserAssociationDTO
  ): Promise<ProjectUserAssociation> {
    return this.associationRepository.update(associationDto);
  }

  delete(associationId: string): Promise<void> {
    return this.associationRepository.delete(associationId);
  }
  async getAssociationByUserIdAndProjectId(
    userId: string,
    projectId: string,
  ): Promise<ProjectUserAssociation | null> {
    return this.associationRepository.getAssociationByUserIdAndProjectId(
      userId,
      projectId,
    );
  }
  async getAssociationsByProjectId(projectId:string):Promise<ProjectUserAssociation[]> {
        return this.associationRepository.getAssociationsByProjectId(projectId)
  }
}
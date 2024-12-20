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
    return this.associationRepository.addAssociation(associationDto);
  }

  getAll(): Promise<ProjectUserAssociation[]> {
    return this.associationRepository.getAll();
  }

  save(associationDto: CreateProjectUserAssociationDTO): Promise<ProjectUserAssociation> {
    return this.associationRepository.save(associationDto);
  }

  getById(associationId: string): Promise<ProjectUserAssociation | null> {
    return this.associationRepository.getById(associationId);
  }

  getByUserId(userId: string): Promise<ProjectUserAssociation | null> {
    return this.associationRepository.getByUserId(userId);
  }

  update(
    association: UpdateProjectUserAssociationDTO & { associationId: string },
  ): Promise<ProjectUserAssociation> {
    return this.associationRepository.update(association);
  }

  delete(associationId: string): Promise<void> {
    return this.associationRepository.delete(associationId);
  }
}

import { ProjectUserAssociation } from "../entities/project-user-association";
import { ProjectUserAssociationRepository } from "../repositories/project-user-association-repository";

export class ProjectUserAssociationDomainService
  implements ProjectUserAssociationRepository
{
  constructor(
    private associationRepository: ProjectUserAssociationRepository,
  ) {}

  addAssociation(
    association: ProjectUserAssociation,
  ): Promise<ProjectUserAssociation> {
    return this.associationRepository.addAssociation(association);
  }

  getAll(): Promise<ProjectUserAssociation[]> {
    return this.associationRepository.getAll();
  }

  save(association: ProjectUserAssociation): Promise<ProjectUserAssociation> {
    return this.associationRepository.save(association);
  }

  getById(associationId: string): Promise<ProjectUserAssociation | null> {
    return this.associationRepository.getById(associationId);
  }

  getByUserId(userId: string): Promise<ProjectUserAssociation | null> {
    return this.associationRepository.getByUserId(userId);
  }

  update(association: ProjectUserAssociation): Promise<ProjectUserAssociation> {
    return this.associationRepository.update(association);
  }

  delete(associationId: string): Promise<void> {
    return this.associationRepository.delete(associationId);
  }
}

import { Organization } from "../entities/organization-entity";
import { OrganizationRepository } from "../repositories/organization-repository";

export class OrganizationDomainService implements OrganizationRepository {
  constructor(private organizationRepository: OrganizationRepository) {}

  addOrganization(organization: Organization): Promise<Organization> {
    return this.organizationRepository.addOrganization(organization);
  }

  getAll(): Promise<Organization[]> {
    return this.organizationRepository.getAll();
  }

  save(organization: Organization): Promise<Organization> {
    return this.organizationRepository.save(organization);
  }

  getById(organizationId: string): Promise<Organization | null> {
    return this.organizationRepository.getById(organizationId);
  }

  getByName(organizationName: string): Promise<Organization | null> {
    return this.organizationRepository.getByName(organizationName);
  }

  update(organization: Organization): Promise<Organization> {
    return this.organizationRepository.update(organization);
  }

  delete(organizationId: string): Promise<void> {
    return this.organizationRepository.delete(organizationId);
  }
}

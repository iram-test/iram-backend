import { Organization } from "../entities/organization-entity";
import { OrganizationRepository } from "../repositories/organization-repository";
import {
    CreateOrganizationDTO,
    UpdateOrganizationDTO,
  } from "../../application/dtos/organization-dto";


export class OrganizationDomainService implements OrganizationRepository {
  constructor(private organizationRepository: OrganizationRepository) {}

  addOrganization(organizationDto: CreateOrganizationDTO): Promise<Organization> {
    return this.organizationRepository.addOrganization(organizationDto);
  }

  getAll(): Promise<Organization[]> {
    return this.organizationRepository.getAll();
  }

    save(organizationDto: CreateOrganizationDTO): Promise<Organization> {
        return this.organizationRepository.save(organizationDto);
    }

  getById(organizationId: string): Promise<Organization | null> {
    return this.organizationRepository.getById(organizationId);
  }

  getByName(organizationName: string): Promise<Organization | null> {
    return this.organizationRepository.getByName(organizationName);
  }

    update(
        organization: UpdateOrganizationDTO & { organizationId: string },
    ): Promise<Organization> {
        return this.organizationRepository.update(organization);
    }

  delete(organizationId: string): Promise<void> {
    return this.organizationRepository.delete(organizationId);
  }
}

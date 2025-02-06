import { Organization } from "../entities/organization-entity";
import { OrganizationRepository } from "../repositories/organization-repository";
import {
  CreateOrganizationDTO,
  UpdateOrganizationDTO,
} from "../../application/dtos/organization-dto";

export class OrganizationDomainService implements OrganizationRepository {
  constructor(private organizationRepository: OrganizationRepository) {}

  addOrganization(
    organizationDto: CreateOrganizationDTO,
  ): Promise<Organization> {
    const organization: Organization = new Organization(
      '',
      null,
      organizationDto.name,
      organizationDto.description,
      new Date().toISOString(),
      new Date().toISOString(),
      organizationDto.projectId
    )
    return this.organizationRepository.addOrganization(organizationDto);
  }

  getAll(): Promise<Organization[]> {
    return this.organizationRepository.getAll();
  }

  getById(organizationId: string): Promise<Organization | null> {
    return this.organizationRepository.getById(organizationId);
  }

  getByName(organizationName: string): Promise<Organization | null> {
    return this.organizationRepository.getByName(organizationName);
  }

  update(
    organizationDto: UpdateOrganizationDTO
  ): Promise<Organization> {
    return this.organizationRepository.update(organizationDto);
  }

  delete(organizationId: string): Promise<void> {
    return this.organizationRepository.delete(organizationId);
  }
}
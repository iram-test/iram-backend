import { Organization } from "../entities/organization-entity";

export interface OrganizationRepository {
  addOrganization(organization: Organization): Promise<Organization>;
  getAll(): Promise<Organization[]>;
  save(organization: Organization): Promise<Organization>;
  getById(organizationId: string): Promise<Organization | null>;
  getByName(organizationName: string): Promise<Organization | null>;
  update(organization: Organization): Promise<Organization>;
  delete(organizationId: string): Promise<void>;
}

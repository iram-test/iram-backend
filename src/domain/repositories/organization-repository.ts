import { Organization } from "../entities/organization-entity";
import {
  CreateOrganizationDTO,
  UpdateOrganizationDTO,
} from "../../application/dtos/organization-dto";

export interface OrganizationRepository {
  addOrganization(organization: CreateOrganizationDTO): Promise<Organization>;
  getAll(): Promise<Organization[]>;
  save(organization: CreateOrganizationDTO): Promise<Organization>;
  getById(organizationId: string): Promise<Organization | null>;
  getByName(organizationName: string): Promise<Organization | null>;
  update(
    organization: UpdateOrganizationDTO & { organizationId: string },
  ): Promise<Organization>;
  delete(organizationId: string): Promise<void>;
}

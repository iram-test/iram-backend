import { Organization } from "../entities/organization-entity";
import {
  CreateOrganizationDTO,
  UpdateOrganizationDTO,
} from "../../application/dtos/organization-dto";

export interface OrganizationRepository {
  addOrganization(organization: CreateOrganizationDTO): Promise<Organization>;
  getAll(): Promise<Organization[]>;
  update(
    organization: UpdateOrganizationDTO
  ): Promise<Organization>;
  getById(organizationId: string): Promise<Organization | null>;
  getByName(organizationName: string): Promise<Organization | null>;
  delete(organizationId: string): Promise<void>;
}
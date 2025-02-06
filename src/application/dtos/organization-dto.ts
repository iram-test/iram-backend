export interface OrganizationDTO {
  organizationId: string;
  name: string;
  description: string;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
}

export interface CreateOrganizationDTO {
  name: string;
  description: string;
}

export interface UpdateOrganizationDTO {
  organizationId: string;
  name?: string;
  description?: string;
}
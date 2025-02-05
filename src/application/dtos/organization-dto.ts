export interface OrganizationDTO {
  organizationId: string;
  assignedUserId: string[] | null;
  name: string;
  description: string;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
  projectId: string;
}

export interface CreateOrganizationDTO {
  name: string;
  description: string;
  projectId: string;
  assignedUserId?: string[] | null;
}

export interface UpdateOrganizationDTO {
  organizationId: string;
  name?: string;
  description?: string;
  assignedUserId?: string[] | null;
}

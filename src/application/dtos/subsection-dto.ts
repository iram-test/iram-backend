export interface SubsectionDTO {
  subsectionId: string;
  name: string;
  description: string;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
}

export interface CreateSubsectionDTO {
  name: string;
  description: string;
}

export interface UpdateSubsectionDTO {
  subsectionId: string;
  name?: string;
  description?: string;
}
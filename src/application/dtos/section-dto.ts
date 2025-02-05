export interface SectionDTO {
  sectionId: string;
  subsectionId: string[] | null;
  name: string;
  description: string;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
}

export interface CreateSectionDTO {
  name: string;
  description: string;
  subsectionId?: string[] | null;
}

export interface UpdateSectionDTO {
  sectionId: string;
  name?: string;
  description?: string;
  subsectionId?: string[] | null;
}

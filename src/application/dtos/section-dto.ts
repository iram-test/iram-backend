export interface SectionDTO {
  sectionId: string;
  name: string;
  description: string;
  subsectionIds: string[] | null; // Changed subsectionId to subsectionIds
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
}

export interface CreateSectionDTO {
  name: string;
  description: string;
  subsectionIds?: string[] | null; // Changed subsectionId to subsectionIds
}

export interface UpdateSectionDTO {
  sectionId: string;
  name?: string;
  description?: string;
  subsectionIds?: string[] | null; // Changed subsectionId to subsectionIds
}
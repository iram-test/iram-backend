import { Language } from "../../domain/entities/enums/language";

export interface ProjectDTO {
  projectId: string;
  name: string;
  language: Language | null;
  location: Location | null; // Assuming Location is a defined type
  description: string;
  assignedUserId: string[] | null;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
}

export interface CreateProjectDTO {
  name: string;
  language?: Language | null;
  location?: Location | null;
  description: string;
  assignedUserId?: string[] | null;
}

export interface UpdateProjectDTO {
  projectId: string;
  name?: string;
  language?: Language | null;
  location?: Location | null;
  description?: string;
  assignedUserId?: string[] | null;
}

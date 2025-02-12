import { Language } from "../../domain/entities/enums/language";
import { Location } from "../../domain/entities/enums/location";

export interface ProjectDTO {
  projectId: string;
  name: string;
  language: Language | null;
  location: Location | null;
  description: string;
  managerId: string;
  createdAt: string;
  updatedAt: string;
  users: string[];
}

export interface CreateProjectDTO {
  name: string;
  language?: Language | null;
  location?: Location | null;
  description: string;
}

export interface UpdateProjectDTO {
  name?: string;
  language?: Language | null;
  location?: Location | null;
  description?: string;
  managerId?: string;
  users?: string[];
}

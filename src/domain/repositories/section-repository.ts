import { Section } from "../entities/section-entity";
import {
  CreateSectionDTO,
  UpdateSectionDTO,
} from "../../application/dtos/section-dto";

export interface SectionRepository {
  addSection(section: CreateSectionDTO): Promise<Section>;
  getAll(): Promise<Section[]>;
  update(section: UpdateSectionDTO): Promise<Section>;
  getById(sectionId: string): Promise<Section | null>;
  getByName(sectionName: string): Promise<Section | null>;
  delete(sectionId: string): Promise<void>;
}

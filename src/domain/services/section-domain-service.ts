import { Section } from "../entities/section-entity";
import { SectionRepository } from "../repositories/section-repository";
import {
  CreateSectionDTO,
  UpdateSectionDTO,
} from "../../application/dtos/section-dto";
import { v4 } from "uuid";

export class SectionDomainService implements SectionRepository {
  constructor(private sectionRepository: SectionRepository) {}

  async addSection(
    sectionDto: CreateSectionDTO & { projectId: string },
  ): Promise<Section> {
    const section = new Section(
      v4(),
      sectionDto.name,
      sectionDto.description,
      sectionDto.subsectionIds ?? null,
      new Date().toISOString(),
      new Date().toISOString(),
    );
    return await this.sectionRepository.addSection(sectionDto);
  }

  getAll(): Promise<Section[]> {
    return this.sectionRepository.getAll();
  }

  getById(sectionId: string): Promise<Section | null> {
    return this.sectionRepository.getById(sectionId);
  }

  getByName(sectionName: string): Promise<Section | null> {
    return this.sectionRepository.getByName(sectionName);
  }

  update(sectionDto: UpdateSectionDTO): Promise<Section> {
    return this.sectionRepository.update(sectionDto);
  }

  delete(sectionId: string): Promise<void> {
    return this.sectionRepository.delete(sectionId);
  }

  getSectionsByProjectId(projectId: string): Promise<Section[]> {
    return this.sectionRepository.getSectionsByProjectId(projectId);
  }
}

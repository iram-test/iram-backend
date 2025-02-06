import { Section } from "../entities/section-entity";
import { SectionRepository } from "../repositories/section-repository";
import {
  CreateSectionDTO,
  UpdateSectionDTO,
} from "../../application/dtos/section-dto";

export class SectionDomainService implements SectionRepository {
  constructor(private sectionRepository: SectionRepository) {}

  addSection(sectionDto: CreateSectionDTO): Promise<Section> {
      const section = new Section(
          '',
          sectionDto.subsectionId ?? null,
          sectionDto.name,
          sectionDto.description,
          new Date().toISOString(),
          new Date().toISOString(),
      );
    return this.sectionRepository.addSection(sectionDto);
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
}
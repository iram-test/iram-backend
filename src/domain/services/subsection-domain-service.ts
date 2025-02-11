import { Subsection } from "../entities/subsection-entity";
import { SubsectionRepository } from "../repositories/subsection-repository";
import {
  CreateSubsectionDTO,
  UpdateSubsectionDTO,
} from "../../application/dtos/subsection-dto";
import { v4 } from "uuid";

export class SubsectionDomainService implements SubsectionRepository {
  constructor(private subsectionRepository: SubsectionRepository) {}

  async addSubsection(
    subsectionDto: CreateSubsectionDTO & { sectionId: string },
  ): Promise<Subsection> {
    const subsection = new Subsection(
      v4(),
      subsectionDto.name,
      subsectionDto.description,
      new Date().toISOString(),
      new Date().toISOString(),
    );
    return await this.subsectionRepository.addSubsection(subsectionDto);
  }

  getAll(): Promise<Subsection[]> {
    return this.subsectionRepository.getAll();
  }

  getById(subsectionId: string): Promise<Subsection | null> {
    return this.subsectionRepository.getById(subsectionId);
  }

  getByName(subsectionName: string): Promise<Subsection | null> {
    return this.subsectionRepository.getByName(subsectionName);
  }

  update(subsectionDto: UpdateSubsectionDTO): Promise<Subsection> {
    return this.subsectionRepository.update(subsectionDto);
  }

  delete(subsectionId: string): Promise<void> {
    return this.subsectionRepository.delete(subsectionId);
  }

  getSubsectionsBySectionId(sectionId: string): Promise<Subsection[]> {
    return this.subsectionRepository.getSubsectionsBySectionId(sectionId);
  }
}

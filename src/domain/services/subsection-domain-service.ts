import { Subsection } from "../entities/subsection-entity";
import { SubsectionRepository } from "../repositories/subsection-repository";
import {
  CreateSubsectionDTO,
  UpdateSubsectionDTO,
} from "../../application/dtos/subsection-dto";

export class SubsectionDomainService implements SubsectionRepository {
  constructor(private subsectionRepository: SubsectionRepository) {}

  async addSubsection(subsectionDto: CreateSubsectionDTO): Promise<Subsection> {
    const subsection = new Subsection(
      "",
      subsectionDto.name,
      subsectionDto.description,
      new Date().toISOString(),
      new Date().toISOString(),
    );
    return await this.subsectionRepository.addSubsection(subsection);
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
}

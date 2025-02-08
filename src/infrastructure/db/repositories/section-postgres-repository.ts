import { DataSource, Repository } from "typeorm";
import { SectionEntity } from "../entities/section-entity";
import { Section } from "../../../domain/entities/section-entity";
import {
  CreateSectionDTO,
  UpdateSectionDTO,
} from "../../../application/dtos/section-dto";
import { SectionRepository } from "../../../domain/repositories/section-repository";
import { PostgresDataSource } from "../../../tools/db-connection";

export class SectionPostgresRepository implements SectionRepository {
  private repository: Repository<SectionEntity>;

  constructor(private readonly dataSource: DataSource = PostgresDataSource) {
    this.repository = this.dataSource.getRepository(SectionEntity);
  }

  async addSection(createDto: CreateSectionDTO): Promise<Section> {
    const section = this.repository.create(createDto);
    const savedSection = await this.repository.save(section);
    return this.toDomainEntity(savedSection);
  }

  async getAll(): Promise<Section[]> {
    const sections = await this.repository.find({
      relations: ["project", "testCases", "subsections"],
    });
    return sections.map((entity) => this.toDomainEntity(entity));
  }

  async update(updateDto: UpdateSectionDTO): Promise<Section> {
    const { sectionId, ...updateData } = updateDto;
    await this.repository.update(sectionId, updateData);
    const updatedSection = await this.repository.findOneOrFail({
      where: { sectionId },
      relations: ["project", "testCases", "subsections"],
    });
    return this.toDomainEntity(updatedSection);
  }

  async getById(sectionId: string): Promise<Section | null> {
    const section = await this.repository.findOne({
      where: { sectionId },
      relations: ["project", "testCases", "subsections"],
    });
    return section ? this.toDomainEntity(section) : null;
  }

  async getByName(sectionName: string): Promise<Section | null> {
    const section = await this.repository.findOne({
      where: { name: sectionName },
      relations: ["project", "testCases", "subsections"],
    });
    return section ? this.toDomainEntity(section) : null;
  }

  async delete(sectionId: string): Promise<void> {
    await this.repository.delete(sectionId);
  }

  private toDomainEntity(entity: SectionEntity): Section {
    const subsectionIds = entity.subsections
      ? entity.subsections.map((subsection) => subsection.subsectionId)
      : null;

    return new Section(
      entity.sectionId,
      entity.name,
      entity.description,
      subsectionIds,
      entity.createdAt.toISOString(),
      entity.updatedAt.toISOString(),
    );
  }
}

import { DataSource, Repository } from "typeorm";
import { SectionEntity } from "../entities/section-entity";
import { Section } from "../../../domain/entities/section-entity";
import {
  CreateSectionDTO,
  UpdateSectionDTO,
} from "../../../application/dtos/section-dto";
import { SectionRepository } from "../../../domain/repositories/section-repository";
import { PostgresDataSource } from "../../../tools/db-connection";
import { SubSectionEntity } from "../entities/subsection-entity";

export class SectionPostgresRepository implements SectionRepository {
  private repository: Repository<SectionEntity>;
  private subSectionRepository: Repository<SubSectionEntity>;

  constructor(private readonly dataSource: DataSource = PostgresDataSource) {
    this.repository = this.dataSource.getRepository(SectionEntity);
    this.subSectionRepository = this.dataSource.getRepository(SubSectionEntity);
  }

  async addSection(
    createDto: CreateSectionDTO & { projectId: string },
  ): Promise<Section> {
    const sectionEntity = this.repository.create({
      name: createDto.name,
      description: createDto.description,
      projectId: createDto.projectId,
      project: { projectId: createDto.projectId },
    });

    if (createDto.subsectionIds && createDto.subsectionIds.length > 0) {
      sectionEntity.subsections = createDto.subsectionIds.map((subsectionId) =>
        this.subSectionRepository.create({ subsectionId }),
      );
    }

    const savedSection = await this.repository.save(sectionEntity);
    return this.toDomainEntity(savedSection);
  }

  async getAll(): Promise<Section[]> {
    const sections = await this.repository.find({
      relations: ["project", "subsections"],
    });
    return sections.map((entity) => this.toDomainEntity(entity));
  }

  async update(updateDto: UpdateSectionDTO): Promise<Section> {
    const { sectionId, ...updateData } = updateDto;

    const existingSection = await this.repository.findOneOrFail({
      where: { sectionId },
      relations: ["project", "subsections"],
    });

    Object.assign(existingSection, updateData);

    const updatedSection = await this.repository.save(existingSection);
    return this.toDomainEntity(updatedSection);
  }

  async getById(sectionId: string): Promise<Section | null> {
    const section = await this.repository.findOne({
      where: { sectionId },
      relations: ["project", "subsections"],
    });
    return section ? this.toDomainEntity(section) : null;
  }

  async getByName(sectionName: string): Promise<Section | null> {
    const section = await this.repository.findOne({
      where: { name: sectionName },
      relations: ["project", "subsections"],
    });
    return section ? this.toDomainEntity(section) : null;
  }

  async delete(sectionId: string): Promise<void> {
    await this.repository.delete(sectionId);
  }

  async getSectionsByProjectId(projectId: string): Promise<Section[]> {
    const sections = await this.repository.find({
      where: { projectId: projectId },
      relations: ["project", "subsections"],
    });
    return sections.map((entity) => this.toDomainEntity(entity));
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

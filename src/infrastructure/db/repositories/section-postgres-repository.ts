import { Section } from "../../../domain/entities/section-entity";
import { SectionEntity } from "../entities/section-entity";
import { PostgresDataSource } from "../../../tools/db-connection";
import { Repository } from "typeorm";
import { SectionRepository } from "../../../domain/repositories/section-repository";
import {
  CreateSectionDTO,
  UpdateSectionDTO,
} from "../../../application/dtos/section-dto";
import { v4 } from "uuid";

export class SectionPostgresRepository implements SectionRepository {
  private repository: Repository<SectionEntity>;
  constructor() {
    this.repository = PostgresDataSource.getRepository(SectionEntity);
  }
  async addSection(sectionDto: CreateSectionDTO): Promise<Section> {
      const sectionEntity = this.repository.create({
          sectionId: v4(),
          name: sectionDto.name,
          description: sectionDto.description,
          subsectionId: sectionDto.subsectionId ?? null,
          createdAt: new Date(),
          updatedAt: new Date(),
          projectId: sectionDto.projectId,
      });
    const savedSection = await this.repository.save(sectionEntity);
    return new Section(
      savedSection.sectionId,
      savedSection.subsectionId,
      savedSection.name,
      savedSection.description,
      savedSection.createdAt.toISOString(),
      savedSection.updatedAt.toISOString(),
    );
  }
  async getAll(): Promise<Section[]> {
      const entities = await this.repository.find({
          relations: ['project'], // Eagerly load the related project
      });
    return entities.map((entity) => new Section(
      entity.sectionId,
      entity.subsectionId,
      entity.name,
      entity.description,
      entity.createdAt.toISOString(),
      entity.updatedAt.toISOString(),
    ));
  }
  async getById(sectionId: string): Promise<Section | null> {
      const entity = await this.repository.findOne({
          where: { sectionId },
          relations: ['project'], // Eagerly load the related project
      });
      if (!entity) return null;
    return new Section(
      entity.sectionId,
      entity.subsectionId,
      entity.name,
      entity.description,
      entity.createdAt.toISOString(),
      entity.updatedAt.toISOString(),
    );
  }
  async getByName(sectionName: string): Promise<Section | null> {
      const entity = await this.repository.findOne({
          where: { name: sectionName },
          relations: ['project'], // Eagerly load the related project
      });
      if (!entity) return null;
    return new Section(
      entity.sectionId,
      entity.subsectionId,
      entity.name,
      entity.description,
      entity.createdAt.toISOString(),
      entity.updatedAt.toISOString(),
    );
  }

  async update(sectionDto: UpdateSectionDTO): Promise<Section> {
      const sectionEntity = await this.repository.findOneBy({ sectionId: sectionDto.sectionId });

      if (!sectionEntity) {
          throw new Error(`Section with id: ${sectionDto.sectionId} was not found`);
      }

      sectionEntity.name = sectionDto.name ?? sectionEntity.name;
      sectionEntity.description = sectionDto.description ?? sectionEntity.description;
      sectionEntity.subsectionId = sectionDto.subsectionId ?? sectionEntity.subsectionId;
      sectionEntity.updatedAt = new Date();

    const updatedSection = await this.repository.save(sectionEntity);
    return new Section(
      updatedSection.sectionId,
      updatedSection.subsectionId,
      updatedSection.name,
      updatedSection.description,
      updatedSection.createdAt.toISOString(),
      updatedSection.updatedAt.toISOString(),
    );
  }

  async delete(sectionId: string): Promise<void> {
    await this.repository.delete({ sectionId });
  }
}
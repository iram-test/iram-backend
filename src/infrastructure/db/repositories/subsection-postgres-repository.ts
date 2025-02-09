import { DataSource, Repository } from "typeorm";
import { SubSectionEntity } from "../entities/subsection-entity";
import { Subsection } from "../../../domain/entities/subsection-entity";
import {
  CreateSubsectionDTO,
  UpdateSubsectionDTO,
} from "../../../application/dtos/subsection-dto";
import { SubsectionRepository } from "../../../domain/repositories/subsection-repository";
import { PostgresDataSource } from "../../../tools/db-connection";

export class SubsectionPostgresRepository implements SubsectionRepository {
  private repository: Repository<SubSectionEntity>;

  constructor(private readonly dataSource: DataSource = PostgresDataSource) {
    this.repository = this.dataSource.getRepository(SubSectionEntity);
  }

  async addSubsection(createDto: CreateSubsectionDTO): Promise<Subsection> {
    const subsection = this.repository.create(createDto);
    const savedSubsection = await this.repository.save(subsection);
    return this.toDomainEntity(savedSubsection);
  }

  async getAll(): Promise<Subsection[]> {
    const subsections = await this.repository.find({
      relations: ["section", "testCases"],
    });
    return subsections.map((entity) => this.toDomainEntity(entity));
  }

  async update(updateDto: UpdateSubsectionDTO): Promise<Subsection> {
    const { subsectionId, ...updateData } = updateDto;
    await this.repository.update(subsectionId, updateData);
    const updatedSubsection = await this.repository.findOneOrFail({
      where: { subsectionId },
      relations: ["section", "testCases"],
    });
    return this.toDomainEntity(updatedSubsection);
  }

  async getById(subsectionId: string): Promise<Subsection | null> {
    const subsection = await this.repository.findOne({
      where: { subsectionId },
      relations: ["section", "testCases"],
    });
    return subsection ? this.toDomainEntity(subsection) : null;
  }

  async getByName(subsectionName: string): Promise<Subsection | null> {
    const subsection = await this.repository.findOne({
      where: { name: subsectionName },
      relations: ["section", "testCases"],
    });
    return subsection ? this.toDomainEntity(subsection) : null;
  }

  async delete(subsectionId: string): Promise<void> {
    await this.repository.delete(subsectionId);
  }

  async getSubsectionsBySectionId(sectionId: string): Promise<Subsection[]> {
    const subsections = await this.repository.find({
      where: { section: { sectionId: sectionId } },
      relations: ["section", "testCases"],
    });
    return subsections.map((entity) => this.toDomainEntity(entity));
  }

  private toDomainEntity(entity: SubSectionEntity): Subsection {
    return new Subsection(
      entity.subsectionId,
      entity.name,
      entity.description,
      entity.createdAt.toISOString(),
      entity.updatedAt.toISOString(),
    );
  }
}

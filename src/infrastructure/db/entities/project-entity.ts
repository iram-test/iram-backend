import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { ProjectUserAssociationEntity } from "./project-user-association-entity";
import { SectionEntity } from "./section-entity";
import { OrganizationEntity } from "./organization-entity";
import { TestCaseEntity } from "./test-case-entity";
import { Language } from "../../../domain/entities/enums/language";

@Entity()
export class ProjectEntity {
  @PrimaryGeneratedColumn("uuid")
  projectId!: string;

  @Column()
  name!: string;

  @Column({ type: "enum", enum: Language, nullable: true })
  language!: Language | null;

  @Column({ type: "jsonb", nullable: true })
  location!: Location | null;

  @Column()
  description!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(
    () => ProjectUserAssociationEntity,
    (projectUserAssociation) => projectUserAssociation.project,
  )
  userAssociations?: ProjectUserAssociationEntity[];

  @OneToMany(
    () => SectionEntity,
    (folder) => folder.project,
  )
  sections?: SectionEntity[];

  @OneToMany(
    () => OrganizationEntity,
    (organization) => organization.project,
  )
  organizations?: OrganizationEntity[];

  @OneToMany(
    () => TestCaseEntity,
    (testCase) => testCase.project,
  )
  testCases?: TestCaseEntity[];
}

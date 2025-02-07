import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { ProjectEntity } from "./project-entity";
import { TestCaseEntity } from "./test-case-entity";
import { SubSectionEntity } from "./subsection-entity";

@Entity()
export class SectionEntity {
  @PrimaryGeneratedColumn("uuid")
  sectionId!: string;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToOne(
    () => ProjectEntity,
    (project) => project.sections,
  )
  @JoinColumn({ name: "projectId" })
  project!: ProjectEntity;

  @OneToMany(
    () => TestCaseEntity,
    (testCase) => testCase.section,
  )
  testCases?: TestCaseEntity[];

  @OneToMany(
    () => SubSectionEntity,
    (subsection) => subsection.section,
  )
  subsections?: SubSectionEntity[];
}
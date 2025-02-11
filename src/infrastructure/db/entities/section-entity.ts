import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { SubSectionEntity } from "./subsection-entity";
import { ProjectEntity } from "./project-entity";
import { TestCaseEntity } from "./test-case-entity";

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

  @OneToMany(
    () => SubSectionEntity,
    (subsection) => subsection.section,
    { cascade: true },
  )
  subsections?: SubSectionEntity[];

  @ManyToOne(
    () => ProjectEntity,
    (project) => project.sections,
    { onDelete: "CASCADE" },
  )
  @JoinColumn({ name: "projectId" })
  project!: ProjectEntity;

  @Column()
  projectId!: string;

  @OneToMany(
    () => TestCaseEntity,
    (testCase) => testCase.section,
  )
  testCases?: TestCaseEntity[];
}

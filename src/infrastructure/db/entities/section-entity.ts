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
import { SubSectionEntity } from "./subsection-entity";
import { TestCaseEntity } from "./test-case-entity";
import { ProjectEntity } from "./project-entity";

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
    () => TestCaseEntity,
    (testCase) => testCase.sections,
  )
  @JoinColumn({ name: "testCaseId" })
  testCase!: TestCaseEntity;

  @OneToMany(
    () => SubSectionEntity,
    (subsection) => subsection.section,
  )
  subsections?: SubSectionEntity[];
  @ManyToOne(
    () => ProjectEntity,
    (project) => project.sections,
    { onDelete: "CASCADE" },
  )
  @JoinColumn({ name: "projectId" })
  project!: ProjectEntity;
}

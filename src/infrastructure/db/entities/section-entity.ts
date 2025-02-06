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
import { TestReportEntity } from "./test-report-entity";

@Entity()
export class SectionEntity {
  @PrimaryGeneratedColumn("uuid")
  sectionId!: string;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column({ type: "text", nullable: true })
  subsectionId!: string[] | null;

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
    () => TestReportEntity,
    (testReport) => testReport.section,
  )
  testReports?: TestReportEntity[];
}
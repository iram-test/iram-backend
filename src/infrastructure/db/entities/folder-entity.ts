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
import { Project } from "./project-entity";
import { TestCase } from "./test-case-entity";
import { TestReport } from "./test-report-entity";

@Entity()
export class Folder {
  @PrimaryGeneratedColumn("uuid")
  folderId!: string;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @Column()
  projectId!: string;

  @ManyToOne(
    () => Project,
    (project) => project.folders,
  )
  @JoinColumn({ name: "projectId" })
  project?: Project;

  @OneToMany(
    () => TestCase,
    (testCase) => testCase.folder,
  )
  testCases?: TestCase[];

  @OneToMany(
    () => TestReport,
    (testReport) => testReport.folder,
  )
  testReports?: TestReport[];
}

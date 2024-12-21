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
export class FolderEntity {
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
    () => ProjectEntity,
    (project) => project.folders,
  )
  @JoinColumn({ name: "projectId" })
  project?: ProjectEntity;

  @OneToMany(
    () => TestCaseEntity,
    (testCase) => testCase.folder,
  )
  testCases?: TestCaseEntity[];

  @OneToMany(
    () => TestReportEntity,
    (testReport) => testReport.folder,
  )
  testReports?: TestReportEntity[];
}

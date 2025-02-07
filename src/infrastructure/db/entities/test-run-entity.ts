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
import { TestCaseEntity } from "./test-case-entity";
import { Milestone } from "../../../domain/entities/milestone-entity";
import { MilestoneEntity } from "./milestone-entity";
import { ProjectEntity } from "./project-entity";
import { TestReportEntity } from './test-report-entity';

@Entity()
export class TestRunEntity {
  @PrimaryGeneratedColumn("uuid")
  testRunId!: string;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(
    () => TestCaseEntity,
    (testCase) => testCase.testRun,
  )
  testCase?: TestCaseEntity[];

  @OneToMany(
    () => MilestoneEntity,
    (milestone) => milestone.testRun,
  )
  milestones?: MilestoneEntity[];

  @ManyToOne(
    () => ProjectEntity,
    (project) => project.testRuns,
  )
  @JoinColumn({ name: "projectId" })
  project!: ProjectEntity;

  @ManyToOne(
    () => TestReportEntity,
    (testReport) => testReport.testRuns,
  )
  @JoinColumn({ name: "testReportId" })
  testReport!: TestReportEntity;
}
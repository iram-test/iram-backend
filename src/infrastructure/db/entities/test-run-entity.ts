import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { TestCaseEntity } from "./test-case-entity";
import { MilestoneEntity } from "./milestone-entity";
import { ProjectEntity } from "./project-entity";
import { TestReportEntity } from "./test-report-entity";
import { UserEntity } from "./user-entity";

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

  @ManyToMany(
    () => TestCaseEntity,
    (testCase) => testCase.testRuns,
  )
  @JoinTable()
  testCases?: TestCaseEntity[];

  @ManyToOne(
    () => MilestoneEntity,
    (milestone) => milestone.testRuns,
    {
      nullable: true,
    },
  )
  @JoinColumn({ name: "milestoneId" })
  milestone?: MilestoneEntity;

  @ManyToOne(
    () => ProjectEntity,
    (project) => project.testRuns,
    { eager: true },
  )
  @JoinColumn({ name: "projectId" })
  project!: ProjectEntity;

  @ManyToOne(
    () => TestReportEntity,
    (testReport) => testReport.testRuns,
    {
      nullable: true,
    },
  )
  @JoinColumn({ name: "testReportId" })
  testReport?: TestReportEntity;

  @ManyToOne(
    () => UserEntity,
    (user) => user.testRuns,
    {
      nullable: true,
      onDelete: "SET NULL",
    },
  )
  @JoinColumn({ name: "assignedUserId" })
  assignedUser?: UserEntity;
}

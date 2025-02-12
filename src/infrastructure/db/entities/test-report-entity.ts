import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { MilestoneEntity } from "./milestone-entity";
import { UserEntity } from "./user-entity";
import { SectionEntity } from "./section-entity";
import { ProjectEntity } from "./project-entity";
import { TestRunEntity } from "./test-run-entity";

@Entity()
export class TestReportEntity {
  @PrimaryGeneratedColumn("uuid")
  testReportId!: string;

  @Column()
  name!: string;

  @Column({ type: "text", nullable: true })
  reference!: string | null;

  @Column()
  description!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToOne(
    () => ProjectEntity,
    (project) => project.testReports,
  )
  @JoinColumn({ name: "projectId" })
  project!: ProjectEntity;

  @ManyToOne(
    () => UserEntity,
    (user) => user.testReports,
    { nullable: true, onDelete: "SET NULL" },
  )
  @JoinColumn({ name: "assignedUserId" })
  assignedUser?: UserEntity | null;

  @OneToMany(
    () => TestRunEntity,
    (testRun) => testRun.testReport,
  )
  testRuns?: TestRunEntity[];

  @OneToMany(
    () => MilestoneEntity,
    (milestone) => milestone.testReport,
  )
  milestones?: MilestoneEntity[];
}

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
  OneToMany,
} from "typeorm";
import { MilestoneStatus } from "../../../domain/entities/enums/milestone-status";
import { ProjectEntity } from "./project-entity";
import { TestReportEntity } from "./test-report-entity";
import { TestRunEntity } from "./test-run-entity";

@Entity()
export class MilestoneEntity {
  @PrimaryGeneratedColumn("uuid")
  milestoneID!: string;

  @Column()
  name!: string;

  @Column({ nullable: true })
  parentId!: string | null;

  @Column()
  description!: string;

  @Column({ type: "date", nullable: true })
  startDate!: string | null;

  @Column({ type: "date", nullable: true })
  endDate!: string | null;

  @Column({ type: "enum", enum: MilestoneStatus })
  status!: MilestoneStatus;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToOne(
    () => ProjectEntity,
    (project) => project.milestones, // змінено на milestones
  )
  @JoinColumn({ name: "projectId" })
  project!: ProjectEntity;

  @OneToOne(() => MilestoneEntity, { nullable: true, onDelete: "SET NULL" })
  @JoinColumn({ name: "parentId" })
  parentMilestone!: MilestoneEntity | null;

  @ManyToOne(
    () => TestReportEntity,
    (testReport) => testReport.milestones,
    { nullable: true }
  )
  @JoinColumn({ name: "testReportId" })
  testReport?: TestReportEntity | null;

    @ManyToOne(
    () => TestRunEntity,
    (testRun) => testRun.milestones,
  )
  @JoinColumn({ name: "testRunId" })
  testRun!: TestRunEntity;
}
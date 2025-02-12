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
import { SectionEntity } from "./section-entity";
import { TestCaseEntity } from "./test-case-entity";
import { Language } from "../../../domain/entities/enums/language";
import { MilestoneEntity } from "./milestone-entity";
import { TestReportEntity } from "./test-report-entity";
import { TestRunEntity } from "./test-run-entity";
import { UserEntity } from "./user-entity";
import { Location } from "../../../domain/entities/enums/location";

@Entity()
export class ProjectEntity {
  @PrimaryGeneratedColumn("uuid")
  projectId!: string;

  @Column()
  name!: string;

  @Column({ type: "enum", enum: Language, nullable: true })
  language!: Language | null;

  @Column({ type: "enum", enum: Location, nullable: true })
  location!: Location | null;

  @Column()
  description!: string;

  @Column({ nullable: true })
  managerId!: string | null;

  @ManyToOne(() => UserEntity, { onDelete: "SET NULL" })
  @JoinColumn({ name: "managerId" })
  manager?: UserEntity;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @Column("text", { array: true, default: [] })
  users!: string[];

  @OneToMany(
    () => SectionEntity,
    (section) => section.project,
  )
  sections?: SectionEntity[];

  @OneToMany(
    () => TestCaseEntity,
    (testCase) => testCase.project,
  )
  testCases?: TestCaseEntity[];

  @OneToMany(
    () => MilestoneEntity,
    (milestone) => milestone.project,
  )
  milestones?: MilestoneEntity[];

  @OneToMany(
    () => TestReportEntity,
    (testReport) => testReport.project,
  )
  testReports?: TestReportEntity[];

  @OneToMany(
    () => TestRunEntity,
    (testRun) => testRun.project,
  )
  testRuns?: TestRunEntity[];
}

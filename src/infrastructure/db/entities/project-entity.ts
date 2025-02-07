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
import { OrganizationEntity } from './organization-entity';
import { SectionEntity } from "./section-entity";
import { TestCaseEntity } from "./test-case-entity";
import { Language } from "../../../domain/entities/enums/language";
import { MilestoneEntity } from './milestone-entity';
import { TestReportEntity } from './test-report-entity';
import { TestRunEntity } from './test-run-entity';
import { UserEntity } from './user-entity';

@Entity()
export class ProjectEntity {
  @PrimaryGeneratedColumn("uuid")
  projectId!: string;

  @Column()
  name!: string;

  @Column({ type: "enum", enum: Language, nullable: true })
  language!: Language | null;

  @Column({ type: "jsonb", nullable: true })
  location!: Location | null;

  @Column()
  description!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @Column({ nullable: true })
  assignedUserId!: string | null;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: "assignedUserId" })
  assignedUser?: UserEntity;

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

  // багато проектів може належати одній організації
  @ManyToOne(
      () => OrganizationEntity,
      (organization) => organization.projects, // змінено на projects
    )
    @JoinColumn({ name: "organizationId" })
    organization!: OrganizationEntity;

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
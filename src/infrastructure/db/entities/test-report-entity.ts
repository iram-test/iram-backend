import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";
import { MilestoneEntity } from "./milestone-entity";
import { UserEntity } from "./user-entity";
import { SectionEntity } from "./section-entity";

@Entity()
export class TestReportEntity {
  @PrimaryGeneratedColumn("uuid")
  testReportId!: string;

  @Column()
  name!: string;

  @Column({ type: "text", nullable: true })
  reference!: string | null;

  @Column({ nullable: true })
  milestoneId!: string | null;

  @Column()
  description!: string;

  @Column({ nullable: true })
  assignedUserId!: string | null;

  @Column({ type: "text", array: true })
  testCaseId!: string[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToOne(
    () => MilestoneEntity,
    (milestone) => milestone.testReports,
    { nullable: true }
  )
  @JoinColumn({ name: "milestoneId" })
  milestone?: MilestoneEntity | null;

  @ManyToOne(
    () => UserEntity,
    (user) => user.testReports,
    { nullable: true }
  )
  @JoinColumn({ name: "assignedUserId" })
  assignedUser?: UserEntity | null;

  @ManyToOne(
    () => SectionEntity,
    (section) => section.testReports,
    { nullable: true }
  )
  @JoinColumn({ name: "sectionId" })
  section?: SectionEntity | null;
}
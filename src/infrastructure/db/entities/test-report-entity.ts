import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Milestone } from "./milestone-entity";
import { User } from "./user-entity";
import { Folder } from "./folder-entity";

@Entity()
export class TestReport {
  @PrimaryGeneratedColumn("uuid")
  testReportId!: string;

  @Column()
  name!: string;

  @Column({ nullable: true })
  reference!: string | null;

  @Column({ nullable: true })
  milestoneId!: string | null;

  @Column()
  description!: string;

  @Column({ nullable: true })
  assignedUserId!: string | null;

  @Column({ type: "text", array: true })
  testCaseId!: string[];

  @Column({ nullable: true })
  folderId!: string | null;

  @ManyToOne(
    () => Milestone,
    (milestone) => milestone.testReports,
  )
  @JoinColumn({ name: "milestoneId" })
  milestone?: Milestone;

  @ManyToOne(
    () => User,
    (user) => user.testReports,
  )
  @JoinColumn({ name: "assignedUserId" })
  assignedUser?: User;

  @ManyToOne(
    () => Folder,
    (folder) => folder.testReports,
  )
  @JoinColumn({ name: "folderId" })
  folder?: Folder;
}

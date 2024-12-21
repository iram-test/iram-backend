import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { MilestoneEntity } from "./milestone-entity";
import { UserEntity } from "./user-entity";
import { FolderEntity } from "./folder-entity";

@Entity()
export class TestReportEntity {
  @PrimaryGeneratedColumn("uuid")
  testReportId!: string;

  @Column()
  name!: string;

  @Column({
    type: "text", // Use 'text' to store JSON string
    nullable: true,
    transformer: {
      to: (value: any) => (value ? JSON.stringify(value) : null),
      from: (value: string) => (value ? JSON.parse(value) : null),
    },
  })
  reference!: any | null;

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
    () => MilestoneEntity,
    (milestone) => milestone.testReports,
  )
  @JoinColumn({ name: "milestoneId" })
  milestone?: MilestoneEntity;

  @ManyToOne(
    () => UserEntity,
    (user) => user.testReports,
  )
  @JoinColumn({ name: "assignedUserId" })
  assignedUser?: UserEntity;

  @ManyToOne(
    () => FolderEntity,
    (folder) => folder.testReports,
  )
  @JoinColumn({ name: "folderId" })
  folder?: FolderEntity;
}

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { MilestoneStatus } from "../../../domain/entities/enums/milestone-status";
import { TestReportEntity } from "./test-report-entity";

@Entity()
export class MilestoneEntity {
  @PrimaryGeneratedColumn("uuid")
  milestoneID!: string;

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
  parentId!: any | null;

  @Column()
  description!: string;

  @Column({ type: "date", nullable: true })
  startDate!: Date | null;

  @Column({ type: "date", nullable: true })
  endDate!: Date | null;

  @Column({ type: "enum", enum: MilestoneStatus })
  status!: MilestoneStatus;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(
    () => TestReportEntity,
    (testReport) => testReport.milestone,
  )
  testReports?: TestReportEntity[];
}

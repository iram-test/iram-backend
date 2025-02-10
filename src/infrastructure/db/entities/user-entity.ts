import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { TestCaseEntity } from "./test-case-entity";
import { TestReportEntity } from "./test-report-entity";
import { UserRole } from "../../../domain/entities/enums/user-role";
import { TestRunEntity } from "./test-run-entity";

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn("uuid")
  userId!: string;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  username!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({ default: false })
  isVerified!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @Column({ type: "timestamp", nullable: true })
  lastLoginAt!: string | null;

  @Column({ type: "text", nullable: true })
  refreshToken!: string | null;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.USER,
  })
  role!: UserRole;

  @OneToMany(
    () => TestCaseEntity,
    (testCase) => testCase.assignedUser,
  )
  testCases?: TestCaseEntity[];

  @OneToMany(
    () => TestReportEntity,
    (testReport) => testReport.assignedUser,
  )
  testReports?: TestReportEntity[];

  @OneToMany(
    () => TestRunEntity,
    (testRun) => testRun.assignedUser,
  )
  testRuns?: TestRunEntity[];
}

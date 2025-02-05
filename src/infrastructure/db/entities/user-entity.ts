import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { ProjectUserAssociationEntity } from "./project-user-association-entity";
import { OrganizationUserAssociationEntity } from "./organization-user-association-entity";
import { TestCaseEntity } from "./test-case-entity";
import { TestReportEntity } from "./test-report-entity";
import { TestRunEntity } from "./test-run-entity";
import { UserRole } from "../../../domain/entities/enums/user-role";

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

  @CreateDateColumn({
    name: "created_at",
    nullable: false,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt!: string;

  @UpdateDateColumn({
    name: "updated_at",
    nullable: false,
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedAt!: string;

  @Column({
    name: "last_login_at",
    nullable: false,
    default: () => "CURRENT_TIMESTAMP",
  })
  lastLoginAt!: string;

  @Column({
    type: "text",
    nullable: true,
    transformer: {
      to: (value: any) => (value ? JSON.stringify(value) : null),
      from: (value: string) => (value ? JSON.parse(value) : null),
    },
  })
  refreshToken!: any | null;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.USER,
  })
  role!: UserRole;

  @OneToMany(
    () => ProjectUserAssociationEntity,
    (projectUserAssociation) => projectUserAssociation.user,
  )
  projectAssociations?: ProjectUserAssociationEntity[];

  @OneToMany(
    () => OrganizationUserAssociationEntity,
    (organizationUserAssociation) => organizationUserAssociation.user,
  )
  organizationAssociations?: OrganizationUserAssociationEntity[];

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
    (testRun) => testRun.assignedTo,
  )
  testRuns?: TestRunEntity[];
}

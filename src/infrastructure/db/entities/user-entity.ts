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

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @Column({ nullable: true })
  lastLoginAt!: Date | null;

  @Column({ nullable: true })
  refreshToken!: string | null;

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
}
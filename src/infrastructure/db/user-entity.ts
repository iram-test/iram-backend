import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ProjectUserAssociation } from './project-user-association-entity';
import { OrganizationUserAssociation } from './organization-user-association-entity';
import { TestCase } from './test-case-entity';
import { TestReport } from './test-report-entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
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

    @Column()
    country!: string;

    @Column()
    isVerified!: boolean;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

  @Column({ type: 'date'})
  lastLoginAt!: Date;


    @OneToMany(() => ProjectUserAssociation, projectUserAssociation => projectUserAssociation.user)
    projectAssociations?: ProjectUserAssociation[];

  @OneToMany(() => OrganizationUserAssociation, organizationUserAssociation => organizationUserAssociation.user)
  organizationAssociations?: OrganizationUserAssociation[];

  @OneToMany(() => TestCase, testCase => testCase.assignedUser)
  testCases?: TestCase[];

  @OneToMany(() => TestReport, testReport => testReport.assignedUser)
   testReports?: TestReport[]
}
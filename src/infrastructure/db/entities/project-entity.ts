import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { ProjectUserAssociationEntity } from "./project-user-association-entity";
import { FolderEntity } from "./folder-entity";
import { OrganizationEntity } from "./organization-entity";
import { TestCaseEntity } from "./test-case-entity";

@Entity()
export class ProjectEntity {
  @PrimaryGeneratedColumn("uuid")
  projectId!: string;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(
    () => ProjectUserAssociationEntity,
    (projectUserAssociation) => projectUserAssociation.project,
  )
  userAssociations?: ProjectUserAssociationEntity[];

  @OneToMany(
    () => FolderEntity,
    (folder) => folder.project,
  )
  folders?: FolderEntity[];

  @OneToMany(
    () => OrganizationEntity,
    (organization) => organization.project,
  )
  organizations?: OrganizationEntity[];

  @OneToMany(
    () => TestCaseEntity,
    (testCase) => testCase.project,
  )
  testCases?: TestCaseEntity[];
}

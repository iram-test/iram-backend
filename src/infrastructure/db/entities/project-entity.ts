import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { ProjectUserAssociation } from "./project-user-association-entity";
import { Folder } from "./folder-entity";
import { Organization } from "./organization-entity";
import { TestCase } from "./test-case-entity";

@Entity()
export class Project {
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
    () => ProjectUserAssociation,
    (projectUserAssociation) => projectUserAssociation.project,
  )
  userAssociations?: ProjectUserAssociation[];

  @OneToMany(
    () => Folder,
    (folder) => folder.project,
  )
  folders?: Folder[];

  @OneToMany(
    () => Organization,
    (organization) => organization.project,
  )
  organizations?: Organization[];

  @OneToMany(
    () => TestCase,
    (testCase) => testCase.project,
  )
  testCases?: TestCase[];
}

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { ProjectEntity } from "./project-entity";
import { OrganizationUserAssociationEntity } from "./organization-user-association-entity";

@Entity()
export class OrganizationEntity {
  @PrimaryGeneratedColumn("uuid")
  organizationId!: string;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @Column()
  projectId!: string;

  @ManyToOne(
    () => ProjectEntity,
    (project) => project.organizations,
  )
  @JoinColumn({ name: "projectId" })
  project!: ProjectEntity; // project is not optional

  @OneToMany(
    () => OrganizationUserAssociationEntity,
    (organizationUserAssociation) => organizationUserAssociation.organization,
  )
  userAssociations?: OrganizationUserAssociationEntity[];
}

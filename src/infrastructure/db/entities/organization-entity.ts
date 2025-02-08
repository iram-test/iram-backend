import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { OrganizationUserAssociationEntity } from "./organization-user-association-entity";
import { ProjectEntity } from "./project-entity";

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

  @OneToMany(
    () => OrganizationUserAssociationEntity,
    (organizationUserAssociation) => organizationUserAssociation.organization,
  )
  userAssociations?: OrganizationUserAssociationEntity[];

  @OneToMany(
    () => ProjectEntity,
    (project) => project.organization,
  )
  projects?: ProjectEntity[];
}

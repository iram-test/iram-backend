import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { ProjectRole } from "../../../domain/entities/enums/project-role";
import { UserEntity } from "./user-entity";
import { ProjectEntity } from "./project-entity";

@Entity()
export class ProjectUserAssociationEntity {
  @PrimaryGeneratedColumn("uuid")
  associationId!: string;

  @Column()
  projectId!: string;

  @Column()
  userId!: string;

  @Column({ type: "enum", enum: ProjectRole })
  role!: ProjectRole;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToOne(
    () => UserEntity,
    (user) => user.projectAssociations,
  )
  @JoinColumn({ name: "userId" })
  user?: UserEntity;

  @ManyToOne(
    () => ProjectEntity,
    (project) => project.userAssociations,
  )
  @JoinColumn({ name: "projectId" })
  project?: ProjectEntity;
}

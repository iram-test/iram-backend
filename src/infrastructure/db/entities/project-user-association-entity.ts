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
import { User } from "./user-entity";
import { Project } from "./project-entity";

@Entity()
export class ProjectUserAssociation {
  @PrimaryGeneratedColumn("uuid")
  associationId!: string;

  @Column()
  projectId!: string;

  @Column()
  userId!: string;

  @Column({ type: "enum", enum: ProjectRole })
  projectRole!: ProjectRole;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToOne(
    () => User,
    (user) => user.projectAssociations,
  )
  @JoinColumn({ name: "userId" })
  user?: User;

  @ManyToOne(
    () => Project,
    (project) => project.userAssociations,
  )
  @JoinColumn({ name: "projectId" })
  project?: Project;
}

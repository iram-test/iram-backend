import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from "typeorm";
import { UserRole } from "../../../domain/entities/enums/user-role";
import { UserPermission } from "../../../domain/entities/enums/user-permission";
import { UserEntity } from "./user-entity";
import { OrganizationEntity } from "./organization-entity";

@Entity()
export class OrganizationUserAssociationEntity {
  @PrimaryGeneratedColumn("uuid")
  associationId!: string;

  @Column()
  userId!: string;

  @Column()
  organizationId!: string;

  @Column({ type: "enum", enum: UserRole })
  role!: UserRole;

  @Column({ type: "enum", enum: UserPermission })
  permission!: UserPermission;

  @CreateDateColumn()
  assignedAt!: Date;

  @ManyToOne(
    () => UserEntity,
    (user) => user.organizationAssociations,
  )
  @JoinColumn({ name: "userId" })
  user?: UserEntity;

  @ManyToOne(
    () => OrganizationEntity,
    (organization) => organization.userAssociations,
  )
  @JoinColumn({ name: "organizationId" })
  organization?: OrganizationEntity;
}

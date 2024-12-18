import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { UserRole } from '../../domain/entities/enums/user-role';
import { UserPermission } from '../../domain/entities/enums/user-permission';
import { User } from './user-entity';
import { Organization } from './organization-entity';


@Entity()
export class OrganizationUserAssociation {
    @PrimaryGeneratedColumn('uuid')
    associationId!: string;

    @Column()
    userId!: string;

    @Column()
    organizationId!: string;

    @Column({ type: 'enum', enum: UserRole })
    role!: UserRole;

  @Column({ type: 'enum', enum: UserPermission })
  permission!: UserPermission;

    @CreateDateColumn()
    assignedAt!: Date;

   @ManyToOne(() => User, user => user.organizationAssociations)
    @JoinColumn({ name: "userId" })
    user?: User;

  @ManyToOne(() => Organization, organization => organization.userAssociations)
  @JoinColumn({name: "organizationId"})
   organization?: Organization
}
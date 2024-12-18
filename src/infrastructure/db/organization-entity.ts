import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Project } from './project-entity';
import { OrganizationUserAssociation } from './organization-user-association-entity';

@Entity()
export class Organization {
    @PrimaryGeneratedColumn('uuid')
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

   @ManyToOne(() => Project, project => project.organizations)
  @JoinColumn({ name: "projectId" })
   project?: Project;

   @OneToMany(() => OrganizationUserAssociation, organizationUserAssociation => organizationUserAssociation.organization)
   userAssociations?: OrganizationUserAssociation[]
}

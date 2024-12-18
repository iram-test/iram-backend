import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Priority } from '../../domain/entities/enums/project-priority';
import { Status } from '../../domain/entities/enums/project-status';
import { TemplateType } from '../../domain/entities/enums/template-type';
import { TestType } from '../../domain/entities/enums/test-type';
import { Project } from './project-entity';
import { Step } from './step-entity';
import { User } from './user-entity';
import { Folder } from './folder-entity';

@Entity()
export class TestCase {
    @PrimaryGeneratedColumn('uuid')
    testCaseId!: string;

    @Column()
    title!: string;

    @Column()
    collection!: string;

    @Column()
    folderId!: string;

     @Column({ type: 'enum', enum: TemplateType })
    templateType!: TemplateType;

    @Column({ type: 'enum', enum: TestType })
    testType!: TestType;

    @Column({ type: 'enum', enum: Priority })
    priority!: Priority;

    @Column()
    description!: string;

    @Column()
    timeEstimation!: string;


    @Column({ nullable: true })
    reference!: string | null;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

      @Column()
     projectId!: string;


     @Column({ type: 'enum', enum: Status })
    status!: Status;


     @Column()
      assignedUserId!: string;

    @Column()
    comment!: string;

    @Column()
    elapsedTime!: string;

     @Column()
      defects!: string;

      @Column()
      version!: string;


     @ManyToOne(() => Project, project => project.testCases)
     @JoinColumn({ name: "projectId" })
      project?: Project

    @ManyToOne(() => User, user => user.testCases)
     @JoinColumn({ name: "assignedUserId" })
     assignedUser?: User;


     @ManyToOne(() => Folder, folder => folder.testCases)
     @JoinColumn({ name: "folderId" })
      folder?: Folder;

    @OneToMany(() => Step, step => step.testCase)
     steps?: Step[]

}
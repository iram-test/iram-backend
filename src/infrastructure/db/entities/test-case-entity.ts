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
import { Priority } from "../../../domain/entities/enums/project-priority";
import { Status } from "../../../domain/entities/enums/status";
import { TemplateType } from "../../../domain/entities/enums/template-type";
import { TestType } from "../../../domain/entities/enums/test-type";
import { ProjectEntity } from "./project-entity";
import { StepEntity } from "./step-entity";
import { UserEntity } from "./user-entity";
import { FolderEntity } from "./folder-entity";

@Entity()
export class TestCaseEntity {
  @PrimaryGeneratedColumn("uuid")
  testCaseId!: string;

  @Column()
  title!: string;

  @Column()
  collection!: string;

  @Column()
  folderId!: string;

  @Column({ type: "enum", enum: TemplateType })
  templateType!: TemplateType;

  @Column({ type: "enum", enum: TestType })
  testType!: TestType;

  @Column({ type: "enum", enum: Priority })
  priority!: Priority;

  @Column()
  description!: string;

  @Column()
  timeEstimation!: string;

  @Column({
    type: "text", // Use 'text' to store JSON string
    nullable: true,
    transformer: {
      to: (value: any) => (value ? JSON.stringify(value) : null),
      from: (value: string) => (value ? JSON.parse(value) : null),
    },
  })
  reference!: any | null;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @Column()
  projectId!: string;

  @Column({ type: "enum", enum: Status })
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

  @ManyToOne(
    () => ProjectEntity,
    (project) => project.testCases,
  )
  @JoinColumn({ name: "projectId" })
  project?: ProjectEntity;

  @ManyToOne(
    () => UserEntity,
    (user) => user.testCases,
  )
  @JoinColumn({ name: "assignedUserId" })
  assignedUser?: UserEntity;

  @ManyToOne(
    () => FolderEntity,
    (folder) => folder.testCases,
  )
  @JoinColumn({ name: "folderId" })
  folder?: FolderEntity;

  @OneToMany(
    () => StepEntity,
    (step) => step.testCase,
  )
  steps?: StepEntity[];
}

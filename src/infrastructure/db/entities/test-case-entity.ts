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
import { TemplateType } from "../../../domain/entities/enums/template-type";
import { TestType } from "../../../domain/entities/enums/test-type";
import { ProjectEntity } from "./project-entity";
import { StepEntity } from "./step-entity";
import { UserEntity } from "./user-entity";
import { SectionEntity } from "./section-entity";
import { TestRunEntity } from "./test-run-entity";
import { Status } from "../../../domain/entities/enums/status";

@Entity()
export class TestCaseEntity {
  @PrimaryGeneratedColumn("uuid")
  testCaseId!: string;

  @Column()
  title!: string;

  @Column()
  projectId!: string;

  @Column({ type: "enum", enum: TemplateType })
  templateType!: TemplateType;

  @Column({ type: "enum", enum: TestType })
  testType!: TestType;

  @Column({ type: "enum", enum: Priority })
  priority!: Priority;

  @Column({ type: "enum", enum: Status, default: Status.UNTESTED })
  status: Status = Status.UNTESTED;

  @Column()
  timeEstimation!: string;

  @Column()
  description!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToOne(
    () => ProjectEntity,
    (project) => project.testCases,
  )
  @JoinColumn({ name: "projectId" })
  project!: ProjectEntity;

  @ManyToOne(
    () => UserEntity,
    (user) => user.testCases,
    {
      nullable: true,
      onDelete: "SET NULL",
    },
  )
  @JoinColumn({ name: "assignedUserId" })
  assignedUser?: UserEntity;

  @ManyToOne(
    () => SectionEntity,
    (section) => section.testCases,
    {
      nullable: true,
    },
  )
  @JoinColumn({ name: "sectionId" })
  section?: SectionEntity | null;

  @Column({ type: "uuid", nullable: true })
  sectionId?: string | null;

  @Column({ type: "uuid", nullable: true })
  subsectionId?: string | null;

  @OneToMany(
    () => StepEntity,
    (step) => step.testCase,
  )
  steps?: StepEntity[];

  @ManyToOne(
    () => TestRunEntity,
    (testRun) => testRun.testCases,
  )
  @JoinColumn({ name: "testRunId" })
  testRun!: TestRunEntity;
}

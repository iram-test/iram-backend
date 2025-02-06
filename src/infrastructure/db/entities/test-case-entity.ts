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

@Entity()
export class TestCaseEntity {
  @PrimaryGeneratedColumn("uuid")
  testCaseId!: string;

  @Column()
  title!: string;

  @Column()
  sectionId!: string;

  @Column({ type: "enum", enum: TemplateType })
  templateType!: TemplateType;

  @Column({ type: "enum", enum: TestType })
  testType!: TestType;

  @Column({ type: "enum", enum: Priority })
  priority!: Priority;

  @Column()
  assignedUserId!: string;

  @Column()
  timeEstimation!: string;

  @Column()
  description!: string;

  @Column({ type: "text", array: true, nullable: true })
  stepsId!: string[] | null;

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
  )
  @JoinColumn({ name: "assignedUserId" })
  assignedUser!: UserEntity;

  @ManyToOne(
    () => SectionEntity,
    (section) => section.testCases,
  )
  @JoinColumn({ name: "sectionId" })
  section!: SectionEntity;

  @OneToMany(
    () => StepEntity,
    (step) => step.testCase,
  )
  steps?: StepEntity[];
}

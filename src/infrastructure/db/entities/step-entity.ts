import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { TestCaseEntity } from "./test-case-entity";
import { StepStatus } from "../../../domain/entities/enums/step-status";

@Entity()
export class StepEntity {
  @PrimaryGeneratedColumn("uuid")
  stepId!: string;

  @Column()
  stepDescription!: string;

  @Column()
  expectedResult!: string;

  @Column({ type: "jsonb", nullable: true })
  image!: string[] | null;

  @Column({ type: "jsonb", nullable: true })
  expectedImage!: string[] | null;

  @Column({
    type: "enum",
    enum: StepStatus,
    default: StepStatus.UNTESTED,
  })
  stepStatus!: StepStatus;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToOne(
    () => TestCaseEntity,
    (testCase) => testCase.steps,
    { onDelete: "CASCADE" },
  )
  @JoinColumn({ name: "testCaseId" })
  testCase!: TestCaseEntity;
}

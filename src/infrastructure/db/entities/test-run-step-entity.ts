import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { TestRun } from "./test-run-entity";
import { Step } from "./step-entity";
import { Status } from "../../../domain/entities/enums/status";

@Entity()
export class TestRunStep {
  @PrimaryGeneratedColumn("uuid")
  testRunStepId!: string;

  @ManyToOne(
    () => TestRun,
    (testRun) => testRun.steps,
  )
  @JoinColumn({ name: "testRunId" })
  testRun!: TestRun;

  @ManyToOne(() => Step)
  @JoinColumn({ name: "stepId" })
  step!: Step;

  @Column({ type: "enum", enum: Status })
  status!: Status;

  @Column({ nullable: true })
  resultDescription?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

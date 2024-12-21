import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { TestRunEntity } from "./test-run-entity";
import { StepEntity } from "./step-entity";
import { Status } from "../../../domain/entities/enums/status";

@Entity()
export class TestRunStepEntity {
  @PrimaryGeneratedColumn("uuid")
  testRunStepId!: string;

  @ManyToOne(
    () => TestRunEntity,
    (testRun) => testRun.steps,
  )
  @JoinColumn({ name: "testRunId" })
  testRun!: TestRunEntity;

  @ManyToOne(() => StepEntity)
  @JoinColumn({ name: "stepId" })
  step!: StepEntity;

  @Column({ type: "enum", enum: Status })
  status!: Status;

  @Column({ nullable: true })
  resultDescription?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

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
import { TestType } from "../../../domain/entities/enums/test-type";
import { Priority } from "../../../domain/entities/enums/project-priority";
import { Status } from "../../../domain/entities/enums/status";

@Entity()
export class TestRunStepEntity {
  @PrimaryGeneratedColumn("uuid")
  testRunStepId!: string;

  @Column({ type: "enum", enum: TestType })
  step!: TestType;

  @Column({ type: "enum", enum: Priority })
  priority!: Priority;

  @Column({ type: "text", array: true, nullable: true })
  assignedUserId!: string[] | null;

  @Column()
  estimatedTime!: string;

  @Column({ type: "enum", enum: Status })
  status!: Status;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToOne(
    () => TestRunEntity,
    (testRun) => testRun.testRunSteps,
  )
  @JoinColumn({ name: "testRunId" })
  testRun!: TestRunEntity;
}

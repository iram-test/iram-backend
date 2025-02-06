import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { TestRunStepEntity } from "./test-run-step-entity";

@Entity()
export class TestRunEntity {
  @PrimaryGeneratedColumn("uuid")
  testRunId!: string;

  @Column()
  name!: string;

  @Column({ type: "text", array: true, nullable: true })
  milestone!: string[] | null;

  @Column({ type: "text", array: true, nullable: true })
  assignedUserId!: string[] | null;

  @Column()
  description!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(
      () => TestRunStepEntity,
      (testRunStep) => testRunStep.testRun,
  )
  testRunSteps?: TestRunStepEntity[];
}
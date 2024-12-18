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
import { TestRunStep } from "./test-run-step-entity";
import { User } from "./user-entity";
import { Status } from "../../domain/entities/enums/status";

@Entity()
export class TestRun {
  @PrimaryGeneratedColumn("uuid")
  testRunId!: string;

  @Column({ type: "enum", enum: Status })
  status!: Status;

  @Column()
  comment!: string;

  @OneToMany(
    () => TestRunStep,
    (testRunStep) => testRunStep.testRun,
  )
  steps!: TestRunStep[];

  @ManyToOne(
    () => User,
    (user) => user.testRuns,
  )
  @JoinColumn({ name: "assignedUserId" })
  assignedTo?: User;

  @Column()
  version!: string;

  @Column()
  elapsed!: string;

  @Column()
  defects!: string;

  @Column()
  description!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

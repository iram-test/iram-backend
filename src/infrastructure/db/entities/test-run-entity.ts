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
import { TestRunStepEntity } from "./test-run-step-entity";
import { UserEntity } from "./user-entity";
import { Status } from "../../../domain/entities/enums/status";

@Entity()
export class TestRunEntity {
  @PrimaryGeneratedColumn("uuid")
  testRunId!: string;

  @Column({ type: "enum", enum: Status })
  status!: Status;

  @Column()
  comment!: string;

  @OneToMany(
    () => TestRunStepEntity,
    (testRunStep) => testRunStep.testRun,
  )
  steps!: TestRunStepEntity[];

  @ManyToOne(
    () => UserEntity,
    (user) => user.testRuns,
  )
  @JoinColumn({ name: "assignedUserId" })
  assignedTo?: UserEntity;

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

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

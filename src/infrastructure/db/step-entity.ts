import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { TestCase } from './test-case-entity';


@Entity()
export class Step {
    @PrimaryGeneratedColumn('uuid')
    stepId!: string;

    @Column()
    stepDescription!: string;

    @Column()
    expectedResult!: string;

    @Column({ nullable: true })
    image!: string | null;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

   @ManyToOne(() => TestCase, testCase => testCase.steps)
   @JoinColumn({ name: "testCaseId"})
   testCase?: TestCase
}
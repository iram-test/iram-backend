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
  import { SectionEntity } from "./section-entity";
  import { TestCaseEntity } from "./test-case-entity";
  
  @Entity()
  export class SubSectionEntity {
    @PrimaryGeneratedColumn("uuid")
    subsectionId!: string;
  
    @Column()
    name!: string;
  
    @Column()
    description!: string;
  
    @CreateDateColumn()
    createdAt!: Date;
  
    @UpdateDateColumn()
    updatedAt!: Date;
  
    @ManyToOne(
      () => SectionEntity,
      (section) => section.subsections,
    )
    @JoinColumn({ name: "sectionId" })
    section!: SectionEntity;
  
    @OneToMany(
      () => TestCaseEntity,
      (testCase) => testCase.subsection,
    )
    testCases?: TestCaseEntity[];
  }
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { SectionEntity } from "./section-entity";

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
}

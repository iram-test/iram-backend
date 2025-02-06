import { Subsection } from "../entities/subsection-entity";
import {
  CreateSubsectionDTO,
  UpdateSubsectionDTO,
} from "../../application/dtos/subsection-dto";

export interface SubsectionRepository {
  addSubsection(subsection: CreateSubsectionDTO): Promise<Subsection>;
  getAll(): Promise<Subsection[]>;
  update(subsection: UpdateSubsectionDTO): Promise<Subsection>;
  getById(subsectionId: string): Promise<Subsection | null>;
  getByName(subsectionName: string): Promise<Subsection | null>;
  delete(subsectionId: string): Promise<void>;
}
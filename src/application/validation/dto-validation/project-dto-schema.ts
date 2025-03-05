import { z } from "zod";
import { Location } from "../../../domain/entities/enums/location";
import { Language } from "../../../domain/entities/enums/language";
import { createEnumSchema } from "../index";

export const ProjectDTOSchema = z.object({
  projectId: z.string().uuid(),
  name: z.string().min(1),
  language: createEnumSchema(Language).nullable(),
  location: createEnumSchema(Location).nullable(),
  description: z.string(),
  managerId: z.string().uuid(),
  createdAt: z.string().datetime(), //  ISO string
  updatedAt: z.string().datetime(), //  ISO string
  users: z.array(z.string().uuid()),
});

export const CreateProjectDTOSchema = z.object({
  name: z.string().min(1),
  language: createEnumSchema(Language).optional().nullable(),
  location: createEnumSchema(Location).optional().nullable(),
  description: z.string(),
});

export const UpdateProjectDTOSchema = z.object({
  name: z.string().min(1).optional(),
  language: createEnumSchema(Language).optional().nullable(),
  location: createEnumSchema(Location).optional().nullable(),
  description: z.string().optional(),
  managerId: z.string().uuid().optional(),
  users: z.array(z.string().uuid()).optional(),
});

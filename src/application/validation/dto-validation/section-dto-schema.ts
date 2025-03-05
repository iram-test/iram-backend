import { z } from "zod";

export const SectionDTOSchema = z.object({
  sectionId: z.string().uuid(),
  name: z.string().min(1),
  description: z.string(),
  subsectionIds: z.array(z.string().uuid()).nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const CreateSectionDTOSchema = z.object({
  name: z.string().min(1),
  description: z.string(),
  subsectionIds: z.array(z.string().uuid()).optional(),
});

export const UpdateSectionDTOSchema = z.object({
  sectionId: z.string().uuid(),
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  subsectionIds: z.array(z.string().uuid()).optional(),
});

import { z } from "zod";

export const SubsectionDTOSchema = z.object({
  subsectionId: z.string().uuid(),
  name: z.string().min(1),
  description: z.string(),
  createdAt: z.string().datetime(), // ISO string
  updatedAt: z.string().datetime(), //  ISO string
});

export const CreateSubsectionDTOSchema = z.object({
  name: z.string().min(1),
  description: z.string(),
});

export const UpdateSubsectionDTOSchema = z.object({
  subsectionId: z.string().uuid(),
  name: z.string().min(1).optional(),
  description: z.string().optional(),
});

import { z } from "zod";
import { StepStatus } from "../../../domain/entities/enums/step-status";
import { createEnumSchema } from "../index";

export const StepDTOSchema = z.object({
  stepId: z.string().uuid(),
  stepDescription: z.string(),
  expectedResult: z.string(),
  image: z.array(z.string().url()).nullable(), //  URLs
  expectedImage: z.array(z.string().url()).nullable(), //  URLs
  stepStatus: createEnumSchema(StepStatus),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const CreateStepDTOSchema = z.object({
  stepDescription: z.string(),
  expectedResult: z.string(),
  expectedImage: z.array(z.string().url()).optional().nullable(), // URLs
  image: z.array(z.string().url()).optional().nullable(), // URLs
  stepStatus: createEnumSchema(StepStatus),
  testCaseId: z.string().uuid().optional(),
});

export const UpdateStepDTOSchema = z.object({
  stepId: z.string().uuid(),
  stepDescription: z.string().optional(),
  expectedImage: z.array(z.string().url()).optional().nullable(), // URLs
  expectedResult: z.string().optional(),
  image: z.array(z.string().url()).optional().nullable(), // URLs
  stepStatus: createEnumSchema(StepStatus).optional(),
});

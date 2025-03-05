import { z } from "zod";
import { MilestoneStatus } from "../../../domain/entities/enums/milestone-status";
import { createEnumSchema } from "../index";

export const MilestoneDTOSchema = z.object({
  milestoneId: z.string().uuid(),
  name: z.string().min(1).max(255),
  parentId: z.string().uuid().nullable(),
  description: z.string().max(1000),
  startDate: z.string().datetime().nullable(),
  endDate: z.string().datetime().nullable(),
  status: createEnumSchema(MilestoneStatus),
  projectId: z.string().uuid().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  testReportId: z.string().uuid().nullable(),
  testRunId: z.string().uuid().nullable(),
});

export const CreateMilestoneDTOSchema = z.object({
  name: z.string().min(1).max(255),
  parentId: z.string().uuid().optional().nullable(),
  description: z.string().max(1000),
  startDate: z.string().datetime().optional().nullable(),
  endDate: z.string().datetime().optional().nullable(),
  status: createEnumSchema(MilestoneStatus),
  testReportId: z.string().uuid().optional().nullable(),
  testRunId: z.string().uuid().optional().nullable(),
});

export const UpdateMilestoneDTOSchema = z.object({
  milestoneId: z.string().uuid(),
  name: z.string().min(1).max(255).optional(),
  parentId: z.string().uuid().optional().nullable(),
  description: z.string().max(1000).optional(),
  startDate: z.string().datetime().optional().nullable(),
  endDate: z.string().datetime().optional().nullable(),
  status: createEnumSchema(MilestoneStatus).optional(),
  projectId: z.string().uuid().optional(),
});

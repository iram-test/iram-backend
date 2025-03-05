import { z } from "zod";

export const TestReportDTOSchema = z.object({
  testReportId: z.string().uuid(),
  name: z.string().min(1),
  reference: z.string().nullable(),
  description: z.string(),
  assignedUserId: z.string().uuid().nullable(),
  testCaseIds: z.array(z.string().uuid()),
  milestoneIds: z.array(z.string().uuid()),
  testRunIds: z.array(z.string().uuid()),
  createdAt: z.string().datetime(), // ISO string
  updatedAt: z.string().datetime(), //  ISO string
});

export const CreateTestReportDTOSchema = z.object({
  name: z.string().min(1),
  reference: z.string().optional().nullable(),
  description: z.string(),
  assignedUserId: z.string().uuid().optional().nullable(),
  testCaseIds: z.array(z.string().uuid()),
  milestoneIds: z.array(z.string().uuid()),
  testRunIds: z.array(z.string().uuid()),
});

export const UpdateTestReportDTOSchema = z.object({
  testReportId: z.string().uuid(),
  name: z.string().min(1).optional(),
  reference: z.string().optional().nullable(),
  description: z.string().optional(),
  assignedUserId: z.string().uuid().optional().nullable(),
  testCaseIds: z.array(z.string().uuid()).optional(),
  milestoneIds: z.array(z.string().uuid()).optional(),
  testRunIds: z.array(z.string().uuid()).optional(),
});

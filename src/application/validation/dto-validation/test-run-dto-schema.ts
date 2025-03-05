import { z } from "zod";

export const TestRunDTOSchema = z.object({
  testRunId: z.string().uuid(),
  name: z.string().min(1),
  milestoneIds: z.array(z.string().uuid()).optional(),
  assignedUserIds: z.array(z.string().uuid()).nullable(),
  projectId: z.string().uuid(),
  testCaseIds: z.array(z.string().uuid()),
  description: z.string(),
  createdAt: z.string().datetime(), // ISO string
  updatedAt: z.string().datetime(), // ISO string
});

export const CreateTestRunDTOSchema = z.object({
  name: z.string().min(1),
  milestoneId: z.string().uuid().optional().nullable(),
  assignedUserId: z.string().uuid().optional().nullable(),
  testCaseIds: z.array(z.string().uuid()),
  description: z.string(),
});

export const UpdateTestRunDTOSchema = z.object({
  testRunId: z.string().uuid(),
  name: z.string().min(1).optional(),
  milestoneId: z.string().uuid().optional().nullable(),
  assignedUserId: z.string().uuid().optional().nullable(),
  testCaseIds: z.array(z.string().uuid()).optional(),
  description: z.string().optional(),
});

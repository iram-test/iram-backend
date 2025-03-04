import { z } from 'zod';

const TestRunDTOSchema = z.object({
    testRunId: z.string().uuid(),
    name: z.string().min(1).max(40),
    milestoneIds: z.array(z.string().uuid()),
    assignedUserIds: z.array(z.string().uuid()).nullable(),
    projectId: z.string().uuid(),
    testCaseIds: z.array(z.string().uuid()),
    description: z.string().min(0).max(512),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
});

const CreateTestRunDTOSchema = z.object({
    name: z.string().min(1).max(40),
    milestoneId: z.string().uuid().optional(),
    assignedUserId: z.string().uuid().optional(),
    testCaseIds: z.array(z.string().uuid()),
    description: z.string().min(0).max(512),
});

const UpdateTestRunDTOSchema = z.object({
    testRunId: z.string().uuid(),
    name: z.string().min(1).max(40).optional(),
    milestoneId: z.string().uuid().optional(),
    assignedUserId: z.string().uuid().optional(),
    testCaseIds: z.array(z.string().uuid()).optional(),
    description: z.string().min(0).max(512).optional(),
});
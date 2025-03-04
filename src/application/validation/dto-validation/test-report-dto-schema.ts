import { z } from 'zod';

const TestReportDTOSchema = z.object({
    testReportId: z.string().uuid(),
    name: z.string().min(1).max(40),
    reference: z.string().nullable(),
    description: z.string().min(0).max(512),
    assignedUserId: z.string().uuid().nullable(),
    testCaseIds: z.array(z.string().uuid()),
    milestoneIds: z.array(z.string().uuid()),
    testRunIds: z.array(z.string().uuid()),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
});

const CreateTestReportDTOSchema = z.object({
    name: z.string().min(1).max(40),
    reference: z.string().optional().nullable(),
    description: z.string().min(0).max(512),
    assignedUserId: z.string().uuid().optional().nullable(),
    testCaseIds: z.array(z.string().uuid()),
    milestoneIds: z.array(z.string().uuid()),
    testRunIds: z.array(z.string().uuid()),
});

const UpdateTestReportDTOSchema = z.object({
    testReportId: z.string().uuid(),
    name: z.string().min(1).max(40).optional(),
    reference: z.string().optional().nullable(),
    description: z.string().min(0).max(512).optional(),
    assignedUserId: z.string().uuid().optional().nullable(),
    testCaseIds: z.array(z.string().uuid()).optional(),
    milestoneIds: z.array(z.string().uuid()).optional(),
    testRunIds: z.array(z.string().uuid()).optional(),
});

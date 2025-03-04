import { z } from 'zod';
import {MilestoneStatus} from "../../../domain/entities/enums/milestone-status";

const MilestoneDTOSchema = z.object({
    milestoneId: z.string().uuid(),
    name: z.string().min(1).max(40),
    parentId: z.string().uuid().nullable(),
    description: z.string().min(0).max(512),
    startDate: z.string().datetime().nullable(),
    endDate: z.string().datetime().nullable(),
    status: z.nativeEnum(MilestoneStatus),
    projectId: z.string().uuid().nullable(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
    testReportId: z.string().uuid().nullable(),
    testRunId: z.string().uuid().nullable(),
});

const CreateMilestoneDTOSchema = z.object({
    name: z.string().min(1).max(40),
    parentId: z.string().uuid().optional().nullable(),
    description: z.string().min(0).max(512),
    startDate: z.string().datetime().optional().nullable(),
    endDate: z.string().datetime().optional().nullable(),
    status: z.nativeEnum(MilestoneStatus),
    testReportId: z.string().uuid().optional().nullable(),
    testRunId: z.string().uuid().optional().nullable(),
});

const UpdateMilestoneDTOSchema = z.object({
    milestoneId: z.string().uuid(),
    name: z.string().min(1).max(40).optional(),
    parentId: z.string().uuid().optional().nullable(),
    description: z.string().min(0).max(512).optional(),
    startDate: z.string().datetime().optional().nullable(),
    endDate: z.string().datetime().optional().nullable(),
    status: z.nativeEnum(MilestoneStatus).optional(),
    projectId: z.string().uuid().optional(),
});
import { z } from 'zod';
import {TestType} from "../../../domain/entities/enums/test-type";
import {Status} from "../../../domain/entities/enums/status";
import {TemplateType} from "../../../domain/entities/enums/template-type";
import {Priority} from "../../../domain/entities/enums/project-priority";

const TestCaseDTOSchema = z.object({
    testCaseId: z.string().uuid(),
    title: z.string().min(1).max(40),
    sectionId: z.string().uuid().nullable(),
    projectId: z.string().uuid(),
    assignedUserId: z.string().uuid().nullable(),
    templateType: z.nativeEnum(TemplateType),
    testType: z.nativeEnum(TestType),
    priority: z.nativeEnum(Priority),
    status: z.nativeEnum(Status),
    timeEstimation: z.string().min(0).max(10),
    description: z.string().min(0).max(512),
    stepIds: z.array(z.string().uuid()).nullable(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
    color: z.string().nullable(),
});

const CreateTestCaseDTOSchema = z.object({
    title: z.string().min(1).max(40),
    sectionId: z.string().uuid().optional().nullable(),
    assignedUserId: z.string().uuid().optional(),
    templateType: z.nativeEnum(TemplateType),
    testType: z.nativeEnum(TestType),
    priority: z.nativeEnum(Priority),
    timeEstimation: z.string().min(0).max(10),
    description: z.string().min(0).max(512),
    stepIds: z.array(z.string().uuid()).optional().nullable(),
    status: z.nativeEnum(Status).optional(),
    color: z.string().optional().nullable(),
});

const UpdateTestCaseDTOSchema = z.object({
    testCaseId: z.string().uuid(),
    title: z.string().min(1).max(40).optional(),
    sectionId: z.string().uuid().optional().nullable(),
    projectId: z.string().uuid().optional(),
    assignedUserId: z.string().uuid().optional().nullable(),
    templateType: z.nativeEnum(TemplateType).optional(),
    testType: z.nativeEnum(TestType).optional(),
    priority: z.nativeEnum(Priority).optional(),
    status: z.nativeEnum(Status).optional(),
    timeEstimation: z.string().min(0).max(10).optional(),
    description: z.string().min(0).max(512).optional(),
    stepIds: z.array(z.string().uuid()).optional().nullable(),
    color: z.string().optional().nullable(),
});

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
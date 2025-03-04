import { z } from 'zod';
import {StepStatus} from "../../../domain/entities/enums/step-status";

const StepDTOSchema = z.object({
    stepId: z.string().uuid(),
    stepDescription: z.string().min(0).max(1024),
    expectedResult: z.string().min(0).max(1024),
    image: z.array(z.string().url()).nullable(),
    expectedImage: z.array(z.string().url()).nullable(),
    stepStatus: z.nativeEnum(StepStatus),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
});

const CreateStepDTOSchema = z.object({
    stepDescription: z.string().min(0).max(1024),
    expectedResult: z.string().min(0).max(1024),
    expectedImage: z.array(z.string().url()).optional().nullable(),
    image: z.array(z.string().url()).optional().nullable(),
    stepStatus: z.nativeEnum(StepStatus),
    testCaseId: z.string().uuid().optional(),
});

const UpdateStepDTOSchema = z.object({
    stepId: z.string().uuid(),
    stepDescription: z.string().min(0).max(1024).optional(),
    expectedImage: z.array(z.string().url()).optional().nullable(),
    expectedResult: z.string().min(0).max(1024).optional(),
    image: z.array(z.string().url()).optional().nullable(),
    stepStatus: z.nativeEnum(StepStatus).optional(),
});
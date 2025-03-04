import { z } from 'zod';

const SubsectionDTOSchema = z.object({
    subsectionId: z.string().uuid(),
    name: z.string().min(1).max(40),
    description: z.string().min(0).max(512),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
});

const CreateSubsectionDTOSchema = z.object({
    name: z.string().min(1).max(40),
    description: z.string().min(0).max(512),
});

const UpdateSubsectionDTOSchema = z.object({
    subsectionId: z.string().uuid(),
    name: z.string().min(1).max(40).optional(),
    description: z.string().min(0).max(512).optional(),
});
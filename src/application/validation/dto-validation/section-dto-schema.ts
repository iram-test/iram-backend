import { z } from 'zod';

const SectionDTOSchema = z.object({
    sectionId: z.string().uuid(),
    name: z.string().min(1).max(40),
    description: z.string().min(0).max(512),
    subsectionIds: z.array(z.string().uuid()).nullable(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
});

const CreateSectionDTOSchema = z.object({
    name: z.string().min(1).max(40),
    description: z.string().min(0).max(512),
    subsectionIds: z.array(z.string().uuid()).optional(),
});

const UpdateSectionDTOSchema = z.object({
    sectionId: z.string().uuid(),
    name: z.string().min(1).max(40).optional(),
    description: z.string().min(0).max(512).optional(),
    subsectionIds: z.array(z.string().uuid()).optional(),
});

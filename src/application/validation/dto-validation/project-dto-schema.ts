import { z } from 'zod';
import {Location} from "../../../domain/entities/enums/location";
import {Language} from "../../../domain/entities/enums/language";

const ProjectDTOSchema = z.object({
    projectId: z.string().uuid(),
    name: z.string().min(1).max(40),
    language: z.nativeEnum(Language).nullable(),
    location: z.nativeEnum(Location).nullable(),
    description: z.string().min(0).max(512),
    managerId: z.string().uuid(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
    users: z.array(z.string().uuid()),
});

const CreateProjectDTOSchema = z.object({
    name: z.string().min(1).max(40),
    language: z.nativeEnum(Language).optional().nullable(),
    location: z.nativeEnum(Location).optional().nullable(),
    description: z.string().min(0).max(512),
});

const UpdateProjectDTOSchema = z.object({
    name: z.string().min(1).max(40).optional(),
    language: z.nativeEnum(Language).optional().nullable(),
    location: z.nativeEnum(Location).optional().nullable(),
    description: z.string().min(0).max(512).optional(),
    managerId: z.string().uuid().optional(),
    users: z.array(z.string().uuid()).optional(),
});
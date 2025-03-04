import { z } from 'zod';
import {UserRole} from "../../../domain/entities/enums/user-role";

const UserDTOSchema = z.object({
    userId: z.string().uuid(),
    firstName: z.string().min(1).max(40),
    lastName: z.string().min(1).max(40),
    username: z.string().min(1).max(40),
    email: z.string().min(1).max(60).email(),
    isVerified: z.boolean(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
    lastLoginAt: z.string().datetime().nullable(),
    role: z.nativeEnum(UserRole),
});

const CreateUserDTOSchema = z.object({
    firstName: z.string().min(1).max(40),
    lastName: z.string().min(1).max(40),
    username: z.string().min(1).max(40),
    email: z.string().min(1).max(60).email(),
    password: z.string().min(8).max(60).optional(),
    isVerified: z.boolean(),
    lastLoginAt: z.string().datetime().optional().nullable(),
    role: z.nativeEnum(UserRole),
    refreshToken: z.string().optional().nullable(),
});

const UpdateUserDTOSchema = z.object({
    userId: z.string().uuid(),
    firstName: z.string().min(1).max(40).optional(),
    lastName: z.string().min(1).max(40).optional(),
    username: z.string().min(1).max(40).optional(),
    email: z.string().min(1).max(60).email().optional(),
    password: z.string().min(8).max(60).optional(),
    role: z.nativeEnum(UserRole).optional(),
    isVerified: z.boolean().optional(),
});
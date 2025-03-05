import { z } from "zod";
import { UserRole } from "../../../domain/entities/enums/user-role";
import { createEnumSchema } from "../index";

export const UserDTOSchema = z.object({
  userId: z.string().uuid(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  username: z.string().min(1),
  email: z.string().email(),
  isVerified: z.boolean(),
  createdAt: z.string().datetime(), // ISO string
  updatedAt: z.string().datetime(), // ISO string
  lastLoginAt: z.string().datetime().nullable(), //  ISO string
  role: createEnumSchema(UserRole),
});

export const CreateUserDTOSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  username: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8).optional(), //  minimum password length
  isVerified: z.boolean(),
  lastLoginAt: z.string().datetime().optional().nullable(), //  ISO string
  role: createEnumSchema(UserRole),
  refreshToken: z.string().optional().nullable(),
});

export const UpdateUserDTOSchema = z.object({
  userId: z.string().uuid(),
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  username: z.string().min(1).optional(),
  email: z.string().email().optional(),
  password: z.string().min(8).optional(), //  minimum password length
  role: createEnumSchema(UserRole).optional(),
  isVerified: z.boolean().optional(),
});

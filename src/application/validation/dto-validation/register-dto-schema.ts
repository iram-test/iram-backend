import { z } from "zod";

export const RegisterDTOSchema = z.object({
  firstName: z.string().min(1).max(255),
  lastName: z.string().min(1).max(255),
  username: z.string().min(1).max(255),
  email: z.string().email(),
  password: z.string().min(8), //  minimum password length
  role: z.enum(["User", "Manager"]),
});

export const LoginWithUsernameDTOSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export const LoginWithEmailDTOSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

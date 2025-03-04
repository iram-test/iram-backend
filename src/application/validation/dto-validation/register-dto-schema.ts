import { z } from 'zod';

const RegisterDTOSchema = z.object({
    firstName: z.string().min(1).max(40),
    lastName: z.string().min(1).max(40),
    username: z.string().min(1).max(40),
    email: z.string().min(1).max(60).email(),
    password: z.string().min(8).max(60),
    role: z.enum(["User", "Manager"]),
});

const LoginWithUsernameDTOSchema = z.object({
    username: z.string().min(1).max(40),
    password: z.string().min(8).max(60),
});

const LoginWithEmailDTOSchema = z.object({
    email: z.string().min(1).max(60).email(),
    password: z.string().min(8).max(60),
});

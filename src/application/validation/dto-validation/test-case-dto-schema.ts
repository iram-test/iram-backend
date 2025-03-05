import { z } from "zod";
import { TestType } from "../../../domain/entities/enums/test-type";
import { Status } from "../../../domain/entities/enums/status";
import { TemplateType } from "../../../domain/entities/enums/template-type";
import { Priority } from "../../../domain/entities/enums/project-priority";
import { createEnumSchema } from "../index";

export const TestCaseDTOSchema = z.object({
  testCaseId: z.string().uuid(),
  title: z.string().min(1),
  sectionId: z.string().uuid().nullable(),
  projectId: z.string().uuid(),
  assignedUserId: z.string().uuid().nullable(),
  templateType: createEnumSchema(TemplateType),
  testType: createEnumSchema(TestType),
  priority: createEnumSchema(Priority),
  status: createEnumSchema(Status),
  timeEstimation: z.string(),
  description: z.string(),
  stepIds: z.array(z.string().uuid()).nullable(),
  createdAt: z.string().datetime(), // ISO string
  updatedAt: z.string().datetime(), // ISO string
  color: z.string().nullable(),
});

export const CreateTestCaseDTOSchema = z.object({
  title: z.string().min(1),
  sectionId: z.string().uuid().optional().nullable(),
  assignedUserId: z.string().uuid().optional(),
  templateType: createEnumSchema(TemplateType),
  testType: createEnumSchema(TestType),
  priority: createEnumSchema(Priority),
  timeEstimation: z.string(),
  description: z.string(),
  stepIds: z.array(z.string().uuid()).optional().nullable(),
  status: createEnumSchema(Status).optional(),
  color: z.string().optional().nullable(),
});

export const UpdateTestCaseDTOSchema = z.object({
  testCaseId: z.string().uuid(),
  title: z.string().min(1).optional(),
  sectionId: z.string().uuid().optional().nullable(),
  projectId: z.string().uuid().optional(),
  assignedUserId: z.string().uuid().optional().nullable(),
  templateType: createEnumSchema(TemplateType).optional(),
  testType: createEnumSchema(TestType).optional(),
  priority: createEnumSchema(Priority).optional(),
  status: createEnumSchema(Status).optional(),
  timeEstimation: z.string().optional(),
  description: z.string().optional(),
  stepIds: z.array(z.string().uuid()).optional().nullable(),
  color: z.string().optional().nullable(),
});

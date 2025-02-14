import { FastifyRequest, FastifyReply } from "fastify";
import fileService from "../services/file-service";
import { CustomError } from "../../tools/custom-error";
import { MultipartFile } from "@fastify/multipart";
import logger from "../../tools/logger";

interface ImportFileRequest extends FastifyRequest {
  file: () => Promise<MultipartFile | undefined>;
}

export const importTestCasesFromJson = async (
  request: ImportFileRequest,
  reply: FastifyReply,
) => {
  try {
    const file = await request.file();
    if (!file) {
      throw new CustomError("File is required", 400);
    }

    const testCases = await fileService.importTestCasesFromJson(file);
    reply.code(200).send(testCases);
  } catch (error: any) {
    logger.error(`Error importing from JSON: ${error}`);
    if (error instanceof CustomError) {
      reply.code(error.statusCode).send({ message: error.message });
    } else if (error instanceof Error) {
      reply.code(500).send({ message: error.message });
    } else {
      reply.code(500).send({ message: "An unexpected error occurred" });
    }
  }
};

export const importTestCasesFromCsv = async (
  request: ImportFileRequest,
  reply: FastifyReply,
) => {
  try {
    const file = await request.file();
    if (!file) {
      throw new CustomError("File is required", 400);
    }
    const testCases = await fileService.importTestCasesFromCsv(file);
    reply.code(200).send(testCases);
  } catch (error: any) {
    logger.error(`Error importing from CSV: ${error}`);
    if (error instanceof CustomError) {
      reply.code(error.statusCode).send({ message: error.message });
    } else if (error instanceof Error) {
      reply.code(500).send({ message: error.message });
    } else {
      reply.code(500).send({ message: "An unexpected error occurred" });
    }
  }
};

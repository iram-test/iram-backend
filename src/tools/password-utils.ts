import crypto from "node:crypto";
import { config } from "../configs/index";
import logger from "./logger";

export const hashPassword = (password: string, salt: string): string => {
  const { iterations, keyLength, digest } = config.hash;
  const hash = crypto
    .pbkdf2Sync(password, salt, iterations, keyLength, digest)
    .toString("hex");
  return hash;
};

export const validatePassword = (
  password: string,
  hash: string,
  salt: string,
): boolean => {
  const hashToValidate = hashPassword(password, salt);
  const isValid = hash === hashToValidate;
  logger.info(`Password validation ${isValid ? "successful" : "failed"}`);
  return isValid;
};

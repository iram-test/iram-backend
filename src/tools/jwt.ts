import jwt, { SignOptions } from "jsonwebtoken";
import { config } from "../configs";
import { UserRole } from "../domain/entities/enums/user-role";

interface JwtPayload {
  userId: string;
  username: string;
  role: UserRole;
}

export const generateTokens = (
  userId: string,
  username: string,
  role: UserRole,
) => {
  const accessToken = jwt.sign(
    { userId, username, role },
    config.jwt.accessSecret,
    {
      expiresIn: config.jwt.accessExpiration as string,
      algorithm: "HS256",
    } as SignOptions,
  );
  const refreshToken = jwt.sign(
    { userId, username },
    config.jwt.refreshSecret,
    {
      expiresIn: config.jwt.refreshExpiration as string,
      algorithm: "HS256",
    } as SignOptions,
  );
  return {
    accessToken,
    refreshToken,
  };
};

export const verifyAccessToken = (token: string): JwtPayload => {
  try {
    const decoded = jwt.verify(token, config.jwt.accessSecret) as JwtPayload;
    return decoded;
  } catch (error) {
    throw new Error("Invalid access token");
  }
};

export const verifyRefreshToken = (token: string): JwtPayload => {
  try {
    const decoded = jwt.verify(token, config.jwt.refreshSecret) as JwtPayload;
    return decoded;
  } catch (error) {
    throw new Error("Invalid refresh token");
  }
};

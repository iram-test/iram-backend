import jwt from "jsonwebtoken";
import { config } from "../configs";
import { UserRole } from "../domain/entities/enums/user-role";
import { UserPermission } from "../domain/entities/enums/user-permission";

interface JwtPayload {
  userId: string;
  username: string;
  role: UserRole;
  permissions: UserPermission[];
}

export const generateTokens = (
  userId: string,
  username: string,
  role: UserRole,
  permissions: UserPermission[],
) => {
  const accessToken = jwt.sign(
    { userId, username, role, permissions },
    config.jwt.accessSecret,
    {
      expiresIn: config.jwt.accessExpiration,
    },
  );
  const refreshToken = jwt.sign(
    { userId, username },
    config.jwt.refreshSecret,
    {
      expiresIn: config.jwt.refreshExpiration,
    },
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

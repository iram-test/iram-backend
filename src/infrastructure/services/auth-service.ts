import {
  RegisterDTO,
  LoginWithUsernameDTO,
  LoginWithEmailDTO,
} from "../../application/dtos/auth-dto";
import { UserDomainService } from "../../domain/services/user-domain-service";
import { UserPostgresRepository } from "../db/repositories/user-postgres-repository";
import { generateTokens, verifyRefreshToken } from "../../tools/jwt";
import { CustomError } from "../../tools/custom-error";
import logger from "../../tools/logger";
import { validatePassword } from "../../tools/password-utils";
import { config } from "../../configs";
import { UserRole } from "../../domain/entities/enums/user-role";

const userRepository = new UserPostgresRepository();
const userService = new UserDomainService(userRepository);

class AuthService {
  async registration(registerDto: RegisterDTO) {
    const candidate = await userService.getUserByEmail(registerDto.email);
    if (candidate) {
      logger.warn(`User with email ${registerDto.email} already exists`);
      throw new CustomError("User already exists", 409);
    }

    let userRole: UserRole = UserRole.USER;

    if (registerDto.role === "Manager") {
      userRole = UserRole.MANAGER;
    }

    let newUser = await userService.addUser({
      email: registerDto.email,
      username: registerDto.username,
      password: registerDto.password,
      firstName: registerDto.firstName,
      lastName: registerDto.lastName,
      isVerified: false,
      lastLoginAt: new Date().toISOString(),
      role: userRole,
    });

    const tokens = generateTokens(
      newUser.userId,
      newUser.username,
      newUser.role,
    );

    const lastLogin = new Date().toISOString();

    newUser = await userService.save(newUser, tokens.refreshToken, lastLogin);

    logger.info(`User registered with id: ${newUser.userId}`);
    return { userId: newUser.userId, ...tokens };
  }

  async login(loginDto: LoginWithUsernameDTO | LoginWithEmailDTO) {
    let user;
    if ("username" in loginDto) {
      user = await userService.getUserByUsername(loginDto.username);
    } else if ("email" in loginDto) {
      user = await userService.getUserByEmail(loginDto.email);
    } else {
      throw new CustomError("Invalid login credentials", 400);
    }

    if (!user) {
      logger.warn(`User with provided login credentials not found`);
      throw new CustomError("Invalid username or password", 401);
    }

    const isValid = await validatePassword(
      loginDto.password,
      user.password,
      config.hash.salt,
    );
    if (!isValid) {
      logger.warn(`Invalid password for user: ${user.username || user.email}`);
      throw new CustomError("Invalid username or password", 401);
    }

    const tokens = generateTokens(user.userId, user.username, user.role);
    const lastLogin = new Date().toISOString();

    user = await userService.save(user, tokens.refreshToken, lastLogin);

    logger.info(`User with id ${user.userId} logged in.`);
    return tokens;
  }

  async logout(refreshToken: string) {
    if (!refreshToken) {
      logger.warn(`Refresh token is required`);
      throw new CustomError("Refresh token is required", 400);
    }
    try {
      const payload = verifyRefreshToken(refreshToken);
      await userService.deleteRefreshToken(payload.userId);
      logger.info(`User with id ${payload.userId} logged out.`);
    } catch (error) {
      logger.error(`Invalid refresh token`, error);
      throw new CustomError("Invalid refresh token", 401);
    }
  }
  async refresh(refreshToken: string) {
    if (!refreshToken) {
      logger.warn(`Refresh token is required`);
      throw new CustomError("Refresh token is required", 400);
    }
    try {
      const payload = verifyRefreshToken(refreshToken);
      let user = await userService.getUserById(payload.userId);
      if (!user) {
        logger.warn(`User with id: ${payload.userId} was not found`);
        throw new CustomError("User not found", 404);
      }
      const tokens = generateTokens(payload.userId, user.username, user.role);
      const lastLogin = new Date().toISOString();
      user = await userService.save(user, tokens.refreshToken, lastLogin);
      logger.info(`Token for user id: ${payload.userId} was refreshed.`);
      return tokens;
    } catch (error) {
      logger.error(`Invalid refresh token`, error);
      throw new CustomError("Invalid refresh token", 401);
    }
  }
}

export default new AuthService();

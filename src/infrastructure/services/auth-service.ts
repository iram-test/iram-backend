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
import { hashPassword, validatePassword } from "../../tools/password-utils";
import { config } from "../../configs";
import { UserRole } from "../../domain/entities/enums/user-role";
import { User } from "../../domain/entities/user-entity";
import mailService from "../../tools/mail-service";

const userRepository = new UserPostgresRepository();
const userService = new UserDomainService(userRepository);

class AuthService {
  async registration(
    registerDto: RegisterDTO,
  ): Promise<{ userId: string; accessToken: string; refreshToken: string }> {
    const candidate = await userService.getUserByEmail(registerDto.email);
    if (candidate) {
      logger.warn(`User with email ${registerDto.email} already exists`);
      throw new CustomError("User already exists", 409);
    }

    let userRole: UserRole = UserRole.USER;
    if (registerDto.role === "Manager") {
      userRole = UserRole.MANAGER;
    }

    const hashedPassword = hashPassword(registerDto.password, config.hash.salt);

    const newUser = await userService.addUser({
      email: registerDto.email,
      username: registerDto.username,
      password: hashedPassword,
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
    await userRepository.saveRefreshToken(newUser.userId, tokens.refreshToken);
    await userRepository.updateLastLogin(newUser.userId, lastLogin);

    const activationLink = `${config.nodemailer.url}/auth/activate/${newUser.userId}`;

    try {
      await mailService.sendActivationMail(newUser.email, activationLink);
      logger.info(`Activation email sent to ${newUser.email}`);
    } catch (error) {
      logger.error(`Failed to send activation email: ${error}`);
    }

    logger.info(`User registered with id: ${newUser.userId}`);
    return { userId: newUser.userId, ...tokens };
  }

  async login(
    loginDto: LoginWithUsernameDTO | LoginWithEmailDTO,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    let user: User | null;

    if ("username" in loginDto) {
      user = await userService.getUserByUsername(loginDto.username);
    } else if ("email" in loginDto) {
      user = await userService.getUserByEmail(loginDto.email);
    } else {
      logger.warn(`Invalid login credentials`);
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
    await userRepository.saveRefreshToken(user.userId, tokens.refreshToken);
    await userRepository.updateLastLogin(user.userId, lastLogin);

    logger.info(`User with id ${user.userId} logged in.`);
    return tokens;
  }

  async logout(refreshToken: string): Promise<void> {
    if (!refreshToken) {
      logger.warn(`Refresh token is required`);
      throw new CustomError("Refresh token is required", 400);
    }

    try {
      const payload = verifyRefreshToken(refreshToken);

      await userRepository.deleteRefreshToken(payload.userId);

      logger.info(`User with id ${payload.userId} logged out.`);
    } catch (error) {
      logger.error(`Invalid refresh token`, error);
      throw new CustomError("Invalid refresh token", 401);
    }
  }

  async refresh(
    refreshToken: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    if (!refreshToken) {
      logger.warn(`Refresh token is required`);
      throw new CustomError("Refresh token is required", 400);
    }

    try {
      const payload = verifyRefreshToken(refreshToken);

      const user = await userService.getUserById(payload.userId);
      if (!user) {
        logger.warn(`User with id: ${payload.userId} was not found`);
        throw new CustomError("User not found", 404);
      }

      const tokens = generateTokens(payload.userId, user.username, user.role);

      const lastLogin = new Date().toISOString();
      await userRepository.saveRefreshToken(user.userId, tokens.refreshToken);
      await userRepository.updateLastLogin(user.userId, lastLogin);

      logger.info(`Token for user id: ${payload.userId} was refreshed.`);
      return tokens;
    } catch (error) {
      logger.error(`Invalid refresh token`, error);
      throw new CustomError("Invalid refresh token", 401);
    }
  }

  async activate(userId: string): Promise<void> {
    const user = await userService.getUserById(userId);
    if (!user) {
      logger.warn(`User with id: ${userId} was not found`);
      throw new CustomError("User not found", 404);
    }

    if (user.isVerified) {
      logger.warn(`User with id: ${userId} is already activated`);
      throw new CustomError("User already activated", 400);
    }

    await userRepository.updateUser({
      ...user,
      userId: user.userId,
      isVerified: true,
    });
    logger.info(`User with id: ${userId} activated successfully`);
  }
}

export default new AuthService();

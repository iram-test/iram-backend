import { User } from "../entities/user-entity";
import {
  LoginWithEmailDTO,
  LoginWithUsernameDTO,
  RegisterDTO,
} from "../../application/dtos/auth-dto";

export interface AuthRepository {
    registration(
        user: User,
      ): Promise<User>;
    login(user: User): Promise<{ accessToken: string; refreshToken: string }>;
    logout(refreshToken: string): Promise<any>;
    refresh(
      refreshToken: string,
    ): Promise<{ accessToken: string; refreshToken: string }>;
  }
import { User } from "../entities/user-entity";
import { RegisterDTO } from "../../application/dtos/auth-dto";

export interface AuthRepository {
  registration(user: RegisterDTO): Promise<User>;
  login(
    username: string,
    password: string,
  ): Promise<{ accessToken: string; refreshToken: string }>;
  logout(refreshToken: string): Promise<void>;
  refresh(
    refreshToken: string,
  ): Promise<{ accessToken: string; refreshToken: string }>;
}

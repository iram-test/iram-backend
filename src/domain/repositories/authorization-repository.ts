import { User } from "../entities/user-entity";

export interface AuthRepository {
  registration(user: User): Promise<User>;
  login(user: User): Promise<{ accessToken: string; refreshToken: string }>;
  logout(refreshToken: string): Promise<void>;
  refresh(refreshToken: string): Promise<{ accessToken: string; refreshToken: string }>;
}

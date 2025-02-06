import { User } from "../entities/user-entity";
import { CreateUserDTO, UpdateUserDTO } from "../../application/dtos/user-dto";

export interface UserRepository {
  addUser(user: CreateUserDTO): Promise<User>;
  getAll(): Promise<User[]>;
  getUserById(userId: string): Promise<User | null>;
  updateUser(user: UpdateUserDTO): Promise<User>;
  deleteUser(userId: string): Promise<void>;
  getByEmail(email: string): Promise<User | null>;
  getByUsername(username: string): Promise<User | null>;
  saveRefreshToken(userId: string, refreshToken:string): Promise<void>;
  getRefreshToken(userId: string): Promise<string | null>;
  deleteRefreshToken(userId: string): Promise<void>;
  updateLastLogin(userId:string, lastLogin:string):Promise<void>
}
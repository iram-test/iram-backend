import { User } from "../entities/user-entity";
import { CreateUserDTO, UpdateUserDTO } from "../../application/dtos/user-dto";

export interface UserRepository {
  addUser(user: CreateUserDTO): Promise<User>;
  getAll(): Promise<User[]>;
  getUserById(userId: string): Promise<User | null>;
  updateUser(user: UpdateUserDTO & { userId: string }): Promise<User>;
  deleteUser(userId: string): Promise<void>;
  save(user: CreateUserDTO): Promise<User>;
}

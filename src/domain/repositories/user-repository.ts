import { User } from "../entities/user-entity";

export interface UserRepository {
  addUser(user: User): Promise<User>;
  getAll(): Promise<User[]>;
  save(user: User): Promise<User>;
  getById(userId: string): Promise<User | null>;
  getByEmail(email: string): Promise<User | null>;
  update(user: User): Promise<User>;
  delete(userId: string): Promise<void>;
}

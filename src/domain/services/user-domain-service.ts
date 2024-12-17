import { User } from "../entities/user-entity";
import { UserRepository } from "../repositories/user-repository";

export class UserDomainService implements UserRepository {
  constructor(private userRepository: UserRepository) {}

  addUser(user: User): Promise<User> {
    return this.userRepository.addUser(user);
  }

  getAll(): Promise<User[]> {
    return this.userRepository.getAll();
  }

  save(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  getById(userId: string): Promise<User | null> {
    return this.userRepository.getById(userId);
  }

  getByEmail(email: string): Promise<User | null> {
    return this.userRepository.getByEmail(email);
  }

  update(user: User): Promise<User> {
    return this.userRepository.update(user);
  }

  delete(userId: string): Promise<void> {
    return this.userRepository.delete(userId);
  }
}

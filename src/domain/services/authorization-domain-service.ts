import { User } from "../entities/user-entity";
import { AuthRepository } from "../repositories/authorization-repository";
import {RegisterDTO} from "../../application/dtos/auth-dto";

export class AuthorizationDomainService implements AuthRepository {
  constructor(private authorizationRepository: AuthRepository) {}

  registration(user: RegisterDTO): Promise<User> {
    return this.authorizationRepository.registration(user);
  }

  login(
    username: string,
    password: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    return this.authorizationRepository.login(username, password);
  }

  logout(refreshToken: string): Promise<void> {
    return this.authorizationRepository.logout(refreshToken);
  }

  refresh(
    refreshToken: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    return this.authorizationRepository.refresh(refreshToken);
  }
}

import { User } from "../entities/user-entity";
import { AuthRepository } from "../repositories/authorization-repository";

export class AuthorizationDomainService implements AuthRepository {
  constructor(private authorizationRepository: AuthRepository) {}

  registration(user: User): Promise<User> {
    return this.authorizationRepository.registration(user);
  }

  login(user: User): Promise<{ accessToken: string; refreshToken: string }> {
    return this.authorizationRepository.login(user);
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

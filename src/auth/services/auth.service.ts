import { Injectable } from '@nestjs/common';
import { RetrievedUser } from 'src/user/interfaces/user.interface';
import { UserService } from 'src/user/user.service';
import { PasswordService } from './password.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private passwordService: PasswordService,
  ) {}

  async validateUser(
    email: string,
    pass: string,
  ): Promise<RetrievedUser | null> {
    const user = await this.userService.findUserByEmail(email);
    const isPassword = await this.passwordService.comparePassword(
      pass,
      user?.password,
    );
    if (user && isPassword) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}

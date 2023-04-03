import { Injectable } from '@nestjs/common';
import { RetrievedUser } from 'src/user/interfaces/user.interface';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(
    email: string,
    pass: string,
  ): Promise<RetrievedUser | null> {
    const user = await this.userService.findUserByEmail(email);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}

import { Injectable } from '@nestjs/common';
import { compare, genSalt, hash } from 'bcrypt';

@Injectable()
export class PasswordService {
  async hashPassword(password: string): Promise<string> {
    const salt = await genSalt(7);
    return hash(password, salt);
  }

  async comparePassword(
    providedPass: string,
    storedPass: string | undefined,
  ): Promise<boolean> {
    if (storedPass === undefined) return false;
    return compare(providedPass, storedPass);
  }
}

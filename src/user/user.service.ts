import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../models/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { PasswordService } from 'src/auth/services/password.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private passwordService: PasswordService,
  ) {}

  async createUser(data: CreateUserDto): Promise<void> {
    const hashPassword = await this.passwordService.hashPassword(data.password);
    this.usersRepository.save({
      ...data,
      password: hashPassword,
    });
  }

  getAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findUserById(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  findUserByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email });
  }

  findUserByRefreshToken(refreshToken: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ refreshToken });
  }

  updateUser(user: User) {
    return this.usersRepository.save(user);
  }
}

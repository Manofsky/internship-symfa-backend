import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../models/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  createUser(user: CreateUserDto): Promise<User> {
    return this.usersRepository.save(user);
  }

  getAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findUserById(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }
}

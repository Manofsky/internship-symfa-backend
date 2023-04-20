import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../models/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('register')
  async create(@Body() data: CreateUserDto) {
    return this.userService.createUser(data);
  }

  @Get()
  async getAll(): Promise<User[]> {
    return this.userService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':email')
  async getUserByEmail(
    @Param('email') email: string,
  ): Promise<Omit<User, 'password' | 'refreshToken'>> {
    const user = await this.userService.findUserByEmail(email);
    if (!user) throw new NotFoundException();
    const { password, refreshToken, ...rest } = user;
    return rest;
  }
}

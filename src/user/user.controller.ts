import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { Response as ResponseType, Request as RequestType } from 'express';
import { UserService } from './user.service';
import { User } from '../models/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('register')
  async create(
    @Body() data: CreateUserDto,
    @Res({ passthrough: true }) res: ResponseType,
  ): Promise<void> {
    this.userService.createUser(data);
    res.status(200).send({ message: 'ok' });
  }

  @Get()
  async getAll(): Promise<User[]> {
    return this.userService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getUserByRefreshToken(
    @Req() req: RequestType,
  ): Promise<Omit<User, 'password' | 'refreshToken'> | null> {
    const user = await this.userService.findUserByRefreshToken(
      req.cookies?.refresh_token,
    );
    if (!user) throw new NotFoundException();
    const { password, refreshToken, ...rest } = user;
    return rest;
  }
}

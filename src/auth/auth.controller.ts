import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request as RequestType } from 'express';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: RequestType) {
    return req.user;
  }
}

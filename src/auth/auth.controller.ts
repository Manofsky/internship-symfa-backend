import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Response as ResponseType, Request as RequestType } from 'express';
import { RefreshAuthGuard } from './guards/refresh-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Req() req: RequestType,
    @Res({ passthrough: true }) res: ResponseType,
  ): Promise<void> {
    const authToken = await this.authService.login(req.user);
    this.authService.storeTokenInCookie(res, authToken);
    res.status(200).send({ message: 'ok' });
    return;
  }

  @UseGuards(RefreshAuthGuard)
  @Get('refresh')
  async refreshTokens(
    @Req() req: RequestType,
    @Res() res: ResponseType,
  ): Promise<void> {
    const newAuthToken = await this.authService.refreshAccessToken(req.user);
    this.authService.storeTokenInCookie(res, newAuthToken);
    res.status(200).send({ message: 'ok' });
    return;
  }
}

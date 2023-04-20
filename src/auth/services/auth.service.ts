import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Response as ResponseType } from 'express';
import { UserService } from 'src/user/user.service';
import { PasswordService } from './password.service';
import { AuthTokenDto } from '../dto/auth-token.dto';
import { User } from 'src/models/user.entity';
import constants from 'src/configs/constants';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private passwordService: PasswordService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(email: string, pass: string): Promise<User | null> {
    const user = await this.userService.findUserByEmail(email);
    const isPassword = await this.passwordService.comparePassword(
      pass,
      user?.password,
    );
    if (user && isPassword) {
      return user;
    }
    return null;
  }

  async login(user: any): Promise<AuthTokenDto> {
    const tokens = await this.getTokens(user);
    await this.updateRefreshToken(user.email, tokens.refreshToken);
    return tokens;
  }

  async getTokens(user: any): Promise<AuthTokenDto> {
    const payload = { email: user.email, id: user.id };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('SECRET_KEY'),
        expiresIn: this.configService.get<string>('ACCESS_TOKEN_EXPIRES_IN'),
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('REFRESH_SECRET_KEY'),
        expiresIn: this.configService.get<string>('REFRESH_TOKEN_EXPIRES_IN'),
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async updateRefreshToken(email: string, refreshToken: string): Promise<void> {
    const user = await this.userService.findUserByEmail(email);
    if (user) {
      user.refreshToken = refreshToken;
      await this.userService.updateUser(user);
    }
  }

  storeTokenInCookie(res: ResponseType, authToken: AuthTokenDto): void {
    res.cookie('access_token', authToken.accessToken, {
      maxAge: constants.maxAgeAccessTokenInCookie,
      httpOnly: true,
    });
    res.cookie('refresh_token', authToken.refreshToken, {
      maxAge: constants.maxAgeRefreshTokenInCookie,
      httpOnly: true,
    });
    res.cookie('logged_in', true, {
      maxAge: constants.maxAgeAccessTokenInCookie,
    });
  }

  async refreshAccessToken(user: any): Promise<AuthTokenDto> {
    const tokens = await this.getTokens(user);
    await this.updateRefreshToken(user.email, tokens.refreshToken);
    return tokens;
  }
}

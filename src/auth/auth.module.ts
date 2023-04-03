import { Module, forwardRef } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './services/auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { LocalStrategy } from './strategies/local.strategy';
import { PasswordService } from './services/password.service';

@Module({
  imports: [forwardRef(() => UserModule), PassportModule],
  providers: [AuthService, LocalStrategy, PasswordService],
  exports: [PasswordService],
  controllers: [AuthController],
})
export class AuthModule {}

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AdminLoginController } from './admin-login.controller';
import { AdminLoginService } from './admin-login.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'super-secret-jwt-key',
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN || '1d' },
    }),
  ],
  controllers: [AdminLoginController],
  providers: [AdminLoginService],
  exports: [AdminLoginService],
})
export class AdminLoginModule {}

import { Module } from '@nestjs/common';
import { AdminLoginModule } from './admin-login/admin-login.module';

@Module({
  imports: [AdminLoginModule],
  exports: [AdminLoginModule],
})
export class AdminModule {}

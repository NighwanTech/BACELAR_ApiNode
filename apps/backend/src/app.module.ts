import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { StudentsModule } from './students/students.module';
import { MasterModule } from './master/master.module';
import { WebsiteModule } from './website/website.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    StudentsModule,
    MasterModule,
    WebsiteModule,
    AdminModule,
  ],
  controllers: [],
})
export class AppModule {}
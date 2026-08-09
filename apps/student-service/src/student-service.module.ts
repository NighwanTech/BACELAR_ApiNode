import { Module } from '@nestjs/common';
import { PrismaModule } from '@app/prisma';
import { StudentsModule } from './students/students.module';
import { MasterModule } from './master/master.module';
import { WebsiteModule } from './website/website.module';

@Module({
  imports: [PrismaModule, StudentsModule, MasterModule, WebsiteModule],
  controllers: [],
  providers: [],
})
export class StudentServiceModule {}

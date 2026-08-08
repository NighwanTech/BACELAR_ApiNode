import { Module } from '@nestjs/common';
import { PrismaModule } from '@app/prisma';
import { StudentsModule } from './students/students.module';
import { MasterModule } from './master/master.module';

@Module({
  imports: [PrismaModule, StudentsModule, MasterModule],
  controllers: [],
  providers: [],
})
export class StudentServiceModule {}

import { Module } from '@nestjs/common';
import { PrismaModule } from '@app/prisma';
import { StudentsModule } from './students/students.module';

@Module({
  imports: [PrismaModule, StudentsModule],
  controllers: [],
  providers: [],
})
export class StudentServiceModule {}

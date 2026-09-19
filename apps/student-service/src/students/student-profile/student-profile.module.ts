import { Module } from '@nestjs/common';
import { StudentProfileService } from './student-profile.service';
import { StudentProfileController } from './student-profile.controller';
import { PrismaModule } from '@app/prisma';

@Module({
  imports: [PrismaModule],
  controllers: [StudentProfileController],
  providers: [StudentProfileService],
  exports: [StudentProfileService],
})
export class StudentProfileModule {}

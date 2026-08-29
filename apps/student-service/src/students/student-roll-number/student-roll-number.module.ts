import { Module } from '@nestjs/common';
import { StudentRollNumberController } from './student-roll-number.controller';
import { StudentRollNumberService } from './student-roll-number.service';

@Module({
  controllers: [StudentRollNumberController],
  providers: [StudentRollNumberService],
})
export class StudentRollNumberModule {}

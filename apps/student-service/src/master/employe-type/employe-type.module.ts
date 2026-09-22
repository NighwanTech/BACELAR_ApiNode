import { Module } from '@nestjs/common';
import { EmployeTypeController } from './employe-type.controller';
import { EmployeTypeService } from './employe-type.service';

@Module({
  controllers: [EmployeTypeController],
  providers: [EmployeTypeService],
})
export class EmployeTypeModule {}

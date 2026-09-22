import { Module } from '@nestjs/common';
import { EmployeeDesignationController } from './employee-designation.controller';
import { EmployeeDesignationService } from './employee-designation.service';

@Module({
  controllers: [EmployeeDesignationController],
  providers: [EmployeeDesignationService],
})
export class EmployeeDesignationModule {}

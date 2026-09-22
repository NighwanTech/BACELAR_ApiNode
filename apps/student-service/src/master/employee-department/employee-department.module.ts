import { Module } from '@nestjs/common';
import { EmployeeDepartmentController } from './employee-department.controller';
import { EmployeeDepartmentService } from './employee-department.service';

@Module({
  controllers: [EmployeeDepartmentController],
  providers: [EmployeeDepartmentService],
})
export class EmployeeDepartmentModule {}

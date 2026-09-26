import { IsArray, IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class UpdateEmployeeDepartmentDto {
  @ApiProperty({ example: 'Computer Science', description: 'Name of the employee department', required: false })
  @IsString()
  @IsOptional()
  employeeDepartmentName?: string;

  @ApiProperty({ example: [1, 2], description: 'Programs this department belongs to', type: [Number], required: false })
  @IsArray()
  @Type(() => Number)
  @IsInt({ each: true })
  @IsOptional()
  programIds?: number[];

  @ApiProperty({ example: 'Admin User', description: 'Username of updater' })
  @IsString()
  @IsNotEmpty()
  UpdatedBy: string;

  @ApiProperty({ example: true, description: 'Active status', required: false })
  @IsBoolean()
  @IsOptional()
  IsActive?: boolean;

  @ApiProperty({ example: 'Employee department update', description: 'Optional remarks', required: false })
  @IsString()
  @IsOptional()
  Remarks?: string;
}

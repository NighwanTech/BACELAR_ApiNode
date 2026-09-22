import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateEmployeeCategoryDto {
  @ApiProperty({ example: 'Regular', description: 'Name of the employee category', required: false })
  @IsString()
  @IsOptional()
  employeeCategoryName?: string;

  @ApiProperty({ example: 'Admin User', description: 'Username of updater' })
  @IsString()
  @IsNotEmpty()
  UpdatedBy: string;

  @ApiProperty({ example: true, description: 'Active status', required: false })
  @IsBoolean()
  @IsOptional()
  IsActive?: boolean;

  @ApiProperty({ example: 'Employee category update', description: 'Optional remarks', required: false })
  @IsString()
  @IsOptional()
  Remarks?: string;
}

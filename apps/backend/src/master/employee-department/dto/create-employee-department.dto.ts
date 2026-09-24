import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateEmployeeDepartmentDto {
  @ApiProperty({ example: 'Computer Science', description: 'Name of the employee department' })
  @IsString()
  @IsNotEmpty()
  employeeDepartmentName: string;

  @ApiProperty({ example: [1, 2], description: 'Programs this department belongs to', type: [Number] })
  @IsArray()
  @Type(() => Number)
  @IsInt({ each: true })
  programIds: number[];

  @ApiProperty({ example: 'Admin User', description: 'Username of creator' })
  @IsString()
  @IsNotEmpty()
  CreatedBy: string;

  @ApiProperty({ example: 'Academic department', description: 'Optional remarks', required: false })
  @IsString()
  @IsOptional()
  Remarks?: string;
}

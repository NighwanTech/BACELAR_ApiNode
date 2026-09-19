import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateYearDto {
  @ApiProperty({ example: 1, description: 'ID of the associated exam type (ExamTypeMaster)', required: false })
  @IsInt()
  @IsOptional()
  typeId?: number;

  @ApiProperty({ example: '1st Year', description: 'Name of the year' })
  @IsString()
  @IsNotEmpty()
  yearName: string;

  @ApiProperty({ example: 'Admin User', description: 'Username of creator' })
  @IsString()
  @IsNotEmpty()
  CreatedBy: string;

  @ApiProperty({ example: 'Year master entry', description: 'Optional remarks', required: false })
  @IsString()
  @IsOptional()
  Remarks?: string;
}

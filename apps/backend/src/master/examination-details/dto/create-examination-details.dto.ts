import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateExaminationDetailsDto {
  @ApiProperty({ example: 1, description: 'Academic session ID this examination belongs to' })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  academicId: number;

  @ApiProperty({ example: 'Mid Term', description: 'Examination name' })
  @IsString()
  @IsNotEmpty()
  examinationName: string;

  @ApiProperty({ example: 'Annual', description: 'Exam type: Annual or Semester', required: false })
  @IsString()
  @IsOptional()
  examType?: string;

  @ApiProperty({ example: 'Admin User', description: 'Username of creator' })
  @IsString()
  @IsNotEmpty()
  CreatedBy: string;

  @ApiProperty({ example: 'Examination details master entry', required: false })
  @IsString()
  @IsOptional()
  Remarks?: string;
}

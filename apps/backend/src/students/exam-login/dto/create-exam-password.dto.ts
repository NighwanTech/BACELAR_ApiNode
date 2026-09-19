import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateExamPasswordDto {
  @ApiProperty({ example: 1, description: 'Student Registration ID' })
  @IsNotEmpty()
  @IsNumber()
  studentId: number;

  @ApiProperty({ example: 1, description: 'Student Enrollment ID', required: false })
  @IsOptional()
  @IsNumber()
  enrollmentId?: number;

  @ApiProperty({ example: 'BACE2024010001', description: 'Enrollment Number' })
  @IsNotEmpty()
  @IsString()
  enrollmentNo: string;

  @ApiProperty({ example: 'Password@123', description: 'New password for student exam login' })
  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;
}

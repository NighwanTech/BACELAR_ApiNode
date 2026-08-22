import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ExamLoginDto {
  @ApiProperty({ example: 'BACE2024010001', description: 'User ID or Enrollment Number' })
  @IsNotEmpty()
  @IsString()
  enrollmentNo: string;

  @ApiProperty({ example: 'Password@123', description: 'Exam login password' })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ example: 'dBC9fP', description: 'Captcha text', required: false })
  @IsOptional()
  @IsString()
  captcha?: string;
}

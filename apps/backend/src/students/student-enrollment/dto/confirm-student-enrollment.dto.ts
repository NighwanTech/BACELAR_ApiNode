import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class ConfirmStudentEnrollmentDto {
  @ApiProperty({ example: 1, description: 'Student registration ID' })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  studentId: number;

  @ApiProperty({ example: 'Admin User' })
  @IsString()
  @IsNotEmpty()
  CreatedBy: string;

  @ApiProperty({ example: 'Admission confirmed', required: false })
  @IsString()
  @IsOptional()
  Remarks?: string;
}

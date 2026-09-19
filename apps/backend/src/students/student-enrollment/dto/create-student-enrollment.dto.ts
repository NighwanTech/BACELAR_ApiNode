import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateStudentEnrollmentDto {
  @ApiProperty({ example: 1, description: 'Student registration ID' })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  studentId: number;

  @ApiProperty({ example: 'ENR2026001', required: false })
  @IsString()
  @IsOptional()
  enrollmentNo?: string;

  @ApiProperty({ example: 'REG2026001', required: false })
  @IsString()
  @IsOptional()
  registrationNo?: string;

  @ApiProperty({ example: 'Login@123', required: false })
  @IsString()
  @IsOptional()
  loginPassword?: string;

  @ApiProperty({ example: 'Exam@123', required: false })
  @IsString()
  @IsOptional()
  examPassword?: string;

  @ApiProperty({ example: 'Rahul Sharma', required: false })
  @IsString()
  @IsOptional()
  studentName?: string;

  @ApiProperty({ example: 'Ram Sharma', required: false })
  @IsString()
  @IsOptional()
  fatherName?: string;

  @ApiProperty({ example: 'Sita Sharma', required: false })
  @IsString()
  @IsOptional()
  motherName?: string;

  @ApiProperty({ example: 1, required: false })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  programId?: number;

  @ApiProperty({ example: 1, required: false })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  yearId?: number;

  @ApiProperty({ example: 1, required: false })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  semId?: number;

  @ApiProperty({ example: '2004-05-12', required: false })
  @IsDateString()
  @IsOptional()
  dateOfBirth?: string;

  @ApiProperty({ example: '9876543210', required: false })
  @IsString()
  @IsOptional()
  fatherMobNo?: string;

  @ApiProperty({ example: '123412341234', required: false })
  @IsString()
  @IsOptional()
  adharNo?: string;

  @ApiProperty({ example: 'APAAR123456', required: false })
  @IsString()
  @IsOptional()
  apaarNo?: string;

  @ApiProperty({ example: 'MALE', required: false })
  @IsString()
  @IsOptional()
  gender?: string;

  @ApiProperty({ example: 'student@example.com', required: false })
  @IsString()
  @IsOptional()
  emailId?: string;

  @ApiProperty({ example: 1, description: 'Admission session ID', required: false })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  sessionId?: number;

  @ApiProperty({ example: 'Admin User' })
  @IsString()
  @IsNotEmpty()
  CreatedBy: string;

  @ApiProperty({ example: 'Enrollment created', required: false })
  @IsString()
  @IsOptional()
  Remarks?: string;
}

import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStudentDto {
  @ApiProperty({ example: 'AMIT KUMAR', description: 'Name of the candidate' })
  @IsString()
  @IsNotEmpty()
  candidateName: string;

  @ApiProperty({ example: 'SURESH KUMAR', description: "Father's name" })
  @IsString()
  @IsNotEmpty()
  fatherName: string;

  @ApiProperty({ example: 'amit.kumar@example.com', description: 'Unique email address' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '9876543210', description: '10-digit mobile number' })
  @IsString()
  @IsNotEmpty()
  mobileNo: string;

  @ApiProperty({ example: 'BAC/2026/83942', description: 'Registration number', required: false })
  @IsString()
  @IsOptional()
  registrationNo?: string;

  @ApiProperty({ example: 'Admin', description: 'User creating this record' })
  @IsString()
  @IsNotEmpty()
  CreatedBy: string;

  @ApiProperty({ example: 'New admission candidate', description: 'Any extra remarks', required: false })
  @IsString()
  @IsOptional()
  Remarks?: string;

  @ApiProperty({ example: '2026-09-03', description: 'Registration date (saves to CreatedOn)', required: false })
  @IsString()
  @IsOptional()
  CreatedOn?: string;

  @ApiProperty({ example: 'ADMIN', description: 'WEBSITE or ADMIN', required: false })
  @IsString()
  @IsOptional()
  source?: string;
}

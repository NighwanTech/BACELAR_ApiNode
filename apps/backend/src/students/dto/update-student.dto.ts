import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateStudentDto {
  @ApiProperty({ example: 'AMIT KUMAR', required: false })
  @IsString()
  @IsOptional()
  candidateName?: string;

  @ApiProperty({ example: 'SURESH KUMAR', required: false })
  @IsString()
  @IsOptional()
  fatherName?: string;

  @ApiProperty({ example: 'amit.kumar@example.com', required: false })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ example: '9876543210', required: false })
  @IsString()
  @IsOptional()
  mobileNo?: string;

  @ApiProperty({ example: 'BAC/2026/83942', required: false })
  @IsString()
  @IsOptional()
  registrationNo?: string;

  @ApiProperty({ example: 'Editor Admin', description: 'User updating this record' })
  @IsString()
  @IsOptional()
  UpdatedBy?: string;

  @ApiProperty({ example: true, required: false })
  @IsBoolean()
  @IsOptional()
  IsActive?: boolean;

  @ApiProperty({ example: 'Updated details', required: false })
  @IsString()
  @IsOptional()
  Remarks?: string;

  @ApiProperty({
    example: false,
    description: 'B.P.Ed. sport certificate flag (optional; default false in DB)',
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  hasSportCertificate?: boolean;
}

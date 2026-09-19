import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateStudentProfileDto {
  @ApiProperty({ example: 'राम कुमार सिंह', required: false })
  @IsString()
  @IsOptional()
  studentNameHindi?: string;

  @ApiProperty({ example: 'सोहन सिंह', required: false })
  @IsString()
  @IsOptional()
  fatherNameHindi?: string;

  @ApiProperty({ example: 'MIRA DEVI', required: false })
  @IsString()
  @IsOptional()
  motherName?: string;

  @ApiProperty({ example: 'मीरा देवी', required: false })
  @IsString()
  @IsOptional()
  motherNameHindi?: string;

  @ApiProperty({ example: '9876543120', required: false })
  @IsString()
  @IsOptional()
  fatherMobileNumber?: string;

  @ApiProperty({ example: '2001-08-15', required: false })
  @IsString()
  @IsOptional()
  dateOfBirth?: string;

  @ApiProperty({ example: 'MALE', required: false })
  @IsString()
  @IsOptional()
  gender?: string;

  @ApiProperty({ example: 'SINGLE', required: false })
  @IsString()
  @IsOptional()
  maritalStatus?: string;

  @ApiProperty({ example: 'HINDUISM', required: false })
  @IsString()
  @IsOptional()
  religion?: string;

  @ApiProperty({ example: 'Indian', required: false })
  @IsString()
  @IsOptional()
  nationality?: string;

  @ApiProperty({ example: 'GENERAL', required: false })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiProperty({ example: 'NONE', required: false })
  @IsString()
  @IsOptional()
  subCategory?: string;

  @ApiProperty({ example: 'No', required: false })
  @IsString()
  @IsOptional()
  physicalHandicap?: string;

  @ApiProperty({ example: 'CERT-12345', required: false })
  @IsString()
  @IsOptional()
  certificateNo?: string;

  @ApiProperty({ example: 'https://example.com/cert.pdf', required: false })
  @IsString()
  @IsOptional()
  certificateAttachment?: string;

  @ApiProperty({ example: '123456789012', required: false })
  @IsString()
  @IsOptional()
  aadharIdNo?: string;

  @ApiProperty({ example: 'APAAR-7788', required: false })
  @IsString()
  @IsOptional()
  apaarIdNo?: string;

  @ApiProperty({ example: 'RAM KUMAR SINGH', required: false, description: 'Name as per Aadhaar' })
  @IsString()
  @IsOptional()
  nameAsPerAdhar?: string;

  @ApiProperty({ example: '2001-08-15', required: false, description: 'DOB as per Aadhaar' })
  @IsString()
  @IsOptional()
  dobAsPerAdhar?: string;

  // Correspondence Address
  @ApiProperty({ example: 'Flat 101, block A', required: false })
  @IsString()
  @IsOptional()
  CaddressLine1?: string;

  @ApiProperty({ example: 'Green View Apartments', required: false })
  @IsString()
  @IsOptional()
  CaddressLine2?: string;

  @ApiProperty({ example: 'Sector 62', required: false })
  @IsString()
  @IsOptional()
  CaddressLine3?: string;

  @ApiProperty({ example: 'Uttar Pradesh', required: false })
  @IsString()
  @IsOptional()
  Cstate?: string;

  @ApiProperty({ example: 'Noida', required: false })
  @IsString()
  @IsOptional()
  Ccity?: string;

  @ApiProperty({ example: '201301', required: false })
  @IsString()
  @IsOptional()
  Cpincode?: string;

  // Permanent Address
  @ApiProperty({ example: 'Village Rampur', required: false })
  @IsString()
  @IsOptional()
  PaddressLine1?: string;

  @ApiProperty({ example: 'Post Office Rampur', required: false })
  @IsString()
  @IsOptional()
  PaddressLine2?: string;

  @ApiProperty({ example: 'Tehsil Sadar', required: false })
  @IsString()
  @IsOptional()
  PaddressLine3?: string;

  @ApiProperty({ example: 'Uttar Pradesh', required: false })
  @IsString()
  @IsOptional()
  Pstate?: string;

  @ApiProperty({ example: 'Varanasi', required: false })
  @IsString()
  @IsOptional()
  Pcity?: string;

  @ApiProperty({ example: '221001', required: false })
  @IsString()
  @IsOptional()
  Ppincode?: string;

  @ApiProperty({ example: 'Editor Admin' })
  @IsString()
  @IsNotEmpty()
  UpdatedBy: string;

  @ApiProperty({ example: true, required: false })
  @IsBoolean()
  @IsOptional()
  IsActive?: boolean;

  @ApiProperty({ example: 'Updated profile details', required: false })
  @IsString()
  @IsOptional()
  Remarks?: string;
}

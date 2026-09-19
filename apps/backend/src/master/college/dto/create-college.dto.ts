import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCollegeDto {
  @ApiProperty({ example: 'REG12345', description: 'Registration Number of the College', required: false })
  @IsString()
  @IsOptional()
  registrationNumber?: string;

  @ApiProperty({ example: 'CLG001', description: 'College Code', required: false })
  @IsString()
  @IsOptional()
  collegeCode?: string;

  @ApiProperty({ example: 'Bacelar Institute of Technology', description: 'Name of the College' })
  @IsString()
  @IsNotEmpty()
  collegeName: string;

  @ApiProperty({ example: 'BIT', description: 'Short Name of the College', required: false })
  @IsString()
  @IsOptional()
  shortName?: string;

  @ApiProperty({ example: '123 Tech Park, Knowledge Park III, Greater Noida', description: 'Address of the College', required: false })
  @IsString()
  @IsOptional()
  collegeAddress?: string;

  @ApiProperty({ example: '+919876543210', description: 'Primary Contact Number', required: false })
  @IsString()
  @IsOptional()
  primaryContactNumber?: string;

  @ApiProperty({ example: '+919876543211', description: 'Alternate Contact Number', required: false })
  @IsString()
  @IsOptional()
  alternateContactNumber?: string;

  @ApiProperty({ example: 'info@bacelarinstitute.edu.in', description: 'Email ID', required: false })
  @IsString()
  @IsOptional()
  emailId?: string;

  @ApiProperty({ example: 'https://bacelarinstitute.edu.in', description: 'College Website URL', required: false })
  @IsString()
  @IsOptional()
  collegeWebsite?: string;

  @ApiProperty({ example: true, description: 'Is college active?', required: false })
  @IsBoolean()
  @IsOptional()
  IsActive?: boolean;

  @ApiProperty({ example: 'Admin User', description: 'Username of creator', required: false })
  @IsString()
  @IsOptional()
  CreatedBy?: string;

  @ApiProperty({ example: 'College master entry', description: 'Optional remarks', required: false })
  @IsString()
  @IsOptional()
  Remarks?: string;
}

import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateContactEnquiryDto {
  @ApiProperty({ example: 'Suresh Kumar', description: 'Name of the contact inquirer' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '9876543210', description: 'Phone number' })
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({ example: 'suresh@example.com', description: 'Email address', required: false })
  @IsString()
  @IsOptional()
  email?: string;

  @ApiProperty({ example: 'BBA', description: 'Course of interest', required: false })
  @IsString()
  @IsOptional()
  course?: string;

  @ApiProperty({ example: 'Please provide hostel details and fee structure.', description: 'Message / inquiry text', required: false })
  @IsString()
  @IsOptional()
  message?: string;

  @ApiProperty({ example: 'PENDING', description: 'Status of inquiry (e.g. PENDING, CONTACTED, RESOLVED)', required: false })
  @IsString()
  @IsOptional()
  status?: string;

  @ApiProperty({ example: false, description: 'Has admin read the inquiry?', required: false })
  @IsBoolean()
  @IsOptional()
  isRead?: boolean;

  @ApiProperty({ example: 'System / Website', description: 'Creator identifier', required: false })
  @IsString()
  @IsOptional()
  CreatedBy?: string;

  @ApiProperty({ example: 'Contact form inquiry', description: 'Optional remarks', required: false })
  @IsString()
  @IsOptional()
  Remarks?: string;
}

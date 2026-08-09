import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateContactEnquiryDto {
  @ApiProperty({ example: 'Suresh Kumar', description: 'Name of the contact inquirer', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ example: '9876543210', description: 'Phone number', required: false })
  @IsString()
  @IsOptional()
  phoneNumber?: string;

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

  @ApiProperty({ example: 'RESOLVED', description: 'Status of inquiry', required: false })
  @IsString()
  @IsOptional()
  status?: string;

  @ApiProperty({ example: true, description: 'Has admin read the inquiry?', required: false })
  @IsBoolean()
  @IsOptional()
  isRead?: boolean;

  @ApiProperty({ example: 'Editor Admin', description: 'Username of editor' })
  @IsString()
  @IsNotEmpty()
  UpdatedBy: string;

  @ApiProperty({ example: true, description: 'Is contact inquiry active?', required: false })
  @IsBoolean()
  @IsOptional()
  IsActive?: boolean;

  @ApiProperty({ example: 'Resolved over phone call', description: 'Optional remarks', required: false })
  @IsString()
  @IsOptional()
  Remarks?: string;
}

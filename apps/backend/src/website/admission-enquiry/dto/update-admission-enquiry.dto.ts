import { IsBoolean, IsDateString, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAdmissionEnquiryDto {
  @ApiProperty({ example: 'Rahul Kumar', description: 'Name of candidate', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ example: '9876543210', description: 'Contact phone number', required: false })
  @IsString()
  @IsOptional()
  contactNo?: string;

  @ApiProperty({ example: '9876543210', description: 'WhatsApp phone number', required: false })
  @IsString()
  @IsOptional()
  whatsappNo?: string;

  @ApiProperty({ example: 'rahul@example.com', description: 'Email address', required: false })
  @IsString()
  @IsOptional()
  email?: string;

  @ApiProperty({ example: '123 Main Street, Patna, Bihar', description: 'Residential Address', required: false })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({ example: 101, description: 'Course ID', required: false })
  @IsInt()
  @IsOptional()
  courseId?: number;

  @ApiProperty({ example: 'Bachelor of Computer Applications (BCA)', description: 'Course Name', required: false })
  @IsString()
  @IsOptional()
  courseName?: string;

  @ApiProperty({ example: 2026, description: 'Academic Session ID', required: false })
  @IsInt()
  @IsOptional()
  sessionId?: number;

  @ApiProperty({ example: '2026-2027', description: 'Academic Session Name', required: false })
  @IsString()
  @IsOptional()
  sessionName?: string;

  @ApiProperty({ example: 'Interested in direct admission process and fee structure.', description: 'Enquiry Message', required: false })
  @IsString()
  @IsOptional()
  message?: string;

  @ApiProperty({ example: 'CONTACTED', description: 'Status of enquiry', required: false })
  @IsString()
  @IsOptional()
  status?: string;

  @ApiProperty({ example: 'WEBSITE', description: 'Lead source', required: false })
  @IsString()
  @IsOptional()
  source?: string;

  @ApiProperty({ example: 'Called candidate. Sent prospectus via WhatsApp.', description: 'Admin Notes', required: false })
  @IsString()
  @IsOptional()
  adminNotes?: string;

  @ApiProperty({ example: '2026-08-15T10:00:00.000Z', description: 'Follow-up Date (ISO String)', required: false })
  @IsDateString()
  @IsOptional()
  followUpDate?: string;

  @ApiProperty({ example: 'Counsellor Amit', description: 'Assigned Staff / Counsellor', required: false })
  @IsString()
  @IsOptional()
  assignedTo?: string;

  @ApiProperty({ example: true, description: 'Has admin read the enquiry?', required: false })
  @IsBoolean()
  @IsOptional()
  isRead?: boolean;

  @ApiProperty({ example: 'Admin User', description: 'Username of editor' })
  @IsString()
  @IsNotEmpty()
  UpdatedBy: string;

  @ApiProperty({ example: true, description: 'Is enquiry record active?', required: false })
  @IsBoolean()
  @IsOptional()
  IsActive?: boolean;

  @ApiProperty({ example: 'Updated enquiry notes', description: 'Optional remarks', required: false })
  @IsString()
  @IsOptional()
  Remarks?: string;
}

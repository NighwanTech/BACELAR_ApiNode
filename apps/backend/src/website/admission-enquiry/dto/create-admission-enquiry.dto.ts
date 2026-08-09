import { IsBoolean, IsDateString, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAdmissionEnquiryDto {
  @ApiProperty({ example: 'ENQ-20260809-0001', description: 'Enquiry Reference Number (Auto-generated if left empty)', required: false })
  @IsString()
  @IsOptional()
  enquiryNumber?: string;

  @ApiProperty({ example: 'Rahul Kumar', description: 'Name of candidate' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '9876543210', description: 'Contact phone number' })
  @IsString()
  @IsNotEmpty()
  contactNo: string;

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

  @ApiProperty({ example: 'PENDING', description: 'Status of enquiry (e.g., PENDING, CONTACTED, ADMITTED, REJECTED)', required: false })
  @IsString()
  @IsOptional()
  status?: string;

  @ApiProperty({ example: 'WEBSITE', description: 'Lead source (e.g. WEBSITE, LANDING_PAGE, REFERRAL)', required: false })
  @IsString()
  @IsOptional()
  source?: string;

  @ApiProperty({ example: 'Called on 10th Aug. Student asked to call back.', description: 'Admin Notes', required: false })
  @IsString()
  @IsOptional()
  adminNotes?: string;

  @ApiProperty({ example: '2026-08-12T10:00:00.000Z', description: 'Follow-up Date (ISO String)', required: false })
  @IsDateString()
  @IsOptional()
  followUpDate?: string;

  @ApiProperty({ example: 'Counsellor Amit', description: 'Assigned Staff / Counsellor', required: false })
  @IsString()
  @IsOptional()
  assignedTo?: string;

  @ApiProperty({ example: false, description: 'Has admin read the enquiry?', required: false })
  @IsBoolean()
  @IsOptional()
  isRead?: boolean;

  @ApiProperty({ example: 'System / Website', description: 'Creator identifier', required: false })
  @IsString()
  @IsOptional()
  CreatedBy?: string;

  @ApiProperty({ example: 'Submitted via website form', description: 'Optional remarks', required: false })
  @IsString()
  @IsOptional()
  Remarks?: string;
}

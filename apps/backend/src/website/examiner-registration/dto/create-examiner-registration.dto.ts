import { IsBoolean, IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateExaminerRegistrationDto {
  @ApiProperty({ example: 'Bacelar Institute of Technology', description: 'Institution Name', required: false })
  @IsString()
  @IsOptional()
  institutionName?: string;

  @ApiProperty({ example: '2026-2027', description: 'Exam Session Year', required: false })
  @IsString()
  @IsOptional()
  examSessionYear?: string;

  @ApiProperty({ example: 'Internal Examiner', description: 'Registration Type', required: false })
  @IsString()
  @IsOptional()
  registrationType?: string;

  @ApiProperty({ example: 'Dr. Rajesh Kumar', description: 'Full Name of the Examiner' })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({ example: 'Shri Rameshwar Prasad', description: 'Father / Spouse Name', required: false })
  @IsString()
  @IsOptional()
  fatherSpouseName?: string;

  @ApiProperty({ example: '1985-05-15T00:00:00.000Z', description: 'Date of Birth (ISO String)', required: false })
  @IsDateString()
  @IsOptional()
  dateOfBirth?: string;

  @ApiProperty({ example: 'Male', description: 'Gender', required: false })
  @IsString()
  @IsOptional()
  gender?: string;

  @ApiProperty({ example: '9876543210', description: 'Primary Mobile Number' })
  @IsString()
  @IsNotEmpty()
  mobileNo: string;

  @ApiProperty({ example: '9123456789', description: 'Alternate Mobile Number', required: false })
  @IsString()
  @IsOptional()
  alternateMobile?: string;

  @ApiProperty({ example: 'rajesh.kumar@example.com', description: 'Email ID', required: false })
  @IsString()
  @IsOptional()
  emailId?: string;

  @ApiProperty({ example: 'Flat 402, Green Park Apartments, Patna, Bihar', description: 'Address', required: false })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({ example: 'Ph.D. in Computer Science', description: 'Highest Qualification', required: false })
  @IsString()
  @IsOptional()
  highestQualification?: string;

  @ApiProperty({ example: 'Artificial Intelligence & Machine Learning', description: 'Specialization Field', required: false })
  @IsString()
  @IsOptional()
  specialization?: string;

  @ApiProperty({ example: 'Associate Professor', description: 'Designation', required: false })
  @IsString()
  @IsOptional()
  designation?: string;

  @ApiProperty({ example: 'Patna University', description: 'Present Institution', required: false })
  @IsString()
  @IsOptional()
  presentInstitution?: string;

  @ApiProperty({ example: '12 Years', description: 'Teaching Experience', required: false })
  @IsString()
  @IsOptional()
  teachingExperience?: string;

  @ApiProperty({ example: 'Aryabhatta Knowledge University', description: 'University Affiliation', required: false })
  @IsString()
  @IsOptional()
  universityAffiliation?: string;

  @ApiProperty({ example: 'Rajesh Kumar', description: 'Bank Account Holder Name', required: false })
  @IsString()
  @IsOptional()
  accountHolderName?: string;

  @ApiProperty({ example: 'State Bank of India', description: 'Bank Name', required: false })
  @IsString()
  @IsOptional()
  bankName?: string;

  @ApiProperty({ example: 'Main Branch, Patna', description: 'Bank Branch Name', required: false })
  @IsString()
  @IsOptional()
  branch?: string;

  @ApiProperty({ example: '123456789012', description: 'Bank Account Number', required: false })
  @IsString()
  @IsOptional()
  accountNumber?: string;

  @ApiProperty({ example: 'SBIN0001234', description: 'IFSC Code', required: false })
  @IsString()
  @IsOptional()
  ifscCode?: string;

  @ApiProperty({ example: true, description: 'Is examiner active?', required: false })
  @IsBoolean()
  @IsOptional()
  IsActive?: boolean;

  @ApiProperty({ example: 'System / Website', description: 'Creator identifier', required: false })
  @IsString()
  @IsOptional()
  CreatedBy?: string;

  @ApiProperty({ example: 'Submitted via examiner registration portal', description: 'Optional remarks', required: false })
  @IsString()
  @IsOptional()
  Remarks?: string;
}

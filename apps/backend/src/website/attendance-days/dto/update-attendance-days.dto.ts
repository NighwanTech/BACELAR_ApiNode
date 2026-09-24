import { IsBoolean, IsInt, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAttendanceDaysDto {
  @ApiProperty({ example: 1, description: 'Student ID', required: false })
  @IsInt()
  @IsOptional()
  studentId?: number;

  @ApiProperty({ example: 1, description: 'Student Enrollment ID', required: false })
  @IsInt()
  @IsOptional()
  studentEnrollmentId?: number;

  @ApiProperty({ example: 1, description: 'Student Enrollment ID (alias)', required: false })
  @IsInt()
  @IsOptional()
  enrollmentId?: number;

  @ApiProperty({ example: 'Rahul Kumar', description: 'Student Name', required: false })
  @IsString()
  @IsOptional()
  studentName?: string;

  @ApiProperty({ example: 'EN20250001', description: 'Enrollment Number', required: false })
  @IsString()
  @IsOptional()
  enrollmentNumber?: string;

  @ApiProperty({ example: 'Suresh Kumar', description: 'Fathers Name', required: false })
  @IsString()
  @IsOptional()
  fathersName?: string;

  @ApiProperty({ example: 1, description: 'Academic Session ID (from AcademicSessionMaster)', required: false })
  @IsInt()
  @IsOptional()
  academicSessionId?: number;

  @ApiProperty({ example: '2025-2026', description: 'Academic Session Name', required: false })
  @IsString()
  @IsOptional()
  academicSessionName?: string;

  @ApiProperty({ example: 1, description: 'Session ID (Legacy alias)', required: false })
  @IsInt()
  @IsOptional()
  sessionId?: number;

  @ApiProperty({ example: '2025-2026', description: 'Session Name (Legacy alias)', required: false })
  @IsString()
  @IsOptional()
  sessionName?: string;

  @ApiProperty({ example: 1, description: 'Program Category ID', required: false })
  @IsInt()
  @IsOptional()
  programCategoryId?: number;

  @ApiProperty({ example: 'UNDER GRADUATE', description: 'Program Category Name', required: false })
  @IsString()
  @IsOptional()
  programCategoryName?: string;

  @ApiProperty({ example: 1, description: 'Program ID', required: false })
  @IsInt()
  @IsOptional()
  programId?: number;

  @ApiProperty({ example: 'B.TECH', description: 'Program Name', required: false })
  @IsString()
  @IsOptional()
  programName?: string;

  @ApiProperty({ example: 1, description: 'Year ID', required: false })
  @IsInt()
  @IsOptional()
  yearId?: number;

  @ApiProperty({ example: '1st Year', description: 'Year Name', required: false })
  @IsString()
  @IsOptional()
  yearName?: string;

  @ApiProperty({ example: 1, description: 'Semester ID', required: false })
  @IsInt()
  @IsOptional()
  semId?: number;

  @ApiProperty({ example: '1st Sem', description: 'Semester Name', required: false })
  @IsString()
  @IsOptional()
  semName?: string;

  @ApiProperty({ example: 4, description: 'Month ID', required: false })
  @IsInt()
  @IsOptional()
  monthId?: number;

  @ApiProperty({ example: 'April', description: 'Month Name', required: false })
  @IsString()
  @IsOptional()
  monthName?: string;

  @ApiProperty({ example: 1, description: 'Academic Year ID', required: false })
  @IsInt()
  @IsOptional()
  academicYearId?: number;

  @ApiProperty({ example: '2025-2026', description: 'Academic Year Name', required: false })
  @IsString()
  @IsOptional()
  academicYearname?: string;

  @ApiProperty({ example: 25, description: 'Total Teaching Days', required: false })
  @IsInt()
  @IsOptional()
  teachingDays?: number;

  @ApiProperty({ example: 24, description: 'Total Present Days', required: false })
  @IsInt()
  @IsOptional()
  presentDays?: number;

  @ApiProperty({ example: 96.0, description: 'Total Attendance Percentage (Calculated automatically if omitted)', required: false })
  @IsNumber()
  @IsOptional()
  totalAttendancePercentage?: number;

  @ApiProperty({ example: 'Admin Editor', description: 'Updated By User Name', required: false })
  @IsString()
  @IsOptional()
  UpdatedBy?: string;

  @ApiProperty({ example: true, description: 'Active Status', required: false })
  @IsBoolean()
  @IsOptional()
  IsActive?: boolean;

  @ApiProperty({ example: 'Updated attendance record', description: 'Remarks', required: false })
  @IsString()
  @IsOptional()
  Remarks?: string;
}

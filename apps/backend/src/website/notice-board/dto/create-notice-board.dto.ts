import { IsBoolean, IsDateString, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNoticeBoardDto {
  @ApiProperty({ example: 'End Semester Examination Schedule 2026', description: 'Title of the notice' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Academic', description: 'Category (e.g. Academic, Exam, Admission, General)', required: false })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiProperty({ example: 'URGENT', description: 'Badge text / tag', required: false })
  @IsString()
  @IsOptional()
  badgeText?: string;

  @ApiProperty({ example: 'Detailed examination timetable for all UG and PG programs.', description: 'Notice description', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: '2026-08-10T00:00:00.000Z', description: 'Publish Date (ISO string)', required: false })
  @IsDateString()
  @IsOptional()
  publishDate?: string;

  @ApiProperty({ example: 'ACTIVE', description: 'Status of notice (e.g., ACTIVE, EXPIRED, DRAFT)', required: false })
  @IsString()
  @IsOptional()
  status?: string;

  @ApiProperty({ example: 'https://example.com/notices/exam-schedule.pdf', description: 'PDF Attachment URL', required: false })
  @IsString()
  @IsOptional()
  pdf?: string;

  @ApiProperty({ example: 'https://example.com/notices/exam-details', description: 'External/Internal URL Link', required: false })
  @IsString()
  @IsOptional()
  link?: string;

  @ApiProperty({ example: false, description: 'Is notice pinned to top?', required: false })
  @IsBoolean()
  @IsOptional()
  isPinned?: boolean;

  @ApiProperty({ example: 1, description: 'Display order priority', required: false })
  @IsInt()
  @IsOptional()
  displayOrder?: number;

  @ApiProperty({ example: true, description: 'Is notice active on website?', required: false })
  @IsBoolean()
  @IsOptional()
  IsActive?: boolean;

  @ApiProperty({ example: 'Admin User', description: 'Username of creator', required: false })
  @IsString()
  @IsOptional()
  CreatedBy?: string;

  @ApiProperty({ example: 'Exam cell announcement', description: 'Optional remarks', required: false })
  @IsString()
  @IsOptional()
  Remarks?: string;
}

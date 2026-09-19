import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';

export class StudentAttendanceRowDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  studentId: number;

  @ApiProperty({ example: '202501001' })
  @IsString()
  rollNo: string;

  @ApiProperty({ example: 'John Doe' })
  @IsString()
  studentName: string;

  @ApiPropertyOptional({ example: 'Father Name' })
  @IsOptional()
  @IsString()
  fatherName?: string;

  @ApiPropertyOptional({ example: 'Regular' })
  @IsOptional()
  @IsString()
  examCategory?: string;

  @ApiPropertyOptional({ example: '9876543210' })
  @IsOptional()
  @IsString()
  mobileNo?: string;

  @ApiProperty({ example: 'P', description: "'P' for Present, 'A' for Absent" })
  @IsString()
  attendanceStatus: string;

  @ApiPropertyOptional({ example: 'B-10293' })
  @IsOptional()
  @IsString()
  answerBookletNo?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  remarks?: string;
}

export class SaveAttendanceDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  academicSessionId: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  examinationDetailId: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  programId: number;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsNumber()
  paperId?: number;

  @ApiPropertyOptional({ example: 'Computer Science' })
  @IsOptional()
  @IsString()
  subjectName?: string;

  @ApiPropertyOptional({ example: 'THEORY' })
  @IsOptional()
  @IsString()
  paperType?: string;

  @ApiPropertyOptional({ example: 'CS-101' })
  @IsOptional()
  @IsString()
  paperCode?: string;

  @ApiPropertyOptional({ example: 'Programming in C' })
  @IsOptional()
  @IsString()
  paperName?: string;

  @ApiProperty({ example: '2026-06-01' })
  @IsNotEmpty()
  @IsString()
  examDate: string;

  @ApiPropertyOptional({ example: '11:00 AM - 01:00 PM' })
  @IsOptional()
  @IsString()
  examTime?: string;

  @ApiPropertyOptional({ example: '1st Shift' })
  @IsOptional()
  @IsString()
  shift?: string;

  @ApiPropertyOptional({ example: 'Admin User' })
  @IsOptional()
  @IsString()
  CreatedBy?: string;

  @ApiProperty({ type: [StudentAttendanceRowDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StudentAttendanceRowDto)
  students: StudentAttendanceRowDto[];
}

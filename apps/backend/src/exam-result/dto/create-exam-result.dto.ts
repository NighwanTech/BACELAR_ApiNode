import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateExamResultDto {
  @ApiProperty({ example: 1, required: false })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  academicSessionId?: number;

  @ApiProperty({ example: '2026-2027', required: false })
  @IsString()
  @IsOptional()
  sessionalName?: string;

  @ApiProperty({ example: 1, required: false })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  examinationDetailId?: number;

  @ApiProperty({ example: 'December 2026', required: false })
  @IsString()
  @IsOptional()
  examinationName?: string;

  @ApiProperty({ example: 1, required: false })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  yearId?: number;

  @ApiProperty({ example: 'First Year', required: false })
  @IsString()
  @IsOptional()
  yearName?: string;

  @ApiProperty({ example: 1, required: false })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  semId?: number;

  @ApiProperty({ example: 'Semester 1', required: false })
  @IsString()
  @IsOptional()
  semesterName?: string;

  @ApiProperty({ example: 1, required: false })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  programCategoryId?: number;

  @ApiProperty({ example: 'Undergraduate', required: false })
  @IsString()
  @IsOptional()
  programCategoryName?: string;

  @ApiProperty({ example: 1, required: false })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  programId?: number;

  @ApiProperty({ example: 'B.Ed.', required: false })
  @IsString()
  @IsOptional()
  programName?: string;

  @ApiProperty({ example: 1, required: false })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  examTypeId?: number;

  @ApiProperty({ example: 'Regular', required: false })
  @IsString()
  @IsOptional()
  examTypeName?: string;

  @ApiProperty({ example: 1, description: 'StudentRegistrationId' })
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  studentId: number;

  @ApiProperty({ example: 'ENR001', required: false })
  @IsString()
  @IsOptional()
  enrolmentNo?: string;

  @ApiProperty({ example: '26001001', required: false })
  @IsString()
  @IsOptional()
  rollNo?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  studentName?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  fatherName?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  motherName?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  gender?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  castCategory?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  dob?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  mobileNo?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  fatherMobileNo?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  emailId?: string;

  @ApiProperty({ example: 1, required: false })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  paperId?: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  paperCode?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  subjectName?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  paperName?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  paperType?: string;

  @ApiProperty({ required: false })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  totalMax?: number;

  @ApiProperty({ required: false })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  totalMin?: number;

  @ApiProperty({ required: false })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  theoryExternalMax?: number;

  @ApiProperty({ required: false })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  theoryExternalMin?: number;

  @ApiProperty({ required: false })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  theoryExternalObt?: number;

  @ApiProperty({ required: false })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  sessionalInternalMax?: number;

  @ApiProperty({ required: false })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  sessionalInternalMin?: number;

  @ApiProperty({ required: false })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  sessionalInternalObt?: number;

  @ApiProperty({ required: false })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  practicalMax?: number;

  @ApiProperty({ required: false })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  practicalMin?: number;

  @ApiProperty({ required: false })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  practicalObt?: number;

  @ApiProperty({ required: false })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  creditMax?: number;

  @ApiProperty({ required: false })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  creditObt?: number;

  @ApiProperty({ required: false })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  totalMarks?: number;

  @ApiProperty({ required: false })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  percentage?: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  grade?: string;

  @ApiProperty({ required: false })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  gradePoint?: number;

  @ApiProperty({ required: false })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  sgpa?: number;

  @ApiProperty({ required: false })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  ygpa?: number;

  @ApiProperty({ required: false })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  cgpa?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  resultDeclareDate?: string;

  @ApiProperty({ example: 'PASS', required: false })
  @IsString()
  @IsOptional()
  result?: string;

  @ApiProperty({ example: 'Admin User' })
  @IsString()
  @IsNotEmpty()
  CreatedBy: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  Remarks?: string;
}

import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class UpdateExamResultDto {
  @ApiProperty({ required: false })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  academicSessionId?: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  sessionalName?: string;

  @ApiProperty({ required: false })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  examinationDetailId?: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  examinationName?: string;

  @ApiProperty({ required: false })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  yearId?: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  yearName?: string;

  @ApiProperty({ required: false })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  semId?: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  semesterName?: string;

  @ApiProperty({ required: false })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  programCategoryId?: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  programCategoryName?: string;

  @ApiProperty({ required: false })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  programId?: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  programName?: string;

  @ApiProperty({ required: false })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  examTypeId?: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  examTypeName?: string;

  @ApiProperty({ required: false })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  studentId?: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  enrolmentNo?: string;

  @ApiProperty({ required: false })
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

  @ApiProperty({ required: false })
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

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  result?: string;

  @ApiProperty({ example: 'Admin User' })
  @IsString()
  @IsNotEmpty()
  UpdatedBy: string;

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  IsActive?: boolean;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  Remarks?: string;
}

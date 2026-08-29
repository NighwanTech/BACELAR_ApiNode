import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';

export class StudentMarksRowDto {
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
  examType?: string;

  @ApiPropertyOptional({ example: 45 })
  @IsOptional()
  marksObtained?: number | null;

  @ApiPropertyOptional({ example: 'Forty Five' })
  @IsOptional()
  @IsString()
  marksInWords?: string;

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  @IsBoolean()
  isAbsent?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  remarks?: string;
}

export class SaveMarksDto {
  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsNumber()
  academicSessionId?: number;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsNumber()
  examinationDetailId?: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  programId: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  yearId: number;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsNumber()
  semId?: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  paperId: number;

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

  @ApiProperty({ example: 'THEORY', description: 'THEORY | SESSIONAL | EXTERNAL_PRACTICAL | INTERNAL_PRACTICAL | CREDIT | PROJECT | VIVA' })
  @IsNotEmpty()
  @IsString()
  marksType: string;

  @ApiPropertyOptional({ example: 100 })
  @IsOptional()
  @IsNumber()
  maxMarks?: number;

  @ApiPropertyOptional({ example: 33 })
  @IsOptional()
  @IsNumber()
  minMarks?: number;

  @ApiPropertyOptional({ example: 'Admin User' })
  @IsOptional()
  @IsString()
  CreatedBy?: string;

  @ApiProperty({ type: [StudentMarksRowDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StudentMarksRowDto)
  students: StudentMarksRowDto[];
}

import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAcademicSubjectDto {
  @ApiProperty({ example: 1, description: 'ID of the parent StudentAcademicDetail entry' })
  @IsInt()
  @IsNotEmpty()
  academicDetailId: number;

  @ApiProperty({ example: 501, description: 'Subject Master ID' })
  @IsInt()
  @IsNotEmpty()
  subjectId: number;

  @ApiProperty({ example: 100, description: 'Max Marks' })
  @IsNumber()
  @IsNotEmpty()
  maxMarks: number;

  @ApiProperty({ example: 33, description: 'Min Marks' })
  @IsNumber()
  @IsNotEmpty()
  minMarks: number;

  @ApiProperty({ example: 85, description: 'Obtained Marks' })
  @IsNumber()
  @IsNotEmpty()
  obtainedMarks: number;

  @ApiProperty({ example: 'A', description: 'Grade', required: false })
  @IsString()
  @IsOptional()
  grade?: string;

  @ApiProperty({ example: 0, description: 'Practical Marks', required: false })
  @IsNumber()
  @IsOptional()
  practicalMarks?: number;

  @ApiProperty({ example: 85, description: 'Theory Marks', required: false })
  @IsNumber()
  @IsOptional()
  theoryMarks?: number;

  @ApiProperty({ example: false, description: 'Is Optional Subject', required: false })
  @IsBoolean()
  @IsOptional()
  isOptional?: boolean;

  @ApiProperty({ example: 'Admin User', description: 'Username of creator' })
  @IsString()
  @IsNotEmpty()
  CreatedBy: string;
}

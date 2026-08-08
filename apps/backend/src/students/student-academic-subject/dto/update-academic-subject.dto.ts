import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateAcademicSubjectDto {
  @ApiProperty({ example: 1, description: 'ID of the parent StudentAcademicDetail entry', required: false })
  @IsInt()
  @IsOptional()
  academicDetailId?: number;

  @ApiProperty({ example: 501, description: 'Subject Master ID', required: false })
  @IsInt()
  @IsOptional()
  subjectId?: number;

  @ApiProperty({ example: 100, description: 'Max Marks', required: false })
  @IsNumber()
  @IsOptional()
  maxMarks?: number;

  @ApiProperty({ example: 33, description: 'Min Marks', required: false })
  @IsNumber()
  @IsOptional()
  minMarks?: number;

  @ApiProperty({ example: 85, description: 'Obtained Marks', required: false })
  @IsNumber()
  @IsOptional()
  obtainedMarks?: number;

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

  @ApiProperty({ example: 'Admin User', description: 'Username of updater' })
  @IsString()
  @IsNotEmpty()
  UpdatedBy: string;

  @ApiProperty({ example: true, description: 'Active status', required: false })
  @IsBoolean()
  @IsOptional()
  IsActive?: boolean;
}

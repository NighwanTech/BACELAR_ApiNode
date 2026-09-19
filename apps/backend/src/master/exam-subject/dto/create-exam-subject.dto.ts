import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateExamSubjectDto {
  @ApiProperty({ example: 1, description: 'ID of the associated program (Program)', required: false })
  @IsInt()
  @IsOptional()
  programId?: number;

  @ApiProperty({ example: 'Bachelor of Computer Applications', description: 'Program Name', required: false })
  @IsString()
  @IsOptional()
  programName?: string;

  @ApiProperty({ example: 1, description: 'ID of the associated program category (ProgramCategory)', required: false })
  @IsInt()
  @IsOptional()
  programCategoryId?: number;

  @ApiProperty({ example: 'Undergraduate', description: 'Program Category Name', required: false })
  @IsString()
  @IsOptional()
  programCategoryName?: string;

  @ApiProperty({ example: 'Database Management Systems', description: 'Exam Subject Name' })
  @IsString()
  @IsNotEmpty()
  examSubName: string;

  @ApiProperty({ example: 'Admin User', description: 'Username of creator' })
  @IsString()
  @IsNotEmpty()
  CreatedBy: string;

  @ApiProperty({ example: 'Exam subject master entry', description: 'Optional remarks', required: false })
  @IsString()
  @IsOptional()
  Remarks?: string;
}

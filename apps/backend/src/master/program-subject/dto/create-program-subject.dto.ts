import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateProgramSubjectDto {
  @ApiProperty({ example: 5, description: 'Program ID this subject belongs to' })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  programId: number;

  @ApiProperty({ example: 'Bachelor of Arts', description: 'Program name', required: false })
  @IsString()
  @IsOptional()
  programName?: string;

  @ApiProperty({ example: 2, description: 'Program category ID', required: false })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  programCategoryId?: number;

  @ApiProperty({ example: 'Undergraduate', description: 'Program category name', required: false })
  @IsString()
  @IsOptional()
  programCategoryName?: string;

  @ApiProperty({ example: 'Mathematics', description: 'Program subject name' })
  @IsString()
  @IsNotEmpty()
  programSubjectName: string;

  @ApiProperty({ example: 'Admin User', description: 'Username of creator' })
  @IsString()
  @IsNotEmpty()
  CreatedBy: string;

  @ApiProperty({ example: 'Program subject master entry', required: false })
  @IsString()
  @IsOptional()
  Remarks?: string;
}

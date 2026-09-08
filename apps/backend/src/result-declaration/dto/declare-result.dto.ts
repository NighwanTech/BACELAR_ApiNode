import { IsDateString, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class DeclareResultDto {
  @ApiProperty({ example: 1 })
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  academicSessionId: number;

  @ApiProperty({ example: 1, required: false })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  examinationDetailId?: number;

  @ApiProperty({ example: 1 })
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  programId: number;

  @ApiProperty({ example: 1, required: false })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  yearId?: number;

  @ApiProperty({ example: 1, required: false })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  semId?: number;

  @ApiProperty({ example: '2026-09-08', description: 'Result declare date (YYYY-MM-DD)' })
  @IsDateString()
  @IsNotEmpty()
  declareDate: string;

  @ApiProperty({ example: 'B.Ed. I-Semester', required: false })
  @IsString()
  @IsOptional()
  courseLabel?: string;

  @ApiProperty({ example: 'Admin User' })
  @IsString()
  @IsNotEmpty()
  CreatedBy: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  Remarks?: string;
}

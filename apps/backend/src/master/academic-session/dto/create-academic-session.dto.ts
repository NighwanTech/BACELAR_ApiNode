import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateAcademicSessionDto {
  @ApiProperty({ example: 1, description: 'College ID this academic session belongs to' })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  collegeId: number;

  @ApiProperty({ example: '2026-2027', description: 'Academic session name' })
  @IsString()
  @IsNotEmpty()
  academicSessionName: string;

  @ApiProperty({ example: 7, description: 'Start month (1-12)' })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(12)
  startMonth: number;

  @ApiProperty({ example: 2026, description: 'Start year' })
  @Type(() => Number)
  @IsInt()
  startYear: number;

  @ApiProperty({ example: 6, description: 'End month (1-12)' })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(12)
  endMonth: number;

  @ApiProperty({ example: 2027, description: 'End year' })
  @Type(() => Number)
  @IsInt()
  endYear: number;

  @ApiProperty({ example: 'Admin User', description: 'Username of creator' })
  @IsString()
  @IsNotEmpty()
  CreatedBy: string;

  @ApiProperty({ example: 'Academic session master entry', required: false })
  @IsString()
  @IsOptional()
  Remarks?: string;
}

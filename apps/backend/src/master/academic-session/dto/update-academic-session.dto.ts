import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class UpdateAcademicSessionDto {
  @ApiProperty({ example: 1, required: false })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  collegeId?: number;

  @ApiProperty({ example: '2026-2027', required: false })
  @IsString()
  @IsOptional()
  academicSessionName?: string;

  @ApiProperty({ example: 7, required: false })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(12)
  @IsOptional()
  startMonth?: number;

  @ApiProperty({ example: 2026, required: false })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  startYear?: number;

  @ApiProperty({ example: 6, required: false })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(12)
  @IsOptional()
  endMonth?: number;

  @ApiProperty({ example: 2027, required: false })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  endYear?: number;

  @ApiProperty({ example: 'Editor Admin' })
  @IsString()
  @IsNotEmpty()
  UpdatedBy: string;

  @ApiProperty({ example: true, required: false })
  @IsBoolean()
  @IsOptional()
  IsActive?: boolean;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  Remarks?: string;
}

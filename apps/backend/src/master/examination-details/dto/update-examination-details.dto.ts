import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class UpdateExaminationDetailsDto {
  @ApiProperty({ example: 1, required: false })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  academicId?: number;

  @ApiProperty({ example: 'Mid Term', required: false })
  @IsString()
  @IsOptional()
  examinationName?: string;

  @ApiProperty({ example: 'Semester', required: false })
  @IsString()
  @IsOptional()
  examType?: string;

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

import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class UpdateProgramSubjectDto {
  @ApiProperty({ example: 5, required: false })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  programId?: number;

  @ApiProperty({ example: 'Bachelor of Arts', required: false })
  @IsString()
  @IsOptional()
  programName?: string;

  @ApiProperty({ example: 2, required: false })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  programCategoryId?: number;

  @ApiProperty({ example: 'Undergraduate', required: false })
  @IsString()
  @IsOptional()
  programCategoryName?: string;

  @ApiProperty({ example: 'Mathematics', required: false })
  @IsString()
  @IsOptional()
  programSubjectName?: string;

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

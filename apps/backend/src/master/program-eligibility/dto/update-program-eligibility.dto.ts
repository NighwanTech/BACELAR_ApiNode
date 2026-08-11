import { IsBoolean, IsIn, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class UpdateProgramEligibilityDto {
  @ApiProperty({ required: false })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  programId?: number;

  @ApiProperty({ enum: ['SUBJECT', 'MIN_PERCENT', 'STREAM', 'QUALIFICATION'], required: false })
  @IsString()
  @IsIn(['SUBJECT', 'MIN_PERCENT', 'STREAM', 'QUALIFICATION'])
  @IsOptional()
  ruleType?: string;

  @ApiProperty({ enum: ['10TH', '12TH', 'GRAD', 'PG', 'ALL'], required: false })
  @IsString()
  @IsIn(['10TH', '12TH', 'GRAD', 'PG', 'ALL'])
  @IsOptional()
  qualificationLevel?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  ruleKey?: string;

  @ApiProperty({ required: false })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  minPercent?: number;

  @ApiProperty({ enum: ['Compulsory', 'Recommended'], required: false })
  @IsString()
  @IsIn(['Compulsory', 'Recommended'])
  @IsOptional()
  severity?: string;

  @ApiProperty({ required: false })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  displayOrder?: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  message?: string;

  @ApiProperty({ example: 'Editor Admin' })
  @IsString()
  @IsNotEmpty()
  UpdatedBy: string;

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  IsActive?: boolean;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  Remarks?: string;
}

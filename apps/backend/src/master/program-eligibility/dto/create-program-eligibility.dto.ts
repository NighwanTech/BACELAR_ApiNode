import { IsIn, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateProgramEligibilityDto {
  @ApiProperty({ example: 5, description: 'Program ID' })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  programId: number;

  @ApiProperty({
    example: 'SUBJECT',
    enum: ['SUBJECT', 'MIN_PERCENT', 'STREAM', 'QUALIFICATION'],
  })
  @IsString()
  @IsIn(['SUBJECT', 'MIN_PERCENT', 'STREAM', 'QUALIFICATION'])
  ruleType: string;

  @ApiProperty({
    example: '12TH',
    enum: ['10TH', '12TH', 'GRAD', 'PG', 'ALL'],
  })
  @IsString()
  @IsIn(['10TH', '12TH', 'GRAD', 'PG', 'ALL'])
  qualificationLevel: string;

  @ApiProperty({
    example: 'ALL',
    description: 'GEN | OBC | SC | ST | MINORITY | GENERAL | RESERVED | ALL',
    required: false,
  })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiProperty({
    example: '12MATH',
    description: 'Subject code / AGGREGATE / SCIENCE / GRADUATION. Use | for OR (12BIO|12AGRI)',
    required: false,
  })
  @IsString()
  @IsOptional()
  ruleKey?: string;

  @ApiProperty({ example: 50, description: 'Required for MIN_PERCENT', required: false })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  minPercent?: number;

  @ApiProperty({ example: 'Compulsory', enum: ['Compulsory', 'Recommended'], required: false })
  @IsString()
  @IsIn(['Compulsory', 'Recommended'])
  @IsOptional()
  severity?: string;

  @ApiProperty({ example: 1, required: false })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  displayOrder?: number;

  @ApiProperty({
    example: 'Compulsory: Mathematics must be selected in 12th Subject Details.',
  })
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiProperty({ example: 'Admin User' })
  @IsString()
  @IsNotEmpty()
  CreatedBy: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  Remarks?: string;
}

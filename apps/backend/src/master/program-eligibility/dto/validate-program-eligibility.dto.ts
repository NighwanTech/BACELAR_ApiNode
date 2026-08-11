import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class ValidateProgramEligibilityDto {
  @ApiProperty({ example: 5 })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  programId: number;

  @ApiProperty({ example: 'GEN', required: false })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiProperty({ example: 65.5, required: false })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  tenthPercentage?: number;

  @ApiProperty({ example: 62.0, required: false })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  twelfthPercentage?: number;

  @ApiProperty({ example: 55.0, required: false })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  graduationPercentage?: number;

  @ApiProperty({ example: 60.0, required: false })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  pgPercentage?: number;

  @ApiProperty({ example: 'SCIENCE', required: false })
  @IsString()
  @IsOptional()
  twelfthStream?: string;

  @ApiProperty({
    example: ['12MATH', '12ENG'],
    description: 'Selected 12th subject codes',
    required: false,
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  twelfthSubjectCodes?: string[];

  @ApiProperty({ example: true, required: false })
  @IsBoolean()
  @IsOptional()
  hasGraduation?: boolean;

  @ApiProperty({ example: false, required: false })
  @IsBoolean()
  @IsOptional()
  hasPg?: boolean;
}

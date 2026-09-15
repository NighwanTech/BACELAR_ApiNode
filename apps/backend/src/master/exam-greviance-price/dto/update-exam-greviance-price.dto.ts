import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateExamGreviancePriceDto {
  @ApiProperty({ example: 1, required: false })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  grevianceTypeId?: number;

  @ApiProperty({ example: 'REVALUATION', required: false })
  @IsString()
  @IsOptional()
  grevianceTypeName?: string;

  @ApiProperty({ example: 100, required: false })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  price?: number;

  @ApiProperty({ example: 2, required: false })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  pgRate?: number;

  @ApiProperty({ example: 18, required: false })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  gstRate?: number;

  @ApiProperty({ example: 'Admin User' })
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

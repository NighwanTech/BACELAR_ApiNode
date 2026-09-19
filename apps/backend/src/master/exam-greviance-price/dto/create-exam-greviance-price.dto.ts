import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateExamGreviancePriceDto {
  @ApiProperty({ example: 1, description: 'Greviance Type ID' })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  grevianceTypeId: number;

  @ApiProperty({ example: 'REVALUATION', required: false })
  @IsString()
  @IsOptional()
  grevianceTypeName?: string;

  @ApiProperty({ example: 100, description: 'Net amount that should land in college account' })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({ example: 2, description: 'Payment gateway rate %', required: false })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  pgRate?: number;

  @ApiProperty({ example: 18, description: 'GST rate % on PG fee', required: false })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  gstRate?: number;

  @ApiProperty({ example: 'Admin User' })
  @IsString()
  @IsNotEmpty()
  CreatedBy: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  Remarks?: string;
}

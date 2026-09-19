import { Type } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEntrancePaperDto {
  @ApiProperty({ example: 'Paper I' })
  @IsString()
  @IsNotEmpty()
  entrancePaperName: string;

  @ApiProperty({ example: 100 })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  maxMarks: number;

  @ApiProperty({ example: 33 })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  minMarks: number;

  @ApiProperty({ example: 'Admin User' })
  @IsString()
  @IsNotEmpty()
  CreatedBy: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  Remarks?: string;

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  IsActive?: boolean;
}

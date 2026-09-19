import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateEntranceExamDto {
  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  academicSessionId: number;

  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  programCategoryId: number;

  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  programId: number;

  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  entrancePaperId: number;

  @ApiProperty({ example: '22 Sep 2026', required: false })
  @IsString()
  @IsOptional()
  examDate?: string;

  @ApiProperty({ example: '11:00 AM', required: false })
  @IsString()
  @IsOptional()
  fromTime?: string;

  @ApiProperty({ example: '01:00 PM', required: false })
  @IsString()
  @IsOptional()
  toTime?: string;

  @ApiProperty({ example: '202568601', required: false })
  @IsString()
  @IsOptional()
  rollNumberSequence?: string;

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

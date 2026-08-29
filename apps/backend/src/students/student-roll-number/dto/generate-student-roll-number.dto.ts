import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class GenerateStudentRollNumberDto {
  @ApiProperty({ example: 1, description: 'Admission session ID' })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  sessionId: number;

  @ApiProperty({ required: false })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  programCategoryId?: number;

  @ApiProperty({ required: false })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  programId?: number;

  @ApiProperty({ required: false })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  yearId?: number;

  @ApiProperty({ required: false })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  semId?: number;

  @ApiProperty({
    required: false,
    type: [Number],
    description: 'Optional: generate only for these studentIds',
  })
  @IsArray()
  @Type(() => Number)
  @IsNumber({}, { each: true })
  @IsOptional()
  studentIds?: number[];

  @ApiProperty({ example: 'Admin User' })
  @IsString()
  @IsNotEmpty()
  CreatedBy: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  Remarks?: string;
}

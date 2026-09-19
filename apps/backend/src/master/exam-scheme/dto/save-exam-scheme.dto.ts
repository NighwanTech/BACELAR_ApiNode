import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SaveExamSchemePaperDto {
  @ApiProperty({ example: 1, required: false })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  srNo?: number;

  @ApiProperty({ example: 5 })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  paperId: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  subjectName?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  paperName?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  paperCode?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  paperNameWithCode?: string;

  @ApiProperty({ required: false })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  paperTypeId?: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  paperType?: string;

  @ApiProperty({ example: '2026-07-06', required: false })
  @IsString()
  @IsOptional()
  examDate?: string;

  @ApiProperty({ example: '11:00 AM - 01:00 PM', required: false })
  @IsString()
  @IsOptional()
  examTime?: string;

  @ApiProperty({ example: 'I', required: false })
  @IsString()
  @IsOptional()
  shift?: string;

  @ApiProperty({ required: false })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  noOfStudent?: number;
}

export class SaveExamSchemeDto {
  @ApiProperty({ example: 1 })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  examinationDetailId: number;

  @ApiProperty({ example: 1 })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  programId: number;

  @ApiProperty({ example: 1 })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  yearId: number;

  @ApiProperty({ example: 1, required: false })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  semId?: number;

  @ApiProperty({ example: 1, required: false })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  academicSessionId?: number;

  @ApiProperty({ example: 1, required: false })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  programCategoryId?: number;

  @ApiProperty({ type: [SaveExamSchemePaperDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SaveExamSchemePaperDto)
  papers: SaveExamSchemePaperDto[];

  @ApiProperty({ example: 'Admin User' })
  @IsString()
  @IsNotEmpty()
  CreatedBy: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  Remarks?: string;
}

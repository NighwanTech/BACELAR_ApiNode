import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PromoteStudentItemDto {
  @ApiProperty({ example: 1 })
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  studentId: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  regNo?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  enrollmentNo?: string;

  @ApiProperty({ required: false, example: '686202501001' })
  @IsString()
  @IsOptional()
  rollNo?: string;

  @ApiProperty({ required: false, example: 'Regular' })
  @IsString()
  @IsOptional()
  examMode?: string;

  @ApiProperty({ required: false, example: 'Promoted' })
  @IsString()
  @IsOptional()
  examResult?: string;

  @ApiProperty({ required: false, default: true })
  @IsBoolean()
  @IsOptional()
  isPromoted?: boolean;
}

export class SavePromotionDto {
  @ApiProperty({ example: 1, description: 'Promote From academic session' })
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  sessionIdFrom: number;

  @ApiProperty({ example: 1 })
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  yearIdFrom: number;

  @ApiProperty({ example: 1, required: false })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  semIdFrom?: number;

  @ApiProperty({ example: 1, description: 'programCategoryId' })
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  courseCategoryIdFrom: number;

  @ApiProperty({ example: 1, description: 'programId' })
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  courseIdFrom: number;

  @ApiProperty({ example: 1, required: false })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  subjectIdFrom?: number;

  @ApiProperty({ example: 2, description: 'Promote To academic session' })
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  sessionIdTo: number;

  @ApiProperty({ example: 2 })
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  yearIdTo: number;

  @ApiProperty({ example: 2, required: false })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  semIdTo?: number;

  @ApiProperty({ example: 1 })
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  courseCategoryIdTo: number;

  @ApiProperty({ example: 1 })
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  courseIdTo: number;

  @ApiProperty({ example: 1, required: false })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  subjectIdTo?: number;

  @ApiProperty({ type: [PromoteStudentItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PromoteStudentItemDto)
  students: PromoteStudentItemDto[];

  @ApiProperty({ example: 'Admin User' })
  @IsString()
  @IsNotEmpty()
  CreatedBy: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  Remarks?: string;
}

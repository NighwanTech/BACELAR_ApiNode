import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateExamGrevianceDto {
  @ApiProperty({ example: '26001001' })
  @IsString()
  @IsNotEmpty()
  rollNo: string;

  @ApiProperty({ example: 1, required: false })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  grevianceTypeId?: number;

  @ApiProperty({ example: 'Photocopy of Answersheet', required: false })
  @IsString()
  @IsOptional()
  grevianceTypeName?: string;

  @ApiProperty({ example: [1, 2, 3], description: 'examResultId list' })
  @IsArray()
  @ArrayMinSize(1)
  @IsInt({ each: true })
  @Type(() => Number)
  examResultIds: number[];

  @ApiProperty({ example: 'Website', required: false })
  @IsString()
  @IsOptional()
  CreatedBy?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  Remarks?: string;
}

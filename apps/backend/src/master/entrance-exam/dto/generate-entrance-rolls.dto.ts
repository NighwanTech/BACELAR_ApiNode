import { IsArray, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class BulkDeleteEntranceExamsDto {
  @ApiProperty({ example: [1, 2] })
  @IsArray()
  @IsNumber({}, { each: true })
  @IsNotEmpty()
  ids: number[];

  @ApiProperty({ example: 'Admin User' })
  @IsString()
  @IsNotEmpty()
  DeletedBy: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  DeletedRemarks?: string;
}

export class GenerateEntranceRollsDto {
  @ApiProperty({ required: false })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  academicSessionId?: number;

  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  programCategoryId: number;

  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  programId: number;

  @ApiProperty({ example: 'Admin User', required: false })
  @IsString()
  @IsOptional()
  UpdatedBy?: string;
}

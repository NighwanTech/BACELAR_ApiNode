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

  @ApiProperty({ example: 'Admin User', required: false })
  @IsString()
  @IsOptional()
  UpdatedBy?: string;
}

export class EntranceStudentPaperMarksDto {
  @ApiProperty({ required: false })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  entranceStudentPaperId?: number;

  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  entrancePaperId: number;

  @ApiProperty({ required: false })
  @IsOptional()
  obtainedMarks?: number | string | null;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  attendanceStatus?: string;
}

export class EntranceStudentMarksDto {
  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  entranceStudentId: number;

  @ApiProperty({ type: [EntranceStudentPaperMarksDto] })
  @IsArray()
  papers: EntranceStudentPaperMarksDto[];
}

export class SaveEntranceMarksDto {
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

  @ApiProperty({ example: 'Admin User', required: false })
  @IsString()
  @IsOptional()
  UpdatedBy?: string;

  @ApiProperty({ type: [EntranceStudentMarksDto] })
  @IsArray()
  students: EntranceStudentMarksDto[];
}

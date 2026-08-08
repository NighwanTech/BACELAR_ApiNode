import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProgramDto {
  @ApiProperty({ example: 1, description: 'ID of the associated ProgramCategory', required: false })
  @IsNumber()
  @IsOptional()
  programCategoryId?: number;

  @ApiProperty({ example: 'Bachelor of Computer Applications', description: 'Name of the program', required: false })
  @IsString()
  @IsOptional()
  programName?: string;

  @ApiProperty({ example: 'B.C.A.', description: 'Short name of the program', required: false })
  @IsString()
  @IsOptional()
  programShortName?: string;

  @ApiProperty({ example: '5', description: 'Unique code of the program', required: false })
  @IsString()
  @IsOptional()
  programCode?: string;

  @ApiProperty({ example: 3, description: 'Program duration in years', required: false })
  @IsNumber()
  @IsOptional()
  durationYears?: number;

  @ApiProperty({ example: 'SEMESTER', description: 'Education term pattern (SEMESTER or ANNUAL)', required: false })
  @IsString()
  @IsOptional()
  termType?: string;

  @ApiProperty({ example: 6, description: 'Total number of terms', required: false })
  @IsNumber()
  @IsOptional()
  totalTerms?: number;

  @ApiProperty({ example: 1, description: 'Display sequence order number', required: false })
  @IsNumber()
  @IsOptional()
  sequenceNo?: number;

  @ApiProperty({ example: 'Admin User', description: 'Username of updater' })
  @IsString()
  @IsNotEmpty()
  UpdatedBy: string;

  @ApiProperty({ example: true, description: 'Active status', required: false })
  @IsBoolean()
  @IsOptional()
  IsActive?: boolean;

  @ApiProperty({ example: 'BCA Program edit', description: 'Optional remarks', required: false })
  @IsString()
  @IsOptional()
  Remarks?: string;
}

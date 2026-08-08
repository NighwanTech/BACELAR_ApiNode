import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProgramDto {
  @ApiProperty({ example: 1, description: 'ID of the associated ProgramCategory' })
  @IsNumber()
  @IsNotEmpty()
  programCategoryId: number;

  @ApiProperty({ example: 'Bachelor of Computer Applications', description: 'Name of the program' })
  @IsString()
  @IsNotEmpty()
  programName: string;

  @ApiProperty({ example: 'B.C.A.', description: 'Short name of the program' })
  @IsString()
  @IsNotEmpty()
  programShortName: string;

  @ApiProperty({ example: '5', description: 'Unique code of the program' })
  @IsString()
  @IsNotEmpty()
  programCode: string;

  @ApiProperty({ example: 3, description: 'Program duration in years' })
  @IsNumber()
  @IsNotEmpty()
  durationYears: number;

  @ApiProperty({ example: 'SEMESTER', description: 'Education term pattern (SEMESTER or ANNUAL)' })
  @IsString()
  @IsNotEmpty()
  termType: string;

  @ApiProperty({ example: 6, description: 'Total number of terms' })
  @IsNumber()
  @IsNotEmpty()
  totalTerms: number;

  @ApiProperty({ example: 1, description: 'Display sequence order number' })
  @IsNumber()
  @IsNotEmpty()
  sequenceNo: number;

  @ApiProperty({ example: 'Admin User', description: 'Username of creator' })
  @IsString()
  @IsNotEmpty()
  CreatedBy: string;

  @ApiProperty({ example: 'BCA Program entry', description: 'Optional remarks', required: false })
  @IsString()
  @IsOptional()
  Remarks?: string;
}

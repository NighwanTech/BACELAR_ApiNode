import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProgramCategoryDto {
  @ApiProperty({ example: 'UNDER GRADUATE', description: 'Name of the program category' })
  @IsString()
  @IsNotEmpty()
  programCategoryName: string;

  @ApiProperty({ example: 'UG', description: 'Short name of the program category' })
  @IsString()
  @IsNotEmpty()
  pcShortName: string;

  @ApiProperty({ example: 1, description: 'Display sequence order number' })
  @IsNumber()
  @IsNotEmpty()
  sequenceNo: number;

  @ApiProperty({ example: 'Admin User', description: 'Username of creator' })
  @IsString()
  @IsNotEmpty()
  CreatedBy: string;

  @ApiProperty({ example: 'UG category entry', description: 'Optional remarks', required: false })
  @IsString()
  @IsOptional()
  Remarks?: string;
}

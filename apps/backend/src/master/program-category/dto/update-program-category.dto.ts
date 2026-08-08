import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProgramCategoryDto {
  @ApiProperty({ example: 'UNDER GRADUATE', description: 'Name of the program category', required: false })
  @IsString()
  @IsOptional()
  programCategoryName?: string;

  @ApiProperty({ example: 'UG', description: 'Short name of the program category', required: false })
  @IsString()
  @IsOptional()
  pcShortName?: string;

  @ApiProperty({ example: 1, description: 'Display sequence order number', required: false })
  @IsNumber()
  @IsOptional()
  sequenceNo?: number;

  @ApiProperty({ example: 'Editor Admin', description: 'Username of editor' })
  @IsString()
  @IsNotEmpty()
  UpdatedBy: string;

  @ApiProperty({ example: true, description: 'Is program category active?', required: false })
  @IsBoolean()
  @IsOptional()
  IsActive?: boolean;

  @ApiProperty({ example: 'Updated remarks', description: 'Optional remarks', required: false })
  @IsString()
  @IsOptional()
  Remarks?: string;
}

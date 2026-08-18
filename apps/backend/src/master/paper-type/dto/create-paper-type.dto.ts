import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePaperTypeDto {
  @ApiProperty({ example: 'THEORY', description: 'Name of the paper type' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Theory paper description', description: 'Description of paper type', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 'Admin User', description: 'Username of creator' })
  @IsString()
  @IsNotEmpty()
  CreatedBy: string;

  @ApiProperty({ example: 'Paper type master entry', description: 'Optional remarks', required: false })
  @IsString()
  @IsOptional()
  Remarks?: string;
}

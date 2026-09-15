import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGrevianceTypeDto {
  @ApiProperty({ example: 'REVALUATION', description: 'Name of the greviance type' })
  @IsString()
  @IsNotEmpty()
  grevianceTypeName: string;

  @ApiProperty({ example: 'REV', description: 'Short code of the greviance type' })
  @IsString()
  @IsNotEmpty()
  shortcode: string;

  @ApiProperty({ example: 'Admin User' })
  @IsString()
  @IsNotEmpty()
  CreatedBy: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  Remarks?: string;
}

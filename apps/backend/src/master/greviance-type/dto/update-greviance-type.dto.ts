import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateGrevianceTypeDto {
  @ApiProperty({ example: 'REVALUATION', required: false })
  @IsString()
  @IsOptional()
  grevianceTypeName?: string;

  @ApiProperty({ example: 'REV', required: false })
  @IsString()
  @IsOptional()
  shortcode?: string;

  @ApiProperty({ example: 'Admin User' })
  @IsString()
  @IsNotEmpty()
  UpdatedBy: string;

  @ApiProperty({ example: true, required: false })
  @IsBoolean()
  @IsOptional()
  IsActive?: boolean;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  Remarks?: string;
}

import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMonthDto {
  @ApiProperty({ example: 'JANUARY', description: 'Name of the month', required: false })
  @IsString()
  @IsOptional()
  monthName?: string;

  @ApiProperty({ example: 'JAN', description: 'Short code of the month', required: false })
  @IsString()
  @IsOptional()
  monthShortCode?: string;

  @ApiProperty({ example: 'Editor Admin', description: 'Username of editor' })
  @IsString()
  @IsNotEmpty()
  UpdatedBy: string;

  @ApiProperty({ example: true, description: 'Is month active?', required: false })
  @IsBoolean()
  @IsOptional()
  IsActive?: boolean;

  @ApiProperty({ example: 'Updated month details', description: 'Optional remarks', required: false })
  @IsString()
  @IsOptional()
  Remarks?: string;
}

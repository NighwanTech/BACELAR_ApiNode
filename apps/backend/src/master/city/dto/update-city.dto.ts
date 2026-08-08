import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCityDto {
  @ApiProperty({ example: 1, description: 'State ID this city belongs to', required: false })
  @IsNumber()
  @IsOptional()
  stateId?: number;

  @ApiProperty({ example: 'LUCKNOW', description: 'Name of the city', required: false })
  @IsString()
  @IsOptional()
  cityName?: string;

  @ApiProperty({ example: 'LKO', description: 'Short code of the city', required: false })
  @IsString()
  @IsOptional()
  cityShortCode?: string;

  @ApiProperty({ example: 'Editor Admin', description: 'Username of editor' })
  @IsString()
  @IsNotEmpty()
  UpdatedBy: string;

  @ApiProperty({ example: true, description: 'Is city active?', required: false })
  @IsBoolean()
  @IsOptional()
  IsActive?: boolean;

  @ApiProperty({ example: 'Updated city details', description: 'Optional remarks', required: false })
  @IsString()
  @IsOptional()
  Remarks?: string;
}

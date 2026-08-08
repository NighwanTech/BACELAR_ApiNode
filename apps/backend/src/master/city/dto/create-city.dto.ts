import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCityDto {
  @ApiProperty({ example: 1, description: 'State ID this city belongs to' })
  @IsNumber()
  @IsNotEmpty()
  stateId: number;

  @ApiProperty({ example: 'LUCKNOW', description: 'Name of the city' })
  @IsString()
  @IsNotEmpty()
  cityName: string;

  @ApiProperty({ example: 'LKO', description: 'Short code of the city' })
  @IsString()
  @IsNotEmpty()
  cityShortCode: string;

  @ApiProperty({ example: 'Admin User', description: 'Username of creator' })
  @IsString()
  @IsNotEmpty()
  CreatedBy: string;

  @ApiProperty({ example: 'City master entry', description: 'Optional remarks', required: false })
  @IsString()
  @IsOptional()
  Remarks?: string;
}

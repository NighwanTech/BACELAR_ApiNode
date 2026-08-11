import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateZipcodeDto {
  @ApiProperty({ example: '226001', description: 'Postal / ZIP code' })
  @IsString()
  @IsNotEmpty()
  zipCode: string;

  @ApiProperty({ example: 1, description: 'State ID' })
  @IsNumber()
  @IsNotEmpty()
  stateId: number;

  @ApiProperty({ example: 1, description: 'City ID' })
  @IsNumber()
  @IsNotEmpty()
  cityId: number;

  @ApiProperty({ example: 'Hazratganj', description: 'Locality / area name' })
  @IsString()
  @IsNotEmpty()
  locality: string;

  @ApiProperty({ example: 'Admin User', description: 'Username of creator' })
  @IsString()
  @IsNotEmpty()
  CreatedBy: string;

  @ApiProperty({ example: 'Zipcode master entry', description: 'Optional remarks', required: false })
  @IsString()
  @IsOptional()
  Remarks?: string;
}

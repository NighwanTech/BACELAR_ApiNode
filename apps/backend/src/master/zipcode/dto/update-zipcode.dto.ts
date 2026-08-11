import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateZipcodeDto {
  @ApiProperty({ example: '226001', description: 'Postal / ZIP code', required: false })
  @IsString()
  @IsOptional()
  zipCode?: string;

  @ApiProperty({ example: 1, description: 'State ID', required: false })
  @IsNumber()
  @IsOptional()
  stateId?: number;

  @ApiProperty({ example: 1, description: 'City ID', required: false })
  @IsNumber()
  @IsOptional()
  cityId?: number;

  @ApiProperty({ example: 'Hazratganj', description: 'Locality / area name', required: false })
  @IsString()
  @IsOptional()
  locality?: string;

  @ApiProperty({ example: 'Editor Admin', description: 'Username of editor' })
  @IsString()
  @IsNotEmpty()
  UpdatedBy: string;

  @ApiProperty({ example: true, description: 'Is zipcode active?', required: false })
  @IsBoolean()
  @IsOptional()
  IsActive?: boolean;

  @ApiProperty({ example: 'Updated zipcode details', description: 'Optional remarks', required: false })
  @IsString()
  @IsOptional()
  Remarks?: string;
}

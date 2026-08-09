import { IsBoolean, IsDateString, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLatestUpdateDto {
  @ApiProperty({ example: 'Admissions Open 2026-27', description: 'Title of the update' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Admissions2026', description: 'Short name/identifier for update', required: false })
  @IsString()
  @IsOptional()
  shortName?: string;

  @ApiProperty({ example: 'UG/PG', description: 'Grade or Category tag', required: false })
  @IsString()
  @IsOptional()
  grade?: string;

  @ApiProperty({ example: 'https://example.com/logo.png', description: 'Logo or Image URL', required: false })
  @IsString()
  @IsOptional()
  logo?: string;

  @ApiProperty({ example: 'Applications are invited for UG & PG courses for academic year 2026-27.', description: 'Detailed description', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: '2026-08-01T00:00:00.000Z', description: 'Validity start date (ISO string)', required: false })
  @IsDateString()
  @IsOptional()
  validFrom?: string;

  @ApiProperty({ example: '2026-09-30T23:59:59.000Z', description: 'Validity end date (ISO string)', required: false })
  @IsDateString()
  @IsOptional()
  validUntil?: string;

  @ApiProperty({ example: 'https://bacelar.edu/admissions', description: 'Target URL link', required: false })
  @IsString()
  @IsOptional()
  linkUrl?: string;

  @ApiProperty({ example: 1, description: 'Display order priority', required: false })
  @IsInt()
  @IsOptional()
  displayOrder?: number;

  @ApiProperty({ example: 'Admin User', description: 'Username of creator' })
  @IsString()
  @IsNotEmpty()
  CreatedBy: string;

  @ApiProperty({ example: 'Admissions announcement', description: 'Optional remarks', required: false })
  @IsString()
  @IsOptional()
  Remarks?: string;
}

import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStatsCounterDto {
  @ApiProperty({ example: 'Students Enrolled', description: 'Title of the stats counter' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: '5000', description: 'Value of the counter' })
  @IsString()
  @IsNotEmpty()
  value: string;

  @ApiProperty({ example: '+', description: 'Suffix for the counter (e.g. +, %, k+)', required: false })
  @IsString()
  @IsOptional()
  suffix?: string;

  @ApiProperty({ example: 'fa-user-graduate', description: 'Icon class or name', required: false })
  @IsString()
  @IsOptional()
  icon?: string;

  @ApiProperty({ example: 'https://example.com/bg.jpg', description: 'Background Image URL', required: false })
  @IsString()
  @IsOptional()
  backgroundImage?: string;

  @ApiProperty({ example: 1, description: 'Display order sequence', required: false })
  @IsInt()
  @IsOptional()
  displayOrder?: number;

  @ApiProperty({ example: true, description: 'Is active flag', required: false })
  @IsBoolean()
  @IsOptional()
  IsActive?: boolean;

  @ApiProperty({ example: 'Admin User', description: 'Username of creator', required: false })
  @IsString()
  @IsOptional()
  CreatedBy?: string;

  @ApiProperty({ example: 'Stats counter entry', description: 'Optional remarks', required: false })
  @IsString()
  @IsOptional()
  Remarks?: string;
}

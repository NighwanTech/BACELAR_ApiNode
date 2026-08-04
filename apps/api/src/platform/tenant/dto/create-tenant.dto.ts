import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  IsEnum,
  Matches,
} from 'class-validator';
import { TenantType } from '@universityos/common';

export class CreateTenantDto {
  @ApiProperty()
  @IsString()
  @Matches(/^[a-z0-9-_]+$/, {
    message: 'Code must be lowercase alphanumeric with hyphens or underscores',
  })
  code!: string;

  @ApiProperty()
  @IsString()
  name!: string;

  @ApiProperty({ enum: TenantType })
  @IsEnum(TenantType)
  type!: TenantType;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  domain?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional()
  @IsOptional()
  address?: Record<string, unknown>;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  logo?: string;

  @ApiPropertyOptional()
  @IsOptional()
  theme?: Record<string, unknown>;

  @ApiPropertyOptional()
  @IsOptional()
  config?: Record<string, unknown>;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  timezone?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  locale?: string;

  @ApiPropertyOptional({ enum: ['ACTIVE', 'TRIAL', 'PENDING', 'SUSPENDED'] })
  @IsOptional()
  @IsEnum(['ACTIVE', 'TRIAL', 'PENDING', 'SUSPENDED'])
  status?: string;
}

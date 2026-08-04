import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum } from 'class-validator';
import { TenantType } from '@universityos/common';

export class UpdateTenantDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ enum: TenantType })
  @IsOptional()
  @IsEnum(TenantType)
  type?: TenantType;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  domain?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
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
  @IsString()
  favicon?: string;

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

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  academicYear?: string;

  @ApiPropertyOptional({ enum: ['ACTIVE', 'TRIAL', 'PENDING', 'SUSPENDED', 'EXPIRED', 'ARCHIVED'] })
  @IsOptional()
  @IsEnum(['ACTIVE', 'TRIAL', 'PENDING', 'SUSPENDED', 'EXPIRED', 'ARCHIVED'])
  status?: string;
}

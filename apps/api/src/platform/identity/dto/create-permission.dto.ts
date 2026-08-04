import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, Matches } from 'class-validator';

export class CreatePermissionDto {
  @ApiProperty()
  @IsString()
  name!: string;

  @ApiProperty()
  @IsString()
  @Matches(/^[a-z0-9:_-]+$/, {
    message: 'Slug must be lowercase alphanumeric with colons, hyphens or underscores',
  })
  slug!: string;

  @ApiProperty()
  @IsString()
  module!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ enum: ['create', 'read', 'update', 'delete', 'manage'] })
  @IsString()
  action!: string;

  @ApiProperty()
  @IsString()
  resource!: string;
}
